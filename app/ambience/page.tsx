import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CalendarDays, ChevronRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { CTA } from "@/components/ui/cta";

export const metadata: Metadata = {
  title: "Ambience & Dining Hall",
  description:
    "Inside Calicut Paradise at Confident House, Thrissur. Curved cane ceiling, brass globe lighting, air-conditioned family booths, and on-site parking.",
  alternates: { canonical: "/ambience" },
  openGraph: {
    title: "Ambience & Dining Experience · Calicut Paradise, Thrissur",
    description:
      "A dining room shaped by cane textures, warm globe lighting, family booths and welcoming Malabar hospitality.",
    url: `${siteConfig.url}/ambience`,
  },
};

export default function AmbiencePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Ambience", path: "/ambience" },
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
            <span className="text-paper/80 font-medium">Ambience</span>
          </nav>

          <div className="max-w-3xl">
            <span className="label text-brass">
              ATMOSPHERE &amp; SPACES
            </span>
            <h1 className="mt-3 font-display text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] text-paper">
              The dining room at Confident House.
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-paper/75 font-sans">
              Designed for family celebrations and unhurried meals in Thrissur. Curved cane ceilings, ambient globe lighting, air-conditioned booths, and welcoming coastal hospitality.
            </p>
          </div>

          {/* Primary High-Resolution Interior Showcase */}
          <div className="mt-10 overflow-hidden rounded-[2px] border border-paper/15 bg-ink-soft">
            <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] w-full">
              <Image
                src="/images/ambience/dining-interior.jpg"
                alt="Main dining hall with curved cane ceiling and warm globe pendants at Calicut Paradise"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-[center_35%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 text-xs text-paper/70">
                The main dining hall: curved cane weave ceiling, brass globe pendants, and air-conditioned booth seating.
              </div>
            </div>
          </div>
        </header>

        {/* Architectural Features */}
        <div className="shell mt-16 sm:mt-24 space-y-20 max-w-5xl">
          <section className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[2px] border border-paper/15 bg-ink-soft p-6 space-y-3">
              <span className="label text-brass">MATERIAL</span>
              <h2 className="font-display text-xl text-paper">Cane Ceiling &amp; Warm Light</h2>
              <p className="text-sm leading-relaxed text-paper/70">
                Arched natural cane weave sweeping over the central seating, paired with amber globe pendants and deep panelled walls.
              </p>
            </div>

            <div className="rounded-[2px] border border-paper/15 bg-ink-soft p-6 space-y-3">
              <span className="label text-brass">COMFORT</span>
              <h2 className="font-display text-xl text-paper">Air-Conditioned Hall</h2>
              <p className="text-sm leading-relaxed text-paper/70">
                Central climate control ensures a cool, unhurried refuge from the daytime heat. Deep booths give larger groups space to relax.
              </p>
            </div>

            <div className="rounded-[2px] border border-paper/15 bg-ink-soft p-6 space-y-3">
              <span className="label text-brass">CONVENIENCE</span>
              <h2 className="font-display text-xl text-paper">Forecourt Parking</h2>
              <p className="text-sm leading-relaxed text-paper/70">
                Dedicated parking right at Confident House on Ikkanda Warrior Road. Step straight out of your vehicle and into the restaurant.
              </p>
            </div>
          </section>

          {/* Exterior Building Showcase */}
          <section className="grid gap-10 md:grid-cols-2 items-center border-t border-paper/10 pt-12">
            <div className="relative aspect-[4/3] rounded-[2px] overflow-hidden border border-paper/15 bg-ink-soft">
              <Image
                src="/images/restaurant/calicut-paradise-exterior.jpg"
                alt="Confident House building exterior of Calicut Paradise on Ikkanda Warrior Road"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div>
              <span className="label text-brass">THE LOCATION</span>
              <h2 className="font-display text-2xl sm:text-3xl text-paper mt-2 leading-snug">
                Confident House, Ikkanda Warrior Road.
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-paper/70">
                A landmark corner building in Kokkala, Veliyannur with bold gold serif signage, teak cladding, and large glass windows.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <CTA href="/reserve" variant="primary" className="max-sm:w-full">
                  <CalendarDays className="size-4 shrink-0" aria-hidden />
                  Reserve a table
                </CTA>
                <CTA href="/visit" variant="secondary" arrow className="max-sm:w-full">
                  View map &amp; parking
                </CTA>
              </div>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
