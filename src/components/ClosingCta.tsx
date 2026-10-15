import { site } from "@/lib/site";
import { Button, Container, Eyebrow } from "./ui";

/**
 * The closing band. Uses the club's own three words, so it doubles as a
 * sign-off rather than a generic "get in touch" strip.
 */
export function ClosingCta({
  title = "Request an invitation",
  lede = "Membership is by invitation and by application. If you are a C-level executive, a founder, or a rising VP — and the work matters to you — we should talk.",
  primary = { label: "Apply for Membership", href: "/apply/" },
  secondary = { label: "Nominate someone", href: "/nominate/" },
}: {
  title?: string;
  lede?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="ground-emerald on-dark relative overflow-hidden">
      {/* Oversized crest watermark, in the brand's own mark. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative watermark */}
      <img
        src="/brand/crest-cream.png"
        alt=""
        aria-hidden
        width={256}
        height={142}
        className="pointer-events-none absolute -right-20 -bottom-16 w-[28rem] opacity-[0.06]"
      />

      <Container className="relative">
        <div className="py-[clamp(4.5rem,10vw,9rem)]">
          <Eyebrow>{site.motto.join(" / ")}</Eyebrow>

          <div className="mt-9 grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
            <h2 className="display-sm max-w-[17ch] text-cream lg:col-span-7">
              {title}
            </h2>

            <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <p className="muted text-[0.98rem] leading-relaxed">{lede}</p>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Button href={primary.href} variant="outline-light">
                  {primary.label}
                </Button>
                <Button href={secondary.href} variant="outline-light">
                  {secondary.label}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
