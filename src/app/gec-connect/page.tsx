import type { Metadata } from "next";
import { ClosingCta } from "@/components/ClosingCta";
import { Figure } from "@/components/Figure";
import { PageHeader } from "@/components/PageHeader";
import { LinkGrid, ProseSection } from "@/components/blocks";
import { Accordion } from "@/components/Accordion";
import { Button, Container, Eyebrow, SectionHead } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "GEC Connect",
  description:
    "GEC Connect is an exclusive community for GEC scholars and GEC Leaders Program graduates — connected through live events and an online community.",
  alternates: { canonical: "/gec-connect/" },
};

export default function GECConnectPage() {
  return (
    <>
      <PageHeader
        eyebrow="GEC Connect"
        title="Where the programme graduates"
        lede="GEC Connect is an exclusive community for GEC Scholars and graduates of the GEC Leaders Program. Through live events and an online community, GEC Connect enables alumni of these programmes to learn from — and build relationships with — some of Georgia's most senior women leaders: GEC members."
        aside={
          <Figure
            slug="gathering-a"
            sizes="(min-width: 1024px) 30vw, 100vw"
            ratio="4/5"
            stretch
            caption="A GEC Connect gathering"
          />
        }
      />

      <section className="ground-emerald on-dark">
        <Container>
          <dl className="grid gap-x-10 gap-y-9 py-[clamp(3rem,6vw,5rem)] sm:grid-cols-3">
            {[
              ["Scholars", "GEC Scholars across both flagship locations"],
              ["Graduates", "Leaders Program alumni, now in senior roles"],
              ["Members", "The most senior women in the network"],
            ].map(([v, l]) => (
              <div key={l} className="border-t hair pt-6">
                <dt className="sr-only">{l}</dt>
                <dd>
                  <span className="font-display block text-[1.6rem] leading-tight tracking-[-0.012em] accent">
                    {v}
                  </span>
                  <span className="muted mt-3 block max-w-[28ch] text-[0.86rem] leading-snug">
                    {l}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <ProseSection
        tone="cream"
        aside={
          <div>
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Who it is for</Eyebrow>
              <p className="mt-6 text-[0.95rem] leading-relaxed opacity-70">
                GEC Connect is open to scholars and Leaders Program graduates.
                If you have completed either and are not yet connected, email us
                and we will add you.
              </p>
              <Button href="/contact/" variant="rose" className="mt-8">
                Get connected
              </Button>
            </div>
          </div>
        }
      >
        <h2>What the community is</h2>
        <p className="!text-[1.1rem] !leading-relaxed">
          GEC Connect is an exclusive community for GEC Scholars and graduates
          of the GEC Leaders Program. Through live events and an online
          community, GEC Connect enables alumni of these programmes to learn from
          and build relationships with some of Georgia&apos;s most senior women
          leaders: GEC members.
        </p>
        <p>
          The distinction matters. The programme teaches. The community keeps
          teaching — but the teaching is now peer-to-peer, which is the only
          kind that changes behaviour.
        </p>
        <h3>What happens in it</h3>
        <ul>
          <li>
            <strong>Live events.</strong> Scheduled gatherings where scholars
            and graduates meet the members they have only read about.
          </li>
          <li>
            <strong>Social platforms.</strong> Ongoing conversation between
            events, because a network that only exists on a quarterly is not a
            network.
          </li>
          <li>
            <strong>An online community.</strong> A standing place to ask a
            question that would otherwise be too small to take to a room.
          </li>
          <li>
            <strong>Relationship-building.</strong> Deliberately facilitated.
            The point is not attendance; it is who you end up knowing.
          </li>
        </ul>
      </ProseSection>

      <section className="ground-cream on-light">
        <Container>
          <div className="grid gap-y-12 py-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <SectionHead
                eyebrow="Joining"
                title="How to get in"
                lede="GEC Connect is not a paid tier. It is earned by having done the work."
              />
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Accordion
                items={[
                  {
                    q: "I am a GEC Scholar. What do I do?",
                    a: (
                      <p>
                        Email {site.contact.email} with your name and cohort. We
                        will add you to the community calendar and the online
                        space within a week.
                      </p>
                    ),
                  },
                  {
                    q: "I graduated the Leaders Program but missed the induction.",
                    a: (
                      <p>
                        Nothing expires. Tell us your cohort year and we will
                        bring you into the next live event and the online space
                        at the same time.
                      </p>
                    ),
                  },
                  {
                    q: "I want to attend a GEC Connect event without being an alumna.",
                    a: (
                      <p>
                        Some events are open to members and their guests. Write
                        to us and we will let you know what is coming up.
                      </p>
                    ),
                  },
                  {
                    q: "I want to speak at a GEC Connect event.",
                    a: (
                      <p>
                        We programme around practitioners. If you have run
                        something in your own organisation that worked, we would
                        like to hear the specifics — including the parts that
                        did not work.
                      </p>
                    ),
                  },
                  {
                    q: "Does GEC Connect lead to membership?",
                    a: (
                      <p>
                        It can. Membership is a separate application assessed on
                        its own terms, but many members arrived through this
                        community first.
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
        eyebrow="Next"
        title="Keep going"
        items={[
          { label: "Leadership Programmes", href: "/leadership/", note: "The two levers" },
          { label: "Finding Your Voice", href: "/finding-your-voice/", note: "The coaching programme" },
          { label: "Executive Membership", href: "/membership/", note: "Tiers and investment" },
          { label: "Upcoming Events", href: "/events/", note: "What is confirmed" },
          { label: "Annual Review", href: "/annual-review/", note: "What the year produced" },
          { label: "Contact", href: "/contact/", note: "We read everything" },
        ]}
      />

      <ClosingCta
        title="Join the community"
        lede="Scholars and graduates: if you are not connected yet, tell us and we will fix that this week."
      />
    </>
  );
}
