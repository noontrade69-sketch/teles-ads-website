import { Tape } from "@/components/Mark";
import { contact, brand } from "@/lib/data";

/* Section 8 — charcoal CTA + link columns with hand-drawn underline hovers,
   round social buttons, tilted founder credit and the falling tape pile. */

function Social({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  return (
    <a className="soc-btn" href={href} aria-label={label} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{children}</svg>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="footer" aria-label="Contact">
      <div className="foot-grid">
        <div className="foot-cta">
          <h2>Let’s see if this makes<br />sense for your business.</h2>
          <a className="pill pill-yellow" href={contact.book}>Book a call</a>
        </div>
        <div className="foot-cols">
          <div>
            <span className="micro foot-col-title">COMPANY</span>
            <a href="#work">Our expertise</a>
            <a href="#process">Pricing</a>
            <a href="#voices">Blog</a>
            <a href="mailto:work@telesads.com">Contact us</a>
          </div>
          <div>
            <span className="micro foot-col-title">SOCIAL</span>
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={contact.x} target="_blank" rel="noopener noreferrer">X</a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
        <div className="foot-follow">
          <span className="micro">FOLLOW US ON SOCIALS</span>
          <div className="soc-row">
            <Social label="Facebook" href={contact.telegram}>
              <path d="M13.5 21v-7h2.4l.4-2.9h-2.8V9.2c0-.8.3-1.4 1.5-1.4h1.4V5.2c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.2H8v2.9h2.5v7Z" />
            </Social>
            <Social label="Instagram" href={contact.telegram}>
              <path d="M12 4.5c2.4 0 2.7 0 3.7.1 2.4.1 3.6 1.3 3.7 3.7 0 1 .1 1.2.1 3.7s0 2.7-.1 3.7c-.1 2.4-1.3 3.6-3.7 3.7-1 0-1.2.1-3.7.1s-2.7 0-3.7-.1c-2.4-.1-3.6-1.3-3.7-3.7 0-1-.1-1.2-.1-3.7s0-2.7.1-3.7C4.7 5.9 5.9 4.7 8.3 4.6c1-.1 1.3-.1 3.7-.1ZM12 3C9.6 3 9.3 3 8.2 3.1 5 3.2 3.2 5 3.1 8.2 3 9.3 3 9.6 3 12s0 2.7.1 3.8c.1 3.2 1.9 5 5.1 5.1 1.1.1 1.4.1 3.8.1s2.7 0 3.8-.1c3.2-.1 5-1.9 5.1-5.1.1-1.1.1-1.4.1-3.8s0-2.7-.1-3.8c-.1-3.2-1.9-5-5.1-5.1C14.7 3 14.4 3 12 3Zm0 4.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.8-8.8a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Z" />
            </Social>
            <Social label="YouTube" href={contact.telegram}>
              <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26.4 26.4 0 0 0 2 12a26.4 26.4 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26.4 26.4 0 0 0 22 12a26.4 26.4 0 0 0-.4-4.8ZM10 15.2V8.8L15.5 12Z" />
            </Social>
            <Social label="X" href={contact.telegram}>
              <path d="M17.8 3h3l-6.7 7.7L22 21h-6.2l-4.8-6.3L5.4 21h-3l7.2-8.2L2 3h6.3l4.4 5.8Zm-1 16.2h1.7L7.2 4.7H5.4Z" />
            </Social>
          </div>
        </div>
      </div>

      <p className="foot-credit">© Designed by {brand.founder}</p>

      <div className="tape-pile" aria-hidden="true">
        <Tape className="tp tp-1" repeat={5} />
        <Tape className="tp tp-2" repeat={5} />
        <Tape className="tp tp-3" repeat={5} />
        <Tape className="tp tp-4" repeat={5} />
        <Tape className="tp tp-5" repeat={5} />
        <Tape className="tp tp-6" repeat={5} />
        <Tape className="tp tp-7" repeat={5} />
        <Tape className="tp tp-8" repeat={5} />
        <Tape className="tp tp-9" repeat={5} />
        <Tape className="tp tp-10" repeat={5} />
      </div>
    </footer>
  );
}
