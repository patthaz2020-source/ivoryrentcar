require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const { connectDB } = require("./config/database");
const { errorHandler } = require("./middleware/errorHandler");

// ✅ create app FIRST
const app = express();
app.set("trust proxy", 1);

// ✅ CORS right after app is created
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://ivoryrentcar-1.onrender.com",
  "https://ivoryrentcar.onrender.com",
];

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);              // curl/postman
    if (allowedOrigins.includes(origin)) return cb(null, origin);
    return cb(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

// ✅ Middleware
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ✅ Static uploads
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// ✅ Health
app.get("/api/health", (req, res) => res.json({ ok: true }));

// ✅ Routes (keep these below CORS!)
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/vehicles", require("./routes/vehicleRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

// ✅ Error handler last
app.use(errorHandler);

// ✅ Start
const PORT = process.env.PORT || 5005;

connectDB()
  .then(() => app.listen(PORT, () => console.log(`API running on port ${PORT}`)))
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });
