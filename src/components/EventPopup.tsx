"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Eyebrow } from "./ui";
import { X } from "lucide-react";

/**
 * The event announcement, fired on page load as it was on the old site.
 *
 * A page-load modal is a genuinely hostile pattern, so this one is built to
 * be survivable:
 *   • real dialog semantics, labelled
 *   • focus moves in on open and returns to the trigger on close
 *   • focus is trapped while open
 *   • Escape and backdrop click both dismiss
 *   • page scroll is locked
 *   • entrance animation is skipped under prefers-reduced-motion
 *   • dismissal is remembered for the session, so navigating back does not
 *     re-block someone who already closed it
 *
 * It appears on the homepage only, and it disappears with the event.
 */

const EVENT_URL = "https://www.eventbrite.com/e/2003689533332?aff=oddtdtcreator";
const SESSION_KEY = "gec-event-dismissed";

const EVENT = {
  eyebrow: "You are invited",
  title: "A curated table for women in business, leadership & ownership",
  meta: "The Magnolia Luxury Tea Society Brunch / Sunday 15 November 2026",
  body: "Hosted by Dr. Ebony OH. Fine tea, elevated conversation and live music, 2:00 – 5:00 PM at the clubhouse.",
  cta: "Request your invitation",
};

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function EventPopup() {
  const [open, setOpen] = useState(true);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusTo = useRef<HTMLElement | null>(null);

  const dismiss = useCallback((remember = true) => {
    setOpen(false);
    if (remember) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* private mode — the popup simply reappears next visit, which is fine */
      }
    }
  }, []);

  // Decide on open, once, after mount so the static HTML never ships the
  // dialog and a crawler or a no-JS visitor is not affected by it.
  useEffect(() => {
    let already: string | null = null;
    try {
      already = sessionStorage.getItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
    if (already) return;

    // Let the page settle before interrupting.
    const t = window.setTimeout(() => setOpen(true), 700);
    return () => window.clearTimeout(t);
  }, []);

  // Lock scroll, manage focus, trap Tab, handle Escape.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    returnFocusTo.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        dismiss();
        return;
      }
      if (e.key !== "Tab") return;

      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes?.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusTo.current?.focus?.();
    };
  }, [open, dismiss]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      {/* Backdrop */}
      <div
        aria-hidden
        className="fade-in absolute inset-0 bg-teal-deep/70 backdrop-blur-[3px]"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-title"
        aria-describedby="event-body"
        className="rise ground-cream on-light relative w-full max-w-4xl overflow-hidden border hair-strong"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={() => dismiss()}
          className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center bg-cream/90 muted transition-colors duration-300 hover:text-rose-deep"
        >
          <span className="sr-only">Close this announcement</span>
          <X />
        </button>

        <div className="grid sm:grid-cols-2">
          <div className="relative h-full w-full aspect-square">
            <Image
              src="/new-event-popup.jpeg"
              alt="The Magnolia Luxury Tea Society Brunch — Sunday 15 November 2026, hosted by Dr. Ebony OH"
              fill
              sizes="(min-width: 640px) 22rem, 92vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-10">
            <Eyebrow>{EVENT.eyebrow}</Eyebrow>
            <h2
              id="event-title"
              className="font-display mt-5 text-2xl leading-[1.1] tracking-[-0.015em] text-ink"
            >
              {EVENT.title}
            </h2>
            <p className="accent mt-4 text-(--fs-eyebrow)! tracking-wider text-sm uppercase">
              {EVENT.meta}
            </p>
            <p
              id="event-body"
              className="muted mt-6 text-[0.95rem] leading-relaxed"
            >
              {EVENT.body}
            </p>

            <div className="mt-9 flex flex-col items-center gap-3 text-center">
              <Button className="w-full justify-center" href={EVENT_URL} variant="rose" external>
                Reserve your seat
              </Button>
              <Button className="w-full justify-center" href="https://event.gardensexecutiveclub.com/" variant="outline" external>
                {EVENT.cta}
              </Button>
            </div>

            <p className="mt-4 text-sm meta">
              Registration is handled on the event site.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
