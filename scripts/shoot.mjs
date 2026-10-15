/**
 * Visual QA — renders pages from the build to PNGs so layout and
 * art direction can be reviewed without a browser.
 *
 *   node scripts/shoot.mjs [route ...]
 *
 * Screenshots land in .qa/ (git-ignored).
 */

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { ROOT, built, resolveFile } from "./build-output.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SHOTS = path.join(ROOT, ".qa");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900, dsf: 1 },
  { name: "mobile", width: 390, height: 844, dsf: 2 },
];

/** Serves the prerendered build, honouring trailing-slash routes. */
function serve() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      // Collapse repeated slashes so a malformed path resolves the same way
      // a browser would send it.
      const url = decodeURIComponent((req.url || "/").split("?")[0]).replace(
        /\/{2,}/g,
        "/",
      );
      const file = resolveFile(url);
      if (!file) {
        res.writeHead(404).end("not found");
        return;
      }
      res.writeHead(200, {
        "content-type": MIME[path.extname(file)] || "application/octet-stream",
      });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, () => resolve({ server, port: server.address().port }));
  });
}

const toFile = (route) =>
  route === "/" ? "home" : route.replace(/^\/|\/$/g, "").replace(/\//g, "-");

async function main() {
  if (!built()) {
    console.error("No build found. Run `pnpm build` first.");
    process.exit(1);
  }

  const routes = process.argv.slice(2);
  const targets = routes.length ? routes : ["/"];

  fs.mkdirSync(SHOTS, { recursive: true });
  for (const f of fs.readdirSync(SHOTS)) {
    if (f.endsWith(".png")) fs.unlinkSync(path.join(SHOTS, f));
  }

  const { server, port } = await serve();
  const browser = await chromium.launch();

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.dsf,
    });
    // The event popup is a page-load modal. Dismiss it so screenshots show
    // the page rather than the announcement on top of it.
    await context.addInitScript(() => {
      try {
        sessionStorage.setItem("gec-event-dismissed", "1");
      } catch {}
    });
    const page = await context.newPage();

    for (const route of targets) {
      const url = `http://127.0.0.1:${port}${route}`;
      const res = await page.goto(url, {
        waitUntil: "load",
        timeout: 20000,
      });
      if (!res || res.status() >= 400) {
        console.error(`  ✗ ${route} → ${res?.status() ?? "no response"}`);
        continue;
      }
      await page.waitForTimeout(300);

      // Walk the page so lazy-loaded images settle before capture.
      // `scroll-behavior: smooth` is on globally, so every jump must be
      // forced to 'instant' or the page never actually reaches the bottom.
      await page.evaluate(async () => {
        const root = document.documentElement;
        const previous = root.style.scrollBehavior;
        root.style.scrollBehavior = "auto";

        const step = window.innerHeight * 0.85;
        const limit = document.body.scrollHeight;
        for (let y = 0; y < limit; y += step) {
          window.scrollTo({ top: y, behavior: "instant" });
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo({ top: 0, behavior: "instant" });

        // Belt and braces: never block on a single image or webfont.
        const settle = Promise.all(
          Array.from(document.images)
            .filter((i) => !i.complete)
            .map(
              (i) =>
                new Promise((r) => {
                  i.addEventListener("load", r, { once: true });
                  i.addEventListener("error", r, { once: true });
                }),
            ),
        );
        await Promise.race([settle, new Promise((r) => setTimeout(r, 4000))]);
        await Promise.race([
          document.fonts.ready,
          new Promise((r) => setTimeout(r, 3000)),
        ]);
        root.style.scrollBehavior = previous;
      });
      await page.waitForTimeout(250);

      const broken = await page.evaluate(() =>
        Array.from(document.images)
          .filter((i) => !i.naturalWidth)
          .map((i) => i.currentSrc || i.src),
      );
      if (broken.length) {
        console.error(`  ! ${route}: ${broken.length} broken image(s)`);
        for (const b of broken) console.error(`      ${b}`);
      }

      const name = `${toFile(route)}-${vp.name}.png`;
      await page.screenshot({ path: path.join(SHOTS, name), fullPage: true });
      console.log(`  ✓ ${name}`);
    }

    await context.close();
  }

  await browser.close();
  server.close();
  console.log(`\nScreenshots in ${path.relative(ROOT, SHOTS)}/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
