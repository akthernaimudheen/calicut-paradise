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
                className="group flex h-full min-h-32 flex-col justify-between rounded-xl border border-charcoal/12 bg-parchment/70 p-4 transition-colors hover:border-terracotta/40 hover:bg-white"
              >
                <div className="flex flex-col justify-between h-full">
                  <span className="text-[11px] font-medium text-teal">
                    {category.dishes.length} dishes
                  </span>
                  <div className="mt-6">
                    <h3 className="font-display text-lg leading-tight text-charcoal transition-colors group-hover:text-teal">
                      {category.name}
                    </h3>
                  </div>
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
