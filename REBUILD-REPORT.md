# Rebuild report — Campaign Studio → TELES ADS (PDF-spec rebuild)

## Why the rebuild happened
The previous build (Campaign Studio) accumulated invented sections, extra
animation layers and wrong elements. The user supplied a full PDF breakdown
(18 screenshots of the finished reference site + per-section motion notes) and
asked for an exact rebuild under the **TELES ADS** brand with **Shah Tosif** as
founder, verified 3× against the PDF before finishing.

## Before / After / Why

| # | Before (Campaign Studio) | After (teles-studio) | Why (reference) |
|---|---|---|---|
| 1 | Many extra sections/blocks invented | Exactly 9 blocks: preloader, hero, marquee+book, crowd, cases, 3D logo, process, testimonials, footer | PDF shows a fixed section order s00–s17 |
| 2 | Animation on everything | Motion only where the PDF notes it; ≤0.6–1.1 s reveals, scrub 0.6–1 | Spec tokens; user complaint "too much animation" |
| 3 | No preloader | 1.5 s % counter preloader with sessionStorage skip | s00 shows counter preloader |
| 4 | Generic hero | Mask-revealed serif headline, tape-wrapped bust, 8 orbiting typographic float cards, rotating badge, founder note | s01–s02, s05 |
| 5 | — | Marquee sentence + 3D spinning book showing "$18 CAC" / "Optimization." faces | s03–s04 |
| 6 | — | Crowd photo + gold figure + floating logomark + rising slabs | s06–s07 |
| 7 | Case grid | Pinned horizontal 3-panel track w/ stat pills + fanned creative decks + scatter/glitch exit | s08–s11 |
| 8 | — | Large amber-glass 3D "T" on pedestal, pointer-follow sway, glow bloom + flash | s09 |
| 9 | — | Hand-drawn yellow ribbon that draws itself, 4 numbered steps, counter-scrolling edge tapes | s12–s14 |
| 10 | Plain quote cards | Ink folder shells, glossy yellow flaps, paper quotes, bookmark tabs, verified ticks | s15–s16 |
| 11 | — | Charcoal footer, "Let's see…" CTA, PDF-exact link columns, falling tape pile (bounce.out), rotated credit | s17 |
| 12 | Brand gaps | TELES ADS everywhere, zero "Wikala" hits, founder named in JSON-LD + hero note + credit | User requirement |
| 13 | Unmeasured | Lighthouse 83–100/100/96/100, axe 0 violations, 0 overflow, 3 verify passes | Spec checklist |

## Deliberate deviations (and why)
- **Loader runs 1.5 s**, not the ~2.5–3 s in the reference video: snappier first
  paint; the reference length includes network load, not pure theater.
- **Testimonials & case metrics are placeholders** — the PDF itself notes they
  are placeholders; a visible "sample layout" disclaimer ships until real
  client stories are approved.
- **Creative card art is typographic** — no invented client brand prints
  (anti-slop rule); swap guide in README.

## Guesses made where the reference was ambiguous
1. Step names 01 "Read" / 04 "Scale" (02 "Build" / 03 "Plan" are confirmed in stills).
2. Daniel Okafor → Lagos, NG (ref hint looked like London, UK but was unreadable).
3. Marcus Reyes → Austin, TX (location illegible in ref).
4. Testimonial quotes are paraphrase placeholders in the reference's voice.
5. Stat pills identical across all three case panels (matches the ref stills).
6. Telegram link → `t.me/TelesAds` placeholder handle.
7. Book's second face copy ("Optimization.") inferred from the blur in s04.
8. Footer COMPANY/SOCIAL link targets are placeholders (labels now PDF-exact:
   Our expertise/Pricing/Blog/Contact us + Instagram/X/LinkedIn).
9. Process ribbon exact curve is hand-tuned to match the ref's sweep, not traced.
10. Badge rotation speed; loader length tuned to the spec's ~2.4 s (was 1.5 s in v1).

## Verification evidence
- Desktop rounds: `teles-studio-qa/r1/`, `r2/`, `r3/` (18 frames each, 1440×900)
- Mobile round: `teles-studio-qa/r3-mobile/` (390×844, reduced-motion emulated)
- Lighthouse: `teles-studio-qa/lighthouse-final.json`
- aXe: 0 WCAG2 A/AA violations; keyboard order: skip-link → brand → nav → CTA
