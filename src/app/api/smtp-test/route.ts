import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// GET /api/smtp-test — verify Zoho SMTP credentials without sending a real email
// Remove or protect this route before going to production
export async function GET() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const host = process.env.SMTP_HOST ?? "smtp.zoho.in";
  const port = Number(process.env.SMTP_PORT ?? 465);

  if (!user || !pass) {
    return NextResponse.json({
      ok: false,
      error: "SMTP_USER or SMTP_PASS is missing in .env.local",
    }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { type: "LOGIN", user, pass },
    tls: { rejectUnauthorized: true },
  });

  try {
    await transporter.verify();
    return NextResponse.json({
      ok: true,
      message: "Zoho SMTP connection verified successfully.",
      config: { host, port, user },
    });
  } catch (err: unknown) {
    const e = err as { message?: string; code?: string; responseCode?: number; response?: string };
    return NextResponse.json({
      ok: false,
      error: e.message,
      code: e.code,
      responseCode: e.responseCode,
      hint: getHint(e.code, e.responseCode),
    }, { status: 500 });
  }
}

function getHint(code?: string, responseCode?: number): string {
  if (responseCode === 535 || code === "EAUTH") {
    return [
      "Authentication failed. Try these fixes in order:",
      "1. Make sure SMTP is enabled: mail.zoho.in → Settings → Mail Accounts → your account → SMTP",
      "2. If 2FA is ON: Settings → Security → App Passwords → generate one and use it as SMTP_PASS",
      "3. If 2FA is OFF: use your normal Zoho login password",
      "4. Try port 587 — set SMTP_PORT=587 in .env.local (some accounts only support TLS)",
      "5. Make sure SMTP_USER is your full email address e.g. support@grewbie.com",
    ].join("\n");
  }
  if (code === "ECONNREFUSED") return "Connection refused — check SMTP_HOST and SMTP_PORT.";
  if (code === "ETIMEDOUT") return "Connection timed out — firewall may be blocking port " + (responseCode ?? "");
  return "Check your .env.local values and Zoho Mail SMTP settings.";
}
