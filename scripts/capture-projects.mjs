#!/usr/bin/env node
/**
 * capture-projects — screenshot the live projects for the portfolio cards.
 *
 * Only for projects that are actually reachable. A card image has one job:
 * proving the thing exists and works. A mockup or a stock illustration does
 * the opposite — the reader came looking for evidence and found decoration.
 *
 * Run: node scripts/capture-projects.mjs
 */

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "public/projects";

// 2x device scale so the image stays sharp on retina displays. The card renders
// these at roughly 600px wide, so 1200 logical pixels is the sweet spot between
// crisp and heavy.
const VIEWPORT = { width: 1280, height: 800 };

const TARGETS = [
  { id: "vikupass", url: "https://vikupass.com" },
  { id: "mecanicos", url: "https://mecanico-nu.vercel.app" },
];

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: VIEWPORT,
  deviceScaleFactor: 2,
  colorScheme: "light",
});

for (const { id, url } of TARGETS) {
  process.stdout.write(`  ${id.padEnd(12)} `);
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
    // Entrance animations are the reason a naive screenshot catches a hero
    // mid-fade and comes out washed out. Wait for them to settle.
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `${OUT}/${id}.png` });
    console.log("ok");
  } catch (err) {
    console.log(`fallo — ${err.message.split("\n")[0]}`);
  }
}

await browser.close();
console.log(`\nGuardadas en ${OUT}/\n`);
