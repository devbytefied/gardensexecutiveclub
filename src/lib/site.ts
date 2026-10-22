/**
 * Single source of truth for the club's identity, contact details and
 * navigation. Every page pulls from here so a detail only ever changes once.
 */

export const site = {
  name: "The Garden's Executive Club",
  shortName: "GEC",
  legalName: "The Garden's Executive Club, Inc.",
  tagline: "A private network for women who lead",
  founded: 2021,
  url: "https://gardensexecutiveclub.com",
  locale: "en_US",
  founder: "Ebony Ormond-Ham",
  founderShort: "Ebony OH",

  address: {
    line1: "5459 East Mountain Street",
    line2: "Stone Mountain, GA 30083",
    country: "United States",
  },

  contact: {
    email: "info@gardensexecutiveclub.com",
    phoneDisplay: "(877) 326-6964",
    phoneHref: "tel:+18773266964",
  },

  social: [
    { label: "Instagram", href: "https://www.instagram.com/thegardensexecutiveclub/" },
    { label: "Facebook", href: "https://www.facebook.com/gardenofoh/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/gardensexecutiveclub" },
  ],

  locations: [
    { name: "Stone Mountain", region: "Georgia", note: "Flagship clubhouse" },
    { name: "Greenville", region: "North Carolina", note: "Regional chapter" },
  ],

  /** The club's own three words, taken from the Magnolia poster. */
  motto: ["People", "Purpose", "Possibility"],
} as const;

export type NavGroup = {
  label: string;
  href?: string;
  children: { label: string; href: string; note?: string }[];
};

/**
 * The bar has six entries. The full index — nineteen destinations on the old
 * site — lives behind the overlay rather than in a 19-item dropdown.
 */
export const navigation: NavGroup[] = [
  {
    label: "The Club",
    children: [
      { label: "About Us", href: "/about/", note: "Mission and purpose" },
      { label: "Our History", href: "/our-history/", note: "The first power seed" },
      { label: "Our Board", href: "/our-board/", note: "Governance and seats" },
      { label: "Our Members", href: "/our-members/", note: "Who is in the room" },
      { label: "Our Work", href: "/work/", note: "Research that moves us" },
      { label: "Finding Your Voice", href: "/finding-your-voice/" },
      { label: "Work With Us", href: "/work-with-us/" },
      { label: "Annual Review", href: "/annual-review/" },
    ],
  },
  {
    label: "Membership",
    href: "/membership/",
    children: [
      { label: "Executive Membership", href: "/membership/" },
      { label: "Corporate Membership", href: "/membership/#corporate" },
      { label: "Apply", href: "/apply/" },
      { label: "Nominate", href: "/nominate/" },
      { label: "GEC Accelerator", href: "/accelerator/", note: "Eight investor tracks" },
    ],
  },
  {
    label: "Our Work",
    href: "/work/",
    children: [
      { label: "Overview", href: "/work/" },
      { label: "Economic Security", href: "/work/economic-security/" },
      { label: "Workplace Flexibility", href: "/work/workplace-flexibility/" },
      { label: "Workplace Participation", href: "/work/workplace-participation/" },
      { label: "Women in Leadership", href: "/work/women-in-leadership/" },
      { label: "Glass Ceiling Breaker", href: "/work/glass-ceiling-breaker/" },
    ],
  },
  {
    label: "Gatherings",
    href: "/events/",
    children: [
      { label: "Upcoming Events", href: "/events/", note: "What is confirmed" },
      { label: "The Magnolia", href: "/the-magnolia/", note: "15 November 2026" },
      { label: "Annual Dinner", href: "/signature-events/annual-dinner/" },
      { label: "GEC Summit", href: "/signature-events/gec-summit/" },
      { label: "Facilitated Luncheons", href: "/signature-events/luncheons/" },
      { label: "Candidacy Dinners", href: "/signature-events/candidacy-dinners/" },
      { label: "GEC Connect", href: "/gec-connect/" },
      { label: "Executive Private Reveal", href: "/signature-events/private-reveal/" },
    ],
  },
  {
    label: "Book",
    children: [
      { label: "Book Dr. Ebony OH", href: "/epk/", note: "Keynotes, fireside chats" },
      { label: "Download the EPK", href: "/Dr_Ebony_OH_Executive_Booking_EPK_Regenerated.pdf" },
      { label: "Book the Venue", href: "/venue/", note: "The clubhouse, for hire" },
    ],
  },
  {
    label: "Give",
    children: [
      { label: "Donations", href: "/donations/" },
      { label: "Donation FAQs", href: "/donations-faq/" },
    ],
  },
  {
    label: "Connect",
    href: "/contact/",
    children: [
      { label: "Contact Us", href: "/contact/" },
      { label: "Apply", href: "/apply/" },
      { label: "Nominate", href: "/nominate/" },
    ],
  },
];

/** Flat list used by the sitemap and the footer index. */
export const allRoutes: { label: string; href: string }[] = navigation
  .flatMap((g) => g.children)
  .filter((c, i, arr) => arr.findIndex((x) => x.href === c.href) === i);
