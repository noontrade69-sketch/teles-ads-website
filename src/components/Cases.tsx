import Image from "next/image";
import { cases } from "@/lib/data";

/* Deck of white-outlined creative cards per panel (typographic — no invented
   client brands; imagery reuses the site's own art direction). */
function Deck({ tone }: { tone: "yellow" | "orange" | "red" }) {
  return (
    <div className="deck" aria-hidden="true">
      <div className="dcard dc-1"><span>{tone === "red" ? "TRUST / FIRST" : "STOP / WAITING"}</span></div>
      <div className="dcard dc-2">
        <Image src="/images/poster-art.webp" alt="" width={220} height={280} sizes="180px" />
      </div>
      <div className="dcard dc-3"><span>LESS NOISE<br />MORE SIGNAL</span></div>
      <div className="dcard dc-4"><strong>{tone === "yellow" ? "$" : tone === "orange" ? "GRIP." : "ZGN."}</strong></div>
      <div className="dcard dc-5"><span>RIGHT PLACE / RIGHT TIME</span></div>
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

        {/* After the panels: charcoal scatter with RGB-split glitch card */}
        <div className="scatter" aria-hidden="true">
          <div className="scard sc-1"><span>ULTIAN<br />RECALL</span></div>
          <div className="scard sc-2"><i /></div>
          <div className="scard sc-3"><span>JULY</span></div>
          <div className="scard sc-4"><i /></div>
          <div className="scard sc-photo">
            <div className="glitch g-r" />
            <div className="glitch g-c" />
            <Image src="/images/poster-art.webp" alt="" width={480} height={480} sizes="40vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
