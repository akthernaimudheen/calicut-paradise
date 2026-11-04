"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Phone, ShoppingBag, X } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site";
import { useCart } from "./cart/cart-provider";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-b border-parchment/10 bg-charcoal/92 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 sm:h-18">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative grid size-9 place-items-center rounded-full border border-gold/45 text-[13px] font-semibold tracking-[0.08em] text-gold transition-colors group-hover:border-gold sm:size-10 sm:text-sm">
            {siteConfig.monogram}
          </span>
          <span className="leading-none">
            <span className="block font-display text-[15px] tracking-[0.02em] text-parchment sm:text-base">
              Calicut Paradise
            </span>
            <span className="mt-1 block text-[9px] font-medium uppercase tracking-[0.34em] text-parchment/60">
              Thrissur
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const active = link.href === "/menu" && pathname === "/menu";
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-medium tracking-[0.04em] transition-colors hover:text-gold ${
                  active ? "text-gold" : "text-parchment/70"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${siteConfig.phone.tel}`}
            className="hidden items-center gap-2 text-[13px] font-medium text-parchment/70 transition-colors hover:text-gold md:flex"
          >
            <Phone className="size-3.5" aria-hidden />
            {siteConfig.phone.display}
          </a>

          <button
            type="button"
            onClick={openCart}
            className="relative grid size-10 place-items-center rounded-full border border-parchment/15 text-parchment/80 transition-colors hover:border-gold/60 hover:text-gold"
            aria-label={count > 0 ? `Open order enquiry, ${count} items` : "Open order enquiry"}
          >
            <ShoppingBag className="size-4" aria-hidden />
            {count > 0 ? (
              <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-charcoal">
                {count}
              </span>
            ) : null}
          </button>

          <Link href="/reserve" className="btn btn-primary hidden !min-h-10 !px-4 !text-[13px] sm:inline-flex">
            Reserve
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-10 place-items-center rounded-full border border-parchment/15 text-parchment transition-colors hover:border-gold/60 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-charcoal lg:hidden"
          >
            <div className="shell flex min-h-full flex-col gap-8 pb-28 pt-8">
              <nav aria-label="Mobile" className="flex flex-col divide-y divide-parchment/10">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-4 font-display text-2xl text-parchment"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/reserve"
                  onClick={() => setMenuOpen(false)}
                  className="block py-4 font-display text-2xl text-gold"
                >
                  Reserve a table
                </Link>
              </nav>

              <div className="mt-auto space-y-3 text-sm">
                <p className="text-parchment/60">{siteConfig.address.full}</p>
                <p className="text-parchment/60">
                  {siteConfig.hours.days} · {siteConfig.hours.display}
                </p>
                <a
                  href={`tel:${siteConfig.phone.tel}`}
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-primary w-full"
                >
                  <Phone className="size-4" aria-hidden />
                  Call {siteConfig.phone.display}
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
