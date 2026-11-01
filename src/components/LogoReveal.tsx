"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/* Section 5 — logo animation (round-2 spec).
   Pre-rendered emblem placeholder (owner will supply the final render) —
   swap /public/images/logo-emblem.png, nothing else needs to change.
   No live WebGL: GSAP ScrollTrigger + CSS only.
   - emblem ~73% viewport height (with stand ~92%), horizontally centered
   - charcoal-olive #2B2B22 stage, faint warm radial glow behind
   - glow pulse, slight cursor parallax, scale 0.9 -> 1 with scroll
   - flash grows from the core to pure #F4F5F7 over the last 15% of the pin */

export default function LogoReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      const img = el.querySelector<HTMLElement>(".logo-emblem");
      if (img) img.style.translate = `${nx * -14}px ${ny * -8}px`;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section className="logo" aria-label="TELES ADS mark">
      <div className="logo-pin" ref={ref}>
        <div className="logo-glow" aria-hidden="true" />
        {/* PLACEHOLDER emblem — owner to supply final pre-rendered asset */}
        <Image className="logo-emblem" src="/images/logo-emblem.png?v=2" alt="" fill sizes="100vw" priority={false} />
        <div className="logo-flash" aria-hidden="true" />
      </div>
    </section>
  );
}
