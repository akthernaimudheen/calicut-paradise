/**
 * QA harness: screenshots, image checks, link checks and a functional test of
 * the WhatsApp enquiry flow (window.open is stubbed so the URL can be asserted).
 *
 * Run against a live dev/prod server:
 *   BASE_URL=http://127.0.0.1:3000 HOST_HEADER=... node scripts/qa.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium, devices } from "playwright";

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const HOST = process.env.HOST_HEADER;
const OUT = path.join(process.cwd(), "docs", "screenshots");
const report = { pages: [], consoleErrors: [], failedRequests: [], checks: [], whatsapp: {} };

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();

async function newContext(options) {
  const context = await browser.newContext(options);
  if (HOST) await context.setExtraHTTPHeaders({ "x-forwarded-host": HOST });
  await context.addInitScript(() => {
    window.__opened = [];
    window.open = (url) => {
      window.__opened.push(String(url));
      return null;
    };
  });
  return context;
}

/** Scroll through the page so scroll-triggered reveals actually run. */
async function autoScroll(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 240));
    }
    await new Promise((resolve) => setTimeout(resolve, 900));
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 1200));
  });
}

async function auditPage(page, label) {
  const issues = await page.evaluate(() => {
    const images = Array.from(document.images);
    const broken = images.filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.currentSrc || img.src);
    const noAlt = images.filter((img) => !img.hasAttribute("alt")).map((img) => img.src);
    const emptyLinks = Array.from(document.querySelectorAll("a")).filter(
      (a) => !a.textContent.trim() && !a.getAttribute("aria-label"),
    ).length;
    const buttonsNoName = Array.from(document.querySelectorAll("button")).filter(
      (b) => !b.textContent.trim() && !b.getAttribute("aria-label"),
    ).length;
    const h1s = Array.from(document.querySelectorAll("h1")).map((h) => h.textContent.trim());
    const smallTargets = Array.from(document.querySelectorAll("a, button")).filter((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && rect.height < 24;
    }).length;
    return {
      broken,
      noAlt,
      emptyLinks,
      buttonsNoName,
      h1s,
      smallTargets,
      lang: document.documentElement.lang,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      dock: (() => {
        const el = document.querySelector('nav[aria-label="Quick actions"]');
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return { bottom: Math.round(rect.bottom), height: Math.round(rect.height), viewport: window.innerHeight };
      })(),
    };
  });
  report.pages.push({ label, url: page.url(), ...issues });
  return issues;
}

// ---------- Desktop ----------
{
  const context = await newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  page.on("console", (msg) => {
    if (msg.type() === "error") report.consoleErrors.push(`${msg.text()} — ${page.url()}`);
  });
  page.on("requestfailed", (req) => report.failedRequests.push(`${req.url()} — ${req.failure()?.errorText}`));

  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await autoScroll(page);
  await page.screenshot({ path: path.join(OUT, "desktop-home.png"), fullPage: true });
  await page.screenshot({ path: path.join(OUT, "desktop-hero.png") });
  await auditPage(page, "desktop home");

  await page.goto(`${BASE}/menu`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT, "desktop-menu.png"), fullPage: false });
  await auditPage(page, "desktop menu");

  await page.goto(`${BASE}/reserve`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT, "desktop-reserve.png"), fullPage: false });
  await auditPage(page, "desktop reserve");

  await context.close();
}

// ---------- Mobile ----------
{
  const context = await newContext({ ...devices["iPhone 13"] });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await autoScroll(page);
  await page.screenshot({ path: path.join(OUT, "mobile-home.png"), fullPage: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, "mobile-hero.png") });
  await auditPage(page, "mobile home");

  // Menu: filter, search, add to enquiry.
  await page.goto(`${BASE}/menu?c=biryani`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT, "mobile-menu.png"), fullPage: false });

  const heading = await page.locator("h2").first().textContent();
  report.checks.push({ check: "menu category deep link", result: heading?.trim() });

  // Type (not fill) so React state updates, then wait for the clear button as a
  // hydration signal before asserting on results.
  await page.getByRole("searchbox").click();
  await page.getByRole("searchbox").pressSequentially("porotta", { delay: 40 });
  await page.getByRole("button", { name: "Clear search" }).waitFor({ timeout: 20000 });
  await page.waitForTimeout(300);
  const resultsText = await page.getByTestId("menu-result-count").textContent();
  report.checks.push({ check: "menu search 'porotta'", result: resultsText?.trim() });
  await page.getByRole("button", { name: "Clear search" }).click();
  await page.waitForTimeout(300);

  // Add two different dishes.
  const addButtons = page.getByRole("button", { name: "Add to order enquiry" });
  await addButtons.nth(0).click();
  await addButtons.nth(1).click();
  await page.waitForTimeout(400);

  await page.getByRole("button", { name: /Review order enquiry/ }).click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT, "mobile-cart.png") });

  // Fill the enquiry and capture the generated WhatsApp URL.
  await page.getByLabel("Name").first().fill("QA Test");
  await page.getByRole("button", { name: "Preview the WhatsApp message" }).click();
  const preview = await page.locator("pre").textContent();
  await page.getByRole("button", { name: "Send order enquiry on WhatsApp" }).click();
  await page.waitForTimeout(500);
  const opened = await page.evaluate(() => window.__opened);
  const url = opened[0] ?? "";
  report.whatsapp.order = {
    openedUrl: url.slice(0, 600),
    host: (() => {
      try {
        return new URL(url).host;
      } catch {
        return null;
      }
    })(),
    decodedHasItems: decodeURIComponent(url).includes("×"),
    decodedHasHeader: decodeURIComponent(url).includes("Order enquiry"),
    previewLines: preview?.split("\n").length ?? 0,
    preview,
  };

  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);

  // Reservation flow.
  await page.goto(`${BASE}/reserve`, { waitUntil: "networkidle" });
  await page.getByLabel("Name").fill("QA Test");
  await page.getByLabel("Date").fill("2026-11-20");
  await page.getByRole("button", { name: "Send reservation enquiry on WhatsApp" }).click();
  await page.waitForTimeout(500);
  const resUrl = (await page.evaluate(() => window.__opened))[0] ?? "";
  report.whatsapp.reservation = {
    host: (() => {
      try {
        return new URL(resUrl).host;
      } catch {
        return null;
      }
    })(),
    decoded: decodeURIComponent(resUrl).slice(0, 500),
  };

  await page.screenshot({ path: path.join(OUT, "mobile-reserve.png"), fullPage: false });
  await auditPage(page, "mobile reserve");

  await context.close();
}

// ---------- Tablet ----------
{
  const context = await newContext({ viewport: { width: 834, height: 1112 } });
  const page = await context.newPage();
  await page.goto(`${BASE}/menu`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT, "tablet-menu.png") });
  await auditPage(page, "tablet menu");
  await context.close();
}

await browser.close();
await writeFile(path.join(process.cwd(), ".qa", "qa-report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
