import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Car, CheckCircle2, ChevronRight, Sparkles, Wind } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Ambience & Dining Spaces — Calicut Paradise Thrissur",
  description:
    "Step inside the dining room of Calicut Paradise at Confident House, Thrissur. Curved rattan ceiling, warm ambient lighting, air-conditioned family seating and on-site parking.",
  alternates: { canonical: "/ambience" },
  openGraph: {
    title: "Ambience & Dining Experience · Calicut Paradise, Thrissur",
    description:
      "A dining room shaped by artisanal rattan textures, warm globe lighting, family booths and welcoming Malabar hospitality.",
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

      <article className="pb-28 pt-24 sm:pt-28">
        <header className="shell">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-[11px] text-parchment/60">
            <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-saffron">
              <ArrowLeft className="size-3" aria-hidden />
              Home
            </Link>
            <ChevronRight className="size-3 text-parchment/20" aria-hidden />
            <span className="text-parchment/70">Ambience</span>
          </nav>

          <div className="max-w-3xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-saffron">
              Atmosphere &amp; Spaces
            </div>
            <h1 className="mt-4 font-heading text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-parchment">
              An atmosphere shaped for unhurried conversation.
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-parchment/80 font-sans">
              Dining in Malabar is never a solitary transaction. It is an unhurried social ritual.
              Our dining hall blends warm artisanal rattan woodwork, acoustic softness, and deep Malabar pine
              tones to create a welcoming refuge in the middle of Thrissur.
            </p>
          </div>

          {/* Primary High-Resolution Interior Showcase */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-parchment/15 shadow-2xl">
            <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] w-full bg-[#12221d]">
              <Image
                src="/images/ambience/dining-interior.jpg"
                alt="Main dining hall with curved rattan ceiling and warm lighting at Calicut Paradise"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1815]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 text-xs text-parchment/70">
                The main dining hall: curved rattan ceiling, amber globe lighting, and plush booth seating.
              </div>
            </div>
          </div>
        </header>

        {/* Spaces & Features Grid */}
        <div className="shell mt-16 sm:mt-24 space-y-20">
          <section className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-2xl border border-parchment/12 bg-charcoal/40 p-6 sm:p-7 space-y-4">
              <div className="grid size-11 place-items-center rounded-xl bg-saffron/15 text-saffron">
                <Sparkles className="size-5" />
              </div>
              <h2 className="font-heading text-xl text-parchment">The Rattan Canopy</h2>
              <p className="text-sm leading-relaxed text-parchment/75">
                Hand-woven cane patterns sweep upward to form an acoustic canopy over the central seating area.
                The natural weave softens ambient chatter, allowing intimate family conversations without dining-hall echo.
              </p>
            </div>

            <div className="rounded-2xl border border-parchment/12 bg-charcoal/40 p-6 sm:p-7 space-y-4">
              <div className="grid size-11 place-items-center rounded-xl bg-saffron/15 text-saffron">
                <Wind className="size-5" />
              </div>
              <h2 className="font-heading text-xl text-parchment">Air-Conditioned Comfort</h2>
              <p className="text-sm leading-relaxed text-parchment/75">
                Central climate control ensures a cool, refreshing retreat from the tropical Thrissur heat.
                Every booth and marble dining slab is designed with generous elbow room and comfortable posture.
              </p>
            </div>

            <div className="rounded-2xl border border-parchment/12 bg-charcoal/40 p-6 sm:p-7 space-y-4">
              <div className="grid size-11 place-items-center rounded-xl bg-saffron/15 text-saffron">
                <Car className="size-5" />
              </div>
              <h2 className="font-heading text-xl text-parchment">Hassle-Free On-Site Parking</h2>
              <p className="text-sm leading-relaxed text-parchment/75">
                Parking on Ikkanda Warrior Road can be challenging, but Calicut Paradise guests enjoy dedicated
                on-site parking right at Confident House. Arrive with family without circling the block.
              </p>
            </div>
          </section>

          {/* Secondary Photographic Showcase */}
          <section className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-parchment/15 shadow-xl">
              <Image
                src="/images/restaurant/calicut-paradise-exterior.jpg"
                alt="Confident House building exterior of Calicut Paradise in Thrissur"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
            </div>

            <div className="space-y-6">
              <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-saffron">
                Arrival Experience
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl text-parchment leading-tight">
                A prominent landmark on Ikkanda Warrior Road.
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-parchment/75">
                Located at Confident House in Kokkala, Veliyannur, the restaurant stands out with its warm wood-finish
                portico and floor-to-ceiling glass frontage.
              </p>
              <ul className="space-y-3 text-sm text-parchment/80">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-saffron shrink-0" />
                  <span>5 minutes from Thrissur Railway Station</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-saffron shrink-0" />
                  <span>Easy walking distance from KSRTC bus stand</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-saffron shrink-0" />
                  <span>Ground-floor step-free access for elders &amp; strollers</span>
                </li>
              </ul>

              <div className="pt-2">
                <Link href="/reserve" className="btn btn-primary inline-flex items-center gap-2">
                  <span>Reserve a table</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
