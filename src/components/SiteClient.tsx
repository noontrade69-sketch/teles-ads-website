"use client";

import { useEffect, useRef, useState } from "react";
import { Mark, Tape } from "./Mark";

/* ------------------------------------------------------------------ */
/*  0 · PRELOADER — charcoal, tape ribbons curl in, % counter,         */
/*  logo fade → blank beat → hero reveal. Scroll locked until done.   */
/* ------------------------------------------------------------------ */
function Loader() {
  const [mounted, setMounted] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const done = () => {
      document.documentElement.dataset.introSeen = "1";
      document.documentElement.classList.remove("is-loading");
      window.dispatchEvent(new Event("teles:intro-done"));
      setMounted(false);
    };
    if (sessionStorage.getItem("teles-intro-seen")) {
      document.documentElement.classList.remove("is-loading");
      setMounted(false);
      return;
    }
    try { sessionStorage.setItem("teles-intro-seen", "1"); } catch { /* storage disabled */ }

    const t0 = performance.now();
    const DUR = 2500;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / DUR);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        document.querySelector(".loader")?.classList.add("ld-done");
        setTimeout(done, 720); // 0.4s fade + 0.3s blank
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!mounted) return null;
  return (
    <div className="loader" aria-hidden="true">
      <Tape className="ld-tape ld-tape-a" repeat={4} />
      <Tape className="ld-tape ld-tape-b" repeat={4} />
      <div className="ld-center">
        <Mark />
        <span className="ld-word">TELES ADS<sup>®</sup></span>
      </div>
      <span className="ld-pct">{pct}%</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Custom cursor: "+" dot that becomes "×" over [data-cursor-x].      */
/* ------------------------------------------------------------------ */
function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    const move = (e: PointerEvent) => {
      if (!el) return;
      el.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
      el.classList.add("shown");
      el.classList.toggle("is-x", !!(e.target as Element)?.closest("[data-cursor-x]"));
    };
    const leave = () => el?.classList.remove("shown");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => { window.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave); };
  }, []);
  return <div className="cursor" ref={ref} aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/*  Motion: Lenis + GSAP ScrollTrigger choreography for all sections.  */
