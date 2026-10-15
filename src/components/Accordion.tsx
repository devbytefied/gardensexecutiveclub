"use client";

import { useId, useState } from "react";

/**
 * Disclosure list. Uses native <details>/<summary> so it works with no
 * JavaScript at all — the state hook is only there to allow one panel open
 * at a time and to drive the plus-to-minus rotation.
 */
export function Accordion({
  items,
  className = "",
}: {
  items: { q: string; a: React.ReactNode }[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <div className={className}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <details
            key={item.q}
            name={uid}
            open={isOpen}
            onToggle={(e) => setOpen(e.currentTarget.open ? i : null)}
            className="group border-t hair px-6 last:border-b sm:px-8"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-7 [&::-webkit-details-marker]:hidden">
              <span className="font-display text-[1.2rem] leading-snug tracking-[-0.008em] sm:text-[1.35rem]">
                {item.q}
              </span>
              <span
                aria-hidden
                className="relative mt-1.5 block size-4 shrink-0 accent"
              >
                <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
                <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current transition-transform duration-500 [transition-timing-function:var(--ease-editorial)] group-open:scale-y-0" />
              </span>
            </summary>
            <div className="muted pb-9 text-[0.98rem] leading-relaxed [&>p]:max-w-[62ch]">
              {item.a}
            </div>
          </details>
        );
      })}
    </div>
  );
}
