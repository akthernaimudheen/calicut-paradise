import Link from "next/link";
import { Car, Clock, MapPin, Navigation, Phone, Train } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { HoursBadge } from "@/components/hours-badge";
import { siteConfig } from "@/lib/site";

export function Visit() {
  return (
    <section id="visit" className="relative bg-ink py-20 lg:py-28 text-paper border-t border-paper/10">
      <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-14 items-center">
        <Reveal>
          <span className="label text-brass">LOCATION &amp; ARRIVAL</span>
          <h2 className="display-lg mt-2 text-paper">Ikkanda Warrior Road, Kokkala.</h2>
          <p className="lede mt-3 max-w-md text-paper/75">
            Confident House, on the stretch between the KSRTC stand and Veliyannur. Park at the building forecourt and step straight inside.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-3.5">
              <MapPin className="mt-1 size-4 shrink-0 text-brass" aria-hidden />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-paper">Address</p>
                <address className="mt-0.5 text-sm not-italic leading-relaxed text-paper/70">
                  {siteConfig.address.line1}, {siteConfig.address.line2}
                  <br />
                  {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.postalCode}
                </address>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Clock className="mt-1 size-4 shrink-0 text-brass" aria-hidden />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-paper">Kitchen Hours</p>
                <p className="mt-0.5 text-sm text-paper/70">
                  {siteConfig.hours.days} · {siteConfig.hours.display}
                </p>
                <HoursBadge className="mt-2" />
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Car className="mt-1 size-4 shrink-0 text-brass" aria-hidden />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-paper">Parking</p>
                <p className="mt-0.5 text-sm text-paper/70">
                  Dedicated on-site parking at Confident House. Easy access for elders and families.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Train className="mt-1 size-4 shrink-0 text-brass" aria-hidden />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-paper">Transit</p>
                <p className="mt-0.5 text-sm text-paper/70">
                  A short 5-minute auto ride from Thrissur Railway Station and the KSRTC central stand.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
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

        <Reveal delay={0.06} className="h-full min-h-[320px]">
          <div className="h-full min-h-[320px] overflow-hidden rounded-[2px] border border-paper/15 bg-ink-soft">
            <iframe
              title="Map showing Calicut Paradise on Ikkanda Warrior Road, Thrissur"
              src={siteConfig.links.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full min-h-[320px] border-0 grayscale-[0.25] contrast-[1.05]"
            />
          </div>
          <p className="mt-3 text-xs text-paper/60">
            Confident House, Thrissur.{" "}
            <a
              href={siteConfig.links.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-paper/30 underline-offset-2 hover:text-brass text-brass"
            >
              Open in Google Maps →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
