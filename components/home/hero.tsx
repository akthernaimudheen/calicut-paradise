import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, ChevronDown, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

const facts = [
  {
    figure: "4.2 ★",
    label: "Google rating",
    detail: "Over 3,100+ verified diner reviews in Thrissur.",
  },
  {
    figure: "11:30 AM",
    label: "to 11:15 PM",
    detail: "Open daily for unhurried lunch, dinner and late evening meals.",
  },
  {
    figure: "Confident House",
    label: "on-site parking",
    detail: "Ikkanda Warrior Road — minutes from Thrissur Railway Station.",
  },
];

export function Hero() {
  return (
    <>
      <section className="relative flex min-h-[90svh] items-center justify-center overflow-hidden px-5 pb-20 pt-32 text-parchment sm:px-6 lg:min-h-[94svh] lg:px-10 lg:pt-36">
        <Image
          src="/images/hero/hero-biryani-dum.jpg"
          alt="Traditional Malabar Mutton Dum Biryani in a copper handi with steam rising"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover [object-position:50%_45%]"
          quality={82}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,13,11,0.76)_0%,rgba(16,13,11,0.66)_45%,rgba(12,9,8,0.85)_100%)]" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-parchment/20 bg-charcoal/50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-saffron-soft backdrop-blur-md sm:text-xs">
            <span>Malabar Culinary Heritage</span>
            <span className="size-1 rounded-full bg-saffron" />
            <span className="text-parchment/70">Kokkala, Thrissur</span>
          </div>

          <h1 className="mt-6 font-heading text-hero text-parchment text-balance">
            Slow-cooked dum, charcoal embers, and the unhurried soul of Malabar.
          </h1>

          <p className="mt-6 max-w-[54ch] text-lead text-parchment/90">
            Calicut Paradise brings Kozhikode’s legendary kitchen traditions to Ikkanda Warrior
            Road — fragrant kaima rice dum biryanis, fresh coastal seafood, and warm hospitality
            made for family dining.
          </p>

          <div className="mt-9 flex w-full flex-col items-center justify-center gap-3.5 sm:w-auto sm:flex-row">
            <Link
              href="/menu"
              className="btn btn-primary h-12 w-full rounded-full px-8 text-[0.95rem] font-semibold shadow-[0_16px_34px_-14px_rgba(212,163,75,0.7)] transition-all hover:scale-[1.02] sm:w-auto"
            >
              Explore the menu
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/reserve"
              className="btn btn-ghost group h-12 w-full rounded-full border-parchment/40 bg-charcoal/40 px-8 text-[0.95rem] font-semibold text-parchment backdrop-blur-md transition-all hover:border-parchment hover:bg-parchment hover:text-charcoal sm:w-auto"
            >
              Reserve a table
              <CalendarDays className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={`https://wa.me/${siteConfig.phone.whatsapp}?text=${encodeURIComponent(
                "Hello Calicut Paradise! I'm browsing your website and would like help placing an order.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-2 py-2 text-[13px] font-medium text-parchment/75 underline decoration-parchment/25 underline-offset-4 transition-colors hover:text-saffron hover:decoration-saffron/50 sm:ml-2"
            >
              <MessageCircle className="size-4 text-emerald-400" aria-hidden />
              Order on WhatsApp
            </a>
          </div>
        </div>

        <a
          href="#signatures"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-parchment/60 transition-colors hover:text-saffron motion-safe:animate-bounce"
          aria-label="Scroll to signatures"
        >
          <ChevronDown className="size-6" />
        </a>
      </section>

      <section className="relative z-20 -mt-8 px-4 sm:-mt-12 sm:px-6 lg:px-8">
        <dl className="mx-auto grid max-w-5xl gap-px overflow-hidden rounded-2xl border border-parchment/15 bg-parchment/15 shadow-2xl backdrop-blur-xl sm:grid-cols-3">
          {facts.map(({ figure, label, detail }) => (
            <div key={label} className="bg-charcoal/90 px-6 py-5.5 sm:px-7">
              <dt className="flex items-baseline gap-2">
                <span className="font-heading text-[1.95rem] leading-none text-parchment">
                  {figure}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-saffron">
                  {label}
                </span>
              </dt>
              <dd className="mt-2 text-xs leading-5 text-parchment/75">{detail}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
