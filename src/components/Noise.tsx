import Image from "next/image";
import { Mark } from "@/components/Mark";

/* Section 3 — "Stand out from the noise…" B/W crowd with the golden figure,
   zoom-parallax, floating logomark, then yellow/orange slabs rise and become
   the first case-study panels. */
export default function Noise() {
  return (
    <section className="noise" id="about" aria-label="Stand out from the noise">
      <div className="noise-pin">
        <div className="noise-img" aria-hidden="true">
          <Image src="/images/crowd.webp" alt="" fill sizes="100vw" quality={85} />
        </div>
        <div className="noise-shade" aria-hidden="true" />
        <Mark className="noise-mark" />

        <h2 className="noise-h">
          <span className="nl"><span>Stand out from</span></span>
          <span className="nl"><span>the noise...</span></span>
        </h2>
        <div className="noise-aside">
          <p>
            <b>Your agency every month:</b>
            Dashboard nobody explains.
            Report full of numbers that do not connect to revenue.
          </p>
        </div>

        <div className="slab slab-yellow" aria-hidden="true" />
        <div className="slab slab-orange" aria-hidden="true" />
      </div>
    </section>
  );
}
