import type { Metadata } from "next";
import { Instrument_Serif, Inter, Anton } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/data";

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const tape = Anton({ weight: "400", subsets: ["latin"], variable: "--font-tape", display: "swap" });

export const metadata: Metadata = {
  title: "TELES ADS® — Turn ads into paying customers.",
  description:
    "Telegram-first advertising studio led by Shah Tosif. Campaigns, creative and automation built for paying customers — not vanity metrics.",
  openGraph: {
    title: "TELES ADS® — Turn ads into paying customers.",
    description: "Advertising with intention. Founded and run by Shah Tosif.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.name,
  founder: { "@type": "Person", name: brand.founder },
  email: "work@telesads.com",
  description: "Telegram-first advertising agency. India / UAE / Worldwide.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${tape.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
