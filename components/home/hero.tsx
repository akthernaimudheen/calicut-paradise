import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, Clock, MapPin, Star } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-ink min-h-[600px] lg:h-[82svh] lg:max-h-[820px]">
      {/* Background Image: Authentic Calicut Paradise Interior */}
      <div className="absolute inset-0">
        <Image
          src="/images/restaurant/calicut-paradise-dining-experience.jpg"
          alt="Dum biryani, charcoal grills and a lime cooler on a laid table at Calicut Paradise, Thrissur"
          fill
          priority
          quality={82}
          sizes="100vw"
          className="object-cover object-[center_42%]"
        />
        {/* Directional Vignette Overlay — preserves warm room light on right, provides contrast for typography on left */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(20,16,14,0.92) 0%, rgba(20,16,14,0.72) 42%, rgba(20,16,14,0.25) 75%, rgba(20,16,14,0.4) 100%), linear-gradient(to top, rgba(20,16,14,0.95) 0%, transparent 28%)",
          }}
        />
        {/* Mobile scrim — the cropped frame puts bright food behind the copy */}
        <div
          className="absolute inset-0 pointer-events-none sm:hidden"
          style={{
            background:
              "linear-gradient(to top, rgba(20,16,14,0.94) 0%, rgba(20,16,14,0.82) 42%, rgba(20,16,14,0.55) 68%, rgba(20,16,14,0.3) 100%)",
          }}
        />
      </div>

      <div className="shell relative z-10 flex h-full flex-col justify-between pb-8 pt-24 sm:pt-28 lg:pb-10">
        <div className="my-auto max-w-2xl pt-6">
          <p className="label text-balance text-brass">
            CONFIDENT HOUSE · IKKANDA WARRIOR ROAD, THRISSUR
          </p>

          <h1 className="mt-3 font-display text-[clamp(2.4rem,1.8rem+3.2vw,4.6rem)] leading-[1.04] text-paper">
            The dining room at Confident House.
          </h1>

          <p className="mt-4 max-w-xl text-[15px] sm:text-[17px] leading-relaxed text-paper/80">
            Slow-cooked kaima rice dum biryanis, sizzling coastal seafood, flaky nool porotta, and hot spiced Sulaimani in the heart of Thrissur.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/menu" className="btn btn-primary max-sm:w-full">
              Explore the menu
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/reserve" className="btn btn-ghost max-sm:w-full">
              <CalendarDays className="size-4" />
              Reserve a table
            </Link>
          </div>
        </div>

        {/* Hairline Fact Strip */}
        <div className="border-t border-paper/15 pt-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 text-paper/75 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <Star className="size-4 text-brass shrink-0 fill-brass/30" />
              <span>
                <strong className="text-paper font-semibold">4.2</strong> · 3,100+ Google diner reviews
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="size-4 text-brass shrink-0" />
              <span>
                <strong className="text-paper font-semibold">11:30 AM – 11:15 PM</strong> · Open daily
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="size-4 text-brass shrink-0" />
              <span>
                <strong className="text-paper font-semibold">Confident House</strong> · Easy on-site parking
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
