const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({ args: ["--no-sandbox"] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 810 } })).newPage();
  await p.goto("http://localhost:4500", { waitUntil: "load" });
  await p.waitForTimeout(4400);
  const start = await p.evaluate(() => Math.round(document.querySelector(".noise").closest(".pin-spacer").getBoundingClientRect().top + scrollY));
  const shot = async (name, f) => {
    await p.evaluate(y => scrollTo(0, y), Math.round(start + f * 810));
    await p.waitForTimeout(1200);
    await p.screenshot({ path: `/home/user/teles-studio-qa/r9/${name}.png`, timeout: 60000 });
    console.log(name, "ok");
  };
  await shot("item5-slabs-mid", 0.62);
  await shot("item5-slabs", 0.97);
  await shot("item5-slabs-into-cases", 1.35); // past pin end: slabs become first case panels
  await b.close(); process.exit(0);
})().catch(e => { console.log("FATAL", e.message); process.exit(1); });
