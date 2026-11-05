import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const artDir = "C:\\Users\\akthe\\.gemini\\antigravity\\brain\\afab0ff6-1460-4e1e-9c73-7b310caba5a9";
const repoScreenshots = "C:\\Users\\akthe\\.gemini\\antigravity\\scratch\\calicut-paradise\\docs\\screenshots";
const tmpProfile = path.join(os.tmpdir(), "chrome-multipage-qa-" + Date.now());

const chrome = spawn(CHROME, [
  "--headless=new",
  "--remote-debugging-port=9250",
  "--disable-gpu",
  "--no-first-run",
  `--user-data-dir=${tmpProfile}`,
  "--remote-allow-origins=*",
  "about:blank",
]);

await new Promise((r) => setTimeout(r, 1500));

try {
  const list = await (await fetch("http://127.0.0.1:9250/json/list")).json();
  const page = list.find((t) => t.type === "page") || list[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));

  let id = 1;
  function send(m, p = {}) {
    return new Promise((res, rej) => {
      const msgId = id++;
      const h = (e) => {
        const d = JSON.parse(e.data);
        if (d.id === msgId) {
          ws.removeEventListener("message", h);
          if (d.error) rej(new Error(d.error.message));
          else res(d.result);
        }
      };
      ws.addEventListener("message", h);
      ws.send(JSON.stringify({ id: msgId, method: m, params: p }));
    });
  }

  await send("Page.enable");
  await send("Runtime.enable");

  async function capturePage(filename, route, width = 1440, height = 900, mobile = false) {
    await send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 2,
      mobile,
    });
    await send("Page.navigate", { url: `http://127.0.0.1:3000${route}` });
    await new Promise((r) => setTimeout(r, 2000));

    const { data } = await send("Page.captureScreenshot", { format: "png" });
    const buf = Buffer.from(data, "base64");
    await fs.writeFile(path.join(artDir, filename), buf);
    try {
      await fs.writeFile(path.join(repoScreenshots, filename), buf);
    } catch {}
    console.log(`Captured: ${filename} (${width}x${height})`);
  }

  // 1. Story page (Desktop 1440 & Mobile 390)
  await capturePage("multipage_story_desktop.png", "/story", 1440, 950);
  await capturePage("multipage_story_mobile.png", "/story", 390, 844, true);

  // 2. Ambience page (Desktop 1440 & Mobile 390)
  await capturePage("multipage_ambience_desktop.png", "/ambience", 1440, 950);
  await capturePage("multipage_ambience_mobile.png", "/ambience", 390, 844, true);

  // 3. Visit page (Desktop 1440 & Mobile 390)
  await capturePage("multipage_visit_desktop.png", "/visit", 1440, 950);
  await capturePage("multipage_visit_mobile.png", "/visit", 390, 844, true);

  // 4. Test 1-Tap Frictionless Cart Sheet
  console.log("\n--- Testing 1-Tap Cart Sheet ---");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await send("Page.navigate", { url: "http://127.0.0.1:3000/menu" });
  await new Promise((r) => setTimeout(r, 2000));

  // Add 2 dishes
  await send("Runtime.evaluate", {
    expression: `(() => {
      const addBtns = document.querySelectorAll('button[aria-label="Add to order enquiry"]');
      if (addBtns[0]) addBtns[0].click();
      if (addBtns[1]) addBtns[1].click();
    })()`,
  });
  await new Promise((r) => setTimeout(r, 500));

  // Open cart sheet
  await send("Runtime.evaluate", {
    expression: `(() => {
      const cartBtn = document.querySelector('button[aria-label^="Open order enquiry"]');
      if (cartBtn) cartBtn.click();
    })()`,
  });
  await new Promise((r) => setTimeout(r, 600));

  const { data: cartData } = await send("Page.captureScreenshot", { format: "png" });
  await fs.writeFile(
    path.join(artDir, "frictionless_cart_sheet_1tap.png"),
    Buffer.from(cartData, "base64")
  );
  try {
    await fs.writeFile(
      path.join(repoScreenshots, "frictionless_cart_sheet_1tap.png"),
      Buffer.from(cartData, "base64")
    );
  } catch {}
  console.log("Captured: frictionless_cart_sheet_1tap.png");

  ws.close();
} catch (err) {
  console.error("Capture Error:", err);
} finally {
  chrome.kill();
  process.exit(0);
}
