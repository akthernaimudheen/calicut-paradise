import { siteConfig } from "./site";
import { allDishes, menu } from "./menu";

/**
 * Restaurant structured data (schema.org/Restaurant).
 *
 * Deliberately omitted: aggregateRating (needs a live, auditable rating feed),
 * priceRange exaggeration, and any certification claim.
 */
export function restaurantJsonLd() {
  const base = siteConfig.url;
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${base}/#restaurant`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: base,
    telephone: siteConfig.phone.tel,
    image: `${base}/images/brand/og-cover.jpg`,
    servesCuisine: ["Malabar", "Kerala", "Indian", "Biryani"],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: siteConfig.hours.opens,
        closes: siteConfig.hours.closes,
      },
    ],
    hasMenu: {
      "@type": "Menu",
      name: "Calicut Paradise menu",
      url: `${base}/menu`,
      hasMenuSection: menu.map((category) => ({
        "@type": "MenuSection",
        name: category.name,
        description: category.blurb,
        hasMenuItem: category.dishes.map((dish) => ({
          "@type": "MenuItem",
          name: dish.name,
          description: dish.description,
          ...(typeof dish.price === "number"
            ? {
                offers: {
                  "@type": "Offer",
                  price: dish.price,
                  priceCurrency: "INR",
                  description: "Indicative price from the public delivery listing",
                },
              }
            : {}),
          suitableForDiet:
            dish.diet === "veg"
              ? "https://schema.org/VegetarianDiet"
              : undefined,
        })),
      })),
    },
    acceptsReservations: `${base}/reserve`,
    sameAs: [siteConfig.links.linktree, siteConfig.links.swiggy],
    potentialAction: {
      "@type": "OrderAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `https://wa.me/${siteConfig.phone.whatsapp}`,
        actionPlatform: "https://schema.org/MobileWebPlatform",
      },
      deliveryMethod: "https://schema.org/OnSitePickup",
    },
    menuDishCount: allDishes.length,
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
