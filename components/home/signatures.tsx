import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { signatureDishes, allDishes } from "@/lib/menu";
import { formatRupees } from "@/lib/whatsapp";
import { QuantityControl } from "@/components/cart/quantity-control";
import { Reveal } from "@/components/ui/reveal";

export function Signatures() {
  const dishPriceMap = new Map(allDishes.map((d) => [d.id, d.price]));

  return (
    <section id="signatures" className="relative bg-ink py-20 lg:py-28 border-t border-paper/10">
      <div className="shell">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="label text-brass">THE KITCHEN&apos;S BENCHMARK</span>
            <h2 className="display-lg mt-2 text-paper">
              Four plates that define the kitchen.
            </h2>
            <p className="lede mt-2 max-w-xl text-paper/70">
              Start with these. Add any dish directly to your WhatsApp order enquiry.
            </p>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-medium text-brass hover:text-brass-soft transition-colors"
          >
            Explore all 34 dishes
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Asymmetric Editorial 2-Up Layout */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.2fr] lg:items-center">
          {/* Left: Large Editorial Image Plate */}
          <Reveal className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] border border-paper/15 bg-ink-soft">
            <Image
              src="/images/restaurant/calicut-paradise-dining-experience.jpg"
              alt="A laid table of biryani, grills and coolers in the Calicut Paradise dining room"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent px-5 pb-5 pt-16">
              <p className="text-xs uppercase tracking-[0.14em] text-brass">Dine-In & Takeaway</p>
              <p className="text-sm font-medium text-paper/90">
                Freshly cooked daily on Ikkanda Warrior Road.
              </p>
            </div>
          </Reveal>

          {/* Right: Typographic Hairline Dish List */}
          <div className="divide-y divide-paper/10">
            {signatureDishes.map((dish) => {
              const price = dishPriceMap.get(dish.id);
              return (
                <div key={dish.id} className="py-5 first:pt-0 last:pb-0">
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-brass/80">
                        {dish.kicker}
                      </span>
                      <h3 className="font-display text-[1.2rem] text-paper mt-0.5">
                        {dish.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-sm font-semibold tabular-nums text-brass">
                        {typeof price === "number" ? formatRupees(price) : "Ask"}
                      </span>
                    </div>
                  </div>

                  <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-paper/65 max-w-prose">
                    {dish.description}
                  </p>

                  <div className="mt-3.5 flex items-center justify-between">
                    <span className="text-[11px] text-paper/40">1-tap order enquiry</span>
                    <QuantityControl dishId={dish.id} tone="quiet" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
