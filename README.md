# The Garden's Executive Club

A static rebuild of the club's WordPress site in Next.js. Every page is
pre-rendered to HTML at build time and deploys to any static host — no server,
no database, no image pipeline at runtime.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # → out/
pnpm serve      # preview the static export
```

## Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Development server |
| `pnpm build` | Static export to `out/` |
| `pnpm serve` | Serves `out/` locally |
| `pnpm lint` | ESLint |
| `pnpm assets` | Rebuilds the image library (run after changing a photo) |
| `pnpm shoot` | Screenshots every route to `.qa/` for visual review |
| `pnpm audit` | Measures transferred bytes per page and checks budgets |

`pnpm shoot` and `pnpm audit` need a build first.

---

## Architecture

```
src/
  app/                  routes — one folder per page
  components/           UI primitives, page shells, form
  lib/
    site.ts             brand constants, contact details, navigation
    work.ts             the five research threads
    events.ts           the gathering calendar
    media.ts            typed access to the image manifest
    image-loader.ts     next/image loader for static export
    fonts.ts            typography layer
    emailjs.ts          form transport config
scripts/
  build-assets.mjs      the image pipeline
  shoot.mjs             visual QA
  audit.mjs             performance budget
```

Everything is a Server Component by default. `"use client"` appears only on the
header, the accordion, and the form — the four things that genuinely need state.

---

## Design system

The palette is sampled from the club's own 2026 brand poster, not invented:
deep forest green, antique gold, warm cream.

**The rule that holds it together: green and gold are accents, never surfaces.**
A section's ground is either cream or ink. Gold appears as a 1px hairline, a
small-caps eyebrow, or a single italic word. There are no drop shadows, no
rounded card corners, and no gradients except one image overlay in the hero.

Layout alternates rhythm deliberately — the home page uses a 6/6 hero, a 5/4/3
asymmetric feature grid, and full-bleed single-number moments, so no two
consecutive sections feel generated from the same template.

Tokens live in `src/app/globals.css` under `@theme`. Change a colour there and
it propagates everywhere.

### Typography

Intended: **Canela** (display) + **Söhne** (text) — both commercial Klim Type
Foundry licences. Drop the licensed `.woff2` files into `public/fonts/` and they
take precedence automatically:

```
public/fonts/Canela-Regular.woff2
public/fonts/Canela-Medium.woff2
public/fonts/Sohne-Regular.woff2
public/fonts/Sohne-Medium.woff2
```

Until then, **Instrument Serif + Instrument Sans** carry the same roles. They
are self-hosted and preloaded by `next/font`, so there is no 404 to wait on and
no layout shift. The faces are declared as plain `@font-face` rules rather than
`next/font/local`, because a licensed font cannot be resolved at build time.

---

## Images

There is no image optimiser on a static host, so images are pre-rendered at
build time by `scripts/build-assets.mjs` into width-keyed WebP under
`public/media/`:

```
public/media/<slug>__<width>.webp
```

`src/lib/image-loader.ts` reads the generated manifest and resolves each
`next/image` request to the nearest variant that actually exists — so a
narrowly-sourced photograph can never produce a 404.

The curated library lives in the `MEDIA` array in `build-assets.mjs`, sourced
from the old WordPress uploads. Each entry can carry a `quality` and `maxWidth`
override, and a `grade: "duotone"` flag that maps the photograph into the brand
palette — used on the 2021 phone snapshots so they sit inside the design system
instead of fighting it.

To swap a photograph: drop the new file into the uploads directory, change that
entry's `src`, run `pnpm assets`, rebuild.

**See [MEDIA.md](./MEDIA.md) for what to re-shoot and why.**

---

## Forms

All three forms — apply, nominate, contact — run through **EmailJS** from the
browser, which is what a static host allows.

```bash
cp .env.example .env.local    # then fill in the three values
```

Without credentials the forms render in a disabled state that points visitors
at the club's email address, so a build with no keys still ships a usable page
rather than a broken one. Each form has a honeypot, per-field validation, and
focus is moved to the first field that fails.

**No form on this site requests card details.** The old WordPress site collected
a full credit card number in the browser; the $250 initial membership fee is now
invoiced separately once an application is accepted.

---

## Deployment

`next.config.ts` sets `output: "export"` and `trailingSlash: true`, so `out/`
contains one directory per route with an `index.html` inside.

Also emitted:

- `out/sitemap.xml`, `out/robots.txt`
- `out/opengraph-image/` — the social card, generated at build time
- `out/icon.svg`, `out/favicon.ico`
- `public/_redirects` — the old WordPress URL map, plus `410`s for the WP
  plumbing that no longer exists
- `public/_headers` — cache rules and a CSP

`_redirects` and `_headers` are read directly by Netlify and Cloudflare Pages.
For nginx or Apache, translate them into the equivalent directives — the
`public/_headers` file is commented with what each rule does.

---

## Performance

Measured on a cold, first visit, gzipped, desktop viewport:

| | Transferred |
|---|---|
| Framework JS (React 19 + Next 16) | ~145 kB |
| Fonts | ~59 kB |
| CSS | ~12 kB |
| HTML | 13–18 kB |
| Images | 7–130 kB |
| **Typical page** | **240–365 kB** |

`pnpm audit` enforces per-page budgets. The script budget is set at Next.js's
App Router floor, so it guards against regression rather than pretending the
framework can be removed.

The largest single win during the build was turning off `prefetch` on
navigation chrome. With it on, the header and footer were pulling **seven other
pages' full HTML documents** on every first visit — about 110 kB per page, for
pages most visitors never open. Navigation is `prefetch={false}` throughout;
prefetch is kept for in-article links where it earns its cost.

Zero third-party scripts. The only external call on the site is the EmailJS
transport, and only on form submission.

---

## Content

All copy was carried over from the WordPress site and rewritten where it needed
to be. Two changes worth knowing about:

**The research pages were re-grounded.** The five "Why Our Work Matters" pages
were inherited from *Garden Executive Women Australia* — Australian
superannuation rules, the state of Georgia in Australia, OECD comparators. The
argument was sound; the geography was not. Every figure is now United States
data, and the argument is intact.

**The dead pages were written, not stubbed.** Nine pages were empty "COMING
SOON" placeholders on the old site. They now carry real content, and Where a
page needed a fact the club does not yet have — board roster, event dates — it
says so rather than inventing it. `Our Board` publishes open seats as open,
linked to the nomination form, which does more work than a page of placeholders
would.

---

## Legal

`/privacy/` and `/terms/` were written for this site and reviewed against
Georgia law rather than copied from the old site's template. Both are plain
prose with no tracking, no cookies, and no third-party analytics. The privacy
policy is genuinely readable, which is the point.
