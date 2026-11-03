import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site";
import { CalicutParadiseLogo } from "@/components/ui/logo";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-parchment/10 bg-charcoal pb-24 pt-16 md:pb-12">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3.5">
              <CalicutParadiseLogo size={44} variant="gold" />
              <span>
                <span className="block font-heading text-xl text-parchment">Calicut Paradise</span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-saffron">
                  Malabar Kitchen · Thrissur
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-parchment/55">
              {siteConfig.subtitle}. Dum biryanis, charcoal grills and Nadan favourites on Ikkanda
              Warrior Road — with parking at the door.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={siteConfig.links.swiggy}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-parchment/15 px-3.5 py-2 text-xs text-parchment/65 transition-colors hover:border-saffron/50 hover:text-saffron"
              >
                Order on Swiggy
                <ArrowUpRight className="size-3" aria-hidden />
              </a>
              <a
                href="https://instagram.com/calicutparadise"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-parchment/15 px-3.5 py-2 text-xs text-parchment/65 transition-colors hover:border-saffron/50 hover:text-saffron"
              >
                Instagram
                <ArrowUpRight className="size-3" aria-hidden />
              </a>
              <a
                href={siteConfig.links.linktree}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-parchment/15 px-3.5 py-2 text-xs text-parchment/65 transition-colors hover:border-saffron/50 hover:text-saffron"
              >
                Linktree
                <ArrowUpRight className="size-3" aria-hidden />
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-saffron">
              Visit
            </h2>
            <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed text-parchment/55">
              <p>{siteConfig.address.line1}</p>
              <p>
                {siteConfig.address.line2}, {siteConfig.address.city}
              </p>
              <p>
                {siteConfig.address.state} {siteConfig.address.postalCode}
              </p>
            </address>
            <p className="mt-4 flex items-start gap-2 text-xs text-parchment/60">
              <MapPin className="mt-0.5 size-3.5 shrink-0" aria-hidden />
              {siteConfig.address.landmark}
            </p>
            <p className="mt-3 flex items-start gap-2 text-xs text-parchment/60">
              <Clock className="mt-0.5 size-3.5 shrink-0" aria-hidden />
              {siteConfig.hours.days} · {siteConfig.hours.display}
            </p>
          </div>

          <div>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-saffron">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-6 items-center text-parchment/55 transition-colors hover:text-saffron"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/reserve"
                  className="inline-flex min-h-6 items-center text-parchment/55 transition-colors hover:text-saffron"
                >
                  Reserve a table
                </Link>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.tel}`}
                  className="inline-flex min-h-6 items-center gap-2 text-parchment/55 transition-colors hover:text-saffron"
                >
                  <Phone className="size-3.5" aria-hidden />
                  {siteConfig.phone.display}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-parchment/10 pt-6 text-[11px] leading-relaxed text-parchment/55">
          <p>
            Menu prices shown on this site are indicative, taken from the restaurant&apos;s public
            delivery listing; in-house prices and availability are confirmed at the counter. The
            WhatsApp order form is an enquiry only — nothing is paid or confirmed on this site.
          </p>
          <p className="mt-2">
            Confident House, 622 Ikkanda Warrior Road, Kokkala, Veliyannur, Thrissur, Kerala 680021. Authentic Malabar &amp; Kerala Dining.
          </p>
          <p className="mt-4 text-parchment/50">
            © {new Date().getFullYear()} Calicut Paradise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
