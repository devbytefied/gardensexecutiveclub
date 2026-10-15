import type { Metadata } from "next";
import { ClosingCta } from "@/components/ClosingCta";
import { Figure } from "@/components/Figure";
import { PageHeader } from "@/components/PageHeader";
import { DataRows, LinkGrid, ProseSection } from "@/components/blocks";
import { Button, Container, Eyebrow, Quote, SectionHead } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Executive Membership",
  description:
    "Executive and corporate membership investment for The Garden's Executive Club. Monthly Core groups, salons, dinners, coaching and a private network of women leaders.",
  alternates: { canonical: "/membership/" },
};

const BENEFITS = [
  {
    n: "01",
    title: "Facilitated luncheons",
    body: "Ten a year. Far more than business-card swaps — every seat at the table is designed to interact and connect, personally and professionally, and each one features a guest speaker who has genuinely done it.",
  },
  {
    n: "02",
    title: "Signature events",
    body: "A choice of more intimate events through the year, evenings and days alike. Luncheons, book signings, salon evenings — the low-pressure way to turn professional acquaintances into people you actually call.",
  },
  {
    n: "03",
    title: "Your Core group",
    body: "Ten career contemporaries, meeting monthly, with a dedicated Core guide. The most substantial thing the club offers and the reason members stay for years.",
  },
  {
    n: "04",
    title: "Committees",
    body: "Join one or more committees to build relationships while sharpening your organisational, communication and leadership skills. Open to members only.",
  },
  {
    n: "05",
    title: "Coaching & support",
    body: "Private executive coaching, mental-health support groups, counselling, book clubs, and a speaker series with people who have done what you are doing.",
  },
  {
    n: "06",
    title: "Capital access",
    body: "Access to angel investors, private lenders and grant research — with one submission to the quarterly investor summit, Pitch to OH.",
  },
];

