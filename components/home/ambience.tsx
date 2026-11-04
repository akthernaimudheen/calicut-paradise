import { AirVent, Car, Clock, Users, Utensils } from "lucide-react";
import { ImagePlate } from "@/components/ui/image-plate";
import { Reveal } from "@/components/ui/reveal";
import { HoursBadge } from "@/components/hours-badge";
import { siteConfig } from "@/lib/site";

const amenities = [
  { icon: AirVent, label: "AC indoor seating", detail: "Cool room for lunch and dinner" },
  { icon: Utensils, label: "Outdoor seating", detail: "Open-air tables in the evening" },
  { icon: Users, label: "Family dining", detail: "Tables sized for groups" },
  { icon: Car, label: "Parking on site", detail: "At Confident House" },
  { icon: Clock, label: "Late kitchen", detail: `Serving until ${siteConfig.hours.display.split("–")[1]?.trim()}` },
];

export function Ambience() {
  return (
    <section id="ambience" className="relative overflow-hidden bg-clove py-16 sm:py-20 lg:py-28">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <Reveal>
            <ImagePlate
              src="/images/ambience/outdoor-seating.jpg"
              alt="Outdoor seating area at Calicut Paradise"
              className="aspect-16/10 w-full rounded-2xl"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </Reveal>
          <div className="flex flex-col gap-6">
            <Reveal delay={0.06}>
              <span className="eyebrow">The room</span>
              <h2 className="display-lg mt-4">Come as a family. Stay past eleven.</h2>
              <p className="lede mt-4 text-[14px]">
                Dinner in Thrissur rarely ends early, and the kitchen here runs to {siteConfig.hours.display.split("–")[1]?.trim()}.
                Cool indoor seating, open-air tables and parking that does not require a second plan.
              </p>
              <HoursBadge className="mt-5" />
            </Reveal>
            <Reveal delay={0.12} className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {amenities.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-lg border border-parchment/8 bg-charcoal/40 px-3.5 py-2.5"
                >
                  <item.icon className="size-4 shrink-0 text-gold/80" aria-hidden />
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-medium text-parchment/85">{item.label}</p>
                    <p className="text-[11px] text-parchment/60">{item.detail}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Reveal>
            <ImagePlate
              src="/images/ambience/entrance.jpg"
              alt="The entrance at Confident House, Ikkanda Warrior Road"
              className="aspect-4/3 w-full rounded-2xl sm:aspect-16/10"
              sizes="(max-width: 640px) 100vw, 45vw"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <ImagePlate
              src="/images/restaurant/exterior-confident-house.jpg"
              alt="Calicut Paradise at Confident House, Thrissur"
              className="aspect-4/3 w-full rounded-2xl sm:aspect-16/10"
              sizes="(max-width: 640px) 100vw, 45vw"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
