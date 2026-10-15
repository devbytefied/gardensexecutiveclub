import Link from "next/link";
import { navigation, site } from "@/lib/site";
import { Container } from "./ui";
import { Lockup } from "./Mark";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="ground-ink on-dark hair-faint border-t">
      <Container>
        <div className="grid gap-y-14 pt-[clamp(3.5rem,7vw,6rem)] lg:grid-cols-12 lg:gap-x-10">
          {/* Identity */}
          <div className="lg:col-span-4">
            <Lockup
              on="dark"
              className="h-[7.5rem] w-auto"
            />
            <p className="font-display mt-7 text-[1.6rem] leading-[1.14] tracking-[-0.015em] text-cream">
              {site.motto.join(" / ")}
            </p>
            <address className="muted mt-7 text-[var(--fs-meta)] not-italic leading-relaxed">
              {site.legalName}
              <br />
              {site.address.line1}
              <br />
              {site.address.line2}
            </address>
          </div>

          {/* Index */}
          <nav aria-label="Footer" className="lg:col-span-7 lg:col-start-6">
            <div className="grid gap-y-10 sm:grid-cols-3">
              {navigation.map((group) => (
                <div key={group.label}>
                  <p className="eyebrow mb-5 !tracking-[0.18em] meta">
                    {group.label}
                  </p>
                  <ul className="space-y-2.5">
                    {group.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          prefetch={false}
                          href={child.href}
                          className="link-underline text-[0.9rem] muted hover:text-rose-light"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        {/* Base line */}
        <div className="hair-faint mt-[clamp(3rem,6vw,5rem)] border-t pt-8">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <a
                href={`mailto:${site.contact.email}`}
                className="eyebrow link-underline !tracking-[0.16em] muted hover:text-rose-light"
              >
                {site.contact.email}
              </a>
              <a
                href={site.contact.phoneHref}
                className="eyebrow link-underline !tracking-[0.16em] muted hover:text-rose-light"
              >
                {site.contact.phoneDisplay}
              </a>
            </div>

            <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="eyebrow link-underline !tracking-[0.16em] muted hover:text-rose-light"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[var(--fs-meta)] meta">
              © {year} {site.legalName.replace(/\.$/, "")}. All rights reserved.
            </p>
            <ul className="flex gap-6">
              <li>
                <Link
                  prefetch={false}
                  href="/privacy/"
                  className="link-underline text-[var(--fs-meta)] meta hover:text-rose-light"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  prefetch={false}
                  href="/terms/"
                  className="link-underline text-[var(--fs-meta)] meta hover:text-rose-light"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
