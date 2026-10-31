import Image from "next/image";
import { Mark, Tape } from "@/components/Mark";
import SiteClient from "@/components/SiteClient";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Noise from "@/components/Noise";
import Cases from "@/components/Cases";
import LogoReveal from "@/components/LogoReveal";
import Process from "@/components/Process";
import Folders from "@/components/Folders";
import Footer from "@/components/Footer";
import { nav, contact, brand } from "@/lib/data";

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="TELES ADS home">
        <Mark />
        <span>TELES ADS<sup>®</sup></span>
      </a>
      <nav className="site-nav" aria-label="Primary">
        {nav.map((item) => (
          <a key={item.href} href={item.href} className={item.active ? "is-active" : ""}>
            {item.active && <i className="nav-dot" aria-hidden="true" />}
            {item.label}
          </a>
        ))}
      </nav>
      <a className="pill pill-yellow nav-pill" href={contact.book}>
        Book a call
        <span className="pill-ic" aria-hidden="true">✳</span>
      </a>
    </header>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#work">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Noise />
        <Cases />
        <LogoReveal />
        <Process />
        <Folders />
      </main>
      <Footer />
      <SiteClient />
    </>
  );
}
