import type { Metadata } from "next";
import { ClosingCta } from "@/components/ClosingCta";
import { PageHeader } from "@/components/PageHeader";
import { Aside } from "@/components/blocks";
import { GECForm, type Field } from "@/components/GECForm";
import { Container, Eyebrow, Quote, SectionHead } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply for executive membership of The Garden's Executive Club. C-level executives, founders and rising VPs are considered year-round.",
  alternates: { canonical: "/apply/" },
};

const FIELDS: Field[] = [
  { name: "first_name", label: "First name", type: "text", required: true, autoComplete: "given-name", span: 1 },
  { name: "last_name", label: "Last name", type: "text", required: true, autoComplete: "family-name", span: 1 },
  { name: "email", label: "Email address", type: "email", required: true, autoComplete: "email", span: 1 },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", span: 1 },
  { name: "company", label: "Company name", type: "text", required: true, autoComplete: "organization", span: 1 },
  { name: "title", label: "Your title", type: "text", required: true, span: 1 },
  { name: "location", label: "Which location is this application for?", type: "select", required: true, options: [
    { value: "atlanta", label: "Atlanta — Stone Mountain, Georgia" },
    { value: "greenville", label: "North Carolina — Greenville" },
    { value: "out-of-state", label: "Out of state / remote" },
  ] },
  { name: "level", label: "Your current level", type: "select", required: true, options: [
    { value: "c-suite", label: "C-level (CEO, President, COO, CFO, CMO)" },
    { value: "founder", label: "Founder / owner" },
    { value: "evp", label: "EVP" },
    { value: "vp", label: "VP" },
    { value: "rising", label: "Director, tracking toward VP" },
  ] },
  { name: "industry", label: "Industry", type: "text", required: true, span: 1 },
  { name: "revenue", label: "Annual gross revenue", type: "select", required: true, options: [
    { value: "under-100k", label: "Under $100k" },
    { value: "100k-225k", label: "$100k – $225k" },
    { value: "225k-1m", label: "$225k – $1m" },
    { value: "1m-10m", label: "$1m – $10m" },
    { value: "10m-plus", label: "Over $10m" },
    { value: "pre-revenue", label: "Pre-revenue / scaling" },
  ] },
  {
    name: "coaching",
    label: "Interested in coaching aspiring female executives?",
    type: "checkbox",
    help: "Optional. We run a mentorship track alongside membership.",
    span: 2,
  },
  {
    name: "message",
    label: "Anything we should know?",
    type: "textarea",
    rows: 6,
    placeholder:
      "What you are building, what you are trying to get better at, and who referred you if anyone did.",
    span: 2,
  },
];

