# Missing information & verification report

Everything below was **not** confirmed by Calicut Paradise in the brief. The site is built
so each of these can be corrected in one place, but a few of them must be settled **before**
the concept is shown as "ready" or published.

Status legend: ✅ supplied in brief · ⚠️ unverified · ❌ missing / needs owner input

---

## 1. Blocking before any public launch

| # | Item | What the build does now | Why it matters | Verify how |
| - | ---- | ----------------------- | -------------- | ---------- |
| 1 | **Opening hours** | Shows `11:30 AM – 11:15 PM, daily` from the brief, plus a live "Open now / Closed" badge computed in IST | Aggregators disagree: Zomato lists 11:30–23:00, JustDial 12:00–23:00, magicpin 11:30–14:00. A wrong "Open now" sends people to a closed door | Ask the counter; confirm weekdays vs weekend and whether the kitchen stops earlier than the door |
| 2 | **Google rating + review count** | Shows `4.2 · 3,100+ · Google reviews` | Rating snaps differ by platform (Google 4.2/~3.1k, Swiggy 4.3/747, JustDial 4.1/3,046). Displaying a stale or merged figure is misleading | Take a dated screenshot of the Google listing; update `siteConfig.rating` or remove the block |
| 3 | **WhatsApp number ownership** | All enquiries open `wa.me/919562367000` | If that handset is not the one the counter watches, every enquiry is lost | Send a test message from the demo and ask the owner to confirm receipt |
| 4 | **Reservations accepted at all?** | `/reserve` sends a table enquiry | Some family restaurants do not hold tables. The form says "confirmed when the restaurant replies", which is safe, but the feature only makes sense if they answer | Ask: do you take advance bookings, for what party size, how far ahead? |
| 5 | **Delivery enquiries** | Cart offers a third option, "Home delivery enquiry" | Direct delivery may not exist outside Swiggy/Zomato. The UI calls it an enquiry, never a booking | Ask whether they accept direct delivery orders and within which area. If not, remove that option in `components/cart/cart-sheet.tsx` + `lib/whatsapp.ts` |

## 2. Business facts used on the page

| # | Item | Status | Current copy | Risk if wrong |
| - | ---- | ------ | ------------ | ------------- |
| 6 | Name, address, phone | ✅ | Confident House, 622, Ikkanda Warrior Road, Kokkala, Veliyannur, Thrissur 680021 · +91 95623 67000 | Low — matches multiple listings |
| 7 | "Minutes from Thrissur Railway Station & KSRTC stand" | ⚠️ | Hero, footer, visit section | Time/distance claim; check the actual drive time (≈ 2–3 km) and soften if needed |
| 8 | On-site parking at Confident House | ⚠️ | Feature card, visit section, hero fact strip | Visit copy already says "confirm valet availability on the day"; **valet is not claimed anywhere** |
| 9 | AC indoor + outdoor seating + family dining | ⚠️ | Ambience section, amenity list | Confirm both seating types still exist |
| 10 | "Late kitchen — serving until 11:15 PM" | ⚠️ | Ambience amenity | Tied to item 1 |
| 11 | Halal certification | ❌ deliberately absent | Not displayed anywhere | Do not add without a certificate; a verbal claim is not enough for a public site |
| 12 | Price range (₹200–400 pp) | ❌ absent | Not displayed | Inconsistent across sources; skip or verify |
| 13 | FSSAI licence number | ❌ absent | Not in the footer | Optional, but many Indian restaurant sites show it; supply if they want it |
| 14 | Social handles | ❌ | Instagram not linked; only Linktree + Swiggy | Brief mentions `@calicutparadise`; confirm the handle before linking |
| 15 | Google Maps place link | ⚠️ | Built from a **search query URL**, not the canonical place ID | Replace with the real place link so "Directions" and "Read reviews" land on their listing, not a search result |

## 3. Menu data

