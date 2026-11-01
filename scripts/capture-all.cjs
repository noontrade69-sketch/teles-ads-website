const { chromium } = require("playwright");
const OUT = "/home/user/teles-studio-qa/r8";
require("fs").mkdirSync(OUT, { recursive: true });
async function wheelUntil(p, check, max = 70, step = 900) {
  for (let i = 0; i < max; i++) { if (await p.evaluate(check)) return true; await p.mouse.wheel(0, step); await p.waitForTimeout(150); }
  return false;
}
(async () => {
  const b = await chromium.launch({ args: ["--no-sandbox"] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 810 } })).newPage();
  await p.goto("http://localhost:4500", { waitUntil: "commit" });
  await p.waitForTimeout(700);
  await p.screenshot({ path: `${OUT}/m-preloader.png`, timeout: 60000 });
  await p.waitForTimeout(4300);
  await p.screenshot({ path: `${OUT}/m-hero.png`, timeout: 60000 });
  await p.mouse.wheel(0, 950); await p.waitForTimeout(800);
  await p.screenshot({ path: `${OUT}/m-heroout.png`, timeout: 60000 });
  await wheelUntil(p, () => { const r = document.querySelector(".marquee").getBoundingClientRect(); return r.top <= 2; });
  await p.mouse.wheel(0, 700); await p.waitForTimeout(700);
  await p.screenshot({ path: `${OUT}/m-marquee-cac.png`, timeout: 60000 });
  await p.mouse.wheel(0, 2300); await p.waitForTimeout(700);
  await p.screenshot({ path: `${OUT}/m-marquee-opt.png`, timeout: 60000 });
  await wheelUntil(p, () => { const r = document.querySelector(".noise").getBoundingClientRect(); return r.top <= 2; });
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${OUT}/m-crowd.png`, timeout: 60000 });
  await wheelUntil(p, () => { const r = document.querySelector(".cases").getBoundingClientRect(); return r.top <= 2; });
  await p.waitForTimeout(1000);
  await p.screenshot({ path: `${OUT}/m-case1.png`, timeout: 60000 });
  await p.mouse.wheel(0, 2600); await p.waitForTimeout(700);
  await p.screenshot({ path: `${OUT}/m-case3.png`, timeout: 60000 });
  const top = await p.evaluate(() => document.querySelector(".cases").getBoundingClientRect().top + window.scrollY);
  await p.evaluate((y) => window.scrollTo(0, y), top + 0.86 * 2.8 * 810);
  await p.waitForTimeout(2000);
  await p.screenshot({ path: `${OUT}/m-scatter.png`, timeout: 60000 });
  await wheelUntil(p, () => { const r = document.querySelector(".logo").getBoundingClientRect(); return r.top <= 2; });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `${OUT}/m-logo.png`, timeout: 60000 });
  await wheelUntil(p, () => { const r = document.querySelector(".process").getBoundingClientRect(); return r.top <= 2; });
  await p.mouse.wheel(0, 1300); await p.waitForTimeout(800);
  await p.screenshot({ path: `${OUT}/m-process.png`, timeout: 60000 });
  await wheelUntil(p, () => { const r = document.querySelector(".folders-sec").getBoundingClientRect(); return r.top < 300; });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `${OUT}/m-folders.png`, timeout: 60000 });
  await wheelUntil(p, () => { const r = document.querySelector(".footer").getBoundingClientRect(); return r.top < 300; });
  await p.waitForTimeout(2800);
  await p.screenshot({ path: `${OUT}/m-footer.png`, timeout: 60000 });
  console.log("captured");
  await b.close(); process.exit(0);
})().catch(e => { console.log("FATAL", e.message); process.exit(1); });
