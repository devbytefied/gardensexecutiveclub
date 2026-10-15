import { NextResponse } from "next/server";
import { renderHtml, renderText, type Inquiry } from "@/lib/mail-template";

/**
 * Renders the enquiry email in a browser, so the thing that leaves the site
 * can actually be looked at before it ships.
 *
 *   POST /api/inquiry/preview        the sample enquiry below
 *   POST /api/inquiry/preview {...}  with your own fields, to check a copy edit
 *
 * Dev and preview deployments only — on production it does not exist.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SAMPLE: Inquiry = {
  subject: "Booking Inquiry — Dr. Ebony OH",
  page: "/epk/",
  replyTo: "rowan@mercervale.com",
  receivedAt: "2026-10-13 14:52 UTC",
  fields: [
    { label: "First name", value: "Rowan" },
    { label: "Last name", value: "Mercer" },
    { label: "Email address", value: "rowan@mercervale.com" },
    { label: "Phone", value: "+1 (404) 555-0142" },
    { label: "Organisation", value: "Mercer & Vale Partners" },
    { label: "Your title", value: "Managing Partner" },
    { label: "What are you booking?", value: "Keynote" },
    { label: "Event name", value: "Northstar Leadership Summit" },
    { label: "Proposed date", value: "2026-11-14" },
    { label: "Proposed time", value: "14:30" },
    { label: "Venue or city", value: "Atlanta, Georgia" },
    {
      label: "Who is in the room?",
      value: "400 senior executives across technology and financial services.",
    },
    { label: "Indicative budget", value: "$25,000 and above" },
  ],
  message:
    "We would love Dr. OH to open our annual leadership summit in Atlanta.\n\nThe room is 400 executives across technology and financial services, and we would want her to speak on building through ownership — the theme the whole summit is built around.\n\nHappy to share a brief if that would help.",
};

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse("Not found", { status: 404 });
  }

  let inquiry = SAMPLE;
  try {
    const body = await request.json();
    if (body && Array.isArray(body.fields) && body.fields.length) inquiry = body;
  } catch {
    // No body — the sample is the right answer.
  }

  return new NextResponse(renderHtml(inquiry), {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get("format") === "text") {
    return new NextResponse(renderText(SAMPLE), {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }
  return POST(request);
}