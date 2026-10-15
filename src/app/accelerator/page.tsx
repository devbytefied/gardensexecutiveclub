import type { Metadata } from "next";
import { ClosingCta } from "@/components/ClosingCta";
import { PageHeader } from "@/components/PageHeader";
import { LinkGrid, ProseSection } from "@/components/blocks";
import { Button, Container, Eyebrow, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "GEC Accelerator",
  description:
    "The GEC Accelerator — eight investor-facing tracks plus a mentorship and accountability track, for members ready to build rather than network.",
  alternates: { canonical: "/accelerator/" },
};

const TRACKS = [
  {
    n: "GEC-1",
    title: "Entrepreneurial & Technical Training",
    body: "For operators building the thing themselves. Product and service design, defensibility, and the technical literacy a CEO is usually assumed to have.",
  },
  {
    n: "GEC-2",
    title: "Product Design & Engineering",
    body: "How good products get made, how engineering and commercial reality collide, and how to hold a product vision through both.",
  },
  {
    n: "GEC-3",
    title: "Industry Networking & Marketing",
    body: "Positioning, narrative and the unglamorous work of building an industry presence rather than an audience.",
  },
  {
    n: "GEC-4",
    title: "Public Equity Solutions",
    body: "Preparing for, and surviving, public scrutiny. Disclosure, governance, and what changes about your job on the day you list.",
  },
  {
    n: "GEC-5",
    title: "Executive Scaling",
    body: "The jump from leading a team to leading an organisation. Delegation that is not abdication, and building a bench.",
  },
  {
    n: "GEC-6",
    title: "Professional Community Resources",
    body: "Association leadership, board seats outside your own company, and the civic work that builds a career rather than consuming one.",
  },
  {
    n: "GEC-7",
    title: "Capital Partners",
    body: "Access to angel investors, private lenders and grant providers — and the discipline of preparing a real data room.",
  },
  {
    n: "GEC-8",
    title: "Accessing Seed Capital",
    body: "Seed rounds specifically: what is actually being raised at this stage, from whom, and on what terms.",
  },
];

