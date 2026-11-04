import { ImagePlate } from "@/components/ui/image-plate";
import { Reveal } from "@/components/ui/reveal";

export function Story() {
  return (
    <section id="story" className="relative overflow-hidden bg-clove py-16 sm:py-20 lg:py-28">
      <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <span className="eyebrow">The Malabar story</span>
          <h2 className="display-lg mt-4">
            Spice is a structure here,
            <br className="hidden sm:block" /> not a dare.
          </h2>
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-parchment/65">
            <p>
              Malabar cooking grew out of a long stretch of coast that traded with the Arabian Sea
              long before it traded with the rest of India. The result is a kitchen that layers
              aroma before heat: rice toasted in ghee, meat sealed with roasted coconut, breads
              stretched until they separate into threads.
            </p>
            <p>
              A proper Kozhikodan biryani is quiet food. Kaima rice, a masala that stops short of
              fiery, and enough time under the seal for everything to settle. It is served with
              raita, pickle and a date or two — nothing that needs to shout.
            </p>
            <p>
              Three things do most of the work. Tellicherry pepper, used whole, cracked and ground.
              Coconut — fresh, roasted or pressed into milk — which cools the heat and gives the
              curries their body. And sourness from tamarind and raw mango rather than vinegar, the
              coastal signature you taste in a fish curry.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <div className="relative">
            <ImagePlate
              src="/images/hero/hero-biryani-detail.jpg"
              alt="Close detail of a sealed Malabar dum biryani"
              className="aspect-3/4 w-full rounded-2xl"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
