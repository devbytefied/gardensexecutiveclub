import type { Metadata } from "next";
import { ClosingCta } from "@/components/ClosingCta";
import { PageHeader } from "@/components/PageHeader";
import { LinkGrid } from "@/components/blocks";
import { Container, Eyebrow, Quote, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Annual Review",
  description:
    "What The Garden's Executive Club produced in the year — membership, programmes, published research and gatherings.",
  alternates: { canonical: "/annual-review/" },
};

/**
 * Figures for the current year. Update this block once a year — it is the
 * only place the numbers live.
 */
const YEAR = {
  label: "2026",
  status: "In progress",
  note: "The current year is still running. These are the figures we can stand behind today; the full review is published each January.",
};

const FIGURES = [
  { value: "10", label: "peers per Core group", note: "Unchanged by design" },
  { value: "4", label: "locations running programming", note: "Stone Mountain and Greenville" },
  { value: "5", label: "published research threads", note: "All re-grounded in US data" },
  { value: "12", label: "months of continuous operation", note: "No gaps" },
];

const WORK = [
  {
    n: "01",
    title: "Research re-grounded",
    body: "Every one of the five published work threads was re-examined this year. Material inherited from the club's original research partnership had been written for an Australian context — different superannuation rules, a different state, different comparators. The argument survived. The geography did not. All five pages now carry United States figures and United States sources.",
  },
  {
    n: "02",
    title: "The board rebuilt",
    body: "The board's structure was rewritten around defined mandates rather than a list of names, with open seats published as open. Six of eleven seats are currently open to members, including two elected member directorships.",
  },
  {
    n: "03",
    title: "The Magnolia",
    body: "Our signature gathering was reimagined as The Magnolia by Ebony OH — a luxury tea society built on fine tea, elevated conversation, and a deliberately narrow guest list.",
  },
  {
    n: "04",
    title: "The site rebuilt",
    body: "The club's web presence was rebuilt from the ground up: a faster, fully static site with a single coherent design system, the old WordPress content preserved and reorganised, and every dead page removed.",
  },
];

const ACKNOWLEDGEMENTS = [
  "The members who show up to a monthly Core group on a week when work is hardest.",
  "The Core group guides, who do the hardest job in the club for the least recognition.",
  "Our volunteers, who run the events nobody sees the preparation for.",
  "Our donors, who fund the subsidised places that would otherwise not exist.",
];

export default function AnnualReviewPage() {
  return (
    <>
      <PageHeader
        eyebrow={`Annual review / ${YEAR.label}`}
        title="What the year produced"
        lede="An annual review that only lists compliments is marketing. This one lists the work, the gaps, and the things we got wrong."
        aside={
          <div>
            <Eyebrow>Status</Eyebrow>
            <p className="mt-6 font-display text-[1.6rem] leading-tight tracking-[-0.012em] accent">
              {YEAR.status}
            </p>
            <p className="muted mt-4 max-w-[30ch] text-[0.9rem] leading-relaxed">
              {YEAR.note}
            </p>
          </div>
        }
      />

      {/* Figures */}
      <section className="ground-emerald on-dark">
        <Container>
          <dl className="grid gap-x-10 gap-y-9 py-[clamp(3rem,6vw,5rem)] sm:grid-cols-2 lg:grid-cols-4">
            {FIGURES.map((f) => (
              <div key={f.label} className="border-t hair pt-6">
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="tnum block font-display text-[clamp(2.8rem,5vw,4rem)] leading-none tracking-[-0.03em] accent">
                    {f.value}
                  </span>
                  <span className="mt-3.5 block text-[0.92rem] leading-snug">
                    {f.label}
                  </span>
                  <span className="eyebrow mt-3 block !text-[0.5rem] meta">
                    {f.note}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Work */}
      <section className="ground-cream on-light">
        <Container>
          <div className="grid gap-y-14 py-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <SectionHead
                eyebrow="The work"
                title="Four things we actually did"
                lede="Not a list of events attended. A list of things that were different at the end of the year."
              />
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="border-t hair-faint">
                {WORK.map((w) => (
                  <li key={w.n} className="border-b hair-faint px-6 py-8 sm:px-8">
                    <div className="flex items-baseline gap-6">
                      <span className="tnum eyebrow shrink-0 accent/60">{w.n}</span>
                      <h3 className="font-display text-[1.4rem] leading-tight tracking-[-0.012em]">
                        {w.title}
                      </h3>
                    </div>
                    <p className="muted mt-4 max-w-[58ch] text-[0.95rem] leading-relaxed sm:pl-12">
                      {w.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Honest reckoning */}
      <section className="ground-cream on-light">
        <Container>
          <div className="grid gap-y-12 py-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-5">
              <Eyebrow>The honest part</Eyebrow>
              <h2 className="display-sm mt-7 max-w-[16ch] text-balance">
                What did not work
              </h2>
              <div className="prose-gec mt-9">
                <p>
                  A review that lists only successes is a brochure. So, plainly:
                  the club has been better at building than at converting. The
                  quarterly candidacy dinners have run; applications have not
                  kept pace with the number of seats.
                </p>
                <p>
                  The board has carried more than it should have, which is why
                  six of eleven seats are open and published as open. And the
                  old website made it harder to apply than it needed to be — a
                  form asking for card details in the browser is a form most
                  people abandon.
                </p>
                <p>
                  None of that is a crisis. All of it is fixable, and the
                  fixes are not secret.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <Eyebrow>With thanks</Eyebrow>
              <ul className="mt-7 border-t hair">
                {ACKNOWLEDGEMENTS.map((a) => (
                  <li
                    key={a}
                    className="border-b hair px-5 py-6 text-[1rem] leading-relaxed"
                  >
                    {a}
                  </li>
                ))}
              </ul>
              <p className="muted mt-8 text-[0.88rem] leading-relaxed">
                The full review, including the financial section, is circulated
                to members each January.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="ground-cream on-light">
        <Container>
          <div className="py-[clamp(4rem,9vw,7rem)]">
            <Quote
              attribution="On the point of a review"
              
            >
              If the only thing that changed this year was that we felt better
              about ourselves, it was not worth writing down.
            </Quote>
          </div>
        </Container>
      </section>

      <LinkGrid
        eyebrow="Next"
        title="Keep going"
        items={[
          { label: "Our Work", href: "/work/", note: "The five research threads" },
          { label: "Annual Review", href: "/annual-review/", note: "What the year produced" },
          { label: "Donations", href: "/donations/", note: "Sponsorship and giving" },
          { label: "Upcoming Events", href: "/events/", note: "What is confirmed" },
          { label: "Our Members", href: "/our-members/", note: "Who is in the room" },
          { label: "Contact", href: "/contact/", note: "We read everything" },
        ]}
      />

      <ClosingCta
        title="Help us do better next year"
        lede="The gaps above are visible because members told us. If you have a view on any of it, we want to hear it."
        primary={{ label: "Contact the club", href: "/contact/" }}
        secondary={{ label: "Support the work", href: "/donations/" }}
      />
    </>
  );
}
