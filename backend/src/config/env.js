require("dotenv").config();

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function optionalEnv(name, fallback = "") {
  return process.env[name] || fallback;
}

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5005,

  // ✅ REQUIRED
  MONGO_URI: requireEnv("MONGO_URI"),
  JWT_SECRET: requireEnv("JWT_SECRET"),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",

  ADMIN_EMAIL: requireEnv("ADMIN_EMAIL"),
  ADMIN_PHONE: requireEnv("ADMIN_PHONE"),

  // ✅ REQUIRED (email)
  SMTP_HOST: requireEnv("SMTP_HOST"),
  SMTP_PORT: Number(process.env.SMTP_PORT || 587),
  SMTP_USER: requireEnv("SMTP_USER"),
  SMTP_PASS: requireEnv("SMTP_PASS"),
  SMTP_FROM: optionalEnv("SMTP_FROM", "Rent App <no-reply@rentapp.com>"),

  // ✅ OPTIONAL (sms) — supports BOTH naming styles
  TWILIO_ACCOUNT_SID: optionalEnv("TWILIO_ACCOUNT_SID") || optionalEnv("TWILIO_SID"),
  TWILIO_AUTH_TOKEN: optionalEnv("TWILIO_AUTH_TOKEN") || optionalEnv("TWILIO_TOKEN"),
  TWILIO_FROM: optionalEnv("TWILIO_FROM"),

  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
};

module.exports = { env };
