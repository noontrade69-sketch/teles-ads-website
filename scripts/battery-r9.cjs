const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
const OUT = "/home/user/teles-studio-qa/r9-mobile";
require("fs").mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch({ args: ["--no-sandbox"] });
  /* ---- mobile 390x844 ---- */
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push("PAGEERR " + e.message.slice(0, 140)));
  p.on("console", (m) => { if (m.type() === "error") errs.push("CONSOLE " + m.text().slice(0, 140)); });
  await p.goto("http://localhost:4500", { waitUntil: "load" });
  await p.waitForTimeout(4300);
  const ovf = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  await p.screenshot({ path: `${OUT}/m1-hero.png` });
  for (const [name, sel] of [["m2-marquee", ".marquee"], ["m3-noise", ".noise"], ["m4-cases", ".cases"], ["m5-logo", ".logo"], ["m6-process", ".process"], ["m7-folders", ".folders-sec"], ["m8-footer", ".footer"]]) {
    await p.evaluate((s) => document.querySelector(s)?.scrollIntoView({ behavior: "instant", block: "start" }), sel);
    await p.waitForTimeout(1100);
    await p.screenshot({ path: `${OUT}/${name}.png` });
  }
  const ovf2 = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  await p.waitForTimeout(400);
  const axeM = await new AxeBuilder({ page: p }).withTags(["wcag2a", "wcag2aa"]).analyze();
  await ctx.close();
  /* ---- desktop axe ---- */
  const p2 = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p2.goto("http://localhost:4500", { waitUntil: "load" });
  await p2.waitForTimeout(4500);
  const axeD = await new AxeBuilder({ page: p2 }).withTags(["wcag2a", "wcag2aa"]).analyze();
  /* ---- reduced motion sanity ---- */
  const p3 = await (await b.newContext({ viewport: { width: 1440, height: 810 }, reducedMotion: "reduce" })).newPage();
  const rmErrs = [];
  p3.on("pageerror", (e) => rmErrs.push(e.message.slice(0, 120)));
  await p3.goto("http://localhost:4500", { waitUntil: "load" });
  await p3.waitForTimeout(3500);
  const rmHero = await p3.evaluate(() => { const el = document.querySelector(".hero-h"); return el ? el.getBoundingClientRect().height > 50 : false; });
  await p3.screenshot({ path: `${OUT}/rm-hero.png` });
  console.log(JSON.stringify({
    mobileOverflow: [ovf, ovf2], errs: errs.slice(0, 6),
    axeMobile: axeM.violations.map(v => v.id + "×" + v.nodes.length),
    axeDesktop: axeD.violations.map(v => v.id + "×" + v.nodes.length),
    reducedMotion: { errs: rmErrs.slice(0, 3), heroVisible: rmHero },
  }, null, 1));
  await b.close(); process.exit(0);
})().catch(e => { console.log("FATAL", e.message); process.exit(1); });
