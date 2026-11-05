import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { MenuExplorer } from "@/components/menu/menu-explorer";
import { menu } from "@/lib/menu";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Menu & Indicative Prices — Calicut Paradise",
  description:
    "Browse the Calicut Paradise menu — biryani and ghee rice, Malabar specialities, charcoal grills, Kerala breads, rolls, desserts and Sulaimani. Build an itemised WhatsApp enquiry for dine-in, takeaway or delivery.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Menu · Calicut Paradise, Thrissur",
    description:
      "Kozhikodan dum biryani, Malabar specialities, charcoal grills and Kerala breads. Add dishes and send an order enquiry on WhatsApp.",
    url: `${siteConfig.url}/menu`,
  },
};

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const { c } = await searchParams;
  const validCategory = menu.find((section) => section.id === c)?.id ?? "all";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Menu", path: "/menu" },
            ]),
          ),
        }}
      />

      <div className="shell pb-28 pt-24 sm:pt-28 bg-ink text-paper">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-paper/60">
          <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-brass">
            <ArrowLeft className="size-3" aria-hidden />
            Home
          </Link>
          <ChevronRight className="size-3 text-paper/20" aria-hidden />
          <span className="text-paper/80 font-medium">Menu</span>
        </nav>

        <div className="max-w-2xl">
          <span className="label text-brass">THE KITCHEN OFFERING</span>
          <h1 className="display-lg mt-2 text-paper">The complete menu.</h1>
          <p className="lede mt-3 text-paper/75">
            Everything the kitchen cooks, in one place. Add any dish to your enquiry and send your itemised list directly to the counter on WhatsApp.
          </p>
        </div>

        <div className="mt-10">
          <MenuExplorer initialCategory={validCategory} />
        </div>
      </div>
    </>
  );
}
