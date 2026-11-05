import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const artDir = "C:\\Users\\akthe\\.gemini\\antigravity\\brain\\afab0ff6-1460-4e1e-9c73-7b310caba5a9";
const repoScreenshots = "C:\\Users\\akthe\\.gemini\antigravity\\scratch\\calicut-paradise\\docs\\screenshots";
const tmpProfile = path.join(os.tmpdir(), "chrome-menu-qa-" + Date.now());

const chrome = spawn(CHROME, [
  "--headless=new",
  "--remote-debugging-port=9333",
  "--disable-gpu",
  "--no-first-run",
  `--user-data-dir=${tmpProfile}`,
  "--remote-allow-origins=*",
  "about:blank",
]);

await new Promise((r) => setTimeout(r, 2000));

try {
  const list = await (await fetch("http://127.0.0.1:9333/json/list")).json();
  const ws = new WebSocket(list[0].webSocketDebuggerUrl);
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

  async function capture(filename, width, height, options = {}) {
    await send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 2,
      mobile: width < 768,
    });

    if (options.navigate) {
      await send("Page.navigate", { url: options.navigate });
      await new Promise((r) => setTimeout(r, 2000));
    }

    if (options.beforeScreenshot) {
      await options.beforeScreenshot();
      await new Promise((r) => setTimeout(r, 500));
    }

    const { data } = await send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });
    const buf = Buffer.from(data, "base64");

    const p1 = path.join(artDir, filename);
    const p2 = path.join(repoScreenshots, filename);
    await fs.writeFile(p1, buf);
    try {
      await fs.writeFile(p2, buf);
    } catch {}
    console.log(`Saved screenshot: ${filename} (${width}x${height})`);
  }

  // 1. Mobile Hero without the line
  await capture("mobile_hero_eyebrow.png", 390, 844, {
    navigate: "http://127.0.0.1:3000",
  });

  // 2. Mobile Open Drawer
  await capture("mobile_nav_drawer_open.png", 390, 844, {
    beforeScreenshot: async () => {
      const res = await send("Runtime.evaluate", {
        expression: `(() => {
          const btn = document.querySelector('button[aria-controls="mobile-nav"]');
          if (btn) {
            btn.click();
            return { clicked: true, expanded: btn.getAttribute('aria-expanded') };
          }
          return { clicked: false };
        })()`,
        returnByValue: true,
      });
      console.log("Mobile nav toggle clicked:", res.result.value);

      // Check drawer rect
      const navRect = await send("Runtime.evaluate", {
        expression: `(() => {
          const nav = document.getElementById('mobile-nav');
          if (!nav) return { exists: false };
          const rect = nav.getBoundingClientRect();
          return {
            exists: true,
            top: rect.top,
            bottom: rect.bottom,
            height: rect.height,
            width: rect.width,
            visible: rect.height > 100
          };
        })()`,
        returnByValue: true,
      });
      console.log("Mobile nav drawer metrics:", navRect.result.value);
    },
  });

  // 3. Tablet / Split Screen (960px) Open Drawer
  await capture("tablet_nav_drawer_open.png", 960, 800, {
    navigate: "http://127.0.0.1:3000",
    beforeScreenshot: async () => {
      const res = await send("Runtime.evaluate", {
        expression: `(() => {
          const btn = document.querySelector('button[aria-controls="mobile-nav"]');
          if (btn) {
            btn.click();
            return { clicked: true, expanded: btn.getAttribute('aria-expanded') };
          }
          return { clicked: false };
        })()`,
        returnByValue: true,
      });
      console.log("Tablet nav toggle clicked:", res.result.value);

      const navRect = await send("Runtime.evaluate", {
        expression: `(() => {
          const nav = document.getElementById('mobile-nav');
          if (!nav) return { exists: false };
          const rect = nav.getBoundingClientRect();
          return {
            exists: true,
            top: rect.top,
            bottom: rect.bottom,
            height: rect.height,
            width: rect.width,
            visible: rect.height > 100
          };
        })()`,
        returnByValue: true,
      });
      console.log("Tablet nav drawer metrics:", navRect.result.value);
    },
  });

  // 4. Desktop Hero (1440px)
  await capture("desktop_hero_eyebrow.png", 1440, 900, {
    navigate: "http://127.0.0.1:3000",
  });

  // 5. Menu Page on Mobile (390px)
  await capture("menu_page_mobile.png", 390, 844, {
    navigate: "http://127.0.0.1:3000/menu",
  });

  // 6. Menu Page on Desktop (1440px)
  await capture("menu_page_desktop.png", 1440, 900, {
    navigate: "http://127.0.0.1:3000/menu",
  });

  ws.close();
} finally {
  chrome.kill("SIGKILL");
}
