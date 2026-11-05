import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImagePlate } from "@/components/ui/image-plate";
import { Reveal } from "@/components/ui/reveal";

const notes = [
  {
    title: "Pepper",
    body: "Tellicherry pepper is the backbone — used whole, cracked and ground, in everything from kurumulagu to a simple fry.",
  },
  {
    title: "Coconut",
    body: "Fresh, roasted or pressed into milk. It cools the heat and gives Malabar curries their body.",
  },
  {
    title: "Tamarind & mango",
    body: "Sourness comes from tamarind and raw mango rather than vinegar — a coastal signature in fish curries.",
  },
];

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
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {notes.map((note, index) => (
              <Reveal key={note.title} delay={0.05 * index} className="border-t border-saffron/20 pt-3">
                <dt className="font-display text-base text-parchment">{note.title}</dt>
                <dd className="mt-1.5 text-[12px] leading-relaxed text-parchment/50">{note.body}</dd>
              </Reveal>
            ))}
          </dl>

          <div className="mt-8">
            <Link
              href="/story"
              className="inline-flex items-center gap-2 text-sm font-semibold text-saffron hover:text-saffron-soft transition-colors"
            >
              <span>Discover our kitchen heritage &amp; the craft of dum</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <div className="relative">
            <ImagePlate
              src="/images/biryani/biryani-mutton-dum.jpg"
              alt="Close detail of a sealed Malabar dum biryani"
              className="aspect-3/4 w-full rounded-2xl"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <figure className="absolute -bottom-6 left-4 right-4 rounded-xl border border-saffron/20 bg-charcoal/92 p-5 backdrop-blur sm:left-6 sm:right-6">
              <blockquote className="font-display text-[15px] italic leading-relaxed text-parchment/85">
                “Rice, meat, masala, time. Everything else is decoration.”
              </blockquote>
              <figcaption className="mt-2 text-[10px] uppercase tracking-[0.2em] text-parchment/60">
                The dum principle
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
