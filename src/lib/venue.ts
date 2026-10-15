/**
 * The clubhouse — venue hire, as data.
 *
 * Everything stated here is taken from material the club has already
 * published (the founder's letter of candidacy, the EPK, the old site). Room
 * capacities, hire rates and deposit terms are deliberately NOT invented: they
 * are published on request, and the enquiry form is how they are obtained.
 */



export const venue = {
  name: "The Garden’s Executive Club",
  legalName: "The Garden’s Executive Club, Inc.",
  standfirst:
    "A two-storey, 6,000-square-foot clubhouse on two acres in Stone Mountain, Georgia — within two miles of Stone Mountain Park’s West Gate.",
  schedulerUrl: "https://gardensexecutiveclub.as.me/schedule/6b35a4dd",
  schedulerLabel: "Check dates & request a tour",
  address: {
    line1: "5459 East Mountain Street",
    line2: "Stone Mountain, GA 30083",
    country: "United States",
  },
  facts: [
    { value: "6,000", label: "square feet, across two storeys" },
    { value: "2 acres", label: "of grounds in Stone Mountain" },
    { value: "2 miles", label: "from Stone Mountain Park’s West Gate" },
    { value: "Est. 2021", label: "founder & CEO" },
  ],
} as const;

export type VenueSpace = {
  name: string;
  slug: string;
  body: string;
  best: string;
};

export const spaces: VenueSpace[] = [
  {
    name: "The Salon",
    slug: "salon",
    body: "The main room, dressed for a members’ gathering. This is where the luncheons, the fireside chats and the conversations that run past the scheduled hour actually happen.",
    best: "Luncheons • fireside chats | up to a full seated room",
  },
  {
    name: "The Dining Room",
    slug: "dining",
    body: "A round table room built for the food to be the point. This is where the club takes a private dinner seriously.",
    best: "Candidacy dinners | private dining",
  },
  {
    name: "The Lounge",
    slug: "lounge",
    body: "Seating where two people could actually have a conversation — the right room for a green room, a speaker hold, or a small reception.",
    best: "Receptions | speaker hospitality",
  },
  {
    name: "The Parlour",
    slug: "parlour",
    body: "The quiet corner of the house. Board meetings, one-to-ones, and the conversations that would embarrass a larger room.",
    best: "Board meetings | private consultations",
  },
  {
    name: "The Heritage Lounge",
    slug: "heritage-lounge",
    body: "Gilded mirror, marble fireplace, velvet — the original room of the building, and the one that carries the history of the place.",
    best: "Receptions | portraits | brand photography",
  },
];

/** Enquiry types offered on the booking form. */
export const eventTypes = [
  { value: "private-dinner", label: "Private dinner" },
  { value: "luncheon", label: "Corporate or executive luncheon" },
  { value: "fireside", label: "Fireside chat or fireside-style evening" },
  { value: "conference", label: "Conference, summit or retreat" },
  { value: "reception", label: "Reception or networking evening" },
  { value: "wedding", label: "Wedding or private celebration" },
  { value: "memorial", label: "Memorial, wake or remembrance" },
  { value: "photo-shoot", label: "Photography, film or brand shoot" },
  { value: "other", label: "Something else — describe it below" },
];

export const guestRanges = [
  { value: "under-25", label: "Fewer than 25 guests" },
  { value: "25-50", label: "25 – 50 guests" },
  { value: "50-100", label: "50 – 100 guests" },
  { value: "100-150", label: "100 – 150 guests" },
  { value: "over-150", label: "More than 150 guests" },
  { value: "unsure", label: "Not sure yet" },
];

export const budgetRanges = [
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-10k", label: "$5,000 – $10,000" },
  { value: "10k-25k", label: "$10,000 – $25,000" },
  { value: "25k-plus", label: "$25,000 and above" },
  { value: "unsure", label: "Not sure yet — please advise" },
];