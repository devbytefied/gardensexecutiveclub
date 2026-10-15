import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta } from "@/components/ClosingCta";
import { Figure } from "@/components/Figure";
import { GECForm, type Field } from "@/components/GECForm";

import { FeatureGrid, LinkGrid } from "@/components/blocks";
import { Button, Container, Eyebrow, Quote, SectionHead } from "@/components/ui";
import {
  book,
  conversations,
  declaration,
  engagements,
  epk,
  exit,
  platforms,
  press,
  profile,
  roles,
  ventures,
} from "@/lib/epk";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book Dr. Ebony OH",
  description:
    "Official executive booking EPK for Dr. Ebony Ormond-Ham — entrepreneur, CEO, Seed Strategist®, author and founder of The Garden's Executive Club. Keynotes, fireside chats, panels, summits and private experiences.",
  alternates: { canonical: "/epk/" },
};

/* ------------------------------------------------------------------ *
 * The booking form
 *
 * One form, sent to the club's booking inbox. `subject` carries the
 * enquiry type back to the client so the first reply can be a real
 * answer rather than a holding message.
 * ------------------------------------------------------------------ */

const FIELDS: Field[] = [
  { name: "first_name", label: "First name", type: "text", required: true, autoComplete: "given-name" },
  { name: "last_name", label: "Last name", type: "text", required: true, autoComplete: "family-name" },
  { name: "email", label: "Email address", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { name: "organisation", label: "Organisation", type: "text", required: true, autoComplete: "organization" },
  { name: "title", label: "Your title", type: "text", required: true },
  {
    name: "engagement",
    label: "What are you booking?",
    type: "select",
    required: true,
    span: 2,
    options: [
      { value: "keynote", label: "Keynote" },
      { value: "fireside", label: "Fireside chat" },
      { value: "panel", label: "Panel or summit" },
      { value: "private", label: "Private experience or retreat" },
      { value: "moderator", label: "As moderator or interviewer" },
      { value: "media", label: "Media or press" },
      { value: "partnership", label: "Partnership or sponsorship" },
      { value: "other", label: "Something else" },
    ],
  },
  { name: "event_name", label: "Event name", type: "text", required: true, span: 2 },
  { name: "event_date", label: "Proposed date", type: "date", required: true },
  { name: "event_time", label: "Proposed time", type: "time" },
  { name: "venue", label: "Venue or city", type: "text", span: 2 },
  {
    name: "audience",
    label: "Who is in the room?",
    type: "text",
    span: 2,
    placeholder: "Size, sector, and anything the content should be calibrated to.",
  },
  {
    name: "budget",
    label: "Indicative budget",
    type: "select",
    span: 2,
    options: [
      { value: "unsure", label: "Not sure yet — please advise" },
      { value: "under-5k", label: "Under $5,000" },
      { value: "5k-10k", label: "$5,000 – $10,000" },
      { value: "10k-25k", label: "$10,000 – $25,000" },
      { value: "25k-plus", label: "$25,000 and above" },
    ],
  },
  {
    name: "message",
    label: "Tell us about the room",
    type: "textarea",
    rows: 6,
    span: 2,
    placeholder:
      "The theme you want her to speak to, the format, the length, and anything we should know before we reply.",
  },
];

export default function EpkPage() {
  return (
    <>
      {/* Cover ------------------------------------------------------ */}
      <section className="ground-ink on-dark pt-[clamp(7rem,14vw,11rem)]">
        <Container>
          <div className="pb-[clamp(3.5rem,7vw,6rem)]">
            <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-10">
              <div className="lg:col-span-7">
                <Eyebrow>Official executive booking EPK</Eyebrow>
                <h1 className="display mt-8 max-w-[14ch] text-balance">
                  {epk.name}
                </h1>
                <p className="eyebrow mt-8 accent !tracking-[0.2em]">
                  {epk.mark}
                </p>
                <ul className="mt-7 space-y-2">
                  {epk.titles.map((t) => (
                    <li key={t} className="meta text-[0.82rem] tracking-[0.1em] uppercase">
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="lede measure mt-10">{epk.standfirst}</p>

                <div className="mt-12 flex flex-wrap items-center gap-x-9 gap-y-4">
                  <Button href="#book" variant="rose">
                    Book Dr. Ebony OH
                  </Button>
                  <a
                    href={epk.pdf}
                    className="eyebrow link-underline !tracking-[0.16em] meta hover:text-rose-light"
                  >
                    {epk.pdfLabel}
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4 lg:col-start-9">
                <div className="hair border p-8">
                  <p className="eyebrow meta">Mission</p>
                  <p className="font-display mt-5 text-[1.45rem] leading-[1.22] tracking-[-0.015em]">
                    {epk.mission[0]}
                  </p>
                  <p className="font-display mt-3 text-[1.45rem] leading-[1.22] tracking-[-0.015em] accent">
                    {epk.mission[1]}
                  </p>
                  <div className="hair mt-8 border-t pt-6">
                    <p className="eyebrow meta">Booking &amp; media</p>
                    <a
                      href={`mailto:${epk.email}`}
                      className="link-underline mt-3 block text-[0.95rem]"
                    >
                      {epk.email}
                    </a>
                    <a
                      href={site.contact.phoneHref}
                      className="link-underline mt-2 block text-[0.95rem]"
                    >
                      {site.contact.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Executive profile ------------------------------------------ */}
      <section className="ground-cream on-light">
        <Container>
          <div className="grid gap-y-14 py-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-7">
              <SectionHead eyebrow="Executive profile" title="Who she is" />
              <div className="prose-gec on-light mt-10">
                <p className="!text-[1.1rem] !leading-relaxed">{profile.lead}</p>
                {profile.body.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <Figure
                slug="founder"
                sizes="(min-width: 1024px) 24rem, 92vw"
                ratio="4/5"
                stretch
                caption="Dr. Ebony OH"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Roles ------------------------------------------------------ */}
      <section className="ground-emerald on-dark">
        <Container>
          <div className="py-[clamp(4rem,9vw,7rem)]">
            <SectionHead
              eyebrow="Leadership, development & legacy"
              title="What she runs today"
              lede="Dr. OH is the active Owner, Co-Founder and Executive Leader across a portfolio that spans education, childcare, construction, hospitality and community development."
            />
            <ul className="mt-14 grid gap-px border hair border bg-cream/20 sm:grid-cols-2">
              {roles.map((r) => (
                <li key={r.org} className="bg-teal-soft p-8 sm:p-9">
                  <p className="eyebrow !text-[0.58rem] meta">{r.role}</p>
                  <h3 className="font-display mt-4 text-[1.35rem] leading-tight tracking-[-0.01em]">
                    {r.org}
                  </h3>
                  <p className="muted mt-4 text-[0.92rem] leading-relaxed">{r.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* The declaration -------------------------------------------- */}
      <section className="ground-ink on-dark">
        <Container>
          <div className="py-[clamp(4rem,9vw,7rem)]">
            <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
              <div className="lg:col-span-6">
                <Eyebrow>{declaration.mark}</Eyebrow>
                <Quote className="mt-8 max-w-[24ch]">{declaration.pull}</Quote>
              </div>
              <div className="lg:col-span-5 lg:col-start-8">
                <p className="muted text-[0.98rem] leading-relaxed">{declaration.body}</p>
                <p className="muted mt-6 text-[0.98rem] leading-relaxed">
                  {declaration.close}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Enterprise track record ------------------------------------ */}
      <section className="ground-parchment on-light">
        <Container>
          <div className="py-[clamp(4rem,9vw,7rem)]">
            <SectionHead
              eyebrow="Enterprise track record"
              title="Built. Acquired. Scaled. Monetized."
              lede="Four operating companies, each taken from idea to enterprise and each measured in generated revenue."
            />

            <ul className="mt-14 grid gap-px border hair-faint border bg-[color-mix(in_oklab,var(--color-ink)_11%,transparent)] sm:grid-cols-2 lg:grid-cols-4">
              {ventures.map((v) => (
                <li key={v.org} className="bg-parchment p-8">
                  <p className="tnum eyebrow accent">{v.date}</p>
                  <p className="tnum mt-7 font-display text-[clamp(2.6rem,4.5vw,3.4rem)] leading-[0.9] tracking-[-0.03em] text-rose-deep">
                    {v.figure}
                  </p>
                  <p className="eyebrow mt-3 !text-[0.55rem] meta">{v.figureLabel}</p>
                  <h3 className="font-display mt-7 text-[1.2rem] leading-tight tracking-[-0.01em]">
                    {v.org}
                  </h3>
                  <p className="muted mt-3 text-[0.83rem] leading-relaxed">{v.role}</p>
                  <p className="mt-3 text-[0.78rem] leading-relaxed text-ink-soft">
                    {v.industry}
                  </p>
                </li>
              ))}
            </ul>

            {/* Founder's exit + platforms */}
            <div className="mt-16 grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
              <div className="lg:col-span-5">
                <Eyebrow>Founder’s exit</Eyebrow>
                <h3 className="display-sm mt-7">{exit.title}</h3>
                <p className="eyebrow mt-5 !text-[0.58rem] meta">{exit.industry}</p>
                <p className="tnum mt-9 font-display text-[clamp(3.2rem,6vw,5rem)] leading-[0.88] tracking-[-0.03em] accent">
                  {exit.figure}
                </p>
                <p className="eyebrow mt-3 !text-[0.55rem] meta">
                  {exit.figureLabel} • {exit.year}
                </p>
                <p className="muted mt-9 text-[0.95rem] leading-relaxed">{exit.body}</p>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                <FeatureGrid
                  columns={2}
                  items={platforms.map((p) => ({
                    title: p.title,
                    body: (
                      <>
                        <span className="eyebrow mb-4 block !text-[0.55rem] text-rose-deep">
                          {p.industry}
                        </span>
                        {p.body}
                        <span className="mt-5 block font-display text-[1.05rem] leading-snug text-rose-deep">
                          {p.pull}
                        </span>
                      </>
                    ),
                  }))}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Author + engagements --------------------------------------- */}
      <section className="ground-cream on-light">
        <Container>
          <div className="grid gap-y-14 py-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-5">
              <Eyebrow>Author</Eyebrow>
              <h2 className="display-sm mt-7 max-w-[14ch]">{book.title}</h2>
              <p className="font-display mt-5 text-[1.35rem] leading-snug tracking-[-0.01em] text-rose-deep">
                {book.subtitle}
              </p>
              <p className="eyebrow mt-6 !text-[0.58rem] meta">{book.byline}</p>
              <p className="muted mt-8 max-w-[46ch] text-[0.98rem] leading-relaxed">
                {book.body}
              </p>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Eyebrow>Book Dr. OH for</Eyebrow>
              <FeatureGrid
                className="mt-8"
                columns={2}
                items={engagements.map((e) => ({
                  n: e.n,
                  title: e.title,
                  body: e.body,
                }))}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Signature conversations ------------------------------------ */}
      <section className="ground-emerald on-dark">
        <Container>
          <div className="py-[clamp(4rem,9vw,7rem)]">
            <SectionHead
              eyebrow="Signature conversations"
              title="Where experience becomes strategy."
              lede="Six rooms of material, drawn from a portfolio of ventures rather than from a keynote deck. Each can carry a keynote, a breakout, or an hour at a table of ten."
            />
            <ul className="mt-14 border-t hair">
              {conversations.map((c, i) => (
                <li
                  key={c.title}
                  className="grid gap-x-10 gap-y-3 border-b hair py-8 sm:grid-cols-12"
                >
                  <span className="tnum eyebrow accent sm:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[1.45rem] leading-tight tracking-[-0.012em] sm:col-span-5">
                    {c.title}
                  </h3>
                  <p className="muted text-[0.95rem] leading-relaxed sm:col-span-6">
                    {c.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Media ------------------------------------------------------ */}
      <section className="ground-cream on-light">
        <Container>
          <div className="py-[clamp(4rem,9vw,7rem)]">
            <SectionHead
              eyebrow="Featured media"
              title="Press & editorial features"
              lede="Coverage of the portfolio, the platform and the philosophy."
            />
            <ul className="mt-14 grid gap-px border hair-faint border bg-[color-mix(in_oklab,var(--color-ink)_11%,transparent)] lg:grid-cols-3">
              {press.map((p) => (
                <li key={p.outlet} className="bg-cream p-8 sm:p-9">
                  <p className="eyebrow accent">{p.outlet}</p>
                  <h3 className="font-display mt-5 text-[1.25rem] leading-tight tracking-[-0.01em]">
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline decoration-rose/40 transition-colors duration-500 hover:text-rose-deep"
                    >
                      {p.title}
                    </a>
                  </h3>
                  <p className="muted mt-4 text-[0.9rem] leading-relaxed">{p.body}</p>
                </li>
              ))}
            </ul>
            <p className="meta mt-8 text-[var(--fs-meta)]">
              Media, speaking &amp; partnership enquiries —{" "}
              <a href={`mailto:${epk.email}`} className="link-underline">
                {epk.email}
              </a>
            </p>
          </div>
        </Container>
      </section>

      {/* Booking form ----------------------------------------------- */}
      <section className="ground-ink on-dark" id="book">
        <Container>
          <div className="grid gap-y-14 py-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-7">
              <Eyebrow>Official booking inquiries</Eyebrow>
              <h2 className="display-sm mt-7 max-w-[18ch] text-balance">
                Book Dr. Ebony OH
              </h2>
              <p className="lede measure mt-7">
                Tell us the room and the date. Fields marked with an asterisk are
                required — everything else is useful but not mandatory.
              </p>

              <div className="mt-12">
                <GECForm
                  tone="dark"
                  fields={FIELDS}
                  submitLabel="Send booking inquiry"
                  subject="Booking Inquiry — Dr. Ebony OH"
                  consent={
                    <>
                      The information collected allows us to respond to your
                      enquiry and to prepare a proposal. We never share it. For
                      more information, see our{" "}
                      <Link href="/privacy/" className="link-underline">
                        Privacy Policy
                      </Link>
                      .
                    </>
                  }
                  successTitle="Your inquiry has landed"
                  successBody="Thank you. Dr. OH's office replies to every booking, media and partnership enquiry personally, usually within two business days. Nothing is confirmed until a proposal and agreement are in place."
                />
              </div>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <div className="hair border p-8">
                <p className="eyebrow meta">At a glance</p>
                <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
                  {[
                    ["$28.2M", "generated revenue across four operating companies"],
                    ["7-figure", "self-brokered exit, mental health"],
                    ["2019", "the sale of five outpatient clinics"],
                    ["5", "clinics acquired, grown and sold"],
                  ].map(([v, l]) => (
                    <div key={v}>
                      <dt className="sr-only">{l}</dt>
                      <dd>
                        <span className="tnum block font-display text-[1.75rem] leading-none tracking-[-0.025em] accent">
                          {v}
                        </span>
                        <span className="muted mt-2.5 block text-[0.78rem] leading-snug">
                          {l}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="hair mt-10 border-t pt-8">
                <p className="eyebrow meta">Prefer to send it straight through?</p>
                <a
                  href={`mailto:${epk.email}`}
                  className="link-underline mt-4 block text-[0.98rem]"
                >
                  {epk.email}
                </a>
                <a
                  href={site.contact.phoneHref}
                  className="link-underline mt-2 block text-[0.98rem]"
                >
                  {site.contact.phoneDisplay}
                </a>
                <p className="muted mt-6 text-[0.85rem] leading-relaxed">
                  Hosting an evening at the clubhouse?{" "}
                  <Link href="/venue/" className="link-underline">
                    The venue is bookable
                  </Link>{" "}
                  on its own page.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <LinkGrid
        eyebrow="Next"
        title="Keep going"
        items={[
          { label: "The Magnolia", href: "/the-magnolia/", note: "Sunday 18 October 2026" },
          { label: "Upcoming Events", href: "/events/", note: "What is confirmed" },
          { label: "Book the Venue", href: "/venue/", note: "The clubhouse, for hire" },
          { label: "Executive Membership", href: "/membership/", note: "Tiers and investment" },
          { label: "About Us", href: "/about/", note: "Mission and purpose" },
          { label: "Contact", href: "/contact/", note: "We read everything" },
        ]}
      />

      <ClosingCta
        title="Media, speaking & partnerships"
        lede="Press, editorial, panels and summits all come to the same inbox, and every one of them is read."
      />
    </>
  );
}