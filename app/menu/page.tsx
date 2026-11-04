import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { MenuExplorer } from "@/components/menu/menu-explorer";
import { menu } from "@/lib/menu";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Menu & indicative prices",
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

      <div className="shell pb-28 pt-24 sm:pt-28">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-[11px] text-parchment/60">
          <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-gold">
            <ArrowLeft className="size-3" aria-hidden />
            Home
          </Link>
          <ChevronRight className="size-3 text-parchment/20" aria-hidden />
          <span className="text-parchment/70">Menu</span>
        </nav>

        <div className="max-w-2xl">
          <span className="eyebrow">The menu</span>
          <h1 className="display-lg mt-4">Order without the guesswork.</h1>
          <p className="lede mt-4 text-[14px]">
            Everything the kitchen runs, in one place. Add what you want, choose dine-in, takeaway or
            delivery, and send an itemised enquiry straight to the counter on WhatsApp.
          </p>
        </div>

        <div className="mt-10">
          <MenuExplorer initialCategory={validCategory} />
        </div>
      </div>
    </>
  );
}
