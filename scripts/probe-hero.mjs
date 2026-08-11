import { chromium } from "playwright";

// Does the hero cinematic actually reach its rest state? Samples the role kicker's
// opacity over time — it only fades in once NameBuild reports phase "done".
const PORT = process.env.PORT || "5177";
const browser = await chromium.launch();

for (const vp of [
  { name: "phone", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
]) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.setItem("portfolio:mode", "minecraft"));
  await page.reload({ waitUntil: "networkidle" });

  const samples = [];
  for (const t of [1000, 2000, 3000, 4000, 6000]) {
    await page.waitForTimeout(t - (samples.at(-1)?.t ?? 0));
    const state = await page.evaluate(() => {
      const kicker = document.querySelector("h1")?.parentElement?.querySelector("p");
      const wool = document.querySelectorAll("h1 > div > div").length;
      return {
        kicker: kicker ? getComputedStyle(kicker).opacity : "none",
        woolBlocks: wool,
      };
    });
    samples.push({ t, ...state });
  }
  console.log(vp.name.padEnd(8), JSON.stringify(samples));
  await ctx.close();
}

await browser.close();
