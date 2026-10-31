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
    const DUR = 2400;
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
        gsap.utils.toArray<HTMLElement>(".hl > span, .nl > span, .folder, .pstep").forEach((el) => {
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
          mq.fromTo(".marquee-sentence", { xPercent: 4 }, { xPercent: -38, ease: "none" }, 0)
            .fromTo(".book-rot", { rotationY: -32 }, { rotationY: 208, ease: "none" }, 0);

          /* ---------- 3 · NOISE pin: zoom + slabs rise ---------- */
          const nz = gsap.timeline({
            scrollTrigger: { trigger: ".noise", start: "top top", end: "+=170%", scrub: 0.8, pin: true, anticipatePin: 1 },
          });
          nz.fromTo(".noise-h .nl > span", { yPercent: 110 }, { yPercent: 0, duration: 0.22, stagger: 0.06, ease: "power3.out" }, 0.01)
            .fromTo(".noise-aside", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.15 }, 0.08)
            .fromTo(".noise-img", { scale: 1, yPercent: 0 }, { scale: 1.18, yPercent: -6, ease: "none" }, 0)
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
              .fromTo(".sc-1", { x: 0, y: 0, scale: 0.5, opacity: 0 }, { x: "-32vw", y: "-26vh", scale: 1, opacity: 1, ease: "none", duration: 0.3 }, 0.64)
              .fromTo(".sc-2", { x: 0, y: 0, scale: 0.4, opacity: 0 }, { x: "-14vw", y: "-30vh", scale: 1, opacity: 1, ease: "none", duration: 0.3 }, 0.66)
              .fromTo(".sc-3", { x: 0, y: 0, scale: 0.5, opacity: 0 }, { x: "30vw", y: "-24vh", scale: 1, opacity: 1, ease: "none", duration: 0.3 }, 0.66)
              .fromTo(".sc-4", { x: 0, y: 0, scale: 0.4, opacity: 0 }, { x: "-26vw", y: "22vh", scale: 1, opacity: 1, ease: "none", duration: 0.3 }, 0.68)
              .fromTo(".sc-photo", { x: 0, scale: 0.4, opacity: 0 }, { x: "6vw", scale: 1, opacity: 1, ease: "none", duration: 0.34 }, 0.66)
              .fromTo(".glitch", { opacity: 0.9 }, { opacity: 0.35, ease: "none", duration: 0.3 }, 0.7);
            gsap.utils.toArray<HTMLElement>(".deck").forEach((deck, i) => {
              cs.fromTo(deck, { xPercent: 8 + i * 2 }, { xPercent: -8 - i * 2, ease: "none" }, 0);
            });
          }

          /* ---------- 5 · LOGO pin: glow expand + white flash ---------- */
          const lg = gsap.timeline({
            scrollTrigger: { trigger: ".logo", start: "top top", end: "+=140%", scrub: 0.8, pin: true, anticipatePin: 1 },
          });
          lg.fromTo(".logo-glow", { scale: 0.8, opacity: 0.7 }, { scale: 1.6, opacity: 1, ease: "none" }, 0)
            .fromTo(".logo-flash", { opacity: 0 }, { opacity: 0.9, ease: "none", duration: 0.1 }, 0.9);

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
              .fromTo(".edge-tape-l", { yPercent: 8 }, { yPercent: -8, ease: "none" }, 0)
              .fromTo(".edge-tape-r", { yPercent: -8 }, { yPercent: 8, ease: "none" }, 0);
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
        const pile = document.querySelector(".tape-pile");
        if (pile) {
          const strips = gsap.utils.toArray<HTMLElement>(".tp");
          ScrollTrigger.create({
            trigger: ".footer", start: "top 80%", once: true,
            onEnter: () => {
              strips.forEach((s, i) => {
                gsap.fromTo(s, { yPercent: -160, rotation: 0, opacity: 0 },
                  { yPercent: 0, opacity: 1, rotation: (i - 2.5) * 7, duration: 1.1, ease: "bounce.out", delay: i * 0.08 });
              });
            },
          });
          if (desktop) {
            const foot = document.querySelector<HTMLElement>(".footer");
            const onMove = (e: MouseEvent) => {
              const nx = e.clientX / innerWidth - 0.5;
              strips.forEach((s, i) => gsap.to(s, { x: nx * (10 + i * 4), duration: 1.1, ease: "power2.out" }));
            };
            foot?.addEventListener("mousemove", onMove);
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
