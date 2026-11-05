"use client";

import { useMemo, useState } from "react";
import { Info, Search, X } from "lucide-react";
import { menu, priceNote, type Dish } from "@/lib/menu";
import { formatRupees } from "@/lib/whatsapp";
import { QuantityControl } from "@/components/cart/quantity-control";
import { CartBar, CartSummary } from "@/components/cart/cart-summary";

const TAG_LABEL: Record<NonNullable<Dish["tags"]>[number], string> = {
  signature: "Signature",
  chef: "Chef's special",
  spicy: "Spicy",
  popular: "Popular",
};

function DietMark({ diet }: { diet: Dish["diet"] }) {
  const isVeg = diet === "veg";
  return (
    <span
      className="inline-flex size-3.5 shrink-0 items-center justify-center rounded-[3px] border"
      style={{
        borderColor: isVeg ? "#3f8f5f" : "#b84a27",
      }}
      title={isVeg ? "Vegetarian" : "Non-vegetarian"}
      aria-label={isVeg ? "Vegetarian" : "Non-vegetarian"}
      role="img"
    >
      <span
        className="size-1.5 rounded-full"
        style={{ backgroundColor: isVeg ? "#3f8f5f" : "#b84a27" }}
      />
    </span>
  );
}

export function MenuExplorer({ initialCategory = "all" }: { initialCategory?: string }) {
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");

  const normalisedQuery = query.trim().toLowerCase();

  const sections = useMemo(() => {
    return menu
      .map((section) => {
        const dishes = section.dishes.filter((dish) => {
          if (!normalisedQuery) return true;
          return (
            dish.name.toLowerCase().includes(normalisedQuery) ||
            dish.description.toLowerCase().includes(normalisedQuery) ||
            section.name.toLowerCase().includes(normalisedQuery)
          );
        });
        return { ...section, dishes };
      })
      .filter((section) => {
        if (normalisedQuery) return section.dishes.length > 0;
        return category === "all" ? true : section.id === category;
      });
  }, [category, normalisedQuery]);

  const resultCount = sections.reduce((sum, section) => sum + section.dishes.length, 0);

  return (
    <>
      <div className="sticky top-16 z-30 -mx-5 border-b border-parchment/10 bg-charcoal/95 px-5 py-3 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:top-18">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-parchment/55"
              aria-hidden
            />
            <label htmlFor="menu-search" className="sr-only">
              Search the menu
            </label>
            <input
              id="menu-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search dishes — biryani, porotta, paneer…"
              className="field !py-3 pl-10 pr-10"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-parchment/60 transition-colors hover:text-saffron"
                aria-label="Clear search"
              >
                <X className="size-3.5" aria-hidden />
              </button>
            ) : null}
          </div>

          <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-0.5">
            <button
              type="button"
              onClick={() => {
                setCategory("all");
                setQuery("");
              }}
              aria-pressed={category === "all" && !normalisedQuery}
              className={`shrink-0 rounded-full border px-3.5 py-2 text-[12px] font-medium transition-colors ${
                category === "all" && !normalisedQuery
                  ? "border-saffron bg-saffron text-charcoal"
                  : "border-parchment/15 text-parchment/60 hover:border-parchment/35 hover:text-parchment"
              }`}
            >
              Everything
            </button>
            {menu.map((section) => {
              const active = category === section.id && !normalisedQuery;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => {
                    setCategory(section.id);
                    setQuery("");
                  }}
                  aria-pressed={active}
                  className={`shrink-0 rounded-[2px] border px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "border-brass bg-brass text-ink"
                      : "border-paper/20 text-paper/70 hover:border-brass/50 hover:text-paper"
                  }`}
                >
                  {section.short}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-10 pt-8 lg:grid-cols-[1fr_20rem] lg:gap-12">
        <div>
          <p className="flex items-start gap-2 rounded-[2px] border border-paper/15 bg-ink-soft px-3.5 py-3 text-[11.5px] leading-relaxed text-parchment/60">
            <Info className="mt-0.5 size-3.5 shrink-0 text-saffron/70" aria-hidden />
            {priceNote} Dishes marked &ldquo;Ask&rdquo; have no published price. Availability is
            confirmed by the restaurant.
          </p>

          <p
            data-testid="menu-result-count"
            className="mt-4 text-[11px] uppercase tracking-[0.16em] text-parchment/55"
            aria-live="polite"
          >
            {resultCount} dish{resultCount === 1 ? "" : "es"}
            {normalisedQuery ? ` matching “${query.trim()}”` : ""}
          </p>

          {sections.length === 0 ? (
            <div className="mt-8 rounded-[2px] border border-paper/15 bg-ink-soft px-5 py-10 text-center">
              <p className="font-display text-xl text-parchment">Nothing matches that yet.</p>
              <p className="mx-auto mt-2 max-w-sm text-[13px] text-parchment/60">
                Try “biryani”, “porotta” or “paneer” — or clear the search and browse by section.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                }}
                className="btn btn-ghost mt-5 !min-h-10 !px-4 !text-[13px]"
              >
                Reset
              </button>
            </div>
          ) : (
            <div className="mt-2 space-y-10">
              {sections.map((section) => (
                <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
                  <div className="flex items-end justify-between gap-4 border-b border-parchment/10 pb-3">
                    <div>
                      <h2
                        id={`${section.id}-heading`}
                        className="font-display text-2xl text-parchment"
                      >
                        {section.name}
                      </h2>
                      <p className="mt-1 text-[12px] text-parchment/60">{section.blurb}</p>
                    </div>
                    <span className="shrink-0 text-[10px] uppercase tracking-[0.16em] text-parchment/50">
                      {section.dishes.length} dishes
                    </span>
                  </div>

                  <ul className="divide-y divide-parchment/8">
                    {section.dishes.map((dish) => (
                      <li
                        key={dish.id}
                        className="group flex items-start gap-4 py-4 transition-colors hover:bg-parchment/[0.02]"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <DietMark diet={dish.diet} />
                            <h3 className="text-[14.5px] font-medium leading-snug text-parchment/90">
                              {dish.name}
                            </h3>
                            {dish.tags?.map((tag) => (
                              <span
                                key={tag}
                                className={`rounded-[2px] px-1.5 py-0.5 text-[10.5px] font-medium tracking-[0.04em] ${
                                tag === "chef" || tag === "signature"
                                  ? "bg-brass/15 text-brass"
                                  : "bg-paper/10 text-paper/70"
                              }`}
                              >
                                {TAG_LABEL[tag]}
                              </span>
                            ))}
                          </div>
                          <p className="mt-1.5 max-w-prose text-[12.5px] leading-relaxed text-parchment/50">
                            {dish.description}
                          </p>
                        </div>

                        <div className="flex shrink-0 flex-col items-end gap-2">
                          <p className="font-mono text-[13px] font-semibold tabular-nums text-brass">
                            {typeof dish.price === "number" ? formatRupees(dish.price) : "Ask"}
                          </p>
                          <QuantityControl dishId={dish.id} tone="quiet" />
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-40 space-y-4">
            <CartSummary />
            <div className="rounded-[2px] border border-paper/15 bg-ink-soft p-4 text-[11.5px] leading-relaxed text-parchment/60">
              <p className="font-medium text-parchment/70">How the enquiry works</p>
              <ol className="mt-2 list-decimal space-y-1 pl-4">
                <li>Pick your dishes and quantities.</li>
                <li>Choose dine-in, takeaway or delivery.</li>
                <li>WhatsApp opens with a formatted message.</li>
                <li>The counter confirms price, timing and availability.</li>
              </ol>
            </div>
          </div>
        </aside>
      </div>

      <CartBar />
    </>
  );
}
