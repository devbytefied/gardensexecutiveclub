import type { Metadata } from "next";
import Link from "next/link";
import { Figure } from "@/components/Figure";
import { GECForm, type Field } from "@/components/GECForm";

import { LinkGrid } from "@/components/blocks";
import { Button, Container, Eyebrow, Quote, SectionHead } from "@/components/ui";
import { clubEvents } from "@/lib/events";
import { site } from "@/lib/site";

const EVENT_URL = "https://event.gardensexecutiveclub.com/";
const magnolia = clubEvents[0];

/** The line on the poster, and the line the invitation sells. */
const HEADLINE = "Two women. Two industries. One table.";

const FIELDS: Field[] = [
  { name: "first_name", label: "First name", type: "text", required: true, autoComplete: "given-name" },
  { name: "last_name", label: "Last name", type: "text", required: true, autoComplete: "family-name" },
  { name: "email", label: "Email address", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { name: "company", label: "Company", type: "text", required: true, autoComplete: "organization" },
  { name: "title", label: "Your title", type: "text", required: true },
  {
    name: "role",
    label: "Which describes you best?",
    type: "select",
    required: true,
    span: 2,
    options: [
      { value: "ceo", label: "Founder / owner / CEO" },
      { value: "c-suite", label: "C-level executive (COO, CFO, CMO, President)" },
      { value: "evp", label: "EVP" },
      { value: "vp", label: "VP" },
      { value: "rising", label: "Director, tracking toward VP" },
      { value: "investor", label: "Investor or capital partner" },
      { value: "other", label: "Something else" },
    ],
  },
  {
    name: "message",
    label: "What brings you to the table?",
    type: "textarea",
    rows: 5,
    span: 2,
    placeholder:
      "Optional, but it helps: what you are building, what you would want the conversation to be about, and who referred you if anyone did.",
  },
];

export const metadata: Metadata = {
  title: "The Magnolia",
  description:
    "The Magnolia Luxury Tea Society Brunch by Ebony OH — Sunday 18 October 2026, 2:00–5:00 PM at The Garden's Executive Club. An intimate fireside chat with Dr. Ebony OH and Carla Stephens, Founder & CEO of Rockstar Trucking Corporation.",
  alternates: { canonical: "/the-magnolia/" },
};

/**
 * The event runs on its own subdomain, and that site owns registration and
 * payment. This page carries the invitation — who, when, where, and what the
 * afternoon is — and sends every expression of interest to the club itself.
 */
export default function MagnoliaPage() {
  return (
    <>
      <section className="ground-ink on-dark pt-[clamp(7rem,14vw,11rem)]">
        <Container>
          <div className="pb-[clamp(3.5rem,7vw,6rem)]">
            <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-12">
              <div className="lg:col-span-7">
                <Eyebrow>The Magnolia Luxury Tea Society Brunch</Eyebrow>
                <h1 className="display mt-8 max-w-[16ch] text-balance">{HEADLINE}</h1>
                <p className="lede measure mt-9">
                  Ladies, thank you for your interest in joining us for an
                  exclusive afternoon of powerful conversations, meaningful
                  connections, and elevated experiences.
                </p>

                <dl className="hair mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t pt-9 sm:grid-cols-4">
                  {[
                    ["18 Oct 2026", "Sunday, by invitation"],
                    ["2:00 – 5:00 PM", "three unhurried hours"],
                    ["Stone Mountain", "GA 30083"],
                    ["Fine tea", "elevated conversation, live music"],
                  ].map(([v, l]) => (
                    <div key={l}>
                      <dt className="sr-only">{l}</dt>
                      <dd>
                        <span className="tnum block font-display text-[1.7rem] leading-none tracking-[-0.02em] text-rose-light">
                          {v}
                        </span>
                        <span className="muted mt-2.5 block text-[0.8rem] leading-snug">
                          {l}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-12 flex flex-wrap items-center gap-x-9 gap-y-4">
                  <Button href={EVENT_URL} variant="rose" external>
                    Request your invitation
                  </Button>
                  <p className="text-[var(--fs-meta)] meta">Opens the event site</p>
                </div>
              </div>

              <div className="lg:col-span-5">
                <Figure
                  slug="magnolia-brunch"
                  sizes="(min-width: 1024px) 28rem, 92vw"
                  ratio="4/5"
                  priority
                  frame
                  className="mx-auto w-full max-w-[28rem]"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Who is hosting --------------------------------------------- */}
      <section className="ground-cream on-light">
        <Container>
          <div className="grid gap-y-12 py-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-5">
              <Eyebrow>Hosted by</Eyebrow>
              <h2 className="display-sm mt-7">Dr. Ebony OH</h2>
              <p className="eyebrow mt-5 !text-[0.58rem] meta">
                Entrepreneur • Investor • Builder • Seed Strategist®
              </p>
              <p className="muted mt-7 max-w-[46ch] text-[0.98rem] leading-relaxed">
                Founder &amp; CEO of ICRO Enterprise, Inc., owner of The Garden’s
                Executive Club, founder of Lemons 2 Millions®, and author of{" "}
                <em>Three Times A Lady: The Woman, Her Business, Her God</em>.
              </p>
              <Link
                href="/epk/"
                className="link-underline mt-7 inline-block text-[0.95rem]"
              >
                Dr. OH’s official booking EPK
              </Link>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Eyebrow>Special guest speaker</Eyebrow>
              <h2 className="display-sm mt-7">Carla Stephens</h2>
              <p className="eyebrow mt-5 !text-[0.58rem] meta">
                Founder &amp; CEO, Rockstar Trucking Corporation
              </p>
              <p className="eyebrow mt-3 !text-[0.58rem] meta">
                Entrepreneur • Transportation Leader • Industry Trailblazer
              </p>
              <p className="muted mt-7 max-w-[52ch] text-[0.98rem] leading-relaxed">
                Two Atlanta multimillion-dollar entrepreneurs, one table, two
                industries that do not usually share a room.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* The afternoon ---------------------------------------------- */}
      <section className="ground-emerald on-dark">
        <Container>
          <div className="py-[clamp(4rem,9vw,7rem)]">
            <SectionHead
              eyebrow="The afternoon"
              title="An intimate fireside chat"
              lede="One conversation, carried by the room for three hours: wealth through ownership, securing contracts, navigating male-dominated industries, scaling successful enterprises, and building lasting legacies."
            />
            <ul className="mt-14 grid gap-px border hair border bg-cream/20 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Wealth through ownership", "Building assets rather than earning from them — and what changes when the business is yours."],
                ["Securing contracts", "How the work actually gets booked, and what changes once you are the one holding the signature."],
                ["Male-dominated industries", "Running a business where you are still the exception, and the price of getting it wrong."],
                ["Scaling enterprises", "From operator to owner: the decisions that make a business transferable, and the ones that do not."],
                ["Building lasting legacies", "What you are building for the people who come after you, and how to protect it."],
                ["Fine tea, live music", "A considered tea service, a live musician, and three hours nobody is counting down."],
              ].map(([t, b], i) => (
                <li key={t} className="bg-teal-soft p-8">
                  <span className="tnum eyebrow meta">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-5 text-[1.3rem] leading-tight tracking-[-0.01em]">
                    {t}
                  </h3>
                  <p className="muted mt-4 text-[0.92rem] leading-relaxed">{b}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Who it is for ---------------------------------------------- */}
      <section className="ground-cream on-light hair-faint border-t">
        <Container>
          <div className="grid gap-y-14 py-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="prose-gec on-light lg:col-span-6">
              <h2>Who the room is for</h2>
              <p>
                This is an intentionally curated experience for women CEOs, COOs,
                CFOs, business owners, entrepreneurs, and influential leaders who
                understand the value of being in the right room.
              </p>
              <p>
                The guest list is capped and curated, and it is not a marketing
                list. If you write to us and you are not yet at the level this
                afternoon is built for, we will say so plainly — and we will tell
                you what the club offers instead.
              </p>
              <h3>Where it is held</h3>
              <p>
                The Garden’s Executive Club, 5459 East Mountain Street, Stone
                Mountain, GA 30083 — within two miles of Stone Mountain Park’s
                West Gate.
              </p>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <Quote attribution="On the afternoon" className="max-w-[44ch]">
                A private afternoon of elegance, purpose and connection in a
                beautiful, historic setting.
              </Quote>

              <div className="hair-strong mt-12 border-t pt-9">
                <Eyebrow>Registration</Eyebrow>
                <p className="mt-6 text-[0.97rem] leading-relaxed muted">
                  Seating and the guest list are held on the event site, which is
                  where they are kept current. If you are not yet a member,{" "}
                  <Link href="/membership/" className="link-underline text-rose-deep">
                    membership is the route in
                  </Link>
                  , but write to{" "}
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="link-underline text-rose-deep"
                  >
                    {site.contact.email}
                  </a>{" "}
                  either way — we read every message.
                </p>
                <Button href={EVENT_URL} variant="rose" external className="mt-8">
                  Go to the event site
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Expression of interest ------------------------------------- */}
      <section className="ground-parchment on-light">
        <Container>
          <div className="grid gap-y-14 py-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-7">
              <Eyebrow>Request your invitation</Eyebrow>
              <h2 className="display-sm mt-7 max-w-[18ch] text-balance">
                Ask to be at the table
              </h2>
              <p className="lede measure mt-7">
                Seats are held for the invitation, and the list is curated by a
                person. Tell us who you are and we will reply personally.
              </p>

              <div className="mt-12">
                <GECForm
                  tone="light"
                  fields={FIELDS}
                  submitLabel="Request an invitation"
                  subject="The Magnolia Brunch — Invitation Request (18 October 2026)"
                  consent={
                    <>
                      Your details are used only to consider your invitation and
                      to reply to you. See our{" "}
                      <Link href="/privacy/" className="link-underline">
                        Privacy Policy
                      </Link>
                      . Payment, if your seat is confirmed, is handled on the
                      event site — never through this form.
                    </>
                  }
                  successTitle="Your request has landed"
                  successBody="Thank you. The guest list for 18 October is being curated now; you will hear from us personally within three business days either way."
                />
              </div>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <div className="hair border p-8">
                <p className="eyebrow meta">The date</p>
                <p className="font-display mt-4 text-[1.6rem] leading-tight tracking-[-0.015em]">
                  {magnolia.date}
                </p>
                <p className="accent mt-2 text-[0.95rem]">{magnolia.time}</p>
                <div className="hair mt-7 border-t pt-6">
                  <p className="eyebrow meta">Where</p>
                  <p className="muted mt-3 text-[0.93rem] leading-relaxed">
                    The Garden’s Executive Club
                    <br />
                    5459 East Mountain Street
                    <br />
                    Stone Mountain, GA 30083
                  </p>
                </div>
                <div className="hair mt-7 border-t pt-6">
                  <p className="eyebrow meta">Direct</p>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="link-underline mt-3 block text-[0.93rem]"
                  >
                    {site.contact.email}
                  </a>
                  <a
                    href={site.contact.phoneHref}
                    className="link-underline mt-2 block text-[0.93rem]"
                  >
                    {site.contact.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <LinkGrid
        eyebrow="Next"
        title="Keep going"
        items={[
          { label: "Upcoming Events", href: "/events/", note: "The year in gatherings" },
          { label: "Apply", href: "/apply/", note: "Start your application" },
          { label: "Executive Membership", href: "/membership/", note: "Tiers and investment" },
          { label: "About Us", href: "/about/", note: "Mission and purpose" },
          { label: "Book the Venue", href: "/venue/", note: "The clubhouse, for hire" },
          { label: "Contact", href: "/contact/", note: "We read everything" },
        ]}
      />
    </>
  );
}

