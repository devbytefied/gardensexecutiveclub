/**
 * The club's gathering calendar, as data.
 *
 * Dates are deliberately not hard-coded to a year where possible: `season`
 * describes when in the calendar year an event falls, so a page can be
 * published before a date is fixed. `date` is only set where the date is
 * genuinely known, and is a single field to update.
 */

export type ClubEvent = {
  slug: string;
  title: string;
  kind: "flagship" | "gathering" | "intimate";
  season: string;
  date?: string;
  time?: string;
  /**
   * A real, confirmed calendar date in ISO form. Only set where the date is
   * genuinely fixed: the index sorts by it and marks the event as upcoming, so
   * an entry without one is a recurring gathering rather than a diary item.
   */
  dateISO?: string;
  capacity?: string;
  /**
   * Overrides the generated route. The Magnolia has a hand-built page with the
   * full invitation treatment, so it lives at the top level and the generated
   * route is not published.
   */
  href?: string;
  standfirst: string;
  description: string[];
  includes: string[];
  cadence: string;
  image: string;
  imageCaption: string;
  /** object-position override for the hero crop, e.g. "50% 30%". */
  imagePosition?: string;
};

export const clubEvents: ClubEvent[] = [
  {
    slug: "the-magnolia",
    title: "The Magnolia",
    kind: "intimate",
    season: "Autumn",
    date: "Sunday, 15 November 2026",
    time: "2:00 PM – 5:00 PM",
    dateISO: "2026-10-18",
    capacity: "Curated guest list, by invitation",
    href: "/the-magnolia/",
    standfirst:
      "A curated table for women in business, leadership & ownership. The Magnolia Luxury Tea Society Brunch, by Ebony OH.",
    description: [
      "The Magnolia is our most intimate gathering of the year, and the only one with a hard cap on the guest list.",
      "One conversation is carried by the whole room for the whole afternoon. There are no panels and no name badges — just women of consequence, seated together, going somewhere with a single idea.",
      "On 15 November the room gathers women of consequence for one conversation carried by the whole table: ownership, contracts, scale and legacy.",
    ],
    includes: [
      "Fine tea, elevated conversation and live music",
      "An intimate fireside chat with Dr. Ebony OH",
      "Wealth through ownership, securing contracts, scaling and legacy",
      "The Magnolia Luxury Tea Society Brunch at the clubhouse",
    ],
    cadence: "Annually",
    image: "magnolia-brunch",
    imageCaption: "The Magnolia Luxury Tea Society Brunch — Sunday 15 November 2026",
  },
  {
    slug: "annual-dinner",
    title: "The Annual Dinner",
    kind: "flagship",
    season: "Autumn",
    capacity: "The club's largest evening of the year",
    standfirst:
      "One night a year when the whole club is in one room, and the work of the year is recognised properly.",
    description: [
      "The Annual Dinner is the one evening where every tier of membership is in the same room, at the same table, without a programme to follow.",
      "It is also where the club recognises its members' professional achievements and personal milestones — announced properly, by name, in front of the people who witnessed them.",
    ],
    includes: [
      "Recognition of achievements and milestones, announced in the room",
      "The annual awards gala",
      "Members, guests and invited speakers, seated together",
      "A full evening rather than a scheduled slot",
    ],
    cadence: "Annually",
    image: "gathering-c",
    imageCaption: "Guests arriving at a GEC evening",
  },
  {
    slug: "gec-summit",
    title: "The GEC Summit",
    kind: "flagship",
    season: "Winter",
    capacity: "Members, scholars and graduates",
    standfirst:
      "Two days on the things that actually move women into senior executive roles.",
    description: [
      "The Summit is the club's working event: less ceremony, more method. Sessions are built around the specific steps between a strong VP and a seat at the table.",
      "It is the one gathering where scholars, programme graduates and members sit in the same session, because the thing that transfers between them is the method.",
    ],
    includes: [
      "Sessions on the specific, named steps to the C-suite",
      "Breakouts by sector and by stage of career",
      "The Pitch to OH investor summit",
      "GEC Connect and Leaders Program cohorts together",
    ],
    cadence: "Annually",
    image: "gathering-d",
    imageCaption: "A GEC gathering",
    imagePosition: "50% 22%",
  },
  {
    slug: "private-reveal",
    title: "The Executive Private Reveal",
    kind: "gathering",
    season: "Launch",
    capacity: "By personal invitation from the founder",
    standfirst:
      "The evening the club was first shown to the world — and the model for how we introduce anything new.",
    description: [
      "The Private Reveal is how the club introduces itself: a personal invitation from the founder, a single room, and an evening built to make a small number of people feel like the centre of something.",
      "The first was held at the clubhouse in July 2021. It has become the template for every invitation-only evening since.",
    ],
    includes: [
      "A personal invitation from the founder",
      "A single room, one evening",
      "An unhurried introduction to the club's purpose",
      "No programme, no speeches",
    ],
    cadence: "As announced",
    image: "salon-east",
    imageCaption: "The salon",
  },
  {
    slug: "candidacy-dinners",
    title: "Quarterly Candidacy Dinners",
    kind: "gathering",
    season: "Quarterly",
    capacity: "Prospective members and invited guests",
    standfirst:
      "Four evenings a year where prospective members sit down with the board before deciding anything.",
    description: [
      "The Quarterly Candidacy Dinners are hosted by the Garden's Executive Advisory Board and its Chief Executive Officer. They are a time of vision and mission, sponsorship opportunities, business collaboration and fellowship.",
      "Dinner is a courtesy, not a gate. Non-attendance will not prevent membership — but most people who come decide faster, and more honestly.",
    ],
    includes: [
      "Fine dining at the clubhouse",
      "The founder hosting, personally",
      "A full account of what membership involves",
      "An honest answer to whatever you came to ask",
    ],
    cadence: "Quarterly",
    image: "dining",
    imageCaption: "The dining room",
  },
  {
    slug: "luncheons",
    title: "Facilitated Luncheons",
    kind: "gathering",
    season: "Monthly",
    capacity: "Ten to a table",
    standfirst:
      "Ten a year, and the reason most members say they joined.",
    description: [
      "These are much more than business-card swaps. Every seat is designed to enable everyone at the table to interact and connect, personally and professionally.",
      "The format makes networking with new professional peers as easy as lunching with close friends — and each luncheon features an accomplished guest speaker who comes to share how she got there.",
    ],
    includes: [
      "Ten to a table, every seat designed to participate",
      "A guest speaker who has genuinely done it",
      "A members-only resource table for your business",
      "Reduced registration for members throughout the year",
    ],
    cadence: "Ten annually",
    image: "salon",
    imageCaption: "The salon, set for a luncheon",
  },
];

