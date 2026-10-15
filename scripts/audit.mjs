/**
 * Payload audit â€” measures what a first-time visitor actually downloads.
 *
 *   node scripts/audit.mjs [route ...]
 *
 * Serves the prerendered build over gzip (as every real host does) and visits
 * each route with a cold cache. Reports transferred bytes by category and
 * fails if a page exceeds the budgets below.
 *
 * Budgets are *transferred* (gzipped) sizes for a cold, first visit on a
 * desktop viewport.
 */

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import zlib from "node:zlib";
import { chromium } from "playwright-core";
import { ROOT, built, resolveFile } from "./build-output.mjs";

/**
 * Per-page budgets for a cold, first visit, gzipped.
 *
 * `script` is set at Next.js 16 + React 19's App Router floor (roughly
 * 140 kB transferred before any application code). It is a regression guard,
 * not an aspiration â€” meaningful savings have to come from shipping less of
 * the framework, not from tuning the site.
 *
 * `total` therefore starts from a realistic floor: 145 kB of framework JS,
 * ~59 kB of fonts, ~12 kB of CSS and ~15 kB of HTML is ~230 kB before a
 * single photograph loads. 380 kB leaves room for a photography-led hero and
 * still catches the failure mode that actually matters â€” one oversized image.
 */
const BUDGET = {
  total: 380 * 1024,
  script: 155 * 1024,
  style: 20 * 1024,
  font: 70 * 1024,
  image: 180 * 1024,
};

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

const COMPRESSIBLE = new Set([".html", ".css", ".js", ".json", ".svg", ".xml", ".txt"]);

function categorise(url, ext) {
  if (ext === ".woff2") return "font";
  if (ext === ".js") return "script";
  if (ext === ".css") return "style";
  if (ext === ".html") return "html";
  if (/\.(webp|png|svg|ico|jpe?g)$/.test(ext)) return "image";
  if (ext === ".json" || ext === ".txt" || ext === ".xml") return "other";
  return "other";
}

/**
 * Static server that keeps its own ledger.
 *
 * Playwright's `response.body()` hands back the *decoded* payload, so it
 * cannot tell you what crossed the wire. The ledger records exactly what was
 * written, post-gzip, which is the number that matters.
 */
function serve() {
  const ledger = new Map();

  const server = http.createServer((req, res) => {
    const url = decodeURIComponent((req.url || "/").split("?")[0]).replace(
      /\/{2,}/g,
      "/",
    );
    const file = resolveFile(url);
    if (!file) {
      res.writeHead(404).end("not found");
      return;
    }

    const ext = path.extname(file);
    const raw = fs.readFileSync(file);
    let body = raw;
    const headers = { "cache-control": "no-store" };

    if (COMPRESSIBLE.has(ext)) {
      body = zlib.gzipSync(raw, { level: 9 });
      headers["content-encoding"] = "gzip";
    }

    const key = url === "/" ? "/" : url;
    ledger.set(key, {
      url: key,
      raw: raw.length,
      sent: body.length,
      cat: categorise(key, ext),
    });

    res.writeHead(200, {
      ...headers,
      "content-type": MIME[ext] || "application/octet-stream",
    });
    res.end(body);
  });

  return new Promise((resolve) => {
    server.listen(0, () => resolve({ server, port: server.address().port, ledger }));
  });
}

const kb = (n) => `${(n / 1024).toFixed(1)} kB`;



/**
 * The palette, with the contrast ratio every pairing must clear.
 *
 * Asserted on every run so an un-deepened brand colour cannot quietly
 * reappear. The raw brand rose and sage are deliberately absent: at 2.9:1
 * and 2.6:1 they are fills only, and this table is the record of why.
 */
const PALETTE = {
  cream: "#faf7f2",
  teal: "#264d49",
  roseDeep: "#b2544d",
  roseLight: "#d9a9a6",
  sageDeep: "#6a7566",
  sageLight: "#aeb6ac",
  brownDeep: "#986458",
  ink: "#2f3436",
  inkSoft: "#4d5457",
  inkMute: "#5f6668",
  creamSoft: "#e8e3da",
  creamMute: "#c3c9c6",
};

const CONTRAST_RULES = [
  ["ink", "cream", 4.5],
  ["inkSoft", "cream", 4.5],
  ["inkMute", "cream", 4.5],
  ["roseDeep", "cream", 4.5],
  ["sageDeep", "cream", 4.5],
  ["brownDeep", "cream", 4.5],
  ["teal", "cream", 4.5],
  ["cream", "teal", 4.5],
  ["roseLight", "teal", 4.5],
  ["sageLight", "teal", 4.5],
  ["creamSoft", "teal", 4.5],
  ["creamMute", "teal", 4.5],
];

const toRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const toLinear = (c) => {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};
const luminance = (h) => {
  const [r, g, b] = toRgb(h).map(toLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

function checkPalette() {
  console.log("Palette contrast");
  let failed = false;
  for (const [fg, bg, min] of CONTRAST_RULES) {
    const ratio = contrast(PALETTE[fg], PALETTE[bg]);
    const ok = ratio >= min;
    if (!ok) failed = true;
    console.log(
      `  ${ok ? "ok " : "FAIL"} ${fg.padEnd(11)} on ${bg.padEnd(6)} ${ratio.toFixed(2).padStart(5)}:1  (min ${min})`,
    );
  }
  return !failed;
}

/**
 * Every section container must be horizontally centred, and every section on
 * a page must share one left content edge.
 *
 * This exists because `Container` once set `max-width` without
 * `margin-inline: auto`, which pinned the whole site to the left.
 */
function checkCentring(page) {
  return page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const offenders = [];
    const lefts = new Set();

    document.querySelectorAll("main section").forEach((s) => {
      const c = s.querySelector(":scope > div");
      if (!c) return;
      const b = c.getBoundingClientRect();
      if (b.width === 0 || b.width >= vw - 1) return; // full-bleed is fine

      const offset = Math.abs(b.left + b.width / 2 - vw / 2);
      if (offset > 1) {
        offenders.push({
          cls: (c.className || "").slice(0, 46),
          left: Math.round(b.left),
          width: Math.round(b.width),
          offset: Math.round(offset),
        });
      }
      const pad = parseFloat(getComputedStyle(c).paddingLeft) || 0;
      lefts.add(Math.round(b.left + pad));
    });

    return { offenders, lefts: [...lefts].sort((a, b) => a - b) };
  });
}

/**
 * Rendered contrast.
 *
 * Static token checks only prove the palette is sound. This walks the actual
 * rendered text on the page, resolves its effective background by walking up
 * the tree, and flags anything under 4.5:1. It is what catches a `text-cream`
 * that survived a section changing ground — the exact failure mode of the
 * emerald-to-teal re-skin.
 */
function checkRenderedContrast(page) {
  return page.evaluate(() => {
    const parse = (c) => {
      const m = c.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const [r, g, b, a = 1] = m[1].split(",").map((v) => parseFloat(v));
      return { r, g, b, a };
    };
    const lin = (v) => {
      const c = v / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    const lum = ({ r, g, b }) =>
      0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    const over = (fg, bg) => ({
      r: fg.r * fg.a + bg.r * (1 - fg.a),
      g: fg.g * fg.a + bg.g * (1 - fg.a),
      b: fg.b * fg.a + bg.b * (1 - fg.a),
      a: 1,
    });
    const ratio = (a, b) => {
      const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
      return (hi + 0.05) / (lo + 0.05);
    };

    /** Effective background: composite every translucent ancestor layer. */
    const backgroundOf = (el) => {
      const stack = [];
      let node = el;
      while (node && node !== document.documentElement) {
        const c = parse(getComputedStyle(node).backgroundColor);
        if (c && c.a > 0) {
          stack.push(c);
          if (c.a === 1) break;
        }
        node = node.parentElement;
      }
      let bg = { r: 255, g: 255, b: 255, a: 1 };
      for (let i = stack.length - 1; i >= 0; i--) bg = over(stack[i], bg);
      return bg;
    };

    const bad = [];
    const seen = new Set();

    for (const el of document.querySelectorAll(
      'p, h1, h2, h3, h4, li, dt, dd, span, a, button, label, blockquote, figcaption, td, th',
    )) {
      // Only elements that directly contain visible text.
      const text = Array.from(el.childNodes)
        .filter((n) => n.nodeType === 3)
        .map((n) => n.textContent.trim())
        .join("")
        .trim();
      if (!text) continue;

      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) continue;

      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.display === "none") continue;
      if (parseFloat(cs.opacity) < 0.1) continue;

      const size = parseFloat(cs.fontSize);
      const weight = parseInt(cs.fontWeight, 10) || 400;
      // Large text is 24px+, or 18.66px+ when bold.
      const isLarge = size >= 24 || (size >= 18.66 && weight >= 700);
      const min = isLarge ? 3 : 4.5;

      let fg = parse(cs.color);
      if (!fg) continue;
      const bg = backgroundOf(el);
      if (fg.a < 1) fg = over(fg, bg);

      const cr = ratio(fg, bg);
      if (cr >= min) continue;

      const key = `${cs.color}|${Math.round(bg.r)},${Math.round(bg.g)},${Math.round(bg.b)}`;
      if (seen.has(key)) continue;
      seen.add(key);

      bad.push({
        text: text.slice(0, 44),
        colour: cs.color,
        bg: `rgb(${Math.round(bg.r)}, ${Math.round(bg.g)}, ${Math.round(bg.b)})`,
        ratio: cr.toFixed(2),
        min,
        size: Math.round(size),
        tag: el.tagName.toLowerCase(),
        cls: (el.className?.toString?.() ?? "").slice(0, 44),
      });
    }
    return bad;
  });
}

