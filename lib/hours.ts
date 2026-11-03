/** Opening-hours helpers. All times are computed in Asia/Kolkata (IST). */

export type OpenState = {
  isOpen: boolean;
  /** e.g. "Open now · closes 11:15 PM" */
  label: string;
};

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function formatTime12h(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** Minutes since midnight in IST, regardless of the visitor's timezone. */
export function istMinutes(now: Date): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  return (hour % 24) * 60 + minute;
}

export function openState(now: Date, opens = "11:30", closes = "23:15"): OpenState {
  const current = istMinutes(now);
  const open = toMinutes(opens);
  const close = toMinutes(closes);
  const isOpen = current >= open && current < close;
  return {
    isOpen,
    label: isOpen
      ? `Open now · closes ${formatTime12h(closes)}`
      : `Closed · opens ${formatTime12h(opens)}`,
  };
}
