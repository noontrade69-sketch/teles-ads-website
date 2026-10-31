const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
(async () => {
  const b = await chromium.launch({ args: ["--no-sandbox"] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 810 } })).newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message.slice(0, 100)));
  await p.goto("http://localhost:4500", { waitUntil: "commit" });
  await p.waitForTimeout(600);
  await p.screenshot({ path: "/home/user/teles-studio-qa/r5/00-preloader.png" });
  await p.waitForTimeout(4400);
  for (let i = 0; i < 70; i++) { const r = await p.evaluate(() => document.querySelector(".footer").getBoundingClientRect().top); if (r < 380) break; await p.mouse.wheel(0, 900); await p.waitForTimeout(150); }
  await p.waitForTimeout(2800);
  await p.screenshot({ path: "/home/user/teles-studio-qa/r5/08-footer-1440.png", timeout: 60000 });
  const axe = await new AxeBuilder({ page: p }).withTags(["wcag2a", "wcag2aa"]).analyze();
  console.log(JSON.stringify({ errs: errs.slice(0, 3), vios: axe.violations.map(v => v.id) }));
  await b.close(); process.exit(0);
})().catch(e => { console.log("FATAL", e.message); process.exit(1); });
