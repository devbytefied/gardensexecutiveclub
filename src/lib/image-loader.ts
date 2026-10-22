/**
 * Custom image loader for static export.
 *
 * There is no image optimisation server on a static host, so `pnpm assets`
 * pre-renders every photograph into width-keyed WebP variants under
 * `public/media/` using the naming convention below:
 *
 *   public/media/<slug>__<width>.webp     e.g. magnolia-poster__1440.webp
 *
 * Next hands us `src` (an extension-less slug) plus a device-appropriate
 * `width`. We resolve it to the *nearest variant that actually exists* for
 * that slug — read from the generated manifest, not from a hard-coded ladder,
 * so a narrowly-sourced image can never produce a 404.
 */

import manifest from "./media-manifest.json";

type ManifestEntry = { slug: string; widths: number[] };

const library = manifest as unknown as Record<string, ManifestEntry>;

function nearestAvailable(slug: string, width: number): number {
  const available = library[slug]?.widths;
  if (!available?.length) return width;
  return available.reduce((best, w) =>
    Math.abs(w - width) < Math.abs(best - width) ? w : best,
  );
}

type LoaderParams = {
  src: string;
  width: number;
  quality?: number;
};

export default function geLoader({ src, width }: LoaderParams): string {
  // Anything that is not a managed photograph (SVG marks, external URLs)
  // passes straight through untouched.
  if (/^(https?:)?\/\//.test(src) || /\.(svg|png|jpe?g|avif|webp|ico)$/i.test(src)) {
    return src;
  }

  const slug = src.replace(/^\/media\//, "").replace(/\.[a-z0-9]+$/i, "");
  return `/media/${slug}__${nearestAvailable(slug, width)}.webp`;
}
