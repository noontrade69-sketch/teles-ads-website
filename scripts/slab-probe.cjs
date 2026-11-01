const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({ args: ["--no-sandbox"] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 810 } })).newPage();
  await p.goto("http://localhost:4500", { waitUntil: "load" });
  await p.waitForTimeout(4400);
  for (let i = 0; i < 70; i++) { const r = await p.evaluate(() => document.querySelector(".noise").getBoundingClientRect().top); if (r <= 2) break; await p.mouse.wheel(0, 900); await p.waitForTimeout(150); }
  await p.waitForTimeout(800);
  for (let step = 1; step <= 5; step++) {
    await p.mouse.wheel(0, 152); await p.waitForTimeout(700); // 760/5 each
    const s = await p.evaluate(() => ({
      sy: Math.round(scrollY),
      nTop: Math.round(document.querySelector(".noise").getBoundingClientRect().top),
      yTr: document.querySelector(".slab-yellow").style.transform || getComputedStyle(document.querySelector(".slab-yellow")).transform,
    }));
    console.log(step, JSON.stringify(s));
  }
  await b.close(); process.exit(0);
})().catch(e => { console.log("FATAL", e.message); process.exit(1); });
