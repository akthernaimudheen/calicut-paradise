import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImagePlate } from "@/components/ui/image-plate";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { QuantityControl } from "@/components/cart/quantity-control";
import { signatureDishes } from "@/lib/menu";

export function Signatures() {
  return (
    <section id="signatures" className="relative bg-charcoal py-16 sm:py-20 lg:py-28">
      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Signatures"
            title={
              <>
                Four plates that explain
                <br className="hidden sm:block" /> the whole kitchen.
              </>
            }
            copy="Add anything you like to an enquiry and it arrives at the counter already itemised."
          />
          <Reveal delay={0.1}>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-gold transition-colors hover:text-gold-soft"
            >
              Full menu
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {signatureDishes.map((dish, index) => (
            <Reveal
              key={dish.id}
              delay={index * 0.06}
              className="group flex flex-col overflow-hidden rounded-xl border border-parchment/10 bg-clove/60"
            >
              <ImagePlate
                src={dish.image}
                alt={dish.alt}
                className="aspect-4/3 w-full"
                imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="flex flex-1 flex-col p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/80">
                  {dish.kicker}
                </p>
                <h3 className="mt-1.5 font-display text-lg leading-snug text-parchment">
                  {dish.name}
                </h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-parchment/55">
                  {dish.description}
                </p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <QuantityControl dishId={dish.id} tone="quiet" />
                  <span className="text-[11px] text-parchment/55">Price on ask</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