async function main() {
  if (!built()) {
    console.error("No build found. Run `pnpm build` first.");
    process.exit(1);
  }

  let failed = !checkPalette();
  let centringIssues = 0;
  let contrastIssues = 0;

  const routes = process.argv.slice(2);
  const targets = routes.length ? routes : ["/"];

  const browser = await chromium.launch();

  for (const route of targets) {
    const { server, port, ledger } = await serve();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(`http://127.0.0.1:${port}${route}`, {
      waitUntil: "load",
      timeout: 20000,
    });
    await page.waitForTimeout(600);

    /* ---- centring ---- */
    const { offenders, lefts } = await checkCentring(page);
    if (offenders.length) {
      centringIssues += offenders.length;
      failed = true;
      console.log(`\n${route}  FAIL ${offenders.length} off-centre container(s)`);
      for (const o of offenders) {
        console.log(
          `      offset ${String(o.offset).padStart(4)}px  left=${o.left} w=${o.width}  ${o.cls}`,
        );
      }
    } else if (lefts.length > 1) {
      centringIssues++;
      failed = true;
      console.log(`\n${route}  FAIL misaligned content edges: ${lefts.join(", ")}`);
    }

    /* ---- rendered contrast ---- */
    const lowContrast = await checkRenderedContrast(page);
    if (lowContrast.length) {
      contrastIssues += lowContrast.length;
      failed = true;
      console.log(
        `\n${route}  FAIL ${lowContrast.length} low-contrast text style(s)`,
      );
      for (const b of lowContrast) {
        console.log(
          `      ${b.ratio}:1 (min ${b.min})  ${b.size}px  ${b.colour} on ${b.bg}\n        <${b.tag}> "${b.text}"  ${b.cls}`,
        );
      }
    }


    /* ---- payload ---- */
    const requested = new Set(
      await page.evaluate(() =>
        performance
          .getEntriesByType("resource")
          .map((e) => new URL(e.name).pathname)
          .concat([location.pathname]),
      ),
    );

    const entries = [...ledger.values()].filter((e) =>
      requested.has(e.url === "/" ? "/" : e.url),
    );

    const totals = {};
    let grand = 0;
    for (const e of entries) {
      totals[e.cat] = (totals[e.cat] ?? 0) + e.sent;
      grand += e.sent;
    }

    if (process.env.AUDIT_VERBOSE) {
      for (const e of entries.sort((a, b) => b.sent - a.sent)) {
        console.log(
          `      ${kb(e.sent).padStart(9)}  ${e.cat.padEnd(7)} ${e.url}` +
            (e.raw - e.sent > 1024 ? `  (${kb(e.raw)} raw)` : ""),
        );
      }
    }

    const order = ["html", "script", "style", "font", "image", "other"];
    const parts = order.filter((c) => totals[c]).map((c) => `${c} ${kb(totals[c])}`);
    console.log(`\n${route}\n  ${parts.join("  .  ")}\n  total ${kb(grand)}`);

    for (const [name, cap] of Object.entries(BUDGET)) {
      const value = name === "total" ? grand : (totals[name] ?? 0);
      if (value > cap) {
        console.log(`  OVER - ${name} ${kb(value)} > ${kb(cap)}`);
        failed = true;
      }
    }

    await context.close();
    server.close();
  }

  await browser.close();

  console.log(
    `\nCentring: ${centringIssues === 0 ? "all containers centred, edges aligned" : `${centringIssues} issue(s)`}`,
  );
  console.log(
    `Contrast: ${contrastIssues === 0 ? "all rendered text clears 4.5:1" : `${contrastIssues} issue(s)`}`,
  );
  console.log(failed ? "\nFailed." : "\nAll checks passed.");
  process.exit(failed ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
