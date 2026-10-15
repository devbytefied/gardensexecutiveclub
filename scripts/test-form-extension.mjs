/**
 * Reproduces what a DOM-mutating extension does to the form.
 *
 *   node scripts/test-form-extension.mjs [route]
 *
 * TempMail — and a family of ad-blockers and privacy extensions — inject
 * attributes into the page's markup (`data-temp-mail-org` and friends) before
 * React hydrates. That is a hydration mismatch. This test injects the same
 * attributes and reports whether the form still submits, which is the only
 * honest way to know whether the extension is what the user is hitting.
 */

import { chromium } from "playwright-core";

const BASE = process.env.TEST_ORIGIN ?? "http://localhost:3000";
const route = process.argv.find((a) => a.startsWith("/")) ?? "/venue/";

const browser = await chromium.launch();

async function run(label, inject) {
  const context = await browser.newContext();
  if (inject) {
    // Stand in for the extension: stamp attributes onto the form controls the
    // moment they exist, before React ever hydrates.
    await context.addInitScript(() => {
      const observer = new MutationObserver(() => {
        document
          .querySelectorAll("input, textarea, select, form")
          .forEach((el) => el.setAttribute("data-temp-mail-org", "0"));
        observer.disconnect();
      });
      if (document.documentElement) observer.observe(document.documentElement, { childList: true, subtree: true });
      document.addEventListener("DOMContentLoaded", () => {
        document
          .querySelectorAll("input, textarea, select, form")
          .forEach((el) => el.setAttribute("data-temp-mail-org", "0"));
      });
    });
  }

  const page = await context.newPage();
  const errors = [];
  const api = [];
  page.on("pageerror", (e) => errors.push(e.message.split("\n")[0]));
  page.on("console", (m) => {
    if (m.type() === "error" && /hydrat|did not match|server HTML/i.test(m.text())) {
      errors.push(m.text().split("\n")[0]);
    }
  });
  page.on("response", (r) => {
    if (r.url().includes("/api/inquiry")) api.push(String(r.status()));
  });

  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });

  for (const el of await page.locator("form [required]").all()) {
    const tag = await el.evaluate((n) => n.tagName.toLowerCase());
    const type = (await el.getAttribute("type")) ?? "";
    if (tag === "select") await el.selectOption({ index: 1 });
    else if (type === "checkbox") await el.check();
    else if (type === "date") await el.fill("2026-11-14");
    else if (type === "time") await el.fill("14:30");
    else if (type === "email") await el.fill("test.sender@example.com");
    else await el.fill("Test value");
  }

  await page.locator("button[type=submit]").click();
  await page.waitForTimeout(3000);

  // If hydration failed there may be no form left at all — the browser has
  // already navigated on to the thank-you page, which is the point of the
  // form's `action`.
  const stillHere = await page.locator("form").count();
  const hydrated = stillHere
    ? await page.locator("form").getAttribute("data-hydrated")
    : "n/a (page navigated)";
  const url = page.url();

  console.log(`\n${label}`);
  console.log(`  hydrated:  ${hydrated}`);
  console.log(`  API:       ${api.join(", ") || "no call"}`);
  console.log(`  landed on: ${new URL(url).pathname}${url.includes("status=error") ? " (send failed)" : ""}`);
  console.log(`  errors:    ${errors.length ? errors.slice(0, 2).join(" | ") : "none"}`);

  await context.close();
  return { hydrated, api, url };
}

const clean = await run("Without the extension", false);
const polluted = await run("With TempMail-style attribute injection", true);

await browser.close();

const broken = polluted.hydrated !== "yes" || !polluted.api.length;
console.log(
  `\n${broken ? "⚠ the extension breaks the form" : "✓ the form survives the injection"}`,
);
process.exit(0);