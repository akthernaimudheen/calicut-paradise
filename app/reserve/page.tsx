import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Phone } from "lucide-react";
import { ReservationForm } from "@/components/reservation-form";
import { Visit } from "@/components/home/visit";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Reserve a table",
  description:
    "Send a table reservation enquiry to Calicut Paradise, Thrissur — pick a date, time, party size and AC indoor or outdoor seating. Confirmed by the restaurant on WhatsApp.",
  alternates: { canonical: "/reserve" },
  openGraph: {
    title: "Reserve a table · Calicut Paradise, Thrissur",
    description:
      "Family table for lunch or dinner on Ikkanda Warrior Road, Thrissur. Enquire on WhatsApp in under a minute.",
    url: `${siteConfig.url}/reserve`,
  },
};

export default function ReservePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Reserve", path: "/reserve" },
            ]),
          ),
        }}
      />

      <div className="shell pb-24 pt-24 sm:pt-28">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-[11px] text-parchment/60">
          <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-saffron">
            <ArrowLeft className="size-3" aria-hidden />
            Home
          </Link>
          <ChevronRight className="size-3 text-parchment/20" aria-hidden />
          <span className="text-parchment/70">Reserve</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <span className="eyebrow">Reservations</span>
            <h1 className="display-lg mt-4">Book the family table.</h1>
            <p className="lede mt-4 max-w-md text-[14px]">
              Send your details on WhatsApp and the counter will confirm seating and timing. No
              payment, no third-party booking fee — the message goes straight to the restaurant.
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
          </div>

          <div className="rounded-2xl border border-parchment/12 bg-clove/50 p-5 sm:p-7">
            <ReservationForm />
          </div>
        </div>
      </div>

      <Visit />
    </>
  );
}
