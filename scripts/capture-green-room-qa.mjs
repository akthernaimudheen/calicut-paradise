import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";

const repoDir = "C:/Users/akthe/.gemini/antigravity/scratch/calicut-paradise/docs/screenshots";
const artifactDir = "C:/Users/akthe/.gemini/antigravity/brain/afab0ff6-1460-4e1e-9c73-7b310caba5a9";
const baseUrl = "http://localhost:3000";

async function saveBoth(page, filename, options = {}) {
  const p1 = path.join(repoDir, filename);
  const p2 = path.join(artifactDir, filename);
  await page.screenshot({ path: p1, ...options });
  fs.copyFileSync(p1, p2);
  console.log(`Saved ${filename}`);
}

async function run() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });

  // 1. Desktop Home (1440x900)
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto(baseUrl, { waitUntil: "networkidle" });
  await saveBoth(desktopPage, "green_room_desktop_home_1440.png");

  // 2. Desktop Full Page
  await saveBoth(desktopPage, "green_room_desktop_fullpage.png", { fullPage: true });

  // 3. Mobile Home (390x844)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(baseUrl, { waitUntil: "networkidle" });
  await saveBoth(mobilePage, "green_room_mobile_home_390.png");

  // 4. Desktop Menu
  await desktopPage.goto(`${baseUrl}/menu`, { waitUntil: "networkidle" });
  await saveBoth(desktopPage, "green_room_menu_desktop_1440.png");

  // 5. Mobile Menu with 1-Tap Cart
  await mobilePage.goto(`${baseUrl}/menu`, { waitUntil: "networkidle" });
  const addButtons = mobilePage.locator('button:has-text("Add")');
  if (await addButtons.count() > 0) {
    await addButtons.first().click();
    await mobilePage.waitForTimeout(400);
  }
  const cartBtn = mobilePage.locator('button[aria-label^="Open order enquiry"]');
  if (await cartBtn.count() > 0) {
    await cartBtn.click();
    await mobilePage.waitForTimeout(600);
  }
  await saveBoth(mobilePage, "green_room_cart_mobile_390.png");

  await browser.close();
  console.log("All Green Room captures completed successfully!");
}

run().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
