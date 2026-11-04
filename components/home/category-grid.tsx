import Link from "next/link";
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
                className="group flex h-full min-h-28 flex-col justify-end gap-1 border-t border-charcoal/25 bg-parchment/70 px-4 py-5 transition-colors hover:border-teal hover:bg-white"
              >
                <h3 className="font-display text-lg leading-tight text-charcoal transition-colors group-hover:text-teal">
                  {category.name}
                </h3>
                <p className="text-[11px] tracking-[0.02em] text-charcoal/60">
                  {category.dishes.length} dishes
                </p>
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
