const twilio = require("twilio");
const { env } = require("../config/env");

const sid = env.TWILIO_ACCOUNT_SID;
const token = env.TWILIO_AUTH_TOKEN;

let client = null;
if (sid && token) {
  client = twilio(sid, token);
}

exports.sendSms = async (to, body) => {
  if (!client) return; // allow running without SMS configured
  if (!to) return;

  await client.messages.create({
    from: env.TWILIO_FROM,
    to,
    body,
  });
};
