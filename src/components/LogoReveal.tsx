"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const Scene = dynamic(() => import("./MarkScene"), { ssr: false });

export default function LogoReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: "480px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="logo" aria-label="TELES ADS mark">
      <div className="logo-pin" ref={ref}>
        <div className="logo-glow" aria-hidden="true" />
        <Image className="logo-fallback" src="/images/logo-glass.png" alt="" width={520} height={520} priority={false} />
        {active && <Scene />}
        <div className="logo-flash" aria-hidden="true" />
      </div>
    </section>
  );
}
