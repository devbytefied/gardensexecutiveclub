import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { LinkGrid } from "@/components/blocks";
import { Container, Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms governing use of The Garden's Executive Club website, and the separate membership agreement that governs membership itself.",
  alternates: { canonical: "/terms/" },
};

const SECTIONS = [
  {
    h: "About these terms",
    p: [
      `These terms govern your use of this website, operated by ${site.legalName} ("the club", "we", "us"). They are a separate document from the Membership Agreement, which governs membership itself and is the only document that creates obligations between you and the club as a member.`,
      "Where a member is also using this website, both documents apply. If they ever conflict, the Membership Agreement governs the membership, and these terms govern the website.",
    ],
  },
  {
    h: "Acceptable use",
    p: [
      "You may read, print and share this site freely. You may not: copy substantial portions of it for commercial use; scrape or systematically extract its content; attempt to disrupt, overload or gain unauthorised access to it; misrepresent yourself as connected to the club; or use the forms to send unsolicited commercial communications.",
      "Quoting from our published research with attribution is welcome and does not need permission. Reproducing it without attribution is not.",
    ],
  },
  {
    h: "Membership is not conferred by this site",
    p: [
      "Nothing on this website constitutes an offer of membership, an invitation, or a contract of any kind. Membership is created only by a written Membership Agreement signed by both parties following a successful application.",
      "Likewise, submitting an application, a nomination, or a contact form through this site creates no obligation on the club to admit, seat, sponsor, or respond to you. We will of course respond — but the point is that nothing here is a commitment.",
    ],
  },
  {
    h: "Information and forms",
    p: [
      "The information published here is provided in good faith and is subject to change. Our published research summarises publicly available findings; it is not legal, financial, tax or investment advice, and it should not be relied on as such.",
      "Forms on this site are delivered by a third-party email service. We do not request full payment card details through any web form and never will. See the Privacy Policy for how we handle what you submit.",
    ],
  },
  {
    h: "Intellectual property",
    p: [
      "The club's name, logos, marks, design and the original text of this site are owned by the club and may not be used without permission. Photography and illustrations remain the property of their respective rights holders, and the inclusion of an image here is not a grant of rights in it.",
      "Research findings summarised from third-party sources remain the property of their original authors. We credit them and we ask you to do the same.",
    ],
  },
  {
    h: "Third-party links and advertising",
    p: [
      "This site links to third-party websites and social platforms. We do not control them, we are not responsible for them, and following a link takes you outside these terms and under someone else's.",
      "The club accepts no advertising and sells no advertising on this site. If you encounter anything claiming to be club advertising, please report it.",
    ],
  },
  {
    h: "Liability",
    p: [
      "This website and its content are provided on an \"as is\" and \"as available\" basis. To the fullest extent permitted by applicable law we make no warranties as to accuracy, completeness, availability or fitness for any purpose.",
      "We are not liable for indirect, incidental or consequential loss, or for loss of profits, revenue, data or opportunity, arising from your use of this site. Nothing here limits liability that cannot lawfully be limited, including for fraud or for death or personal injury caused by negligence.",
    ],
  },
  {
    h: "Governing law and disputes",
    p: [
      "These terms are governed by the laws of the State of Georgia, United States, consistent with the Federal Arbitration Act, without regard to conflict-of-laws principles. The United Nations Convention on Contracts for the International Sale of Goods does not apply.",
      `Any dispute between you and the club relating to this website will be resolved by binding arbitration on an individual basis, in accordance with the dispute resolution provisions of the Membership Agreement. The parties will attempt informal resolution for thirty days before arbitration is commenced.`,
    ],
  },
  {
    h: "Changes",
    p: [
      "We may revise these terms. The version on this page is the current one, and the date below applies to it. Continuing to use the site after a change means you accept the revised terms.",
    ],
  },
  {
    h: "Contact",
    p: [
      `Questions about these terms go to ${site.contact.email}, with the subject line "Terms of use". Notices may also be sent to ${site.address.line1}, ${site.address.line2}, ${site.address.country}, by nationally recognised overnight delivery or by first-class postage.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Use"
        lede="The rules for this website — which are not the same document as the agreement that governs your membership."
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
                <p className="muted mt-8 text-[0.85rem] leading-relaxed">
                  Members are also bound by the Membership Agreement and the
                  club&apos;s Community Guidelines.
                </p>
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
          { label: "Privacy Policy", href: "/privacy/", note: "What we hold and why" },
          { label: "Contact", href: "/contact/", note: "We read everything" },
          { label: "Executive Membership", href: "/membership/", note: "Tiers and investment" },
          { label: "Apply", href: "/apply/", note: "Start your application" },
        ]}
      />
    </>
  );
}
