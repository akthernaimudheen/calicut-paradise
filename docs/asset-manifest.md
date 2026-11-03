# Asset manifest

**Current state: every image on the site is a generated placeholder.** No photograph of
Calicut Paradise, its dishes or its interior is included in this build.

Why: the two Swiggy CDN URLs in the brief, and anything copied from Google Maps, are
third-party platform assets. Being visible publicly is not the same as a licence to reuse
them in a commercial website. They were treated as **visual references only** — useful for
composition and framing decisions, not as downloadable stock.

Until licensed photographs arrive, `scripts/generate-placeholders.mjs` produces designed
plates: spice-toned gradients, a star-anise emblem and a "reserved photo" frame. They carry
no text inside the image (the VM has no font stack for the SVG rasteriser), so each slot is
labelled in the page UI with a small "Placeholder" badge and an honest caption.

---

## Slot table

All files are JPEG, `public/images/<folder>/<file>`. "Delivered" is the pixel size written by
the generator; the site displays them responsively through `next/image`.

### hero/

| File | Delivered | Used in | Subject needed | Permission |
| ---- | --------- | ------- | -------------- | ---------- |
| `hero-biryani-dum.jpg` | 2000×1250 | Hero background (LCP image) | The signature dum biryani, landscape, dark moody lighting | **Not obtained** |
| `hero-biryani-detail.jpg` | 1200×1500 | Story section | Close detail: sealed handi, rice texture, fried onion | **Not obtained** |

### biryani/

| File | Delivered | Used in | Subject needed | Permission |
| ---- | --------- | ------- | -------------- | ---------- |
| `biryani-mutton-dum.jpg` | 1600×1200 | Signature card 1 | Mutton dum biryani in the serving vessel | **Not obtained** |
| `biryani-chicken-dum.jpg` | 1400×1750 | Gallery | Chicken dum biryani, portrait crop | **Not obtained** |
| `ghee-rice.jpg` | 1600×1200 | (spare — category card) | Ghee rice with cashew and raisin | **Not obtained** |

### malabar-specials/

| File | Delivered | Used in | Subject needed | Permission |
| ---- | --------- | ------- | -------------- | ---------- |
| `beef-porichathu.jpg` | 1600×1200 | Signature card 2 | Beef porichathu, dark fried finish | **Not obtained** |
| `kallummakkaya-roast.jpg` | 1800×1000 | Gallery (wide) | Mussels roast in a pan | **Not obtained** |
| `fish-mango-curry.jpg` | 1600×1200 | (spare) | Fish mango curry | **Not obtained** |
| `pepper-chicken.jpg` | 1600×1200 | (spare) | Kozhi kurumulagu | **Not obtained** |

### grills/

| File | Delivered | Used in | Subject needed | Permission |
| ---- | --------- | ------- | -------------- | ---------- |
| `chicken-alfaham.jpg` | 1600×1200 | Signature card 3 | Charcoal alfaham with kubboos and toum | **Not obtained** |
| `fish-alfaham.jpg` | 1600×1200 | (spare) | Whole grilled fish | **Not obtained** |
| `dragon-paneer.jpg` | 1400×1400 | Gallery | Dragon paneer | **Not obtained** |

### breads/

| File | Delivered | Used in | Subject needed | Permission |
| ---- | --------- | ------- | -------------- | ---------- |
| `nool-porotta.jpg` | 1600×1200 | Gallery | Nool porotta, torn to show layers | **Not obtained** |
| `chiratta-puttu.jpg` | 1600×1200 | (spare) | Chiratta puttu with kadala | **Not obtained** |
| `palappam.jpg` | 1600×1200 | (spare) | Laced palappam | **Not obtained** |

### desserts/

| File | Delivered | Used in | Subject needed | Permission |
| ---- | --------- | ------- | -------------- | ---------- |
| `vattalappam.jpg` | 1600×1200 | Signature card 4 | Vattalappam, cut to show texture | **Not obtained** |
| `mango-falooda.jpg` | 1400×1750 | Gallery | Mango falooda, tall glass | **Not obtained** |
| `sulaimani.jpg` | 1600×1200 | (spare) | Sulaimani in a glass | **Not obtained** |

### ambience/

| File | Delivered | Used in | Subject needed | Permission |
| ---- | --------- | ------- | -------------- | ---------- |
| `dining-hall.jpg` | 1800×1100 | Introduction | Interior, seated tables, lighting | **Not obtained** |
| `outdoor-seating.jpg` | 1800×1100 | Ambience (lead) | Outdoor seating in the evening | **Not obtained** |
| `entrance.jpg` | 1400×1750 | Ambience | Entrance / signage | **Not obtained** |

### restaurant/

| File | Delivered | Used in | Subject needed | Permission |
| ---- | --------- | ------- | -------------- | ---------- |
| `exterior-confident-house.jpg` | 1800×1100 | Ambience | Building exterior at Confident House | **Not obtained** |
| `parking.jpg` | 1800×1100 | (spare) | Parking area | **Not obtained** |

### brand/

| File | Delivered | Used in | Subject needed | Permission |
| ---- | --------- | ------- | -------------- | ---------- |
| `og-cover.jpg` | 1200×630 | Social fallback | Brand lockup or hero photo | **Not obtained** |

Note: the live Open Graph image is generated at `/opengraph-image` (1200×630 PNG) with the
brand name, rating line and phone number, so link previews carry text even before
photography exists. `og-cover.jpg` remains the static fallback.

---

## What the restaurant needs to supply

1. **12–15 genuine photographs**, ideally:
   - 1 landscape hero of the biryani (≥ 2000 px wide, shot on a phone at 4:3 is fine);
   - 4 signature dishes;
   - 2–3 interior/ambience frames including the parking entrance;
   - 1 exterior with the Confident House signage.
2. **Written permission** to use them on the website and in social previews. A WhatsApp
   message from the owner granting use is sufficient for this scope; keep it on file.
3. If the restaurant cannot supply photography: a paid stock licence (e.g. a documentary
   Kerala food collection) is the fallback, and the site must **not** caption stock images as
   the restaurant's own dishes. In that case the gallery captions and the "Concept imagery"
   line stay.

## Replacement checklist

- [ ] Drop the new file at the same path, keep the filename.
- [ ] Match or exceed the delivered pixel size; keep the aspect ratio close (4:3, 3:4, 16:9).
- [ ] Re-check `alt` text in `lib/menu.ts` (`signatureDishes`, `galleryItems`) and the
      `ImagePlate` calls in `components/home/*` — alt text currently says "placeholder".
- [ ] Re-run `npm run build` and confirm the LCP hero still loads (check network panel).
- [ ] Set `assets.photoPlaceholders: false` in `lib/site.ts` once nothing is a placeholder.
- [ ] Update this manifest's "permission" column to *Granted — date, by whom*.
