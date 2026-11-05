import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Car, Clock, ChevronRight, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Visit Us & Directions — Calicut Paradise Thrissur",
  description:
    "Find Calicut Paradise at Confident House, Ikkanda Warrior Road, Kokkala, Thrissur. Map, directions, parking, hours, and direct phone contact.",
  alternates: { canonical: "/visit" },
  openGraph: {
    title: "Visit Us · Calicut Paradise, Thrissur",
    description:
      "Find us on Ikkanda Warrior Road, Thrissur. On-site parking at Confident House, minutes from Thrissur Railway Station.",
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

      <article className="pb-28 pt-24 sm:pt-28 bg-ink text-paper">
        <header className="shell">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-paper/60">
            <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-brass">
              <ArrowLeft className="size-3" aria-hidden />
              Home
            </Link>
            <ChevronRight className="size-3 text-paper/20" aria-hidden />
            <span className="text-paper/80 font-medium">Visit &amp; Contact</span>
          </nav>

          <div className="max-w-3xl">
            <span className="label text-brass">
              LOCATION &amp; ARRIVAL
            </span>
            <h1 className="mt-3 font-display text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] text-paper">
              How to find us on Ikkanda Warrior Road.
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-paper/75 font-sans">
              Located at Confident House in Kokkala, Veliyannur. Minutes from Thrissur Railway Station, with dedicated on-site parking at the door.
            </p>
          </div>
        </header>

        <div className="shell mt-12 sm:mt-16 grid gap-10 lg:grid-cols-12 items-start">
          {/* Left Column: Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-[2px] border border-paper/15 bg-ink-soft p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-brass" />
                <h2 className="font-display text-lg text-paper">Address &amp; Landmark</h2>
              </div>
              <address className="not-italic text-sm leading-relaxed text-paper/70">
                {siteConfig.address.full}
              </address>
              <p className="text-xs text-paper/60 border-t border-paper/10 pt-3">
                <strong className="text-paper">Landmark:</strong> {siteConfig.address.landmark}
              </p>
              <a
                href={siteConfig.links.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full inline-flex items-center justify-center gap-2 text-sm"
              >
                <Navigation className="size-4" />
                <span>Open in Google Maps</span>
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>

            <div className="rounded-[2px] border border-paper/15 bg-ink-soft p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-brass" />
                <h2 className="font-display text-lg text-paper">Kitchen Hours</h2>
              </div>
              <div className="space-y-1.5 text-sm text-paper/75">
                <div className="flex justify-between border-b border-paper/10 pb-2">
                  <span>Monday – Sunday</span>
                  <span className="font-semibold text-paper">{siteConfig.hours.display}</span>
                </div>
                <p className="text-xs text-paper/60 pt-1">
                  Last kitchen orders accepted at 11:15 PM daily.
                </p>
              </div>

              <div className="border-t border-paper/10 pt-4 flex items-start gap-2.5">
                <Car className="size-4 text-brass shrink-0 mt-0.5" />
                <div className="text-xs text-paper/70 leading-relaxed">
                  <strong className="text-paper font-medium block">On-Site Parking:</strong>
                  Dedicated customer vehicle parking is available on the ground premises of Confident House.
                </div>
              </div>
            </div>

            <div className="rounded-[2px] border border-paper/15 bg-ink-soft p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2">
                <Phone className="size-4 text-brass" />
                <h2 className="font-display text-lg text-paper">Direct Contact</h2>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  href={`tel:${siteConfig.phone.tel}`}
                  className="btn btn-ghost inline-flex items-center justify-center gap-2 text-xs hover:border-brass hover:text-brass"
                >
                  <Phone className="size-3.5 text-brass" />
                  <span>Call Us</span>
                </a>
                <a
                  href={`https://wa.me/${siteConfig.phone.whatsapp}?text=Hello%20Calicut%20Paradise!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost inline-flex items-center justify-center gap-2 text-xs hover:border-brass hover:text-brass"
                >
                  <MessageCircle className="size-3.5 text-brass" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Wayfinding & Map */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[16/10] rounded-[2px] overflow-hidden border border-paper/15 bg-ink-soft">
              <Image
                src="/images/restaurant/calicut-paradise-exterior.jpg"
                alt="Confident House building exterior of Calicut Paradise on Ikkanda Warrior Road, Thrissur"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-paper/80">
                Confident House frontage on Ikkanda Warrior Road with gold serif signage and ground-level forecourt parking.
              </div>
            </div>

            <div className="overflow-hidden rounded-[2px] border border-paper/15 bg-ink-soft h-[360px]">
              <iframe
                title="Google Maps embed for Calicut Paradise Thrissur"
                src={siteConfig.links.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="size-full border-0 grayscale-[0.25] contrast-[1.05]"
              />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
