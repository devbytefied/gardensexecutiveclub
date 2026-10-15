import Link from "next/link";
import { Figure } from "./Figure";
import { PageHeader } from "./PageHeader";
import { Button, Container, Eyebrow, Quote } from "./ui";
import { workTopics, type WorkTopic } from "@/lib/work";

/**
 * Shared layout for the five research pages. The sidebar cross-links the
 * whole set so a reader who lands on one thread can walk the rest.
 */
export function WorkPage({ topic }: { topic: WorkTopic }) {
  const others = workTopics.filter((t) => t.slug !== topic.slug);

  return (
    <>
      <PageHeader
        eyebrow={`Our Work / ${topic.n}`}
        title={topic.title}
        lede={topic.standfirst}
        aside={
          <div>
            <Eyebrow>Figure</Eyebrow>
            <Figure
              slug={topic.image}
              sizes="(min-width: 1024px) 30vw, 100vw"
              ratio="4/3"
              className="mt-5"
              caption={topic.imageCaption}
            />
          </div>
        }
      />

      {/* Stat rail */}
      <section className="ground-emerald on-dark">
        <Container>
          <dl className="grid gap-x-10 gap-y-9 border-y hair-faint py-11 sm:grid-cols-3">
            {topic.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="tnum block font-display text-[clamp(2.6rem,5vw,3.75rem)] leading-none tracking-[-0.03em] accent">
                    {s.value}
                  </span>
                  <span className="muted mt-3.5 block max-w-[26ch] text-[0.85rem] leading-snug">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Body */}
      <section className="ground-ink on-dark">
        <Container>
          <div className="grid gap-y-16 py-[clamp(4rem,8vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <article className="prose-gec lg:col-span-7">
              {topic.body.map((block, i) => (
                <div key={i}>
                  {block.heading ? <h2>{block.heading}</h2> : null}
                  {block.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                  {block.bullets ? (
                    <ul>
                      {block.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}

      {/* The pull quote, interrupted by the subject of the page where there
          is one. Keeps the long-form column from becoming a wall of text. */}
      {topic.pull ? (
        <>
          <Quote
            attribution={topic.pull.source}
            className="my-16 border-t hair-strong pt-12"
          >
            {topic.pull.text}
          </Quote>
        </>
      ) : null}
            </article>

            {/* Cross-links */}
            <aside className="lg:col-span-3 lg:col-start-10">
              <div className="lg:sticky lg:top-28">
                <Eyebrow>Keep reading</Eyebrow>
                <ul className="mt-7 border-t hair-faint">
                  {others.map((t) => (
                    <li key={t.slug} className="border-b hair-faint">
                      <Link prefetch={false}
                        href={`/work/${t.slug}/`}
                        className="group flex items-baseline gap-4 px-5 py-5"
                      >
                        <span className="tnum eyebrow shrink-0 accent/60">
                          {t.n}
                        </span>
                        <span className="font-display text-[1.15rem] leading-snug transition-colors duration-500 group-hover:accent">
                          {t.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Button href="/work/" variant="text" className="mt-9">
                  All of our work
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
