const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({ args: ["--no-sandbox"] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 810 } })).newPage();
  await p.goto("http://localhost:4500", { waitUntil: "load" });
  await p.waitForTimeout(4500);
  const info = await p.evaluate(() =>
    [...document.querySelectorAll(".pin-spacer")].map(s => ({
      sec: s.firstElementChild?.className?.split(" ")[0],
      spacerH: Math.round(s.getBoundingClientRect().height),
      kidH: Math.round(s.firstElementChild.getBoundingClientRect().height),
    }))
  );
  console.log(JSON.stringify(info));
  await b.close(); process.exit(0);
})().catch(e => { console.log("FATAL", e.message); process.exit(1); });
