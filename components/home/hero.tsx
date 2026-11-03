import Link from "next/link";
import { ArrowRight, Car, Clock, Flame, MessageCircle, Star } from "lucide-react";
import { ImagePlate } from "@/components/ui/image-plate";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <ImagePlate
          src="/images/hero/hero-biryani-dum.jpg"
          alt="Slow-cooked Malabar mutton dum biryani served in a copper handi"
          className="size-full"
          imageClassName="object-cover object-center"
          sizes="100vw"
          priority
          quality={82}
          placeholder={false}
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,#161210_6%,rgba(22,18,16,0.92)_38%,rgba(22,18,16,0.55)_70%,rgba(22,18,16,0.35)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/80" />
      </div>

      <div className="shell flex min-h-[88svh] flex-col justify-end pb-10 pt-28 sm:min-h-[92svh] sm:pb-14 sm:pt-32 lg:justify-center lg:pb-24">
        <div className="max-w-3xl">
          <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-full border border-parchment/15 bg-charcoal/40 px-3.5 py-2 text-[11px] text-parchment/75 backdrop-blur-md sm:text-xs">
            <span className="inline-flex items-center gap-1.5 font-semibold text-saffron">
              <Star className="size-3.5 fill-saffron" aria-hidden />
              {siteConfig.rating.value}
              <span className="font-normal text-parchment/60">on {siteConfig.rating.source}</span>
            </span>
            <span className="h-3 w-px bg-parchment/20" aria-hidden />
            <span className="text-parchment/60">{siteConfig.rating.count} reviews</span>
            <span className="hidden h-3 w-px bg-parchment/20 sm:block" aria-hidden />
            <span className="hidden text-parchment/60 sm:inline">Ikkanda Warrior Road, Thrissur</span>
          </div>

          <h1 className="display-xl mt-6">
            Experience the soul of{" "}
            <span className="italic text-saffron">Malabar</span>.
          </h1>

          <p className="lede mt-5 max-w-xl text-[15px] sm:text-base">
            From aromatic dum biryanis to charcoal-grilled favourites, discover a taste of Malabar
            in the heart of Thrissur — a few minutes from the railway station, with parking at the
            door.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/menu" className="btn btn-primary w-full sm:w-auto">
              Explore the menu
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href="/reserve" className="btn btn-ghost w-full sm:w-auto">
              Reserve a table
            </Link>
            <a
              href="#visit"
              className="inline-flex items-center justify-center gap-2 px-1 py-2 text-[13px] font-medium text-parchment/70 underline decoration-parchment/25 underline-offset-4 transition-colors hover:text-saffron hover:decoration-saffron/50 sm:ml-2"
            >
              <MessageCircle className="size-4" aria-hidden />
              Or just drop in tonight
            </a>
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-1 gap-px overflow-hidden rounded-xl border border-parchment/10 bg-parchment/10 sm:grid-cols-3">
            {[
              { icon: Clock, label: "Open daily", value: siteConfig.hours.display },
              { icon: Car, label: "Parking", value: "On-site, Confident House" },
              { icon: Flame, label: "Known for", value: "Dum biryani & grills" },
            ].map((fact) => (
              <div key={fact.label} className="bg-charcoal/85 px-4 py-3.5 backdrop-blur-sm">
                <dt className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-parchment/60">
                  <fact.icon className="size-3.5 text-saffron/80" aria-hidden />
                  {fact.label}
                </dt>
                <dd className="mt-1 text-[13px] font-medium text-parchment/85">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <p className="absolute bottom-4 right-5 hidden text-[10px] uppercase tracking-[0.22em] text-parchment/50 lg:block">
        Concept imagery · placeholder
      </p>
    </section>
  );
}
