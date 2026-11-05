import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function Ambience() {
  return (
    <section id="ambience" className="relative bg-ink-soft py-20 lg:py-28 text-paper border-t border-paper/10">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          {/* Real Dining Interior Image */}
          <Reveal className="relative aspect-[16/11] w-full overflow-hidden rounded-[2px] border border-paper/15 bg-ink">
            <Image
              src="/images/ambience/dining-interior.jpg"
              alt="Calicut Paradise air-conditioned dining hall featuring arched cane ceiling and warm globe pendants"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-[center_35%]"
            />
          </Reveal>

          {/* Architectural Room Narrative */}
          <div>
            <Reveal>
              <span className="label text-brass">THE DINING SPACES</span>
              <h2 className="display-lg mt-2 text-paper">
                Cane ceiling, brass globes, oxblood booths.
              </h2>
              <p className="lede mt-3 text-paper/75">
                A dining room shaped for families, unhurried lunches, and late-evening feasts in cool air-conditioned comfort.
              </p>

              <div className="mt-6 space-y-3 text-sm text-paper/70 leading-relaxed">
                <p>
                  Every booth at Confident House is designed to give larger tables space to linger over hot pots of dum biryani and fresh nool porotta without feeling rushed.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-paper/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-brass shrink-0" />
                    <span>Central air conditioning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-brass shrink-0" />
                    <span>Spacious family tables (4–10 guests)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-brass shrink-0" />
                    <span>On-site parking at Confident House</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-brass shrink-0" />
                    <span>Kitchen open daily until 11:15 PM</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/reserve" className="btn btn-primary">
                  <CalendarDays className="size-4" />
                  Book the family table
                </Link>
                <Link
                  href="/ambience"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-brass hover:text-brass-soft transition-colors"
                >
                  View dining gallery
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
