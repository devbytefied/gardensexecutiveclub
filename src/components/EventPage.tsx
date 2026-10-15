import Link from "next/link";
import type { Metadata } from "next";
import { ClosingCta } from "@/components/ClosingCta";
import { Figure } from "@/components/Figure";
import { PageHeader } from "@/components/PageHeader";
import { ProseSection } from "@/components/blocks";
import { Button, Container, Eyebrow } from "@/components/ui";
import { KIND_LABEL, clubEvents, eventHref, type ClubEvent } from "@/lib/events";

/* ------------------------------------------------------------------ *
 * A single event
 * ------------------------------------------------------------------ */

export function EventPage({ event }: { event: ClubEvent }) {
  return (
    <>
      <PageHeader
        eyebrow={`${KIND_LABEL[event.kind]} / ${event.cadence}`}
        title={event.title}
        lede={event.standfirst}
        aside={
          <div>
            <dl className="border-t hair">
              {[
                ["Season", event.season],
                event.date ? ["Date", event.date] : null,
                event.time ? ["Time", event.time] : null,
                ["Capacity", event.capacity ?? "Members and invited guests"],
              ]
                .filter(Boolean)
                .map((row) => (
                  <div key={row![0]} className="border-b hair px-5 py-4">
                    <dt className="eyebrow !text-[0.55rem] meta">{row![0]}</dt>
                    <dd className="mt-1.5 text-[0.95rem] leading-snug">{row![1]}</dd>
                  </div>
                ))}
            </dl>
            <Button href="/contact/" variant="rose" className="mt-8">
              Request an invitation
            </Button>
          </div>
        }
      />

      <section className="ground-ink on-dark">
        <Container>
          <div className="pb-[clamp(3rem,6vw,5rem)] pt-[clamp(3rem,6vw,5rem)]">
            <Figure
              slug={event.image}
              sizes="(min-width: 768px) 1280px, 100vw"
              ratio="16/7"
              priority
              objectPosition={event.imagePosition}
              caption={event.imageCaption}
            />
          </div>
        </Container>
      </section>

      <ProseSection>
        {event.description.map((p, i) => (
          <p key={i} className={i === 0 ? "!text-[1.1rem] !leading-relaxed" : ""}>
            {p}
          </p>
        ))}
        <h2>What is included</h2>
        <ul>
          {event.includes.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
        <h2>Attending</h2>
        <p>
          Members receive invitations to every gathering, and may bring a guest
          to the intimate events. Dates are confirmed to members first.
        </p>
        <p>
          If you are not yet a member and would like to attend, write to us at{" "}
          <a href="/contact/" className="link-underline">
            the contact page
          </a>{" "}
          with the event name. We would rather answer a direct question than turn
          you away silently.
        </p>
      </ProseSection>

      <section className="ground-emerald on-dark">
        <Container>
          <div className="py-[clamp(3.5rem,7vw,6rem)]">
            <Eyebrow>Also in the calendar</Eyebrow>
            <ul className="mt-10 grid gap-px border hair border bg-cream/20 sm:grid-cols-2 lg:grid-cols-3">
              {clubEvents
                .filter((e) => e.slug !== event.slug)
                .slice(0, 6)
                .map((e) => (
                  <li key={e.slug}>
                    <Link prefetch={false}
                      href={eventHref(e)}
                      className="group flex h-full flex-col justify-between gap-7 bg-teal-soft p-8 transition-colors duration-500 hover:bg-teal-deep"
                    >
                      <span className="eyebrow !text-[0.52rem] meta">
                        {e.season}
                      </span>
                      <span className="font-display text-[1.25rem] leading-tight transition-colors duration-500 group-hover:accent">
                        {e.title}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </Container>
      </section>

      <ClosingCta />
    </>
  );
}

export function eventMetadata(event: ClubEvent): Metadata {
  return {
    title: event.title,
    description: event.standfirst,
    alternates: { canonical: eventHref(event) },
  };
}
