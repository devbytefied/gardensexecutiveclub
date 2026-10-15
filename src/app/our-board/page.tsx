import type { Metadata } from "next";
import { ClosingCta } from "@/components/ClosingCta";
import { PageHeader } from "@/components/PageHeader";
import { LinkGrid } from "@/components/blocks";
import { Accordion } from "@/components/Accordion";
import { Button, Container, Eyebrow, SectionHead } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Board",
  description:
    "Governance, standing committees and open board seats at The Garden's Executive Club. Nominations are accepted year-round.",
  alternates: { canonical: "/our-board/" },
};

/**
 * The club publishes the board's *structure* rather than a roster of names it
 * cannot yet stand behind. Seats show as filled or open, and every open seat
 * links to the nomination form — which is more honest and does more work than
 * a page full of placeholders.
 */
const SEATS = [
  {
    label: "Founder & Chief Executive Officer",
    status: "filled" as const,
    value: (
      <>
        {site.founder}, the founder of The Garden&apos;s Executive Club, Inc.
        Sets the club's direction and hosts the quarterly membership inquiry
        dinners.
      </>
    ),
  },
  {
    label: "Board Chair",
    status: "filled" as const,
    value: (
      <>
        Chairs the board, sets the agenda, and holds the advisory board to its
        fiduciary and cultural responsibilities.
      </>
    ),
  },
  {
    label: "Vice Chair",
    status: "open" as const,
    value: (
      <>
        Deputises for the Chair and leads board development. A natural fit for a
        member who already facilitates for others.
      </>
    ),
  },
  {
    label: "Secretary",
    status: "filled" as const,
    value: (
      <>
        Custodian of the club's records, minutes and governance documents.
        Ensures decisions made in the room are decisions on the record.
      </>
    ),
  },
  {
    label: "Treasurer",
    status: "open" as const,
    value: (
      <>
        Oversees the club's finances, membership investment and the stewardship
        of donations and sponsorship.
      </>
    ),
  },
  {
    label: "Membership Chair",
    status: "open" as const,
    value: (
      <>
        Owns the candidate pipeline: the quarterly candidacy dinners, the
        application review, and the invitation decision.
      </>
    ),
  },
  {
    label: "Programs Chair",
    status: "filled" as const,
    value: (
      <>
        Steward the Core groups, the Salon Series, the GEC Leaders Program and
        GEC Connect.
      </>
    ),
  },
  {
    label: "Events Chair",
    status: "open" as const,
    value: (
      <>
        Leads the annual dinner, the GEC Summit, The Magnolia and the calendar of
        member gatherings.
      </>
    ),
  },
  {
    label: "Director of Research & Impact",
    status: "open" as const,
    value: (
      <>
        Leads the club's published work — the five research threads — and the
        annual review.
      </>
    ),
  },
  {
    label: "Member Directors (2 seats)",
    status: "open" as const,
    value: (
      <>
        Elected seats held by serving members, to guarantee the board is never
        more removed from the room than the room is from the board.
      </>
    ),
  },
];

const COMMITTEES = [
  {
    n: "01",
    title: "Membership & Candidacy",
    body: "Reviews applications, prepares the quarterly candidacy dinners, and makes the invitation recommendation. Members only.",
  },
  {
    n: "02",
    title: "Programs",
    body: "Designs the Core group curriculum, commissions Core guides, and runs the Salon Series calendar.",
  },
  {
    n: "03",
    title: "Events & Experiences",
    body: "The annual dinner, the GEC Summit, The Magnolia, and the luncheon series.",
  },
  {
    n: "04",
    title: "Finance & Stewardship",
    body: "Membership investment, sponsorship, donations, and the annual review's financial section.",
  },
  {
    n: "05",
    title: "Research & Impact",
    body: "Owns the five published work threads and the club's public positions.",
  },
];

