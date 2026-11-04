import { ArrowUpRight, MessageSquareQuote, Star } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { reviewThemes, siteConfig } from "@/lib/site";

export function Reviews() {
  return (
    <section id="reviews" className="relative bg-parchment py-16 sm:py-20 lg:py-28">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <Reveal>
            <SectionHeading
              eyebrow="Word of mouth"
              tone="light"
              title="What guests keep mentioning."
              copy="Three things come up again and again in what diners write — the biryani, the grills, and how easy an evening here is. The rest, including the complaints, is on Google."
            />
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={siteConfig.links.googleReviews}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark"
              >
                Read reviews on Google
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
              <a
                href={siteConfig.links.swiggy}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark"
              >
                Swiggy listing
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </div>
          </Reveal>

          <div className="space-y-3">
            <Reveal className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-charcoal/12 bg-white/60 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="font-display text-4xl text-charcoal">{siteConfig.rating.value}</span>
                <div>
                  <div className="flex gap-0.5" aria-hidden>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`size-3.5 ${
                          index < 4 ? "fill-gold text-gold" : "fill-charcoal/15 text-charcoal/15"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-[11px] text-charcoal/65">
                    {siteConfig.rating.source} · {siteConfig.rating.count} reviews
                  </p>
                </div>
              </div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-charcoal/70">
                Google · November 2026
              </p>
            </Reveal>

            {reviewThemes.map((review, index) => (
              <Reveal
                key={review.theme}
                delay={0.05 * index}
                className="rounded-xl border border-charcoal/12 bg-white/45 p-5"
              >
                <div className="flex items-start gap-3">
                  <MessageSquareQuote className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden />
                  <div>
                    <h3 className="font-display text-base text-charcoal">{review.theme}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-charcoal/65">
                      {review.summary}
                    </p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-charcoal/70">
                      {review.mentions}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
