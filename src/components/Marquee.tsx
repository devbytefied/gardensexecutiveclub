/**
 * The one piece of continuous motion on the site. Pure CSS so it costs no
 * JavaScript and simply doesn't run under `prefers-reduced-motion`.
 *
 * The track is rendered twice and translated -50%, so the loop is seamless.
 */
export function Marquee({
  items,
  duration = 52,
  className = "",
}: {
  items: string[];
  duration?: number;
  className?: string;
}) {
  return (
    <div
      className={`group relative flex overflow-hidden ${className}`}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className="marquee-track flex shrink-0 items-center gap-14 pr-14 group-hover:[animation-play-state:paused]"
        >
          {items.map((item, i) => (
            <li
              key={`${copy}-${i}`}
              className="flex shrink-0 items-center gap-14 whitespace-nowrap"
            >
              <span className="font-display text-[clamp(1.1rem,1.8vw,1.5rem)] tracking-[0.02em] meta">
                {item}
              </span>
              <span aria-hidden className="accent/50">
                ✦
              </span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
