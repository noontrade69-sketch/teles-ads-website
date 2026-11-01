const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({ args: ["--no-sandbox"] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 810 } })).newPage();
  await p.goto("http://localhost:4500", { waitUntil: "load" });
  await p.waitForTimeout(4400);
  const top = await p.evaluate(() => document.querySelector(".cases").getBoundingClientRect().top + window.scrollY);
  await p.evaluate((y) => window.scrollTo(0, y), top + 0.8 * 2.8 * 810);
  await p.waitForTimeout(1500);
  await p.screenshot({ path: "/home/user/teles-studio-qa/r6/scatter.png", timeout: 60000 });
  await b.close(); process.exit(0);
})().catch(e => { console.log("FATAL", e.message); process.exit(1); });
