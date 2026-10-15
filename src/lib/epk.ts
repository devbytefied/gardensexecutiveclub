/**
 * Dr. Ebony Ormond-Ham — official executive booking EPK, as data.
 *
 * This is the web equivalent of the printed EPK, in the club's own house
 * style. The wording is the client's, kept verbatim: titles, the registered
 * marks, the revenue figures, the press titles and the "IT CAN'T RUN OUT.®"
 * declaration are all reproduced exactly as supplied, so the page and the PDF
 * cannot drift apart in substance — only in presentation.
 *
 * A detail changes here and it changes everywhere: the /epk/ page, the
 * sitemap description, and anything else that quotes the EPK.
 */

import { site } from "./site";

export const epk = {
  name: "Dr. Ebony Ormond-Ham",
  mark: "Dr. Ebony OH®",
  shortName: "Ebony OH",
  titles: [
    "Entrepreneur | CEO | Seed Strategist®",
    "Author | Executive Leader | Vision Builder",
  ],
  standfirst:
    "Building enterprises. Creating strategic partnerships. Turning vision into sustainable impact.",
  mission: [
    "Plant seeds. Build legacies.",
    "Create pathways for transformational success.",
  ],

  /** Where every booking, media and partnership enquiry lands. */
  email: site.contact.email,

  /** The printed EPK, offered as a download from the same page. */
  pdf: "/Dr_Ebony_OH_Executive_Booking_EPK_Regenerated.pdf",
  pdfLabel: "Download the printed EPK (PDF)",
} as const;

/** The declaration that sits at the centre of the brand. */
export const declaration = {
  mark: "IT CAN’T RUN OUT.®",
  title: "IT CAN’T RUN OUT.®",
  body: "At the centre of Dr. Ebony OH’s journey is a prophetic declaration that has become synonymous with her life, leadership, and legacy. What began as a personal decree of faith, abundance, and divine provision has evolved into a movement — now expanding beyond business and entrepreneurship into music, film, and entertainment through ICRO Kingdom Music.",
  pull: "When the source is God, vision has no ceiling. Purpose has no expiration. What He has ordained cannot be depleted.",
  close:
    "For Dr. OH, IT CAN’T RUN OUT is more than a motto; it is the conviction that when the source is God, vision has no ceiling, purpose has no expiration, and what He has ordained cannot be depleted.",
} as const;

/** Section 2 — Executive profile. */
export const profile = {
  lead: "Dr. Ebony Ormond-Ham (Dr. Ebony OH®) is a visionary entrepreneur, CEO, and Seed Strategist® who has built and scaled multi-industry enterprises across mental health, education, childcare, construction, hospitality, and community development.",
  body: [
    "As the active Owner, Co-Founder, and Executive Leader of multiple corporations, Dr. OH is recognized for her ability to transform ideas into sustainable businesses, create strategic partnerships, and develop ventures that impact communities.",
    "Her entrepreneurial journey began with the successful self-brokered acquisition, growth, and sale of five mental health outpatient clinics — an achievement that demonstrated her expertise in business development, operational strategy, and value creation.",
    "Through her signature Seed Strategy®, Dr. OH has continued to identify opportunities, cultivate partnerships, and build organizations positioned for long-term growth.",
  ],
} as const;

/** Section 3 — leadership, development & legacy. */
export type EpkRole = {
  role: string;
  org: string;
  body: string;
};

export const roles: EpkRole[] = [
  {
    role: "Owner & Head of School",
    org: "Braselton Christian Academy",
    body: "Leading a private Christian educational institution serving students from preschool through 12th grade, Dr. OH is expanding academic excellence through innovative educational models, including traditional private education and hybrid learning opportunities designed to meet the evolving needs of families.",
  },
  {
    role: "Founder & Executive Leader",
    org: "C. Alexander Learning Academy",
    body: "Through her childcare and early education organization, Dr. OH continues to build high-quality learning environments focused on child development, family support, and preparing the next generation for success.",
  },
  {
    role: "Founder & CEO",
    org: "ICRO Enterprise, Inc.",
    body: "A construction and infrastructure company focused on expanding opportunities within commercial construction and transportation infrastructure. Dr. OH is actively advancing the company’s growth through strategic partnerships and major project development, including a recent agreement with one of Georgia’s largest General Contractors to pursue expanded highway and commercial infrastructure opportunities.",
  },
  {
    role: "Owner",
    org: "The Garden’s Executive Club, Inc.",
    body: "A premier event and hospitality destination designed to host elevated experiences, leadership gatherings, and legacy-building conversations. Dr. OH is transforming the historic venue into a luxury destination centered around connection, culture, and community.",
  },
  {
    role: "Founder",
    org: "Lemons 2 Millions®",
    body: "A business empowerment platform built around entrepreneurship, resilience, wealth creation, and strategic growth, inspiring entrepreneurs to turn challenges into opportunities.",
  },
  {
    role: "Strategic development",
    org: "Stone Mountain, Georgia",
    body: "Beyond her current portfolio, Dr. OH continues to expand her influence through strategic development projects, including negotiations for a residential community development in Stone Mountain, Georgia, designed to contribute to community growth and economic advancement.",
  },
];

/** Section 4 — enterprise track record. */
export type EpkVenture = {
  org: string;
  date: string;
  role: string;
  industry: string;
  figure: string;
  figureLabel: string;
};

