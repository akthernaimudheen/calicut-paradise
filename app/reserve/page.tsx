import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronRight, MapPin, Phone } from "lucide-react";
import { ReservationForm } from "@/components/reservation-form";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Reserve a Table — Calicut Paradise, Thrissur",
  description:
    "Send a table reservation enquiry to Calicut Paradise, Thrissur — choose date, time, and party size. Confirmed directly on WhatsApp.",
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

      <div className="shell pb-24 pt-24 sm:pt-28 bg-ink text-paper">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-paper/60">
          <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-brass">
            <ArrowLeft className="size-3" aria-hidden />
            Home
          </Link>
          <ChevronRight className="size-3 text-paper/20" aria-hidden />
          <span className="text-paper/80 font-medium">Reserve</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 items-start">
          <div>
            <span className="label text-brass">DIRECT TABLE RESERVATIONS</span>
            <h1 className="display-lg mt-2 text-paper">Book the family table.</h1>
            <p className="lede mt-3 max-w-md text-paper/75">
              Send your table reservation enquiry to the counter on WhatsApp. No booking fees, no prepayment — the restaurant confirms your seating and timing directly.
            </p>

            <dl className="mt-8 space-y-3.5 text-sm">
              <div className="flex items-center justify-between gap-4 border-b border-paper/10 pb-3">
                <dt className="text-paper/60">Kitchen Hours</dt>
                <dd className="font-medium text-paper">
                  {siteConfig.hours.days} · {siteConfig.hours.display}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-paper/10 pb-3">
                <dt className="text-paper/60">Seating</dt>
                <dd className="font-medium text-paper">Air-conditioned indoor &amp; family booths</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-paper/10 pb-3">
                <dt className="text-paper/60">Location</dt>
                <dd className="font-medium text-paper">
                  Confident House, Ikkanda Warrior Rd
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-paper/60">Telephone</dt>
                <dd>
                  <a
                    href={`tel:${siteConfig.phone.tel}`}
                    className="inline-flex items-center gap-1.5 font-medium text-paper hover:text-brass transition-colors"
                  >
                    <Phone className="size-3.5 text-brass" aria-hidden />
                    {siteConfig.phone.display}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-8 rounded-[2px] border border-paper/10 bg-ink-soft p-4 text-xs text-paper/65">
              <p className="flex items-center gap-2 text-paper font-medium">
                <MapPin className="size-3.5 text-brass" /> Need directions or parking details?
              </p>
              <p className="mt-1">
                View our location, landmarks, and parking guide on the{" "}
                <Link href="/visit" className="text-brass underline underline-offset-2 hover:text-brass-soft">
                  Visit page →
                </Link>
              </p>
            </div>
          </div>

          <div className="rounded-[2px] border border-paper/15 bg-ink-soft p-6 sm:p-8">
            <ReservationForm />
          </div>
        </div>
      </div>
    </>
  );
}
