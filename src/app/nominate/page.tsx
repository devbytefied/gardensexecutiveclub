import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Aside } from "@/components/blocks";
import { GECForm, type Field } from "@/components/GECForm";
import { Container, Eyebrow, SectionHead } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nominate",
  description:
    "Nominate a woman for membership or for a board seat at The Garden's Executive Club. Nominations are reviewed quarterly.",
  alternates: { canonical: "/nominate/" },
};

const FIELDS: Field[] = [
  { name: "first_name", label: "Your first name", type: "text", required: true, autoComplete: "given-name" },
  { name: "last_name", label: "Your last name", type: "text", required: true, autoComplete: "family-name" },
  { name: "email", label: "Your email", type: "email", required: true, autoComplete: "email" },
  { name: "nominator_role", label: "Are you a member or guide of the club?", type: "select", required: true, options: [
    { value: "member", label: "Yes — a serving member" },
    { value: "guide", label: "Yes — a Core group guide" },
    { value: "no", label: "No" },
  ] },
  { name: "location", label: "Which location is this nomination for?", type: "select", required: true, options: [
    { value: "atlanta", label: "Atlanta — Stone Mountain, Georgia" },
    { value: "greenville", label: "North Carolina — Greenville" },
  ] },
  { name: "nominee_first", label: "Nominee's first name", type: "text", required: true },
  { name: "nominee_last", label: "Nominee's last name", type: "text", required: true },
  { name: "nominee_title", label: "Nominee's title", type: "text", required: true },
  { name: "nominee_company", label: "Nominee's company", type: "text", required: true },
  { name: "nominee_email", label: "Nominee's email", type: "email", required: true },
  { name: "relationship", label: "Your relationship to the nominee", type: "text", required: true, placeholder: "Colleague, client, mentor, friend…" },
  {
    name: "board_seat",
    label: "Is this nomination for a board seat?",
    type: "checkbox",
    help: "Open seats are listed on the board page. If you are unsure, leave this unticked.",
    span: 2,
  },
  {
    name: "reference",
    label: "Reference",
    type: "textarea",
    rows: 6,
    required: true,
    placeholder: "Why this person, and why now? Specific beats flattering — tell us what she has actually done.",
    span: 2,
  },
  {
    name: "attribute",
    label: "Check the box if you'd like us to reference you as the nominator when we reach out",
    type: "checkbox",
    span: 2,
  },
];

export default function NominatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Nominate"
        title="Nominations for executive membership"
        lede="To build a group of the most elite and powerful women, we want to be sure we are considering the most impactful, innovative, diverse and wide-reaching candidates in our community. If you know a woman who meets or exceeds our criteria — and who would benefit from this community — we welcome your nomination."
      />

      <section className="ground-parchment on-light">
        <Container>
          <div className="grid gap-y-12 py-[clamp(3.5rem,7vw,6rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <SectionHead
                eyebrow="The standard"
                title="Who gets considered"
                lede="We do not accept nominations on reputation alone. The reference is where the nomination lives or dies."
              />
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="border-t hair">
                {[
                  {
                    t: "C-level, CEO, or rising VP",
                    b: "Nominees must hold a C-level position, be a CEO, or be a rising VP. These roles carry significant leadership responsibility and real decision-making power, and the membership is built for people who are using it.",
                  },
                  {
                    t: "Judged on substance",
                    b: "Candidacy is evaluated on the strength, length, influence and impact of the nominee's career, and on their community impact.",
                  },
                  {
                    t: "Diversity in every measure",
                    b: "Background, industry and role. We are actively looking past the obvious names.",
                  },
                  {
                    t: "You do not need to know them well",
                    b: "A nomination is a signal that someone should be looked at properly — not a vouch. Tell us honestly how well you know them.",
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

      <section className="ground-ink on-dark">
        <Container>
          <div className="grid gap-y-14 py-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-7">
              <Eyebrow>Nomination application</Eyebrow>
              <h2 className="display-sm mt-7 max-w-[18ch] text-balance">
                Submit a nomination
              </h2>
              <p className="lede measure mt-7">
                Nominations are reviewed quarterly by the Membership Committee.
                We will only contact the nominee with your reference if we would
                like to proceed.
              </p>

              <div className="mt-12">
                <GECForm
                  fields={FIELDS}
                  submitLabel="Submit nomination"
                  subject="Membership Nomination — The Garden's Executive Club"
                  consent={
                    <>
                      We use these details to assess the nomination only. We do
                      not share them outside the club, and we will not contact
                      your nominee unless we intend to proceed. See our{" "}
                      <a href="/privacy/" className="link-underline">
                        Privacy Policy
                      </a>
                      .
                    </>
                  }
                  successTitle="Nomination received"
                  successBody="Thank you. The Membership Committee reviews nominations quarterly, and we will be in touch if we would like to take your nomination further. If we do not proceed, we will not say why — but the reference you wrote will be kept on file for future rounds."
                />
              </div>
            </div>

            <Aside eyebrow="Good to know">
              <div className="border-t hair">
                {[
                  ["Review cycle", "Nominations are read quarterly, alongside the candidacy dinners."],
                  ["Board seats", "Open board and committee seats are listed on the Our Board page."],
                  ["Confidentiality", "We never contact a nominee without your reference in hand."],
                  ["Out of state", "This form covers Stone Mountain and Greenville. Out-of-state members apply directly."],
                ].map(([k, v]) => (
                  <div key={k} className="border-b hair px-5 py-5">
                    <p className="eyebrow !text-[0.55rem] meta">{k}</p>
                    <p className="mt-2 text-[0.92rem] leading-relaxed">{v}</p>
                  </div>
                ))}
              </div>

              <p className="muted mt-9 text-[0.88rem] leading-relaxed">
                Questions first? Email{" "}
                <a
                  href={`mailto:${site.contact.email}`}
                  className="link-underline accent"
                >
                  {site.contact.email}
                </a>{" "}
                and we will help you with the reference before you write it.
              </p>
            </Aside>
          </div>
        </Container>
      </section>
    </>
  );
}