| # | Item | Detail |
| - | ---- | ------ |
| 16 | **Dine-in prices** | The 9 prices in `lib/menu.ts` come from the **public Swiggy listing** (delivery prices). Every one is tagged `priceSource: "swiggy-listing"` and the UI says prices are indicative. **No dine-in price is known.** |
| 17 | **Dishes without a price** | 19 of 28 dishes show "Ask" rather than a guessed number. |
| 18 | **Availability** | Every dish is `verified: false` — the set is drawn from public listings and diner discussion, not a menu card. Items may be seasonal, weekend-only or discontinued. |
| 19 | Dish names | Marketing names were kept close to the listings (e.g. "Manavatty Mutton Dum Biryani", "Kozhi Kurumulagu"). Confirm the spelling used on the physical menu. |
| 20 | Dish descriptions | **Draft copy written for this concept** — generic descriptions of each dish's style, not the restaurant's own words. Needs owner sign-off or replacement. |
| 21 | Missing categories | The brief asked for 8 sections including "Rolls" and "Beverages"; the public listing is broader (Chinese, seafood platters, combos). A full menu card is needed for a complete build. |

## 4. Reviews & social proof

| # | Item | Detail |
| - | ---- | ------ |
| 22 | Review quotations | **No review text is reproduced on the site.** The reviews section shows three paraphrased *themes* plus a link to Google. The three "real" quotes in the original brief could not be traced to a source, so they were not used. |
| 23 | Approved quotes | If the owner wants quotations, they should send screenshots of specific Google reviews they are happy to be quoted, with reviewer first names. |
| 24 | Live reviews | Alternative: embed a Google reviews widget. Costs a Maps API key and adds a third-party dependency — not built here. |
| 25 | `aggregateRating` schema | Deliberately omitted from the JSON-LD. Self-declared ratings that do not match what Google sees can trigger a structured-data penalty. Add only once item 2 is settled. |

## 5. Brand & assets

| # | Item | Detail |
| - | ---- | ------ |
| 26 | Photography | None supplied. All 24 slots are generated placeholders — see `docs/asset-manifest.md` for the exact shot list and permission status. |
| 27 | Logo | The "CP" monogram is typographic, drawn in CSS. No logo file was supplied. |
| 28 | Domain | No domain is registered by this project. The demo runs on a preview URL; `NEXT_PUBLIC_SITE_URL` is the single switch for canonical/OG/sitemap. |
| 29 | Menu PDF / printed card | Not supplied. Would let us replace indicative prices with real ones and complete the category set. |

## 6. Claims intentionally **not** used

These appeared in the source research and were removed for accuracy:

- **"Staff mainly speak Hindi and struggle with Malayalam orders"** — an unverified
  allegation from a forum thread. It is not on the site and should not be in the sales pitch
  without evidence from the owner.
- **"28% Swiggy commission savings"** — the real figure depends on the order channel,
  packaging, discounts and taxes. Not used anywhere in the UI or copy.
- **"Linktree cookie popup downgrade"** — a pitch angle, not a fact the website states.
- **`4.2 ★ / 3,175 reviews`** — shown only as `4.2 · 3,100+`, sourced to Google, pending
  item 2.
- **"Halal certified", "valet parking", "₹750 for two"** — dropped entirely.

---

## Sign-off checklist

- [ ] Hours confirmed and tested against the live badge
- [ ] Rating and review count confirmed with a dated screenshot
- [ ] WhatsApp handset confirmed by the owner (send a live test)
- [ ] Reservation policy confirmed; form kept, adjusted, or removed
- [ ] Delivery enquiry option confirmed or removed
- [ ] Dine-in prices and item availability supplied (`lib/menu.ts`)
- [ ] Dish descriptions approved or replaced
- [ ] Licensed photography delivered + written permission on file
- [ ] Google place link replaces the search URL
- [ ] `NEXT_PUBLIC_SITE_URL` set to the approved domain before publishing
