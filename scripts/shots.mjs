import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

// Multi-viewport capture of the Minecraft world, plus a DOM-cost report.
// Usage: node scripts/shots.mjs [tag]   (tag prefixes the file names)

const PORT = process.env.PORT || "5177";
const TAG = process.argv[2] || "shot";
const OUT = "shots/audit";

const VIEWPORTS = [
  { name: "phone", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

// The three chapters, by the scroll offset (in viewport heights) that reveals them.
const STOPS = [
  { name: "overworld", vh: 0 },
  { name: "caves", vh: 1 },
  { name: "nether-approach", vh: 2.6 },
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const report = [];

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.setItem("portfolio:mode", "minecraft"));
  await page.reload({ waitUntil: "networkidle" });
  // Let the NameBuild cinematic finish so the hero is captured in its rest state.
  await page.waitForTimeout(2600);

  for (const stop of STOPS) {
    await page.evaluate((vh) => window.scrollTo(0, window.innerHeight * vh), stop.vh);
    await page.waitForTimeout(1400);
    await page.screenshot({ path: `${OUT}/${TAG}-${vp.name}-${stop.name}.png` });
  }

  // DOM cost: total nodes, and how many come from the block grids / pixel SVGs —
  // the two things that scale with scene complexity rather than with content.
  const stats = await page.evaluate(() => ({
    nodes: document.getElementsByTagName("*").length,
    svgRects: document.getElementsByTagName("rect").length,
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  report.push({ viewport: `${vp.name} (${vp.width}px)`, ...stats });

  await ctx.close();
}

await browser.close();
console.table(report);
