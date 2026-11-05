"use client";

import { Check, Minus, Plus } from "lucide-react";
import { useCart } from "./cart-provider";

type Props = {
  dishId: string;
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
        ? "border-brass bg-brass text-ink hover:bg-brass-soft"
        : "border-paper/25 text-paper/85 hover:border-brass hover:text-brass";
    return (
      <button
        type="button"
        onClick={() => add(dishId)}
        aria-label="Add to order enquiry"
        className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-[2px] border px-3 text-[12px] font-semibold transition-colors ${base} ${className}`}
      >
        {justAdded ? <Check className="size-3.5" aria-hidden /> : <Plus className="size-3.5" aria-hidden />}
        Add
      </button>
    );
  }

  const shell =
    tone === "solid"
      ? "border-brass/50 bg-ink-soft text-brass"
      : "border-paper/25 bg-ink-soft text-paper";

  return (
    <div
      className={`inline-flex min-h-[38px] items-center gap-1 rounded-[2px] border ${shell} ${className}`}
    >
      <button
        type="button"
        onClick={() => decrement(dishId)}
        className="grid size-9 place-items-center rounded-[2px] transition-colors hover:bg-brass/20 text-paper/80 hover:text-brass"
        aria-label="Remove one"
      >
        <Minus className="size-3.5" aria-hidden />
      </button>
      <span className="min-w-6 text-center font-mono text-[13px] font-semibold tabular-nums text-paper" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => add(dishId)}
        className="grid size-9 place-items-center rounded-[2px] transition-colors hover:bg-brass/20 text-paper/80 hover:text-brass"
        aria-label="Add one more"
      >
        <Plus className="size-3.5" aria-hidden />
      </button>
    </div>
  );
}
