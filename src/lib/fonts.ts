import { Instrument_Sans, Instrument_Serif } from "next/font/google";

/**
 * Typography layer.
 *
 * The intended pairing is Canela (display) + Söhne (text) — both commercial
 * Klim Type Foundry licences. Because those can't be resolved at build time,
 * they're declared as plain @font-face rules in globals.css and simply sit
 * ahead of the fallback in the font stack. Drop the licensed files into
 * `public/fonts/` and they take over with no code change and no rebuild of
 * this file:
 *
 *   public/fonts/Canela-Regular.woff2
 *   public/fonts/Canela-Medium.woff2        (optional)
 *   public/fonts/Sohne-Regular.woff2
 *   public/fonts/Sohne-Medium.woff2         (optional)
 *
 * Until then Instrument Serif + Instrument Sans carry the same roles. They are
 * self-hosted and preloaded by next/font, so the site never ships a broken
 * stack or waits on a 404 to discover it has no licensed font.
 */

export const displayFont = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const textFont = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const fontVariables = `${displayFont.variable} ${textFont.variable}`;
