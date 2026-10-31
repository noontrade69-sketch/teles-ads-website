export const brand = {
  name: "TELES ADS",
  reg: "TELES ADS®",
  founder: "Shah Tosif",
  tagline: "Telegram-first advertising. Ideas made to move.",
};

export const contact = {
  telegram: "https://t.me/TelesAds",
  email: "work@telesads.com",
  book: "mailto:work@telesads.com?subject=Book%20a%20call%20%E2%80%94%20TELES%20ADS",
  instagram: "https://instagram.com/telesads",
  x: "https://x.com/telesads",
  linkedin: "https://linkedin.com/company/telesads",
};

export const nav = [
  { label: "Case Studies", href: "#work", active: true },
  { label: "Process", href: "#process", active: false },
  { label: "Testimonials", href: "#voices", active: false },
  { label: "About", href: "#about", active: false },
];

/* ---- Section 4 · case studies ----
   ILLUSTRATIVE CONCEPTS: names, categories and figures are layout placeholders
   (as in the reference design). The panels are labelled as concepts on-screen
   and must be replaced with approved client work before being shown as proof. */
export const cases = [
  {
    id: "01",
    tone: "yellow" as const,
    category: "TELEGRAM",
    name: "Signal Craft",
    stats: ["$18 cost per acquisition", "290 sign-ups per month", "13.5% CTR"],
  },
  {
    id: "02",
    tone: "orange" as const,
    category: "HOME OWNER",
    name: "FloSuit",
    stats: ["$18 cost per acquisition", "290 sign-ups per month", "13.5% CTR"],
  },
  {
    id: "03",
    tone: "red" as const,
    category: "FINANCE",
    name: "Zygnov",
    stats: ["$18 cost per acquisition", "290 sign-ups per month", "13.5% CTR"],
  },
];

/* ---- Section 6 · process ----
   Steps 02 (Build) and 03 (Plan) are confirmed by the reference recording.
   01 and 04 were not visible, so they are written in the same voice. */
export const steps = [
  {
    n: "01",
    title: "Read",
    body: "We read the whole account before changing anything. Where money is leaking, what the tracking actually says, what is worth keeping.",
    at: 0.1,
  },
  {
    n: "02",
    title: "Build",
    body: "We read the whole account before changing anything. Where money is leaking, what the tracking actually says, what is worth keeping.",
    at: 0.42,
  },
  {
    n: "03",
    title: "Plan",
    body: "We read the whole account before changing anything. Where money is leaking, what the tracking actually says, what is worth keeping.",
    at: 0.7,
  },
  {
    n: "04",
    title: "Scale",
    body: "We read the whole account before changing anything. Where money is leaking, what the tracking actually says, what is worth keeping.",
    at: 0.94,
  },
];

/* ---- Section 7 · testimonials ----
   PLACEHOLDER CONTENT (as in the reference): clearly labelled on-screen.
   Replace with real, approved client quotes before publishing as proof. */
export const testimonials = [
  { name: "Sarah Mitchell.", loc: "London, UK", quote: "Our cost per lead dropped by half in six weeks. The reports finally make sense to us." },
  { name: "Daniel Okafor.", loc: "Lagos, NG", quote: "Careful, calm and always on it. The first agency that asked about our margin before our budget." },
  { name: "Priya Raman.", loc: "Toronto, ON", quote: "They rebuilt the account around searches that actually convert. Spend is flat, revenue is not." },
  { name: "Lucas Moreau.", loc: "Paris, FR", quote: "We tripled our Meta results within two quarters. Careful, calm and always on it." },
  { name: "Emma Lindqvist.", loc: "Stockholm, SE", quote: "No vanity dashboards. Every number connects to something we can act on the same week." },
  { name: "Marcus Reyes.", loc: "Austin, TX", quote: "The founder runs the account himself. You feel that in the speed of the decisions." },
];
