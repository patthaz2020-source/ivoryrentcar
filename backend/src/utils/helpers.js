const nodemailer = require("nodemailer");
const twilio = require("twilio");
const { env } = require("../config/env");

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: false,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

const twilioClient = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);

async function sendEmail({ to, subject, html }) {
  return transporter.sendMail({
    from: env.SMTP_FROM,
    to,
    subject,
    html,
  });
}

async function sendSms({ to, message }) {
  // Twilio needs E.164 format phone numbers: +94xxxxxxxxx
  return twilioClient.messages.create({
    body: message,
    from: env.TWILIO_FROM,
    to,
  });
}

function formatDate(d) {
  const dt = new Date(d);
  return dt.toLocaleString();
}

module.exports = { sendEmail, sendSms, formatDate };
