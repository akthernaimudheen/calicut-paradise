# QA report

Build: Next.js 16.4.4 · Node 26.13 · Chromium 156 (headless) · Lighthouse 12
Date: 3 November 2026 · Method: production build (`next build` → `next start`) on a Linux
VM, plus a Playwright harness (`scripts/qa.mjs`).

---

## 1. Automated checks

| Check | Command | Result |
| ----- | ------- | ------ |
| TypeScript | `npm run typecheck` | ✅ 0 errors (strict) |
| ESLint | `npm run lint` (flat config, `eslint-config-next` core-web-vitals + TS) | ✅ 0 errors, 0 warnings |
| Unit tests | `npm run test` (`node --test`) | ✅ 6/6 pass |
| Production build | `npm run build` | ✅ 9 routes, compiled in ~1 s |

Unit tests cover the WhatsApp message builders: quantity counting, totals only when every
line is priced, itemised order text, unpriced-dish handling, reservation fields, and URL
encoding.

## 2. Browser checks (Playwright, 390×664 / 834×1112 / 1440×900)

| Page | Broken images | Missing `alt` | `h1` count | Horizontal overflow | Console errors | Non-200 requests |
| ---- | ------------- | ------------- | ---------- | ------------------- | -------------- | ---------------- |
| `/` desktop | 0 | 0 | 1 | 0 px | 0 | 0 |
| `/menu` desktop | 0 | 0 | 1 | 0 px | 0 | 0 |
| `/reserve` desktop | 0 | 0 | 1 | 0 px | 0 | 0 |
| `/` mobile | 0 | 0 | 1 | 0 px | 0 | 0 |
| `/reserve` mobile | 0 | 0 | 1 | 0 px | 0 | 0 |
| `/menu` tablet | 0 | 0 | 1 | 0 px | 0 | 0 |

Also verified: `lang="en-IN"`, one `h1` per page, every `a`/`button` has an accessible name,
sticky mobile dock is exactly 57 px tall and flush with the viewport edge (no clipped
labels), skip-link present, `prefers-reduced-motion` respected by `Reveal`.

## 3. Functional tests

| Flow | Result |
| ---- | ------ |
| Menu deep link `/menu?c=biryani` | ✅ opens on the Biryani section |
| Search “porotta” | ✅ 1 matching dish, empty-state and reset work |
| Add dishes → cart badge/quantity steppers | ✅ quantities persist across reloads (`localStorage`) |
| Cart → order type → name → send | ✅ opens `https://wa.me/919562367000?text=…` |
| WhatsApp message content | ✅ itemised, `${qty} × ${dish} — ₹total`, indicative-total line, order-type line, "enquiry only" disclaimer |
| Unpriced dishes | ✅ message says "Prices to be confirmed" instead of inventing a total |
| Reservation form → send | ✅ opens `wa.me/919562367000` with name, date, time, guests, seating |
| Required-field validation | ✅ inline error when name or date is missing |
| Cart sheet keyboard | ✅ Escape closes, focus moves to the close button, body scroll locks |

Sample generated order message (from the QA run):

```
*Calicut Paradise — Order enquiry*
Type: Dine-in table pre-order
Name: QA Test

*Items*
1. Manavatty Mutton Dum Biryani × 1 — ₹540
2. Kozhikodan Chicken Dum Biryani × 1

_Prices to be confirmed by the restaurant._

For table pre-orders the restaurant will confirm the table and timing first.
_This is an enquiry only — the order is confirmed when the restaurant replies._
```

**Not tested:** actual delivery of the WhatsApp message (needs the restaurant's handset to
confirm receipt), real iOS Safari / Android Chrome hardware, screen-reader walkthrough
(VoiceOver/TalkBack), Google Maps iframe rendering (the embed returns a 301 to Google's
renderer; it does not paint in headless Chromium — verify in a real browser).

## 4. Lighthouse (mobile preset, production build)

| Page | Performance | Accessibility | Best practices | SEO |
| ---- | ----------- | ------------- | -------------- | --- |
| `/` | **56–91** | **100** | **100** | **100** |
| `/menu` | **69–81** | **100** | **100** | **100** |
| `/reserve` | **70–86** | **100** | 96–100 | **100** |

