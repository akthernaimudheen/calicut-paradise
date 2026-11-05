"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const slides = [
  {
    id: "exterior",
    src: "/images/restaurant/calicut-paradise-exterior.jpg",
    alt: "Calicut Paradise restaurant exterior at Confident House, Ikkanda Warrior Road, Thrissur with prominent architectural entrance and warm interior lighting",
    eyebrow: "AUTHENTIC MALABAR CUISINE · THRISSUR",
    title: "The soul of Malabar, served with warmth.",
    description:
      "Discover slow-cooked dum biryanis, coastal flavours and the warmth of Malabar hospitality.",
    objectPosition: "center 32%",
  },
  {
    id: "dining-experience",
    src: "/images/restaurant/calicut-paradise-dining-experience.jpg",
    alt: "Authentic dining feast at Calicut Paradise featuring signature dishes and refreshing beverages",
    eyebrow: "AUTHENTIC MALABAR CUISINE · THRISSUR",
    title: "A table filled with coastal flavours.",
    description:
      "From sizzling coastal prawns to flaky breads and fragrant kaima rice, made for celebratory gatherings.",
    objectPosition: "center 45%",
  },
  {
    id: "interior",
    src: "/images/ambience/dining-interior.jpg",
    alt: "Interior dining room at Calicut Paradise featuring rattan arched ceiling, globe pendants and plush seating",
    eyebrow: "AUTHENTIC MALABAR CUISINE · THRISSUR",
    title: "Good food deserves a beautiful setting.",
    description:
      "Step into an air-conditioned dining room shaped by artisanal rattan textures and welcoming hospitality.",
    objectPosition: "center 38%",
  },
];

const facts = [
  {
    figure: "4.2 ★",
    label: "Google rating",
    detail: "Over 3,100+ verified diner reviews in Thrissur.",
  },
  {
    figure: "11:30 AM",
    label: "to 11:15 PM",
    detail: "Open daily for unhurried lunch, dinner and late-evening meals.",
  },
  {
    figure: "Confident House",
    label: "On-site parking",
    detail: "Ikkanda Warrior Road · Minutes from Thrissur Railway Station.",
  },
];

