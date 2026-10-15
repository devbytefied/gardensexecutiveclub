/**
 * Where the built site lives, now that it is a server build rather than a
 * static export.
 *
 * `next build` writes prerendered pages to `.next/server/app/<route>.html`,
 * static chunks to `.next/static/`, and everything copied from `public/` stays
 * in `public/`. Route handlers that emit a non-HTML body (robots.txt,
 * sitemap.xml, favicon.ico) land beside them as `<name>.body`.
 *
 * Both QA scripts need to answer the same question — "given this URL, which
 * file on disk is it?" — so the answer lives here once.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, "..");

const APP = path.join(ROOT, ".next", "server", "app");
const STATIC = path.join(ROOT, ".next", "static");
const PUBLIC = path.join(ROOT, "public");

/** Has the site been built? */
export function built() {
  return fs.existsSync(APP) && fs.existsSync(STATIC);
}

/** `/about/` -> `about`, `/` -> `index`. */
function routeName(url) {
  const clean = url.replace(/^\/+/, "").replace(/\/+$/, "");
  return clean === "" ? "index" : clean;
}

function isFile(p) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

/**
 * Resolve a request URL to an absolute file path, or null if the build has no
 * such route. The order matters: a chunk or a public asset must win over a
 * page of the same name.
 */
export function resolveFile(url) {
  const clean = "/" + url.replace(/^\/+/, "").replace(/\/{2,}/g, "/").replace(/\/+$/, "");
  const rel = clean.slice(1);
  const name = routeName(clean);

  const candidates = [
    // /_next/static/chunks/x.js is .next/static/chunks/x.js on disk.
    rel.startsWith("_next/") ? path.join(ROOT, ".next", rel.slice("_next/".length)) : null,
    path.join(STATIC, rel.slice("static/".length)),
    path.join(PUBLIC, rel),
    path.join(APP, `${name}.html`),
    path.join(APP, name, "page.html"),
    path.join(APP, `${name}.body`),
  ].filter(Boolean);

  return candidates.find(isFile) ?? null;
}

/** Every prerendered page, as `{ route, file }`, sorted by route. */
export function listPages() {
  if (!built()) return [];

  const pages = [];
  const walk = (dir, prefix) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isFile() || !entry.name.endsWith(".html")) continue;
      const route = prefix + entry.name.replace(/\.html$/, "");
      const clean = route === "index" ? "/" : `/${route.replace(/^index$/, "")}`;
      pages.push({ route: clean.replace(/\/+$/, "") || "/", file: path.join(dir, entry.name) });
    }
  };
  walk(APP, "");
  return pages.sort((a, b) => a.route.localeCompare(b.route));
}