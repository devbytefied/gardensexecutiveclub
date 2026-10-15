# Photography — what to shoot next

The site was rebuilt on the 2021 WordPress asset library, because that is what
existed. Most of it is salvageable; some of it is not. This is the shortlist,
in priority order.

Every image currently on the site is pre-rendered to WebP at eight widths by
`pnpm assets` (see `scripts/build-assets.mjs`). To swap a photograph, drop the
new file into `old-site/…/uploads/`, change the `src` for that slug, and re-run
`pnpm assets`. The manifest and the image loader pick it up automatically.

---

## The honest assessment

| Slug | Source | Verdict |
|---|---|---|
| `magnolia-poster` | 2026 brand poster | **Keep.** The strongest asset in the library and the reason for the palette. |
| `heritage-lounge` | gilded mirror, marble, velvet | **Keep.** Already on-palette, and it carries the Stone Mountain story. |
| `carriage` | wrought-iron carriage in the woods | **Keep, treat as texture.** Densely detailed; used as an atmospheric band only. |
| `shatter-field` | glass shards on black | **Keep.** Carries the glass-ceiling motif and works as a hero ground. |
| `glass-ceiling-mall` | Berger's installation, National Mall | **Keep.** A real artwork, and the reason that page works. |
| `march` | women's rights demonstration | **Keep.** Only used as a wide band. |
| `salon`, `salon-west`, `salon-east`, `salon-detail`, `dining`, `parlour`, `lounge` | 2021 phone snapshots of the venue | **Replace.** See below. |
| `founder`, `gathering-a` … `gathering-e` | 2021 event candids | **Replace.** See below. |

The venue and people frames are all duotone-graded into the brand palette, which
makes them read as intentional editorial illustration rather than as bad
photography. That is a real solution to a real constraint — but it is a
substitute, not the finished article.

---

## Priority 1 — the clubhouse (`salon*`, `dining`, `lounge`, `parlour`)

The current frames read as a mid-market event-hire venue: flat overhead
lighting, dated furniture, visible clutter. They undercut the premium promise
on every page that carries them.

**What to shoot.** Empty rooms, dressed for a members' gathering, shot in
**natural light**. No flash, no wide-angle distortion.

| Slot | Ratio | Notes |
|---|---|---|
| `salon` | 4:5 or 5:4 | The main room set for a luncheon. The single most valuable shot on the site. |
| `salon-west`, `salon-east` | 3:2 | One each side, so the pair reads as a room rather than two photos. |
| `salon-detail` | 3:2 | One table laid properly. Candle, linen, one place setting. This sells the brand more than any wide shot. |
| `dining` | 4:5 | The dining room. |
| `lounge` | 4:5 | Seating where two people could actually have a conversation. |
| `parlour` | 4:5 | Quiet corner, good window light. |

**Direction.** Shoot for the tone the site already has: deep greens, warm
golds, cream, aged brass, marble, velvet. If a room cannot be made to feel
like that, don't photograph it.

---

## Priority 2 — people (`founder`, `gathering-*`)

Current frames are casual phone snapshots: harsh midday sun, cluttered
backgrounds, mid-gesture. A private executive club needs the opposite —
composed, environmental, editorial.

**What to shoot.**

- **The founder.** One portrait, 4:5, seated or standing, looking at camera.
  This is the only person on the site. The existing frames show her
  mid-gesture at an outdoor microphone in a white suit and hat — warm and
  likeable, but not the register the rest of the site is in.
- **Four gathering frames.** 3:2 and 4:5 pairs. Two women in conversation, not
  posing. A room of people mid-laugh. A hand on a table. The back of someone's
  head while someone else speaks. Details of the room during an event.
- **Rule:** no group shots, no crossed arms, no handshake, no laptop. The club's
  whole argument is that these conversations are the opposite of that.

---

## Priority 3 — the founder's room

There is no photograph of Ebony Ormond-Ham's own space, and for a club founded
on one person's conviction that is a real gap. A 3:2 or 21:9 frame of the
working room — desk, books, something personal — would earn a full-bleed slot
on `/our-history/` and would replace the current atmospheric band.

---

## Specs

- **Ratio** — match the slot in the table above. The layout uses `ratio` props;
  a mismatched crop gets centre-cropped and loses its subject.
- **Resolution** — 2000 px on the long edge is the ceiling. The pipeline never
  emits above 2000 and the loader serves the nearest smaller variant.
- **Format** — upload the original JPEG. `pnpm assets` handles WebP, the width
  ladder and the duotone.
- **Colour** — no filters, no presets, no HDR. If a frame needs grading to fit
  the palette, that is a conversation about the room, not the file.

---

## Also worth replacing, lower priority

- The rose-gold crest logo (`cropped-geclogo*.png`) is a black-background PNG
  and cannot sit on cream. The site currently uses a redrawn magnolia glyph
  (`src/components/Mark.tsx`) instead. If the crest must return, it needs to be
  a single-colour vector with a transparent background.
- The report covers in `research-*` are 350 px scans. Fine at their current
  small size; they will not survive being enlarged on a retina display.
- The gold company wordmarks are 2–5 KB PNGs on transparency. They work, but
  they are raster — SVG would be sharper at any size.
