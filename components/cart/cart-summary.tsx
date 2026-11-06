"use client";

import { ArrowRight, MessageCircle, ShoppingBag } from "lucide-react";
import { useCart } from "./cart-provider";
import { formatRupees } from "@/lib/whatsapp";

/** Desktop sidebar summary — always visible next to the menu. */
export function CartSummary() {
  const { count, items, total, openCart, hasUnpricedItems } = useCart();

  return (
    <div className="rounded-xl border border-parchment/12 bg-clove/50 p-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 font-display text-lg text-parchment">
          <ShoppingBag className="size-4 text-saffron" aria-hidden />
          Your enquiry
        </h2>
        <span className="rounded-full bg-saffron/15 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-saffron">
          {count}
        </span>
      </div>

      {count === 0 ? (
        <p className="mt-3 text-[12px] leading-relaxed text-parchment/60">
          Tap <span className="text-parchment/70">Add</span> on any dish. When you are done, send the
          list to the counter on WhatsApp — itemised, no dictation.
        </p>
      ) : (
        <>
          <ul className="mt-3 space-y-1.5">
            {items.slice(0, 4).map((item) => (
              <li key={item.dish.id} className="flex justify-between gap-2 text-[12px]">
                <span className="min-w-0 truncate text-parchment/65">
                  {item.quantity} × {item.dish.name}
                </span>
                <span className="shrink-0 tabular-nums text-parchment/60">
                  {typeof item.dish.price === "number" ? formatRupees(item.dish.price * item.quantity) : "—"}
                </span>
              </li>
            ))}
            {items.length > 4 ? (
              <li className="text-[11px] text-parchment/55">+{items.length - 4} more</li>
            ) : null}
          </ul>
          <div className="mt-3 flex items-center justify-between border-t border-parchment/10 pt-2.5 text-[12.5px]">
            <span className="text-parchment/50">Indicative</span>
            <span className="font-semibold tabular-nums text-parchment/90">
              {total !== null ? formatRupees(total) : "To be confirmed"}
            </span>
          </div>
          {hasUnpricedItems ? (
            <p className="mt-1 text-[10.5px] leading-snug text-parchment/55">
              Includes dishes with no public price.
            </p>
          ) : null}
        </>
      )}

      <button
        type="button"
        onClick={openCart}
        className="btn btn-primary mt-4 w-full !min-h-11 !text-[13px]"
      >
        <MessageCircle className="size-4" aria-hidden />
        {count === 0 ? "Open order enquiry" : "Review & send"}
        <ArrowRight className="size-3.5" aria-hidden />
      </button>
      <p className="mt-2 text-center text-[10px] uppercase tracking-[0.14em] text-parchment/55">
        Enquiry only · not a confirmed order
      </p>
    </div>
  );
}

/**
 * Mobile sticky bar that sits above the bottom dock. Its offset includes the
 * dock's safe-area inset so it never slides underneath it on iPhone.
 */
export function CartBar() {
  const { count, openCart } = useCart();
  if (count === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-[calc(3.5rem+env(safe-area-inset-bottom))] z-40 border-t border-saffron/25 bg-charcoal/95 px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
      <button
        type="button"
        onClick={openCart}
        className="btn btn-primary w-full !min-h-11 !text-[13px]"
      >
        <ShoppingBag className="size-4" aria-hidden />
        Review order enquiry · {count} item{count === 1 ? "" : "s"}
      </button>
    </div>
  );
}
