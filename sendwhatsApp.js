const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const SID = process.env.TWILIO_ACCOUNT_SID;
    const TOKEN = process.env.TWILIO_AUTH_TOKEN;
    const FROM = process.env.TWILIO_WHATSAPP_FROM;
    const recipientsEnv = process.env.WHATSAPP_RECIPIENTS || "";
    const recipients = recipientsEnv.split(",").map(s => s.trim()).filter(Boolean);

    if (!SID || !TOKEN || !FROM || recipients.length === 0) {
      return { statusCode: 500, body: JSON.stringify({ ok: false, msg: "Twilio not configured" }) };
    }

    const payload = body.payload || {};
    const text = `New booking request:
Name: ${payload.from_name || "—"}
Phone: ${payload.phone || "—"}
Email: ${payload.reply_to || "—"}
Service: ${payload.service || "—"}
Message: ${payload.message || "—"}`;

    const promises = recipients.map(async (to) => {
      const url = `https://api.twilio.com/2010-04-01/Accounts/${SID}/Messages.json`;
      const params = new URLSearchParams();
      params.append("To", `whatsapp:${to}`);
      params.append("From", FROM);
      params.append("Body", text);

      const res = await fetch(url, {
        method: "POST",
        body: params,
        headers: {
          Authorization: "Basic " + Buffer.from(`${SID}:${TOKEN}`).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      const data = await res.text();
      return { status: res.status, body: data };
    });

    const results = await Promise.all(promises);
    return { statusCode: 200, body: JSON.stringify({ ok: true, results }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ ok: false, err: String(err) }) };
  }
};