# Calicut Paradise — Asset Manifest & Provenance

**Current state: Authentic restaurant photographs supplied by the owner have been imported, classified, and connected across the website.**

All supplied assets are organized under `public/images/` and served through responsive `next/image` components with optimized JPEG delivery alongside preserved source PNGs.

---

## 1. Verified Asset Provenance & Classification Table

| Asset Path | Source File in Downloads / Uploads | Format & Dimensions | Visual Subject | Classification | Website Placement | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `public/images/restaurant/calicut-paradise-exterior.jpg` | `Calicut Paradise Restaurant Exterior.png` | JPEG (1554×1012, 360 KB)<br>Source: PNG (2.6 MB) | Real exterior building facade at Confident House, Ikkanda Warrior Road, Thrissur with prominent illuminated signage ("Calicut Paradise", "Confident House"). | **A. Original Restaurant Photography** | Hero Carousel (Slide 1), Ambience secondary card, Visit info | **Active & Live** |
| `public/images/restaurant/calicut-paradise-dining-experience.jpg` | `Vibrant Feast with Lime Green Drink.png` | JPEG (1672×941, 309 KB)<br>Source: PNG (2.2 MB) | Full table feast spread with chicken drumettes, noodles, curries, fresh salads and lime cooler drink. | **A/B. Commercial Food Photography** | Hero Carousel (Slide 2), Ambience secondary card, Gallery | **Active & Live** |
| `public/images/ambience/dining-interior.jpg` | `Moody Calicut Paradise Dining Room.png` | JPEG (1199×1312, 398 KB)<br>Source: PNG (2.7 MB) | Interior dining hall featuring curved rattan ceiling, globe pendant lights, marble tables, and booth seating. | **A. Original Restaurant Photography** | Restaurant Introduction (Right column), Hero Carousel (Slide 3), Ambience primary showcase | **Active & Live** |
| `public/images/dishes/grilled-prawns.jpg` | `Gourmet Grilled Shrimp Platter.png` | JPEG (1448×1086, 284 KB)<br>Source: PNG (2.3 MB) | Platter of flame-grilled Kerala jumbo prawns with lime, herb dip, and vegetable crudités. | **B. Professional Dish Photography** | Hero Carousel (Slide 4), Food & Ambience Gallery | **Active & Live** |
| `public/images/dishes/chicken-lollipop.jpg` | `Spicy Chicken Lollipops with Onion Salad.png` | JPEG (1448×1086, 351 KB)<br>Source: PNG (2.5 MB) | Sizzling spiced chicken lollipops with curry leaf garnish and red onion salad. | **B. Professional Dish Photography** | Signature Dishes Card 3, Food & Ambience Gallery | **Active & Live** |
| `public/images/dishes/layered-dessert.jpg` | `Ruby Pomegranate Falooda Parfait.png` | JPEG (1086×1448, 183 KB)<br>Source: PNG (1.9 MB) | Tall dessert glass layered with falooda, rose syrup, sweet basil seeds, dry fruits, fresh pomegranate pearls, and glazed cherry. | **B. Professional Dish Photography** | Signature Dishes Card 4, Food & Ambience Gallery | **Active & Live** |

---

## 2. Directory Structure

```
public/images/
├── ambience/
│   ├── dining-hall.jpg (Compatibility copy of dining-interior.jpg)
│   ├── dining-interior.jpg (1199×1312)
│   └── dining-interior.png (Source)
├── brand/
│   ├── logo-dark.png
│   ├── logo-gold.png
│   ├── logo-ivory.png
│   ├── logo.png
│   └── og-cover.jpg
├── dishes/
│   ├── chicken-lollipop.jpg (1448×1086)
│   ├── chicken-lollipop.png (Source)
│   ├── grilled-prawns.jpg (1448×1086)
│   ├── grilled-prawns.png (Source)
│   ├── layered-dessert.jpg (1086×1448)
│   └── layered-dessert.png (Source)
└── restaurant/
    ├── calicut-paradise-dining-experience.jpg (1672×941)
    ├── calicut-paradise-dining-experience.png (Source)
    ├── calicut-paradise-exterior.jpg (1554×1012)
    ├── calicut-paradise-exterior.png (Source)
    ├── exterior-confident-house.jpg
    └── exterior-confident-house.png
```

---

## 3. Disclosures & Usage Guidelines

- **Zero Placeholder Artwork in Core Surfaces**: All hero carousel slides, introduction feature plate, signature cards, and gallery items strictly render the genuine supplied photographs.
- **Brand Consistency**: Palette adheres to authentic Coastal Teal (`#357373`), Malabar Pine (`#0d342c`), and Champagne Gold (`#d9a852`).
- **Performance**: High-resolution source PNGs are preserved, while web-optimized JPEGs (quality 90, mozjpeg) ensure sub-2s Largest Contentful Paint (LCP) and zero broken image requests.
