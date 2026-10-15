import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { LinkGrid } from "@/components/blocks";
import { GECForm, type Field } from "@/components/GECForm";
import { Container, Eyebrow, SectionHead } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact The Garden's Executive Club in Stone Mountain, Georgia. Membership enquiries, sponsorship, partnerships, media and general questions.",
  alternates: { canonical: "/contact/" },
};

const PURPOSES = [
  { value: "membership", label: "Membership inquiry" },
  { value: "application", label: "About my application" },
  { value: "nomination", label: "A nomination" },
  { value: "event", label: "An event or invitation" },
  { value: "sponsorship", label: "Sponsorship or donation" },
  { value: "partnership", label: "Partnership or work with us" },
  { value: "media", label: "Media or press" },
  { value: "general", label: "General question" },
];

const HOW_TO_HEAR = [
  { value: "member", label: "A member of the club" },
  { value: "friend", label: "A friend or colleague" },
  { value: "event", label: "I attended an event" },
  { value: "online", label: "Found the site" },
  { value: "press", label: "Read or heard about the club" },
  { value: "other", label: "Somewhere else" },
];

const FIELDS: Field[] = [
  { name: "purpose", label: "Purpose of your message", type: "select", required: true, options: PURPOSES, span: 2 },
  { name: "first_name", label: "First name", type: "text", required: true, autoComplete: "given-name" },
  { name: "last_name", label: "Last name", type: "text", required: true, autoComplete: "family-name" },
  { name: "email", label: "Email address", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { name: "preferred_contact", label: "Preferred contact", type: "select", required: true, options: [
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
  ] },
  { name: "heard", label: "How did you hear about us?", type: "select", required: true, options: HOW_TO_HEAR, span: 2 },
  {
    name: "message",
    label: "Your message",
    type: "textarea",
    rows: 7,
    required: true,
    placeholder: "Tell us what you need. If it is a membership question, tell us your role and sector — it saves a round trip.",
    span: 2,
  },
];

const DETAILS = [
  ["Email", site.contact.email, `mailto:${site.contact.email}`],
  ["Phone", site.contact.phoneDisplay, site.contact.phoneHref],
  ["Clubhouse", `${site.address.line1}, ${site.address.line2}`, null],
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to the club"
        lede="A person reads every message. We answer membership questions, sponsorship enquiries, media requests and difficult emails — in that order of frequency, and with the same seriousness."
      />

      {/* Direct details */}
      <section className="ground-emerald on-dark">
        <Container>
          <dl className="grid gap-x-10 gap-y-9 py-[clamp(3rem,6vw,5rem)] sm:grid-cols-3">
            {DETAILS.map(([label, value, href]) => (
              <div key={label} className="border-t hair pt-6">
                <dt className="eyebrow !text-[0.55rem] meta">{label}</dt>
                <dd className="mt-3 text-[1.02rem] leading-snug">
                  {href ? (
                    <a href={href} className="link-underline">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="ground-cream on-light">
        <Container>
          <div className="grid gap-y-14 py-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-7">
              <Eyebrow>Send a message</Eyebrow>
              <h2 className="display-sm mt-7 max-w-[18ch] text-balance">
                We would rather have your message than your silence
              </h2>
              <p className="lede measure mt-7">
                Most questions are answered within two business days. Nothing on
                this form is auto-replied, and nothing is filtered.
              </p>

              <div className="mt-12">
                <GECForm
                  tone="light"
                  fields={FIELDS}
                  submitLabel="Send message"
                  subject="Website enquiry — The Garden's Executive Club"
                  consent={
                    <>
                      We use these details to reply to your message and nothing
                      else. We do not add you to a mailing list, and we do not
                      pass your details to anyone outside the club. See our{" "}
                      <a href="/privacy/" className="link-underline">
                        Privacy Policy
                      </a>
                      .
                    </>
                  }
                  successTitle="Message sent"
                  successBody="Thank you. We read every message and reply personally, usually within two business days. If your question is urgent, call us on 877 326 6964 between business hours."
                />
              </div>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <div className="lg:sticky lg:top-28">
                <SectionHead
                  eyebrow="Faster routes"
                  title="You may not need us"
                  lede="Three of the questions we get most are already answered."
                />
                <ul className="mt-10 border-t hair">
                  {[
                    {
                      t: "Am I eligible?",
                      b: "C-level, a founder, or a rising VP. Full criteria on the apply page.",
                      href: "/apply/",
                    },
                    {
                      t: "What does membership cost?",
                      b: "$200/month out of state, or corporate pricing from $800/month.",
                      href: "/membership/",
                    },
                    {
                      t: "What is actually included?",
                      b: "Ten luncheons, a monthly Core group, salons, dinners, coaching and the directory.",
                      href: "/membership/#investment",
                    },
                    {
                      t: "I want to nominate someone.",
                      b: "Nominations are open year-round and read quarterly.",
                      href: "/nominate/",
                    },
                    {
                      t: "I want to donate or sponsor.",
                      b: "Tiers, allocation and our position on sponsorship.",
                      href: "/donations/",
                    },
                    {
                      t: "I want a subsidised place.",
                      b: "Ask. You do not need a story or a justification.",
                      href: "/donations-faq/",
                    },
                  ].map((q) => (
                    <li key={q.t} className="border-b hair px-5 py-6">
                      <a href={q.href} className="group block">
                        <p className="font-display text-[1.15rem] leading-snug transition-colors duration-500 group-hover:accent">
                          {q.t}
                        </p>
                        <p className="muted mt-2 text-[0.88rem] leading-relaxed">
                          {q.b}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="ground-cream on-light">
        <Container>
          <div className="grid gap-y-12 py-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-5">
              <Eyebrow>Our locations</Eyebrow>
              <h2 className="display-sm mt-7 max-w-[16ch] text-balance">
                Two rooms, one club
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <dl className="border-t hair">
                {site.locations.map((loc) => (
                  <div key={loc.name} className="border-b hair px-6 py-8 sm:px-8">
                    <dt className="font-display text-[1.5rem] leading-tight tracking-[-0.012em]">
                      {loc.name}, {loc.region}
                    </dt>
                    <dd className="mt-3 text-[0.95rem] leading-relaxed opacity-70">
                      {loc.note}.{" "}
                      {loc.name === "Stone Mountain"
                        ? `${site.address.line1}, ${site.address.line2}.`
                        : "Programming by arrangement."}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 text-[0.93rem] leading-relaxed opacity-70">
                Not near either? Most of our programming is available to out of
                state and remote members, and the Salon Series runs online.
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
          { label: "Executive Membership", href: "/membership/", note: "Tiers and investment" },
          { label: "Donations", href: "/donations/", note: "Sponsorship and giving" },
          { label: "About Us", href: "/about/", note: "Mission and purpose" },
          { label: "Upcoming Events", href: "/events/", note: "What is confirmed" },
        ]}
      />
    </>
  );
}
