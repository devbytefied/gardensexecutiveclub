import Link from "next/link";
import { ClosingCta } from "@/components/ClosingCta";
import { Figure } from "@/components/Figure";
import { PageHeader } from "@/components/PageHeader";
import { LinkGrid } from "@/components/blocks";
import { Button, Container, Eyebrow, Quote, SectionHead } from "@/components/ui";
import {
  KIND_LABEL,
  eventHref,
  isoDate,
  recurringEvents,
  upcomingEvents,
  weekday,
} from "@/lib/events";
import { site } from "@/lib/site";

/**
 * The events index.
 *
 * Split deliberately in two. Anything with a confirmed calendar date is an
 * "upcoming" event and is stated as a date, because a guest planning an
 * afternoon needs a date. Everything else is the recurring calendar, shown by
 * season and cadence with no date attached — publishing a date we do not hold
 * is how an events page starts losing the room's trust.
 */
export function EventsIndex() {
  const featured = upcomingEvents[0];
  const rest = upcomingEvents.slice(1);

  return (
    <>
      <PageHeader
        eyebrow="Upcoming events"
        title="The year, gathered"
        lede="A private club is only as good as the reasons to turn up. This is what is confirmed, and what runs by season — small and deliberate, so that showing up is realistic even in the busiest year of anyone's career."
      />

      {/* Featured: the next confirmed date */}
      {featured ? (
        <section className="ground-ink on-dark">
          <Container>
            <div className="pb-[clamp(3rem,6vw,5rem)] pt-[clamp(3rem,6vw,5rem)]">
              <Eyebrow>Next in the diary</Eyebrow>
              <div className="mt-10 grid gap-y-12 lg:grid-cols-12 lg:items-center lg:gap-x-12">
                <Figure
                  slug={featured.image}
                  sizes="(min-width: 1024px) 26rem, 92vw"
                  ratio="4/5"
                  priority
                  frame
                  className="mx-auto w-full max-w-[26rem] lg:col-span-5 lg:mx-0"
                />

                <div className="lg:col-span-6 lg:col-start-7">
                  <h2 className="display-sm text-balance">{featured.title}</h2>
                  <p className="eyebrow mt-6 !text-[0.62rem] meta">
                    {KIND_LABEL[featured.kind]} / {featured.cadence}
                  </p>

                  <dl className="hair mt-9 border-t">
                    {[
                      ["Date", featured.date ?? ""],
                      ["Time", featured.time ?? ""],
                      ["Where", `${site.name}, ${site.address.line2}`],
                      ["Guest list", featured.capacity ?? "Members and invited guests"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="grid gap-x-8 gap-y-1 border-b py-5 sm:grid-cols-[8rem_1fr]"
                      >
                        <dt className="eyebrow !text-[0.55rem] meta">{label}</dt>
                        <dd className="text-[0.97rem] leading-snug">{value}</dd>
                      </div>
                    ))}
                  </dl>

                  <p className="lede measure mt-9">{featured.standfirst}</p>

                  <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                    <Button href={eventHref(featured)} variant="rose">
                      Read the invitation
                    </Button>
                    <p className="text-[var(--fs-meta)] meta">
                      Guest list is curated. Write to us to be considered.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Everything else with a confirmed date */}
      {rest.length ? (
        <section className="ground-cream on-light">
          <Container>
            <div className="py-[clamp(3.5rem,7vw,6rem)]">
              <SectionHead
                eyebrow="Also confirmed"
                title="Further dates"
                lede="Confirmed gatherings with a fixed calendar date. Members hear about each of these before it is announced publicly."
              />
              <ul className="mt-12 border-t hair">
                {rest.map((e) => (
                  <li key={e.slug} className="border-b hair">
                    <Link
                      prefetch={false}
                      href={eventHref(e)}
                      className="group grid gap-x-10 gap-y-4 px-6 py-9 sm:grid-cols-12 sm:px-8"
                    >
                      <div className="sm:col-span-3">
                        <span className="eyebrow text-rose-deep">
                          {e.dateISO ? weekday(e.dateISO) : e.season}
                        </span>
                        {e.dateISO ? (
                          <time
                            dateTime={isoDate(e.dateISO)}
                            className="tnum mt-2 block font-display text-[1.25rem] leading-tight"
                          >
                            {e.date}
                          </time>
                        ) : null}
                      </div>
                      <div className="sm:col-span-4">
                        <h3 className="font-display text-[1.5rem] leading-tight tracking-[-0.012em] transition-colors duration-500 group-hover:text-rose-deep">
                          {e.title}
                        </h3>
                        <span className="eyebrow mt-3 block !text-[0.5rem] meta">
                          {KIND_LABEL[e.kind]} / {e.cadence}
                        </span>
                      </div>
                      <p className="muted text-[0.95rem] leading-relaxed sm:col-span-5">
                        {e.standfirst}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ) : null}

      {/* The recurring calendar */}
      <section className="ground-parchment on-light">
        <Container>
          <div className="py-[clamp(3.5rem,7vw,6rem)]">
            <SectionHead
              eyebrow="The calendar"
              title="What runs through the year"
              lede="These run by cadence rather than by fixed date. The rhythm does not change; the dates move. If you are not yet a member and want to attend one, write to us — the candidacy dinners in particular are open to prospective members by arrangement."
            />
            <ul className="mt-14 border-t hair">
              {recurringEvents.map((e) => (
                <li key={e.slug} className="border-b hair">
                  <Link
                    prefetch={false}
                    href={eventHref(e)}
                    className="group grid gap-x-10 gap-y-4 px-6 py-9 sm:grid-cols-12 sm:px-8"
                  >
                    <div className="sm:col-span-2">
                      <span className="eyebrow text-rose-deep">{e.season}</span>
                    </div>
                    <div className="sm:col-span-4">
                      <h3 className="font-display text-[1.5rem] leading-tight tracking-[-0.012em] transition-colors duration-500 group-hover:text-rose-deep">
                        {e.title}
                      </h3>
                      <span className="eyebrow mt-3 block !text-[0.5rem] meta">
                        {KIND_LABEL[e.kind]} / {e.cadence}
                      </span>
                    </div>
                    <p className="muted text-[0.95rem] leading-relaxed sm:col-span-6">
                      {e.standfirst}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="ground-emerald on-dark">
        <Container>
          <div className="py-[clamp(4rem,9vw,7rem)]">
            <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
              <div className="lg:col-span-5">
                <Quote attribution="On the calendar" className="max-w-[50ch]">
                  Ten facilitated luncheons a year, one dinner, one summit, one
                  afternoon of tea. That is the whole year. It is meant to be
                  small enough that you can actually come.
                </Quote>
              </div>
              <div className="lg:col-span-5 lg:col-start-8">
                <p className="muted text-[0.97rem] leading-relaxed">
                  Each gathering is announced to members before it is announced
                  publicly. If you would like to attend something and are not
                  yet a member, write to{" "}
                  <a href={`mailto:${site.contact.email}`} className="link-underline">
                    {site.contact.email}
                  </a>{" "}
                  with the event name — we would rather answer a direct question
                  than turn you away silently.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <LinkGrid
        eyebrow="Next"
        title="Keep going"
        items={[
          { label: "The Magnolia", href: "/the-magnolia/", note: "Sunday 18 October 2026" },
          { label: "Executive Membership", href: "/membership/", note: "What membership includes" },
          { label: "Apply", href: "/apply/", note: "Start your application" },
          { label: "Book the Venue", href: "/venue/", note: "The clubhouse, for hire" },
          { label: "Book Dr. Ebony OH", href: "/epk/", note: "Keynotes, fireside chats & more" },
          { label: "Contact", href: "/contact/", note: "We read everything" },
        ]}
      />

      <ClosingCta />
    </>
  );
}