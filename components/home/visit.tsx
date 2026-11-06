import { Car, Clock, MapPin, Navigation, Phone, Train } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { HoursBadge } from "@/components/hours-badge";
import { CTA } from "@/components/ui/cta";
import { siteConfig } from "@/lib/site";

/** One info row: a fixed icon column keeps every label and line of copy on
 *  the same optical edge, and the text column may shrink instead of pushing
 *  a long address past the container. */
function VisitFact({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[1.125rem_minmax(0,1fr)] items-start gap-x-3.5">
      <Icon className="mt-0.5 size-4 shrink-0 text-brass" aria-hidden />
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-paper">{label}</p>
        <div className="mt-1 text-sm leading-relaxed text-paper/70">{children}</div>
      </div>
    </div>
  );
}

export function Visit() {
  return (
    <section id="visit" className="relative bg-ink py-20 lg:py-28 text-paper border-t border-paper/10">
      <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-stretch lg:gap-14">
        <Reveal className="flex flex-col">
          <span className="label text-brass">LOCATION &amp; ARRIVAL</span>
          <h2 className="display-lg mt-2 text-paper">Ikkanda Warrior Road, Kokkala.</h2>
          <p className="lede mt-3 max-w-lg text-paper/75">
            Confident House, on the stretch between the KSRTC stand and Veliyannur. Park at the building forecourt and step straight inside.
          </p>

          <div className="mt-9 grid gap-6">
            <VisitFact icon={MapPin} label="Address">
              <address className="not-italic break-words">
                {siteConfig.address.line1}, {siteConfig.address.line2}
                <br />
                {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.postalCode}
              </address>
            </VisitFact>

            <VisitFact icon={Clock} label="Kitchen Hours">
              <p>
                {siteConfig.hours.days} · {siteConfig.hours.display}
              </p>
              <HoursBadge className="mt-2.5" />
            </VisitFact>

            <VisitFact icon={Car} label="Parking">
              <p className="max-w-prose">
                Dedicated on-site parking at Confident House. Easy access for elders and families.
              </p>
            </VisitFact>

            <VisitFact icon={Train} label="Transit">
              <p className="max-w-prose">
                A short 5-minute auto ride from Thrissur Railway Station and the KSRTC central stand.
              </p>
            </VisitFact>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CTA href="/visit" variant="secondary" className="max-sm:w-full sm:min-w-[11rem]">
              <Navigation className="size-4 shrink-0" aria-hidden />
              Location &amp; Parking Guide
            </CTA>
            <CTA
              href={`tel:${siteConfig.phone.tel}`}
              variant="secondary"
              className="whitespace-nowrap max-sm:w-full sm:min-w-[11rem]"
            >
              <Phone className="size-4 shrink-0" aria-hidden />
              {siteConfig.phone.display}
            </CTA>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="flex flex-col">
          <div className="min-h-[340px] flex-1 overflow-hidden rounded-[2px] border border-paper/15 bg-ink-soft lg:min-h-[26rem]">
            <iframe
              title="Map showing Calicut Paradise on Ikkanda Warrior Road, Thrissur"
              src={siteConfig.links.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full min-h-[340px] border-0 grayscale-[0.25] contrast-[1.05] lg:min-h-[26rem]"
            />
          </div>
          <p className="mt-3 text-xs text-paper/60">
            Confident House, Thrissur.{" "}
            <a
              href={siteConfig.links.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass underline decoration-brass/35 underline-offset-2 transition-colors hover:text-brass-soft hover:decoration-brass-soft"
            >
              Open in Google Maps →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
