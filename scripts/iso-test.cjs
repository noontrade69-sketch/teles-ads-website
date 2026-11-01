const { chromium } = require("playwright");
(async () => {
  const f = parseFloat(process.argv[2] || "0");
  const b = await chromium.launch({ args: ["--no-sandbox", "--allow-file-access-from-files"] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 810 } })).newPage();
  p.on("pageerror", e => console.log("PAGE-ERR:", String(e).slice(0, 200)));
  p.on("console", m => { if (m.type() === "error") console.log("CONSOLE:", m.text().slice(0, 200)); });
  await p.goto("file:///tmp/gsap-iso3.html");
  await p.waitForTimeout(600);
  const st = await p.evaluate(() => ({ nz: !!window.__nz, sp: !!document.querySelector(".pin-spacer") }));
  console.log("state:", JSON.stringify(st));
  if (!st.sp) { await b.close(); process.exit(1); }
  const start = await p.evaluate(() => Math.round(document.querySelector(".noise").closest(".pin-spacer").getBoundingClientRect().top + scrollY));
  await p.evaluate(y => scrollTo(0, y), Math.round(start + f * 810));
  await p.waitForTimeout(1100);
  const s = await p.evaluate(() => ({
    y: document.querySelector(".slab-yellow").style.transform || "none",
    visTop: Math.round(document.querySelector(".slab-yellow").getBoundingClientRect().top),
  }));
  console.log("f=" + f, JSON.stringify(s));
  await b.close(); process.exit(0);
})().catch(e => { console.log("FATAL", e.message); process.exit(1); });
