import Link from "next/link";
import { EventPopup } from "@/components/EventPopup";
import { Figure } from "@/components/Figure";
import { Marquee } from "@/components/Marquee";
import { ClosingCta } from "@/components/ClosingCta";
import { Button, Container, Eyebrow, IndexRow, Quote, SectionHead } from "@/components/ui";
import { site } from "@/lib/site";
import { workTopics } from "@/lib/work";

export default function Home() {
  return (
    <>
      {/* ── 1 / Hero — type-led, no photograph ───────────────────── */}
      <section className="ground-cream on-light hair-faint border-b">
        <Container>
          <div className="grid min-h-[calc(100svh-4.5rem)] grid-cols-1 items-center gap-y-14 py-[clamp(3.5rem,8vw,7rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-8">
              <Eyebrow>
                Est. {site.founded} / {site.address.line2}
              </Eyebrow>

              <h1 className="display mt-10 max-w-[15ch] text-ink">
                <span className="fade-in" style={{ animationDelay: "80ms" }}>
                  Women who
                </span>{" "}
                <span
                  className="fade-in italic text-rose-deep"
                  style={{ animationDelay: "170ms" }}
                >
                  lead
                </span>{" "}
                <span className="fade-in" style={{ animationDelay: "260ms" }}>
                  from the room they were left out of.
                </span>
              </h1>

              <p
                className="lede measure fade-in mt-10 !max-w-[55ch]"
                style={{ animationDelay: "380ms" }}
              >
                The Garden&apos;s Executive Club is a private network for
                C-level executives, founders and rising VPs — the women already
                making decisions, already carrying the weight, and rarely
                finding anyone in the room who understands it.
              </p>

              <div
                className="fade-in mt-12 flex flex-wrap items-center gap-x-4 gap-y-5"
                style={{ animationDelay: "470ms" }}
              >
                <Button href="/apply/" variant="rose">
                  Request an Invitation
                </Button>
                <Button href="/about/" variant="outline">
                  Explore the Club
                </Button>
              </div>
            </div>

            {/* Only element in the hero: the founding quote, set large. */}
            <div className="lg:col-span-4  lg:col-start-9 lg:self-end">
              <Quote attribution={site.founderShort} className="hair-faint border-t pt-8">
                The worst place to find yourself is climbing a ladder with
                nowhere to go, and no one to catch you should you fall.
              </Quote>
            </div>
          </div>
        </Container>

        {/* Stat rail */}
        <div className="hair-faint border-t">
          <Container>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-8 py-9 sm:grid-cols-3">
              {[
                ["23%", "of executive roles held by women"],
                ["200", "years to parity, at the current rate"],
                ["25", "female CEOs on the Fortune 500"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd>
                    <span className="tnum block font-display text-[2.4rem] leading-none tracking-[-0.02em] text-rose-deep">
                      {value}
                    </span>
                    <span className="muted mt-2.5 block max-w-[22ch] text-[0.8rem] leading-snug">
                      {label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      </section>

      {/* ── 2 / Manifesto — the dark ground, used once ───────────── */}
      <section className="ground-ink on-dark">
        <Container>
          <div className="grid gap-y-12 py-[clamp(4rem,9vw,8rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-3">
              <Eyebrow>The premise</Eyebrow>
            </div>

            <div className="lg:col-span-9">
              <Quote attribution={site.founder} source="Founder & Chief Executive Officer">
                No worries. It is our time and it is our turn. We are getting
                ready to change this narrative for good.
              </Quote>

              <div className="hair-faint mt-14 grid gap-x-10 gap-y-8 border-t pt-10 sm:grid-cols-2">
                <p className="muted text-[1.02rem] leading-relaxed">
                  Men have long enjoyed support networks built for them. Women
                  have had fewer options — particularly when they are younger,
                  when the rooms are thinnest and the climb is steepest.
                </p>
                <p className="muted text-[1.02rem] leading-relaxed">
                  We are changing this narrative by building the room ourselves:
                  mentorship across industries, focused coaching, and a table
                  where the women already in the seat know what the view looks
                  like.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 3 / The number ────────────────────────────────────────── */}
      <section className="ground-cream on-light">
        <Container>
          <div className="grid gap-y-12 py-[clamp(4rem,9vw,8rem)] lg:grid-cols-12 lg:items-end lg:gap-x-10">
            <div className="lg:col-span-7">
              <p className="tnum font-display text-[clamp(6rem,17vw,15rem)] leading-[0.8] tracking-[-0.045em] text-rose-deep">
                23%
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.18] text-ink">
                of executive roles in the United States are held by women.
              </p>
              <p className="muted mt-7 text-[0.98rem] leading-relaxed">
                The Garden&apos;s Executive Club exists for the women already
                shattering glass ceilings everywhere — and for the ones still
                waiting for one to crack.
              </p>
              <Button href="/work/" variant="text" className="mt-8">
                Read the research
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 4 / The four rooms ────────────────────────────────────── */}
      <section className="ground-parchment on-light">
        <Container>
          <div className="py-[clamp(4rem,9vw,8rem)]">
            <SectionHead
              eyebrow="Inside the club"
              title="Four ways we show up for each other"
              lede="No keynote stages. No name-badge churn. Four small, deliberate formats that make it possible to say the difficult thing out loud."
            />

            <div className="hair-faint hair mt-[clamp(3rem,6vw,5rem)] grid gap-px border bg-[color-mix(in_oklab,var(--color-ink)_10%,transparent)] md:grid-cols-2 lg:grid-cols-12">
              {[
                {
                  n: "01",
                  title: "Core Group",
                  body: "A curated peer group of ten career contemporaries, meeting monthly to work through real problems in confidence. Each group has a dedicated Core guide — a professional facilitator experienced in executive leadership development.",
                  cls: "lg:col-span-5 lg:row-span-2",
                },
                {
                  n: "02",
                  title: "Salon Series",
                  body: "Virtual gatherings built to connect and sharpen. Conversations with people who have done it, and workshops for senior leaders who want to keep an edge.",
                  cls: "lg:col-span-4",
                },
                {
                  n: "03",
                  title: "Connection",
                  body: "Strong ties between leaders across industries. Members stay close to their Core group and close to the wider community — the part most networks never actually deliver.",
                  cls: "lg:col-span-3",
                },
                {
                  n: "04",
                  title: "Global Domination",
                  body: "Open in Georgia, with a flagship clubhouse in North Carolina, and a commitment to giving women a vehicle of impact well beyond the state lines.",
                  cls: "lg:col-span-7 lg:col-start-6",
                },
              ].map((room) => (
                <article
                  key={room.n}
                  className={`group relative flex flex-col justify-between bg-parchment p-8 transition-colors duration-500 hover:bg-bone sm:p-10 ${room.cls}`}
                >
                  <div>
                    <span className="tnum eyebrow accent">{room.n}</span>
                    <h3 className="font-display mt-6 text-[1.6rem] leading-tight tracking-[-0.012em] text-ink">
                      {room.title}
                    </h3>
                    <p className="muted mt-5 max-w-[46ch] text-[0.95rem] leading-relaxed">
                      {room.body}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="pointer-events-none mt-10 block self-end font-display text-[4.5rem] leading-[0.7] text-ink/[0.07]"
                  >
                    {room.n}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── 5 / The private network ───────────────────────────────── */}
      <section className="ground-cream on-light hair-faint border-y">
        <Container>
          <div className="grid gap-y-14 py-[clamp(4rem,9vw,8rem)] lg:grid-cols-12 lg:items-center lg:gap-x-14">
            <Figure
              slug="heritage-lounge"
              sizes="(min-width: 1024px) 34vw, 100vw"
              ratio="4/5"
              stretch
              className="lg:col-span-5"
              caption="Stone Mountain, Georgia"
            />

            <div className="lg:col-span-6 lg:col-start-7">
              <Eyebrow>By design</Eyebrow>
              <h2 className="display-sm mt-8 max-w-[18ch]">
                The only organisation built for women already seated at the
                table.
              </h2>

              <div className="prose-gec on-light mt-9">
                <p>
                  To be accepted, applicants must be C-level or a rising VP. The
                  Garden&apos;s Executive Club was designed from the ground up
                  around the reality of that seat — the decisions, the
                  isolation, and the particular weight of being the only woman
                  in the room.
                </p>
                <p>
                  Our members are senior leaders drawn from healthcare, tech,
                  finance, logistics, real estate, construction and
                  professional services. Not a list of titles. A room.
                </p>
              </div>

              <dl className="hair-faint mt-11 grid grid-cols-2 gap-x-8 gap-y-7 border-t pt-9 sm:grid-cols-3">
                {[
                  ["10", "peers per Core group"],
                  ["Monthly", "Core convenings"],
                  ["2", "flagship locations"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dt className="tnum font-display text-[1.9rem] leading-none tracking-[-0.02em] text-rose-deep">
                      {v}
                    </dt>
                    <dd className="muted mt-2.5 text-[0.8rem] leading-snug">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 6 / Press ─────────────────────────────────────────────── */}
      <section className="ground-cream on-light">
        <Container>
          <div className="grid gap-y-12 py-[clamp(4rem,9vw,8rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-3">
              <Eyebrow>In the press</Eyebrow>
              <p className="muted mt-6 hidden max-w-[26ch] text-[var(--fs-meta)] leading-relaxed lg:block">
                Written about by people who came to the room and stayed for
                dinner.
              </p>
            </div>

            <div className="lg:col-span-8 lg:col-start-5">
              <ul>
                {[
                  {
                    q: "The private groups where C-suite women go to power up.",
                    s: "Fox Business",
                  },
                  {
                    q: "A private club for women executives that helps them ascend to the top ranks — and stay there.",
                    s: "The Atlanta Journal-Constitution",
                  },
                  {
                    q: "The glass ceiling cracked a little more with the creation of The Garden's Executive Club.",
                    s: "Atlanta News First",
                  },
                  {
                    q: "The end goal is that more women make connections and gain support to make it to the very top.",
                    s: "Sister 2 Sister",
                  },
                ].map((item) => (
                  <li key={item.q} className="hair-faint border-t last:border-b">
                    <blockquote className="font-display py-9 text-[clamp(1.3rem,2.4vw,1.85rem)] leading-[1.25] tracking-[-0.012em] text-ink text-balance">
                      <span aria-hidden className="text-rose-deep">
                        &ldquo;
                      </span>
                      {item.q}
                      <span aria-hidden className="text-rose-deep">
                        &rdquo;
                      </span>
                    </blockquote>
                    <p className="eyebrow -mt-3 pb-9 !tracking-[0.18em] meta">
                      {item.s}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 7 / Member companies ──────────────────────────────────── */}
      <section className="ground-cream on-light hair-faint border-b py-[clamp(3.5rem,6vw,5.5rem)]">
        <Container>
          <p className="eyebrow mb-12 text-center !tracking-[0.2em] meta">
            Our members are senior leaders from companies including
          </p>
        </Container>
        <Marquee
          items={[
            "American Express",
            "Cartier",
            "Google",
            "HBO",
            "Hulu",
            "Johnson & Johnson",
            "Spotify",
            "Verizon",
            "Walmart",
            "WeWork",
            "Yext",
          ]}
        />
      </section>

      {/* ── 8 / The work ──────────────────────────────────────────── */}
      <section className="ground-cream on-light">
        <Container>
          <div className="grid gap-y-14 py-[clamp(4rem,9vw,8rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-3">
              <SectionHead
                eyebrow="Why our work matters"
                title="The research behind the room"
                lede="Networking changes nothing if the structural problem is untouched. These are the five threads we keep pulling."
                action={
                  <Button href="/work/" variant="text">
                    See all of our work
                  </Button>
                }
              />
            </div>

            <div className="lg:col-span-8 lg:col-start-5">
              {workTopics.map((t) => (
                <IndexRow
                  key={t.n}
                  n={t.n}
                  title={t.title}
                  summary={t.summary}
                  href={`/work/${t.slug}/`}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── 8b / Bookings & the diary ────────────────────────────── */}
      <section className="ground-emerald on-dark">
        <Container>
          <div className="py-[clamp(4rem,9vw,7rem)]">
            <SectionHead
              eyebrow="The diary & the book"
              title="Three ways in"
              lede="The next confirmed gathering, Dr. Ebony OH for a stage or a fireside, and the clubhouse itself for an evening of your own."
            />

            <div className="mt-14 grid gap-px border hair border bg-cream/20 lg:grid-cols-3">
              {[
                {
                  k: "18 Oct 2026",
                  t: "The Magnolia",
                  b: "The Luxury Tea Society Brunch. Two women, two industries, one table — Dr. Ebony OH with Carla Stephens of Rockstar Trucking Corporation.",
                  href: "/the-magnolia/",
                  cta: "Request an invitation",
                },
                {
                  k: "Booking EPK",
                  t: "Book Dr. Ebony OH",
                  b: "Keynotes, fireside chats, panels, summits and private experiences — entrepreneur, CEO, Seed Strategist® and author.",
                  href: "/epk/",
                  cta: "Read the EPK",
                },
                {
                  k: "The clubhouse",
                  t: "Book the venue",
                  b: "6,000 square feet across two storeys on two acres in Stone Mountain — five rooms, taken one at a time.",
                  href: "/venue/",
                  cta: "Check a date",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  prefetch={false}
                  href={item.href}
                  className="group flex flex-col justify-between gap-9 bg-teal-soft p-8 transition-colors duration-500 hover:bg-teal-deep sm:p-9"
                >
                  <div>
                    <p className="eyebrow !text-[0.58rem] meta">{item.k}</p>
                    <h3 className="font-display mt-5 text-[1.55rem] leading-tight tracking-[-0.012em]">
                      {item.t}
                    </h3>
                    <p className="muted mt-4 text-[0.93rem] leading-relaxed">
                      {item.b}
                    </p>
                  </div>
                  <span className="eyebrow flex items-center justify-between gap-4 !tracking-[0.16em] text-cream">
                    {item.cta}
                    <span
                      aria-hidden
                      className="text-cream-soft transition-transform duration-500 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── 9 / Closing ───────────────────────────────────────────── */}
      <section className="ground-cream on-light hair-faint border-t">
        <Container>
          <div className="grid items-center gap-y-12 py-[clamp(4rem,9vw,8rem)] lg:grid-cols-12 lg:gap-x-10">
            <Figure
              slug="carriage"
              sizes="(min-width: 1024px) 30vw, 100vw"
              ratio="5/4"
              stretch
              className="lg:col-span-5"
              caption="Within two miles of Stone Mountain Park's West Gate"
            />
            <div className="lg:col-span-6 lg:col-start-7">
              <Eyebrow>Est. {site.founded}</Eyebrow>
              <h2 className="display-sm mt-8 max-w-[16ch]">
                Eight generations is too long to wait.
              </h2>
              <p className="lede measure mt-8">
                The Garden&apos;s Executive Club was founded to drive women
                forward into positions of power — and to keep them there. We are
                not waiting eight generations. We are building the room now.
              </p>
              <div className="mt-11 flex flex-wrap items-center gap-x-9 gap-y-4">
                <Button href="/membership/" variant="rose">
                  Executive membership
                </Button>
                <Link
                  prefetch={false}
                  href="/our-history/"
                  className="eyebrow link-underline !tracking-[0.16em] muted hover:text-rose-deep"
                >
                  Read our history
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ClosingCta />

      <EventPopup />
    </>
  );
}
