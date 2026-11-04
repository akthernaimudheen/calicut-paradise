"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarCheck, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";
import {
  buildReservationMessage,
  whatsappUrl,
  type ReservationEnquiryInput,
} from "@/lib/whatsapp";

const SLOTS = (() => {
  const slots: string[] = [];
  for (let minutes = 11 * 60 + 30; minutes <= 23 * 60; minutes += 30) {
    const hour24 = Math.floor(minutes / 60) % 24;
    const minute = minutes % 60;
    const suffix = hour24 >= 12 ? "PM" : "AM";
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
    slots.push(`${hour12}:${String(minute).padStart(2, "0")} ${suffix}`);
  }
  return slots;
})();

function todayIso() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

export function ReservationForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<ReservationEnquiryInput>({
    name: "",
    phone: "",
    date: "",
    time: "7:30 PM",
    guests: "4",
    seating: "no-preference",
    notes: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const dateRef = useRef<HTMLInputElement>(null);

  // Set the earliest selectable date from the visitor's own clock, after mount,
  // so the server-rendered markup never disagrees with the browser date.
  useEffect(() => {
    if (dateRef.current) dateRef.current.min = todayIso();
  }, []);

  function update<K extends keyof ReservationEnquiryInput>(
    key: K,
    value: ReservationEnquiryInput[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
    setError(null);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim()) {
      setError("Add a name so the restaurant knows who is booking.");
      return;
    }
    if (!form.date) {
      setError("Choose the date you would like to visit.");
      return;
    }
    const message = buildReservationMessage({
      ...form,
      date: new Date(`${form.date}T00:00:00`).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    });
    window.open(whatsappUrl(siteConfig.phone.whatsapp, message), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className={`grid gap-4 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}>
        <div>
          <label htmlFor="res-name" className="field-label">
            Name
          </label>
          <input
            id="res-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Your name"
            className="field"
          />
        </div>
        <div>
          <label htmlFor="res-phone" className="field-label">
            Phone <span className="normal-case tracking-normal text-parchment/55">(optional)</span>
          </label>
          <input
            id="res-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="+91"
            className="field"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="res-date" className="field-label">
            Date
          </label>
          <input
            ref={dateRef}
            id="res-date"
            name="date"
            type="date"
            required
            value={form.date}
            onChange={(event) => update("date", event.target.value)}
            className="field [color-scheme:dark]"
          />
        </div>
        <div>
          <label htmlFor="res-time" className="field-label">
            Time
          </label>
          <select
            id="res-time"
            name="time"
            value={form.time}
            onChange={(event) => update("time", event.target.value)}
            className="field appearance-none"
          >
            {SLOTS.map((slot) => (
              <option key={slot} value={slot} className="bg-charcoal text-parchment">
                {slot}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="res-guests" className="field-label">
            Guests
          </label>
          <select
            id="res-guests"
            name="guests"
            value={form.guests}
            onChange={(event) => update("guests", event.target.value)}
            className="field appearance-none"
          >
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((count) => (
              <option key={count} value={count} className="bg-charcoal text-parchment">
                {count} {count === "1" ? "guest" : "guests"}
              </option>
            ))}
            <option value="10+" className="bg-charcoal text-parchment">
              10+ (large group)
            </option>
          </select>
        </div>
      </div>

      <fieldset>
        <legend className="field-label">Seating</legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {(
            [
              ["ac-indoor", "AC indoor"],
              ["outdoor", "Outdoor"],
              ["no-preference", "No preference"],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border px-3 text-[13px] transition-colors ${
                form.seating === value
                  ? "border-gold/60 bg-gold/12 text-parchment"
                  : "border-parchment/15 text-parchment/60 hover:border-parchment/30"
              }`}
            >
              <input
                type="radio"
                name="seating"
                value={value}
                checked={form.seating === value}
                onChange={() => update("seating", value)}
                className="size-3.5 accent-[#D99B26]"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="res-notes" className="field-label">
          Anything we should know? <span className="normal-case tracking-normal text-parchment/55">(optional)</span>
        </label>
        <textarea
          id="res-notes"
          name="notes"
          rows={3}
          value={form.notes}
          onChange={(event) => update("notes", event.target.value)}
          placeholder="Birthday, high chair, step-free access…"
          className="field resize-none"
        />
      </div>

      {error ? (
        <p role="alert" className="rounded-lg border border-teal/40 bg-teal/10 px-3 py-2 text-[12.5px] text-parchment">
          {error}
        </p>
      ) : null}

      <button type="submit" className="btn btn-primary w-full">
        <MessageCircle className="size-4" aria-hidden />
        Send reservation enquiry on WhatsApp
      </button>

      <p className="flex items-start gap-2 text-[11px] leading-relaxed text-parchment/60">
        <CalendarCheck className="mt-0.5 size-3.5 shrink-0" aria-hidden />
        This opens WhatsApp with your details filled in. The table is confirmed only when the
        restaurant replies — nothing is charged or booked automatically.
      </p>

      {sent ? (
        <p role="status" className="text-[12px] text-gold">
          WhatsApp should have opened in a new tab. If it did not,{" "}
          <a
            href={`tel:${siteConfig.phone.tel}`}
            className="underline decoration-gold/40 underline-offset-2"
          >
            call {siteConfig.phone.display}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
