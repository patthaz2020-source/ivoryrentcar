const express = require("express");
const { body } = require("express-validator");
const { validate } = require("../middleware/validation");
const { registerAdmin, login } = require("../controllers/authController");

const router = express.Router();

// ✅ Register admin
router.post(
  "/register-admin",
  [
    body("fullName").notEmpty().withMessage("fullName is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("phone").notEmpty().withMessage("phone is required"),
    body("password").isLength({ min: 6 }).withMessage("Password min 6 chars"),
    validate,
  ],
  registerAdmin
);

// ✅ Admin login (single route, validated)
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("password required"),
    validate,
  ],
  login
);

module.exports = router;