/* ------------------------------------------------------------------ */
function MotionController() {
  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;
    const init = async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap"), import("gsap/ScrollTrigger"), import("lenis"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const desktop = matchMedia("(min-width: 901px)").matches;

      /* reduced motion → static page, simple opacity fades only */
      if (reduce) {
        document.fonts?.ready.then(() => ScrollTrigger.refresh());
        gsap.utils.toArray<HTMLElement>(".hl > span, .folder, .pstep").forEach((el) => {
          gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: .6, scrollTrigger: { trigger: el, start: "top 92%", once: true } });
        });
        return;
      }

      let lenis: InstanceType<typeof Lenis> | undefined;
      let ticker: ((time: number) => void) | undefined;
      if (desktop) {
        lenis = new Lenis({ lerp: 0.09, anchors: true, respectReducedMotion: true });
        lenis.on("scroll", ScrollTrigger.update);
        ticker = (time) => lenis?.raf(time * 1000);
        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);
      }

      const ctx = gsap.context(() => {
        /* ---------- hero intro (after loader) ---------- */
        const heroIn = () => {
          gsap.fromTo(".hl > span", { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.1, ease: "power3.out" });
          gsap.fromTo(".eyebrow, .hero-sub, .hero-actions, .hero-note, .hero-badge",
            { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .8, stagger: 0.07, ease: "power2.out", delay: 0.25 });
        };
        if (document.documentElement.dataset.introSeen) heroIn();
        else window.addEventListener("teles:intro-done", heroIn, { once: true });

        /* ---------- 1 · HERO pin: cards drift up-left, ghost headline, bust sinks ---------- */
        if (desktop) {
          const cards = gsap.utils.toArray<HTMLElement>(".fcard");
          const heroTl = gsap.timeline({
            scrollTrigger: { trigger: ".hero", start: "top top", end: "+=100%", scrub: 0.8, pin: true, anticipatePin: 1 },
          });
          heroTl
            .to(".hero-h", { yPercent: -30, opacity: 0.12, ease: "none" }, 0)
            .to(".hero-ghost.g1", { opacity: 0.4, yPercent: -14, ease: "none" }, 0)
            .to(".hero-ghost.g2", { opacity: 0.22, yPercent: -26, ease: "none" }, 0)
            .to(".hero-ghost.g1", { opacity: 0, ease: "none" }, 0.55)
            .to(".hero-ghost.g2", { opacity: 0, ease: "none" }, 0.55)
            .to(".hero-bustwrap", { scale: 1.08, yPercent: 10, ease: "none" }, 0)
            .to(".eyebrow, .hero-sub, .hero-actions, .hero-note, .hero-badge", { opacity: 0, ease: "none" }, 0)
            .fromTo(".hero-peek", { yPercent: 130, opacity: 0 }, { yPercent: 22, opacity: 1, ease: "none" }, 0.45);
          cards.forEach((card) => {
            const d = parseFloat(card.dataset.depth || "1");
            heroTl.to(card, { y: -(140 + d * 190), x: -(30 + d * 80), rotation: d > 1.2 ? -6 : 5, ease: "none" }, 0);
          });

          /* mouse parallax: bust ±12px, cards by depth */
          const heroEl = document.querySelector<HTMLElement>(".hero");
          const onMove = (e: MouseEvent) => {
            const nx = e.clientX / innerWidth - 0.5;
            const ny = e.clientY / innerHeight - 0.5;
            gsap.to(".hero-bustwrap", { x: nx * -24, duration: 0.9, ease: "power2.out" });
            cards.forEach((card) => {
              const d = parseFloat(card.dataset.depth || "1");
              gsap.to(card, { x: nx * 26 * d, y: ny * 16 * d, duration: 0.9, ease: "power2.out" });
            });
          };
          heroEl?.addEventListener("mousemove", onMove);

          /* ---------- 2 · MARQUEE pin: giant sentence + book flip ---------- */
          const mq = gsap.timeline({
            scrollTrigger: { trigger: ".marquee", start: "top top", end: "+=300%", scrub: 0.8, pin: true, anticipatePin: 1 },
          });
const sent = document.querySelector<HTMLElement>(".marquee-sentence");
          if (sent) {
            mq.fromTo(sent, { x: 0 }, { x: () => Math.min(0, innerWidth - sent.scrollWidth - 48), ease: "none" }, 0);
          }
          mq.fromTo(".book-rot", { rotationY: -32 }, { rotationY: 208, ease: "none" }, 0);

          /* ---------- 3 · NOISE pin: zoom + slabs rise ---------- */
          const nz = gsap.timeline({
            scrollTrigger: { trigger: ".noise", start: "top top", end: "+=100%", scrub: 0.5, pin: true, anticipatePin: 1 },
          });
          nz.fromTo(".noise-img", { scale: 1, yPercent: 0 }, { scale: 1.2, yPercent: -6, ease: "none" }, 0)
            .to(".slab-yellow", { yPercent: 0, ease: "none", duration: 0.5 }, 0.5)
            .to(".slab-orange", { yPercent: 0, ease: "none", duration: 0.5 }, 0.56);

          /* ---------- 4 · CASES pin: horizontal + deck parallax + scatter ---------- */
          const track = document.querySelector<HTMLElement>(".cases-track");
          if (track) {
            const dist = () => -(track.scrollWidth - innerWidth);
            const cs = gsap.timeline({
              scrollTrigger: { trigger: ".cases", start: "top top", end: "+=280%", scrub: 0.8, pin: true, anticipatePin: 1, invalidateOnRefresh: true },
            });
            cs.to(track, { x: dist, ease: "none" }, 0)
              .to(".scatter", { opacity: 1, ease: "none", duration: 0.02 }, 0.62)
              .fromTo(".sc-photo", { x: 0, scale: 0.4, opacity: 0 }, { x: "4vw", scale: 1, opacity: 1, ease: "none", duration: 0.3 }, 0.64)
              .fromTo(".sc-julytab", { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, ease: "none", duration: 0.26 }, 0.64)
              .fromTo(".sc-app", { x: 0, scale: 0.4, opacity: 0 }, { x: "26vw", y: "18vh", scale: 1, opacity: 1, ease: "none", duration: 0.26 }, 0.66)
              .fromTo(".sc-1", { x: 0, y: 0, scale: 0.5, opacity: 0 }, { x: "-21vw", y: "-17vh", scale: 1, opacity: 1, ease: "none", duration: 0.28 }, 0.64)
              .fromTo(".sc-2", { x: 0, y: 0, scale: 0.4, opacity: 0 }, { x: "-9vw", y: "-21vh", scale: 1, opacity: 1, ease: "none", duration: 0.28 }, 0.66)
              .fromTo(".sc-3", { x: 0, y: 0, scale: 0.5, opacity: 0 }, { x: "19vw", y: "-15vh", scale: 1, opacity: 1, ease: "none", duration: 0.28 }, 0.66)
              .fromTo(".sc-4", { x: 0, y: 0, scale: 0.4, opacity: 0 }, { x: "-24vw", y: "19vh", scale: 1, opacity: 1, ease: "none", duration: 0.28 }, 0.68)
              .fromTo(".glitch", { opacity: 0.9 }, { opacity: 0.4, ease: "none", duration: 0.3 }, 0.7)
              .to(".scard", { xPercent: -4, scale: 0.94, ease: "none", duration: 0.14 }, 0.86);
            gsap.utils.toArray<HTMLElement>(".deck").forEach((deck, i) => {
              cs.fromTo(deck, { xPercent: 8 + i * 2 }, { xPercent: -8 - i * 2, ease: "none" }, 0);
            });
          }

          /* ---------- 5 · LOGO pin: glow expand + white flash ---------- */
          const lg = gsap.timeline({
            scrollTrigger: { trigger: ".logo", start: "top top", end: "+=140%", scrub: 0.8, pin: true, anticipatePin: 1 },
          });
          lg.fromTo(".logo-glow", { scale: 0.8, opacity: 0.7 }, { scale: 1.6, opacity: 1, ease: "none" }, 0)
            .fromTo(".logo-flash", { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.12 }, 0.86);

          /* ---------- 6 · PROCESS pin: ribbon draw + node activation ---------- */
          const rope = document.querySelector<SVGPathElement>(".ribbon-draw");
          const hi = document.querySelector<SVGPathElement>(".ribbon-hi");
          if (rope) {
            const len = rope.getTotalLength();
            gsap.set(rope, { strokeDasharray: len, strokeDashoffset: len });
            if (hi) { gsap.set(hi, { strokeDasharray: len, strokeDashoffset: len }); }
            const AT = [0.14, 0.46, 0.74, 0.955];
            const pin = document.querySelector<HTMLElement>(".process-pin");
            if (pin) {
              const sx = pin.clientWidth / 1000, sy = pin.clientHeight / 1400;
              AT.forEach((t, i) => {
                const pt = rope.getPointAtLength(len * t);
                const node = document.querySelectorAll<HTMLElement>(".pnode")[i];
                const step = document.querySelectorAll<HTMLElement>(".pstep")[i];
                if (node) { node.style.left = `${pt.x * sx}px`; node.style.top = `${pt.y * sy}px`; }
                if (step) {
                  const side = i % 2 ? 1 : -1;
                  const w = 330;
                  let lx = pt.x * sx + side * 72;
                  if (side === -1) lx -= w;
                  lx = Math.max(16, Math.min(pin.clientWidth - w - 16, lx));
                  step.style.left = `${lx}px`;
                  step.style.top = `${Math.max(210, pt.y * sy - 34)}px`;
                  step.style.textAlign = "left";
                  step.style.maxWidth = `${w}px`;
                }
              });
            }
            const pr = gsap.timeline({
              scrollTrigger: {
                trigger: ".process", start: "top top", end: "+=300%", scrub: 0.8, pin: true, anticipatePin: 1,
                onUpdate: (self) => {
                  document.querySelectorAll(".pnode").forEach((n, i) => n.classList.toggle("active", self.progress >= AT[i] - 0.02));
                  document.querySelectorAll(".pstep").forEach((n, i) => n.classList.toggle("active", self.progress >= AT[i] - 0.02));
                },
              },
            });
            pr.to(rope, { strokeDashoffset: 0, ease: "none" }, 0)
              .to(hi, { strokeDashoffset: 0, ease: "none" }, 0)
              .fromTo(".edge-ribbon-l", { yPercent: 6 }, { yPercent: -6, ease: "none" }, 0)
              .fromTo(".edge-ribbon-r", { yPercent: -6 }, { yPercent: 6, ease: "none" }, 0);
          }
        }

        /* ---------- 7 · FOLDERS reveal (all viewports, staggered) ---------- */
        gsap.utils.toArray<HTMLElement>(".folder").forEach((f, i) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: f, start: "top 86%", once: true } });
          tl.fromTo(f, { opacity: 0.4, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: (i % 2) * 0.08 });
          const paper = f.querySelector(".folder-paper");
          const flap = f.querySelector(".folder-flap");
          if (paper) tl.fromTo(paper, { y: 46 }, { y: 0, duration: 0.8, ease: "power3.out" }, 0.05);
          if (flap) tl.fromTo(flap, { rotateX: 8 }, { rotateX: 0, duration: 0.8, transformPerspective: 800, ease: "power3.out" }, 0.05);
        });

        /* ---------- 8 · FOOTER tape pile: fall, settle, cursor push ---------- */
        const pile = document.querySelector<HTMLElement>(".tape-pile");
        if (pile) {
          const strips = gsap.utils.toArray<HTMLElement>(".tp");
          /* Physics drop (matter-js) on desktop; CSS strips stay as the
             static fallback on mobile / reduced motion (handled in CSS/JSX). */
          if (window.innerWidth > 900) {
            pile.classList.add("phys");
            let raf = 0;
            let alive = true;
            let cursor = { x: -1e4, y: -1e4 };
            ScrollTrigger.create({
              trigger: ".footer", start: "top 80%", once: true,
              onEnter: async () => {
                const M = await import("matter-js");
                const W = pile.clientWidth;
                const H = pile.clientHeight;
                const engine = M.Engine.create({ gravity: { y: 1.5 } });
                const T = 600;
                M.Composite.add(engine.world, [
                  M.Bodies.rectangle(W / 2, H + T / 2 - 14, W * 2, T, { isStatic: true }),
                  M.Bodies.rectangle(-T / 2, H / 2, T, H * 3, { isStatic: true }),
                  M.Bodies.rectangle(W + T / 2, H / 2, T, H * 3, { isStatic: true }),
                ]);
                const bodies = strips.map((el, i) => {
                  const b = M.Bodies.rectangle(
                    W * (0.16 + (i / Math.max(1, strips.length - 1)) * 0.68),
                    -120 - i * 110,
                    el.offsetWidth,
                    el.offsetHeight,
                    { restitution: 0.16, friction: 0.72, frictionAir: 0.016, angle: (i % 2 ? 1 : -1) * (0.24 + (i % 3) * 0.09) },
                  );
                  M.Composite.add(engine.world, b);
                  return b;
                });
                const onMove = (e: PointerEvent) => {
                  const r = pile.getBoundingClientRect();
                  cursor = { x: e.clientX - r.left, y: e.clientY - r.top };
                };
                window.addEventListener("pointermove", onMove);
                const tick = () => {
                  if (!alive) return;
                  M.Engine.update(engine, 1000 / 60);
                  strips.forEach((el, i) => {
                    const b = bodies[i];
                    const dx = b.position.x - cursor.x;
                    const dy = b.position.y - cursor.y;
                    if (dx * dx + dy * dy < 170 * 170) {
                      const f = 1.1 / Math.max(70, Math.sqrt(dx * dx + dy * dy));
                      M.Body.applyForce(b, b.position, { x: dx * f * 0.0016, y: dy * f * 0.0009 });
                    }
                    el.style.transform = `translate(${b.position.x - el.offsetWidth / 2}px, ${b.position.y - el.offsetHeight / 2}px) rotate(${b.angle}rad)`;
                  });
                  raf = requestAnimationFrame(tick);
                };
                tick();
                (pile as HTMLElement & { _teardown?: () => void })._teardown = () => {
                  alive = false;
                  cancelAnimationFrame(raf);
                  window.removeEventListener("pointermove", onMove);
                };
              },
            });
          } else {
            ScrollTrigger.create({
              trigger: ".footer", start: "top 80%", once: true,
              onEnter: () => {
                strips.forEach((s, i) => {
                  gsap.fromTo(s, { yPercent: -160, rotation: 0, opacity: 0 },
                    { yPercent: 0, opacity: 1, rotation: (i - 2.5) * 7, duration: 1.1, ease: "bounce.out", delay: i * 0.08 });
                });
              },
            });
          }
          }

          /* section heading reveals outside pins */
        gsap.utils.toArray<HTMLElement>(".folders-head h2, .foot-cta h2").forEach((h) => {
          gsap.fromTo(h, { y: 42, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: h, start: "top 88%", once: true } });
        });
      });

      const progress = document.querySelector<HTMLElement>(".scroll-progress span");
      const trackScroll = () => { if (progress) progress.style.transform = `scaleX(${Math.max(0, Math.min(1, window.scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)))})`; };
      window.addEventListener("scroll", trackScroll, { passive: true }); trackScroll();

      cleanup = () => {
        window.removeEventListener("scroll", trackScroll);
        ctx.revert();
        if (ticker) gsap.ticker.remove(ticker);
        lenis?.destroy();
        ScrollTrigger.refresh();
      };
      ScrollTrigger.refresh();
    };
    init().catch(() => {});
    return () => { cancelled = true; cleanup(); };
  }, []);

  return <div className="scroll-progress" aria-hidden="true"><span /></div>;
}

export default function SiteClient() {
  return (
    <>
      <Loader />
      <MotionController />
      <Cursor />
    </>
  );
}
