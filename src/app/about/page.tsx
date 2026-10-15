import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta } from "@/components/ClosingCta";
import { Figure } from "@/components/Figure";
import { PageHeader } from "@/components/PageHeader";
import { Aside, FeatureGrid, LinkGrid, ProseSection } from "@/components/blocks";
import { Button, Container, Eyebrow, Quote, SectionHead } from "@/components/ui";
import { workTopics } from "@/lib/work";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The Garden's Executive Club is a private women's club for C-suite executives, CEOs and rising VPs, founded by Ebony Ormond-Ham in Stone Mountain, Georgia.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the club"
        title="A room built for the seat nobody else is sitting in"
        lede="The Garden's Executive Club, Inc. was founded by Ebony Ormond-Ham with a simple, stubborn conviction: that women at the top deserve the same infrastructure men have had for decades — and that it should be built with the same seriousness."
        aside={
          <div>
            <Eyebrow>At a glance</Eyebrow>
            <dl className="mt-6 border-t hair">
              {[
                ["Founded", "2021, Stone Mountain, Georgia"],
                ["Founder & CEO", "Ebony Ormond-Ham"],
                ["Eligibility", "C-level, founders, rising VPs"],
                ["Locations", "Stone Mountain GA / Greenville NC"],
                ["Format", "Monthly Core groups, salons, dinners"],
              ].map(([k, v]) => (
                <div key={k} className="border-b hair px-5 py-4">
                  <dt className="eyebrow !text-[0.55rem] meta">{k}</dt>
                  <dd className="mt-1.5 text-[0.92rem] leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        }
      />

      {/* Mission */}
      <ProseSection
        tone="cream"
        aside={
          <Figure
            slug="heritage-lounge"
            sizes="(min-width: 1024px) 30vw, 100vw"
            ratio="4/5"
            stretch
            caption="Within two miles of Stone Mountain Park's West Gate"
          />
        }
      >
        <h2>Our mission</h2>
        <p>
          The Garden&apos;s Executive Club is a private women&apos;s club for
          C-suite executives and VPs, and it has plans for global reach. The
          Garden&apos;s Executive Club, Inc., founded by Ebony Ormond-Ham, is
          planting its first power seed in the vintage tourism attractions of
          downtown Stone Mountain — within a two-mile radius of Stone Mountain
          Park&apos;s West Gate entrance. A two-storey, 6,000-square-foot
          tribute to female executives.
        </p>
        <p>
          Any entrepreneur or C-suite executive will tell you that leading a
          team can be as rewarding as it is punishing: the long hours, the
          cash-flow worries, the expectation that you meet your customers and
          your employees at their highest demands, every day.
        </p>
        <p>
          Imagine an elite club of executive women finally able to debunk the
          stigma that it is lonely at the top. That is what this is. We offer
          private executive coaching, mental-health support groups, counselling,
          access to angel investors and private lenders, grant research, a
          speaker series, a book club, and professional development training.
        </p>
        <p>
          While men have long enjoyed support from networks and clubs built for
          them, women historically have had fewer options — particularly when
          they are younger, when the rooms are thinnest and the ladder is
          longest. No worries. It is our time and it is our turn. We are
          getting ready to change this narrative for good.
        </p>
      </ProseSection>

      {/* The quote */}
      <section className="ground-emerald on-dark">
        <Container>
          <div className="py-[clamp(4rem,9vw,7.5rem)]">
            <Quote
              attribution="Ebony Ormond-Ham"
              source="Founder & Chief Executive Officer"
              className=""
            >
              The worst place to find yourself is climbing a ladder with nowhere
              to go, and no one to catch you should you fall.
            </Quote>
          </div>
        </Container>
      </section>

      {/* Why our work matters */}
      <section className="ground-cream on-light">
        <Container>
          <div className="grid gap-y-14 py-[clamp(4rem,9vw,7.5rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <SectionHead
                eyebrow="Why our work matters"
                title="Explore the topics that matter to us"
                lede="A club that only talks about belonging is a club that only talks. These are the issues we hold in front of the room."
                action={
                  <Button href="/work/" variant="text">
                    See all of our work
                  </Button>
                }
              />
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="border-t hair-faint">
                {workTopics.map((t) => (
                  <li key={t.slug} className="border-b hair-faint">
                    <Link
                      href={`/work/${t.slug}/`}
                      className="group flex items-baseline gap-6 py-6"
                    >
                      <span className="tnum eyebrow shrink-0 accent/60">
                        {t.n}
                      </span>
                      <span className="flex-1">
                        <span className="font-display block text-[1.3rem] leading-snug transition-colors duration-500 group-hover:accent">
                          {t.title}
                        </span>
                        <span className="muted mt-2 block max-w-[48ch] text-[0.9rem] leading-relaxed">
                          {t.standfirst}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Who we are for */}
      <section className="ground-parchment on-light">
        <Container>
          <div className="py-[clamp(4rem,9vw,7.5rem)]">
            <SectionHead
              eyebrow="Who it is for"
              title="Tier one is not a marketing tier. It is the requirement."
              lede="Membership is limited to women already operating at senior executive level. That constraint is the product."
            />
            <div className="mt-14">
              <FeatureGrid
                columns={3}
                items={[
                  {
                    n: "01",
                    title: "Already in the seat",
                    body: "C-level executives, CEOs and founders with businesses generating $225k or more in annual gross revenue, or tracking toward dominating a high-growth sector.",
                  },
                  {
                    n: "02",
                    title: "On the way up",
                    body: "Rising VPs and directors whose trajectory is clear and whose promotion case is already being made — and who need peers who have made the jump.",
                  },
                  {
                    n: "03",
                    title: "Ready to be found",
                    body: "Candidates are evaluated on the strength, length, influence and impact of their career, and on the diversity of their background, industry and role.",
                  },
                ]}
              />
            </div>
            <p className="muted mt-10 max-w-[62ch] text-[0.92rem] leading-relaxed">
              High-growth sectors the club watches closely: healthcare and
              childcare, IT and technology, oil and energy, construction, logistics
              and transportation, real estate, and finance.
            </p>
          </div>
        </Container>
      </section>

      {/* Facilities */}
      <ProseSection
        aside={
          <Aside eyebrow="On the grounds">
            <Figure
              slug="carriage"
              sizes="(min-width: 1024px) 26vw, 100vw"
              ratio="4/5"
              caption="Stone Mountain, Georgia"
            />
          </Aside>
        }
      >
        <h2>What the clubhouse is for</h2>
        <p>
          Alongside the Core groups and the Salon Series, the grounds carry a
          clubhouse, a fine dining restaurant, an executive chef, a speaker
          series, a book club, and plans for a mini-golf course. Members also
          have access to on-site hotel suites.
        </p>
        <p>
          None of this is incidental. A network only works if the people in it
          are willing to keep showing up, and keeping up with a schedule is the
          thing senior women are least able to do. Removing the friction of the
          meeting is most of the value.
        </p>
        <h3>What membership includes</h3>
        <ul>
          <li>
            Ten facilitated luncheons a year — designed to connect everyone at
            the table, not to swap business cards.
          </li>
          <li>
            More intimate signature events through the year, in the evening as
            well as the day, from book signings to spa evenings.
          </li>
          <li>
            Committee participation, open to members only, to build business
            relationships and sharpen organisational, communication and
            leadership skills.
          </li>
          <li>
            A members-only resource table at each meeting, giving your business
            visibility inside the room.
          </li>
          <li>
            Reduced registration on all luncheons — non-members may attend only
            two per year.
          </li>
          <li>
            Recognition of professional achievements and personal milestones on
            the club's site and at the annual awards gala.
          </li>
          <li>
            The online member directory, for networking and promotion.
          </li>
          <li>
            Mentorship — structured to let you give back as well as develop.
          </li>
          <li>
            Special interest groups, to go deeper on a specific profession or
            issue.
          </li>
        </ul>
      </ProseSection>

      <LinkGrid
        eyebrow="Keep going"
        title="Where to next"
        items={[
          { label: "Our History", href: "/our-history/", note: "The first power seed" },
          { label: "Our Board", href: "/our-board/", note: "Governance and open seats" },
          { label: "Our Members", href: "/our-members/", note: "Who is in the room" },
          { label: "Executive Membership", href: "/membership/", note: "Tiers and investment" },
          { label: "Finding Your Voice", href: "/finding-your-voice/", note: "The coaching programme" },
          { label: "Contact the club", href: "/contact/", note: "We read everything" },
        ]}
      />

      <ClosingCta />
    </>
  );
}
