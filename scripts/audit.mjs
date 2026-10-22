import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

// Audit of the single-page portfolio at three widths.
//   node scripts/audit.mjs [tag]      (needs `npm run dev` or `npm run preview` running)
// For each viewport: a full-page capture, plus the hero and the projects
// section on their own, and a horizontal-overflow check (the usual way a
// mobile layout quietly breaks).

const PORT = process.env.PORT || "5173";
const TAG = process.argv[2] || "audit";
const OUT = "shots/audit";

const VIEWPORTS = [
  { name: "phone", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const report = [];

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle" });

  // Reveal-on-scroll sections only paint once they've been seen: walk the page.
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto"; // smooth scroll would leave us mid-page
    for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);

  await page.screenshot({ path: `${OUT}/${TAG}-${vp.name}-hero.png` });
  await page.screenshot({
    path: `${OUT}/${TAG}-${vp.name}-full.png`,
    fullPage: true,
  });
  await page
    .locator("#proyectos")
    .screenshot({ path: `${OUT}/${TAG}-${vp.name}-proyectos.png` });

  report.push({
    viewport: `${vp.name} (${vp.width}px)`,
    scrollWidth: await page.evaluate(() => document.documentElement.scrollWidth),
    clientWidth: await page.evaluate(() => document.documentElement.clientWidth),
  });
  await context.close();
}

await browser.close();
console.table(report);
