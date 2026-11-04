import { MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";

/**
 * The two things the hero CTAs do not carry: dialling the counter and opening
 * Maps. Deliberately thin — a second strip of glossy buttons under a hero that
 * already offers three actions reads as filler.
 */
export function QuickActions() {
  const item =
    "inline-flex min-h-8 items-center gap-2 text-parchment/85 transition-colors hover:text-gold";

  return (
    <section aria-label="Contact and directions" className="border-b border-parchment/10 bg-clove/40">
      <div className="shell flex flex-wrap items-center gap-x-7 gap-y-1 py-3 text-[13px]">
        <a href={`tel:${siteConfig.phone.tel}`} className={item}>
          <Phone className="size-3.5 text-gold" aria-hidden />
          <span className="font-medium">{siteConfig.phone.display}</span>
          <span className="text-parchment/60">Call the counter</span>
        </a>
        <a
          href={siteConfig.links.directions}
          target="_blank"
          rel="noopener noreferrer"
          className={item}
        >
          <MapPin className="size-3.5 text-gold" aria-hidden />
          <span className="font-medium">Directions</span>
          <span className="text-parchment/60">Ikkanda Warrior Rd</span>
        </a>
      </div>
    </section>
  );
}
