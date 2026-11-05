import { spawn } from "node:child_process";
import os from "node:os";
import path from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const tmpProfile = path.join(os.tmpdir(), "chrome-menu-test-" + Date.now());

const chrome = spawn(CHROME, [
  "--headless=new",
  "--remote-debugging-port=9229",
  "--disable-gpu",
  "--no-first-run",
  `--user-data-dir=${tmpProfile}`,
  "--remote-allow-origins=*",
  "about:blank",
]);

await new Promise((r) => setTimeout(r, 2000));

try {
  const list = await (await fetch("http://127.0.0.1:9229/json/list")).json();
  const ws = new WebSocket(list[0].webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      const handler = (e) => {
        const d = JSON.parse(e.data);
        if (d.id === msgId) {
          ws.removeEventListener("message", handler);
          resolve(d.result);
        }
      };
      ws.addEventListener("message", handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Page.navigate", { url: "http://127.0.0.1:3000" });
  await new Promise((r) => setTimeout(r, 2500));

  const btns = await send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      return Array.from(document.querySelectorAll('button')).map(b => ({
        text: b.innerText.slice(0, 30),
        ariaLabel: b.getAttribute('aria-label'),
        ariaControls: b.getAttribute('aria-controls'),
        className: b.className
      }));
    })()`,
  });

  console.log("All buttons on page:");
  console.log(JSON.stringify(btns.result.value, null, 2));

  ws.close();
} finally {
  chrome.kill("SIGKILL");
}
