import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { CTA } from "@/components/ui/cta";

export const metadata: Metadata = {
  title: "Our Story — The Malabar Kitchen at Confident House",
  description:
    "The culinary heritage of Calicut Paradise in Thrissur. Slow dum cooking, aromatic Kaima rice, and spice-route traditions on Ikkanda Warrior Road.",
  alternates: { canonical: "/story" },
  openGraph: {
    title: "Our Story · Calicut Paradise, Thrissur",
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

      <article className="pb-28 pt-24 sm:pt-28 bg-ink text-paper">
        {/* Editorial Header */}
        <header className="shell">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-paper/60">
            <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-brass">
              <ArrowLeft className="size-3" aria-hidden />
              Home
            </Link>
            <ChevronRight className="size-3 text-paper/20" aria-hidden />
            <span className="text-paper/80 font-medium">Our story</span>
          </nav>

          <div className="max-w-3xl">
            <span className="label text-brass">
              HERITAGE &amp; KITCHEN PHILOSOPHY
            </span>
            <h1 className="mt-3 font-display text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] text-paper">
              The cooking of Malabar, simmered on an unhurried flame.
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-paper/75 font-sans">
              Calicut Paradise brings the coastal traditions of north Kerala to Ikkanda Warrior Road in Thrissur:
              aromatic Kaima rice, dough-sealed dum cooking, freshly stretched nool porotta, and hot spiced Sulaimani.
            </p>
          </div>

          {/* Full-width editorial dining plate */}
          <div className="mt-10 overflow-hidden rounded-[2px] border border-paper/15 bg-ink-soft">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full">
              <Image
                src="/images/restaurant/calicut-paradise-dining-experience.jpg"
                alt="A Malabar dining table at Calicut Paradise"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 text-xs text-paper/70">
                The dining room at Confident House — fragrant dum biryani, flaky porottas, and coastal preparations.
              </div>
            </div>
          </div>
        </header>

        {/* Narrative Essay Movements */}
        <div className="shell mt-16 sm:mt-24 space-y-20 sm:space-y-28 max-w-4xl">
          {/* Movement 1: The Dum Seal & Kaima Rice */}
          <section className="grid gap-10 md:grid-cols-2 items-start border-t border-paper/10 pt-10">
            <div>
              <span className="label text-brass">THE TECHNIQUE</span>
              <h2 className="font-display text-2xl sm:text-3xl text-paper mt-2 leading-snug">
                Sealed with dough. Finished on dum.
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-paper/70">
                A proper Kozhikodan biryani is quiet food. The heavy pot is sealed with a ribbon of dough, trapping every drop of moisture and aroma inside. Heat permeates slowly from gentle embers, letting meat and spices cook together in their own steam.
              </p>
              <blockquote className="border-l-2 border-brass pl-4 my-5 font-display italic text-base sm:text-lg text-brass-soft">
                &ldquo;When the dough seal breaks at the counter, the entire room fills with the aroma of green cardamom and ghee.&rdquo;
              </blockquote>
            </div>

            <div className="space-y-4 rounded-[2px] border border-paper/15 bg-ink-soft p-6">
              <h3 className="font-display text-xl text-paper">The Kaima Rice Difference</h3>
              <p className="text-sm leading-relaxed text-paper/70">
                Unlike Northern biryanis that use long basmati, authentic Malabar biryani is prepared with indigenous <strong className="text-paper">Jeerakasala (Kaima) rice</strong> — a delicate, short, fragrant grain that absorbs rich masala while staying light and separate.
              </p>
              <div className="grid grid-cols-2 gap-4 border-t border-paper/10 pt-4 text-xs text-paper/75">
                <div>
                  <span className="block font-semibold text-brass">Pure Ghee Tempering</span>
                  <span>Shallots fried golden in cow ghee</span>
                </div>
                <div>
                  <span className="block font-semibold text-brass">Gentle Heat</span>
                  <span>Cooked without rush on low dum</span>
                </div>
              </div>
            </div>
          </section>

          {/* Movement 2: The Coastline to Thrissur */}
          <section className="grid gap-10 md:grid-cols-2 items-start border-t border-paper/10 pt-10">
            <div className="relative aspect-[4/3] rounded-[2px] overflow-hidden border border-paper/15 bg-ink-soft">
              <Image
                src="/images/ambience/dining-interior.jpg"
                alt="Dining interior at Calicut Paradise"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div>
              <span className="label text-brass">THE GATHERING</span>
              <h2 className="font-display text-2xl sm:text-3xl text-paper mt-2 leading-snug">
                Built for family meals and unhurried evenings.
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-paper/70">
                Dining out in Thrissur should feel effortless. At Confident House on Ikkanda Warrior Road, we created a space with comfortable rattan booths, central air-conditioning, and hassle-free forecourt parking so dinner never begins with circling the block.
              </p>
              <div className="mt-6">
                <CTA href="/menu" variant="primary" arrow>
                  Explore our menu
                </CTA>
              </div>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
