import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// Renders scripts/og-card.html to public/og-image.png at 1200x630.
// Run with `npm run og` after editing the card.

const here = dirname(fileURLToPath(import.meta.url));
const card = resolve(here, "og-card.html");
const out = resolve(here, "..", "public", "og-image.png");

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  // 2x so the card stays sharp where platforms render it large.
  deviceScaleFactor: 2,
});

await page.goto(`file://${card}`, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
await page.screenshot({ path: out });
await browser.close();

console.log(`og-image.png escrita en ${out}`);
