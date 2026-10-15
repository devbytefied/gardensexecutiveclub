import type { Metadata } from "next";
import { ClosingCta } from "@/components/ClosingCta";
import { Figure } from "@/components/Figure";
import { PageHeader } from "@/components/PageHeader";
import { LinkGrid, ProseSection } from "@/components/blocks";
import { Button, Container, Eyebrow, Quote, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Finding Your Voice",
  description:
    "Executive coaching, mentorship and professional development for women at C-level and rising to it, through The Garden's Executive Club.",
  alternates: { canonical: "/finding-your-voice/" },
};

const MODULES = [
  {
    n: "01",
    title: "Private executive coaching",
    body: "One-to-one coaching with an independent professional coach, matched to the specific problem rather than to a general programme. Available to members; a limited number of subsidised places are funded each year.",
  },
  {
    n: "02",
    title: "Mentorship & accountability",
    body: "Structured pairing with a more experienced member, with scheduled check-ins rather than good intentions. Both directions are supported — a large share of the value comes from mentees, not mentors.",
  },
  {
    n: "03",
    title: "Core group facilitation",
    body: "A professional facilitator experienced in executive leadership development, working with your group monthly on the problems you are actually facing.",
  },
  {
    n: "04",
    title: "Mental health & counselling",
    body: "Support groups and access to counselling. Leading at the top is isolating in ways that are difficult to discuss with colleagues, and this is not a weakness to be solved privately.",
  },
  {
    n: "05",
    title: "Workshops & training",
    body: "A host of professional development sessions through the year, plus the Salon Series for senior leaders who want to keep an edge.",
  },
  {
    n: "06",
    title: "Mentoring aspiring executives",
    body: "For members who want to give back: structured mentoring of aspiring female executives, supported by the club.",
  },
];

const FORMS = [
  {
    label: "One-to-one coaching",
    value: "Matched to a specific problem, with an independent professional coach. Member benefit.",
  },
  {
    label: "Group coaching",
    value: "Delivered through the Core group, which meets monthly with a dedicated Core guide.",
  },
  {
    label: "Subsidised places",
    value: "A limited number of funded coaching places each year, funded by member investment and donations. Ask us — we would rather you asked.",
  },
];

export default function FindingYourVoicePage() {
  return (
    <>
      <PageHeader
        eyebrow="Finding your voice"
        title="The hardest part is rarely the strategy"
        lede="Senior women are almost never short on expertise. What is missing is the room in which to say the difficult thing out loud, once, to people who will remember it — and who will not flinch."
        aside={
          <Figure
            slug="founder"
            sizes="(min-width: 1024px) 30vw, 100vw"
            ratio="4/5"
            caption="Addressing members"
          />
        }
      />

      <section className="ground-emerald on-dark">
        <Container>
          <div className="py-[clamp(4rem,9vw,7rem)]">
            <Quote attribution="Ebony Ormond-Ham" className="max-w-[70ch]">
              Men have long enjoyed support from networks built for them. Women
              have had fewer options. No worries — it is our time and it is our
              turn.
            </Quote>
          </div>
        </Container>
      </section>

      <section className="ground-cream on-light">
        <Container>
          <div className="py-[clamp(4rem,9vw,7rem)]">
            <SectionHead
              eyebrow="What is available"
              title="Coaching, mentorship and support"
              lede="All of it is included in membership. None of it is a substitute for therapy, and we will say so plainly when it looks like it should be."
            />
            <ul className="mt-14 grid gap-px border hair-faint border bg-[color-mix(in_oklab,var(--color-ink)_11%,transparent)] sm:grid-cols-2 lg:grid-cols-3">
              {MODULES.map((m) => (
                <li
                  key={m.n}
                  className="group bg-cream p-8 transition-colors duration-500 hover:bg-bone sm:p-9 lg:p-10"
                >
                  <span className="tnum eyebrow text-rose-deep">{m.n}</span>
                  <h3 className="font-display mt-5 text-[1.32rem] leading-tight tracking-[-0.012em]">
                    {m.title}
                  </h3>
                  <p className="muted mt-4 text-[0.93rem] leading-relaxed">
                    {m.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <ProseSection
        aside={
          <div>
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Interested in coaching?</Eyebrow>
              <p className="muted mt-6 text-[0.93rem] leading-relaxed">
                Tell us what you are working on when you apply, or email us
                separately. We will tell you honestly whether coaching is the
                right instrument or whether the answer is something else.
              </p>
              <Button href="/apply/" variant="rose" className="mt-8">
                Apply for membership
              </Button>
            </div>
          </div>
        }
      >
        <h2>How matching works</h2>
        <p>
          We match on the problem, not on the résumé. A coach is chosen because
          they have seen your specific situation before — a difficult board, a
          succession, a first chief executive hire, a team that has quietly
          stopped performing.
        </p>
        <p>
          The first session is diagnostic. If coaching turns out to be the wrong
          answer, we will say so and point you somewhere better. We would rather
          lose a booking than spend your money on the wrong thing.
        </p>
        <h3>Formats</h3>
        <ul>
          {FORMS.map((f) => (
            <li key={f.label}>
              <strong>{f.label}.</strong> {f.value}
            </li>
          ))}
        </ul>
        <h3>Mentorship, in both directions</h3>
        <p>
          Mentorship inside the club runs both ways, and we have stopped
          apologising for that. Members who are not yet where they want to be
          frequently have more useful advice than people further up — they just
          have less practice saying it out loud. If you would rather give than
          receive, the programme is structured to support that too.
        </p>
      </ProseSection>

      <LinkGrid
        eyebrow="Next"
        title="Keep going"
        items={[
          { label: "Executive Membership", href: "/membership/", note: "What membership includes" },
          { label: "Leadership Programmes", href: "/leadership/", note: "The GEC Leaders Program" },
          { label: "GEC Connect", href: "/gec-connect/", note: "The alumni community" },
          { label: "Apply", href: "/apply/", note: "Start your application" },
          { label: "Upcoming Events", href: "/events/", note: "What is confirmed" },
          { label: "Contact", href: "/contact/", note: "We read everything" },
        ]}
      />

      <ClosingCta
        title="Find your voice"
        lede="Coaching, mentorship and a room that will hold you to it are all part of membership. If any of that is what you have been missing, we should talk."
      />
    </>
  );
}
