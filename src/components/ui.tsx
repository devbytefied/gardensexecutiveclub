import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* ------------------------------------------------------------------ *
 * Layout
 * ------------------------------------------------------------------ */

/**
 * The single content container for the whole site.
 *
 * `mx-auto` is load-bearing: without it a `max-w-*` block sits hard against
 * the left edge and every section reads as shifted. That regression is now
 * asserted in scripts/audit.mjs — do not remove it.
 */
export function Container({
  children,
  className = "",
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: "default" | "narrow" | "wide" | "full";
}) {
  const max = {
    narrow: "max-w-3xl",
    default: "max-w-7xl",
    wide: "max-w-[84rem]",
    full: "max-w-none",
  }[width];

  return (
    <div className={`mx-auto px-[var(--spacing-gutter)] ${max} ${className}`}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Typographic atoms
 * ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  className = "",
  tone = "rose",
}: {
  children: ReactNode;
  className?: string;
  tone?: "rose" | "inherit";
}) {
  return (
    <p className={`eyebrow accent ${tone === "inherit" ? "!text-current" : ""} ${className}`}>
      {children}
    </p>
  );
}

export function Rule({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark" | "strong";
  className?: string;
}) {
  const rule = {
    light: "rule-on-light",
    dark: "rule-on-dark",
    strong: "rule-accent",
  }[tone];
  return <hr className={`border-0 ${rule} ${className}`} />;
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
  className = "",
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={`${align === "center" ? "text-center mx-auto items-center" : ""} ${className}`}
    >
      {eyebrow ? (
        <Eyebrow className={align === "center" ? "mb-6" : "mb-7"}>{eyebrow}</Eyebrow>
      ) : null}
      <h2 className="display-sm max-w-[20ch] text-balance">{title}</h2>
      {lede ? (
        <p className={`lede mt-7 max-w-[54ch] ${align === "center" ? "mx-auto" : ""}`}>
          {lede}
        </p>
      ) : null}
      {action ? <div className="mt-9">{action}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Actions
 * ------------------------------------------------------------------ */

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "rose" | "outline" | "outline-light" | "text";
  className?: string;
  /** Renders a real <a> for external or mailto targets. */
  external?: boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

const BUTTON_BASE =
  "eyebrow inline-flex items-center gap-3 whitespace-nowrap transition-all duration-500 [transition-timing-function:var(--ease-editorial)]";

const BUTTON_VARIANTS = {
  // The primary action is the brand's own rose. It clears 4.5:1 against
  // cream when paired with cream type, which is what `text-cream` gives.
  rose: "bg-rose-deep px-8 py-4 text-cream hover:bg-rose",
  outline:
    "border border-ink/25 px-8 py-4 text-ink hover:border-rose-deep hover:text-rose-deep",
  "outline-light":
    "border border-cream/30 px-8 py-4 text-cream hover:border-rose-light hover:text-rose-light",
  text: "link-underline pb-1 text-current",
};

export function Button({
  children,
  href,
  variant = "outline",
  className = "",
  external,
  ...rest
}: ButtonProps) {
  const cls = `${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href ?? "#"}
        className={cls}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      prefetch={false}
      href={href ?? "#"}
      className={cls}
      {...rest}
    >
      {children}
    </Link>
  );
}

/** Small inline text link with the growing underline. */
export function TextLink({
  children,
  href,
  className = "",
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <Link
      prefetch={false}
      href={href}
      className={`link-underline inline-flex items-center gap-2 ${className}`}
    >
      {children}
      <span aria-hidden className="accent">
        →
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ *
 * Editorial furniture
 * ------------------------------------------------------------------ */

export function Stat({
  value,
  label,
  note,
  className = "",
}: {
  value: string;
  label: string;
  note?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="tnum font-display text-[clamp(3.2rem,6vw,5.5rem)] leading-[0.88] tracking-[-0.03em] accent">
        {value}
      </p>
      <p className="headline mt-5 !text-[1.05rem] !leading-snug">{label}</p>
      {note ? (
        <p className="muted mt-3 max-w-[34ch] text-[var(--fs-meta)] leading-relaxed">
          {note}
        </p>
      ) : null}
    </div>
  );
}

export function Quote({
  children,
  attribution,
  source,
  className = "",
}: {
  children: ReactNode;
  attribution?: string;
  source?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <blockquote className="font-display text-[clamp(1.5rem,3.2vw,2.6rem)] leading-[1.18] tracking-[-0.015em] text-balance">
        {children}
      </blockquote>
      {(attribution || source) && (
        <figcaption className="mt-8 flex flex-col items-baseline gap-x-3 gap-y-1">
          {attribution ? (
            <span className="eyebrow accent">{attribution}</span> 
          ) : null}
          {source ? (
            <span className="muted text-[var(--fs-meta)]">{source}</span>
          ) : null}
        </figcaption>
      )}
    </figure>
  );
}

/** A numbered editorial index row — the "01 / 02 / 03" pattern. */
export function IndexRow({
  n,
  title,
  summary,
  href,
}: {
  n: string;
  title: string;
  summary: string;
  href: string;
}) {
  return (
    <Link
      prefetch={false}
      href={href}
      className="hair-strong group grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2 border-t px-6 py-9 transition-colors duration-500 hover:border-rose-deep sm:grid-cols-[4rem_1fr_2fr_auto] sm:gap-x-10 sm:px-8"
    >
      <span className="tnum eyebrow accent">{n}</span>
      <span className="font-display text-[1.45rem] leading-tight tracking-[-0.01em] sm:text-[1.7rem]">
        {title}
      </span>
      <span className="muted col-start-2 max-w-[52ch] text-[0.95rem] leading-relaxed sm:col-start-auto">
        {summary}
      </span>
      <span
        aria-hidden
        className="accent hidden opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100 sm:block"
      >
        →
      </span>
    </Link>
  );
}

/** Reusable page shell for interior pages. */
export function PageShell({
  children,
  className = "",
  tone = "ink",
}: {
  children: ReactNode;
  className?: string;
  tone?: "ink" | "cream" | "emerald";
}) {
  const ground = {
    ink: "ground-ink on-dark",
    cream: "ground-cream on-light",
    emerald: "ground-emerald on-dark",
  }[tone];

  return <div className={`${ground} ${className}`}>{children}</div>;
}
