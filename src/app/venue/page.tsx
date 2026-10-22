import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta } from "@/components/ClosingCta";
import { Figure } from "@/components/Figure";
import { GECForm, type Field } from "@/components/GECForm";
import { PageHeader } from "@/components/PageHeader";
import { Aside, FeatureGrid, LinkGrid, ProseSection } from "@/components/blocks";
import { Button, Container, Eyebrow, Quote, SectionHead, Stat } from "@/components/ui";
import { site } from "@/lib/site";
import {
  budgetRanges,
  eventTypes,
  guestRanges,
  spaces,
  venue,
} from "@/lib/venue";

export const metadata: Metadata = {
  title: "Book the Venue",
  description:
    "Book The Garden's Executive Club — a 6,000-square-foot, two-storey clubhouse on two acres in Stone Mountain, Georgia. Private dinners, luncheons, fireside evenings, receptions and summits.",
  alternates: { canonical: "/venue/" },
};

const FIELDS: Field[] = [
  { name: "first_name", label: "First name", type: "text", required: true, autoComplete: "given-name" },
  { name: "last_name", label: "Last name", type: "text", required: true, autoComplete: "family-name" },
  { name: "email", label: "Email address", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { name: "organisation", label: "Organisation", type: "text", autoComplete: "organization" },
  {
    name: "event_type",
    label: "Type of event",
    type: "select",
    required: true,
    span: 2,
    options: [...eventTypes],
  },
  { name: "event_date", label: "Preferred date", type: "date", required: true },
  { name: "event_time", label: "Start time", type: "time", required: true },
  { name: "guests", label: "Number of guests", type: "select", required: true, span: 2, options: [...guestRanges] },
  { name: "space", label: "Space you have in mind", type: "text", span: 2, placeholder: "The Salon, the Dining Room, the Heritage Lounge — or tell us what the evening needs." },
  { name: "catering", label: "Catering & bar", type: "text", span: 2, placeholder: "Formal dining, family style, passed canapés, a bar, or a full service kitchen — tell us what you have in mind." },
  { name: "budget", label: "Indicative budget", type: "select", span: 2, options: [...budgetRanges] },
  {
    name: "message",
    label: "Anything else we should know?",
    type: "textarea",
    rows: 6,
    span: 2,
    placeholder:
      "The occasion, the flow of the evening, accessibility requirements, and anything you would like held for you.",
  },
];

export default function VenuePage() {
  return (
    <>
      <PageHeader
        eyebrow="The clubhouse"
        title="Book the venue"
        lede={venue.standfirst}
        aside={
          <div>
            <dl className="border-t hair">
              <div className="border-b hair px-5 py-4">
                <dt className="eyebrow !text-[0.55rem] meta">Address</dt>
                <dd className="mt-1.5 text-[0.95rem] leading-snug">
                  {venue.address.line1}
                  <br />
                  {venue.address.line2}
                </dd>
              </div>
              <div className="border-b hair px-5 py-4">
                <dt className="eyebrow !text-[0.55rem] meta">Enquiries</dt>
                <dd className="mt-1.5 text-[0.95rem] leading-snug">
                  <a href={`mailto:${site.contact.email}`} className="link-underline">
                    {site.contact.email}
                  </a>
                  <br />
                  <a href={site.contact.phoneHref} className="link-underline">
                    {site.contact.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="border-b hair px-5 py-4">
                <dt className="eyebrow !text-[0.55rem] meta">Availability</dt>
                <dd className="mt-1.5 text-[0.95rem] leading-snug">
                  <a
                    href={venue.schedulerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    {venue.schedulerLabel}
                  </a>
                </dd>
              </div>
            </dl>
            <Button href="#venue-enquiry" variant="rose" className="mt-8">
              Start an enquiry
            </Button>
          </div>
        }
      />

      {/* The house -------------------------------------------------- */}
      <section className="ground-ink on-dark">
        <Container>
          <div className="pb-[clamp(3rem,6vw,5rem)] pt-[clamp(3rem,6vw,5rem)]">
            <Figure
              slug="heritage-lounge"
              sizes="(min-width: 768px) 512px, 100vw"
              ratio="21/9"
              priority
              caption="The heritage lounge — gilded mirror, marble fireplace, velvet"
            />

            <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
              {venue.facts.map((f) => (
                <Stat key={f.label} value={f.value} label={f.label} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Rooms ------------------------------------------------------ */}
      <section className="ground-cream on-light">
        <Container>
          <div className="py-[clamp(4rem,9vw,7rem)]">
            <SectionHead
              eyebrow="The rooms"
              title="Five rooms, taken one at a time"
              lede="The house is deliberately small. Most evenings use one or two of these rooms and nothing else — which is the point. Capacities, hire rates and minimum spends are confirmed with your enquiry, room by room."
            />
            <FeatureGrid
              className="mt-14"
              columns={2}
              items={spaces.map((s) => ({
                title: s.name,
                body: (
                  <>
                    {s.body}
                    <span className="eyebrow mt-5 block !text-[0.55rem] text-rose-deep">
                      {s.best}
                    </span>
                  </>
                ),
              }))}
            />
          </div>
        </Container>
      </section>

      {/* How an evening runs ---------------------------------------- */}
      <ProseSection
        aside={
          <Figure
            slug="dining"
            sizes="(min-width: 1024px) 18rem, 92vw"
            ratio="4/5"
            stretch
            caption="The dining room"
          />
        }
      >
        <h2>How an evening runs here</h2>
        <p>
          The Garden’s Executive Club was built as a clubhouse for women who
          lead, and it still works that way when it is hired. Guests are taken
          through the rooms in sequence rather than gathered in one large
          space; the parlour and the lounge are used for arrival and for the
          hour after dinner, and the salon or dining room is where the
          conversation actually happens.
        </p>
        <h3>Good to know</h3>
        <ul>
          <li>
            The house sits within two miles of Stone Mountain Park’s West Gate,
            so it works as a destination for a weekend as easily as for an
            evening.
          </li>
          <li>
            Dr. Ebony OH hosts the club’s own gatherings here. If your event is a
            booking, a speaking engagement or a partnership, her{" "}
            <Link href="/epk/" className="link-underline">
              official booking EPK
            </Link>{" "}
            is the faster route.
          </li>
          <li>
            Capacity, hire rates, minimum spends, deposit and cancellation
            terms are confirmed in writing with your enquiry, and are never
            assumed on the day.
          </li>
          <li>
            Third-party catering and décor are welcome; the full service kitchen
            and bar are available on request.
          </li>
        </ul>
        <h3>Dates</h3>
        <p>
          Live availability is held on the club’s booking calendar —{" "}
          <a
            href={venue.schedulerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            {venue.schedulerLabel}
          </a>
          . Send the enquiry form below as well, and we will come back to you
          with a held date, a room and a number.
        </p>
      </ProseSection>

      {/* Enquiry form ----------------------------------------------- */}
      <section className="ground-parchment on-light" id="venue-enquiry">
        <Container>
          <div className="grid gap-y-14 py-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-7">
              <Eyebrow>Venue enquiry</Eyebrow>
              <h2 className="display-sm mt-7 max-w-[18ch] text-balance">
                Tell us about your evening
              </h2>
              <p className="lede measure mt-7">
                The more you can tell us about the occasion, the more useful our
                first reply will be. Fields marked with an asterisk are required.
              </p>

              <div className="mt-12">
                <GECForm
                  tone="light"
                  fields={FIELDS}
                  submitLabel="Send venue enquiry"
                  subject="Venue Booking Enquiry — The Garden's Executive Club"
                  consent={
                    <>
                      The information collected allows us to prepare a proposal
                      and to reply to your enquiry. We never share it. See our{" "}
                      <Link href="/privacy/" className="link-underline">
                        Privacy Policy
                      </Link>
                      . No deposit or payment is taken through this form — hire
                      terms are always agreed in writing first.
                    </>
                  }
                  successTitle="Your enquiry has landed"
                  successBody="Thank you. Someone from the club will reply personally, usually within one business day, with availability for your date, the rooms that suit the occasion, and a written quote."
                />
              </div>
            </div>

            <Aside eyebrow="What happens next">
              <ol className="border-t hair">
                {[
                  ["01", "We check the date", "Availability across the rooms, and whether anything else is scheduled that evening."],
                  ["02", "We propose a room", "With the layout that fits your guest list, and the catering direction we would suggest."],
                  ["03", "We put it in writing", "Hire rate, minimum spend, deposit, cancellation terms and timings — in one document, no ambiguity."],
                  ["04", "You hold the date", "A deposit secures it. We hold a tentative date for seven days while you decide."],
                ].map(([n, t, b]) => (
                  <li key={n} className="border-b hair px-5 py-6">
                    <p className="tnum eyebrow accent">{n}</p>
                    <p className="font-display mt-3 text-[1.15rem] leading-snug">{t}</p>
                    <p className="muted mt-2.5 text-[0.88rem] leading-relaxed">{b}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-10 border-t hair pt-8">
                <Quote attribution="On the house">
                  A two-storey, 6,000-square-foot, two-acre tribute to women
                  executives — built to be used properly, and to be remembered.
                </Quote>
              </div>
            </Aside>
          </div>
        </Container>
      </section>

      <LinkGrid
        eyebrow="Next"
        title="Keep going"
        items={[
          { label: "Upcoming Events", href: "/events/", note: "What is confirmed" },
          { label: "The Magnolia", href: "/the-magnolia/", note: "Sunday 15 November 2026" },
          { label: "Book Dr. Ebony OH", href: "/epk/", note: "Keynotes & fireside chats" },
          { label: "Executive Membership", href: "/membership/", note: "Tiers and investment" },
          { label: "About Us", href: "/about/", note: "Mission and purpose" },
          { label: "Contact", href: "/contact/", note: "We read everything" },
        ]}
      />

      <ClosingCta
        title="Prefer to talk it through?"
        lede="Write to us with your date and your guest list, and we will tell you honestly whether the house suits the evening you have in mind."
      />
    </>
  );
}