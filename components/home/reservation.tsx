import { Phone } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { ReservationForm } from "@/components/reservation-form";
import { siteConfig } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

export function Reservation() {
  return (
    <section id="reserve" className="relative overflow-hidden bg-charcoal py-16 sm:py-20 lg:py-28">
      <div
        className="pointer-events-none absolute right-0 top-0 size-[24rem] rounded-full bg-terracotta/10 blur-3xl"
        aria-hidden
      />
      <div className="shell relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <Reveal>
          <span className="eyebrow">Reservations</span>
          <h2 className="display-lg mt-4">Book the family table.</h2>
          <p className="lede mt-4 max-w-md text-[14px]">
            Send the details on WhatsApp and the counter will confirm availability, seating and
            timing. For same-day plans and large groups, a call is usually faster.
          </p>

          <dl className="mt-7 space-y-3 text-[13px]">
            <div className="flex items-center justify-between gap-4 border-b border-parchment/10 pb-3">
              <dt className="text-parchment/60">Hours</dt>
              <dd className="text-parchment/80">
                {siteConfig.hours.days} · {siteConfig.hours.display}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-parchment/10 pb-3">
              <dt className="text-parchment/60">Seating</dt>
              <dd className="text-parchment/80">AC indoor & outdoor</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-parchment/10 pb-3">
              <dt className="text-parchment/60">Parking</dt>
              <dd className="text-parchment/80">On site</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-parchment/60">Phone</dt>
              <dd>
                <a
                  href={`tel:${siteConfig.phone.tel}`}
                  className="inline-flex items-center gap-1.5 text-parchment/80 transition-colors hover:text-saffron"
                >
                  <Phone className="size-3.5" aria-hidden />
                  {siteConfig.phone.display}
                </a>
              </dd>
            </div>
          </dl>

          <a
            href={whatsappUrl(
              siteConfig.phone.whatsapp,
              "Hello Calicut Paradise! I'd like to ask about table availability.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex text-[12px] text-parchment/60 underline decoration-parchment/20 underline-offset-4 transition-colors hover:text-saffron"
          >
            Prefer to just message? Open WhatsApp
          </a>
        </Reveal>

        <Reveal delay={0.08} className="rounded-2xl border border-parchment/12 bg-clove/50 p-5 sm:p-7">
          <ReservationForm />
        </Reveal>
      </div>
    </section>
  );
}
