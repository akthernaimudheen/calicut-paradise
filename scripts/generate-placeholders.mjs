/**
 * Generates the placeholder imagery used by this concept build.
 *
 * Every file is a designed, clearly-labelled stand-in for a real photograph:
 * a spice-toned plate with a vector star-anise emblem and a "reserved photo"
 * frame. No text is burned into the image (the VM has no font stack for
 * librsvg), so the dish label and the "placeholder" badge are rendered in the
 * page UI where they stay legible and readable by screen readers.
 *
 * Swap the original photograph in at the same path and the site picks it up
 * with no code change. See docs/asset-manifest.md.
 *
 * Run: npm run assets
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const OUT = path.join(process.cwd(), "public", "images");

const BASE = {
  charcoal: "#161210",
  clove: "#231B17",
  parchment: "#FBF6EE",
  saffron: "#D99B26",
  terracotta: "#B84A27",
};

/** Per-folder accent so the slots read as distinct even before photos land. */
const TONES = {
  hero: { glow: "#B84A27", glow2: "#D99B26", deep: "#0D0A09" },
  biryani: { glow: "#C0562B", glow2: "#D99B26", deep: "#120D0B" },
  "malabar-specials": { glow: "#A8391F", glow2: "#C9822A", deep: "#150D0B" },
  grills: { glow: "#B8541F", glow2: "#E0A63A", deep: "#140E0A" },
  breads: { glow: "#946127", glow2: "#D9B45C", deep: "#14100C" },
  desserts: { glow: "#8C4A2A", glow2: "#DDA24B", deep: "#130F0C" },
  ambience: { glow: "#4A3A30", glow2: "#A9762F", deep: "#121010" },
  restaurant: { glow: "#45372E", glow2: "#9C7132", deep: "#111010" },
  brand: { glow: "#B84A27", glow2: "#D99B26", deep: "#0D0A09" },
};