export default function AcceleratorPage() {
  return (
    <>
      <PageHeader
        eyebrow="GEC Accelerator"
        title="Eight tracks for members who are building"
        lede="The Accelerator is not a networking programme with a business-flavoured name. Each track is a structured engagement with a specific problem, run by practitioners, and open only to members."
        aside={
          <div>
            <Eyebrow>Interest form</Eyebrow>
            <p className="muted mt-6 max-w-[30ch] text-[0.93rem] leading-relaxed">
              Accelerator cohorts open to new members periodically. Register your
              interest and we will keep you informed about timing for the next
              cohort.
            </p>
            <Button href="/contact/" variant="rose" className="mt-8">
              Register your interest
            </Button>
          </div>
        }
      />

      {/* Tracks */}
      <section className="ground-cream on-light">
        <Container>
          <div className="py-[clamp(3.5rem,7vw,6rem)]">
            <SectionHead
              eyebrow="The tracks"
              title="Choose the problem, not the track"
              lede="Most members take two or three across the year. The bonus track is not optional."
            />
            <ul className="mt-14 grid gap-px border hair-faint border bg-[color-mix(in_oklab,var(--color-ink)_11%,transparent)] sm:grid-cols-2 lg:grid-cols-4">
              {TRACKS.map((t) => (
                <li
                  key={t.n}
                  className="group bg-cream p-8 transition-colors duration-500 hover:bg-bone sm:p-9"
                >
                  <span className="tnum eyebrow text-rose-deep">{t.n}</span>
                  <h3 className="font-display mt-5 text-[1.2rem] leading-tight tracking-[-0.01em]">
                    {t.title}
                  </h3>
                  <p className="muted mt-4 text-[0.9rem] leading-relaxed">
                    {t.body}
                  </p>
                </li>
              ))}
              <li className="bg-parchment p-8 sm:p-9">
                <span className="eyebrow text-ink">Bonus</span>
                <h3 className="font-display mt-5 text-[1.2rem] leading-tight tracking-[-0.01em]">
                  Mentorship &amp; Accountability
                </h3>
                <p className="muted mt-4 text-[0.9rem] leading-relaxed">
                  The track everyone takes and nobody advertises. A member who
                  commits to a number is paired with a member who will ask about
                  it every month until it moves.
                </p>
              </li>
              {Array.from({ length: 3 }).map((_, i) => (
                <li key={`filler-${i}`} aria-hidden className="hidden bg-cream lg:block" />
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Pitch to OH */}
      <section className="ground-emerald on-dark">
        <Container>
          <div className="grid gap-y-12 py-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-5">
              <Eyebrow>Pitch to OH</Eyebrow>
              <h2 className="display-sm mt-7 max-w-[16ch] text-balance">
                The quarterly investor summit
              </h2>
              <p className="muted mt-7 max-w-[42ch] text-[0.97rem] leading-relaxed">
                One submission from every member, per quarter, to the Pitch to OH
                investor summit. Angel investors, private lenders and grant
                providers sit in the room. This is the single most concrete thing
                the club does.
              </p>
              <Button href="/contact/" variant="rose" className="mt-9">
                Ask about a submission
              </Button>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <ol className="border-t hair">
                {[
                  ["01", "Prepare", "A one-page summary and a real data room. We will review it with you before it goes anywhere."],
                  ["02", "Submit", "One submission per member per quarter, to the summit rather than to a contact."],
                  ["03", "Present", "A short, structured pitch to the room. No pitches over five minutes."],
                  ["04", "Follow through", "The part most programmes skip. We make sure somebody picks up the phone afterwards."],
                ].map(([n, t, b]) => (
                  <li key={n} className="border-b hair px-6 py-7 sm:px-8">
                    <div className="flex items-baseline gap-6">
                      <span className="tnum eyebrow shrink-0 accent">{n}</span>
                      <h3 className="font-display text-[1.3rem] leading-snug">{t}</h3>
                    </div>
                    <p className="muted mt-3 max-w-[52ch] text-[0.93rem] leading-relaxed sm:pl-14">
                      {b}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <ProseSection
        aside={
          <div>
            <div className="border-t hair pt-8">
              <Eyebrow>Who it is for</Eyebrow>
              <p className="muted mt-6 text-[0.93rem] leading-relaxed">
                Members who are building — a company, a practice, a platform,
                or a second act. The Accelerator is not for members who want
                introductions, and we will point you at a better fit if that is
                what you are after.
              </p>
            </div>
          </div>
        }
      >
        <h2>How a cohort runs</h2>
        <p>
          Cohorts open periodically and run for a fixed term, typically a
          quarter. Each track meets on its own cadence, with a practitioner
          leading rather than a curriculum.
        </p>
        <h3>What we ask of you</h3>
        <ul>
          <li>Show up. A track you do not attend is a track that did not happen.</li>
          <li>Bring a real problem, not a hypothetical one.</li>
          <li>Do the work between sessions. This is the part that decides the outcome.</li>
          <li>Share what worked, including when the answer was no.</li>
        </ul>
        <h3>What you get</h3>
        <ul>
          <li>Structured engagement with a specific, named problem.</li>
          <li>A track lead who has actually operated at the level you want to reach.</li>
          <li>Access to the quarterly investor summit.</li>
          <li>Mentorship and accountability through the bonus track.</li>
        </ul>
      </ProseSection>

      <LinkGrid
        eyebrow="Next"
        title="Keep going"
        items={[
          { label: "Executive Membership", href: "/membership/", note: "What membership includes" },
          { label: "Work With Us", href: "/work-with-us/", note: "Open roles and partnerships" },
          { label: "Upcoming Events", href: "/events/", note: "What is confirmed" },
          { label: "Donations", href: "/donations/", note: "Sponsorship and giving" },
          { label: "Our Work", href: "/work/", note: "The five research threads" },
          { label: "Contact", href: "/contact/", note: "We read everything" },
        ]}
      />

      <ClosingCta
        title="Register your interest"
        lede="Accelerator membership interest opens to current and prospective members. Tell us which track you would start with."
        primary={{ label: "Register your interest", href: "/contact/" }}
        secondary={{ label: "Apply for membership", href: "/apply/" }}
      />
    </>
  );
}
