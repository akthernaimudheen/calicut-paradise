import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { QuickActions } from "@/components/home/quick-actions";
import { Intro } from "@/components/home/intro";
import { Signatures } from "@/components/home/signatures";
import { CategoryGrid } from "@/components/home/category-grid";
import { Story } from "@/components/home/story";
import { Gallery } from "@/components/home/gallery";
import { Ambience } from "@/components/home/ambience";
import { Reviews } from "@/components/home/reviews";
import { Visit } from "@/components/home/visit";
import { Reservation } from "@/components/home/reservation";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Malabar restaurant in Thrissur`,
  description:
    "Dum biryanis, charcoal grills and Nadan favourites on Ikkanda Warrior Road, Thrissur. Browse the menu, send an order enquiry on WhatsApp or book a family table.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }])),
        }}
      />
      <Hero />
      <QuickActions />
      <Intro />
      <Signatures />
      <CategoryGrid />
      <Story />
      <Gallery />
      <Ambience />
      <Reviews />
      <Visit />
      <Reservation />
    </>
  );
}
