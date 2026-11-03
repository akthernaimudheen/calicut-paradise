"use client";

import { useEffect, useState } from "react";
import { openState } from "@/lib/hours";
import { siteConfig } from "@/lib/site";

/**
 * Renders the live open/closed state after mount so server HTML stays stable
 * (and the visitor's own timezone never leaks into the calculation).
 */
export function HoursBadge({ className = "" }: { className?: string }) {
  const [state, setState] = useState<ReturnType<typeof openState> | null>(null);

  useEffect(() => {
    const update = () =>
      setState(openState(new Date(), siteConfig.hours.opens, siteConfig.hours.closes));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium ${
        state
          ? state.isOpen
            ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
            : "border-parchment/15 bg-parchment/5 text-parchment/60"
          : "border-parchment/15 bg-parchment/5 text-parchment/60"
      } ${className}`}
    >
      <span
        className={`size-1.5 rounded-full ${
          state?.isOpen ? "bg-emerald-400" : "bg-parchment/40"
        }`}
        aria-hidden
      />
      {state ? state.label : `Daily · ${siteConfig.hours.display}`}
    </span>
  );
}
