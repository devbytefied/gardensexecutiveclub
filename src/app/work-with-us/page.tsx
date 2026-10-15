import type { Metadata } from "next";
import { ClosingCta } from "@/components/ClosingCta";
import { PageHeader } from "@/components/PageHeader";
import { DataRows, LinkGrid, ProseSection } from "@/components/blocks";
import { Button, Container, Eyebrow, SectionHead } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work With Us",
  description:
    "Open roles, partnerships, and vendor enquiries at The Garden's Executive Club in Stone Mountain, Georgia and Greenville, North Carolina.",
  alternates: { canonical: "/work-with-us/" },
};

const ROLES = [
  {
    label: "Core group guide",
    status: "open" as const,
    value:
      "An experienced executive leader who facilitates a monthly peer group of ten. You will have run a team through something difficult and be willing to keep your own learning visible while you do it.",
    note: "Part-time / Remote-friendly / Stone Mountain or Greenville",
  },
  {
    label: "Programme lead, GEC Connect",
    status: "open" as const,
    value:
      "Own the community calendar, the online space, and the relationship between scholars, graduates and members. This is a small job with real responsibility.",
    note: "Part-time / Hybrid",
  },
  {
    label: "Research & impact editor",
    status: "open" as const,
    value:
      "Someone who can take a finding and make it land with a board. You will work with the Research & Impact committee on the five published work threads and the annual review.",
    note: "Project-based / Remote-friendly",
  },
  {
    label: "Events producer",
    status: "open" as const,
    value:
      "The annual dinner, the GEC Summit and The Magnolia. You have produced events where the detail was the point, not an afterthought.",
    note: "Seasonal / On-site, Stone Mountain",
  },
  {
    label: "Board directorships",
    status: "open" as const,
    value:
      "Vice Chair, Treasurer, Membership Chair, Events Chair, Director of Research & Impact, and two elected member directorships.",
    note: "Unremunerated / Quarterly commitment",
  },
];

const PARTNERSHIPS = [
  {
    label: "Partnering corporation",
    value:
      "Employers who seat up to four executives on a corporate membership. We are a development and retention instrument, not a venue hire.",
  },
  {
    label: "Capital partners",
    value:
      "Angel investors, private lenders and grant providers who want structured access to a vetted group of women operators. One submission to the quarterly Pitch to OH summit per member.",
  },
  {
    label: "Professional services",
    value:
      "Coaches, therapists, financial advisers, recruiters and strategists who work credibly with women at C-level and are interested in the club as a long relationship rather than a lead source.",
  },
  {
    label: "Venues & suppliers",
    value:
      "We are building a permanent clubhouse in downtown Stone Mountain. Local makers, printers, caterers and trades are actively welcome to introduce themselves.",
  },
];

export default function WorkWithUsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work with us"
        title="Open seats, inside and out"
        lede="The club runs on the labour of people who are not on the board. If any of the roles or partnerships below is you, we would like to hear from you — even if you are not sure you fit the description exactly."
        aside={
          <div>
            <Eyebrow>How to reach us</Eyebrow>
            <p className="mt-6 text-[0.95rem] leading-relaxed">
              Write to{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="link-underline accent"
              >
                {site.contact.email}
              </a>{" "}
              or call{" "}
              <a href={site.contact.phoneHref} className="link-underline">
                {site.contact.phoneDisplay}
              </a>
              .
            </p>
            <p className="muted mt-5 text-[0.88rem] leading-relaxed">
              Please tell us which role or partnership you are writing about.
              We answer every enquiry, including the ones we have to decline.
            </p>
          </div>
        }
      />

      <section className="ground-parchment on-light">
        <Container>
          <div className="grid gap-y-12 py-[clamp(3.5rem,7vw,6rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <SectionHead
                eyebrow="Roles"
                title="Currently open"
                lede="Nothing here is a speculative listing. These are positions we intend to fill."
              />
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <DataRows
                className="border-t pt-7 hair"
                rows={ROLES.map((r) => ({
                  label: (
                    <span className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      {r.label}
                      <span className="eyebrow !text-[0.5rem] text-rose-deep">
                        {r.status === "open" ? "Open" : "Filled"}
                      </span>
                    </span>
                  ),
                  value: r.value,
                  note: r.note,
                }))}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="ground-emerald on-dark">
        <Container>
          <div className="grid gap-y-12 py-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <Eyebrow>Partnerships</Eyebrow>
              <h2 className="display-sm mt-7 max-w-[15ch] text-balance">
                What we are actively looking for
              </h2>
              <p className="muted mt-7 max-w-[38ch] text-[0.97rem] leading-relaxed">
                We are more interested in relationships that last than in
                arrangements that look good on a page. If you are considering
                sponsoring us, expect to be asked what you want out of it first.
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <DataRows
                className="border-t pt-7 hair"
                rows={PARTNERSHIPS}
              />
            </div>
          </div>
        </Container>
      </section>

      <ProseSection
        aside={
          <div>
            <div className="border-t hair pt-8">
              <Eyebrow>Applying for a role</Eyebrow>
              <p className="muted mt-6 text-[0.93rem] leading-relaxed">
                No formal process, no cover letter. Tell us what you have done,
                what you want to do, and what you think the club is getting wrong.
                We read all of it.
              </p>
              <Button
                href={`mailto:${site.contact.email}`}
                variant="rose"
                className="mt-8"
              >
                Email the club
              </Button>
            </div>
          </div>
        }
      >
        <h2>What we look for</h2>
        <p>
          Credibility over credentials, and evidence over adjectives. We are
          looking for people who can point at something they changed and say
          precisely how they changed it.
        </p>
        <p>
          We also hire for temperament. A club is a set of conversations, and
          the quality of those conversations is the product. If you are the
          person who makes the room better, we will find a title for you.
        </p>
        <h3>What we offer</h3>
        <ul>
          <li>Meaningful work attached to a mission you can believe or decline.</li>
          <li>Direct access to the membership, without a gatekeeper.</li>
          <li>Remote-friendly arrangements by default, on-site when it matters.</li>
          <li>Paid roles properly paid. Volunteering is a separate column.</li>
        </ul>
        <h3>Equal opportunity</h3>
        <p>
          {site.legalName} is an equal opportunity employer and does not
          discriminate on the basis of race, colour, religion, sex, sexual
          orientation, gender identity, national origin, age, disability, veteran
          status, or any other protected characteristic.
        </p>
      </ProseSection>

      <LinkGrid
        eyebrow="Next"
        title="Keep going"
        items={[
          { label: "Our Board", href: "/our-board/", note: "Governance and open seats" },
          { label: "Donations", href: "/donations/", note: "Sponsorship and giving" },
          { label: "Contact", href: "/contact/", note: "We read everything" },
          { label: "Executive Membership", href: "/membership/", note: "Tiers and investment" },
          { label: "About Us", href: "/about/", note: "Mission and purpose" },
          { label: "Annual Review", href: "/annual-review/", note: "What the year produced" },
        ]}
      />

      <ClosingCta
        title="Come and build it with us"
        lede="The clubhouse, the programmes and the events are all built by people who decided to be useful rather than visible. We are always looking for more of them."
        primary={{ label: "Email the club", href: `mailto:${site.contact.email}` }}
        secondary={{ label: "Donations", href: "/donations/" }}
      />
    </>
  );
}
