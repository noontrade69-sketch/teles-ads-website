import { Tape } from "@/components/Mark";
import { steps } from "@/lib/data";

/* Section 6 — scroll-drawn glossy yellow ribbon with a loop between 02 and 03.
   Node positions are hand-placed to sit on the path. */
const PATH = "M-60 360 C220 280 430 330 320 470 C240 566 330 640 480 630 C650 618 705 510 625 510 C565 510 575 630 665 680 C765 736 785 850 705 930 C615 1020 435 970 385 1090 C335 1210 475 1270 625 1290 C765 1308 830 1390 890 1520";

/* percentages of the path where each node sits (measured by eye on the curve) */
const NODE_POS = [
  { x: "30%", y: "36%" },
  { x: "66%", y: "47%" },
  { x: "27%", y: "77%" },
  { x: "80%", y: "97%" },
];

export default function Process() {
  return (
    <section className="process" id="process" aria-label="Process">
      <div className="process-pin">
        <div className="process-head">
          <h2>Four steps, then<br />steady growth</h2>
          <p>We rebuild the account around the searches and audiences that actually convert.</p>
        </div>

        <svg className="ribbon" viewBox="0 0 1000 1400" preserveAspectRatio="none" aria-hidden="true">
          <path className="ribbon-ghost" d={PATH} />
          <path className="ribbon-hi" d={PATH} />
          <path className="ribbon-draw" d={PATH} />
        </svg>

        {steps.map((s, i) => (
          <div key={s.n}>
            <div className={`pnode`} data-step={i} style={{ left: NODE_POS[i].x, top: NODE_POS[i].y }}>
              <span>{s.n}</span>
            </div>
            <div className={`pstep`} data-step={i} style={{ left: NODE_POS[i].x, top: NODE_POS[i].y }}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          </div>
        ))}
        <svg className="edge-ribbon edge-ribbon-l" viewBox="0 0 300 900" aria-hidden="true">
          <defs><path id="erl" d="M-40 40 C120 120 240 60 200 220 C160 380 40 340 80 500 C120 660 240 600 220 780 C210 850 160 880 120 890" /></defs>
          <use href="#erl" fill="none" stroke="#FFD60A" strokeWidth="34" />
          <text className="edge-ribbon-text"><textPath href="#erl">ADVERTISEMENT /// ADVERTISEMENT /// ADVERTISEMENT /// ADVERTISEMENT ///</textPath></text>
        </svg>
        <svg className="edge-ribbon edge-ribbon-r" viewBox="0 0 300 900" aria-hidden="true">
          <defs><path id="err" d="M340 60 C200 20 90 140 180 260 C270 380 320 300 280 460 C240 620 120 560 160 720 C190 830 260 850 300 870" /></defs>
          <use href="#err" fill="none" stroke="#FFD60A" strokeWidth="34" />
          <text className="edge-ribbon-text"><textPath href="#err">ADVERTISEMENT /// ADVERTISEMENT /// ADVERTISEMENT /// ADVERTISEMENT ///</textPath></text>
        </svg>
      </div>
    </section>
  );
}
