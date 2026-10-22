/**
 * Asset pipeline for The Garden's Executive Club.
 *
 *   pnpm assets
 *
 * There is no image optimiser on a static host, so every photograph is
 * pre-rendered here into width-keyed WebP variants that the custom loader in
 * src/lib/image-loader.ts can resolve at request time.
 *
 * Naming:  public/media/<slug>__<width>.webp
 *
 * `grade: "duotone"` maps the photograph into the brand palette. The 2021
 * phone snapshots and venue frames are graded so they sit inside the Magnolia
 * palette rather than fighting it; the genuinely strong frames are left in
 * colour.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const UPLOADS = path.join(
  ROOT,
  "old-site",
  "gardensexecutiveclub.com",
  "wp-content",
  "uploads",
);

/**
 * New artwork does not come out of the WordPress library — it arrives by
 * email and lands in `media-src/` at the repo root. A `src` is resolved
 * against the old uploads tree first, then against this one, so an existing
 * slug keeps its provenance and a new one needs no ceremony.
 */
const SRC = path.join(ROOT, "media-src");
const OUT = path.join(ROOT, "public", "media");

function resolveSource(src) {
  for (const dir of [UPLOADS, SRC]) {
    const candidate = path.join(dir, src);
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

const WIDTHS = [320, 480, 640, 720, 960, 1280, 1600, 2000];

/** Never emit a variant wider than this — nothing here needs it. */
const MAX_WIDTH = 2000;

/**
 * The old JPEGs were saved at aggressive quality, so a naive re-encode
 * recovers a lot of noise and inflates the file. These values keep the
 * largest variant on any page comfortably under ~250 kB.
 */
const QUALITY = { duotone: 66, none: 70 };

/**
 * Brand duotone endpoints — a split tone, not a single hue.
 *
 * Shadows fall to the site's --color-teal-deep, highlights to a warm
 * rose cream. Splitting the ramp this way is what keeps the graded frames
 * reading as *this club* rather than as generic duotone photography: the
 * teal is the ground, the rose is the light.
 */
const SHADOW = [26, 56, 52]; // --color-teal-deep
const HIGHLIGHT = [245, 216, 208]; // warm rose cream

/**
 * The curated library. `src` is relative to the old WordPress uploads dir.
 */
const MEDIA = [
  // ---- Brand & hero -------------------------------------------------
  {
    slug: "magnolia-poster",
    src: "2026/09/Update_design_version_2K_20260921161434.jpeg",
    alt: "The Magnolia by Ebony OH — luxury tea society brunch invitation",
  },
  {
    // The 2026 announcement art, supplied by the client. A designed poster,
    // so it is left in colour — grading it would flatten the type.
    slug: "magnolia-brunch",
    src: "magnolia-brunch.jpeg",
    // Small type on a busy ground: a little more aggressive than the
    // photographic default keeps the largest variant inside the image
    // budget on /epk/, /events/ and the Magnolia page alike.
    quality: 58,
    maxWidth: 1280,
    alt: "The Magnolia by Ebony OH — luxury tea society brunch, Sunday 15 November 2026",
  },
  {
    slug: "shatter-field",
    src: "2021/04/bg8.jpg",
    alt: "Shards of glass suspended against black",
  },

  // ---- Heritage -----------------------------------------------------
  {
    slug: "heritage-lounge",
    src: "2021/04/5c7fdc17262898443567cdd2.jpeg.jpg",
    alt: "A lounge with a gilded mirror, marble fireplace and velvet chairs",
  },
  {
    slug: "carriage",
    src: "2021/06/IMG_6515.JPG-1-scaled.jpg",
    alt: "A white wrought-iron carriage standing among the trees",
    // Dense foliage is the noisiest frame in the library, and it is only ever
    // used as a wide atmospheric band rather than a subject to inspect. WebP
    // cannot compress it well at any quality, so the ceiling is the lever:
    // capping at 960 keeps the band under ~95 kB and still reads as texture.
    quality: 34,
    maxWidth: 960,
  },

  // ---- Glass ceiling narrative --------------------------------------
  {
    slug: "glass-ceiling-mall",
    src: "2021/04/1.jpeg",
    alt: "A portrait drawn in shattered glass, installed before the Washington Monument",
  },

  // ---- Clubhouse ----------------------------------------------------
  { slug: "salon", src: "2021/08/IMG_2851.jpg", grade: "duotone", alt: "The main salon set for a members' gathering" },
  { slug: "salon-west", src: "2021/08/IMG_2840.jpg", grade: "duotone", alt: "The salon, west wing" },
  { slug: "salon-east", src: "2021/08/IMG_2862.jpg", grade: "duotone", alt: "The salon, east wing" },
  { slug: "salon-detail", src: "2021/08/IMG_2876.jpg", grade: "duotone", alt: "A table laid for a members' luncheon" },
  { slug: "dining", src: "2021/08/IMG_24971.jpg", grade: "duotone", alt: "A round glass table in the dining room" },
  { slug: "parlour", src: "2021/08/IMG_2618.jpg", grade: "duotone", alt: "The parlour" },
  { slug: "lounge", src: "2021/08/IMG_26171.jpg", grade: "duotone", alt: "A sitting room with velvet seating" },

  // ---- People -------------------------------------------------------
  { slug: "founder", src: "2021/06/IMG_6576.jpg", grade: "duotone", alt: "The founder addressing members outdoors" },
  { slug: "gathering-a", src: "2021/06/IMG_6656.JPG-scaled.jpg", grade: "duotone", alt: "Members gathered at a club evening" },
  { slug: "gathering-b", src: "2021/06/IMG_6647.JPG-scaled.jpg", grade: "duotone", alt: "A conversation at a members' gathering" },
  { slug: "gathering-c", src: "2021/08/20210722_173834-scaled.jpg", grade: "duotone", alt: "Guests arriving at a GEC event" },
  { slug: "gathering-d", src: "2021/06/IMG_6620.JPG-scaled.jpg", grade: "duotone", alt: "A member at a GEC gathering" },
  { slug: "gathering-e", src: "2021/06/IMG_6651.JPG-scaled.jpg", grade: "duotone", alt: "An evening at the clubhouse" },

  // ---- Research illustrations ---------------------------------------
  { slug: "research-flexibility", src: "2021/05/CEW-Bain-joint-report-The-Power-of-flexibility.jpg", alt: "The Power of Flexibility — joint report cover" },
  { slug: "research-bain", src: "2021/05/CEW-Bain-report.jpg", alt: "Research report cover" },
  { slug: "research-gender-data", src: "2021/05/CEW-Gender-Data.jpg", alt: "Gender data reporting cover" },
  { slug: "research-critical-steps", src: "2021/05/Critical-Steps.jpg", alt: "Critical steps to gender parity" },
  { slug: "research-stem", src: "2021/05/STEM-ess-grid-for-web-e1490738995791.jpg", alt: "Engaging the future of STEM" },
  { slug: "research-top", src: "2021/05/What-stops-women-reaching-the-top.jpg", alt: "What stops women reaching the top" },
  { slug: "research-jobs", src: "2021/05/Jobs-and-growth.jpg", alt: "Jobs and growth" },
  { slug: "research-federal", src: "2021/05/Federal-budget-response-e1497591972769.jpg", alt: "Federal budget response" },
  { slug: "march", src: "2020/07/bg-09-free-img.jpg", alt: "A crowd at a women's rights demonstration" },
];

/**
 * 256-entry lookup table mapping luminance → duotone colour.
 *
 * The gamma is deliberately above 1: the source frames are bright interiors,
 * and without it the whole image lands in the highlight half and comes out
 * washed. Pushing the ramp toward the shadow gives them depth.
 */
function buildLut(gamma = 1.35) {
  const lut = Buffer.alloc(256 * 3);
  for (let i = 0; i < 256; i++) {
    const t = Math.pow(i / 255, gamma);
    for (let c = 0; c < 3; c++) {
      lut[i * 3 + c] = Math.round(SHADOW[c] + (HIGHLIGHT[c] - SHADOW[c]) * t);
    }
  }
  return lut;
}

const LUT = buildLut();

/**
 * Resize to `width`, then map luminance into the brand duotone.
 * Resizing first keeps the raw pixel buffer small.
 */
async function renderVariant(input, width, grade, quality) {
  const resized = sharp(input).resize({ width, withoutEnlargement: true });
  const webp = () =>
    resized.webp({ quality, effort: 6, smartSubsample: true });

  if (grade !== "duotone") {
    return webp();
  }

  const { data, info } = await resized.grayscale().raw().toBuffer({ resolveWithObject: true });

  const { width: w, height: h } = info;
  const rgb = Buffer.allocUnsafe(w * h * 3);
  for (let i = 0, p = 0; i < data.length; i++, p += 3) {
    const o = data[i] * 3;
    rgb[p] = LUT[o];
    rgb[p + 1] = LUT[o + 1];
    rgb[p + 2] = LUT[o + 2];
  }

  return sharp(rgb, { raw: { width: w, height: h, channels: 3 } }).webp({
    quality,
    effort: 6,
    smartSubsample: true,
  });
}

async function buildOne(entry) {
  const input = resolveSource(entry.src);
  if (!input) {
    console.warn(`  ! missing source, skipped: ${entry.slug} (${entry.src})`);
    return { slug: entry.slug, skipped: true };
  }

  const meta = await sharp(input).metadata();
  const sourceW = meta.width ?? 0;
  const sourceH = meta.height ?? 0;
  if (!sourceW || !sourceH) return { slug: entry.slug, skipped: true };

  const quality = entry.quality ?? QUALITY[entry.grade === "duotone" ? "duotone" : "none"];

  // Every rung below the source, plus the ceiling itself, so a `sizes` hint
  // at any viewport can be rounded to a file that exists.
  const ceiling = Math.min(sourceW, entry.maxWidth ?? MAX_WIDTH);
  const targets = [
    ...new Set([...WIDTHS.filter((w) => w < ceiling), ceiling]),
  ].sort((a, b) => a - b);

  const bytesIn = fs.statSync(input).size;
  let bytesOut = 0;
  const files = [];

  for (const w of targets) {
    const dest = path.join(OUT, `${entry.slug}__${w}.webp`);
    const info = await (
      await renderVariant(input, w, entry.grade, quality)
    ).toFile(dest);
    bytesOut += info.size;
    files.push({ w, h: info.height });
  }

  const pct = ((1 - bytesOut / bytesIn) * 100).toFixed(0);
  console.log(
    `  ${entry.slug.padEnd(24)} ${String(sourceW).padStart(4)}×${sourceH}  ` +
      `${String(targets.length).padStart(2)} var  ` +
      `${String(Math.round(bytesIn / 1024)).padStart(5)}kB → ${String(Math.round(bytesOut / 1024)).padStart(4)}kB  (${pct}% smaller)`,
  );

  return {
    slug: entry.slug,
    alt: entry.alt,
    grade: entry.grade ?? "none",
    width: sourceW,
    height: sourceH,
    aspect: Number((sourceW / sourceH).toFixed(4)),
    widths: targets,
    files,
    bytes: bytesOut,
    skipped: false,
  };
}

const MANIFEST = path.join(ROOT, "src", "lib", "media-manifest.json");

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  console.log("Building media…");

  /**
   * The library is only ever pruned for slugs we are actually rebuilding.
   * Wiping `public/media` wholesale would destroy every variant whose source
   * is not in this checkout — the old WordPress uploads tree is not always
   * present, and a missing source must never take the live site with it.
   */
  const previous = fs.existsSync(MANIFEST)
    ? JSON.parse(fs.readFileSync(MANIFEST, "utf8"))
    : {};
  const built = new Set();

  const results = [];
  for (const entry of MEDIA) {
    const result = await buildOne(entry);
    results.push(result);
    if (result.skipped) continue;

    built.add(result.slug);
    // Drop variants of this slug that the rebuild no longer emits.
    for (const f of fs.readdirSync(OUT)) {
      if (f.startsWith(`${result.slug}__`) && !result.files.some((v) => f === `${result.slug}__${v.w}.webp`)) {
        fs.unlinkSync(path.join(OUT, f));
      }
    }
  }

  // Anything left in `public/media` for a slug that is no longer in MEDIA.
  for (const f of fs.readdirSync(OUT)) {
    const slug = f.split("__")[0];
    if (f.endsWith(".webp") && !built.has(slug) && !MEDIA.some((e) => e.slug === slug)) {
      fs.unlinkSync(path.join(OUT, f));
    }
  }

  /**
   * Entries whose source is missing keep their previous manifest record and
   * their existing WebP files, so the site continues to build. The warning
   * above is the reminder that those frames need re-sourcing.
   */
  const manifest = {};
  for (const result of results) {
    if (result.skipped) {
      if (previous[result.slug]) manifest[result.slug] = previous[result.slug];
      continue;
    }
    manifest[result.slug] = result;
  }

  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");

  const ok = results.filter((r) => !r.skipped);
  const total = ok.reduce((n, r) => n + r.files.length, 0);
  const bytes = ok.reduce((n, r) => n + r.bytes, 0);
  console.log(
    `\n${ok.length} images / ${total} webp variants / ${(bytes / 1024 / 1024).toFixed(2)}MB total across all variants`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
