# Changelog — fix report (Fix-Report-and-Prompt.pdf), verified at 1920×1080, 1440×810, 390×844

## Reference match pass ("not even 30% match" audit) — frame-by-frame vs PDF landscape pages + fx frames

| Section | Change |
|---|---|
| Hero | Headline 8vw→6.5vw (ref ≈95px @1440); bust enlarged to 158% vh, cropped at the fold like ref pg-000; cards layered ON TOP of the bust (z-index), like every ref frame |
| Marquee | Book enlarged to 470px; timeline holds the OPEN spread ($18 CAC yellow + orange) ~58% of the pin, then flips |
| Crowd | Zoom reworked to ref tightness: 1→2.35× with accelerating ease + downward drift, holds the framed figure, THEN slabs rise at 72%/78% |
| Case decks | Front cards ~47vw / deck band 82% of panel height (ref ~85%) |
| Scatter | Photo card 40vw×54vh; spread widened to full viewport edge-to-edge (ref pg-029); white 2px outlines on all cards |
| Logo emblem | Placeholder REGENERATED as the chevron-W crown from pg-030 (mirrored chevron wings, center-gap white-hot core, column stand, floor ellipse); cache-busted ?v=2 |
| Process | Ribbon thickened 34→46; nodes 58→84px chips (inactive gray/white, active black/yellow like ref pg-031–033) |
| Testimonials | Flap layout flipped to ref pg-034/035: tall yellow flap with big serif name at bottom, quote paper peeking on top; names 34px |
| Footer | 10 ribbons (was 6), each ~2× thick, denser pile 44vh; physics replaced with deterministic staggered drop (matter-js out of the bundle) |
| A11y | Inactive process chips darkened + subtitle #63625c — axe now 0 violations on mobile AND desktop; Lighthouse A100 |

## Round 2 review (Round2-Review-and-Prompt.pdf / fix-prompt-2.txt) — verified 1440×810 + 390×844

| # | Item | Status | Evidence / notes |
|---|------|--------|------------------|
| 1 | Hero bust regression — restore classical tape bust | **Fixed** | hero-cut.png on hero + $18 CAC marquee card (same image both places). The regression had already been rolled back at round-8 start; re-verified, nothing changed this round. r9/item1-hero.png vs r8/m-hero.png |
| 2 | Delete 3D "T" → pre-rendered emblem + GSAP/CSS only | **Fixed (placeholder)** | MarkScene.tsx (WebGL) deleted — page loads with zero WebGL. New LogoReveal.tsx renders logo-emblem.png (generated PLACEHOLDER — owner to swap final asset at /public/images/logo-emblem.png) with ScrollTrigger scale 0.9→1, glowPulse, pointer parallax; flash is pure #F4F5F7 radial growing from the core; process starts only after flash on #F4F5F7 (no cream). Emblem ~39vw/73vh placeholder, no T, no flat circle, no pedestal. r9/item2-logo/-flash/-after-flash.png |
| 3 | Case decks too empty | **Fixed** | Front card clamp(320px,44vw,660px) ≈45% of panel width, deck band 60% of panel height, 8%/step stack shifts, white 2px outlines + rotateY(-18°) kept; labels/pills untouched. r9/item3-deck.png |
| 4 | Card scatter too small/sparse | **Fixed** | Foliage glitch card 28vw×45vh (pixel-stretch + RGB-split kept), five 15vw cards, vertical JULY tab kept, converge to center before logo scene preserved. r9/item4-scatter.png |
| 5 | Crowd→case transition slabs | **Fixed** | Flat yellow (58%) + orange (42%) slabs rise from bottom at 42%/47% of the crowd pin, meet flush with zero seam, become the first case panels. Found + fixed GSAP 3.15 bug: CSS translateY(%) parse makes .to(yPercent) a no-op — fromTo with explicit y:0. r9/item5-slabs*.png |
| 6 | Verify preloader / mobile / perf | **Done** | Preloader untouched (tape ribbons, % counter, cross-fade). 390×844: overflow 0px, no console errors. axe: 0 new violations (1 pre-existing 4.18:1 contrast on process subtitle, present on live r8 too). Lighthouse desktop P97/A96/BP96/SEO100 (observed LCP 372ms; A96 is the same contrast item). lighthouse-r9.json, r9-mobile/ |

