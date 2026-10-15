/**
 * The enquiry email.
 *
 * Built to survive real mail clients, which is a narrower target than a
 * browser: no external stylesheet, no web font, no flexbox, and a hard
 * assumption that anything clever degrades into something ugly. So it is a
 * 600px table with inline styles only, on the site's own palette —
 * teal #264d49, rose #b2544d, cream #faf7f2 — the exact pairings the site
 * passes its own contrast audit with.
 *
 * Every value that arrives from a visitor is escaped before it goes near a
 * tag. Nothing from the form is ever interpolated unescaped.
 */

import { site } from "./site";

/* ------------------------------------------------------------------ *
 * Types
 * ------------------------------------------------------------------ */

export type InquiryField = { label: string; value: string };

export type Inquiry = {
  /** The form's own subject line, e.g. "Booking Inquiry — Dr. Ebony OH". */
  subject: string;
  /** The page the submission came from. */
  page: string;
  /** Label/value pairs, in the order the form presented them. */
  fields: InquiryField[];
  /** Long-form message, if the form had one. */
  message?: string;
  /** The sender's own email address — becomes Reply-To. */
  replyTo?: string;
  /** When it arrived, already formatted for display. */
  receivedAt?: string;
};

/* ------------------------------------------------------------------ *
 * Palette — the brand, in the four values an email actually needs
 * ------------------------------------------------------------------ */

const C = {
  teal: "#264d49",
  tealDeep: "#1c3a36",
  rose: "#b2544d",
  roseDeep: "#8f3f39",
  cream: "#faf7f2",
  bone: "#fffdf9",
  ink: "#2f3436",
  inkMute: "#5f6668",
  rule: "#e3ddd2",
} as const;

const FONT_SERIF = "Georgia, 'Times New Roman', Times, serif";
const FONT_SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/* ------------------------------------------------------------------ *
 * Escaping
 * ------------------------------------------------------------------ */

/** Escape a value for an HTML text node or an attribute. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Keep a very long single-line field from breaking the table. */
function wrap(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\r?\n/g, "<br />");
}

const stamp = (iso?: string) =>
  iso ?? new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";

/* ------------------------------------------------------------------ *
 * HTML
 * ------------------------------------------------------------------ */