export const ventures: EpkVenture[] = [
  {
    org: "Braselton Christian Academy",
    date: "December 2025 | Acquisition",
    role: "Acquisition",
    industry: "Private Christian Education • Preschool–12 • Traditional & Hybrid",
    figure: "$1M",
    figureLabel: "generated revenue",
  },
  {
    org: "C. Alexander Learning Academy",
    date: "March 2019 | Built from ground up",
    role: "Founder & Executive Leader",
    industry: "Childcare • Early Education • Child Development",
    figure: "$11M",
    figureLabel: "generated revenue",
  },
  {
    org: "ICRO Enterprise, Inc.",
    date: "January 2021 | Founder & CEO",
    role: "Founder & CEO",
    industry: "DBE • SBE • SPSF • Woman-owned highway construction contractor",
    figure: "$13.2M",
    figureLabel: "generated revenue",
  },
  {
    org: "The Garden’s Executive Club, Inc.",
    date: "May 2021 | Founder & CEO",
    role: "Founder & CEO",
    industry: "Luxury Hospitality • Event Venue • Executive Experiences",
    figure: "$3M",
    figureLabel: "generated revenue",
  },
];

/** Section 5 — the founder’s exit, and the platforms built since. */
export const exit = {
  title: "Eye Listen Empowerment Center",
  industry: "Mental health • Outpatient behavioral health",
  figure: "7-figure",
  figureLabel: "self-brokered sale",
  year: "2019",
  body: "Dr. OH’s entrepreneurial journey began in mental health, including the acquisition, growth, and successful sale of five outpatient clinics. Eye Listen Empowerment Center represents a defining exit in that journey and a demonstration of business development, operational strategy, negotiation, and value creation.",
} as const;

export const platforms = [
  {
    title: "Lemons 2 Millions®",
    industry:
      "Business Empowerment • Entrepreneurship • Wealth Creation",
    body: "A platform built around entrepreneurship, resilience, strategic growth, and helping entrepreneurs transform challenges into opportunities.",
    pull: "Turn challenges into opportunity.",
  },
  {
    title: "ICRO Kingdom Music",
    industry:
      "Music • Film • Entertainment • Faith-centered creative development",
    body: "The creative and entertainment expansion of the movement — a faith-centered studio for music, film and the people who make both.",
    pull: "From business and entrepreneurship into music, film, and entertainment.",
  },
] as const;

/** Section 6 — author. */
export const book = {
  title: "Three Times A Lady",
  subtitle: "The Woman, Her Business, Her God",
  byline: "Author • Entrepreneur • Faith-driven executive",
  body: "A faith-centered work rooted in womanhood, entrepreneurship, purpose, and the relationship between business ambition and spiritual conviction.",
} as const;

/** Section 7 — what she is booked for. */
export const engagements = [
  {
    n: "01",
    title: "Keynotes",
    body: "Executive leadership • Entrepreneurship • Faith • Resilience",
  },
  {
    n: "02",
    title: "Fireside chats",
    body: "Scaling • Negotiation • Reinvention • Purpose • Legacy",
  },
  {
    n: "03",
    title: "Panels & summits",
    body: "Business • Education • Women’s leadership • Community impact",
  },
  {
    n: "04",
    title: "Private experiences",
    body: "Executive conversations • Retreats • Invitation-only rooms",
  },
] as const;

/** Section 8 — signature conversations. */
export const conversations = [
  {
    title: "The Seed Strategy®",
    body: "Recognize opportunity, plant strategically, build value, and position for sustainable growth.",
  },
  {
    title: "From vision to enterprise",
    body: "Move beyond inspiration into structure, execution, partnerships, and scalable operations.",
  },
  {
    title: "The art of the deal",
    body: "Self-brokered transactions, negotiation, strategic positioning, and creating value before the close.",
  },
  {
    title: "Women, wealth & executive leadership",
    body: "Build authority, protect vision, create access intentionally, and lead at the level your next season requires.",
  },
  {
    title: "Faith, fear & the first instruction",
    body: "Obedience, discernment, courage, and moving when the vision is first given.",
  },
  {
    title: "It can’t run out®",
    body: "Abundance, divine provision, purpose, and building without allowing fear to define the ceiling.",
  },
] as const;

/** Section 9 — press & editorial. */
export const press = [
  {
    outlet: "Voyage ATL",
    href: "https://voyageatl.com",
    title: "Meet Ebony Ormond-Ham — Three Times A Lady",
    body: "Entrepreneurial journey, leadership, business development, and the Three Times A Lady platform.",
  },
  {
    outlet: "Shoutout Atlanta",
    href: "https://shoutoutatlanta.com",
    title: "Meet Ebony OH | Wealth Tycoon & Seed Strategist",
    body: "A profile of Dr. OH’s business philosophy, entrepreneurial evolution, C. Alexander Learning Academy, and The Garden’s Executive Club.",
  },
  {
    outlet: "VOCAL • Women in Business",
    href: "https://vocal.media",
    title: "Ebony OH, CEO (Three Times A Lady)",
    body: "A feature on entrepreneurship, women’s empowerment, the Three Times A Lady book, and Dr. OH’s evolution as a Seed Strategist.",
  },
] as const;