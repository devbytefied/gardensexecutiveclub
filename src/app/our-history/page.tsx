import type { Metadata } from "next";
import { ClosingCta } from "@/components/ClosingCta";
import { Figure } from "@/components/Figure";
import { PageHeader } from "@/components/PageHeader";
import { LinkGrid, ProseSection } from "@/components/blocks";
import { Container, Eyebrow, Quote } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our History",
  description:
    "Founded by Ebony Ormond-Ham in 2021, The Garden's Executive Club planted its first power seed in the vintage tourism attractions of downtown Stone Mountain, Georgia.",
  alternates: { canonical: "/our-history/" },
};

const TIMELINE = [
  {
    year: "2021",
    title: "The founding",
    body: "The Garden's Executive Club, Inc. is incorporated by Ebony Ormond-Ham, a business and wealth tycoon, with a plan that was always larger than one clubhouse. The first commitment: build a private network for senior women in a region that had none.",
  },
  {
    year: "2021",
    title: "The seed is planted",
    body: "The club takes its first premises in the vintage tourism attractions of downtown Stone Mountain, within two miles of Stone Mountain Park's West Gate entrance — a two-storey, 6,000-square-foot tribute to female executives.",
  },
  {
    year: "2021",
    title: "The private reveal",
    body: "The club is introduced to an audience of empowering women from across the United States, and the first members are seated. Core groups form. The first quarterly candidacy dinners are hosted by the advisory board.",
  },
  {
    year: "2022",
    title: "The programme begins",
    body: "Leadership programming launches, along with GEC Connect — a community for scholars and programme graduates, brought together through live events, social platforms and an online space.",
  },
  {
    year: "2026",
    title: "The Magnolia",
    body: "The club's signature gathering is reimagined as The Magnolia by Ebony OH — a luxury tea society built on fine tea, elevated conversation and the deliberate narrowing of the guest list.",
  },
];

export default function HistoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our history"
        title="One room, then a network, then an intention"
        lede="Every organisation worth joining had a moment where it could plausibly have not existed. This is ours — and what we chose to do with it."
      />

      <section className="ground-ink on-dark">
        <Container>
          <div className="pb-[clamp(3rem,6vw,5rem)] pt-[clamp(3rem,6vw,5rem)]">
            <Figure
              slug="carriage"
              sizes="(min-width: 768px) 1280px, 100vw"
              ratio="21/9"
              priority
              caption="Downtown Stone Mountain, within two miles of the Park's West Gate"
            />
          </div>
        </Container>
      </section>

      <section className="ground-cream on-light">
        <Container>
          <div className="py-[clamp(4rem,9vw,7.5rem)]">
            <Quote
              attribution={site.founderShort}
              source="On founding the club"
       
            >
              Imagine an elite club of executive female powerhouses finally able
              to debunk the stigma that it is lonely at the top.
            </Quote>
          </div>
        </Container>
      </section>

      <ProseSection
        aside={
          <div>
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Why it matters</Eyebrow>
              <p className="muted mt-6 text-[0.93rem] leading-relaxed">
                The founding idea was never a building. It was a recognition
                that women at the top of their professions were doing the
                hardest version of leadership with the least institutional
                support — and that fixing that required other women, in a room,
                on purpose.
              </p>
            </div>
          </div>
        }
      >
        <h2>The original conviction</h2>
        <p>
          The Garden&apos;s Executive Club, Inc., founded by wealth tycoon Ebony
          Ormond-Ham, is planting its first power seed in the vintage tourism
          attractions of downtown Stone Mountain — within a two-mile radius of
          Stone Mountain Park&apos;s West Gate entrance. A two-storey,
          6,000-square-foot, two-acre tribute to female executives.
        </p>
        <p>
          Any entrepreneur or C-suite executive will tell you that leading a
          team can be as rewarding as it is punishing, with the long hours,
          cash-flow woes, and the expectations to meet your customers and
          employees at their highest demands.
        </p>
        <p>
          Imagine an elite club of executive female powerhouses finally able to
          debunk the stigma that it is lonely at the top. The Garden&apos;s
          Executive Club will offer private executive coaching, mental-health
          support groups, counselling, book clubs, access to angel investors,
          private lenders, grant research, and so much more.
        </p>
        <p>
          While men have long enjoyed support from networks and clubs that cater
          to them, women historically have had fewer options — particularly when
          they are younger. No worries. It is our time and it is our turn. We
          are getting ready to change this narrative for good by offering
          C-suite execs and rising vice presidents mentorship opportunities
          across various industries, focused career coaching sessions, and
          networking events.
        </p>
        <p>
          There is also access to a clubhouse, a speaker series, a book club,
          on-site hotel suites, an executive chef, and a host of workshops and
          professional development trainings.
        </p>
      </ProseSection>

      <section className="ground-cream on-light">
        <Container>
          <div className="py-[clamp(4rem,9vw,7.5rem)]">
            <Eyebrow>The record</Eyebrow>
            <ol className="mt-12 border-t hair">
              {TIMELINE.map((item) => (
                <li
                  key={`${item.year}-${item.title}`}
                  className="grid gap-x-10 gap-y-4 border-b hair px-6 py-10 sm:px-8 lg:grid-cols-12"
                >
                  <span className="tnum font-display text-[1.6rem] leading-none tracking-[-0.02em] text-rose-deep lg:col-span-2">
                    {item.year}
                  </span>
                  <h3 className="font-display text-[1.45rem] leading-tight tracking-[-0.01em] lg:col-span-4">
                    {item.title}
                  </h3>
                  <p className="muted text-[0.97rem] leading-relaxed lg:col-span-6">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <LinkGrid
        eyebrow="Keep going"
        title="Where to next"
        items={[
          { label: "About Us", href: "/about/", note: "Mission and purpose" },
          { label: "Our Board", href: "/our-board/", note: "Governance and open seats" },
          { label: "Our Members", href: "/our-members/", note: "Who is in the room" },
          { label: "Executive Membership", href: "/membership/", note: "Tiers and investment" },
          { label: "The Magnolia", href: "/the-magnolia/", note: "Our signature gathering" },
          { label: "Annual Review", href: "/annual-review/", note: "What the year produced" },
        ]}
      />

      <ClosingCta />
    </>
  );
}
