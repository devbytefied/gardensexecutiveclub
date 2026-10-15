import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { DataRows, LinkGrid, ProseSection } from "@/components/blocks";
import { Button, Container, Eyebrow, SectionHead } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Donations",
  description:
    "Sponsorship and donations to The Garden's Executive Club. Fund subsidised coaching places, subsidised membership for women who could not otherwise afford it, and the club's published research.",
  alternates: { canonical: "/donations/" },
};

const TIERS = [
  {
    label: "Supporter",
    value:
      "Named on our annual supporters page, acknowledged in the annual review, and told exactly what your gift paid for.",
  },
  {
    label: "Patron",
    value:
      "Everything a Supporter receives, plus two facilitated luncheons a year and a place at the Annual Dinner.",
  },
  {
    label: "Founding Patron",
    value:
      "A named position in the club's history. Acknowledged in the annual review, at the Annual Dinner, and on the supporters page for as long as the club exists.",
    note: "Limited availability.",
  },
  {
    label: "In-kind",
    value:
      "Venue, catering, printing, professional services or coaching hours. We are genuinely interested — the club runs on donated expertise as much as on money.",
  },
];

const FUNDING = [
  {
    label: "Coaching places",
    value:
      "The single largest thing donations fund. A subsidised place lets a member see a professional coach, which most of our members could not otherwise afford to do twice a year.",
  },
  {
    label: "Candidacy dinners",
    value:
      "Prospective members come to a quarterly dinner and decide whether the club is for them. We pay for the room, the food and the travel for anyone who needs it.",
  },
  {
    label: "The clubhouse",
    value:
      "A permanent home in downtown Stone Mountain. Building work, maintenance and the unglamorous work of keeping a building that people want to be in.",
  },
  {
    label: "Published research",
    value:
      "The five work threads are produced and kept current. Free to read, and independent of any donor's interests.",
  },
];

export default function DonationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Donations"
        title="What your money actually pays for"
        lede="Membership investment pays for the club. Donations pay for the parts of it that a membership fee cannot — and that a membership fee should never have to pay for."
        aside={
          <div>
            <Eyebrow>How to give</Eyebrow>
            <p className="mt-6 text-[0.95rem] leading-relaxed">
              Write to{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="link-underline accent"
              >
                {site.contact.email}
              </a>{" "}
              with the subject line &ldquo;Donation&rdquo; and we will send a
              secure payment link and confirm the tier you would like.
            </p>
            <p className="muted mt-5 text-[0.88rem] leading-relaxed">
              We never take card details through a web form. If you would rather
              speak to someone first, call {site.contact.phoneDisplay}.
            </p>
          </div>
        }
      />

      <section className="ground-emerald on-dark">
        <Container>
          <div className="py-[clamp(4rem,9vw,7rem)]">
            <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
              <div className="lg:col-span-5">
                <Eyebrow>Why donations exist</Eyebrow>
                <h2 className="display-sm mt-7 max-w-[16ch] text-balance">
                  The club charges for membership. It should not charge for
                  access.
                </h2>
              </div>
              <div className="prose-gec lg:col-span-6 lg:col-start-7">
                <p>
                  A private club that only serves women who can afford it is a
                  very different organisation from the one described in our
                  mission. The pay gap is the reason our members exist; it would
                  be absurd to respond to it by making the club itself
                  pay-to-enter.
                </p>
                <p>
                  So the model is deliberate. Membership investment covers the
                  club — the rooms, the food, the facilitation, the calendar. A
                  portion of what we raise from members is set aside to fund
                  subsidised places for women who could not otherwise afford them.
                </p>
                <p>
                  Donations also fund the parts of the club that serve people who
                  are not members at all: the candidacy dinners that prospective
                  members attend before they commit to anything, and the research,
                  which is free to read and independent of any donor.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="ground-cream on-light">
        <Container>
          <div className="grid gap-y-14 py-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <SectionHead
                eyebrow="Giving"
                title="Four ways to support the club"
                lede="Give what you can, in whatever form is useful. We would rather have an honest conversation than a large anonymous cheque."
              />
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <DataRows
                className="border-t pt-7 hair"
                rows={TIERS.map((t) => ({ label: t.label, value: t.value, note: t.note }))}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="ground-parchment on-light">
        <Container>
          <div className="grid gap-y-14 py-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <SectionHead
                eyebrow="Allocation"
                title="Where it goes"
                lede="Published, so you can hold us to it."
              />
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <DataRows
                className="border-t pt-7 hair"
                rows={FUNDING.map((f) => ({ label: f.label, value: f.value }))}
              />
            </div>
          </div>
        </Container>
      </section>

      <ProseSection
        aside={
          <div>
            <div className="border-t hair pt-8">
              <Eyebrow>Questions first</Eyebrow>
              <p className="muted mt-6 text-[0.93rem] leading-relaxed">
                Most people want to know what a gift actually does before they
                give one. Ask us and we will tell you the specific thing it paid
                for.
              </p>
              <Button href="/donations-faq/" variant="rose" className="mt-8">
                Read the FAQs
              </Button>
            </div>
          </div>
        }
      >
        <h2>Our position on sponsorship</h2>
        <p>
          Corporate sponsorship is welcome, with one condition: it buys
          acknowledgement and access, never editorial influence. Our published
          research exists because the club is willing to publish things
          companies do not want published. That only means something if it is
          true, and it stops being true the moment a sponsor objects.
        </p>
        <p>
          Sponsors may attend, may meet members, and may be named. Sponsors may
          not review, approve, delay or withdraw anything we publish.
        </p>
        <h3>What we will not do with a donation</h3>
        <ul>
          <li>Buy a member a seat she did not earn on merit.</li>
          <li>Pay a membership investment on someone's behalf without saying so.</li>
          <li>Influence who is admitted to the club.</li>
          <li>Supersede published research, ever.</li>
        </ul>
        <h3>On receiving help</h3>
        <p>
          A subsidised place is a private arrangement between the club and the
          member receiving it, and it is not announced. We do not display who
          was funded. If you are offered a subsidised place, you do not owe the
          club anything beyond turning up.
        </p>
      </ProseSection>

      <LinkGrid
        eyebrow="Next"
        title="Keep going"
        items={[
          { label: "Donation FAQs", href: "/donations-faq/", note: "Practical questions" },
          { label: "Work With Us", href: "/work-with-us/", note: "Partnerships and in-kind" },
          { label: "Annual Review", href: "/annual-review/", note: "What the year produced" },
          { label: "Executive Membership", href: "/membership/", note: "Tiers and investment" },
          { label: "Our Work", href: "/work/", note: "The five research threads" },
          { label: "Contact", href: "/contact/", note: "We read everything" },
        ]}
      />

      <div className="ground-cream on-light">
        <Container>
          <div className="flex flex-col gap-8 py-[clamp(3.5rem,7vw,6rem)] lg:flex-row lg:items-center lg:justify-between">
            <p className="font-display max-w-[24ch] text-[clamp(1.5rem,2.8vw,2.1rem)] leading-[1.2] text-balance">
              Give, and we will tell you exactly what it bought.
            </p>
            <Button href="/contact/" variant="rose">
              Start the conversation
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}
