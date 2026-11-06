import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site";
import { CalicutParadiseLogo } from "@/components/ui/logo";
import { CTA } from "@/components/ui/cta";

export function SiteFooter() {
  // Mobile padding clears the quick-action dock plus the enquiry bar that floats above it.
  return (
    <footer className="relative border-t border-paper/10 bg-ink pb-[calc(8.5rem+env(safe-area-inset-bottom))] pt-16 md:pb-12 text-paper">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3.5">
              <CalicutParadiseLogo variant="gold" className="[--logo-size:42px]" />
              <span>
                <span className="block font-heading text-xl text-paper">Calicut Paradise</span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-brass">
                  Malabar Kitchen · Thrissur
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/60">
              {siteConfig.subtitle}. Dum biryanis, charcoal grills and Nadan favourites on Ikkanda
              Warrior Road — with dedicated parking at Confident House.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <CTA href={siteConfig.links.swiggy} variant="secondary" size="sm" arrow="external">
                Order on Swiggy
              </CTA>
              <CTA
                href="https://instagram.com/calicutparadise"
                variant="secondary"
                size="sm"
                arrow="external"
              >
                Instagram
              </CTA>
              <CTA href={siteConfig.links.linktree} variant="secondary" size="sm" arrow="external">
                Linktree
              </CTA>
            </div>
          </div>

          <div>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brass">
              Visit
            </h2>
            <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed text-paper/60">
              <p>{siteConfig.address.line1}</p>
              <p>
                {siteConfig.address.line2}, {siteConfig.address.city}
              </p>
              <p>
                {siteConfig.address.state} {siteConfig.address.postalCode}
              </p>
            </address>
            <p className="mt-4 flex items-start gap-2 text-xs text-paper/65">
              <MapPin className="mt-0.5 size-3.5 shrink-0 text-brass" aria-hidden />
              {siteConfig.address.landmark}
            </p>
            <p className="mt-2.5 flex items-start gap-2 text-xs text-paper/65">
              <Clock className="mt-0.5 size-3.5 shrink-0 text-brass" aria-hidden />
              {siteConfig.hours.days} · {siteConfig.hours.display}
            </p>
          </div>

          <div>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brass">
              Explore
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-6 items-center text-paper/65 transition-colors hover:text-brass"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/reserve"
                  className="inline-flex min-h-6 items-center text-paper/65 transition-colors hover:text-brass"
                >
                  Reserve a table
                </Link>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.tel}`}
                  className="inline-flex min-h-6 items-center gap-2 text-paper/65 transition-colors hover:text-brass"
                >
                  <Phone className="size-3.5 text-brass" aria-hidden />
                  {siteConfig.phone.display}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-paper/10 pt-6 text-[11px] leading-relaxed text-paper/50">
          <p>
            Menu prices shown on this site are indicative, taken from the restaurant&apos;s public
            delivery listing; in-house prices and availability are confirmed at the counter. The
            WhatsApp order form is an enquiry only — nothing is paid or confirmed on this site.
          </p>
          <p className="mt-2">
            Confident House, 622 Ikkanda Warrior Road, Kokkala, Veliyannur, Thrissur, Kerala 680021.
          </p>
          <p className="mt-3 text-paper/40">
            © {new Date().getFullYear()} Calicut Paradise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
