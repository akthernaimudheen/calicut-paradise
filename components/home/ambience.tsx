import Link from "next/link";
import { ArrowRight, Clock, MapPin, Users } from "lucide-react";
import { ImagePlate } from "@/components/ui/image-plate";
import { Reveal } from "@/components/ui/reveal";
import { HoursBadge } from "@/components/hours-badge";
import { siteConfig } from "@/lib/site";

export function Ambience() {
  return (
    <section id="ambience" className="relative overflow-hidden bg-clove py-16 sm:py-24 lg:py-32 text-parchment">
      <div className="shell">
        {/* Primary Showcase: Asymmetric Editorial Layout */}
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-14">
          {/* Large Interior Photograph (60–70% content width on desktop) */}
          <Reveal className="w-full">
            <div className="group relative overflow-hidden rounded-2xl border border-parchment/12 bg-charcoal shadow-2xl">
              <ImagePlate
                src="/images/ambience/dining-interior.jpg"
                alt="Interior dining area at Calicut Paradise featuring warm pendant lighting, rattan ceiling details and restaurant seating."
                className="aspect-4/3 w-full sm:aspect-16/11 lg:aspect-16/11"
                imageClassName="object-cover object-[center_35%] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 65vw"
                priority
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
            </div>
          </Reveal>

          {/* Editorial Content Column */}
          <div className="flex flex-col justify-center">
            <Reveal delay={0.06}>
              <span className="eyebrow !text-saffron">Atmosphere & Hospitality</span>
              <h2 className="display-lg mt-4 font-heading text-parchment">
                An Atmosphere Worth Savouring
              </h2>
              <p className="lede mt-5 text-[15px] leading-relaxed text-parchment/80">
                Step into a thoughtfully designed dining space where warm textures and welcoming
                hospitality set the mood for every meal.
              </p>

              <div className="mt-7 space-y-4 border-l-2 border-saffron/40 pl-5 text-sm leading-relaxed text-parchment/70">
                <p>
                  From the artisanal rattan ceiling and ambient globe pendants to plush booth seating,
                  the dining room is shaped for unhurried lunches, family gatherings, and late-evening
                  feasts in air-conditioned comfort.
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-parchment/60">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="size-3.5 text-saffron" aria-hidden />
                    Family & group tables
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5 text-saffron" aria-hidden />
                    Kitchen open until {siteConfig.hours.display.split("–")[1]?.trim()}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-saffron" aria-hidden />
                    On-site parking at Confident House
                  </span>
                </div>
              </div>

              <HoursBadge className="mt-8" />

              <div className="mt-7">
                <Link
                  href="/ambience"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-saffron hover:text-saffron-soft transition-colors"
                >
                  <span>Explore dining spaces &amp; seating details</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Secondary Exterior & Outdoor Setting */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-20">
          <Reveal delay={0.1}>
            <div className="group overflow-hidden rounded-xl border border-parchment/10 bg-charcoal/40 transition-colors hover:border-saffron/30">
              <ImagePlate
                src="/images/restaurant/calicut-paradise-dining-experience.jpg"
                alt="The dining feast experience at Calicut Paradise"
                className="aspect-16/10 w-full"
                imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="px-5 py-3.5">
                <p className="text-sm font-medium text-parchment/90">The Malabar Feast Experience</p>
                <p className="mt-0.5 text-xs text-parchment/55">
                  Generous spreads made for group feasts and celebratory family dinners.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="group overflow-hidden rounded-xl border border-parchment/10 bg-charcoal/40 transition-colors hover:border-saffron/30">
              <ImagePlate
                src="/images/restaurant/calicut-paradise-exterior.jpg"
                alt="Calicut Paradise restaurant exterior at Confident House, Thrissur"
                className="aspect-16/10 w-full"
                imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="px-5 py-3.5">
                <p className="text-sm font-medium text-parchment/90">Confident House Landmark</p>
                <p className="mt-0.5 text-xs text-parchment/55">
                  Easy access on Ikkanda Warrior Road with dedicated on-site parking.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
