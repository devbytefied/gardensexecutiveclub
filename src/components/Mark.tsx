/**
 * The club's mark.
 *
 * This is the real thing: the rose guilloche crest the club has always used,
 * extracted from the original WordPress upload by `pnpm logo`. There is no
 * invented glyph here.
 *
 * Two variants ship because the site has two grounds:
 *   • rose   — on cream and parchment
 *   • cream  — on the deep teal sections
 *
 * The wordmark is set in the display face rather than shipped as an image,
 * so it inherits the licensed font and never pixelates.
 */

type CrestProps = {
  className?: string;
  /** Which ground the crest is sitting on. */
  on?: "light" | "dark";
};

export function Crest({ className = "", on = "light" }: CrestProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- fixed-size asset, not responsive
    <img
      src={on === "dark" ? "/brand/crest-cream.png" : "/brand/crest-rose.png"}
      alt=""
      width={128}
      height={71}
      className={className}
      decoding="async"
    />
  );
}

/** The full stacked lockup — crest over wordmark. Footer and social cards. */
export function Lockup({
  className = "",
  on = "light",
}: {
  className?: string;
  on?: "light" | "dark";
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- fixed-size asset, not responsive
    <img
      src={on === "dark" ? "/brand/lockup-cream.png" : "/brand/lockup-rose.png"}
      alt="The Garden's Executive Club — Elite Women's Club"
      width={256}
      height={190}
      className={className}
      decoding="async"
    />
  );
}

/**
 * The wordmark, typeset. Used in the header beside the crest so the club's
 * name stays selectable and searchable.
 */
export function Wordmark({
  className = "",
  subtitle = "Executive Club",
}: {
  className?: string;
  subtitle?: string;
}) {
  return (
    <span className={className}>
      <span className="block font-display leading-[0.92] tracking-[-0.015em]">
        The Garden&apos;s
      </span>
      {subtitle ? (
        <span className="eyebrow mt-1.5 block !text-[0.62rem] !tracking-[0.26em] opacity-70">
          {subtitle}
        </span>
      ) : null}
    </span>
  );
}
