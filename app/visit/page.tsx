import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Car, Clock, Compass, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Visit Us & Directions — Calicut Paradise Thrissur",
  description:
    "Find Calicut Paradise at Confident House, Ikkanda Warrior Road, Kokkala, Thrissur. Map, directions, parking instructions, hours and direct WhatsApp & phone contacts.",
  alternates: { canonical: "/visit" },
  openGraph: {
    title: "Visit Us · Calicut Paradise, Thrissur",
    description:
      "Find us on Ikkanda Warrior Road, Thrissur. On-site parking at Confident House, 5 minutes from Thrissur Railway Station.",
    url: `${siteConfig.url}/visit`,
  },
};

export default function VisitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Visit & Contact", path: "/visit" },
            ]),
          ),
        }}
      />

      <article className="pb-28 pt-24 sm:pt-28">
        <header className="shell">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-[11px] text-parchment/60">
            <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-saffron">
              <ArrowLeft className="size-3" aria-hidden />
              Home
            </Link>
            <ChevronRightIcon className="size-3 text-parchment/20" aria-hidden />
            <span className="text-parchment/70">Visit &amp; Contact</span>
          </nav>

          <div className="max-w-3xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-saffron">
              Location &amp; Contact
            </div>
            <h1 className="mt-4 font-heading text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-parchment">
              How to find us on Ikkanda Warrior Road.
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-parchment/80 font-sans">
              Centrally located in Kokkala, Veliyannur, just five minutes from Thrissur Railway Station.
              Step inside for air-conditioned dining, or call our counter for instant takeaways.
            </p>
          </div>
        </header>

        <div className="shell mt-12 sm:mt-16 grid gap-10 lg:grid-cols-12">
          {/* Left Column: Essential Details & Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address & Landmark Card */}
            <div className="rounded-2xl border border-parchment/12 bg-charcoal/40 p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-saffron/15 text-saffron">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <h2 className="font-heading text-lg text-parchment">Address</h2>
                  <p className="text-xs text-saffron">Confident House, Thrissur</p>
                </div>
              </div>
              <address className="not-italic text-sm leading-relaxed text-parchment/75">
                {siteConfig.address.full}
              </address>
              <p className="text-xs text-parchment/60 border-t border-parchment/10 pt-3">
                <strong className="text-parchment/80">Landmark:</strong> {siteConfig.address.landmark}.
              </p>
              <a
                href={siteConfig.links.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full inline-flex items-center justify-center gap-2 text-sm !min-h-11"
              >
                <Navigation className="size-4" />
                <span>Open in Google Maps</span>
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>

            {/* Hours & Parking Card */}
            <div className="rounded-2xl border border-parchment/12 bg-charcoal/40 p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-saffron/15 text-saffron">
                  <Clock className="size-5" />
                </div>
                <div>
                  <h2 className="font-heading text-lg text-parchment">Opening Hours</h2>
                  <p className="text-xs text-saffron">Open Every Day</p>
                </div>
              </div>
              <div className="space-y-1.5 text-sm text-parchment/75">
                <div className="flex justify-between border-b border-parchment/10 pb-2">
                  <span>Monday – Sunday</span>
                  <span className="font-semibold text-parchment">{siteConfig.hours.display}</span>
                </div>
                <p className="text-xs text-parchment/60 pt-1">
                  Last kitchen orders accepted at 11:15 PM daily.
                </p>
              </div>

              <div className="border-t border-parchment/10 pt-4 flex items-start gap-3">
                <Car className="size-5 text-saffron shrink-0 mt-0.5" />
                <div className="text-xs text-parchment/70 leading-relaxed">
                  <strong className="text-parchment font-medium block">On-Site Parking:</strong>
                  Dedicated customer vehicle parking is available on the ground premises of Confident House.
                </div>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="rounded-2xl border border-parchment/12 bg-charcoal/40 p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-saffron/15 text-saffron">
                  <Phone className="size-5" />
                </div>
                <div>
                  <h2 className="font-heading text-lg text-parchment">Direct Lines</h2>
                  <p className="text-xs text-saffron">Counter &amp; Orders</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  href={`tel:${siteConfig.phone.tel}`}
                  className="btn btn-ghost border-parchment/20 inline-flex items-center justify-center gap-2 text-xs !min-h-11 hover:border-saffron hover:text-saffron"
                >
                  <Phone className="size-3.5" />
                  <span>Call Us</span>
                </a>
                <a
                  href={`https://wa.me/${siteConfig.phone.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost border-parchment/20 inline-flex items-center justify-center gap-2 text-xs !min-h-11 hover:border-saffron hover:text-saffron"
                >
                  <MessageCircle className="size-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Embed */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative h-[420px] sm:h-[540px] lg:h-full min-h-[420px] rounded-2xl overflow-hidden border border-parchment/15 shadow-2xl bg-charcoal">
              <iframe
                title="Calicut Paradise Location Map"
                src={siteConfig.links.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(90%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              <div className="absolute bottom-3 right-3 bg-charcoal/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-parchment/15 text-[10px] text-parchment/70 flex items-center gap-1.5">
                <Compass className="size-3 text-saffron" />
                <span>Confident House · Ikkanda Warrior Rd</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

function ChevronRightIcon({ className, "aria-hidden": ariaHidden }: { className?: string; "aria-hidden"?: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden={ariaHidden}>
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
