import manifest from "./media-manifest.json";

export type MediaEntry = {
  slug: string;
  alt: string;
  grade: "duotone" | "none";
  width: number;
  height: number;
  aspect: number;
  widths: number[];
  files: { w: number; h: number }[];
  bytes: number;
};

/**
 * Static image source for next/image.
 *
 * The custom loader in src/lib/image-loader.ts turns `src` + a device width
 * into one of the pre-rendered `public/media/<slug>__<width>.webp` files, so
 * all we need to hand next/image is the intrinsic size of the largest variant
 * and a `sizes` hint at each call site.
 */
export type MediaSource = {
  src: string;
  alt: string;
  width: number;
  height: number;
  aspect: number;
};

const library = manifest as unknown as Record<string, MediaEntry>;

export function media(slug: keyof typeof library | string): MediaSource {
  const entry = library[slug];
  if (!entry) {
    throw new Error(
      `Unknown media slug "${slug}". Run \`pnpm assets\` to rebuild the library.`,
    );
  }
  const largest = entry.files[entry.files.length - 1];
  return {
    src: `/media/${entry.slug}`,
    alt: entry.alt,
    width: largest.w,
    height: largest.h,
    aspect: entry.aspect,
  };
}

export function alt(slug: string): string {
  const entry = library[slug];
  if (!entry) throw new Error(`Unknown media slug "${slug}".`);
  return entry.alt;
}

export const mediaSlugs = Object.keys(library);
