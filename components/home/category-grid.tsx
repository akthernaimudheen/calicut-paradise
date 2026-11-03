import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { menu } from "@/lib/menu";

export function CategoryGrid() {
  return (
    <section id="menu" className="relative bg-parchment-deep py-16 sm:py-20 lg:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="The menu"
          tone="light"
          title="Eight sections, one kitchen."
          copy="Tap a section to jump straight into it. Search, filter and build an itemised WhatsApp enquiry as you go."
        />

        <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {menu.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.04}>
              <Link
                href={`/menu?c=${category.id}`}
                className="group flex h-full min-h-32 flex-col justify-between rounded-xl border border-charcoal/12 bg-parchment/70 p-4 transition-colors hover:border-terracotta/40 hover:bg-white"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight
                    className="size-4 text-charcoal/25 transition-colors group-hover:text-terracotta"
                    aria-hidden
                  />
                </div>
                <div>
                  <h3 className="font-display text-lg leading-tight text-charcoal">{category.name}</h3>
                  <p className="mt-1 text-[11px] text-charcoal/60">
                    {category.dishes.length} dishes
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-charcoal/12 bg-parchment/60 px-5 py-4">
          <p className="text-[12px] leading-relaxed text-charcoal/70">
            Prices shown in the menu come from the public delivery listing and are indicative only —
            in-house prices are confirmed at the counter.
          </p>
          <Link
            href="/menu"
            className="btn btn-dark !min-h-10 !px-4 !text-[13px] whitespace-nowrap"
          >
            Open the full menu
          </Link>
        </div>
      </div>
    </section>
  );
}
