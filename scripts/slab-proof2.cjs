const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({ args: ["--no-sandbox"] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 810 } })).newPage();
  await p.goto("http://localhost:4500", { waitUntil: "load" });
  await p.waitForTimeout(4400);
  const start = await p.evaluate(() => Math.round(document.querySelector(".noise").closest(".pin-spacer").getBoundingClientRect().top + scrollY));
  for (const [name, f] of [["item5-slabs-mid", 0.62], ["item5-slabs", 0.97], ["item5-slabs-into-cases", 1.35]]) {
    await p.evaluate(y => scrollTo(0, y), Math.round(start + f * 810));
    await p.waitForTimeout(2200); // generous scrub settle
    const m = await p.evaluate(() => ({
      sy: Math.round(scrollY),
      yTop: Math.round(document.querySelector(".slab-yellow").getBoundingClientRect().top),
      oTop: Math.round(document.querySelector(".slab-orange").getBoundingClientRect().top),
      nTop: Math.round(document.querySelector(".noise").getBoundingClientRect().top),
    }));
    await p.screenshot({ path: `/home/user/teles-studio-qa/r9/${name}.png`, timeout: 60000 });
    console.log(name, JSON.stringify(m));
  }
  await b.close(); process.exit(0);
})().catch(e => { console.log("FATAL", e.message); process.exit(1); });
