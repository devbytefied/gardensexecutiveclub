import Image from "next/image";
import type { CSSProperties } from "react";
import { media } from "@/lib/media";

/**
 * A photograph in the house style: no rounded corners, no shadow, optional
 * brand hairline frame, and an optional caption set in the sans small-caps so
 * it reads as editorial annotation rather than a UI label.
 */
export function Figure({
  slug,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  caption,
  ratio,
  className = "",
  frame = false,
  objectPosition,
  stretch = false,
}: {
  slug: string;
  sizes?: string;
  priority?: boolean;
  caption?: string;
  /** CSS aspect-ratio override, e.g. "4/5". Defaults to the image's own. */
  ratio?: string;
  className?: string;
  frame?: boolean;
  objectPosition?: string;
  /**
   * At the `lg` breakpoint the frame grows to the full height of its grid
   * row (the aspect ratio still governs on its own below `lg`), so a photo
   * placed beside a text column ends where the text ends.
   */
  stretch?: boolean;
}) {
  const m = media(slug);

  return (
    <figure
      className={`${stretch ? "lg:flex lg:flex-col" : ""} ${className}`}
    >
      <div
        className={`relative aspect-[var(--fig-ratio)] overflow-hidden bg-teal-deep ${
          stretch ? "lg:aspect-none lg:flex-1" : ""
        } ${frame ? "p-px ring-1 ring-rose-deep/30" : ""}`}
        style={{ "--fig-ratio": ratio ?? String(m.aspect) } as CSSProperties}
      >
        <Image
          src={m.src}
          alt={m.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={objectPosition ? { objectPosition } : undefined}
        />
      </div>
      {caption ? (
        <figcaption className="eyebrow mt-4 !text-[0.6rem] meta">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
