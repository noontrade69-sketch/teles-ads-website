const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({ args: ["--no-sandbox"] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 810 } })).newPage();
  await p.goto("http://localhost:4500", { waitUntil: "load" });
  await p.waitForTimeout(4400);
  for (let i = 0; i < 70; i++) { const r = await p.evaluate(() => document.querySelector(".logo").getBoundingClientRect().top); if (r <= 2) break; await p.mouse.wheel(0, 900); await p.waitForTimeout(150); }
  await p.waitForTimeout(1600);
  await p.screenshot({ path: "/home/user/teles-studio-qa/r8/m-logo.png", timeout: 60000 });
  await b.close(); process.exit(0);
})().catch(e => { console.log("FATAL", e.message); process.exit(1); });
