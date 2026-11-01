const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({ args: ["--no-sandbox"] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 810 } })).newPage();
  await p.goto("http://localhost:4500", { waitUntil: "load" });
  await p.waitForTimeout(4500);
  // find exact pin start via spacer
  const start = await p.evaluate(() => {
    const sp = document.querySelector(".noise").closest(".pin-spacer");
    return Math.round(sp.getBoundingClientRect().top + window.scrollY);
  });
  for (const f of [0, 0.25, 0.5, 0.7, 0.85, 1.0]) {
    await p.evaluate((y) => window.scrollTo(0, y), Math.round(start + f * 810));
    await p.waitForTimeout(1100); // let scrub 0.5 settle
    const s = await p.evaluate(() => ({
      nTop: Math.round(document.querySelector(".noise").getBoundingClientRect().top),
      img: getComputedStyle(document.querySelector(".noise-img")).transform.slice(0, 40),
      ySlab: document.querySelector(".slab-yellow").style.transform || "none",
      oSlab: document.querySelector(".slab-orange").style.transform || "none",
    }));
    console.log(f, JSON.stringify(s));
  }
  await b.close(); process.exit(0);
})().catch(e => { console.log("FATAL", e.message); process.exit(1); });
