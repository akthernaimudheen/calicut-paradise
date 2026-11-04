"use client";

import { Check, Minus, Plus } from "lucide-react";
import { useCart } from "./cart-provider";

type Props = {
  dishId: string;
  /** "solid" for cards on light backgrounds, "quiet" for dense menu rows. */
  tone?: "solid" | "quiet";
  className?: string;
};

export function QuantityControl({ dishId, tone = "solid", className = "" }: Props) {
  const { quantities, add, decrement, lastAdded } = useCart();
  const quantity = quantities[dishId] ?? 0;
  const justAdded = lastAdded === dishId;

  if (quantity === 0) {
    const base =
      tone === "solid"
        ? "border-gold/50 bg-gold/12 text-gold hover:bg-gold hover:text-charcoal"
        : "border-parchment/20 text-parchment/75 hover:border-gold/60 hover:text-gold";
    return (
      <button
        type="button"
        onClick={() => add(dishId)}
        aria-label="Add to order enquiry"
        className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 text-[12px] font-semibold transition-colors ${base} ${className}`}
      >
        {justAdded ? <Check className="size-3.5" aria-hidden /> : <Plus className="size-3.5" aria-hidden />}
        Add
      </button>
    );
  }

  const shell =
    tone === "solid"
      ? "border-gold/50 bg-gold/12 text-gold"
      : "border-parchment/20 text-parchment/80";

  return (
    <div
      className={`inline-flex min-h-9 items-center gap-1 rounded-full border ${shell} ${className}`}
    >
      <button
        type="button"
        onClick={() => decrement(dishId)}
        className="grid size-9 place-items-center rounded-full transition-colors hover:bg-gold/15"
        aria-label="Remove one"
      >
        <Minus className="size-3.5" aria-hidden />
      </button>
      <span className="min-w-5 text-center text-[13px] font-semibold tabular-nums" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => add(dishId)}
        className="grid size-9 place-items-center rounded-full transition-colors hover:bg-gold/15"
        aria-label="Add one more"
      >
        <Plus className="size-3.5" aria-hidden />
      </button>
    </div>
  );
}
