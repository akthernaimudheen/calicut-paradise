import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { menu } from "@/lib/menu";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const lastModified = new Date();

  const coreRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/menu`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/reserve`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];

  // Each menu section is addressable via a query string anchor.
  const menuSections: MetadataRoute.Sitemap = menu.map((section) => ({
    url: `${base}/menu?c=${section.id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...coreRoutes, ...menuSections];
}
