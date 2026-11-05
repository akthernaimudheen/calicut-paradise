import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Signatures } from "@/components/home/signatures";
import { Ambience } from "@/components/home/ambience";
import { Visit } from "@/components/home/visit";
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
      {/* Four disciplined movements — Direction B: The Green Room */}
      <Hero />
      <Signatures />
      <Ambience />
      <Visit />
    </>
  );
}
