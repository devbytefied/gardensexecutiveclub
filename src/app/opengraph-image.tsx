import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

/** Required under `output: "export"` — the card is rendered at build time. */
export const dynamic = "force-static";

/**
 * Social card, generated at build time so it costs nothing to serve.
 * Mirrors the site's own typographic rules: display serif, rose accent,
 * the magnolia mark, and the club's three words.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0c1f19",
          backgroundImage:
            "radial-gradient(ellipse at 85% 20%, rgba(201,162,39,0.16) 0%, transparent 55%)",
          padding: "72px 80px",
        }}
      >
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
            <g stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round">
              <path d="M24 39C24 25 24 15 24 5" />
              <path d="M24 39C17 28 12 20 9.5 12" />
              <path d="M24 39C31 28 36 20 38.5 12" />
              <path d="M24 39C14 33 8 27 4 21" />
              <path d="M24 39C34 33 40 27 44 21" />
              <path d="M8 43.5H40" />
              <path d="M24 39v4.5" />
            </g>
            <g fill="#C9A227">
              <circle cx="24" cy="4.5" r="1.6" />
              <circle cx="9" cy="11.4" r="1.6" />
              <circle cx="39" cy="11.4" r="1.6" />
              <circle cx="3.4" cy="20.4" r="1.6" />
              <circle cx="44.6" cy="20.4" r="1.6" />
            </g>
          </svg>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#f7f2e9",
              fontSize: 26,
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ fontWeight: 600 }}>The Garden&apos;s</span>
            <span style={{ fontSize: 13, letterSpacing: "0.24em", opacity: 0.6 }}>
              EXECUTIVE CLUB
            </span>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#f7f2e9",
            fontSize: 78,
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            maxWidth: 900,
          }}
        >
          <span>Women who lead from</span>
          <span>the room they were</span>
          <span>
            left out of
            <span style={{ color: "#C9A227" }}>.</span>
          </span>
        </div>

        {/* Base row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(247,242,233,0.18)",
            paddingTop: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              color: "rgba(247,242,233,0.55)",
              fontSize: 20,
              letterSpacing: "0.2em",
            }}
          >
            PEOPLE / PURPOSE / POSSIBILITY
          </div>
          <div style={{ display: "flex", color: "rgba(247,242,233,0.5)", fontSize: 20 }}>
            Stone Mountain, Georgia
          </div>
        </div>
      </div>
    ),
    size,
  );
}
