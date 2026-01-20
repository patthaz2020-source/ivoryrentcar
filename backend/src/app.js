// ✅ MUST be first
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const { connectDB } = require("./config/database");
const { errorHandler } = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const { sendEmail } = require("./utils/email");
const { sendSms } = require("./utils/sms");

const app = express();

/** ✅ Middleware */
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/** ✅ Static uploads folder */
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

/** ✅ Health */
app.get("/api/health", (req, res) => res.json({ ok: true }));

/** ✅ Test endpoints (only one each) */
app.get("/api/test-email", async (req, res, next) => {
  try {
    await sendEmail(process.env.ADMIN_EMAIL, "Test Email", "Email working");
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

app.get("/api/test-sms", async (req, res, next) => {
  try {
    await sendSms(process.env.ADMIN_PHONE, "Test SMS working");
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

/** ✅ Routes */
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);

/** ✅ Error handler */
app.use(errorHandler);

/** ✅ Start */
const PORT = process.env.PORT || 5005;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`API running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });
