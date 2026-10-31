import Image from "next/image";
import { contact } from "@/lib/data";

/* Eight tilted ad-creative cards orbiting the bust (typographic CSS cards —
   no invented client brands). Outer .fcard = GSAP parallax layer (data-depth),
   inner .fc-in = CSS bob + tilt, so the two transforms never fight. */
function FloatCards() {
  const cards = [
    { cls: "fc-money", depth: 1.4, bob: "5.2s", rot: "-14deg", pos: { left: "1%", top: "40%" }, body: <><span className="fc-torn" /><strong>$</strong><small>CASH FLOW / CREATIVE</small></> },
    { cls: "fc-grip", depth: 1, bob: "4.4s", rot: "9deg", pos: { left: "13%", top: "13%" }, body: <><strong>GRIP.</strong><span className="fc-ball"><i /><i /></span></> },
    { cls: "fc-july", depth: 1.7, bob: "6s", rot: "-8deg", pos: { left: "27%", top: "33%" }, body: <strong>JULY</strong> },
    { cls: "fc-ja", depth: 0.8, bob: "4.8s", rot: "16deg", pos: { right: "21%", top: "10%" }, body: <strong>JULY<br />AUGUST</strong> },
    { cls: "fc-stop", depth: 1.2, bob: "5.6s", rot: "12deg", pos: { right: "24%", top: "47%" }, body: <strong>STOP<br />WAITING</strong> },
    {
      cls: "fc-graf", depth: 1.5, bob: "4.2s", rot: "-11deg", pos: { right: "6%", top: "27%" }, body: <>
        <svg viewBox="0 0 120 90" preserveAspectRatio="none">
          <path d="M12 70 C30 10 55 84 72 26 S104 66 112 22" fill="none" stroke="#FFD60A" strokeWidth="7" strokeLinecap="round" />
          <path d="M20 80 C44 30 66 92 96 44" fill="none" stroke="#F4F5F7" strokeWidth="3" strokeLinecap="round" opacity=".7" />
        </svg>
        <small>MAKE / NOISE</small>
      </>,
    },
    { cls: "fc-edge", depth: 0.9, bob: "5s", rot: "18deg", pos: { right: "1%", top: "58%" }, body: <strong>↗</strong> },
    { cls: "fc-always", depth: 1.1, bob: "4.6s", rot: "-6deg", pos: { left: "5%", top: "10%" }, body: <><i /> ALWAYS ON</> },
  ];
  return (
    <div className="float-cards" aria-hidden="true">
      {cards.map((c) => (
        <div className="fcard" data-depth={c.depth} style={{ ...c.pos }} key={c.cls}>
          <div className={`fc-in ${c.cls}`} style={{ "--bob": c.bob, "--rot": c.rot } as React.CSSProperties}>
            {c.body}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top" aria-label="Intro">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-stage" aria-hidden="true">
        <div className="hero-halo" />
        <div className="hero-bustwrap" data-parallax="bust">
          <Image src="/images/hero-cut.png" alt="" width={742} height={1220} priority sizes="60vw" className="hero-bust" />
        </div>
        <FloatCards />
      </div>

      <div className="hero-peek" aria-hidden="true">Careful steps.</div>
      <div className="hero-inner">
        <p className="eyebrow"><i className="eyebrow-dot" /> TELEGRAM ADVERTISING, REIMAGINED</p>
        <div className="hero-hwrap">
          <h1 className="hero-h">
            <span className="hl"><span>Turn ads</span></span>
            <span className="hl"><span>into paying</span></span>
            <span className="hl"><span className="it">customers.</span></span>
          </h1>
          <div className="hero-ghost g1" aria-hidden="true"><span>Turn ads</span><span>into paying</span><span className="it">customers.</span></div>
          <div className="hero-ghost g2" aria-hidden="true"><span>Turn ads</span><span>into paying</span><span className="it">customers.</span></div>
        </div>
        <p className="hero-sub">
          Attention is easy to buy. Relevance takes a plan. We build Telegram-first
          campaigns, creative, and automation around the people you actually want to reach.
        </p>
        <div className="hero-actions">
          <a className="pill pill-yellow" href={contact.book}>
            <span className="chip" aria-hidden="true">You</span>
            <span className="chip chip-founder" aria-hidden="true">ST</span>
            Book a call
            <span className="pill-arrow" aria-hidden="true">↗</span>
          </a>
          <a className="text-link" href="#work">
            See our approach <span aria-hidden="true">↘</span>
          </a>
        </div>
      </div>

      <a className="hero-badge" href={contact.book} data-cursor-x aria-label="BOOK A CALL · TELES ADS · BOOK A CALL ·">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <path id="badge-circ" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1 -76 0" />
          </defs>
          <text>
            <textPath href="#badge-circ">BOOK A CALL · TELES ADS ·</textPath>
          </text>
        </svg>
        <span className="badge-plus" aria-hidden="true">+</span>
      </a>

      <p className="hero-note micro">
        Google and Meta ads managed by the founder — Shah Tosif.
        <br />
        Not an account manager.
      </p>
    </section>
  );
}
