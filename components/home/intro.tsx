import { Car, CupSoda, Flame, Wheat } from "lucide-react";
import { ImagePlate } from "@/components/ui/image-plate";
import { Reveal } from "@/components/ui/reveal";
import { featureCards } from "@/lib/site";

const icons = { flame: Flame, car: Car, wheat: Wheat, cup: CupSoda } as const;

export function Intro() {
  return (
    <section id="about" className="relative bg-parchment py-16 sm:py-20 lg:py-28">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <span className="eyebrow">The restaurant</span>
            <h2 className="display-lg display-on-light mt-4 text-balance">
              A Malabar kitchen on Ikkanda Warrior Road.
            </h2>
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-charcoal/70">
              <p>
                Calicut Paradise brings the cooking of north Kerala into the middle of Thrissur —
                dum biryanis sealed and finished slowly, fish and mussels from the coast, breads
                stretched to order, and a pot of Sulaimani to close.
              </p>
              <p>
                It is a family restaurant in the everyday sense: air-conditioned indoor seating,
                outdoor tables for the evening, and parking at Confident House so a dinner plan does
                not start with a hunt for a spot.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t border-charcoal/10 pt-6 text-sm">
              <div>
                <p className="font-display text-2xl text-charcoal">8</p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-charcoal/60">
                  Menu categories
                </p>
              </div>
              <div>
                <p className="font-display text-2xl text-charcoal">11:15 PM</p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-charcoal/60">
                  Last orders, daily
                </p>
              </div>
              <div>
                <p className="font-display text-2xl text-charcoal">On-site</p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-charcoal/60">Parking</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <ImagePlate
              src="/images/ambience/dining-hall.jpg"
              alt="The dining room at Calicut Paradise, Thrissur"
              className="aspect-4/5 w-full rounded-2xl sm:aspect-3/4 lg:aspect-4/5"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="absolute -bottom-5 left-4 right-4 rounded-xl border border-charcoal/10 bg-parchment/95 px-5 py-4 shadow-[0_20px_50px_-30px_rgba(22,18,16,0.5)] backdrop-blur sm:left-8 sm:right-auto sm:max-w-xs">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-terracotta">
                Good to know
              </p>
              <p className="mt-1.5 text-[13px] leading-snug text-charcoal/75">
                AC indoor and outdoor seating, minutes from Thrissur Railway Station and the KSRTC
                stand.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-3 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {featureCards.map((feature, index) => {
            const Icon = icons[feature.icon];
            return (
              <Reveal
                key={feature.title}
                delay={index * 0.06}
                className="group rounded-xl border border-charcoal/10 bg-white/45 p-5 transition-colors hover:border-terracotta/35 hover:bg-white/70"
              >
                <span className="grid size-10 place-items-center rounded-lg bg-terracotta/10 text-terracotta">
                  <Icon className="size-[18px]" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg leading-snug text-charcoal">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-charcoal/60">{feature.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