export function Hero({ initialSlide = 0 }: { initialSlide?: number }) {
  const [current, setCurrent] = useState(initialSlide);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Autoplay with reduced motion check
  useEffect(() => {
    if (isPaused) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  const activeSlide = slides[current] ?? slides[0];

  return (
    <>
      <section
        className="relative flex min-h-[660px] sm:min-h-[720px] lg:h-[82vh] lg:min-h-[620px] lg:max-h-[820px] items-center overflow-hidden text-parchment"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label="Calicut Paradise Showcase Carousel"
      >
        {/* Photographic Slides with 700ms smooth crossfade */}
        {slides.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-0" : "opacity-0 pointer-events-none z-0"
              }`}
              aria-hidden={!isActive}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority
                sizes="100vw"
                className="h-full w-full object-cover"
                style={{ objectPosition: slide.objectPosition }}
                quality={85}
              />
            </div>
          );
        })}

        {/* Directional Overlay — Desktop: Asymmetrical left darkening, crystal clear right side */}
        <div
          className="pointer-events-none absolute inset-0 z-10 hidden md:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(12,24,21,0.92) 0%, rgba(12,24,21,0.80) 30%, rgba(12,24,21,0.48) 50%, rgba(12,24,21,0.12) 68%, rgba(12,24,21,0.02) 85%, rgba(12,24,21,0) 100%), linear-gradient(0deg, rgba(12,24,21,0.65) 0%, transparent 22%)",
          }}
          aria-hidden="true"
        />

        {/* Directional Overlay — Mobile: Soft vertical gradient for legible text */}
        <div
          className="pointer-events-none absolute inset-0 z-10 md:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,24,21,0.48) 0%, rgba(12,24,21,0.76) 38%, rgba(12,24,21,0.96) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Hero Text Block — Left-aligned cinematic presentation */}
        <div className="shell relative z-20 w-full pt-24 pb-14 sm:pt-28 sm:pb-16 lg:py-24">
          <div className="max-w-[580px] text-left">
            {/* Eyebrow */}
            <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-saffron">
              {activeSlide.eyebrow}
            </div>

            {/* Headline */}
            <h1 className="mt-4 sm:mt-5 font-heading text-[2.1rem] sm:text-[2.75rem] lg:text-[4rem] xl:text-[4.25rem] leading-[1.1] lg:leading-[1.05] tracking-tight text-parchment text-balance font-normal transition-opacity duration-500">
              {activeSlide.title}
            </h1>

            {/* Supporting Text */}
            <p className="mt-4 sm:mt-5 max-w-[325px] sm:max-w-[500px] text-[0.92rem] sm:text-base lg:text-lg text-parchment/85 leading-relaxed font-sans text-pretty transition-opacity duration-500">
              {activeSlide.description}
            </p>

            {/* Two CTAs only */}
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
              <Link
                href="/menu"
                className="btn btn-primary h-11 sm:h-12 w-full sm:w-auto rounded-full px-7 sm:px-8 text-[0.92rem] sm:text-[0.95rem] font-semibold shadow-[0_12px_28px_-10px_rgba(53,115,115,0.6)] transition-all hover:scale-[1.02] inline-flex items-center justify-center gap-2"
              >
                <span>Explore the menu</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/reserve"
                className="btn btn-ghost group h-11 sm:h-12 w-full sm:w-auto rounded-full border-parchment/35 bg-charcoal/40 px-7 sm:px-8 text-[0.92rem] sm:text-[0.95rem] font-semibold text-parchment backdrop-blur-md transition-all hover:border-parchment hover:bg-parchment hover:text-charcoal inline-flex items-center justify-center gap-2"
              >
                <span>Reserve a table</span>
                <CalendarDays className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* Understated Carousel Controls & Progress (Desktop/Tablet) */}
        <div className="absolute bottom-8 right-6 z-20 hidden sm:flex items-center gap-3.5 rounded-full border border-parchment/15 bg-charcoal/70 px-4 py-2 backdrop-blur-md">
          <span className="font-mono text-xs text-parchment/70 tracking-wider">
            0{current + 1} <span className="text-parchment/30">/</span> 0{slides.length}
          </span>
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Slide indicators">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={idx === current}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setCurrent(idx)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === current
                    ? "w-6 bg-saffron"
                    : "w-2 bg-parchment/30 hover:bg-parchment/60"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-1 border-l border-parchment/15 pl-2.5">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="p-1 text-parchment/70 hover:text-saffron transition-colors"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="p-1 text-parchment/70 hover:text-saffron transition-colors"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Mobile Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:hidden">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setCurrent(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === current ? "w-6 bg-saffron" : "w-1.5 bg-parchment/30"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Slim Editorial Facts Row */}
      <section
        aria-label="Restaurant verified highlights"
        className="relative z-20 border-b border-parchment/10 bg-[#0c1815]"
      >
        <div className="shell py-4 sm:py-5">
          <dl className="grid grid-cols-1 divide-y divide-parchment/10 sm:grid-cols-3 sm:divide-y-0 sm:divide-x sm:divide-parchment/10">
            {facts.map(({ figure, label, detail }, idx) => (
              <div
                key={label}
                className={`py-3 sm:py-0 ${
                  idx === 0
                    ? "sm:pr-8"
                    : idx === 1
                    ? "sm:px-8"
                    : "sm:pl-8"
                }`}
              >
                <dt className="flex items-baseline gap-2">
                  <span className="font-heading text-xl sm:text-2xl text-saffron font-medium">
                    {figure}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-parchment/90">
                    {label}
                  </span>
                </dt>
                <dd className="mt-0.5 text-xs text-parchment/70 leading-relaxed">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