function rand(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function grain(width, height, seed) {
  const r = rand(seed);
  const dots = Math.round((width * height) / 4200);
  let out = "";
  for (let i = 0; i < dots; i += 1) {
    const x = Math.round(r() * width);
    const y = Math.round(r() * height);
    const rad = (r() * 1.7 + 0.3).toFixed(2);
    const op = (r() * 0.07 + 0.012).toFixed(3);
    out += `<circle cx="${x}" cy="${y}" r="${rad}" fill="${BASE.parchment}" opacity="${op}"/>`;
  }
  return out;
}

/** Eight-petal star-anise emblem, drawn as vectors in a 200x200 box. */
function emblem(cx, cy, scale, accent) {
  const petals = Array.from({ length: 8 }, (_, i) => {
    const angle = i * 45;
    return `<ellipse cx="100" cy="62" rx="13" ry="40" transform="rotate(${angle} 100 100)" fill="none" stroke="${accent}" stroke-opacity="0.55" stroke-width="1.4"/>`;
  }).join("");
  return `<g transform="translate(${cx} ${cy}) scale(${scale}) translate(-100 -100)">
    <circle cx="100" cy="100" r="86" fill="none" stroke="${accent}" stroke-opacity="0.22" stroke-width="1"/>
    ${petals}
    <circle cx="100" cy="100" r="9" fill="${accent}" fill-opacity="0.7"/>
    <circle cx="100" cy="100" r="20" fill="none" stroke="${accent}" stroke-opacity="0.35" stroke-width="1"/>
  </g>`;
}

function plateSvg({ width, height, tone, seed = 7 }) {
  const pad = Math.round(Math.min(width, height) * 0.045);
  const inner = Math.min(width, height);
  const cx = width / 2;
  const cy = height / 2;
  const t = TONES[tone] ?? TONES.hero;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BASE.clove}"/>
      <stop offset="52%" stop-color="${BASE.charcoal}"/>
      <stop offset="100%" stop-color="${t.deep}"/>
    </linearGradient>
    <radialGradient id="glow" cx="26%" cy="16%" r="78%">
      <stop offset="0%" stop-color="${t.glow}" stop-opacity="0.72"/>
      <stop offset="52%" stop-color="${t.glow}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${t.glow}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="84%" cy="88%" r="62%">
      <stop offset="0%" stop-color="${t.glow2}" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="${t.glow2}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="centre" cx="50%" cy="48%" r="52%">
      <stop offset="0%" stop-color="${t.glow2}" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="${t.glow2}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#glow)"/>
  <rect width="${width}" height="${height}" fill="url(#glow2)"/>
  <rect width="${width}" height="${height}" fill="url(#centre)"/>

  <g stroke="${BASE.saffron}" fill="none" stroke-opacity="0.13">
    <circle cx="${width * 0.87}" cy="${height * 0.1}" r="${inner * 0.3}"/>
    <circle cx="${width * 0.87}" cy="${height * 0.1}" r="${inner * 0.42}"/>
    <circle cx="${width * 0.87}" cy="${height * 0.1}" r="${inner * 0.54}"/>
    <circle cx="${width * 0.09}" cy="${height * 0.93}" r="${inner * 0.26}"/>
    <circle cx="${width * 0.09}" cy="${height * 0.93}" r="${inner * 0.36}"/>
  </g>

  ${grain(width, height, seed)}

  <rect x="${pad}" y="${pad}" width="${width - pad * 2}" height="${height - pad * 2}" fill="none" stroke="${BASE.saffron}" stroke-opacity="0.18"/>
  <g stroke="${BASE.saffron}" stroke-opacity="0.6" stroke-width="2" fill="none">
    <path d="M${pad} ${pad + inner * 0.055} L${pad} ${pad} L${pad + inner * 0.055} ${pad}"/>
    <path d="M${width - pad} ${height - pad - inner * 0.055} L${width - pad} ${height - pad} L${width - pad - inner * 0.055} ${height - pad}"/>
  </g>

  ${emblem(cx, cy, (inner * 0.26) / 200, BASE.saffron)}
</svg>`;
}

/** w x h is the delivered pixel size (covers 2x mobile viewports). */
const ASSETS = [
  { file: "hero/hero-biryani-dum.jpg", w: 2000, h: 1250, tone: "hero", seed: 7 },
  { file: "hero/hero-biryani-detail.jpg", w: 1200, h: 1500, tone: "hero", seed: 8 },
  { file: "biryani/biryani-mutton-dum.jpg", w: 1600, h: 1200, tone: "biryani", seed: 11 },
  { file: "biryani/biryani-chicken-dum.jpg", w: 1400, h: 1750, tone: "biryani", seed: 12 },
  { file: "biryani/ghee-rice.jpg", w: 1600, h: 1200, tone: "biryani", seed: 13 },
  { file: "malabar-specials/beef-porichathu.jpg", w: 1600, h: 1200, tone: "malabar-specials", seed: 21 },
  { file: "malabar-specials/kallummakkaya-roast.jpg", w: 1800, h: 1000, tone: "malabar-specials", seed: 22 },
  { file: "malabar-specials/fish-mango-curry.jpg", w: 1600, h: 1200, tone: "malabar-specials", seed: 23 },
  { file: "malabar-specials/pepper-chicken.jpg", w: 1600, h: 1200, tone: "malabar-specials", seed: 24 },
  { file: "grills/chicken-alfaham.jpg", w: 1600, h: 1200, tone: "grills", seed: 31 },
  { file: "grills/fish-alfaham.jpg", w: 1600, h: 1200, tone: "grills", seed: 32 },
  { file: "grills/dragon-paneer.jpg", w: 1400, h: 1400, tone: "grills", seed: 33 },
  { file: "breads/nool-porotta.jpg", w: 1600, h: 1200, tone: "breads", seed: 41 },
  { file: "breads/chiratta-puttu.jpg", w: 1600, h: 1200, tone: "breads", seed: 42 },
  { file: "breads/palappam.jpg", w: 1600, h: 1200, tone: "breads", seed: 43 },
  { file: "desserts/vattalappam.jpg", w: 1600, h: 1200, tone: "desserts", seed: 51 },
  { file: "desserts/mango-falooda.jpg", w: 1400, h: 1750, tone: "desserts", seed: 52 },
  { file: "desserts/sulaimani.jpg", w: 1600, h: 1200, tone: "desserts", seed: 53 },
  { file: "ambience/dining-hall.jpg", w: 1800, h: 1100, tone: "ambience", seed: 61 },
  { file: "ambience/outdoor-seating.jpg", w: 1800, h: 1100, tone: "ambience", seed: 62 },
  { file: "ambience/entrance.jpg", w: 1400, h: 1750, tone: "ambience", seed: 63 },
  { file: "restaurant/exterior-confident-house.jpg", w: 1800, h: 1100, tone: "restaurant", seed: 71 },
  { file: "restaurant/parking.jpg", w: 1800, h: 1100, tone: "restaurant", seed: 72 },
  { file: "brand/og-cover.jpg", w: 1200, h: 630, tone: "brand", seed: 81 },
];

async function main() {
  for (const asset of ASSETS) {
    const target = path.join(OUT, asset.file);
    await mkdir(path.dirname(target), { recursive: true });
    const svg = plateSvg({
      width: asset.w,
      height: asset.h,
      tone: asset.tone,
      seed: asset.seed,
    });
    await sharp(Buffer.from(svg))
      .jpeg({ quality: 80, mozjpeg: true, chromaSubsampling: "4:2:0" })
      .toFile(target);
  }
  console.log(`Generated ${ASSETS.length} placeholder plates in public/images`);
}

await main();

const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${BASE.charcoal}"/>
  <rect x="4.5" y="4.5" width="55" height="55" rx="11" fill="none" stroke="${BASE.saffron}" stroke-opacity="0.55"/>
  <g transform="translate(32 32)">
    ${Array.from({ length: 8 }, (_, i) => `<ellipse cx="0" cy="-11" rx="4" ry="12" transform="rotate(${i * 45})" fill="none" stroke="${BASE.saffron}" stroke-opacity="0.75" stroke-width="1.6"/>`).join("")}
    <circle cx="0" cy="0" r="3.4" fill="${BASE.saffron}"/>
  </g>
</svg>`;
await writeFile(path.join(process.cwd(), "app", "icon.svg"), icon, "utf8");
console.log("Wrote app/icon.svg");
