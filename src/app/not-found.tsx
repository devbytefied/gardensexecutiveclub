import type { Metadata } from "next";
import Link from "next/link";
import { Button, Container, Eyebrow } from "@/components/ui";
import { navigation } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="ground-ink on-dark relative isolate overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative watermark */}
      <img
        src="/brand/crest-cream.png"
        alt=""
        aria-hidden
        width={256}
        height={142}
        className="pointer-events-none absolute -right-24 -bottom-20 w-[30rem] opacity-[0.05]"
      />

      <Container className="relative">
        <div className="flex min-h-[70svh] flex-col justify-center py-[clamp(4rem,10vw,8rem)]">
          <Eyebrow>404</Eyebrow>

          <h1 className="display mt-9 max-w-[14ch] text-cream">
            This page was never in the room.
          </h1>

          <p className="lede measure mt-8">
            The link is broken, or the page has moved. Everything the club has is
            listed below — and if you cannot find what you were looking for, ask
            us and we will point you at it.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-x-9 gap-y-4">
            <Button href="/" variant="rose">
              Return home
            </Button>
            <Button href="/contact/" variant="outline-light">
              Ask us directly
            </Button>
          </div>

          <nav aria-label="Site index" className="mt-[clamp(3.5rem,7vw,6rem)]">
            <ul className="grid gap-x-10 gap-y-10 border-t hair-faint pt-12 sm:grid-cols-2 lg:grid-cols-3">
              {navigation.map((group) => (
                <li key={group.label}>
                  <p className="eyebrow mb-5 meta">{group.label}</p>
                  <ul className="space-y-2.5">
                    {group.children.map((child) => (
                      <li key={child.href}>
                        <Link prefetch={false}
                          href={child.href}
                          className="link-underline text-[0.92rem] muted hover:accent"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </div>
  );
}
