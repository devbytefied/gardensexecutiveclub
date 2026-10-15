/**
 * Did the outcome actually reach the reader?
 *
 *   node scripts/test-form-outcome.mjs [route]
 *
 * The bug this guards against: a thirteen-field form, the visitor scrolls to
 * the bottom to click send, and the confirmation renders somewhere above the
 * fold — so a successful send looks like nothing happened. The test fills the
 * form, scrolls to the very bottom, submits, and asserts the outcome is
 * inside the viewport afterwards.
 */

import { chromium } from "playwright-core";

const BASE = process.env.TEST_ORIGIN ?? "http://localhost:3000";
const route = process.argv.find((a) => a.startsWith("/")) ?? "/epk/";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const api = [];
page.on("response", (r) => {
  if (r.url().includes("/api/inquiry")) api.push(`${r.status()}`);
});

await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });

for (const el of await page.locator("form [required]").all()) {
  const tag = await el.evaluate((n) => n.tagName.toLowerCase());
  const type = (await el.getAttribute("type")) ?? "";
  if (tag === "select") await el.selectOption({ index: 1 });
  else if (type === "checkbox") await el.check();
  else if (type === "date") await el.fill("2026-11-14");
  else if (type === "time") await el.fill("18:30");
  else if (type === "email") await el.fill("jordan.wells@northstarcapital.com");
  else await el.fill("Jordan Wells");
}

const textarea = page.locator("form textarea").first();
if (await textarea.count()) {
  await textarea.fill("Checking that the outcome reaches the reader, not just the DOM.");
}

/* The state a real visitor is in: scrolled to the bottom, looking at send. */
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

await page.locator("button[type=submit]").click();
await page.waitForTimeout(3500);

console.log(`API: ${api.join(", ") || "no call"}`);

// Either outcome counts as "the form told the visitor something": the
// success panel, or the bordered failure panel.
const success = page.locator("h3").filter({ hasText: /landed/i }).first();
const failure = page.locator('[role="alert"]').filter({ hasText: /did not send/i }).first();
const outcome = (await success.count()) ? success : failure;

if (!(await outcome.count())) {
  console.log("✗ No outcome panel at all.");
  await browser.close();
  process.exit(1);
}

const box = await outcome.boundingBox();
const view = page.viewportSize();
const inView = box.y > 0 && box.y < view.height;

console.log(`Outcome: "${(await outcome.innerText()).trim()}"`);
console.log(`Scrolled into view: ${inView ? "YES" : "NO"} (y=${Math.round(box.y)}, viewport ${view.height})`);

await page.screenshot({ path: ".qa/form-scrolled-to-outcome.png" });
await browser.close();

if (!inView) process.exit(1);
if (api[0] !== "200") {
  console.log(`\n⚠ the form reported, but the send returned ${api[0]}`);
  process.exit(1);
}
console.log("\n✓ The outcome is on screen and the send succeeded.");