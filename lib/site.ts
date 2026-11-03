/**
 * Central business configuration.
 *
 * IMPORTANT: everything in here is either (a) supplied by the restaurant in the
 * project brief or (b) taken from public listings. Fields marked `verify: true`
 * have NOT been confirmed by the restaurant yet — check them before publishing.
 * See docs/missing-information.md for the full pre-launch checklist.
 */

export const siteConfig = {
  name: "Calicut Paradise",
  shortName: "Calicut Paradise",
  monogram: "CP",
  subtitle: "A contemporary Kerala & Malabar restaurant in the heart of Thrissur",
  tagline: "Malabar kitchen · Thrissur",
  description:
    "A Malabar kitchen on Ikkanda Warrior Road, Thrissur — dum biryanis, charcoal grills and Nadan favourites, with family seating and easy parking. Browse the menu and send an order enquiry on WhatsApp.",

  /** Set NEXT_PUBLIC_SITE_URL when deploying so canonical URLs are correct. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),

  phone: {
    display: "+91 95623 67000",
    tel: "+919562367000",
    /** Digits only, international format — used by wa.me links. */
    whatsapp: "919562367000",
  },

  address: {
    line1: "Confident House, 622, Ikkanda Warrior Road",
    line2: "Kokkala, Veliyannur",
    city: "Thrissur",
    state: "Kerala",
    postalCode: "680021",
    country: "IN",
    landmark: "Minutes from Thrissur Railway Station & KSRTC bus stand",
    full: "Confident House, 622, Ikkanda Warrior Road, Kokkala, Veliyannur, Thrissur, Kerala 680021",
  },

  hours: {
    /** 24h clock, IST. Reported hours — confirm with the restaurant first. */
    opens: "11:30",
    closes: "23:15",
    display: "11:30 AM – 11:15 PM",
    days: "Monday – Sunday",
    verify: true,
  },

  /**
   * Public-listing snapshot, not a live feed. Different platforms show
   * different numbers (Google, Swiggy, JustDial). Confirm on launch day.
   */
  rating: {
    value: "4.2",
    count: "3,100+",
    source: "Google reviews",
    verify: true,
  },

  /**
   * Flip to false once licensed photographs replace the generated plates in
   * public/images/. Drives the on-image "placeholder" badge.
   */
  assets: { photoPlaceholders: true },

  links: {
    linktree: "https://linktr.ee/calicutparadise",
    swiggy:
      "https://www.swiggy.com/city/thrissur/calicut-paradise-ikkanda-warrior-road-veliyannur-rest1271880",
    googleReviews:
      "https://www.google.com/maps/search/?api=1&query=Calicut+Paradise+Thrissur",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Calicut%20Paradise%2C%20622%20Ikkanda%20Warrior%20Rd%2C%20Kokkala%2C%20Veliyannur%2C%20Thrissur%2C%20Kerala%20680021",
    mapEmbed:
      "https://maps.google.com/maps?q=Calicut%20Paradise%2C%20622%20Ikkanda%20Warrior%20Rd%2C%20Kokkala%2C%20Veliyannur%2C%20Thrissur%2C%20Kerala%20680021&z=16&output=embed",
  },

  /** Short, factual highlights used in the hero and feature cards. */
  highlights: [
    { label: "Dum biryani", detail: "Kozhikodan style" },
    { label: "Open daily", detail: "11:30 AM – 11:15 PM" },
    { label: "Parking", detail: "On-site at Confident House" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

export const navLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/#signatures", label: "Signatures" },
  { href: "/#story", label: "Our story" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#visit", label: "Visit" },
] as const;

/** Four instant actions — the Linktree-replacement strip. */
export const quickActions = [
  {
    label: "View full menu",
    hint: "8 categories",
    href: "/menu",
    icon: "menu" as const,
  },
  {
    label: "WhatsApp order",
    hint: "Enquiry, not a confirmed order",
    href: "/menu",
    icon: "whatsapp" as const,
  },
  {
    label: "Maps & parking",
    hint: "Ikkanda Warrior Rd",
    href: "/#visit",
    icon: "pin" as const,
  },
  {
    label: "Book a table",
    hint: "Family & AC seating",
    href: "/reserve",
    icon: "table" as const,
  },
];

/**
 * Review themes paraphrased from public listings and diner discussions.
 * Deliberately NOT presented as quotations — replace with approved quotes once
 * the restaurant supplies them (or embed a live review widget).
 */
export const reviewThemes = [
  {
    theme: "The biryani",
    summary:
      "Recurring praise for Kozhikodan-style dum biryani — medium-spiced masala, fragrant rice and generous portions.",
    mentions: "Biryani · rice",
  },
  {
    theme: "Grills & signatures",
    summary:
      "Charcoal alfaham, beef porichathu and the in-house Dragon Paneer come up again and again in diner discussions.",
    mentions: "Alfaham · beef · paneer",
  },
  {
    theme: "Easy visit",
    summary:
      "Guests frequently mention on-site parking, short waits and staff who check in through the meal.",
    mentions: "Parking · service",
  },
] as const;

/**
 * Feature cards. Kept descriptive of the kitchen's style rather than making
 * claims (e.g. certifications) that need paperwork behind them.
 */
export const featureCards = [
  {
    title: "Kozhikodan dum, done slowly",
    body: "Kaima rice, a medium-spiced Malabar masala and tender slow-cooked cuts — sealed and finished on dum, the way Kozhikode has always done it.",
    icon: "flame" as const,
  },
  {
    title: "Parking without the drama",
    body: "On-site parking at Confident House, a few minutes from Thrissur Railway Station and the KSRTC stand — no circling the block at dinner time.",
    icon: "car" as const,
  },
  {
    title: "Breads, fresh off the tawa",
    body: "Flaky nool porotta, steamed chiratta puttu and laced palappam, made to order and paired with peppery Nadan curries.",
    icon: "wheat" as const,
  },
  {
    title: "Sulaimani & something sweet",
    body: "Finish with spiced Sulaimani, traditional vattalappam or a mango falooda — the quiet, unhurried end of a Malabar meal.",
    icon: "cup" as const,
  },
] as const;
