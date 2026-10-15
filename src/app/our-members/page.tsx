import type { Metadata } from "next";
import { ClosingCta } from "@/components/ClosingCta";
import { Figure } from "@/components/Figure";
import { PageHeader } from "@/components/PageHeader";
import { DataRows, LinkGrid, ProseSection } from "@/components/blocks";
import { Marquee } from "@/components/Marquee";
import { Button, Container, Quote, SectionHead } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Members",
  description:
    "Who is in the room at The Garden's Executive Club — tiers, industries, and the member experience across Stone Mountain, Georgia and Greenville, North Carolina.",
  alternates: { canonical: "/our-members/" },
};

const TIERS = [
  {
    label: "Tier 1 — C-Suite Elite",
    value: (
      <>
        Reserved for women already working in high-level roles as CEOs,
        presidents or VPs, overseeing entrepreneurial ventures with annual
        gross revenue of $225k or more — or actively dominating a high-growth
        sector.
      </>
    ),
  },
  {
    label: "Tier 2 — Rising VP",
    value: (
      <>
        For women with a clear and documented trajectory toward the C-suite who
        would benefit from peers who have already made the move. Assessed on the
        strength and trajectory of the career, not on a job description.
      </>
    ),
  },
  {
    label: "Corporate",
    value: (
      <>
        Up to four executives seated on a single corporate account, each
        receiving the full member benefit. Sponsored and unsponsored pricing
        both available.
      </>
    ),
    note: "See the investment page for current rates.",
  },
  {
    label: "Out of state & remote",
    value: (
      <>
        Full access to the Salon Series, the member directory, committees and
        the quarterly investor summit, wherever the member is based.
      </>
    ),
  },
];

const INDUSTRIES = [
  "Healthcare & childcare",
  "Technology & software",
  "Finance & professional services",
  "Real estate & construction",
  "Logistics & transportation",
  "Oil, gas & energy",
  "Retail & consumer",
  "Media & communications",
];

const EXPERIENCE = [
  {
    n: "01",
    title: "A Core group that keeps",
    body: "Ten career contemporaries, meeting monthly, with a professional facilitator. This is the single thing members cite most often when they explain why they stayed.",
  },
  {
    n: "02",
    title: "A directory people actually open",
    body: "The online member directory exists for networking and promotion. Members list their business; the table at every meeting does the rest.",
  },
  {
    n: "03",
    title: "A stage when you need one",
    body: "Recognition of professional achievements and personal milestones — on the club's site and at the annual awards gala.",
  },
  {
    n: "04",
    title: "Someone to call",
    body: "Honestly, the hardest part of being a senior woman is that there is nobody to call. The point of a private club is that the number is small enough to still know everyone.",
  },
];

