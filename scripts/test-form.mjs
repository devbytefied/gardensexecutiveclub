/**
 * Drives a real form in a real browser.
 *
 *   node scripts/test-form.mjs [route] [--dev]
 *
 * Fills every required field, clicks submit, and reports what happened:
 * the button state, any console error, and the network response. This is how
 * "the button does nothing" gets diagnosed instead of guessed at.
 */

import { chromium } from "playwright-core";

const BASE = process.env.TEST_ORIGIN ?? "http://localhost:3000";
const route = process.argv.find((a) => a.startsWith("/")) ?? "/venue/";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

const consoleErrors = [];
const network = [];

page.on("console", (m) => {
  if (m.type() === "error") consoleErrors.push(m.text());
});
page.on("pageerror", (e) => consoleErrors.push(`pageerror: ${e.message}`));
page.on("requestfailed", (r) =>
  consoleErrors.push(`requestfailed: ${r.url()} — ${r.failure()?.errorText}`),
);
page.on("response", (r) => {
  if (r.url().includes("/api/")) network.push(`${r.status()} ${r.url()}`);
});

console.log(`Opening ${BASE}${route}`);
await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });

/* --- Hydrated? ------------------------------------------------------ */

const submit = page.locator('button[type="submit"]');
if (!(await submit.count())) {
  console.log("✗ No submit button on the page.");
  await browser.close();
  process.exit(1);
}

console.log(`Submit button reads: "${(await submit.innerText()).trim()}"`);

/* --- Fill the required fields ---------------------------------------- */

const required = page.locator("form [required]");
const count = await required.count();
console.log(`${count} required field(s)`);

for (let i = 0; i < count; i++) {
  const el = required.nth(i);
  const tag = await el.evaluate((n) => n.tagName.toLowerCase());
  const type = (await el.getAttribute("type")) ?? "";
  if (tag === "select") {
    const value = await el.locator("option").nth(1).getAttribute("value");
    await el.selectOption(value ?? "");
  } else if (type === "checkbox") {
    await el.check();
  } else if (type === "date") {
    await el.fill("2026-11-14");
  } else if (type === "time") {
    await el.fill("14:30");
  } else if (type === "email") {
    await el.fill("test.sender@example.com");
  } else {
    await el.fill(`Test value ${i + 1}`);
  }
}

/* --- Click ----------------------------------------------------------- */

await submit.click();
await page.waitForTimeout(400);

const after = (await submit.innerText().catch(() => "")).trim();
console.log(`Button after click: "${after}"`);

if (after.toLowerCase().startsWith("sending")) {
  console.log("✓ onSubmit fired — the state changed.");
} else {
  console.log("✗ Nothing happened: React state did not change.");
}

const alerts = await page.locator('[role="alert"]').allInnerTexts();
for (const a of alerts) console.log(`Alert: ${a.replace(/\s+/g, " ").trim()}`);

const invalid = await page.locator("[aria-invalid='true']").count();
if (invalid) console.log(`✗ ${invalid} field(s) failed validation.`);

/* --- Wait for the network to settle ---------------------------------- */

await page.waitForTimeout(6000);

console.log(`\nAPI calls: ${network.length ? network.join(", ") : "none"}`);
console.log(`Console errors: ${consoleErrors.length ? "" : "none"}`);
for (const e of consoleErrors.slice(0, 8)) console.log(`  ${e}`);

await page.screenshot({ path: ".qa/form-after-click.png", fullPage: false });
await browser.close();