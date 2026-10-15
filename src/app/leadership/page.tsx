import type { Metadata } from "next";
import { ClosingCta } from "@/components/ClosingCta";
import { PageHeader } from "@/components/PageHeader";
import { LinkGrid } from "@/components/blocks";
import { Button, Container, Eyebrow, Quote, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "The GEC Leaders Program and GEC Connect — two leadership programmes designed to move more women into senior executive roles.",
  alternates: { canonical: "/leadership/" },
};

const OUTCOMES = [
  {
    n: "01",
    title: "Female leaders",
    body: "Enhancing career opportunities for managers and senior executives aiming for a role in the C-suite.",
  },
  {
    n: "02",
    title: "Organisation leaders",
    body: "Driving the advancement of women inside organisations, and developing best-practice gender action plans.",
  },
  {
    n: "03",
    title: "Georgia and beyond",
    body: "A programme designed for and delivered in Georgia, with a route into our Greenville, North Carolina chapter and wider national membership.",
  },
];

export default function LeadershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Leadership"
        title="Leadership programmes"
        lede="Women are significantly under-represented in decision-making. More diversity — through female voices at every level of leadership — will deliver better decisions and more equitable outcomes. These are the two programmes we run to move that number."
      />

      <section className="ground-ink on-dark">
        <Container>
          <div className="grid gap-y-14 py-[clamp(3.5rem,7vw,6rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <SectionHead
                eyebrow="How we work"
                title="What GEC aims to achieve"
                lede="Two levers, applied consistently, measured honestly."
              />
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="border-t hair-faint">
                {OUTCOMES.map((o) => (
                  <li key={o.n} className="grid gap-x-8 gap-y-3 border-b hair-faint px-6 py-8 sm:grid-cols-[3rem_1fr] sm:px-8">
                    <span className="tnum eyebrow accent/60">{o.n}</span>
                    <div>
                      <h3 className="font-display text-[1.35rem] leading-tight tracking-[-0.012em]">
                        {o.title}
                      </h3>
                      <p className="muted mt-3 max-w-[52ch] text-[0.95rem] leading-relaxed">
                        {o.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Programme one */}
      <section className="ground-parchment on-light">
        <Container>
          <div className="grid gap-y-12 py-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <Eyebrow>Programme one</Eyebrow>
              <h2 className="display-sm mt-7 max-w-[14ch] text-balance">
                The GEC Leaders Program
              </h2>
            </div>
            <div className="prose-gec lg:col-span-7 lg:col-start-6">
              <p className="!text-[1.1rem] !leading-relaxed">
                A bespoke leadership programme developed to inspire and equip
                women to fulfil their leadership potential.
              </p>
              <p>
                The programme provides women with the skills to take their place
                alongside men, so that organisations deliver the best possible
                outcome for customers, shareholders and the community.
              </p>
              <h3>What it covers</h3>
              <ul>
                <li>Executive presence and the ability to hold a difficult room.</li>
                <li>Strategic decision-making under genuine uncertainty.</li>
                <li>Building and leading a team through a period of rapid change.</li>
                <li>Influencing without authority — the actual job of a senior woman.</li>
                <li>Board readiness and the sponsorship conversation nobody initiates.</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Programme two */}
      <section className="ground-cream on-light">
        <Container>
          <div className="grid gap-y-12 py-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <Eyebrow>Programme two</Eyebrow>
              <h2 className="display-sm mt-7 max-w-[14ch] text-balance">GEC Connect</h2>
              <p className="muted mt-7 max-w-[40ch] text-[0.97rem] leading-relaxed">
                A community of women leaders who are either GEC scholars or
                graduates of the GEC Leaders Program.
              </p>
              <Button href="/gec-connect/" variant="outline" className="mt-9">
                About GEC Connect
              </Button>
            </div>
            <div className="prose-gec lg:col-span-7 lg:col-start-6">
              <p className="!text-[1.1rem] !leading-relaxed">
                These women leaders come together through live events, social
                platforms and an online community, to build relationships with
                some of Georgia&apos;s most senior women leaders: GEC members.
              </p>
              <p>
                The programme graduates. The membership does not stop there — it
                graduates into the club, and the club is where the relationship
                continues.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Networks and mentorship */}
      <section className="ground-cream on-light">
        <Container>
          <div className="py-[clamp(4rem,9vw,7rem)]">
            <SectionHead
              eyebrow="Expanding networks and impact"
              title="Leadership does not end with skills"
              lede="It thrives on networks and mentorship. We treat the second half of leadership as seriously as the first."
            />
            <div className="prose-gec mt-14 max-w-[70ch]">
              <p>
                At GEC we recognise that leadership does not end with skills — it
                thrives through solid networks and mentorship.
              </p>
              <p>
                We offer mentorship opportunities to support women in executive
                roles, connecting rising leaders with experienced professionals.
                This programme enables women to gain valuable insight and
                guidance as they navigate their careers.
              </p>
              <p>
                Additionally, GEC organises leadership workshops and seminars
                that foster continuous learning and personal growth. By
                participating in these events, women can stay at the forefront of
                leadership trends, sharpen their expertise, and expand their
                influence in Georgia and beyond.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="ground-cream on-light">
        <Container>
          <div className="py-[clamp(3.5rem,7vw,6rem)]">
            <Quote attribution="On leadership" className="max-w-[38ch]">
              Networks do not move anyone. Mentorship does. We try to do both,
              and we measure the second one.
            </Quote>
          </div>
        </Container>
      </section>

      <LinkGrid
        eyebrow="Next"
        title="Keep going"
        items={[
          { label: "GEC Connect", href: "/gec-connect/", note: "The alumni community" },
          { label: "Finding Your Voice", href: "/finding-your-voice/", note: "The coaching programme" },
          { label: "Executive Membership", href: "/membership/", note: "Tiers and investment" },
          { label: "Our Work", href: "/work/", note: "The five research threads" },
          { label: "Annual Review", href: "/annual-review/", note: "What the year produced" },
          { label: "Contact", href: "/contact/", note: "We read everything" },
        ]}
      />

      <ClosingCta
        title="Lead the programme, or join it"
        lede="GEC Connect is open to scholars and Leaders Program graduates. If you have run either, or want to, we would like to hear from you."
      />
    </>
  );
}
