const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const { authRequired, adminOnly } = require("../middleware/auth");
const { createVehicle, getVehicles, getVehicleById, updateVehicle, deleteVehicle } = require("../controllers/vehicleController");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "..", "..", "uploads", "vehicles")),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`),
});

const upload = multer({ storage });

router.get("/", getVehicles);
router.get("/:id", getVehicleById);

// admin only
router.post("/", authRequired, adminOnly, upload.single("image"), createVehicle);
router.put("/:id", authRequired, adminOnly, upload.single("image"), updateVehicle);
router.delete("/:id", authRequired, adminOnly, deleteVehicle);

module.exports = router;
