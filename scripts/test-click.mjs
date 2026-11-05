import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const tmpProfile = path.join(os.tmpdir(), "chrome-test-click-" + Date.now());

const chrome = spawn(CHROME, [
  "--headless=new",
  "--remote-debugging-port=9240",
  "--disable-gpu",
  "--no-first-run",
  `--user-data-dir=${tmpProfile}`,
  "--remote-allow-origins=*",
  "about:blank",
]);

await new Promise((r) => setTimeout(r, 1500));

try {
  const list = await (await fetch("http://127.0.0.1:9240/json/list")).json();
  const pageTarget = list.find((t) => t.type === "page") || list[0];
  console.log("Connected to target:", pageTarget.title, pageTarget.url);
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      const handler = (e) => {
        const d = JSON.parse(e.data);
        if (d.id === msgId) {
          ws.removeEventListener("message", handler);
          if (d.error) reject(new Error(d.error.message));
          else resolve(d.result);
        }
      };
      ws.addEventListener("message", handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await send("Page.enable");
  await send("Runtime.enable");

  // Set mobile viewport
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });

  await send("Page.navigate", { url: "http://127.0.0.1:3000" });
  await new Promise((r) => setTimeout(r, 2500));

  async function testDimension(name, width, height, mobile = false) {
    console.log(`\n--- Testing ${name} (${width}x${height}) ---`);
    await send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 2,
      mobile,
    });

    await send("Page.navigate", { url: "http://127.0.0.1:3000" });
    await new Promise((r) => setTimeout(r, 2000));

    // Click toggle button
    const clickRes = await send("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => {
        const btn = document.querySelector('button[aria-controls="mobile-nav"]');
        if (btn) {
          btn.click();
          return { clicked: true, expanded: btn.getAttribute('aria-expanded') };
        }
        return { clicked: false };
      })()`,
    });
    console.log(`${name} click toggle:`, clickRes.result.value);

    await new Promise((r) => setTimeout(r, 400));

    // Check drawer metrics
    const drawerInfo = await send("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => {
        const nav = document.getElementById('mobile-nav');
        if (!nav) return { exists: false };
        const r = nav.getBoundingClientRect();
        return {
          exists: true,
          top: r.top,
          bottom: r.bottom,
          width: r.width,
          height: r.height,
          visible: r.height > 100
        };
      })()`,
    });
    console.log(`${name} drawer metrics:`, drawerInfo.result.value);

    // Capture screenshot
    const { data } = await send("Page.captureScreenshot", { format: "png" });
    const buf = Buffer.from(data, "base64");
    const outPath = `C:\\Users\\akthe\\.gemini\\antigravity\\brain\\afab0ff6-1460-4e1e-9c73-7b310caba5a9\\drawer_open_${name}.png`;
    await fs.writeFile(outPath, buf);
    console.log(`Saved screenshot: drawer_open_${name}.png`);
  }

  // Test Mobile 390
  await testDimension("mobile_390", 390, 844, true);

  // Test Small Mobile 360
  await testDimension("mobile_360", 360, 780, true);

  // Test Tablet 768
  await testDimension("tablet_768", 768, 1024, false);

  // Test Desktop Split-Screen 960
  await testDimension("split_960", 960, 800, false);

  // Also capture /menu page at 390 and 1440
  console.log("\n--- Testing Menu Page ---");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await send("Page.navigate", { url: "http://127.0.0.1:3000/menu" });
  await new Promise((r) => setTimeout(r, 2000));
  const { data: menu390 } = await send("Page.captureScreenshot", { format: "png" });
  await fs.writeFile(
    "C:\\Users\\akthe\\.gemini\\antigravity\\brain\\afab0ff6-1460-4e1e-9c73-7b310caba5a9\\menu_page_390.png",
    Buffer.from(menu390, "base64")
  );
  console.log("Saved menu_page_390.png");

  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    mobile: false,
  });
  await send("Page.navigate", { url: "http://127.0.0.1:3000/menu" });
  await new Promise((r) => setTimeout(r, 2000));
  const { data: menu1440 } = await send("Page.captureScreenshot", { format: "png" });
  await fs.writeFile(
    "C:\\Users\\akthe\\.gemini\\antigravity\\brain\\afab0ff6-1460-4e1e-9c73-7b310caba5a9\\menu_page_1440.png",
    Buffer.from(menu1440, "base64")
  );
  console.log("Saved menu_page_1440.png");

  ws.close();
} catch (err) {
  console.error("Error:", err);
} finally {
  chrome.kill();
  process.exit(0);
}
