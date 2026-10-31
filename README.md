# TELES ADS® — Telegram-first ads agency site

Single-page, scroll-driven marketing site. Rebuilt from the reference breakdown PDF
(18 screenshots + motion notes), brand **TELES ADS**, founder **Shah Tosif**.

## Stack

- **Next.js 15** (App Router, static prerender) + **React 19** + **TypeScript**
- **Tailwind v4** (token layer) + hand-rolled CSS in `src/app/globals.css`
- **GSAP + ScrollTrigger** — all scroll choreography lives in **one file**: `src/components/SiteClient.tsx`
- **Lenis** smooth scroll (desktop ≥901 px only)
- **Three.js / @react-three/fiber** — 3D logo reveal only (`MarkScene.tsx`, lazy-mounted)
- Fonts: Instrument Serif (display) · Inter (body) · Anton (tape) via `next/font`

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where to change things

| I want to change… | Edit |
|---|---|
| Copy, cases, steps, testimonials, links | `src/lib/data.ts` (single source of content) |
| Colors / type scale / spacing tokens | `:root` block at top of `src/app/globals.css` |
| Photos & artwork | `public/images/` — `hero-cut.png` (hero bust, transparent bg), `crowd.webp` (crowd section, 1920w), `poster-art.webp` (case deck art) |
| Fonts | `next/font` imports in `src/app/layout.tsx` |
| Scroll choreography (pin lengths, easing, timings) | `SiteClient.tsx` — each section has one labeled timeline |
| Section layout/markup | matching `src/components/*.tsx` |
| Header/footer columns, JSON-LD, metadata | `src/app/layout.tsx` + `src/app/page.tsx` |

### Swapping in real work (case studies)
Each case in `data.ts` renders a full-bleed panel + a fan of 5 "creative" cards.
The card faces are typographic placeholders (no invented client brands by design).
Replace `cards[].kind` content or drop images into `public/images/` and set
`img` on a card — the markup already supports an `<img>` face.

### Testimonials
Current quotes are **placeholders** with a visible "sample layout" disclaimer.
Overwrite `testimonials[]` in `data.ts` and remove the `.folders-note` line in
`page.tsx` once real client stories are approved.

## Motion map (desktop)

| Section | Pin length | What happens |
|---|---|---|
| Preloader | 1.5 s | % counter → curtain lift (skipped if `sessionStorage.teles-intro-seen`) |
| Hero | +100 % | headline mask-reveal, float cards parallax out, bust scales |
| Marquee | +300 % | sentence slides, 3D book does a full spin to its "$18 CAC" face |
| Stand out (crowd) | +170 % | slow zoom, headline mask-reveal, slabs rise into cases |
| Case studies | +280 % | horizontal track, deck parallax per panel, scatter burst at exit |
| Logo reveal | +140 % | 3D amber-glass T on pedestal, glow bloom + soft flash |
| Process | +300 % | ribbon draws itself, numbered nodes activate, side tapes counter-scroll |
| Testimonials | in-view | folder shells rise, flaps open (all viewports, no pin) |
| Footer | in-view | CTA reveal, tape pile drops in with `bounce.out`, cursor-push on tapes |

`prefers-reduced-motion`: loader/ghosts/scatter disabled, everything degrades to
short opacity fades (JS gate + CSS safety net).

## Verified

- 3 full verification passes against the 18 reference screenshots (1440×900) + mobile pass (390×844)
- Lighthouse desktop: **Performance 83–100 / Accessibility 100 / Best Practices 96 / SEO 100**
- axe (WCAG 2.0/2.1 AA): **0 violations**; skip-link → nav → CTA keyboard order
- 0 px horizontal overflow at both viewports; 0 console errors
- Static prerender, First Load JS ≈ 103 kB

## Known guesses / placeholders

See `REBUILD-REPORT.md` (bottom section) for every guess made where the
reference was ambiguous — testimonials, some locations, loader duration, etc.
