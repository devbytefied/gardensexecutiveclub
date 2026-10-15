import { NextResponse } from "next/server";
import { sendInquiry } from "@/lib/mail";

/**
 * The single endpoint every form on the site posts to.
 *
 * Six forms (apply, nominate, booking EPK, venue, Magnolia, contact) share
 * one route so there is one place where input is validated, rate-limited and
 * delivered. The client only ever learns "sent" or "not sent" — the SMTP host,
 * credentials and mailbox are server-only.
 *
 * It accepts two shapes, and the second one matters:
 *
 *   application/json            what the hydrated form sends
 *   form-urlencoded             what the browser sends on its own
 *
 * The second is the safety net. A form whose JavaScript has not loaded —
 * a stale tab, a blocked script, an old cached chunk — would otherwise do a
 * native GET, reload the page, and look like an inert button. With a real
 * `action` on the form, the same submission still lands, and the visitor is
 * redirected to the thank-you page instead of watching the form reset.
 */

export const runtime = "nodejs";

/** Nothing here should ever be cached. */
export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ *
 * Limits
 * ------------------------------------------------------------------ */

const MAX_BODY = 32 * 1024;
const MAX_VALUE = 4000;
const MAX_FIELDS = 40;

/**
 * A crude per-IP throttle. Enough to stop a form being used as a spam relay
 * from one address; it is not a substitute for a captcha, and it resets
 * whenever the instance recycles — which is the trade for zero dependencies.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function throttled(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

/* ------------------------------------------------------------------ *
 * Validation
 * ------------------------------------------------------------------ */

type Field = { label: string; value: string };

type Submission = {
  subject: string;
  page: string;
  message: string;
  replyTo: string;
  honeypot: string;
  fields: Field[];
  /** A plain browser form post, which cannot be answered with JSON. */
  isFormPost: boolean;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: unknown, max = MAX_VALUE): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * Both request shapes collapse into one Submission before anything else runs,
 * so validation and delivery only ever have one shape to reason about.
 */
async function parse(request: Request): Promise<Submission> {
  const contentType = request.headers.get("content-type") ?? "";
  const isFormPost = contentType.includes("application/x-www-form-urlencoded");

  if (isFormPost) {
    const data = await request.formData();

    /**
     * A no-JS post sends bare input names. The labels travel alongside them
     * in `_labels`, because "Who is in the room?" is what the club wants to
     * read in the inbox, not "audience".
     */
    let labels: { name: string; label: string }[] = [];
    try {
      const parsed = JSON.parse(clean(data.get("_labels"), MAX_BODY));
      if (Array.isArray(parsed)) labels = parsed;
    } catch {
      /* fall through to a name-as-label submission */
    }

    const fields: Field[] = labels.slice(0, MAX_FIELDS)
      .map(({ name, label }) => ({
        label: clean(label, 80),
        value: clean(data.get(name)),
      }))
      .filter((f) => f.label && f.value);

    /**
     * The long textarea is a labelled field like any other, but it belongs in
     * the message block rather than in the rows. `_labels` carries the input
     * names, so the server can spot it without the browser's help.
     */
    const messageField = labels.find((l) => l.name === "message");
    const message = messageField
      ? clean(data.get(messageField.name))
      : clean(data.get("_message"));

    return {
      subject: clean(data.get("_subject"), 200),
      page: clean(data.get("_page"), 300),
      message,
      replyTo: clean(data.get("_replyTo"), 200),
      honeypot: clean(data.get("company_website")),
      fields: fields.filter((f) => f.label !== messageField?.label || !message),
      isFormPost,
    };
  }

  const text = await request.text();
  if (text.length > MAX_BODY) throw new Error("TOO_LARGE");

  const body = JSON.parse(text) as {
    subject?: unknown;
    page?: unknown;
    message?: unknown;
    replyTo?: unknown;
    company_website?: unknown;
    fields?: unknown;
  };

  const raw = Array.isArray(body.fields) ? body.fields.slice(0, MAX_FIELDS) : [];
  const fields = raw
    .map((f) => {
      const field = f as { label?: unknown; value?: unknown };
      return { label: clean(field.label, 80), value: clean(field.value) };
    })
    .filter((f) => f.label && f.value);

  return {
    subject: clean(body.subject, 200),
    page: clean(body.page, 300),
    message: clean(body.message),
    replyTo: clean(body.replyTo, 200),
    honeypot: clean(body.company_website),
    fields,
    isFormPost,
  };
}

/** Where a plain form post lands — human-readable, never a JSON blob. */
function thankYou(request: Request, sent: boolean): NextResponse {
  const url = new URL("/thank-you/", request.url);
  if (!sent) url.searchParams.set("status", "error");
  return NextResponse.redirect(url, 303);
}

/* ------------------------------------------------------------------ *
 * POST
 * ------------------------------------------------------------------ */

export async function POST(request: Request) {
  let submission: Submission | undefined;

  try {
    submission = await parse(request);
  } catch (err) {
    const tooLarge = err instanceof Error && err.message === "TOO_LARGE";
    if (submission?.isFormPost) return thankYou(request, false);
    return NextResponse.json(
      {
        ok: false,
        error: tooLarge
          ? "That submission is too large."
          : "We could not read that submission.",
      },
      { status: tooLarge ? 413 : 400 },
    );
  }

  // Honeypot: bots get a success and learn nothing.
  if (submission.honeypot) {
    return submission.isFormPost
      ? thankYou(request, true)
      : NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (throttled(ip)) {
    if (submission.isFormPost) return thankYou(request, false);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Several messages have come from this connection in a short time. Please try again shortly, or email us directly.",
      },
      { status: 429 },
    );
  }

  if (!submission.subject || !submission.fields.length) {
    if (submission.isFormPost) return thankYou(request, false);
    return NextResponse.json(
      {
        ok: false,
        error: "That submission arrived empty. Please try again.",
      },
      { status: 400 },
    );
  }

  // The reply address has to be a real one, or Reply-To would break.
  const emailField =
    submission.fields.find((f) => /email/i.test(f.label))?.value ?? "";
  const reply = EMAIL.test(submission.replyTo)
    ? submission.replyTo
    : EMAIL.test(emailField)
      ? emailField
      : undefined;

  const result = await sendInquiry({
    subject: submission.subject,
    page: submission.page || "/",
    fields: submission.fields,
    message: submission.message || undefined,
    replyTo: reply,
  });

  if (!result.ok) {
    console.error("[inquiry] failed:", submission.subject, result.error);
    if (submission.isFormPost) return thankYou(request, false);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not send that just now. Please try again, or email info@gardensexecutiveclub.com.",
      },
      { status: 502 },
    );
  }

  if (submission.isFormPost) return thankYou(request, true);
  return NextResponse.json({ ok: true });
}