export default function ApplyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Apply"
        title="Join the club"
        lede="Tell us where you are and where you are going. We read every application personally — there is no algorithm and no scoring model."
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href="#application"
            className="eyebrow inline-flex items-center gap-3 bg-rose-deep px-8 py-4 text-cream transition-colors duration-500 hover:bg-rose"
          >
            Start application
          </a>
          <a
            href="/membership/"
            className="eyebrow link-underline !tracking-[0.16em] muted hover:text-rose-deep"
          >
            See tiers &amp; investment
          </a>
        </div>
      </PageHeader>

      {/* Process */}
      <section className="ground-emerald on-dark">
        <Container>
          <div className="py-[clamp(3rem,6vw,5rem)]">
            <Eyebrow>Application process</Eyebrow>
            <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-3">
              {[
                ["01", "Submit", "Complete the form below. Two minutes, and only the fields marked with an asterisk are required."],
                ["02", "Review & reply", "A person reads it and replies personally within three business days — an invitation to the next candidacy dinner, or an honest no."],
                ["03", "Consultation", "The candidacy dinner is where the remaining questions get answered. It is a courtesy, never a gate."],
              ].map(([n, t, b]) => (
                <div key={n} className="hair-strong border-t pt-7">
                  <p className="tnum eyebrow accent">{n}</p>
                  <p className="font-display mt-4 text-[1.35rem] leading-tight">{t}</p>
                  <p className="muted mt-3 text-[0.9rem] leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Criteria */}
      <section className="ground-parchment on-light">
        <Container>
          <div className="grid gap-y-12 py-[clamp(3.5rem,7vw,6rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <SectionHead
                eyebrow="Before you apply"
                title="Who we can accept"
                lede="Membership is limited, and the limit is the point. Here is the bar, stated plainly."
              />
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="border-t hair">
                {[
                  {
                    t: "You must be C-level, a founder, or a rising VP.",
                    b: "We also consider directors with an unambiguous trajectory. If you are two years from the VP seat and doing the work, say so and tell us why.",
                  },
                  {
                    t: "Candidacy is judged on the substance.",
                    b: "Strength, length, influence and impact of your career, and your community impact. Not your title, not your funding, not your postcode.",
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
                    <h3 className="font-display text-[1.3rem] leading-snug tracking-[-0.01em]">
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
        </Container>
      </section>

      {/* The letter */}
      <section className="ground-emerald on-dark">
        <Container>
          <div className="grid gap-y-12 py-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-3">
              <Eyebrow>Quarterly candidacy dinners</Eyebrow>
              <p className="muted mt-6 max-w-[26ch] text-sm leading-relaxed">
                Hosted by the advisory board and its Chief Executive Officer,{" "}
                {site.founderShort}.
              </p>
            </div>

            <div className="lg:col-span-8 lg:col-start-5">
              {/* Preserved verbatim from the founder's letter of candidacy */}
              <div className="border hair-strong border p-8 sm:p-12">
                <Eyebrow>To: The Garden's Executive Club Membership</Eyebrow>
                <p className="eyebrow mt-2 meta">
                  Subject: Quarterly Candidacy Dinners
                </p>

                <div className="prose-gec mt-10 !text-[1rem]">
                  <p>
                    Dear Garden&apos;s Executive Club Candidate —
                  </p>
                  <p>
                    As President and Chief Executive Officer, I am honoured to
                    extend this official call of candidacy for attending our
                    Quarterly Membership Inquiry Dinner. Come together for a time
                    of vision and mission enlightenment, sponsorship
                    opportunities, business collaboration, acknowledgement of
                    accomplishments, and great fellowship — while witnessing
                    other potential GEC members experiencing the fine dining and
                    networking opportunities of Garden&apos;s Executives from
                    every high-income industry.
                  </p>
                  <p>
                    The Garden&apos;s Executive Club is a private women&apos;s
                    club for C-suite level executives, presidents, vice presidents
                    and CEOs, and it has plans for global domination. You will
                    also be able to witness the virtual induction of national
                    members from across the United States.
                  </p>
                  <p>
                    The Garden&apos;s Executive Club, Inc., founded by Ebony
                    Ormond-Ham, has planted its first power seed in the vintage
                    tourism attractions of downtown Stone Mountain; within a
                    two-mile radius of Stone Mountain Park&apos;s West Gate
                    entrance. A two-storey, 6,000-square-foot, two-acre tribute to
                    female executives.
                  </p>
                  <p>
                    Our Quarterly Membership Dinners are hosted by the
                    Garden&apos;s Executive Advisory Board and its Chief
                    Executive Officer, Ebony Ormond-Ham. A completed application, a
                    $250 initial membership fee (non-refundable), a professional
                    photo ID (headshot), and a company electronic press kit will
                    be required for consideration of membership. Upon acceptance
                    of application, a media and press consent of release, credit
                    card authorisation form, and a non-disclosure will be a
                    forthcoming requirement.
                  </p>
                  <p>
                    Non-attendance of our candidacy dinners will not prevent GEC
                    membership.
                  </p>
                  <p className="font-display !text-[1.2rem]">— Ebony OH</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Form */}
      <section className="ground-cream on-light" id="application">
        <Container>
          <div className="grid gap-y-14 py-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-7">
              <Eyebrow>The application</Eyebrow>
              <h2 className="display-sm mt-7 max-w-[18ch] text-balance">
                Complete and submit the form
              </h2>
              <p className="lede measure mt-7">
                Fields marked with an asterisk are required. Everything else is
                useful but not mandatory — a shorter honest application beats a
                polished one.
              </p>

              <div className="mt-12">
                <GECForm
                  tone="light"
                  fields={FIELDS}
                  submitLabel="Submit application"
                  subject="Executive Membership Application — The Garden's Executive Club"
                  consent={
                    <>
                      The information collected allows us to evaluate your
                      candidacy for The Garden&apos;s Executive Club membership.
                      You may unsubscribe at any time. For more information, see
                      our{" "}
                      <a href="/privacy/" className="link-underline">
                        Privacy Policy
                      </a>
                      . The $250 initial membership fee is invoiced separately
                      once your application has been reviewed — we never ask for
                      card details through this form.
                    </>
                  }
                  successTitle="Your application has landed"
                  successBody="Thank you. Someone from the club will reply personally within three business days. If your application is accepted, we will send a payment link for the initial fee along with the media, press and non-disclosure documents."
                />
              </div>
            </div>

            <Aside eyebrow="What happens next">
              <ol className="border-t hair">
                {[
                  ["01", "We read it", "A person reads every application. There is no scoring model and no committee filter before a human sees it."],
                  ["02", "We reply", "Within three business days, personally, with either an invitation to the next quarterly candidacy dinner or an honest no."],
                  ["03", "You decide", "Dinner is a courtesy, not a gate. If we are not the right room for you, we will say so."],
                  ["04", "Paperwork", "On acceptance: the $250 initial fee via a secure payment link, a headshot, and your company electronic press kit."],
                ].map(([n, t, b]) => (
                  <li key={n} className="border-b hair px-5 py-6">
                    <p className="tnum eyebrow accent">{n}</p>
                    <p className="font-display mt-3 text-[1.15rem] leading-snug">{t}</p>
                    <p className="muted mt-2.5 text-[0.88rem] leading-relaxed">{b}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-10 border-t hair pt-8">
                <Quote attribution="In confidence">
                  We would rather tell you no quickly than waste your year.
                </Quote>
              </div>
            </Aside>
          </div>
        </Container>
      </section>

      <ClosingCta
        title="Know someone who belongs here?"
        lede="Half our members arrived because another member put their name forward. Nominations are open year-round."
        primary={{ label: "Nominate someone", href: "/nominate/" }}
        secondary={{ label: "Read the criteria", href: "/about/" }}
      />
    </>
  );
}
