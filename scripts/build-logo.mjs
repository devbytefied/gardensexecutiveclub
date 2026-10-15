/**
 * Logo extraction.
 *
 *   node scripts/build-logo.mjs
 *
 * The club's real mark is a rose crest plus wordmark, rasterised at 512px with
 * alpha. This crops it to its true bounds, splits the crest from the lockup,
 * and emits a monochrome version for each ground the site uses — so the header
 * never has to fight a rose-on-teal contrast problem.
 *
 * Emits into public/brand/ and is committed, because the source PNGs live in
 * the archived old-site folder and should not be a build dependency.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(
  ROOT,
  "old-site",
  "gardensexecutiveclub.com",
  "wp-content",
  "uploads",
  "2021",
  "04",
  "cropped-geclogo-1.png",
);
const OUT = path.join(ROOT, "public", "brand");

/** Rose as the site uses it, plus a light version for the teal grounds. */
const ROSE = [178, 84, 77]; // --color-rose-deep
const ROSE_RAW = [199, 130, 125]; // the original brand rose
const CREAM = [250, 247, 242];

/** Find the bounding box of everything above an alpha threshold. */
async function contentBounds(input) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const threshold = 12;

  let top = info.height;
  let bottom = -1;
  let left = info.width;
  let right = -1;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 4 + 3] > threshold) {
        if (y < top) top = y;
        if (y > bottom) bottom = y;
        if (x < left) left = x;
        if (x > right) right = x;
      }
    }
  }

  return {
    left,
    top,
    width: right - left + 1,
    height: bottom - top + 1,
    channels: info.channels,
    data,
    imgW: info.width,
  };
}

/**
 * Re-colour an RGBA buffer to one flat colour, preserving alpha exactly.
 * Returns a PNG buffer.
 */
async function mono(input, [r, g, b], width) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.allocUnsafe(info.width * info.height * 4);
  for (let i = 0, p = 0; i < data.length; i += 4, p += 4) {
    out[p] = r;
    out[p + 1] = g;
    out[p + 2] = b;
    out[p + 3] = data[i + 3];
  }

  return sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .resize({ width })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/** Write a logo variant and report what landed on disk. */
async function emit(input, name, width, colour) {
  const buf = colour
    ? await mono(input, colour, width)
    : await sharp(input).resize({ width }).png().toBuffer();

  fs.writeFileSync(path.join(OUT, `${name}.png`), buf);
  const meta = await sharp(buf).metadata();
  console.log(
    `  ${name}.png  ${meta.width}×${meta.height}  ${(buf.length / 1024).toFixed(1)} kB`,
  );
}

async function main() {
  if (!fs.existsSync(SRC)) {
    console.error(`Source logo missing: ${SRC}`);
    process.exit(1);
  }
  fs.mkdirSync(OUT, { recursive: true });

  const b = await contentBounds(SRC);
  console.log(
    `Source: ${b.imgW}px wide, content ${b.width}×${b.height} at (${b.left},${b.top})`,
  );

  // The crest occupies the upper band; the wordmark sits below a clear gap.
  const crest = await sharp(SRC)
    .extract({ left: b.left, top: b.top, width: b.width, height: 232 })
    .png()
    .toBuffer();

  const lockup = await sharp(SRC)
    .extract({ left: b.left, top: b.top, width: b.width, height: 311 })
    .png()
    .toBuffer();

  console.log("\nCrest:");
  await emit(crest, "crest-rose", 256, ROSE);
  await emit(crest, "crest-cream", 256, CREAM);

  console.log("\nFull lockup:");
  await emit(lockup, "lockup-rose", 256, ROSE);
  await emit(lockup, "lockup-cream", 256, CREAM);

  // Favicon source: the cream crest on the deep teal ground.
  const crestCream = await mono(crest, CREAM, 256);
  const favicon = await sharp(crestCream)
    .resize({ width: 512, height: 512, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: 104,
      bottom: 104,
      left: 104,
      right: 104,
      background: { r: 38, g: 77, b: 73, alpha: 1 },
    })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(OUT, "crest-teal-512.png"), favicon);
  console.log(`\n  crest-teal-512.png  (favicon source)  ${(favicon.length / 1024).toFixed(1)} kB`);

  console.log(`\nLogo assets written to ${path.relative(ROOT, OUT)}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
