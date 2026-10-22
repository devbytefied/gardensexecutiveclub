import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ClosingCta } from "@/components/ClosingCta";
import { Button, Container, Eyebrow, Quote } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank you",
  description:
    "Your message has reached The Garden's Executive Club. Someone replies to every submission personally.",
  alternates: { canonical: "/thank-you/" },
  robots: { index: false, follow: true },
};

/**
 * Where a submission without JavaScript lands.
 *
 * A form post with no client-side handling has to go somewhere a person can
 * read, which is this page rather than a JSON blob. `?status=error` means the
 * send did not go through, and the page says so instead of thanking someone
 * for a message nobody received.
 */
export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const failed = status === "error";

  return (
    <>
      <PageHeader
        eyebrow={failed ? "Not sent" : "Received"}
        title={
          failed
            ? "That message did not reach us"
            : "Your message has landed"
        }
        lede={
          failed
            ? "Something went wrong on our side, and we would rather tell you than let you think it arrived. Please try once more, or write to us directly."
            : "Thank you. A person reads every message that comes through this site, and you will hear back personally."
        }
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href="/contact/" variant="rose">
            Try again
          </Button>
          <a
            href={`mailto:${site.contact.email}`}
            className="eyebrow link-underline !tracking-[0.16em] muted hover:text-rose-deep"
          >
            Email us directly
          </a>
        </div>
      </PageHeader>

      <section className="ground-emerald on-dark">
        <Container>
          <div className="grid gap-y-12 py-[clamp(3.5rem,7vw,6rem)] lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-6">
              <Eyebrow>What happens next</Eyebrow>
              <Quote className="mt-8" attribution="On replies">
                Membership and booking enquiries are answered by a person, usually
                within two business days — and never by an autoresponder.
              </Quote>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <ul className="border-t hair">
                {[
                  ["We read it", "Someone in the club reads every submission. Nothing is filtered by a scoring model."],
                  ["We reply", "Personally, to the address you gave us — so check that your email is spelled right."],
                  ["Nothing is automatic", "No payment is taken through this site, and no card details are ever asked for."],
                ].map(([t, b]) => (
                  <li key={t} className="border-b hair py-6">
                    <p className="font-display text-[1.2rem] leading-snug">{t}</p>
                    <p className="muted mt-2.5 text-[0.9rem] leading-relaxed">{b}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="ground-cream on-light">
        <Container>
          <div className="flex flex-wrap items-center gap-x-9 gap-y-4 py-[clamp(3.5rem,7vw,6rem)]">
            <p className="text-[0.95rem] meta">While you wait:</p>
            <Link
              href="/events/"
              className="eyebrow link-underline !tracking-[0.16em] hover:text-rose-deep"
            >
              Upcoming events
            </Link>
            <Link
              href="/membership/"
              className="eyebrow link-underline !tracking-[0.16em] hover:text-rose-deep"
            >
              Executive membership
            </Link>
            <Link
              href="/the-magnolia/"
              className="eyebrow link-underline !tracking-[0.16em] hover:text-rose-deep"
            >
              The Magnolia, 15 November
            </Link>
          </div>
        </Container>
      </section>

      <ClosingCta />
    </>
  );
}