import type { ReactNode } from "react";
import { Container, Eyebrow } from "./ui";

/**
 * Interior page header. Deliberately quiet — the page title does the work
 * and photography stays out of the way unless a page passes `media`.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
  aside,
}: {
  eyebrow?: string;
  title: string;
  lede?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="pt-[clamp(7rem,14vw,11rem)] pb-[clamp(3.5rem,7vw,6rem)]">
      <Container>
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            {eyebrow ? <Eyebrow className="mb-8">{eyebrow}</Eyebrow> : null}
            <h1 className="display max-w-[16ch] text-balance">{title}</h1>
            {lede ? (
              <p className="lede mt-9 max-w-[56ch]">{lede}</p>
            ) : null}
            {children ? <div className="mt-11">{children}</div> : null}
          </div>
          {aside ? (
            <div className="lg:col-span-4 lg:col-start-9 lg:self-end">{aside}</div>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
