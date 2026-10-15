import type { Metadata } from "next";
import { Figure } from "@/components/Figure";
import { PageHeader } from "@/components/PageHeader";
import { ClosingCta } from "@/components/ClosingCta";
import { Container, Eyebrow, IndexRow, SectionHead } from "@/components/ui";
import { workTopics } from "@/lib/work";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Five research threads behind The Garden's Executive Club: economic security, workplace flexibility, workplace participation, women in leadership, and the glass ceiling.",
  alternates: { canonical: "/work/" },
};

export default function WorkIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Why our work matters"
        title="Research that moves us"
        lede="Networking changes nothing if the structural problem is left untouched. These are the five threads The Garden's Executive Club keeps pulling — each one re-grounded in the United States, because that is where our members work."
      />

      <section className="ground-cream on-light">
        <Container>
          <div className="pb-[clamp(3rem,6vw,5rem)] pt-[clamp(3rem,6vw,5rem)]">
            <Figure
              slug="march"
              sizes="(min-width: 1024px) 60vw, 100vw"
              ratio="16/7"
              caption="Representation matters, especially at the ballot box."
            />
          </div>
        </Container>
      </section>

      <section className="ground-cream on-light">
        <Container>
          <div className="grid gap-y-14 pb-[clamp(4.5rem,10vw,9rem)] pt-[clamp(4rem,9vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-3">
              <SectionHead
                eyebrow="The five threads"
                title="What we work on"
                lede="Each thread began as a question a member asked in a Core group and turned into work the club now carries."
              />
            </div>
            <div className="text-ink lg:col-span-8 lg:col-start-5">
              {workTopics.map((t) => (
                <IndexRow
                  key={t.slug}
                  n={t.n}
                  title={t.title}
                  summary={t.summary}
                  href={`/work/${t.slug}/`}
                />
              ))}
              <p className="muted mt-10 text-sm">
                Sources are cited in full on each page. Figures reflect the most
                recent published US data available at the time of writing.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="ground-ink on-dark">
        <Container>
          <div className="grid gap-y-12 py-[clamp(4rem,9vw,8rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-5">
              <Eyebrow>Why this exists</Eyebrow>
              <p className="font-display mt-7 text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.16] text-balance">
                A room of women who understand the problem is a start. Changing
                the problem is the work.
              </p>
            </div>
            <div className="prose-gec lg:col-span-6 lg:col-start-7">
              <p>
                We are a membership organisation, not a lobbying body. What we
                do is narrower and, we would argue, more useful: we take the
                evidence seriously, we hold it in front of the women who make
                decisions, and we do not let anyone in the room say the problem
                is somebody else&apos;s.
              </p>
              <p>
                Every member who joins the club already has access to plenty of
                information. What they rarely have is someone to hand it to who
                will act on it with them.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <ClosingCta
        title="The work needs a room"
        lede="If any of this lands — if you have been inside this problem from the other side — we would like to hear from you."
      />
    </>
  );
}
