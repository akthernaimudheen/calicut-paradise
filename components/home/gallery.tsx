import { ImagePlate } from "@/components/ui/image-plate";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { galleryItems } from "@/lib/menu";

/** Explicit bento spans: they tile a 4-column grid without holes. */
const spanClass = [
  "col-span-2 row-span-2",
  "col-span-2",
  "",
  "",
  "col-span-2",
  "col-span-2",
] as const;

export function Gallery() {
  return (
    <section id="gallery" className="relative bg-charcoal py-16 sm:py-20 lg:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="From the kitchen"
            title="What lands on the table."
            copy="Dum biryanis, fresh coastal seafood, flaky breads and late-night charcoal grills, crafted to share."
          />
        </div>

        <div className="mt-10 grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] sm:grid-cols-4 lg:auto-rows-[12.5rem]">
          {galleryItems.map((item, index) => (
            <Reveal
              key={item.src}
              delay={index * 0.04}
              className={`group relative overflow-hidden rounded-xl ${spanClass[index] ?? ""}`}
            >
              <ImagePlate
                src={item.src}
                alt={item.alt}
                className="size-full"
                imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/85 via-transparent to-transparent" />
              <p className="pointer-events-none absolute bottom-3 left-3 right-3 text-[11px] font-medium uppercase tracking-[0.14em] text-parchment/80">
                {item.caption}
              </p>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-[11px] leading-relaxed text-parchment/55">
          Authentic dishes and dining atmosphere at Calicut Paradise, Confident House, Thrissur.
        </p>
      </div>
    </section>
  );
}
