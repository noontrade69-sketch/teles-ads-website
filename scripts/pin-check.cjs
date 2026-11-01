const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch({ args: ["--no-sandbox"] });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 810 } })).newPage();
  p.on("console", m => { if (m.type() === "error") console.log("CONSOLE-ERR:", m.text().slice(0, 300)); });
  await p.goto("http://localhost:4500", { waitUntil: "load" });
  await p.waitForTimeout(4500);
  const info = await p.evaluate(() => {
    const noises = [...document.querySelectorAll(".noise")].map(n => ({
      cls: n.className, display: getComputedStyle(n).display,
      parent: n.parentElement.className || n.parentElement.tagName,
      h: n.getBoundingClientRect().height,
      slabCount: n.querySelectorAll(".slab-yellow").length,
    }));
    const spacers = [...document.querySelectorAll(".pin-spacer")].map(s => s.firstElementChild?.className || s.firstElementChild?.tagName);
    return { noises, spacers, docH: document.body.scrollHeight };
  });
  console.log(JSON.stringify(info, null, 1));
  await b.close(); process.exit(0);
})().catch(e => { console.log("FATAL", e.message); process.exit(1); });
