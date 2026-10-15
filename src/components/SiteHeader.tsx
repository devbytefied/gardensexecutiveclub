"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation, site } from "@/lib/site";
import { Container } from "./ui";
import { Crest, Wordmark } from "./Mark";
import {X, Menu} from 'lucide-react'

export function SiteHeader() {
  const pathname = usePathname();
  // Keyed on the route so a navigation remounts the overlay closed, rather
  // than syncing it back with an effect after the fact.
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState(pathname);
  if (route !== pathname) {
    setRoute(pathname);
    if (open) setOpen(false);
  }

  // Lock the page behind the overlay and support Escape.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="eyebrow sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-rose-deep focus:px-5 focus:py-3 focus:text-cream"
      >
        Skip to content
      </a>

      <header className="sticky  top-0 z-50 border-b hair bg-cream/92 backdrop-blur-[3px]">
        <Container className="">
          <div className="flex h-[4.5rem] items-center justify-between gap-6">
            <Link
              prefetch={false}
              href="/"
              className="group flex items-center "
              aria-label={`${site.name} — home`}
            >
              <Crest
                on="light"
                className="h-11 -ml-5 w-auto shrink-0 transition-transform duration-700 [transition-timing-function:var(--ease-editorial)] group-hover:scale-[1.04]"
              />
              <Wordmark className="text-[1.15rem] -ml-2 text-ink" subtitle="Executive Club" />
            </Link>

            <div className="flex items-center gap-7">
              <nav aria-label="Primary" className="hidden lg:block">
                <ul className="flex items-center gap-7">
                  {navigation.map((group) => (
                    <li key={group.label}>
                      <Link
                        prefetch={false}
                        href={group.href ?? group.children[0]?.href ?? "/"}
                        className="eyebrow link-underline !tracking-[0.12em] muted hover:text-rose-deep"
                      >
                        {group.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <Link
                prefetch={false}
                href="/apply/"
                className="eyebrow hidden !tracking-[0.16em] bg-rose-deep px-5 py-3 text-cream transition-colors duration-500 hover:bg-rose sm:inline-block"
              >
             Membership
              </Link>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="site-index"
                className="eyebrow !tracking-[0.18em] flex items-center gap-2.5 muted hover:text-rose-deep lg:hidden"
              >
                {open ? <X/> : <Menu/>}
                
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Full-screen index */}
      <div
        id="site-index"
        hidden={!open}
        className="fade-in fixed inset-0 z-40 overflow-y-auto bg-cream pt-[4.5rem] lg:hidden"
      >
        <Container>
          <nav aria-label="Site index" className="py-14">
            {navigation.map((group) => (
              <section key={group.label} className="mb-12 last:mb-0">
                <p className="eyebrow accent mb-5">{group.label}</p>
                <ul className="hair-faint border-t">
                  {group.children.map((child) => (
                    <li key={child.href} className="hair-faint border-b">
                      <Link
                        prefetch={false}
                        href={child.href}
                        className="group flex items-baseline justify-between gap-6 py-4"
                      >
                        <span className="font-display text-[1.5rem] leading-tight text-ink">
                          {child.label}
                        </span>
                        {child.note ? (
                          <span className="muted text-right text-[var(--fs-meta)]">
                            {child.note}
                          </span>
                        ) : (
                          <span aria-hidden className="accent opacity-0 transition-opacity group-hover:opacity-100">
                            →
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>
        </Container>
      </div>
    </>
  );
}
