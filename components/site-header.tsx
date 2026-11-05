"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, ShoppingBag, X } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site";
import { CalicutParadiseLogo } from "@/components/ui/logo";
import { useCart } from "./cart/cart-provider";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile navigation is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu on route change during render without triggering react-hooks/set-state-in-effect
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full">
      {/* Top Bar with glassmorphism (contained so it does not trap fixed child drawers) */}
      <div
        className={`transition-colors duration-300 ${
          scrolled || menuOpen
            ? "border-b border-parchment/10 bg-[#0c1815]/95 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-4 sm:h-18">
          <Link href="/" className="group flex items-center gap-3">
            <CalicutParadiseLogo
              size={36}
              variant="gold"
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <span className="leading-tight">
              <span className="block font-heading text-[16px] font-medium tracking-[0.02em] text-parchment sm:text-[18px]">
                Calicut Paradise
              </span>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.26em] text-saffron">
                Thrissur
              </span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] font-medium tracking-[0.04em] transition-colors hover:text-saffron ${
                    active ? "text-saffron" : "text-parchment/70"
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
              className="hidden items-center gap-2 text-[13px] font-medium text-parchment/70 transition-colors hover:text-saffron md:flex"
            >
              <Phone className="size-3.5" aria-hidden="true" />
              <span>{siteConfig.phone.display}</span>
            </a>

            <button
              type="button"
              onClick={openCart}
              className="relative grid size-10 place-items-center rounded-full border border-parchment/15 text-parchment/80 transition-colors hover:border-saffron/60 hover:text-saffron"
              aria-label={count > 0 ? `Open order enquiry, ${count} items` : "Open order enquiry"}
            >
              <ShoppingBag className="size-4" aria-hidden="true" />
              {count > 0 ? (
                <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-saffron px-1 text-[10px] font-bold text-charcoal">
                  {count}
                </span>
              ) : null}
            </button>

            <Link
              href="/reserve"
              className="btn btn-primary hidden !min-h-10 !px-4 !text-[13px] sm:inline-flex"
            >
              Reserve
            </Link>

            {/* Hamburger / Close Toggle Button (visible on mobile and tablet < 1024px) */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="grid size-10 place-items-center rounded-full border border-parchment/20 bg-charcoal/40 text-parchment transition-colors hover:border-saffron/60 hover:text-saffron lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Mobile/Tablet Navigation Drawer (unconstrained by backdrop-blur) */}
      {menuOpen ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-16 sm:top-[4.5rem] bottom-0 z-50 overflow-y-auto bg-[#0c1815] shadow-2xl lg:hidden"
          style={{ height: "calc(100dvh - 4rem)" }}
        >
          <div className="shell flex min-h-full flex-col justify-between py-6 pb-28 sm:py-8 sm:pb-32">
            <nav aria-label="Mobile Navigation" className="flex flex-col divide-y divide-parchment/10">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                const isReserve = link.href === "/reserve";
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`py-4 font-heading text-2xl transition-colors hover:text-saffron ${
                      active
                        ? "text-saffron font-medium"
                        : isReserve
                        ? "text-saffron"
                        : "text-parchment"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 space-y-3.5 border-t border-parchment/10 pt-6 text-sm">
              <p className="text-parchment/70 leading-relaxed">{siteConfig.address.full}</p>
              <p className="text-parchment/70">
                {siteConfig.hours.days} · {siteConfig.hours.display}
              </p>
              <a
                href={`tel:${siteConfig.phone.tel}`}
                onClick={() => setMenuOpen(false)}
                className="btn btn-primary w-full mt-3 !min-h-12"
              >
                <Phone className="size-4" aria-hidden="true" />
                <span>Call {siteConfig.phone.display}</span>
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
