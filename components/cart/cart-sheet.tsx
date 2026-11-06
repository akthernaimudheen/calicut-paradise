"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  Info,
  MessageCircle,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { siteConfig } from "@/lib/site";
import { CTA, CtaButton } from "@/components/ui/cta";
import {
  buildOrderMessage,
  formatRupees,
  whatsappUrl,
  type OrderType,
} from "@/lib/whatsapp";
import { useCart } from "./cart-provider";
import { QuantityControl } from "./quantity-control";

const ORDER_TYPES: OrderType[] = ["dine-in", "takeaway", "delivery"];

export function CartSheet() {
  const { items, count, total, hasUnpricedItems, isOpen, closeCart, remove, clear, lines } =
    useCart();
  const [orderType, setOrderType] = useState<OrderType>("takeaway");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [sent, setSent] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeCart]);

  const message = buildOrderMessage({ orderType, notes, items: lines });

  function handleSend() {
    if (items.length === 0) {
      setError("Add at least one dish first.");
      return;
    }
    setError(null);
    window.open(whatsappUrl(siteConfig.phone.whatsapp, message), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-70 flex justify-end"
          initial={reduceMotion ? undefined : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close order enquiry"
            onClick={closeCart}
            className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={reduceMotion ? undefined : { y: 40, opacity: 0.6 }}
            animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            exit={reduceMotion ? undefined : { y: 40, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-[92svh] w-full flex-col self-end rounded-t-2xl border-t border-parchment/15 bg-charcoal shadow-2xl sm:h-full sm:max-w-md sm:self-auto sm:rounded-none sm:rounded-l-2xl sm:border-l sm:border-t-0"
          >
            <header className="flex items-start justify-between gap-3 border-b border-parchment/10 px-5 py-4">
              <div>
                <h2 id="cart-title" className="font-display text-xl text-parchment">
                  Your order enquiry
                </h2>
                <p className="mt-0.5 text-[11px] text-parchment/60">
                  {count > 0 ? `${count} item${count === 1 ? "" : "s"} selected` : "Nothing selected yet"}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeCart}
                className="grid size-9 place-items-center rounded-full border border-parchment/15 text-parchment/70 transition-colors hover:border-saffron/50 hover:text-saffron"
                aria-label="Close"
              >
                <X className="size-4" aria-hidden />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 py-12 text-center">
                  <span className="grid size-12 place-items-center rounded-full border border-parchment/15 text-parchment/60">
                    <ShoppingBag className="size-5" aria-hidden />
                  </span>
                  <p className="text-[13px] text-parchment/55">
                    Add dishes from the menu and they will be listed here, ready to send.
                  </p>
                  <CTA href="/menu" onClick={closeCart} variant="secondary" size="sm">
                    Browse the menu
                  </CTA>
                </div>
              ) : (
                <div className="space-y-5">
                  <ul className="divide-y divide-parchment/8">
                    {items.map((item) => (
                      <li key={item.dish.id} className="flex items-start gap-3 py-3 first:pt-0">
                        <div className="min-w-0 flex-1">
                          <p className="text-[13.5px] font-medium leading-snug text-parchment/90">
                            {item.dish.name}
                          </p>
                          <p className="mt-0.5 text-[11px] text-parchment/60">
                            {item.dish.categoryName}
                            {typeof item.dish.price === "number"
                              ? ` · ${formatRupees(item.dish.price)} each (listed)`
                              : " · price on ask"}
                          </p>
                          <div className="mt-2 flex items-center gap-3">
                            <QuantityControl dishId={item.dish.id} tone="quiet" />
                            <button
                              type="button"
                              onClick={() => remove(item.dish.id)}
                              className="inline-flex items-center gap-1 text-[11px] text-parchment/60 transition-colors hover:text-terracotta"
                              aria-label={`Remove ${item.dish.name}`}
                            >
                              <Trash2 className="size-3.5" aria-hidden />
                              Remove
                            </button>
                          </div>
                        </div>
                        <p className="shrink-0 pt-0.5 text-[13px] font-semibold tabular-nums text-parchment/80">
                          {typeof item.dish.price === "number"
                            ? formatRupees(item.dish.price * item.quantity)
                            : "—"}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {items.length > 0 ? (
                    <button
                      type="button"
                      onClick={clear}
                      className="text-[11px] text-parchment/55 underline decoration-parchment/20 underline-offset-4 transition-colors hover:text-parchment/70"
                    >
                      Clear all items
                    </button>
                  ) : null}

                  <div className="h-px w-full bg-parchment/10" aria-hidden />

                  <div>
                    <label className="field-label mb-2 block">Order Type <span className="normal-case tracking-normal text-parchment/50">(optional)</span></label>
                    <div className="grid grid-cols-3 gap-1.5 rounded-lg border border-parchment/15 bg-charcoal/80 p-1">
                      {ORDER_TYPES.map((type) => {
                        const active = orderType === type;
                        const shortLabel =
                          type === "takeaway" ? "Takeaway" : type === "delivery" ? "Delivery" : "Dine-in";
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setOrderType(type)}
                            className={`rounded-[2px] border py-1.5 text-center text-xs font-medium transition-colors ${
                              active
                                ? "border-brass/70 bg-brass/12 text-parchment font-semibold"
                                : "border-transparent text-parchment/70 hover:border-parchment/20 hover:text-parchment"
                            }`}
                          >
                            {shortLabel}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cart-notes" className="field-label mb-1.5 block">
                      Quick Note or Name <span className="normal-case tracking-normal text-parchment/50">(optional)</span>
                    </label>
                    <input
                      id="cart-notes"
                      type="text"
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      placeholder="e.g. Arjun, pickup at 8:30 PM, extra raita…"
                      className="field"
                    />
                  </div>

                  <div className="rounded-lg border border-parchment/10 bg-clove/50 p-3">
                    <div className="flex items-center justify-between text-[12.5px]">
                      <span className="text-parchment/55">Indicative total</span>
                      <span className="font-semibold tabular-nums text-parchment/90">
                        {total !== null ? formatRupees(total) : "To be confirmed"}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[10.5px] leading-snug text-parchment/55">
                      {hasUnpricedItems
                        ? "Some dishes have no public price, so the counter will confirm the total."
                        : "Based on listed delivery prices — the final bill may differ."}
                    </p>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => setShowPreview((value) => !value)}
                      aria-expanded={showPreview}
                      className="inline-flex items-center gap-1.5 text-[11px] text-parchment/60 transition-colors hover:text-saffron"
                    >
                      <ChevronDown
                        className={`size-3.5 transition-transform ${showPreview ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                      {showPreview ? "Hide message preview" : "Preview the WhatsApp message"}
                    </button>
                    {showPreview ? (
                      <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap rounded-lg border border-parchment/10 bg-charcoal px-3 py-2.5 font-sans text-[11px] leading-relaxed text-parchment/60">
                        {message}
                      </pre>
                    ) : null}
                  </div>
                </div>
              )}
            </div>

            {items.length > 0 ? (
              <footer className="border-t border-parchment/10 bg-charcoal px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
                {error ? (
                  <p role="alert" className="mb-2 text-[11.5px] text-terracotta">
                    {error}
                  </p>
                ) : null}
                <CtaButton onClick={handleSend} variant="primary" className="w-full">
                  <MessageCircle className="size-4 shrink-0" aria-hidden />
                  Send Order on WhatsApp (1 Tap)
                </CtaButton>
                <p className="mt-2.5 flex items-start gap-1.5 text-[10.5px] leading-snug text-parchment/55">
                  <Info className="mt-0.5 size-3 shrink-0" aria-hidden />
                  Enquiry only. No payment is taken here, delivery is not booked automatically, and
                  the order is confirmed when the restaurant replies on WhatsApp.
                </p>
                {sent ? (
                  <p role="status" className="mt-2 text-[11px] text-saffron">
                    WhatsApp opened in a new tab. Nothing sent yet? Call{" "}
                    <a href={`tel:${siteConfig.phone.tel}`} className="underline underline-offset-2">
                      {siteConfig.phone.display}
                    </a>
                    .
                  </p>
                ) : null}
              </footer>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