---

| # | Item | Status | Evidence / notes |
|---|------|--------|------------------|
| 1 | Big 3D "T" scene removed → logo animation | **Fixed** | R3F scene rebuilt: small amber-glass logomark (~38vh max), thin metal stand + floor highlight, emissive white core, ±15° Y sway + cursor parallax, amber/gold only, no red. End flash is pure #F4F5F7 white (was cream). PNG fallback of the same object for low-end devices. Verified r5/01-logo-1440.png |
| 2 | Marquee text doubled | **Fixed** | Root cause: the sentence track was 2 copies moved by xPercent (offset mismatch after font load). Now a single copy driven by measured scrollWidth (function-based x, font-load ScrollTrigger.refresh). Clean at every position, passes behind the card. r5/02-marquee-1440.png |
| 3 | Crowd section wrong photo + extras | **Fixed** | Replaced with the spec image: seated B/W audience in white 3D glasses, one seated gold tape-wrapped figure (generated), static logomark above. Only scroll-zoom 1→1.2 (scrub 0.5) + slight drift remains; headline/aside static; bobbing removed; slabs kept. r5/03-noise-1440.png |
| 4 | Case panels empty | **Fixed** | Decks rebuilt: 5 large 3:4 poster creatives (~40vw), white 2px outlines, rotateY(-18°) + translateZ steps, ~8% right shifts, front card largest, rich type/SVG/photo faces. Panels: saturated solid radial glow. Parallax between deck and panel kept; hover lift kept. r5/04-cases-1440-v2.png |
| 5 | Hero extras + flat cards + bust | **Fixed** | Removed eyebrow, gray paragraph, "See our approach". Cards rebuilt as rich posters (torn-paper portrait, GRIP basketball poster, STOP WAITING sticker, JULY/AUGUST, black graffiti-tag card, $18 CAC), 8 cards ~10–14vw, rotations −18…+20°, clustered lower-left + around the neck, face clear. Bust regenerated: golden mannequin, head fully wrapped in yellow lettered ADVERTISEMENT tape (spec prompt used verbatim), transparent PNG. r5/05-hero-1440.png |
| 6 | Scatter too small/sparse, no glitch | **Fixed** | Fewer, larger cards (up to ~26vw photo card), motion steps + RGB-split/pixel-stretch glitch on the big foliage photo (dual hue-shifted clones animating scaleX/translate), vertical JULY edge tab, red app-icon card, converge-to-center step at the end. r5/06-scatter-1440.png |
| 7 | Process edge tapes rigid | **Fixed** | Straight strips replaced by curling SVG ribbons (stroke paths with ADVERTISEMENT /// lettering on textPath), draped along both edges, slow parallax kept. Main ribbon + nodes untouched (already matched). r5/07-process-1440.png |
| 8 | Footer tape small/parallel | **Fixed** | 6 wide strips (760px+, 30px lettering) crossing in an X, matter-js physics: fall in, collide, settle on footer enter; cursor pushes them; bounce-out CSS fallback under reduced motion / ≤900px. r5/08-footer-1440.png |
| 9 | Folder tab silhouette | **Fixed** | Black shell now has the top-left tab carrying the 5 stars (shell is no longer a plain rounded rectangle); paper-slide reveal + "Sample layout" footnote kept. r5/09-folders-1440.png |
| 10 | Preloader verify | **Fixed (verified)** | Charcoal, logomark over white serif wordmark, two tape ribbons curl from top-left/bottom-right, % counter bottom-right, 2.5s total → cross-fade to hero. r5/00-preloader.png |
| P2 | Cursor +/×, rotating badge, nav dot/underline, hovers, anchors, reduced-motion, Lighthouse ≥80, no CLS | **Verified** | axe WCAG A/AA: 0 violations; Lighthouse desktop: Perf 98 / A11y 96→100 / BP 96 / SEO 100 (final run after contrast fix); 0px overflow at all 3 viewports; 0 console errors |

Not possible / deliberate: none — all 10 items implemented. Placeholder content (testimonials, stats, social links) is unchanged by design, per "keep the content".
