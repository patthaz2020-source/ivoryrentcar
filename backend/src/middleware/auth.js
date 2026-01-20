const jwt = require("jsonwebtoken");
const { env } = require("../config/env");

function authRequired(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: missing token" });
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    req.user = payload; // { userId, role }
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: invalid token" });
  }
}

function adminOnly(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: admin only" });
  }
  next();
}

module.exports = { authRequired, adminOnly };
