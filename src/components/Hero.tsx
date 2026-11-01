import Image from "next/image";
import type { CSSProperties } from "react";
import { contact } from "@/lib/data";

/* Section 1 — Hero. Exactly the reference inventory: nav (in page.tsx),
   3-line headline, mannequin bust wrapped in lettered ADVERTISEMENT tape,
   8 rich ad-poster cards, rotating circular badge, bottom-left pill with
   two avatar chips, small gray line bottom-right. Nothing else. */

function GripBall() {
  return (
    <svg viewBox="0 0 100 100" className="fc-art" aria-hidden="true">
      <circle cx="50" cy="54" r="34" fill="#ffb199" />
      <path d="M50 20 C36 40 36 68 50 88 M50 20 C64 40 64 68 50 88" stroke="#7a0d00" strokeWidth="3" fill="none" />
      <path d="M16 54 H84" stroke="#7a0d00" strokeWidth="3" />
    </svg>
  );
}

function GrafTag() {
  return (
    <svg viewBox="0 0 120 60" className="fc-art fc-art-wide" aria-hidden="true">
      <path d="M8 44 C28 8 44 58 62 22 C74 0 86 52 112 16" stroke="#FFD60A" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M8 52 C28 18 46 64 64 30 C76 10 88 58 112 26" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

const cards = [
  { cls: "fc-money", depth: 1.4, bob: "5.2s", rot: "-14deg", pos: { left: "2%", top: "40%" }, body: (<><small>CLIENT AVERAGE</small><strong>$18<small className="fc-unit">CAC</small></strong></>) },
  { cls: "fc-paper", depth: 1.1, bob: "4.4s", rot: "20deg", pos: { left: "12%", top: "12%" }, body: (<><i className="rip rip-a" /><i className="rip rip-b" /><i className="rip rip-c" /><span className="rip-tag">/// AD</span></>) },
  { cls: "fc-grip", depth: 1.5, bob: "4.8s", rot: "9deg", pos: { left: "24%", top: "34%" }, body: (<><GripBall /><strong>GRIP.</strong></>) },
  { cls: "fc-july", depth: 1.7, bob: "6s", rot: "-8deg", pos: { left: "6%", top: "64%" }, body: (<strong>JULY</strong>) },
  { cls: "fc-ja", depth: 0.8, bob: "4.6s", rot: "16deg", pos: { right: "20%", top: "12%" }, body: (<><strong>JULY<small>AUG</small></strong></>) },
  { cls: "fc-stop", depth: 1.2, bob: "5.6s", rot: "12deg", pos: { right: "25%", top: "46%" }, body: (<><small>WHY</small><strong>STOP<br />WAITING</strong></>) },
  { cls: "fc-graf", depth: 1.4, bob: "4.2s", rot: "-11deg", pos: { right: "5%", top: "24%" }, body: (<><GrafTag /><strong>MAKE / NOISE</strong></>) },
  { cls: "fc-edge", depth: 0.9, bob: "5s", rot: "18deg", pos: { right: "2%", top: "62%" }, body: (<><svg viewBox="0 0 40 40" className="fc-art" aria-hidden="true"><path d="M8 32 L32 8 M14 8 H32 V26" stroke="#fff" strokeWidth="5" fill="none" /></svg><small>SCALE</small></>) },
];

export default function Hero() {
  return (
    <section className="hero" id="top" aria-label="Intro">
      <div className="hero-stage" aria-hidden="true">
        <div className="hero-ghosts">
          <h1 className="hero-ghost g1">Turn ads into paying customers.</h1>
          <h1 className="hero-ghost g2">Turn ads into paying customers.</h1>
        </div>
        {cards.map((c) => (
          <div className="fcard" data-depth={c.depth} style={{ ...c.pos }} key={c.cls}>
            <div className={`fc-in ${c.cls}`} style={{ "--rot": c.rot, "--bob": c.bob } as CSSProperties}>
              {c.body}
            </div>
          </div>
        ))}
        <div className="hero-bustwrap">
          <Image src="/images/hero-cut.png" alt="" width={742} height={1220} priority sizes="60vw" className="hero-bust" />
        </div>
      </div>

      <div className="hero-peek" aria-hidden="true">Careful steps.</div>

      <div className="hero-inner">
        <h1 className="hero-h">
          <span className="hl"><span>Turn ads</span></span>
          <span className="hl"><span>into paying</span></span>
          <span className="hl"><span className="it">customers.</span></span>
        </h1>
        <div className="hero-actions">
          <a className="pill pill-yellow" href={contact.book}>
            <span className="chip chip-you">You</span>
            <span className="chip chip-st">ST</span>
            Book a call <b className="pill-arr">↗</b>
          </a>
        </div>
      </div>

      <a className="hero-badge" href={contact.book} data-cursor-x aria-label="BOOK A CALL · TELES ADS · BOOK A CALL ·">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <path id="badge-circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
          </defs>
          <text>
            <textPath href="#badge-circ">BOOK A CALL · TELES ADS · BOOK A CALL ·</textPath>
          </text>
        </svg>
        <b>+</b>
      </a>

      <p className="hero-note micro">
        GOOGLE AND META ADS MANAGED BY THE FOUNDER — SHAH TOSIF.<br />
        NOT AN ACCOUNT MANAGER.
      </p>
    </section>
  );
}
