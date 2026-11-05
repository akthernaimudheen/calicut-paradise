import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ChevronRight, Sparkles, Utensils } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Our Story & Heritage — The Malabar Kitchen",
  description:
    "The culinary heritage of Calicut Paradise in Thrissur. Slow firewood dum cooking, aromatic Kaima rice, and spice-route traditions on Ikkanda Warrior Road.",
  alternates: { canonical: "/story" },
  openGraph: {
    title: "Our Story & Heritage · Calicut Paradise, Thrissur",
    description:
      "From the historic spice coast of Malabar to Ikkanda Warrior Road: slow dum biryani, Kaima rice, and generational recipes.",
    url: `${siteConfig.url}/story`,
  },
};

export default function StoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Our Story", path: "/story" },
            ]),
          ),
        }}
      />

      <article className="pb-28 pt-24 sm:pt-28">
        {/* Editorial Hero Section */}
        <header className="shell">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-[11px] text-parchment/60">
            <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-saffron">
              <ArrowLeft className="size-3" aria-hidden />
              Home
            </Link>
            <ChevronRight className="size-3 text-parchment/20" aria-hidden />
            <span className="text-parchment/70">Our story</span>
          </nav>

          <div className="max-w-3xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-saffron">
              Heritage &amp; Kitchen Philosophy
            </div>
            <h1 className="mt-4 font-heading text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-parchment">
              The soul of Malabar, simmered on an unhurried flame.
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-parchment/80 font-sans">
              Calicut Paradise was founded on a simple conviction: the cooking of the Malabar coast is
              not fast food. It is an art born of monsoon rains, Arab sea traders, indigenous spice gardens,
              and generations of coastal kitchen wisdom.
            </p>
          </div>

          {/* Full-width editorial image */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-parchment/15 shadow-2xl">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-[#12221d]">
              <Image
                src="/images/restaurant/calicut-paradise-dining-experience.jpg"
                alt="A lavish Malabar feast spread at Calicut Paradise"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1815]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 text-xs text-parchment/70">
                A table spread at Calicut Paradise — fragrant dum biryani, flaky porottas, and coastal preparations.
              </div>
            </div>
          </div>
        </header>

        {/* Narrative Chapters */}
        <div className="shell mt-16 sm:mt-24 space-y-20 sm:space-y-28">
          {/* Chapter 1: The Craft of Dum */}
          <section className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-saffron">
                Chapter I
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl text-parchment leading-tight">
                Why Dum Cooking Cannot Be Rushed
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-parchment/75">
                In a world of microwave reheating and commercial pressure cookers, our kitchen adheres
                to traditional <strong className="text-parchment font-medium">Dum Pukht</strong> principles.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-parchment/75">
                The heavy degh (pot) is sealed with a ribbon of dough, trapping every drop of steam and
                essential oil inside. Live charcoal embers sit beneath and atop the lid. Heat permeates
                slowly, allowing tender mutton and marinated chicken to cook entirely in their own juices
                without burning.
              </p>
              <blockquote className="border-l-2 border-saffron/60 pl-4 my-4 font-heading italic text-base sm:text-lg text-saffron-soft">
                &ldquo;When the dough seal breaks at the counter, the entire dining room fills with the aroma of green cardamom and fried shallots.&rdquo;
              </blockquote>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-parchment/12 bg-charcoal/40 p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-full bg-saffron/15 text-saffron">
                    <Sparkles className="size-5" />
                  </div>
                  <h3 className="font-heading text-xl text-parchment">The Kaima Rice Difference</h3>
                </div>
                <p className="text-sm leading-relaxed text-parchment/75">
                  Unlike commercial Northern biryanis that rely on extra-long basmati, authentic
                  Kozhikodan biryani requires <strong className="text-parchment">Jeerakasala (Kaima) rice</strong>.
                  Sourced from the fertile valleys of Wayanad, this indigenous short grain possesses
                  delicate floral notes and a soft, yielding bite that holds curry sauces without clumping.
                </p>
                <div className="grid grid-cols-2 gap-4 border-t border-parchment/10 pt-4 text-xs">
                  <div>
                    <span className="block font-semibold text-saffron">Pure Ghee Tempering</span>
                    <span className="text-parchment/60">Shallots golden-fried in pure cow ghee.</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-saffron">Wayanad Spices</span>
                    <span className="text-parchment/60">Hand-crushed black peppercorns and cloves.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Chapter 2: The Malabar Coastline to Thrissur */}
          <section className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-parchment/15 shadow-xl">
                <Image
                  src="/images/ambience/dining-interior.jpg"
                  alt="Atmospheric dining room with curved rattan arches at Calicut Paradise"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 space-y-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-saffron">
                Chapter II
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl text-parchment leading-tight">
                Bringing Kozhikode to Ikkanda Warrior Road
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-parchment/75">
                For years, lovers of authentic Kozhikodan cuisine in Thrissur had to travel hours up the
                coastal highway to experience genuine Malabar flavours.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-parchment/75">
                We chose <strong className="text-parchment">Confident House</strong> because it offered
                what modern diners desperately need: quiet, air-conditioned comfort, generous family booths,
                and rare on-site parking in central Thrissur.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-parchment/75">
                Whether you come for an unhurried Sunday family lunch, an evening feast of Pepper Chicken
                with hot Nool Porotta, or a quiet cup of spiced Sulaimani, you are welcomed with the hospitality
                that Malabar has extended to guests for centuries.
              </p>
            </div>
          </section>

          {/* Call to Experience */}
          <section className="rounded-2xl border border-saffron/30 bg-gradient-to-br from-[#12241f] to-charcoal p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-2xl">
            <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-saffron">
              Experience It Firsthand
            </span>
            <h2 className="mt-3 font-heading text-2xl sm:text-3xl text-parchment">
              Pull up a chair at our table.
            </h2>
            <p className="mt-3 text-sm text-parchment/70 max-w-xl mx-auto">
              Browse our complete selection of dum biryanis, fresh tawa breads and coastal curries, or reserve your table in advance.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/menu" className="btn btn-primary inline-flex items-center gap-2">
                <Utensils className="size-4" />
                <span>Explore the menu</span>
              </Link>
              <Link href="/reserve" className="btn btn-ghost inline-flex items-center gap-2 border-parchment/30">
                <span>Reserve a table</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
