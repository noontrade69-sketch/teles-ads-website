import Image from "next/image";
import { cases } from "@/lib/data";

/* Deck of large fanned poster creatives per panel (typographic + SVG art —
   no invented client brands; imagery reuses the site's own art direction).
   Lower ~58% of the panel, cards ~44% of panel width, rotateY(-18deg),
   depth steps, each shifted ~8% right, front card largest. */

function PosterArt({ i }: { i: number }) {
  // small generative accents so no two faces repeat
  if (i === 1)
    return (
      <svg viewBox="0 0 100 130" className="pa" aria-hidden="true">
        <circle cx="50" cy="52" r="30" fill="currentColor" opacity="0.9" />
        <path d="M50 22 C40 42 40 62 50 82 M50 22 C60 42 60 62 50 82" stroke="rgba(0,0,0,.4)" strokeWidth="2.5" fill="none" />
        <path d="M20 52 H80" stroke="rgba(0,0,0,.4)" strokeWidth="2.5" />
      </svg>
    );
  if (i === 2)
    return (
      <svg viewBox="0 0 100 130" className="pa" aria-hidden="true">
        <path d="M12 96 C30 60 42 118 58 78 C70 50 82 96 92 62" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
        <rect x="12" y="14" width="30" height="8" fill="currentColor" opacity="0.55" />
      </svg>
    );
  if (i === 3)
    return (
      <svg viewBox="0 0 100 130" className="pa" aria-hidden="true">
        <path d="M20 108 L50 24 L80 108 Z" fill="none" stroke="currentColor" strokeWidth="5" />
        <circle cx="50" cy="82" r="9" fill="currentColor" />
      </svg>
    );
  return null;
}

function Deck({ tone }: { tone: "yellow" | "orange" | "red" }) {
  const faces: { kind: "word" | "art" | "photo" | "art2"; top: string; big?: string; big2?: string }[] = [
    { kind: "word", top: "WHY", big: "STOP /", big2: "WAITING" },
    { kind: "art", top: "CAMPAIGN", big: "GRIP." },
    { kind: "photo", top: "FIELD NOTES" },
    { kind: "art2", top: "SIGNAL", big: "18→" },
    { kind: "word", top: "MEDIA", big: "RIGHT", big2: "PLACE" },
  ];
  return (
    <div className="deck" aria-hidden="true">
      {faces.map((f, i) => (
        <div className={`dcard dc-${i + 1}`} key={i}>
          <small>{f.top}</small>
          {f.kind === "photo" ? (
            <Image src="/images/poster-art.webp" alt="" fill sizes="45vw" className="dphoto" />
          ) : (
            <PosterArt i={i} />
          )}
          <span>
            {f.big}
            {f.big2 ? <><br />{f.big2}</> : null}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Cases() {
  return (
    <section className="cases" id="work" aria-label="Case studies">
      <div className="cases-pin">
        <div className="cases-track">
          {cases.map((c) => (
            <article className={`case case-${c.tone}`} key={c.id}>
              <div className="case-top">
                <div className="case-id">
                  <span className="micro">{c.category}</span>
                  <h3 className="case-name">{c.name}</h3>
                </div>
                <div className="case-stats" role="list">
                  {c.stats.map((s) => (
                    <span className="stat-pill" role="listitem" key={s}>{s}</span>
                  ))}
                </div>
              </div>
              <Deck tone={c.tone} />
              <p className="case-disc micro">Illustrative concept — not a client result.</p>
            </article>
          ))}
        </div>

        {/* After the panels: charcoal scatter — fewer, larger cards, motion
            blur feel, big foliage photo with RGB-split/pixel-stretch glitch,
            vertical JULY tab, red app-icon card. Converge before the logo. */}
        <div className="scatter" aria-hidden="true">
          <div className="scard sc-julytab"><span>JULY</span></div>
          <div className="scard sc-app"><b>▲</b></div>
          <div className="scard sc-2"><i /></div>
          <div className="scard sc-3"><span>STOP<br />WAITING</span></div>
          <div className="scard sc-photo">
            <div className="glitch g-r" />
            <div className="glitch g-c" />
            <Image src="/images/foliage.jpg" alt="" fill sizes="45vw" className="dphoto" />
          </div>
          <div className="scard sc-1"><span>MAKE /<br />NOISE</span></div>
        </div>
      </div>
    </section>
  );
}
