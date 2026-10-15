import type { ReactNode } from "react";
import Link from "next/link";
import { Container, Eyebrow, SectionHead } from "./ui";

/** Label / value rows separated by hairlines. Used for tiers, roles, terms. */
export function DataRows({
  rows,
  className = "",
}: {
  rows: { label: ReactNode; value: ReactNode; note?: string }[];
  className?: string;
}) {
  return (
    <dl className={className}>
      {rows.map((row, i) => (
        <div
          key={i}
          className="grid gap-x-10 gap-y-3 border-t hair px-6 py-8 first:border-t-0 first:pt-0 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-y-2 sm:px-8"
        >
          <dt className="font-display text-[1.25rem] leading-snug tracking-[-0.01em]">
            {row.label}
          </dt>
          <dd>
            <div className="muted text-[0.98rem] leading-relaxed">{row.value}</div>
            {row.note ? (
              <div className="eyebrow mt-3 !text-[0.58rem] meta">{row.note}</div>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Numbered feature grid with a shared hairline frame. */
export function FeatureGrid({
  items,
  className = "",
  columns = 3,
}: {
  items: { n?: string; title: string; body: ReactNode }[];
  className?: string;
  columns?: 2 | 3 | 4;
}) {
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className={`grid gap-px hair-faint border bg-[color-mix(in_oklab,currentColor_12%,transparent)] ${cols} ${className}`}>
      {items.map((item) => (
        <article
          key={item.title}
          className="group flex flex-col bg-inherit p-8 transition-colors duration-500 hover:bg-current/[0.03] sm:p-9"
        >
          {item.n ? (
            <span className="tnum eyebrow text-rose-deep">{item.n}</span>
          ) : null}
          <h3 className="font-display mt-5 text-[1.35rem] leading-tight tracking-[-0.01em]">
            {item.title}
          </h3>
          <div className="muted mt-4 text-[0.93rem] leading-relaxed">{item.body}</div>
        </article>
      ))}
    </div>
  );
}

/** A pull-out figure with an optional caption and link. */
export function Aside({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <div className="lg:col-span-3 lg:col-start-10">
      <div className="lg:sticky lg:top-28">
        <Eyebrow>{eyebrow}</Eyebrow>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

/**
 * Standard two-column long-form page body.
 *
 * `aside` is wrapped in a column of its own so a bare <Figure> or a short
 * list can't collapse into a single grid track — pass `asideClass` to
 * override the width where a page needs something different.
 */
export function ProseSection({
  children,
  aside,
  asideClass = "lg:col-span-3 lg:col-start-10",
  className = "",
  tone = "ink",
}: {
  children: ReactNode;
  aside?: ReactNode;
  asideClass?: string;
  className?: string;
  tone?: "ink" | "cream" | "emerald";
}) {
  const ground = {
    ink: "ground-ink on-dark",
    cream: "ground-cream on-light",
    emerald: "ground-emerald on-dark",
  }[tone];

  return (
    <section className={ground}>
      <Container>
        <div
          className={`grid gap-y-14 py-[clamp(3.5rem,8vw,6.5rem)] lg:grid-cols-12 lg:gap-x-10 ${className}`}
        >
          <div className="prose-gec lg:col-span-7">{children}</div>
          {aside ? <div className={asideClass}>{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}

/** Cross-link grid used at the foot of most pages. */
export function LinkGrid({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: { label: string; href: string; note?: string }[];
}) {
  return (
    <section className="ground-ink on-dark">
      <Container>
        <div className="py-[clamp(3.5rem,7vw,6rem)]">
          <SectionHead eyebrow={eyebrow} title={title} />
          <div className="mt-14 grid gap-px hair-faint border bg-[color-mix(in_oklab,var(--color-cream)_16%,transparent)] sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Link prefetch={false}
                key={item.href}
                href={item.href}
                className="group flex flex-col justify-between gap-8 bg-teal p-8 transition-colors duration-500 hover:bg-teal-deep sm:p-9"
              >
                <span className="font-display text-[1.3rem] leading-tight tracking-[-0.01em]">
                  {item.label}
                </span>
                <span className="flex items-baseline justify-between gap-4">
                  {item.note ? (
                    <span className="muted max-w-[26ch] text-xs leading-snug">
                      {item.note}
                    </span>
                  ) : null}
                  <span
                    aria-hidden
                    className="accent transition-transform duration-500 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            ))}
            {(2 - (items.length % 2)) % 2 ? (
              <span aria-hidden className="hidden bg-teal sm:block lg:hidden" />
            ) : null}
            {Array.from({ length: (3 - (items.length % 3)) % 3 }).map((_, i) => (
              <span key={`filler-${i}`} aria-hidden className="hidden bg-teal lg:block" />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
