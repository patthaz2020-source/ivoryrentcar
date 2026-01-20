const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { env } = require("../config/env");

function signToken(user) {
  return jwt.sign(
    { userId: user._id.toString(), role: user.role },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );
}

async function registerAdmin(req, res) {
  const { fullName, email, phone, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already exists" });

  const passwordHash = await User.hashPassword(password);

  const user = await User.create({
    fullName,
    email,
    phone,
    passwordHash,
    role: "admin",
  });

  const token = signToken(user);
  res.status(201).json({ token, user: { id: user._id, fullName, email, phone, role: user.role } });
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email, isActive: true });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken(user);
  res.json({ token, user: { id: user._id, fullName: user.fullName, email: user.email, phone: user.phone, role: user.role } });
}

module.exports = { registerAdmin, login };
