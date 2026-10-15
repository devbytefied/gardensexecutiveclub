/**
 * The failure paths, on a real page.
 *
 *   node scripts/test-form-errors.mjs [route]
 *
 * Two failures a visitor can actually hit: pressing submit on an empty form
 * (validation), and a send that does not arrive (mail unconfigured). Both used
 * to render in a peach that was 2.2:1 on cream — invisible — which is why a
 * broken form looked like an inert one. This asserts they are now readable
 * and screenshots both states.
 */

import { chromium } from "playwright-core";

const BASE = process.env.TEST_ORIGIN ?? "http://localhost:3000";
const route = process.argv.find((a) => a.startsWith("/")) ?? "/venue/";

/** WCAG AA for text, and the size threshold the audit uses. */
const MIN_CONTRAST = 4.5;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });

async function report(label, selector) {
  const node = page.locator(selector).first();
  if (!(await node.count())) {
    console.log(`✗ ${label}: nothing rendered`);
    return false;
  }

  const { contrast, size, color, background } = await node.evaluate((el) => {
    const s = getComputedStyle(el);
    const parse = (c) => (c.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
    const lin = (v) => {
      const c = v / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);

    // Walk up for the first non-transparent background.
    let bg = [250, 247, 242];
    let p = el;
    while (p) {
      const c = getComputedStyle(p).backgroundColor;
      if (c && !c.includes("rgba(0, 0, 0, 0)")) {
        bg = parse(c);
        break;
      }
      p = p.parentElement;
    }

    const fg = parse(s.color);
    const [hi, lo] = [lum(fg), lum(bg)].sort((a, b) => b - a);
    return {
      contrast: (hi + 0.05) / (lo + 0.05),
      size: parseFloat(s.fontSize),
      color: s.color,
      background: `rgb(${bg.join(", ")})`,
    };
  });

  const min = size >= 18.66 ? 3 : MIN_CONTRAST;
  const ok = contrast >= min;
  console.log(
    `${ok ? "✓" : "✗"} ${label}: ${contrast.toFixed(2)}:1 (min ${min}) · ${size}px · ${color} on ${background}`,
  );
  return ok;
}

const submit = page.locator('button[type="submit"]');

/* --- 1 / Validation, on an empty form -------------------------------- */

await submit.click();
await page.waitForTimeout(500);

const errCount = await page.locator("form p.text-rose-deep, form p.text-rose-light").count();
console.log(`Validation messages rendered: ${errCount}`);
const invalidOk = await report("Validation message", "form p.text-rose-deep, form p.text-rose-light");
await page.screenshot({ path: ".qa/form-validation.png", fullPage: false });

/* --- 2 / Send failure ----------------------------------------------- */

await page.evaluate(() => {
  document.querySelectorAll("form [required]").forEach((el) => {
    const tag = el.tagName.toLowerCase();
    if (tag === "select") el.selectedIndex = 1;
    else if (el.type === "checkbox") el.checked = true;
    else if (el.type === "date") el.value = "2026-11-14";
    else if (el.type === "time") el.value = "14:30";
    else if (el.type === "email") el.value = "test.sender@example.com";
    else el.value = "Test value";
  });
});
await submit.click();
await page.waitForTimeout(2500);

const alert = await page.locator('[role="alert"]').first();
console.log(
  `Send-failure alert: ${(await alert.count()) ? "yes" : "MISSING"} — "${(
    await alert.innerText().catch(() => "")
  )
    .replace(/\s+/g, " ")
    .trim()}"`,
);
const sendOk = await report("Send-failure message", '[role="alert"] p:nth-of-type(2)');
await page.screenshot({ path: ".qa/form-send-failure.png", fullPage: false });

await browser.close();

if (!errCount || !invalidOk || !sendOk) process.exit(1);
console.log("\nBoth failure paths are visible.");