const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({ args: ["--no-sandbox"] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 810 } })).newPage();
  await p.goto("http://localhost:4500", { waitUntil: "load" });
  await p.waitForTimeout(4400);
  for (let i = 0; i < 70; i++) { const r = await p.evaluate(() => document.querySelector(".noise").getBoundingClientRect().top); if (r <= 2) break; await p.mouse.wheel(0, 900); await p.waitForTimeout(150); }
  // wheel precisely 0.94 * 810 further
  for (let i = 0; i < 8; i++) { await p.mouse.wheel(0, 95); await p.waitForTimeout(120); }
  await p.waitForTimeout(900);
  const state = await p.evaluate(() => ({
    sy: Math.round(window.scrollY),
    yellow: getComputedStyle(document.querySelector(".slab-yellow")).transform,
    orange: getComputedStyle(document.querySelector(".slab-orange")).transform,
    slabVisY: document.querySelector(".slab-yellow").getBoundingClientRect().top,
  }));
  await p.screenshot({ path: "/home/user/teles-studio-qa/r9/item5-slabs.png", timeout: 60000 });
  console.log(JSON.stringify(state));
  await b.close(); process.exit(0);
})().catch(e => { console.log("FATAL", e.message); process.exit(1); });
