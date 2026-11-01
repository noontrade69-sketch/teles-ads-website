const { chromium } = require("playwright");
const OUT = "/home/user/teles-studio-qa/audit";
require("fs").mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch({ args: ["--no-sandbox"] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 810 } })).newPage();
  await p.goto("http://localhost:4500", { waitUntil: "load" });
  await p.waitForTimeout(4400);
  const tops = await p.evaluate(() => {
    const top = sel => { const el = document.querySelector(sel); const sp = el.closest(".pin-spacer") || el; return Math.round(sp.getBoundingClientRect().top + scrollY); };
    return { hero: top(".hero"), marquee: top(".marquee"), noise: top(".noise"), cases: top(".cases"), logo: top(".logo"), process: top(".process"), folders: top(".folders-sec"), docH: document.body.scrollHeight };
  });
  console.log(JSON.stringify(tops));
  const vh = 810;
  const go = async (name, y) => {
    await p.evaluate(v => scrollTo(0, v), Math.round(Math.max(0, y)));
    await p.waitForTimeout(1900);
    await p.screenshot({ path: `${OUT}/${name}.png`, timeout: 60000 });
    console.log(name, "ok @", Math.round(y));
  };
  await go("hero", tops.hero + 0.04 * vh);
  await go("marquee", tops.marquee + 0.45 * 3 * vh);
  await go("crowd", tops.noise + 0.12 * vh);
  await go("cases", tops.cases + 0.30 * 2.8 * vh);
  await go("scatter", tops.cases + 0.80 * 2.8 * vh);
  await go("converge", tops.cases + 0.88 * 2.8 * vh);
  await go("logo", tops.logo + 0.50 * 1.4 * vh);
  await go("process", tops.process + 0.38 * 3 * vh);
  await go("folders", tops.folders + 40);
  await go("footer", tops.docH - vh);
  await b.close(); process.exit(0);
})().catch(e => { console.log("FATAL", e.message); process.exit(1); });
