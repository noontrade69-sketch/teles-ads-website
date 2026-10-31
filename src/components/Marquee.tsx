import Image from "next/image";
import { Mark } from "@/components/Mark";

/* Section 2 — pinned giant sentence + rotating 3D book card.
   The sentence passes behind the card; the card flips from the open
   "$18 CAC" spread to the black "Optimization." cover across the pin. */
export default function Marquee() {
  return (
    <section className="marquee" aria-label="Our promise">
      <div className="marquee-pin">
        <div className="marquee-track" aria-hidden="true">
          <p className="marquee-sentence">
            Careful steps.&nbsp;We watch performance.&nbsp;The budget holds at what works.&nbsp;
            Careful steps.&nbsp;We watch performance.&nbsp;The budget holds at what works.&nbsp;
          </p>
        </div>
        <p className="sr-only">
          Careful steps. We watch performance. The budget holds at what works.
        </p>

        <div className="book3d" aria-hidden="true">
          <div className="book-rot">
            <div className="book-edge book-edge-red" />
            <div className="book-edge book-edge-yellow" />
            <div className="book-face book-open">
              <div className="book-open-left">
                <small>Averaging for our clients</small>
                <strong>$18 CAC</strong>
                <Image src="/images/hero-cut.png" alt="" width={300} height={470} sizes="200px" />
              </div>
              <div className="book-open-right">
                <Image src="/images/hero-cut.png" alt="" width={260} height={420} sizes="180px" />
              </div>
            </div>
            <div className="book-face book-cover">
              <div className="book-cover-top">
                <span>TELES ADS®</span>
                <span>Problem Solving</span>
              </div>
              <Mark className="book-mark" />
              <strong>Optimization.</strong>
            </div>
          </div>
          <div className="book-shadow" />
        </div>
      </div>
    </section>
  );
}
