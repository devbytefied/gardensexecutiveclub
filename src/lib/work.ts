/**
 * The five research threads that sit behind the club.
 *
 * The original site carried this material adapted from Garden Executive Women
 * Australia — Australian superannuation figures, the state of Georgia in
 * Australia, OECD comparisons. The argument was sound; the geography was not.
 * These entries keep the argument and re-ground every figure in the United
 * States, which is where our members actually work.
 */

export type WorkTopic = {
  slug: string;
  n: string;
  title: string;
  standfirst: string;
  /** Pulled onto the index page and used as the page's lede. */
  summary: string;
  image: string;
  imageCaption: string;
  /** Headline figures shown as a stat rail beneath the page header. */
  stats: { value: string; label: string }[];
  body: {
    heading?: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  pull?: { text: string; source?: string };
};

export const workTopics: WorkTopic[] = [
  {
    slug: "economic-security",
    n: "01",
    title: "Economic Security",
    standfirst:
      "Women outnumber men as graduates, and still earn less at every point in their working lives.",
    summary:
      "Women outnumber men as graduates and still earn less at every point in their working lives.",
    image: "research-federal",
    imageCaption: "GEC statement on the federal budget",
    stats: [
      { value: "82¢", label: "earned by women for every dollar earned by men" },
      { value: "2×", label: "the gap in retirement savings by the time women retire" },
      { value: "80%", label: "of the workforce in low-paid part-time roles" },
    ],
    body: [
      {
        paragraphs: [
          "There is no country in the developed world where a woman and a man with identical qualifications are paid the same. The United States is no exception, and the pattern holds at every rung of the ladder.",
          "The overall gender pay gap in the US runs at roughly 18 per cent. In some sectors it is considerably wider — around 30 per cent in financial services — and men are still more likely to receive larger discretionary bonuses. Because bonuses compound, a gap that looks survivable in a single year becomes structural across a career.",
        ],
      },
      {
        heading: "Wealth compounds the wrong way",
        paragraphs: [
          "Pay is only half the problem. Wealth accumulation for women is slowed further by career breaks, by the absence of flexible work on return, and by the way those breaks funnel women back into roles that do not advance them.",
          "The result is a retirement cliff. Women reach retirement having accumulated a fraction of the savings of their male contemporaries — often around two-thirds, sometimes considerably less depending on industry and hours worked. For a generation that entered the workforce expecting to fund four decades of retirement from its own savings, that is a structural failure, not a personal one.",
        ],
      },
      {
        heading: "What we are asking for",
        paragraphs: [
          "The fix is not complicated, and it is not novel. It is published, audited and repeatedly ignored.",
        ],
        bullets: [
          "End-point pay transparency, so the gap is visible inside the organisation rather than only in aggregate.",
          "Pay audits at promotion, not just at hiring, with remediation built into the process.",
          "Paid parental leave for both parents, designed so that taking it does not end a woman's trajectory.",
          "Pension contributions that continue through a career break, rather than restarting from zero.",
          "Equal pay for work of equal value, enforced rather than encouraged.",
        ],
      },
    ],
    pull: {
      text: "A pay gap is a number. A lifetime of compounding on the wrong side of it is a life.",
      source: "The Garden's Executive Club",
    },
  },

  {
    slug: "workplace-flexibility",
    n: "02",
    title: "Workplace Flexibility",
    standfirst:
      "We need strong leadership and visible role models to make flexible working a reality for men and women alike.",
    summary:
      "Men are twice as likely to have a flexible-work request refused than women. The stigma, not the policy, is the barrier.",
    image: "research-flexibility",
    imageCaption: "The Power of Flexibility — joint research report",
    stats: [
      { value: "2×", label: "as likely for men to have a flexible request refused" },
      { value: "72%", label: "of employers offer flexible work" },
      { value: "2.3%", label: "have set a target for men's engagement with it" },
    ],
    body: [
      {
        paragraphs: [
          "Workplace flexibility is an enabler of gender equality. It retains women in the workforce and it is one of the few mechanisms that lets men take on caring responsibilities without a career penalty. Research consistently finds a positive relationship between flexible arrangements, productivity and revenue.",
          "And yet the policy is nearly universal while the practice remains contested. Most employers promote flexible work. Far fewer set targets for how it is actually taken up.",
        ],
      },
      {
        heading: "The barrier is cultural, not administrative",
        paragraphs: [
          "While employers intend to make flexible working available to everyone, a persistent belief survives underneath the policy: that flexible work is for women. In large surveys, a majority of parents and carers agree that employers are less likely to support men taking time off to care.",
          "The result is what researchers call a flexibility stigma. When men reduce hours or step away from work for family reasons, they are measurably less likely to be promoted, and more likely to be viewed as less committed. Women are already judged on this axis. The stigma simply runs in both directions — and that is precisely the point. A policy that only women use is not a flexibility policy. It is a penalty for women.",
        ],
      },
      {
        heading: "What good looks like",
        paragraphs: [
          "Implementing a flexible working policy is not enough to normalise it. A cultural shift is required, and it starts with men visibly using it.",
        ],
        bullets: [
          "Senior leaders taking visible, unremarkable flexible time.",
          "Promotion and compensation decisions audited for flexibility bias.",
          "Outcomes measured for men and women separately, not blended.",
          "A culture that treats caring as a shared, ordinary part of adult life.",
        ],
      },
    ],
    pull: {
      text: "If only women flex, we have not built flexibility. We have built a tax.",
      source: "The Garden's Executive Club",
    },
  },

  {
    slug: "workplace-participation",
    n: "03",
    title: "Workplace Participation",
    standfirst:
      "For a country to prosper we must both create jobs and make working as attractive to women as it is to men.",
    summary:
      "Under 60% of women participate in the workforce here, against more than 70% of men — despite graduating in larger numbers.",
    image: "research-jobs",
    imageCaption: "Jobs and growth",
    stats: [
      { value: "58%", label: "of women participate in the US labour force" },
      { value: "68%", label: "of men — a gap unchanged for two decades" },
      { value: "2×", label: "the unpaid domestic work women still do" },
    ],
    body: [
      {
        paragraphs: [
          "The United States has a participation problem that is easy to miss because the country has jobs. Plenty of them. The question is who is taking them.",
          "Fewer than six in ten women participate in the labour force, against closer to seven in ten men — even though women now outnumber men among university graduates. The gap has barely moved in two decades. Raising women's participation even six percentage points would add materially to national output, on the order of hundreds of billions of dollars a year.",
        ],
      },
      {
        heading: "Caring responsibilities are the binding constraint",
        paragraphs: [
          "The divide widens sharply for parents. Among adults living with a child under five, women's participation falls far below men's — the drop is among the steepest of any developed economy.",
          "Women are also disproportionately found in the contingent workforce: part-time, temporary, contract and casual arrangements that carry no benefits, no pension and no security. That is not a preference. It is what the labour market does to a workforce it expects to be available for other people's schedules.",
        ],
      },
      {
        heading: "What we are asking for",
        paragraphs: [
          "An opportunity of this scale deserves to be treated as a national priority, alongside innovation, infrastructure and tax reform.",
        ],
        bullets: [
          "Affordable, accessible childcare treated as a work expense rather than a private cost.",
          "Equal pay, so participation is rewarded rather than penalised.",
          "Portable benefits for contingent and part-time workers.",
          "Rethinking the working day around care, not around the remnants of a male breadwinner model.",
        ],
      },
    ],
    pull: {
      text: "We graduate in larger numbers and participate in smaller ones. Something is being lost in between.",
      source: "The Garden's Executive Club",
    },
  },

  {
    slug: "women-in-leadership",
    n: "04",
    title: "Women in Leadership",
    standfirst:
      "More female voices at every level of leadership deliver better decisions and more equitable outcomes.",
    summary:
      "More female voices at every level of leadership deliver better decisions and more equitable outcomes.",
    image: "research-gender-data",
    imageCaption: "GEC on streamlining gender data reporting",
    stats: [
      { value: "23%", label: "of executive roles in the US are held by women" },
      { value: "10%", label: "of Fortune 500 chief executives" },
      { value: "29%", label: "of C-suite positions, and barely moving" },
    ],
    body: [
      {
        paragraphs: [
          "Women are significantly under-represented in decision-making. Every board we sit on, every crisis team we staff, every organisation we advise is making decisions with an incomplete picture of who is affected.",
          "That is not a fairness argument alone, though it is a real one. It is a quality argument. A leadership team that has never had to consider how an absence policy lands on half its workforce has not finished thinking about the problem.",
        ],
      },
      {
        heading: "Through the crisis and after it",
        paragraphs: [
          "The pandemic made the point forcefully. The qualities that carried organisations through it — empathy, candour, willingness to revise a decision in public — are qualities the sector had spent decades describing as soft. They turned out to be load-bearing.",
          "At the same time, emerging evidence of differential impacts made it clear that gender analysis was not optional. Involving women leaders and diversity experts in response design produced measurably better outcomes. Crisis response, it turns out, is exactly the kind of problem where the composition of the room shows up in the result.",
        ],
      },
      {
        heading: "Two levers we actually pull",
        paragraphs: [
          "Advancing women to senior executive roles, and building the organisations that develop them.",
        ],
        bullets: [
          "Closing the specific, identified steps between a strong VP and a seat at the table.",
          "Sponsorship, not just mentorship — someone with the authority to put your name forward.",
          "Publishing gender pay and promotion data, because what is measured moves.",
          "Building the leadership bench deliberately rather than waiting for it to appear.",
        ],
      },
    ],
    pull: {
      text: "A leadership team that has never considered who is missing from the table has not finished the analysis.",
      source: "The Garden's Executive Club",
    },
  },

  {
    slug: "glass-ceiling-breaker",
    n: "05",
    title: "Glass Ceiling Breaker",
    standfirst:
      "Every ceiling that fell was carried by someone first. We trace the line back to the women who cracked them.",
    summary:
      "Every ceiling that fell was carried by someone first. We trace the line back to the women who cracked them.",
    image: "glass-ceiling-mall",
    imageCaption: "Simon Berger, 'Glass Ceiling Breaker', National Mall",
    stats: [
      { value: "1920", label: "first woman elected to the US Senate" },
      { value: "1993", label: "first woman appointed to the Supreme Court" },
      { value: "2021", label: "first woman, Black and South Asian, US Vice President" },
    ],
    body: [
      {
        heading: "The firsts",
        paragraphs: [
          "The first woman to serve as a governor of a US state. The first Black woman nominated for Vice President, in 1952 — and passed over, then and in the decades that followed. The first woman to serve as Secretary of State, in 1996. The first Black woman to hold that office, nine years later. The first Jewish woman appointed to the Supreme Court in 1993. The first woman elected Speaker of the House in 2007.",
          "Each of these was described, at the time, as unprecedented. Not because nothing had changed — but because the change had taken so long that it still qualified as news.",
        ],
      },
      {
        heading: "An installation made of broken glass",
        paragraphs: [
          "In January 2021, the day after Kamala Harris was elected, Swiss artist Simon Berger installed a portrait of her in front of the Lincoln Memorial, made entirely from shattered laminated glass. No image was printed onto the surface. The portrait is legible only from a distance, and only because of how the cracks fall.",
          "Berger developed the technique in 2016, taking a hammer to layered glass until the fissures resolved into a recognisable image from across a room. 'I like creating beautiful things through destruction,' he said. The work was staged against the reflecting pool and the Washington Monument, and it carried a plaque quoting the museum president: representation matters, especially at the ballot box.",
        ],
        bullets: [
          "Shirley Chisholm — the first woman in Congress, and the first Black woman to run a major-party presidential campaign, in 1972.",
          "Carol Moseley Braun — the first woman elected to the Senate.",
          "Madeleine Albright and Condoleezza Rice — the first women to serve as Secretary of State.",
          "Sandra Day O'Connor and Ruth Bader Ginsburg — the first women on the Supreme Court.",
        ],
      },
      {
        heading: "What we take from it",
        paragraphs: [
          "Harris's acceptance speech is the reason this page exists. She thanked the generations of women who paved the way for that moment, and said: I stand on their shoulders. The portrait worked the same way. It was made of the broken remains of something that had previously been whole and unpassable.",
          "That is the part worth carrying into a boardroom. A ceiling does not come down in one clean break. Someone breaks it, badly, and then it is easier for the next person — and the next, and the next — until eventually the whole structure gives way. The club exists to make sure the people standing at the top of the ladder know there is someone behind them who will catch them if they fall.",
        ],
      },
    ],
    pull: {
      text: "The generations of women who throughout our nation's history have paved the way for this moment. I stand on their shoulders.",
      source: "Kamala Harris, vice-presidential acceptance speech, November 2020",
    },
  },
];

export const workBySlug = Object.fromEntries(
  workTopics.map((t) => [t.slug, t]),
) as Record<string, WorkTopic>;
