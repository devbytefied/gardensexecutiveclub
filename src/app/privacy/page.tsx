import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { LinkGrid } from "@/components/blocks";
import { Container, Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How The Garden's Executive Club collects, uses and protects your personal information, and how to exercise your rights.",
  alternates: { canonical: "/privacy/" },
};

const SECTIONS = [
  {
    h: "Overview",
    p: [
      `${site.legalName} ("the club", "we", "us") collects the personal information you give us when you apply for membership, submit a nomination, contact us, attend an event, or make a donation. This policy explains what we collect, why we collect it, how long we keep it, and what you can ask us to do with it.`,
      "We keep this deliberately short. If anything here is unclear, email us and we will explain it properly rather than point you at a clause.",
    ],
  },
  {
    h: "What we collect",
    p: [
      "Membership and nomination applications: your name, email address, telephone number, employer, job title, industry, revenue band, location preference, your headshot, your company electronic press kit, and anything you choose to write in the free-text fields.",
      "Contact enquiries: your name, email address, telephone number, preferred method of contact, how you heard about us, and your message.",
      "Event attendance: your name and, where you ask us to, a dietary requirement, an access requirement, or a headshot for the member directory.",
      "Technical information: the standard server logs any web host keeps — IP address, browser type, and pages requested. We do not run advertising trackers, analytics beacons, or third-party advertising pixels on this site.",
    ],
  },
  {
    h: "Why we collect it",
    p: [
      "To assess and administer your membership candidacy; to process nominations; to reply to your enquiries; to run the events and gatherings you have asked to attend; to administer donations and sponsorship; and to meet our legal, tax and governance obligations as a Georgia corporation.",
      "We do not sell your information. We do not rent it, trade it, or pass it to advertisers. We share it only with the people who need it to do those things for us — a mail provider, a payment processor, our legal advisers — and only to that extent.",
    ],
  },
  {
    h: "Forms and third parties",
    p: [
      "The forms on this site are delivered by this site's own server, which sends your message straight to our mailbox over an encrypted connection. Whatever you type into a form stays between you and us — it is not passed to any third-party form service. We never ask for full payment card details in any web form on this site, and we never will.",
      "We also publish links to third-party websites — Instagram, Facebook and LinkedIn. We are not responsible for their privacy practices. Read their policies before you share anything with them.",
    ],
  },
  {
    h: "Cookies",
    p: [
      "This site sets no tracking cookies and runs no third-party analytics. The only browser storage the site itself uses is what is required to render a page and remember that you have opened the navigation overlay.",
      "If you embed or contact us through a social platform, that platform will set its own cookies under its own policy. That is between you and them.",
    ],
  },
  {
    h: "How long we keep it",
    p: [
      "Membership and nomination records are retained for as long as you are a member, and for seven years afterwards to meet our accounting and legal obligations.",
      "Enquiry records are retained for two years. If you asked for a subsidised place, that record is handled separately and is never circulated, internally or externally.",
      "Donation records are retained for seven years, as tax law requires.",
    ],
  },
  {
    h: "Your rights",
    p: [
      "You may ask us at any time to tell you what personal information we hold about you, to correct anything that is wrong, to delete information we are not legally required to keep, or to stop using your information for any purpose you object to.",
      `Write to ${site.contact.email} with the subject line "Privacy request" and we will respond within thirty days. We do not charge for this, and we do not require you to justify the request.`,
    ],
  },
  {
    h: "Your photograph and press consent",
    p: [
      "If you attend an event and provide a headshot, you may choose whether your photograph appears in the member directory, on our site, or on neither. This is asked of you explicitly at the event; silence is not consent.",
      "On acceptance of membership we ask for a media and press consent of release. It is mutual — we will sign ours too — and you may withdraw it at any time, after which we will stop using images of you in new material.",
    ],
  },
  {
    h: "Children",
    p: [
      "The club is for adults. We do not knowingly collect information from anyone under eighteen. If you believe a child has given us information, contact us and we will delete it.",
    ],
  },
  {
    h: "Security",
    p: [
      "The information you submit through this site is transmitted over HTTPS. Our mailboxes are access-controlled. We keep the personal data we hold to a minimum and delete what we no longer need, but we will not pretend that no system is ever breached — if one is, we will tell the affected members.",
    ],
  },
  {
    h: "Changes and contact",
    p: [
      "We may update this policy. The version on this page is the current one, and the date below applies to it. Material changes affecting members will be announced in the newsletter before they take effect.",
      `Questions about this policy, or about anything in it, go to ${site.contact.email} — not to a form, so that a person reads them. Our address is ${site.address.line1}, ${site.address.line2}, ${site.address.country}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        lede="What we collect, why, and how to make us stop."
      />

      <section className="ground-ink on-dark">
        <Container>
          <div className="grid gap-y-12 pb-[clamp(4rem,9vw,7rem)] pt-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <Eyebrow>Contents</Eyebrow>
                <ol className="mt-7 space-y-3">
                  {SECTIONS.map((s, i) => (
                    <li key={s.h} className="text-[0.9rem] leading-snug muted">
                      <span className="tnum mr-3 accent/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.h}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <article className="prose-gec lg:col-span-8 lg:col-start-5">
              {SECTIONS.map((s) => (
                <section key={s.h}>
                  <h2>{s.h}</h2>
                  {s.p.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </section>
              ))}
              <p className="mt-16 border-t hair-faint pt-8 text-[0.85rem] meta">
                Last reviewed September 2026. Applies to{" "}
                {site.legalName} and to this website.
              </p>
            </article>
          </div>
        </Container>
      </section>

      <LinkGrid
        eyebrow="Legal"
        title="Also here"
        items={[
          { label: "Terms of Use", href: "/terms/", note: "The rules of the site" },
          { label: "Contact", href: "/contact/", note: "We read everything" },
          { label: "About Us", href: "/about/", note: "Mission and purpose" },
          { label: "Executive Membership", href: "/membership/", note: "Tiers and investment" },
        ]}
      />
    </>
  );
}
