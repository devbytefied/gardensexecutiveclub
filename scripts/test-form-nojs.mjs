/**
 * The form with JavaScript switched off.
 *
 *   node scripts/test-form-nojs.mjs [route]
 *
 * This is the failure a visitor hits when React has not hydrated: a stale tab,
 * a blocked script, an old cached chunk. Before the form carried an `action`,
 * the browser did a native GET, reloaded the page, and the button looked
 * inert. It must now post and land on the thank-you page.
 *
 * With no mail configured the expected result is the error variant of that
 * page — which is itself the proof the post arrived and was handled.
 */

import { chromium } from "playwright-core";

const BASE = process.env.TEST_ORIGIN ?? "http://localhost:3000";
const route = process.argv.find((a) => a.startsWith("/")) ?? "/venue/";

const browser = await chromium.launch();
const context = await browser.newContext({ javaScriptEnabled: false });
const page = await context.newPage();

await page.goto(`${BASE}${route}`, { waitUntil: "load" });

console.log(`Opened ${route} with JavaScript disabled.`);

for (const el of await page.locator("form [required]").all()) {
  const tag = await el.evaluate((n) => n.tagName.toLowerCase());
  const type = (await el.getAttribute("type")) ?? "";
  if (tag === "select") await el.selectOption({ index: 1 });
  else if (type === "checkbox") await el.check();
  else if (type === "date") await el.fill("2026-11-14");
  else if (type === "time") await el.fill("14:30");
  else if (type === "email") await el.fill("nojs@example.com");
  else await el.fill("Test value");
}

const action = await page.locator("form").getAttribute("action");
console.log(`Form action: ${action ?? "NONE — the browser would reload the page"}`);

// `force` because the button sits inside a section with an entry animation,
// and Playwright will wait forever for an element that keeps moving.
await Promise.all([
  page.waitForURL(/\/thank-you\//, { timeout: 20_000 }),
  page.locator('button[type="submit"]').click({ force: true }),
]);

console.log(`Landed on: ${new URL(page.url()).pathname}${page.url().includes("status=error") ? " (status=error — mail is not configured yet)" : ""}`);
console.log(`Heading: ${(await page.locator("h1").innerText()).trim()}`);

await page.screenshot({ path: ".qa/form-nojs-thank-you.png" });
await browser.close();

console.log("\n✓ The form submits without JavaScript.");