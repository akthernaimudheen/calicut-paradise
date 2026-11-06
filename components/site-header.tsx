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

  // Close menu on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full">
      {/* Top Bar */}
      <div
        className={`transition-colors duration-300 ${
          scrolled || menuOpen
            ? "border-b border-paper/10 bg-ink/95 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-3 sm:h-18 sm:gap-4">
          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
          >
            <CalicutParadiseLogo
              variant="gold"
              className="[--logo-size:46px] transition-transform duration-300 group-hover:scale-105 sm:[--logo-size:36px]"
            />
            <span className="flex min-w-0 flex-col justify-center leading-none">
              <span className="font-heading text-[15px] font-medium leading-[1.12] tracking-[0.02em] text-paper sm:text-[18px] sm:leading-tight">
                Calicut
                <br className="sm:hidden" /> Paradise
              </span>
              <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.24em] text-brass sm:mt-0.5 sm:text-[9px]">
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
                  className={`text-[13px] font-medium tracking-[0.04em] transition-colors hover:text-brass ${
                    active ? "text-brass" : "text-paper/70"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <a
              href={`tel:${siteConfig.phone.tel}`}
              className="hidden items-center gap-2 text-[13px] font-medium text-paper/70 transition-colors hover:text-brass md:flex"
            >
              <Phone className="size-3.5 text-brass" aria-hidden="true" />
              <span>{siteConfig.phone.display}</span>
            </a>

            <button
              type="button"
              onClick={openCart}
              className="relative grid size-11 place-items-center rounded-[2px] border border-paper/15 text-paper/85 transition-colors hover:border-brass hover:text-brass sm:size-10"
              aria-label={count > 0 ? `Open order enquiry, ${count} items` : "Open order enquiry"}
            >
              <ShoppingBag className="size-4" aria-hidden="true" />
              {count > 0 ? (
                <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-brass px-1 font-mono text-[10px] font-bold text-ink">
                  {count}
                </span>
              ) : null}
            </button>

            <Link
              href="/reserve"
              className="btn btn-primary hidden !min-h-9 !px-4 !text-[13px] sm:inline-flex"
            >
              Reserve
            </Link>

            {/* Hamburger / Close Toggle Button */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="grid size-11 place-items-center rounded-[2px] border border-paper/20 bg-ink/50 text-paper transition-colors hover:border-brass hover:text-brass sm:size-10 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Mobile/Tablet Navigation Drawer */}
      {menuOpen ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-16 sm:top-[4.5rem] bottom-0 z-50 overflow-y-auto bg-ink shadow-2xl lg:hidden"
        >
          <div className="shell flex min-h-full flex-col justify-between py-6 pb-28 sm:py-8 sm:pb-32">
            <nav aria-label="Mobile Navigation" className="flex flex-col divide-y divide-paper/10">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`py-4 font-heading text-2xl transition-colors hover:text-brass ${
                      active ? "text-brass font-semibold" : "text-paper/85"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 space-y-4 border-t border-paper/10 pt-6">
              <a
                href={`tel:${siteConfig.phone.tel}`}
                className="flex items-center gap-3 text-sm text-paper/75 hover:text-brass"
              >
                <Phone className="size-4 text-brass" />
                <span>{siteConfig.phone.display}</span>
              </a>
              <p className="text-xs text-paper/50">
                {siteConfig.address.full}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
