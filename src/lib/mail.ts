import "server-only";

/**
 * Outbound mail, over SMTP with Nodemailer.
 *
 * One transport for the whole site: every form posts to /api/inquiry, and
 * every submission is delivered here. There is no client-side SDK and no
 * public key, so nothing about the mailbox is ever exposed to the browser.
 *
 * Configuration is server-side only (see .env.example). Nothing in this file
 * may be imported from a client component.
 */

import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { renderHtml, renderText, type Inquiry } from "./mail-template";

export const mailConfig = {
  host: process.env.MAIL_HOST ?? "smtp.gmail.com",
  port: Number(process.env.MAIL_PORT ?? 465),
  /** 465 is implicit TLS; 587 is STARTTLS. The scheme follows the port. */
  secure: (process.env.MAIL_SECURE ?? "true") !== "false",
  user: process.env.MAIL_USER ?? "",
  pass: process.env.MAIL_PASSWORD ?? "",
  /** The name shown against the sending address. */
  fromName: process.env.MAIL_FROM_NAME ?? "The Garden's Executive Club",
  /** Where submissions land. Flipped by changing one env value. */
  to: process.env.MAIL_TO ?? "",
} as const;

export const mailConfigured = Boolean(mailConfig.user && mailConfig.pass && mailConfig.to);

let transporter: Transporter | null = null;

/**
 * A fresh transport per send rather than a pooled one.
 *
 * Gmail throttles long-lived authenticated connections, and a serverless
 * function may sit idle for minutes between invocations. `pooled: false`
 * means one connect → send → close cycle per request, which is exactly what
 * the timeout below is guarding.
 */
function getTransport(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: mailConfig.secure,
      auth: { user: mailConfig.user, pass: mailConfig.pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });
  }
  return transporter;
}

/** The address mail is sent from, as a display string. */
export function fromAddress(): string {
  return `${mailConfig.fromName} <${mailConfig.user}>`;
}

export type SendResult = { ok: true } | { ok: false; error: string };

/**
 * Deliver one enquiry. Never throws: the route turns a failure into a
 * readable message, and the server log keeps the raw error.
 */
export async function sendInquiry(inquiry: Inquiry): Promise<SendResult> {
  if (!mailConfigured) {
    return {
      ok: false,
      error:
        "Mail is not configured on this server. Set MAIL_USER, MAIL_PASSWORD and MAIL_TO.",
    };
  }

  const { subject, page, replyTo } = inquiry;

  try {
    await getTransport().sendMail({
      from: fromAddress(),
      to: mailConfig.to,
      // Replying to the notification must reach the person who filled the form
      // in, not the club's own mailbox.
      replyTo: replyTo && replyTo.includes("@") ? replyTo : undefined,
      subject,
      text: renderText(inquiry),
      html: renderHtml(inquiry),
      headers: {
        "X-Mailer": "gardensexecutiveclub.com",
        ...(page ? { "X-Inquiry-Page": page } : {}),
      },
    });
    return { ok: true };
  } catch (err) {
    console.error("[mail] delivery failed:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unknown mail error",
    };
  }
}

/* ------------------------------------------------------------------ *
 * Template
 *
 * Email clients are hostile to design: no external stylesheets, no web
 * fonts, no flexbox worth relying on, and Outlook ignores most of what
 * modern CSS offers. So this is a table layout with inline styles only,
 * built on the site's own palette (teal #264d49, rose #b2544d, cream
 * #faf7f2) — the same colours the site passes its own contrast audit with.
 * ------------------------------------------------------------------ */

export type { Inquiry } from "./mail-template";