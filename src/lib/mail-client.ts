/**
 * The one thing the browser needs to know about mail: how to reach us when a
 * submission cannot be sent from here.
 *
 * Deliberately tiny and deliberately free of secrets. The mailbox itself lives
 * in src/lib/mail.ts, which is server-only.
 */

export function mailtoFallback(subject: string, body: string): string {
  return `mailto:info@gardensexecutiveclub.com?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}