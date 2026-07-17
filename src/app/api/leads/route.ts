import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { saveLead, type Lead } from "@/lib/leads";
import { randomUUID } from "crypto";

const INTEREST_LABELS: Record<string, string> = {
  demo: "Book a Demo",
  "brand-cure": "Brand Cure Consultation",
  forca: "Forca Early Access",
  general: "General Inquiry",
};

const INTEREST_NEXT_STEPS: Record<string, string> = {
  demo: "We'll schedule a live call where you can see DemoAgent conduct an actual sales demo on Google Meet, Zoom, or Teams.",
  "brand-cure": "We'll hop on a call to understand your marketing goals and show you exactly how Brand Cure can help.",
  forca: "We'll reach out to understand your CA practice's workflow and set up a walkthrough of Forca.",
  general: "One of our team members will reach out to answer your questions and explore how we can help.",
};

function getTransporter() {
  const port = Number(process.env.SMTP_PORT ?? 465);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.zoho.in",
    port,
    secure: port === 465,
    auth: {
      type: "LOGIN" as const, // Zoho requires LOGIN, not PLAIN
      user: process.env.SMTP_USER ?? "",
      pass: process.env.SMTP_PASS ?? "",
    },
    tls: { rejectUnauthorized: true },
  });
}

/* ── Email to admin(s) — new lead notification ────────────── */
function buildAdminEmail(lead: Lead): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#09090b;font-family:Arial,sans-serif;">
  <div style="max-width:540px;margin:40px auto;background:#141414;border:1px solid #222;border-radius:14px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#065f46,#10b981);padding:26px 28px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#d1fae5;margin-bottom:5px;">
        New inbound lead — Grewbie.com
      </div>
      <div style="font-size:24px;font-weight:800;color:#fff;">${lead.name}</div>
      <div style="font-size:13px;color:#a7f3d0;margin-top:3px;">${INTEREST_LABELS[lead.interest] ?? lead.interest}</div>
    </div>
    <div style="padding:24px 28px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:9px 0;border-bottom:1px solid #222;color:#555;font-size:12px;width:100px;">Email</td>
          <td style="padding:9px 0;border-bottom:1px solid #222;font-size:13px;">
            <a href="mailto:${lead.email}" style="color:#10b981;">${lead.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:9px 0;border-bottom:1px solid #222;color:#555;font-size:12px;">Phone</td>
          <td style="padding:9px 0;border-bottom:1px solid #222;color:#e4e4e7;font-size:13px;">
            ${lead.phone ? `<a href="tel:${lead.phone}" style="color:#10b981;">${lead.phone}</a>` : "—"}
          </td>
        </tr>
        <tr>
          <td style="padding:9px 0;border-bottom:1px solid #222;color:#555;font-size:12px;">Company</td>
          <td style="padding:9px 0;border-bottom:1px solid #222;color:#e4e4e7;font-size:13px;">${lead.company || "—"}</td>
        </tr>
        <tr>
          <td style="padding:9px 0;border-bottom:1px solid #222;color:#555;font-size:12px;">Interest</td>
          <td style="padding:9px 0;border-bottom:1px solid #222;color:#e4e4e7;font-size:13px;">${INTEREST_LABELS[lead.interest] ?? lead.interest}</td>
        </tr>
        <tr>
          <td style="padding:9px 0;border-bottom:1px solid #222;color:#555;font-size:12px;">Time</td>
          <td style="padding:9px 0;border-bottom:1px solid #222;color:#e4e4e7;font-size:13px;">
            ${new Date(lead.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
          </td>
        </tr>
        ${lead.message ? `
        <tr>
          <td style="padding:9px 0;color:#555;font-size:12px;vertical-align:top;">Message</td>
          <td style="padding:9px 0;color:#e4e4e7;font-size:13px;line-height:1.6;">${lead.message.replace(/\n/g, "<br>")}</td>
        </tr>` : ""}
      </table>
    </div>
    <div style="padding:14px 28px;border-top:1px solid #1f1f1f;background:#0d0d0d;">
      <a href="mailto:${lead.email}" style="display:inline-block;padding:10px 20px;background:#10b981;color:#000;font-weight:700;font-size:13px;border-radius:8px;text-decoration:none;margin-right:10px;">
        Reply to ${lead.name.split(" ")[0]} →
      </a>
      <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://grewbie.com"}/admin/leads" style="font-size:12px;color:#10b981;text-decoration:none;">
        View all leads
      </a>
    </div>
  </div>
</body>
</html>`;
}

/* ── Email to lead — confirmation / thank you ─────────────── */
function buildConfirmationEmail(lead: Lead): string {
  const firstName = lead.name.split(" ")[0];
  const nextStep = INTEREST_NEXT_STEPS[lead.interest] ?? INTEREST_NEXT_STEPS.general;

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">
  <div style="max-width:540px;margin:40px auto;background:#ffffff;border:1px solid #e4e4e7;border-radius:14px;overflow:hidden;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#065f46,#10b981);padding:32px 32px 28px;">
      <div style="font-size:13px;color:#d1fae5;margin-bottom:6px;">Grewbie Technologies</div>
      <div style="font-size:22px;font-weight:800;color:#fff;line-height:1.3;">
        Hey ${firstName}, we got your message!
      </div>
    </div>

    <!-- Body -->
    <div style="padding:28px 32px;">
      <p style="font-size:15px;color:#3f3f46;line-height:1.7;margin:0 0 18px;">
        Thanks for reaching out about <strong style="color:#10b981;">${INTEREST_LABELS[lead.interest] ?? lead.interest}</strong>.
        We typically reply within <strong>24 hours</strong> — usually much faster.
      </p>

      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#15803d;margin-bottom:6px;">
          What happens next
        </div>
        <p style="font-size:14px;color:#166534;line-height:1.6;margin:0;">
          ${nextStep}
        </p>
      </div>

      <p style="font-size:14px;color:#71717a;line-height:1.6;margin:0 0 8px;">
        In the meantime, feel free to reply to this email or reach us directly:
      </p>
      <p style="font-size:14px;margin:0;">
        <a href="mailto:support@grewbie.com" style="color:#10b981;">support@grewbie.com</a>
        &nbsp;·&nbsp;
        <a href="tel:+918838924425" style="color:#10b981;">+91 88389 24425</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="padding:18px 32px;border-top:1px solid #f4f4f5;background:#fafafa;">
      <div style="font-size:12px;color:#a1a1aa;">
        You're receiving this because you submitted a form at
        <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://grewbie.com"}" style="color:#10b981;">grewbie.com</a>.
        <br/>Grewbie Technologies Pvt Ltd · Tamil Nadu, India
      </div>
    </div>

  </div>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, interest, message, source } = body;

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const lead: Lead = {
      id: randomUUID(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || undefined,
      company: company?.trim() || undefined,
      interest: interest || "general",
      message: message?.trim() || undefined,
      source: source || "website",
      createdAt: new Date().toISOString(),
    };

    // Always save to file first — never lose a lead
    saveLead(lead);

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = getTransporter();

      // Fire both emails concurrently
      const results = await Promise.allSettled([

        // 1. Notify admin(s)
        transporter.sendMail({
          from: `"Grewbie Leads" <${process.env.SMTP_USER}>`,
          to: process.env.LEAD_NOTIFY_EMAILS ?? process.env.SMTP_USER,
          replyTo: lead.email,
          subject: `New lead: ${lead.name} — ${INTEREST_LABELS[lead.interest] ?? lead.interest}`,
          html: buildAdminEmail(lead),
        }),

        // 2. Confirm to the lead
        transporter.sendMail({
          from: `"Grewbie Technologies" <${process.env.SMTP_USER}>`,
          to: lead.email,
          replyTo: process.env.SMTP_USER,
          subject: `Got your message, ${lead.name.split(" ")[0]}! We'll be in touch soon.`,
          html: buildConfirmationEmail(lead),
        }),

      ]);

      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error(`[leads] Email ${i === 0 ? "admin" : "confirmation"} failed:`, r.reason);
        }
      });
    } else {
      console.warn("[leads] SMTP_USER / SMTP_PASS not set — emails skipped. Lead saved to file.");
    }

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (err) {
    console.error("[leads] Unhandled error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