export const eventsBySlug = Object.fromEntries(
  clubEvents.map((e) => [e.slug, e]),
) as Record<string, ClubEvent>;

/** The canonical path for an event, honouring any hand-built route. */
export function eventHref(event: ClubEvent): string {
  return event.href ?? `/signature-events/${event.slug}/`;
}

/**
 * Events with a confirmed date, soonest first. This is the "upcoming" list —
 * a gathering without a fixed date is part of the year, not of the diary, and
 * is shown separately so the index never promises a date we do not hold.
 */
export const upcomingEvents = clubEvents
  .filter((e) => e.dateISO)
  .sort((a, b) => (a.dateISO! < b.dateISO! ? -1 : 1));

/** The recurring calendar — everything that runs by cadence rather than by date. */
export const recurringEvents = clubEvents.filter((e) => !e.dateISO);

/** "18 October 2026" → "18 Oct 2026", for compact diary rows. */
export function shortDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** The weekday a gathering falls on, e.g. "Sunday". */
export function weekday(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "long",
    timeZone: "UTC",
  });
}

/** Machine-readable date for <time datetime>. */
export function isoDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toISOString();
}

export const KIND_LABEL = {
  flagship: "Flagship",
  gathering: "Gathering",
  intimate: "Intimate",
} as const;
