const twilio = require("twilio");

let client = null;

// ✅ Only initialize Twilio if credentials look valid
if (
  process.env.TWILIO_ACCOUNT_SID?.startsWith("AC") &&
  process.env.TWILIO_AUTH_TOKEN &&
  process.env.TWILIO_FROM
) {
  client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  console.log("✅ Twilio SMS enabled");
} else {
  console.log("⚠️ Twilio SMS disabled (credentials missing or invalid)");
}

exports.sendSms = async (to, body) => {
  if (!client) return; // ✅ silently skip SMS
  if (!to) return;

  await client.messages.create({
    from: process.env.TWILIO_FROM,
    to,
    body,
  });
};
