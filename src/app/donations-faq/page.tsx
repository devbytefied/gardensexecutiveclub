import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { LinkGrid } from "@/components/blocks";
import { Accordion } from "@/components/Accordion";
import { Button, Container, SectionHead } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Donation FAQs",
  description:
    "Practical questions about donating to and sponsoring The Garden's Executive Club — tax treatment, restricted gifts, in-kind giving and what your gift funds.",
  alternates: { canonical: "/donations-faq/" },
};

const FAQS = [
  {
    q: "Is my donation tax-deductible?",
    a: (
      <p>
        {site.legalName} is a Georgia corporation. Whether a gift is deductible
        depends entirely on your own circumstances and on the club&apos;s
        current recognition as a charitable organisation — so please speak to a
        tax adviser about your situation. What we can tell you is that we will
        always provide you with a written receipt stating exactly what was
        given, and we will never ask you to describe a gift in a way that
        overstates its status.
      </p>
    ),
  },
  {
    q: "Can I direct my gift to a specific purpose?",
    a: (
      <p>
        Yes. Restricted gifts are welcome and we will honour them precisely. We
        will tell you in writing, before you give, what happens to a restricted
        gift if the thing you named stops existing — because sometimes it does,
        and you should know the answer at the time rather than afterwards.
      </p>
    ),
  },
  {
    q: "Can I give in kind?",
    a: (
      <p>
        Please do. Venue, catering, printing, professional services and
        coaching hours are all genuinely useful, and the club runs on more
        donated expertise than people assume. Email{" "}
        <a href={`mailto:${site.contact.email}`} className="link-underline">
          {site.contact.email}
        </a>{" "}
        and describe what you have in mind.
      </p>
    ),
  },
  {
    q: "What does my gift actually pay for?",
    a: (
      <p>
        The three largest uses are subsidised coaching places, the candidacy
        dinners that prospective members attend before committing to anything,
        and the club&apos;s published research. The allocation is published on
        the{" "}
        <a href="/donations/" className="link-underline">
          donations page
        </a>
        . Ask us about any specific gift and we will tell you what it paid for.
      </p>
    ),
  },
  {
    q: "Do I have to take a tier?",
    a: (
      <p>
        No. The supporter tiers are a description of what we offer in return,
        not a payment schedule, and giving more does not buy a larger say. A
        donation buys acknowledgement, never influence over who is admitted or
        what we publish.
      </p>
    ),
  },
  {
    q: "Can my company sponsor the club?",
    a: (
      <p>
        Yes, and we would be glad to talk. Sponsorship buys acknowledgement and
        access to the membership — not editorial influence. Our published
        research exists because we are willing to publish things companies do
        not want published, and that only means something if it stays true.
        See{" "}
        <a href="/donations/" className="link-underline">
          our position on sponsorship
        </a>
        .
      </p>
    ),
  },
  {
    q: "Can I give anonymously?",
    a: (
      <p>
        Yes, and we will not push. Anonymous supporters are listed as such on
        the annual supporters page unless you ask us to remove your name
        entirely.
      </p>
    ),
  },
  {
    q: "I need a subsidised membership place. How do I ask?",
    a: (
      <p>
        Write to{" "}
        <a href={`mailto:${site.contact.email}`} className="link-underline">
          {site.contact.email}
        </a>{" "}
        and say so. You do not need a story, and you do not need to justify it.
        A subsidised place is a private arrangement between the club and you, it
        is not announced, and it is not announced to the other members either.
      </p>
    ),
  },
  {
    q: "How do I give?",
    a: (
      <p>
        Email us and we will send a secure payment link for the amount and tier
        you have in mind. We never take card details through a web form — the old
        site did, and it is one of the reasons the application process was
        harder than it needed to be.
      </p>
    ),
  },
];

export default function DonationsFaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Donation FAQs"
        title="Practical questions"
        lede="The questions people actually ask before they give, answered without hedging."
      />

      <section className="ground-ink on-dark">
        <Container>
          <div className="grid gap-y-14 pb-[clamp(4rem,9vw,7rem)] pt-[clamp(3.5rem,7vw,6rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <SectionHead
                eyebrow="Before you give"
                title="Nine questions"
                lede="If yours is not here, ask it directly. We would rather answer a hard question than have you not ask it."
                action={
                  <Button href="/contact/" variant="text">
                    Ask us anything
                  </Button>
                }
              />
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Accordion items={FAQS} />
            </div>
          </div>
        </Container>
      </section>

      <section className="ground-cream on-light">
        <Container>
          <div className="flex flex-col gap-8 py-[clamp(3.5rem,7vw,6rem)] lg:flex-row lg:items-center lg:justify-between">
            <p className="font-display max-w-[40ch] text-[clamp(1.5rem,2.8vw,2.1rem)] leading-[1.2] text-balance">
              Still unsure? Write to us. We would rather have the conversation
              than the gift.
            </p>
            <Button href="/contact/" variant="rose">
              Get in touch
            </Button>
          </div>
        </Container>
      </section>

      <LinkGrid
        eyebrow="Next"
        title="Keep going"
        items={[
          { label: "Donations", href: "/donations/", note: "What your gift pays for" },
          { label: "Work With Us", href: "/work-with-us/", note: "Partnerships and in-kind" },
          { label: "Executive Membership", href: "/membership/", note: "Tiers and investment" },
          { label: "Annual Review", href: "/annual-review/", note: "What the year produced" },
          { label: "About Us", href: "/about/", note: "Mission and purpose" },
          { label: "Contact", href: "/contact/", note: "We read everything" },
        ]}
      />
    </>
  );
}
