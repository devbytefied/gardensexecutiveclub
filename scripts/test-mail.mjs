/**
 * Sends one real enquiry through the live endpoint, exactly as a browser would.
 *
 *   node scripts/test-mail.mjs [--to someone@example.com]
 *
 * Uses MAIL_* from .env.local. It is a smoke test for the SMTP credentials,
 * the branded template and the Reply-To header — the things that only fail
 * once something actually goes over the wire.
 */

import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./build-output.mjs";

/* ---- .env.local ------------------------------------------------------ */

function loadEnv() {
  const file = path.join(ROOT, ".env.local");
  if (!fs.existsSync(file)) {
    console.error("No .env.local. Copy .env.example and fill in MAIL_PASSWORD.");
    process.exit(1);
  }
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
loadEnv();

const to = process.argv.includes("--to")
  ? process.argv[process.argv.indexOf("--to") + 1]
  : process.env.MAIL_TO;

/* ---- The submission -------------------------------------------------- */

const payload = {
  subject: "Booking Inquiry — Dr. Ebony OH",
  page: "/epk/",
  replyTo: "test.sender@example.com",
  message:
    "We would love Dr. OH to open our annual leadership summit in Atlanta.\nThe room is 400 executives across technology and financial services, and we would want her to speak on building through ownership.",
  company_website: "",
  fields: [
    { label: "First name", value: "Rowan" },
    { label: "Last name", value: "Mercer" },
    { label: "Email address", value: "test.sender@example.com" },
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
      value: "400 senior executives, technology and financial services.",
    },
    { label: "Indicative budget", value: "$25,000 and above" },
  ],
};

console.log(`Sending test enquiry to ${to} …`);

const res = await fetch("http://localhost:3000/api/inquiry/", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(payload),
});

const body = await res.json().catch(() => null);

if (!res.ok || !body?.ok) {
  console.error(`✗ ${res.status}`, body);
  process.exit(1);
}

console.log(`✓ Delivered. Check ${to}, and that Reply goes to ${payload.replyTo}.`);