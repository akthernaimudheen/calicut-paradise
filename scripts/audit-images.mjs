import http from "node:http";

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      resolve({ status: res.statusCode, url });
    }).on("error", reject);
  });
}

async function checkPage(path) {
  const html = await new Promise((resolve, reject) => {
    http.get("http://127.0.0.1:3000" + path, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });

  const urls = [];
  const re = /(?:src|href)="([^"]+\.(?:jpg|png|webp|svg)[^"]*)"/g;
  let match;
  while ((match = re.exec(html)) !== null) {
    if (match[1].startsWith("/")) {
      urls.push(match[1]);
    }
  }

  const unique = Array.from(new Set(urls.map((u) => u.replaceAll("&amp;", "&"))));
  console.log(`Auditing ${path} - found ${unique.length} unique image URLs:`);
  let failures = 0;
  for (const u of unique) {
    const res = await get("http://127.0.0.1:3000" + u);
    if (res.status >= 400) {
      console.error(`  FAIL [${res.status}]: ${u}`);
      failures++;
    } else {
      console.log(`  PASS [${res.status}]: ${u}`);
    }
  }
  return failures;
}

const f1 = await checkPage("/");
const f2 = await checkPage("/menu");
if (f1 + f2 === 0) {
  console.log("\nALL IMAGE URLS AUDITED: 0 BROKEN IMAGES");
} else {
  console.error(`\nFAILED: ${f1 + f2} broken image URLs detected`);
  process.exit(1);
}