export function renderHtml(inquiry: Inquiry): string {
  const { subject, page, fields, message, replyTo } = inquiry;

  /** The first field that looks like a name, for the greeting. */
  const named = fields.find((f) => /^(first name|name)$/i.test(f.label))?.value;
  const email = replyTo ?? fields.find((f) => /email/i.test(f.label))?.value ?? "";
  const greeting = named ? `New enquiry from ${escapeHtml(named)}` : "New website enquiry";

  const rows = fields
    .map(
      (f) => `
            <tr>
              <td style="padding:10px 16px;border-bottom:1px solid ${C.rule};color:${C.inkMute};font:500 12px/1.4 ${FONT_SANS};letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;width:190px;vertical-align:top;">
                ${escapeHtml(f.label)}
              </td>
              <td style="padding:10px 16px;border-bottom:1px solid ${C.rule};color:${C.ink};font:400 15px/1.55 ${FONT_SANS};vertical-align:top;">
                ${wrap(f.value)}
              </td>
            </tr>`,
    )
    .join("");

  const messageBlock = message
    ? `
            <tr>
              <td style="padding:22px 16px 6px;">
                <p style="margin:0;font:500 12px/1.4 ${FONT_SANS};letter-spacing:.06em;text-transform:uppercase;color:${C.inkMute};">
                  Their message
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 16px 22px;">
                <div style="background:${C.bone};border-left:3px solid ${C.rose};padding:16px 18px;color:${C.ink};font:400 15px/1.65 ${FONT_SERIF};">
                  ${wrap(message)}
                </div>
              </td>
            </tr>`
    : "";

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light" />
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${C.cream};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(greeting)} — ${escapeHtml(fields.map((f) => `${f.label}: ${f.value}`).join(" · "))}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.cream};">
    <tr>
      <td align="center" style="padding:28px 12px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:${C.bone};border:1px solid ${C.rule};">

          <!-- Masthead -->
          <tr>
            <td style="background:${C.teal};padding:26px 32px;">
              <p style="margin:0;font:400 11px/1 ${FONT_SANS};letter-spacing:.28em;text-transform:uppercase;color:${C.cream};opacity:.75;">
                The Garden's Executive Club
              </p>
              <h1 style="margin:12px 0 0;font:400 26px/1.2 ${FONT_SERIF};color:${C.cream};">
                ${escapeHtml(greeting)}
              </h1>
            </td>
          </tr>

          <!-- Type of enquiry -->
          <tr>
            <td style="padding:22px 32px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:${C.rose};padding:6px 12px;font:600 11px/1 ${FONT_SANS};letter-spacing:.14em;text-transform:uppercase;color:#ffffff;">
                    ${escapeHtml(subject)}
                  </td>
                </tr>
              </table>
              <p style="margin:16px 0 0;font:400 14px/1.6 ${FONT_SANS};color:${C.inkMute};">
                Received ${escapeHtml(stamp(inquiry.receivedAt))} from
                <a href="${escapeHtml(page.startsWith("http") ? page : `https://${site.url.replace(/^https?:\/\//, "")}${page}`)}" style="color:${C.roseDeep};">${escapeHtml(page)}</a>
              </p>
            </td>
          </tr>

          <!-- Fields -->
          <tr>
            <td style="padding:22px 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${C.rule};">
                ${rows}
              </table>
            </td>
          </tr>

          ${messageBlock}

          <!-- Reply -->
          <tr>
            <td style="padding:26px 32px 6px;">
              <p style="margin:0;font:400 15px/1.6 ${FONT_SANS};color:${C.ink};">
                Reply straight to this message and it goes to
                ${email ? `<a href="mailto:${escapeHtml(email)}" style="color:${C.roseDeep};">${escapeHtml(email)}</a>` : "the sender"}
                — they will see your reply.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:${C.tealDeep};padding:24px 32px;">
              <p style="margin:0;font:400 22px/1.25 ${FONT_SERIF};color:${C.cream};">
                Plant seeds. Build legacies.
              </p>
              <p style="margin:14px 0 0;font:400 12px/1.7 ${FONT_SANS};color:${C.cream};opacity:.7;">
                ${escapeHtml(site.legalName)}<br />
                ${escapeHtml(site.address.line1)}, ${escapeHtml(site.address.line2)}<br />
                ${escapeHtml(site.contact.email)} · ${escapeHtml(site.contact.phoneDisplay)}
              </p>
            </td>
          </tr>

        </table>

        <p style="margin:18px 0 0;font:400 11px/1.6 ${FONT_SANS};color:${C.inkMute};text-align:center;">
          Sent by the enquiry form on ${escapeHtml(site.name)}.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ------------------------------------------------------------------ *
 * Plain text
 *
 * This is not a fallback for old clients — it is what a reader sees in the
 * notification preview, and Gmail's spam scoring reads it closely. It has to
 * read as a complete, deliberate message on its own.
 * ------------------------------------------------------------------ */

export function renderText(inquiry: Inquiry): string {
  const { subject, page, fields, message, replyTo } = inquiry;
  const rule = "─".repeat(52);

  const lines: string[] = [
    subject.toUpperCase(),
    "",
    `${site.legalName} — website enquiry`,
    `Received ${stamp(inquiry.receivedAt)}`,
    `From page: ${page}`,
    "",
    rule,
  ];

  for (const f of fields) {
    lines.push(`${f.label}: ${f.value}`);
  }

  if (message) {
    lines.push("", rule, "", "THEIR MESSAGE", "", message);
  }

  const email = replyTo ?? fields.find((f) => /email/i.test(f.label))?.value ?? "";
  lines.push(
    "",
    rule,
    "",
    email
      ? `Reply to this email to go straight back to ${email}.`
      : "Reply to this email to go back to the sender.",
    "",
    `${site.legalName}`,
    `${site.address.line1}, ${site.address.line2}`,
    `${site.contact.email} · ${site.contact.phoneDisplay}`,
  );

  return lines.join("\n");
}