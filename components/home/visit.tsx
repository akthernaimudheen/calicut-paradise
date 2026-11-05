import Link from "next/link";
import { Car, Clock, MapPin, Navigation, Phone, Train } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { HoursBadge } from "@/components/hours-badge";
import { siteConfig } from "@/lib/site";

export function Visit() {
  return (
    <section id="visit" className="relative bg-clove py-16 sm:py-20 lg:py-24">
      <div className="shell grid gap-8 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <span className="eyebrow">Find us</span>
          <h2 className="display-lg mt-4">Ikkanda Warrior Road, Kokkala.</h2>
          <p className="lede mt-4 max-w-md text-[14px]">
            Confident House, on the stretch between the KSRTC stand and Veliyannur. Park at the
            building and walk straight in.
          </p>

          <div className="mt-7 space-y-4">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-saffron" aria-hidden />
              <div>
                <p className="text-[13px] font-medium text-parchment/90">Address</p>
                <address className="mt-0.5 text-[13px] not-italic leading-relaxed text-parchment/55">
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}, {siteConfig.address.city}, {siteConfig.address.state}{" "}
                  {siteConfig.address.postalCode}
                </address>
              </div>
            </div>

            <div className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-saffron" aria-hidden />
              <div>
                <p className="text-[13px] font-medium text-parchment/90">Hours</p>
                <p className="mt-0.5 text-[13px] text-parchment/55">
                  {siteConfig.hours.days} · {siteConfig.hours.display}
                </p>
                <HoursBadge className="mt-2" />
              </div>
            </div>

            <div className="flex gap-3">
              <Car className="mt-0.5 size-4 shrink-0 text-saffron" aria-hidden />
              <div>
                <p className="text-[13px] font-medium text-parchment/90">Parking</p>
                <p className="mt-0.5 text-[13px] text-parchment/55">
                  On-site parking at Confident House. Confirm valet availability with the restaurant
                  on the day.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Train className="mt-0.5 size-4 shrink-0 text-saffron" aria-hidden />
              <div>
                <p className="text-[13px] font-medium text-parchment/90">Getting here</p>
                <p className="mt-0.5 text-[13px] text-parchment/55">
                  A short auto ride from Thrissur Railway Station and the KSRTC bus stand.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-2.5">
            <Link href="/visit" className="btn btn-primary">
              <Navigation className="size-4" aria-hidden />
              Location &amp; Parking Guide
            </Link>
            <a href={`tel:${siteConfig.phone.tel}`} className="btn btn-ghost">
              <Phone className="size-4" aria-hidden />
              {siteConfig.phone.display}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="min-h-72">
          <div className="h-full overflow-hidden rounded-2xl border border-parchment/12 bg-charcoal">
            <iframe
              title="Map showing Calicut Paradise on Ikkanda Warrior Road, Thrissur"
              src={siteConfig.links.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full min-h-72 border-0 grayscale-[0.35] contrast-[1.05]"
            />
          </div>
          <p className="mt-3 text-[11px] text-parchment/55">
            Map loads from Google when scrolled into view.{" "}
            <a
              href={siteConfig.links.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-parchment/25 underline-offset-2 hover:text-saffron"
            >
              Open in Maps
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
