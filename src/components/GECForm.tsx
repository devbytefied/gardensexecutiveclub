"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { mailtoFallback } from "@/lib/mail-client";

/* ------------------------------------------------------------------ *
 * Field types
 * ------------------------------------------------------------------ */

export type Field =
  | { name: string; label: string; type: "text"; required?: boolean; autoComplete?: string; placeholder?: string; span?: 1 | 2 }
  | { name: string; label: string; type: "email"; required?: boolean; autoComplete?: string; placeholder?: string; span?: 1 | 2 }
  | { name: string; label: string; type: "tel"; required?: boolean; autoComplete?: string; placeholder?: string; span?: 1 | 2 }
  | { name: string; label: string; type: "date"; required?: boolean; help?: string; span?: 1 | 2 }
  | { name: string; label: string; type: "time"; required?: boolean; span?: 1 | 2 }
  | { name: string; label: string; type: "textarea"; required?: boolean; rows?: number; placeholder?: string; span?: 1 | 2 }
  | { name: string; label: string; type: "select"; required?: boolean; options: { value: string; label: string }[]; span?: 1 | 2 }
  | { name: string; label: string; type: "checkbox"; required?: boolean; help?: string; span?: 1 | 2 };

type Status = "idle" | "sending" | "sent" | "error";

/** The sending state is held for at least this long, so a fast failure still reads as a response. */
const MIN_SENDING_MS = 700;

/* ------------------------------------------------------------------ *
 * GECForm
 * ------------------------------------------------------------------ */

/**
 * Whether the client has taken over, without a setState-in-effect.
 *
 * `useSyncExternalStore` is the honest way to ask this: the server snapshot
 * says false, the browser snapshot says true, and React reconciles the two
 * after hydration on its own.
 */
const noopSubscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