export default function MembersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our members"
        title="Who is in the room"
        lede="We do not publish a list of member names, and we never will. What we will tell you is the shape of the room — because a directory of strangers is not a network."
      />

      {/* Industries */}
      <section className="ground-ink on-dark">
        <Container>
          <div className="grid gap-y-12 py-[clamp(3.5rem,7vw,6rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <SectionHead
                eyebrow="Industries"
                title="Deliberately mixed"
                lede="A room of women from the same three sectors is a reunion, not a network. We recruit across industries on purpose."
              />
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="grid gap-px border hair-faint border bg-[color-mix(in_oklab,var(--color-cream)_16%,transparent)] sm:grid-cols-2">
                {INDUSTRIES.map((s) => (
                  <li
                    key={s}
                    className="bg-teal px-6 py-5 text-[0.95rem] leading-snug transition-colors duration-500 hover:bg-teal-deep"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Member companies */}
      <section className="ground-cream on-light border-y hair-faint py-[clamp(3.5rem,6vw,5.5rem)]">
        <Container>
          <p className="eyebrow mb-12 text-center meta">
            Members are senior leaders from companies including
          </p>
        </Container>
        <Marquee
          items={[
            "American Express",
            "Cartier",
            "Google",
            "HBO",
            "Hulu",
            "Johnson & Johnson",
            "Spotify",
            "Verizon",
            "Walmart",
            "WeWork",
            "Yext",
          ]}
          duration={58}
        />
      </section>

      {/* Tiers */}
      <section className="ground-parchment on-light">
        <Container>
          <div className="grid gap-y-12 py-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <SectionHead
                eyebrow="Membership tiers"
                title="Four ways to be a member"
                lede="Tiers describe standing, not worth. Every member gets the same access to the same room."
                action={
                  <Button href="/membership/" variant="text">
                    Investment and benefits
                  </Button>
                }
              />
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <DataRows rows={TIERS} className="border-t pt-7 hair" />
            </div>
          </div>
        </Container>
      </section>

      {/* Experience */}
      <section className="ground-cream on-light">
        <Container>
          <div className="py-[clamp(4rem,9vw,7rem)]">
            <SectionHead
              eyebrow="The member experience"
              title="What you are actually joining"
              lede="Not a newsletter. Not a directory. A working peer group with a professional facilitator, and a calendar small enough that showing up is realistic."
            />
            <ul className="mt-14 grid gap-px border hair-faint  bg-[color-mix(in_oklab,var(--color-ink)_11%,transparent)] sm:grid-cols-2">
              {EXPERIENCE.map((x) => (
                <li
                  key={x.n}
                  className="bg-cream p-8  transition-colors duration-500 hover:bg-bone sm:p-10"
                >
                  <span className="tnum eyebrow text-rose-deep">{x.n}</span>
                  <h3 className="font-display mt-5 text-[1.4rem] leading-tight tracking-[-0.012em]">
                    {x.title}
                  </h3>
                  <p className="muted mt-4 max-w-[46ch] text-[0.95rem] leading-relaxed">
                    {x.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <ProseSection
        aside={
          <Figure
            slug="gathering-b"
            sizes="(min-width: 1024px) 30vw, 100vw"
            ratio="4/5"
            stretch
            caption="A members' gathering"
          />
        }
      >
        <h2>On privacy, and why we publish so little</h2>
        <p>
          A private club that publicises its roster stops being private. Member
          names, employers and photographs are shared only inside the club and
          only with consent — which is why this page describes the room rather
          than listing it.
        </p>
        <p>
          The member directory is real, it is maintained, and it is the most
          used tool inside the club. It is simply not a public document.
        </p>
        <h3>If you are a prospective member</h3>
        <ul>
          <li>Come to a quarterly candidacy dinner before you decide anything.</li>
          <li>Ask to speak with a member in your sector. We will arrange it.</li>
          <li>Ask about the Core groups specifically. They are the real thing.</li>
          <li>Ask us what the club is bad at. We will answer.</li>
        </ul>
      </ProseSection>

      <section className="ground-cream on-light">
        <Container>
          <div className="py-[clamp(3.5rem,7vw,6rem)]">
            <Quote attribution="On the point of the club" className="max-w-[50ch]">
              We are not a directory. We are ten women you will still be calling
              in five years.
            </Quote>
          </div>
        </Container>
      </section>

      <LinkGrid
        eyebrow="Next"
        title="Keep going"
        items={[
          { label: "Apply", href: "/apply/", note: "Start your application" },
          { label: "Our Board", href: "/our-board/", note: "Governance and open seats" },
          { label: "Upcoming Events", href: "/events/", note: "What is confirmed" },
          { label: "GEC Connect", href: "/gec-connect/", note: "The alumni community" },
          { label: "Annual Review", href: "/annual-review/", note: "What the year produced" },
          { label: "Contact", href: "/contact/", note: "We read everything" },
        ]}
      />

      <ClosingCta
        title="Request an invitation"
        lede={`Membership is limited to women at C-level, founders and rising VPs. If that is you, we should talk — email ${site.contact.email} and a person will reply.`}
      />
    </>
  );
}
