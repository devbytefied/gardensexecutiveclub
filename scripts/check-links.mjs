/**
 * Internal link check across the built site.
 *
 *   node scripts/check-links.mjs
 *
 * Catches the classic failure mode of a site migration: a page that links to
 * a route which was renamed, dropped, or misspelled. Every internal href in
 * the prerendered HTML is resolved against the build output, and external
 * links are reported separately for manual review.
 */

import fs from "node:fs";
import { built, listPages, resolveFile } from "./build-output.mjs";

/** Route → the file that proves it exists. */
function resolves(href) {
  const clean = href.split("#")[0].split("?")[0];
  if (!clean || clean === "/") return true;
  return resolveFile(clean) !== null;
}

function main() {
  if (!built()) {
    console.error("No build found. Run `pnpm build` first.");
    process.exit(1);
  }

  const pages = listPages();

  const broken = [];
  const external = new Set();
  let checked = 0;

  for (const page of pages) {
    const html = fs.readFileSync(page.file, "utf8");

    for (const m of html.matchAll(/href="([^"]+)"/g)) {
      const href = m[1];
      if (!href) continue;

      if (/^(https?:)?\/\//.test(href) || /^(mailto:|tel:)/.test(href)) {
        external.add(href);
        continue;
      }
      if (href.startsWith("#") || href.startsWith("data:")) continue;

      checked++;
      if (!resolves(href)) broken.push({ from: page.route, href });
    }
  }

  console.log(`${pages.length} pages / ${checked} internal links checked`);
  console.log(`${external.size} distinct external links (not verified here)`);

  for (const e of [...external].sort()) console.log(`  → ${e}`);

  if (broken.length) {
    console.log(`\n✗ ${broken.length} broken internal link(s):`);
    for (const b of broken) console.log(`  ${b.from}  →  ${b.href}`);
    process.exit(1);
  }

  console.log("\nNo broken internal links.");
}

main();