export function GECForm({
  fields,
  submitLabel,
  subject,
  consent,
  successTitle = "Thank you",
  successBody,
  tone = "dark",
}: {
  fields: Field[];
  submitLabel: string;
  /** Becomes the email subject and the mailto: subject. */
  subject: string;
  consent?: ReactNode;
  successTitle?: string;
  successBody: string;
  tone?: "dark" | "light";
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [failure, setFailure] = useState("");
  const hydrated = useHydrated();
  const formRef = useRef<HTMLFormElement>(null);
  /**
   * A confirmation that renders below the fold is a confirmation nobody sees.
   * These forms are thirteen fields long; the outcome has to come to the
   * reader, not wait for them to scroll back up to find it.
   */
  const outcomeRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  /** Bring the outcome into view and move focus to it, for everyone. */
  function revealOutcome() {
    const node = outcomeRef.current;
    if (!node) return;
    node.scrollIntoView({ block: "center", behavior: "smooth" });
    node.focus({ preventScroll: true });
  }

  // Runs on arrival, whichever outcome it is.
  useEffect(() => {
    if (status === "sent" || status === "error") revealOutcome();
  }, [status]);

  const onDark = tone === "dark";

  function validate(data: FormData): Record<string, string> {
    const next: Record<string, string> = {};
    for (const f of fields) {
      if (f.type === "checkbox") {
        if (f.required && !data.get(f.name)) next[f.name] = "Required";
        continue;
      }
      const raw = String(data.get(f.name) ?? "").trim();
      if (f.required && !raw) {
        next[f.name] = "This field is required";
      } else if (f.type === "email" && raw && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw)) {
        next[f.name] = "Enter a valid email address";
      }
    }
    return next;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    const data = new FormData(formRef.current);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      // Move focus to the first problem so keyboard users are not stranded.
      const first = Object.keys(found)[0];
      formRef.current.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    // Honeypot — bots fill it, humans never see it.
    if (String(data.get("company_website") ?? "").trim()) return;

    setStatus("sending");
    setFailure("");

    /**
     * A failed send can come back in a few milliseconds, which would make the
     * button look like it was never pressed. Holding the sending state for a
     * beat guarantees the click is acknowledged either way.
     */
    const startedAt = Date.now();

    /**
     * Fields are sent with their visible labels rather than their input names,
     * because the label is what the club reads in the inbox — "Who is booking?"
     * tells you more than "engagement".
     */
    const payload = {
      subject,
      page: pathname ?? "",
      replyTo: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      company_website: String(data.get("company_website") ?? "").trim(),
      fields: fields
        .filter((f) => f.type !== "checkbox" || data.get(f.name))
        .map((f) => ({
          label: f.label.replace(/\s*\*$/, ""),
          value: String(data.get(f.name) ?? "").trim(),
        }))
        .filter((f) => f.value),
    };

    try {
      // Trailing slash matches the app router's trailingSlash setting, so the
      // request never pays for a 308 redirect.
      const res = await fetch("/api/inquiry/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        // A request that hangs must not leave the form stuck on "Sending…"
        // forever. Fifteen seconds is well past a healthy SMTP round trip.
        signal: AbortSignal.timeout(15_000),
      });

      const result = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      const hold = async () => {
        const elapsed = Date.now() - startedAt;
        if (elapsed < MIN_SENDING_MS) {
          await new Promise((r) => setTimeout(r, MIN_SENDING_MS - elapsed));
        }
      };

      if (!res.ok || !result?.ok) {
        await hold();
        setStatus("error");
        setFailure(
          result?.error ?? "Something went wrong sending your message.",
        );
        return;
      }

      await hold();
      setStatus("sent");
      formRef.current.reset();
    } catch {
      // Offline, blocked, or the endpoint is unreachable.
      setStatus("error");
      setFailure("We could not reach the server.");
    }
  }

  /* --- Success ------------------------------------------------------ */
  if (status === "sent") {
    return (
      <div
        ref={outcomeRef}
        role="status"
        className={`scroll-mt-32 border p-9 outline-none ${
          onDark ? "hair-strong border text-cream" : "hair-strong border text-ink"
        }`}
      >
        <p className="eyebrow accent">Received</p>
        <h3 className="font-display mt-5 text-[1.75rem] leading-tight tracking-[-0.012em]">
          {successTitle}
        </h3>
        <p className={`mt-4 max-w-[46ch] text-[0.97rem] leading-relaxed ${onDark ? "muted" : "opacity-70"}`}>
          {successBody}
        </p>
      </div>
    );
  }

  /* --- Form --------------------------------------------------------- */

  /**
   * The `action` is the safety net. If this component never hydrates — a stale
   * tab, a blocked script, an old cached chunk — the browser posts the form
   * itself and the endpoint redirects to the thank-you page. Without it the
   * browser does a native GET, reloads the page, and the button looks inert.
   */
  const labels = fields.map((f) => ({
    name: f.name,
    label: f.label.replace(/\s*\*$/, ""),
  }));

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      action="/api/inquiry/"
      method="post"
      noValidate
      data-form-state={status}
      data-hydrated={hydrated ? "yes" : "no"}
      className="w-full"
    >
      {/* Carries the form's identity through a no-JS post. */}
      <input type="hidden" name="_subject" value={subject} />
      <input type="hidden" name="_page" value={pathname ?? ""} />
      <input type="hidden" name="_labels" value={JSON.stringify(labels)} />

      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {fields.map((f) => {
          const id = `f-${f.name}`;
          const invalid = Boolean(errors[f.name]);
          const span = f.span === 2 ? "sm:col-span-2" : "";

          if (f.type === "checkbox") {
            return (
              <div key={f.name} className={`sm:col-span-2 ${span}`}>
                <label className="flex cursor-pointer items-start gap-3.5 text-[0.93rem] leading-relaxed">
                  <input
                    type="checkbox"
                    name={f.name}
                    id={id}
                    aria-invalid={invalid}
                    className="mt-1 size-4 shrink-0 accent-rose-deep"
                  />
                  <span>
                    {f.label}
                    {f.help ? (
                      <span className={`mt-1.5 block text-xs ${onDark ? "meta" : "meta"}`}>
                        {f.help}
                      </span>
                    ) : null}
                  </span>
                </label>
                {invalid ? <FieldError onDark={onDark}>{errors[f.name]}</FieldError> : null}
              </div>
            );
          }

          return (
            <div key={f.name} className={span}>
              <label className="field-label" htmlFor={id}>
                {f.label}
                {f.required ? <span className="accent"> *</span> : null}
              </label>

              {f.type === "textarea" ? (
                <textarea
                  id={id}
                  name={f.name}
                  rows={f.rows ?? 5}
                  required={f.required}
                  placeholder={"placeholder" in f ? f.placeholder : undefined}
                  aria-invalid={invalid}
                  aria-describedby={invalid ? `${id}-err` : undefined}
                  className="field resize-y"
                />
              ) : f.type === "select" ? (
                <select
                  id={id}
                  name={f.name}
                  required={f.required}
                  aria-invalid={invalid}
                  aria-describedby={invalid ? `${id}-err` : undefined}
                  className="field cursor-pointer appearance-none bg-[length:0.6rem] bg-[right_0.2rem_center] bg-no-repeat pr-6"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%23b2544d' stroke-width='1.2'/%3E%3C/svg%3E\")",
                  }}
                >
                  <option value="">Please select…</option>
                  {f.options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={id}
                  name={f.name}
                  type={f.type}
                  required={f.required}
                  autoComplete={"autoComplete" in f ? f.autoComplete : undefined}
                  placeholder={"placeholder" in f ? f.placeholder : undefined}
                  aria-invalid={invalid}
                  aria-describedby={invalid ? `${id}-err` : undefined}
                  className="field"
                />
              )}

              {invalid ? <FieldError id={`${id}-err`} onDark={onDark}>{errors[f.name]}</FieldError> : null}
            </div>
          );
        })}
      </div>

      {/* Honeypot — visually and programmatically hidden from users */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="f-hp">Leave this field empty</label>
        <input id="f-hp" type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      {consent ? (
        <p className={`mt-9 max-w-[58ch] text-xs leading-relaxed ${onDark ? "meta" : "opacity-55"}`}>
          {consent}
        </p>
      ) : null}

      {status === "error" ? (
        /**
         * A failed send has to be impossible to miss. It used to render in a
         * hardcoded peach that was 2.2:1 on cream — invisible on every
         * light-ground page, which made a failed form look like an inert one.
         */
        <div
          ref={outcomeRef}
          role="alert"
          tabIndex={-1}
          className={`mt-9 scroll-mt-32 border-l-2 py-5 pl-5 outline-none ${
            onDark ? "border-rose-light bg-cream/5" : "border-rose-deep bg-parchment"
          }`}
        >
          <p className={`text-[0.95rem] font-medium ${onDark ? "text-rose-light" : "text-rose-deep"}`}>
            That did not send.
          </p>
          <p className={`mt-2 text-[0.9rem] leading-relaxed ${onDark ? "muted" : "text-ink-soft"}`}>
            {failure} You can also reach us directly at{" "}
            <a href={mailtoFallback(subject, "")} className="link-underline">
              info@gardensexecutiveclub.com
            </a>
            .
          </p>
        </div>
      ) : null}

      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="eyebrow bg-rose-deep px-9 py-4 text-cream transition-colors duration-500 hover:bg-rose hover:text-cream disabled:cursor-wait disabled:text-cream/70"
        >
          {status === "sending" ? "Sending…" : submitLabel}
        </button>
        <p className={`text-xs ${onDark ? "meta" : "meta"}`}>
          We reply to every submission personally.
        </p>
      </div>

      {/*
       * Says out loud whether the page is live. If scripts are blocked the
       * form still submits — the action sees to that — but a visitor should
       * not have to guess which of the two paths they are on.
       */}
      <p className="mt-4 text-xs meta">
        {hydrated
          ? "Secure submission — your message goes straight to the club."
          : "Secure submission — this form sends whether or not scripts are blocked."}
      </p>
    </form>
  );
}

function FieldError({
  children,
  id,
  onDark,
}: {
  children: React.ReactNode;
  id?: string;
  onDark?: boolean;
}) {
  return (
    <p
      id={id}
      className={`mt-2.5 flex items-start gap-1.5 text-xs font-medium ${
        onDark ? "text-rose-light" : "text-rose-deep"
      }`}
    >
      <span aria-hidden>▲</span>
      {children}
    </p>
  );
}
