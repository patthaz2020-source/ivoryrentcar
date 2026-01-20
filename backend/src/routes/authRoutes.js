const router = require("express").Router();
const { body } = require("express-validator");
const { validate } = require("../middleware/validation");
const { registerAdmin, login } = require("../controllers/authController");

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