Stable across every run: **CLS 0**, FCP 1.0–1.3 s, accessibility 100, SEO 100.

⚠️ **Read the performance range, not a single number.** The same build scored 91
(LCP 2.4 s, TBT 300 ms) and later 56 (LCP 4.4 s, TBT 2.9 s) on this VM with no code
change. The box is shared with other workloads and Lighthouse's mobile preset throttles
the CPU 4×; Total Blocking Time is the volatile metric. Treat 91 as the ceiling and
re-measure on the deployment target before quoting a score.

### Issues found during QA and fixed

| # | Defect | Cause | Fix |
| - | ------ | ----- | --- |
| 1 | **Every optimised image returned HTTP 400 in production** (broken images) | Next 16 only serves qualities listed in `images.qualities`; the components asked for 78/82 | Added `qualities: [75, 82]` in `next.config.ts` and typed the prop to the allowed values |
| 2 | Menu/search not interactive over `127.0.0.1` in dev | Next dev blocks cross-origin dev resources → no hydration | Added loopback + preview hosts to `allowedDevOrigins` |
| 3 | Sections below the fold invisible in captures | Framer `whileInView` starts at `opacity: 0` | Not a bug — QA harness now scrolls before capturing. Motion falls back to static markup under `prefers-reduced-motion` |
| 4 | Gallery left holes in the 4-column grid | Auto-placement with mixed `row-span`/`aspect` | Explicit bento spans + fixed `auto-rows` |
| 5 | Low-contrast micro-copy (9–12 px at 35–55 % opacity) | Decorative opacity used for real content | One deliberate contrast pass: 25→50, 40→60, etc. |
| 6 | Brand link accessible name ≠ visible text | `aria-label` on the logo link | Removed the label; visible text is the name |
| 7 | Footer links under 24 px tap height | Tight line-height | `min-h-6` on footer links |
| 8 | 9 font files preloaded | All Playfair/Jakarta weights requested | Trimmed to the weights actually used → home TBT 1,040 ms → 300 ms |

## 5. Known limitations

1. **Photography is placeholder.** All 24 images are generated plates. Design review of the
   real food photography cannot happen until licensed files are in place (see
   `docs/asset-manifest.md`).
2. **Business data is partially unverified** — hours, rating, reservation/delivery policy.
   See `docs/missing-information.md`. This is the biggest launch risk, not the code.
3. **Menu is static data**, not a CMS. Editing means editing `lib/menu.ts`. That is
   deliberate (no backend, no bill), but it means the restaurant cannot change prices
   themselves unless a small admin layer is added later.
4. **Performance on a real mid-range Android** is unmeasured. JS-heavy sections (menu
   explorer) are the risk.
5. **No automated E2E suite in CI** — the Playwright harness is a script, run manually.
6. **`font-size` audit (SEO/best-practices) flags 10 px uppercase labels.** These are
   decorative eyebrow labels; bumping them would change the design language. Left as is,
   SEO still scores 100.

## 6. Performance next steps (if a 90+ floor is needed)

1. Replace the per-element Framer `Reveal` with one shared IntersectionObserver + CSS
   transition. ~30 motion components per page is the main hydration cost.
2. `next/dynamic` the cart sheet and the menu explorer's below-the-fold sections.
3. Serve the hero as AVIF at 1280/1920 only (already `priority`, but the JPEG source is
   2000 px wide).
4. Consider dropping Playfair italics if the hero treatment changes — italics double the
   display-font payload.

## 7. Screenshots

`docs/screenshots/` (captured from the production build, 1440×900 desktop, 390×664 mobile
@3×, 834×1112 tablet):

| File | View |
| ---- | ---- |
| `desktop-home.png` | Full homepage, all sections revealed |
| `desktop-hero.png` | Above the fold, desktop |
| `desktop-menu.png` | Menu with search, chips and enquiry sidebar |
| `desktop-reserve.png` | Reservation page |
| `mobile-home.png` | Full homepage, mobile |
| `mobile-hero.png` | Hero + sticky dock, mobile |
| `mobile-menu.png` | Menu, mobile |
| `mobile-cart.png` | Cart sheet with items and order type |
| `mobile-reserve.png` | Reservation form, mobile |
| `tablet-menu.png` | Menu, tablet |
