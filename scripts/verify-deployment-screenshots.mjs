import { chromium } from "playwright";
import path from "node:path";

const targetDir = "C:\\Users\\akthe\\.gemini\\antigravity\\brain\\afab0ff6-1460-4e1e-9c73-7b310caba5a9";
const baseUrl = "https://calicut-paradise.battle-sulfur.workers.dev";

async function run() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });

  // 1. Desktop Home
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto(baseUrl, { waitUntil: "networkidle" });
  await desktopPage.screenshot({
    path: path.join(targetDir, "deployed_cloudflare_desktop_home.png"),
    fullPage: false
  });
  console.log("Desktop home captured");

  // 2. Mobile Home
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(baseUrl, { waitUntil: "networkidle" });
  await mobilePage.screenshot({
    path: path.join(targetDir, "deployed_cloudflare_mobile_home.png"),
    fullPage: false
  });
  console.log("Mobile home captured");

  // 3. Menu Page Desktop
  await desktopPage.goto(`${baseUrl}/menu`, { waitUntil: "networkidle" });
  await desktopPage.screenshot({
    path: path.join(targetDir, "deployed_cloudflare_menu_desktop.png"),
    fullPage: false
  });
  console.log("Menu desktop captured");

  // 4. Cart Sheet on Mobile
  await mobilePage.goto(`${baseUrl}/menu`, { waitUntil: "networkidle" });
  // Click first Add to enquiry button
  const addButtons = mobilePage.locator('button:has-text("Add")');
  if (await addButtons.count() > 0) {
    await addButtons.first().click();
    await mobilePage.waitForTimeout(500);
  }
  // Click cart button in header
  const cartBtn = mobilePage.locator('button[aria-label="Open order enquiry cart"]');
  if (await cartBtn.count() > 0) {
    await cartBtn.click();
    await mobilePage.waitForTimeout(600);
  }
  await mobilePage.screenshot({
    path: path.join(targetDir, "deployed_cloudflare_cart_drawer.png"),
    fullPage: false
  });
  console.log("Cart drawer captured");

  await browser.close();
  console.log("All captures completed successfully!");
}

run().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
