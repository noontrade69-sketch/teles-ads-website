const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({ args: ["--no-sandbox"] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto("http://localhost:4500", { waitUntil: "load" });
  await p.waitForTimeout(4100);
  for (let i = 0; i < 60; i++) {
    const r = await p.evaluate(() => document.querySelector(".logo").getBoundingClientRect().top);
    if (r <= 2) break;
    await p.mouse.wheel(0, 900); await p.waitForTimeout(150);
  }
  await p.waitForTimeout(1200);
  await p.mouse.move(1050, 260); await p.waitForTimeout(700);
  await p.screenshot({ path: "/home/user/teles-studio-qa/r4/logo-a.png" });
  await p.mouse.move(420, 620); await p.waitForTimeout(900);
  await p.screenshot({ path: "/home/user/teles-studio-qa/r4/logo-b.png" });
  await b.close(); process.exit(0);
})().catch(e => { console.log("FATAL", e.message); process.exit(1); });
