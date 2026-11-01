const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({ args: ["--no-sandbox"] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 810 } })).newPage();
  await p.goto("http://localhost:4500", { waitUntil: "commit" });
  await p.waitForTimeout(900);
  await p.screenshot({ path: "/home/user/teles-studio-qa/r9/item6-preloader.png", timeout: 30000 });
  console.log("preloader shot ok");
  await b.close(); process.exit(0);
})().catch(e => { console.log("FATAL", e.message); process.exit(1); });