export default function MembershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Executive membership"
        title="Investment"
        lede="Everything the club offers is funded by membership investment. It is the only tier structure we have, and the only one we intend to keep — because pricing that rewards seniority is a pricing model that excludes the people the club exists for."
      />

      {/* Who it is for ------------------------------------------------ */}
      <section className="ground-emerald on-dark">
        <Container>
          <div className="py-[clamp(4rem,9vw,7rem)]">
            <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-10">
              <div className="lg:col-span-5">
                <SectionHead
                  eyebrow="Membership criteria"
                  title="Who this club is for"
                  lede="The bar is stated plainly, because an application you will not pass is worse than a quiet no. If you meet it, we reply within three business days."
                />
                <Button href="/apply/" variant="rose" className="mt-10">
                  Start your application
                </Button>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                <ul className="border-t hair">
                  {[
                    {
                      t: "You must be C-level, a founder, or a rising VP.",
                      b: "CXO at scale, president, founder or owner, or a director with an unambiguous trajectory to the VP seat. We read the work, not the title.",
                    },
                    {
                      t: "Candidacy is judged on the substance.",
                      b: "The strength, length, influence and impact of your career, and your community impact. Tier one expects $225,000 annual gross revenue or a clear track toward a high-growth sector.",
                    },
                    {
                      t: "Members hold roles such as",
                      b: "C-suite executives • Presidents and VPs • Founders and owners • Board members • Senior leaders in professional services, technology, media, healthcare, education and industry.",
                    },
                    {
                      t: "We value diversity in every measure.",
                      b: "Background, industry and role. A room of women from the same three sectors is not a network — it is a reunion.",
                    },
                    {
                      t: "A referral helps but is not required.",
                      b: "An invitation from a serving member or a referral from a partnering corporation both carry weight. Plenty of members joined with neither.",
                    },
                  ].map((item) => (
                    <li key={item.t} className="border-b hair px-6 py-7 sm:px-8">
                      <h3 className="font-display text-[1.28rem] leading-snug tracking-[-0.01em]">
                        {item.t}
                      </h3>
                      <p className="muted mt-3 max-w-[58ch] text-[0.95rem] leading-relaxed">
                        {item.b}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* How joining works ------------------------------------------- */}
      <section className="ground-cream on-light">
        <Container>
          <div className="py-[clamp(3.5rem,7vw,6rem)]">
            <Eyebrow>How joining works</Eyebrow>
            <h2 className="display-sm mt-7 max-w-[20ch] text-balance">
              Three steps, and a person at every one.
            </h2>
            <div className="mt-14 grid gap-px border hair-faint border bg-[color-mix(in_oklab,var(--color-ink)_11%,transparent)] sm:grid-cols-3">
              {[
                [
                  "01",
                  "Submit the application",
                  "Two minutes online. A person reads every one — there is no scoring model and no committee filter before a human sees it.",
                ],
                [
                  "02",
                  "We reply personally",
                  "Within three business days, with either an invitation to the next quarterly candidacy dinner or an honest no.",
                ],
                [
                  "03",
                  "Dinner, then decision",
                  "The Quarterly Candidacy Dinner is a courtesy, not a gate. Non-attendance will not prevent membership.",
                ],
              ].map(([n, t, b]) => (
                <div key={n} className="bg-cream p-8 sm:p-9">
                  <span className="tnum eyebrow accent">{n}</span>
                  <h3 className="font-display mt-5 text-[1.3rem] leading-tight tracking-[-0.01em]">
                    {t}
                  </h3>
                  <p className="muted mt-4 text-[0.93rem] leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href="/apply/" variant="rose">
                Start your application
              </Button>
              <span className="text-[0.9rem] meta">
                Questions first?{" "}
                <a href={`mailto:${site.contact.email}`} className="link-underline">
                  {site.contact.email}
                </a>{" "}
                — someone replies personally.
              </span>
            </p>
          </div>
        </Container>
      </section>

      {/* Investment */}
      <section className="ground-ink on-dark" id="investment">
        <Container>
          <div className="grid gap-y-16 pb-[clamp(4rem,9vw,7rem)] pt-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-5">
              <Eyebrow>Executive membership</Eyebrow>
              <h2 className="display-sm mt-7">Out of state &amp; remote</h2>
              <p className="tnum mt-9 font-display text-[clamp(3.5rem,7vw,5.5rem)] leading-[0.85] tracking-[-0.035em] accent">
                $200
                <span className="ml-3 align-top font-sans text-[0.8rem] tracking-normal meta">
                  / month
                </span>
              </p>
              <p className="muted mt-7 max-w-[42ch] text-[0.97rem] leading-relaxed">
                Full access to the Salon Series, the online member directory,
                committee participation and the quarterly investor summit —
                wherever you are based.
              </p>
            </div>

            <div className="lg:col-span-6 lg:col-start-7" id="corporate">
              <Eyebrow>Corporate membership</Eyebrow>
              <h2 className="display-sm mt-7">For organisations</h2>

              <div className="mt-9 border-t border-white/20! pt-7 ">
                <DataRows
                  rows={[
                    {
                      label: "Initiation fee",
                      value: (
                        <>
                          <strong className="accent">$1,750</strong> with a
                          sponsoring member, or{" "}
                          <strong className="accent">$2,500</strong> without.
                        </>
                      ),
                    },
                    {
                      label: "Monthly investment",
                      value: (
                        <>
                          <strong className="accent">$800</strong> with a
                          sponsor, or <strong className="accent">$950</strong>{" "}
                          without.
                        </>
                      ),
                      note: "A sponsor is a serving member of the club.",
                    },
                    {
                      label: "Seats",
                      value: "Up to four executives can be added to a corporate account, each receiving the full member benefit.",
                    },
                    {
                      label: "Term",
                      value: "Membership is a twelve-month commitment.",
                    },
                  ]}
                />
              </div>

              <p className="muted mt-8 text-[0.85rem] leading-relaxed">
                Corporate accounts suit employers who want to develop and retain
                senior women, and who want those women in a network rather than
                on a retainer. Talk to us before you commit — the sponsorship
                question genuinely changes the price.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Standard terms */}
      <section className="ground-parchment on-light">
        <Container>
          <div className="py-[clamp(3.5rem,7vw,6rem)]">
            <Eyebrow>Before you invest</Eyebrow>
            <div className="mt-9 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["12 months", "Membership is a twelve-month commitment, renewed annually by mutual agreement."],
                ["$250", "A non-refundable initial fee is due with the application, credited against the first term."],
                ["$225k", "Tier one membership expects annual gross revenue of $225,000 or a clear track toward a high-growth sector."],
                ["No attendance rule", "Missing a gathering is not a problem. Disappearing is. We will call you."],
              ].map(([k, v]) => (
                <div key={k} className="border-t hair pt-6">
                  <p className="font-display text-[1.35rem] leading-tight tracking-[-0.01em] text-rose-deep">
                    {k}
                  </p>
                  <p className="muted mt-3.5 text-[0.9rem] leading-relaxed">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="ground-cream on-light">
        <Container>
          <div className="py-[clamp(4rem,9vw,7rem)]">
            <SectionHead
              eyebrow="Member benefits"
              title="What you are paying for"
              lede="The Garden's Executive Club is open to women from every industry who are C-level executives and CEOs of their careers, seeking to build a strong lifelong network. Here is what a member actually gets."
            />
            <ul className="mt-14 grid gap-px border hair-faint border bg-[color-mix(in_oklab,var(--color-ink)_11%,transparent)] sm:grid-cols-2 lg:grid-cols-3">
              {BENEFITS.map((b) => (
                <li
                  key={b.n}
                  className="group bg-cream p-8 transition-colors duration-500 hover:bg-bone sm:p-9"
                >
                  <span className="tnum eyebrow text-rose-deep">{b.n}</span>
                  <h3 className="font-display mt-5 text-[1.35rem] leading-tight tracking-[-0.01em]">
                    {b.title}
                  </h3>
                  <p className="muted mt-4 text-[0.93rem] leading-relaxed">
                    {b.body}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-12 grid gap-y-10 border-t hair pt-10 lg:grid-cols-2 lg:gap-x-16">
              <div>
                <h3 className="headline">Also included</h3>
                <ul className="prose-gec mt-5">
                  <li>Exposure for your business at the members-only resource table at every meeting.</li>
                  <li>Recognition of your professional achievements and personal milestones, on the club's site and at the annual awards gala.</li>
                  <li>Access to the online member directory, for networking and promotion.</li>
                  <li>One submission to the quarterly Pitch to OH investor summit.</li>
                  <li>Mentorship structured to let you give back as well as develop.</li>
                  <li>Special interest groups to go deeper on a specific profession or issue.</li>
                </ul>
              </div>
              <div>
                <Quote attribution="On membership">
                  These benefits begin with our ten facilitated luncheons every
                  year. Our format makes networking with new professional peers
                  as easy as lunching with close friends.
                </Quote>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ProseSection
        aside={
          <Figure
            slug="salon"
            sizes="(min-width: 1024px) 30vw, 100vw"
            ratio="4/5"
            stretch
            caption="The salon, set for a members' luncheon"
          />
        }
      >
        <h2>How to join</h2>
        <p>
          Membership is by application and by invitation. To be considered,
          applicants must be C-level, a founder, or a rising VP. Candidacy is
          evaluated on the strength, length, influence and impact of your
          career, and on community impact.
        </p>
        <p>
          We value diversity in every measure — background, industry and role.
          An application may be accompanied by a referral from a serving member
          or a partnering corporation, but it is not required.
        </p>
        <h3>What we will need from you</h3>
        <ul>
          <li>A completed application.</li>
          <li>The non-refundable $250 initial membership fee.</li>
          <li>A professional headshot.</li>
          <li>A company electronic press kit.</li>
        </ul>
        <p>
          On acceptance of your application we will also ask for a media and
          press consent of release, a card authorisation form, and a
          non-disclosure agreement. These are standard, they are mutual, and we
          will send ours too.
        </p>
        <p>
          Non-attendance at a candidacy dinner will not prevent membership.
          Dinner is a courtesy to you, not a gate.
        </p>
      </ProseSection>

      <section className="ground-cream on-light">
        <Container>
          <div className="grid gap-y-10 py-[clamp(3.5rem,7vw,6rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-5">
              <Eyebrow>Not sure which tier?</Eyebrow>
              <h2 className="display-sm mt-7 max-w-[16ch] text-balance">
                Ask. It is a conversation, not a checkout.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="muted text-[1rem] leading-relaxed">
                Most members start on the out-of-state rate and move to
                corporate later, and plenty never do. The tier should follow your
                situation, not the other way round. Write to us at{" "}
                <a
                  href={`mailto:${site.contact.email}`}
                  className="link-underline accent"
                >
                  {site.contact.email}
                </a>{" "}
                and someone will reply personally.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <LinkGrid
        eyebrow="Next"
        title="Keep going"
        items={[
          { label: "Apply", href: "/apply/", note: "Start your application" },
          { label: "Nominate", href: "/nominate/", note: "Put someone forward" },
          { label: "GEC Accelerator", href: "/accelerator/", note: "Eight investor tracks" },
          { label: "Our Members", href: "/our-members/", note: "Who is in the room" },
          { label: "Upcoming Events", href: "/events/", note: "What is confirmed" },
          { label: "Contact", href: "/contact/", note: "We read everything" },
        ]}
      />

      <ClosingCta
        title="Request an invitation"
        lede="Tell us where you are in your career and we will tell you honestly whether the club is the right room for you right now."
      />
    </>
  );
}