export default function BoardPage() {
  const openCount = SEATS.filter((s) => s.status === "open").length;

  return (
    <>
      <PageHeader
        eyebrow="Our board"
        title="Who is responsible for the room"
        lede="A private club is only as good as the governance behind it. The board holds the strategy, the money, the calendar and the standard — and several of its seats are open to members right now."
        aside={
          <div>
            <Eyebrow>Open seats</Eyebrow>
            <p className="tnum mt-5 font-display text-[4.5rem] leading-none tracking-[-0.03em] accent">
              {openCount}
            </p>
            <p className="muted mt-4 max-w-[26ch] text-[0.9rem] leading-relaxed">
              currently open to members, including two elected member
              directorships.
            </p>
            <Button href="/nominate/" variant="rose" className="mt-8">
              Nominate yourself or someone else
            </Button>
          </div>
        }
      />

      <section className="ground-cream on-light">
        <Container>
          <div className="grid gap-y-14 pb-[clamp(4rem,9vw,7rem)] pt-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-3">
              <SectionHead
                eyebrow="The board"
                title="Seats and mandates"
                lede="Each seat carries a defined responsibility. Open seats can be filled by nomination at any time."
              />
            </div>
            <div className="lg:col-span-8 lg:col-start-5">
              <dl className="border-t hair">
                {SEATS.map((seat) => (
                  <div
                    key={seat.label}
                    className="grid gap-x-10 gap-y-3 border-b hair px-6 py-8 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-y-2 sm:px-8"
                  >
                    <dt>
                      <span className="font-display block text-[1.2rem] leading-snug tracking-[-0.01em]">
                        {seat.label}
                      </span>
                      <span
                        className={`eyebrow mt-3 inline-block !text-[0.53rem] ${
                          seat.status === "open" ? "text-rose-deep" : "meta"
                        }`}
                      >
                        {seat.status === "open" ? "Seat open" : "Filled"}
                      </span>
                    </dt>
                    <dd className="muted text-[0.96rem] leading-relaxed">
                      {seat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <section className="ground-ink on-dark">
        <Container>
          <div className="py-[clamp(4rem,9vw,7rem)]">
            <SectionHead
              eyebrow="Committees"
              title="Where the work actually gets done"
              lede="The board sets direction. The committees do it. Committee membership is open to serving members only."
            />
            <ul className="mt-14 grid gap-px border hair-faint border bg-[color-mix(in_oklab,var(--color-cream)_16%,transparent)] sm:grid-cols-2 lg:grid-cols-3">
              {COMMITTEES.map((c) => (
                <li key={c.n} className="bg-teal p-8 transition-colors duration-500 hover:bg-teal-deep sm:p-9">
                  <span className="tnum eyebrow accent">{c.n}</span>
                  <h3 className="font-display mt-5 text-[1.3rem] leading-tight tracking-[-0.01em]">
                    {c.title}
                  </h3>
                  <p className="muted mt-4 text-[0.92rem] leading-relaxed">
                    {c.body}
                  </p>
                </li>
              ))}
              <li aria-hidden className="bg-teal" />
            </ul>
          </div>
        </Container>
      </section>

      <section className="ground-parchment on-light">
        <Container>
          <div className="grid gap-y-12 py-[clamp(3.5rem,7vw,6rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <SectionHead
                eyebrow="Common questions"
                title="On joining the board"
                lede="Board service is a commitment, not a favour. Here is what is actually involved."
              />
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Accordion
                items={[
                  {
                    q: "Do I have to be a member to take a board seat?",
                    a: (
                      <p>
                        For the two elected member directorships, yes — those
                        seats exist precisely to keep the board close to the
                        membership. For the other offices, a non-member
                        candidate may be considered where they bring a
                        capability the board lacks.
                      </p>
                    ),
                  },
                  {
                    q: "What is the time commitment?",
                    a: (
                      <p>
                        The board meets quarterly. Committee leads meet monthly
                        in the season and quarterly out of it. We would rather
                        under-promise here: ask us for the detail before you
                        volunteer, and we will give you the honest number.
                      </p>
                    ),
                  },
                  {
                    q: "What is being asked of a director financially?",
                    a: (
                      <p>
                        Directorships are unremunerated. Members who take a seat
                        continue their full membership investment, and the
                        board funds its own travel and subsistence.
                      </p>
                    ),
                  },
                  {
                    q: "How are candidates assessed?",
                    a: (
                      <p>
                        On the strength, length, influence and impact of your
                        career and your community contribution — the same
                        standard applied to membership. We value diversity in
                        every measure, including background, industry and role.
                      </p>
                    ),
                  },
                  {
                    q: "Can I nominate without knowing the candidate well?",
                    a: (
                      <p>
                        Yes, and we would ask that you say so. Nominations are
                        not endorsements of character; they are a signal that
                        someone should be looked at properly.
                      </p>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </Container>
      </section>

      <LinkGrid
        eyebrow="Keep going"
        title="Where to next"
        items={[
          { label: "Nominate", href: "/nominate/", note: "Put someone forward" },
          { label: "Our Members", href: "/our-members/", note: "Who is in the room" },
          { label: "Executive Membership", href: "/membership/", note: "Tiers and investment" },
          { label: "Our Work", href: "/work/", note: "The five research threads" },
          { label: "Annual Review", href: "/annual-review/", note: "What the year produced" },
          { label: "Contact the club", href: "/contact/", note: "We read everything" },
        ]}
      />

      <ClosingCta
        title="Nominate someone for the board"
        lede="Nominations are reviewed quarterly by the Membership Committee. You do not need to be a member to nominate — only to care."
      />
    </>
  );
}
