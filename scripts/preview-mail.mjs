/**
 * Renders the enquiry email to .qa/ so the one thing a browser never shows
 * you can be looked at.
 *
 *   pnpm dev                      (in another terminal)
 *   node scripts/preview-mail.mjs
 *
 * Fetches the sample enquiry from the dev-only preview route, writes the HTML
 * and the plain-text alternative to disk, and screenshots the result in the
 * same Chromium the audit uses.
 */

import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";
import { ROOT } from "./build-output.mjs";

const BASE = process.env.PREVIEW_ORIGIN ?? "http://localhost:3000";
const SHOTS = path.join(ROOT, ".qa");

fs.mkdirSync(SHOTS, { recursive: true });

const res = await fetch(`${BASE}/api/inquiry/preview/`, { method: "POST" });
if (!res.ok) {
  console.error(`✗ ${res.status} — is the dev server running on ${BASE}?`);
  process.exit(1);
}

const html = await res.text();
const htmlPath = path.join(SHOTS, "inquiry-preview.html");
fs.writeFileSync(htmlPath, html);

const textRes = await fetch(`${BASE}/api/inquiry/preview/?format=text`);
if (textRes.ok) {
  fs.writeFileSync(path.join(SHOTS, "inquiry-preview.txt"), await textRes.text());
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 760, height: 1000 },
  deviceScaleFactor: 2,
});
await page.goto(`file://${htmlPath.replace(/\\/g, "/")}`);
await page.screenshot({ path: path.join(SHOTS, "inquiry-email.png"), fullPage: true });
await browser.close();

console.log("HTML  → .qa/inquiry-preview.html");
console.log("Text  → .qa/inquiry-preview.txt");
console.log("Image → .qa/inquiry-email.png");