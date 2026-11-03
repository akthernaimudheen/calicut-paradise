/**
 * Pure helpers that build the WhatsApp enquiry messages.
 * Kept dependency-free so they can be unit-tested with `node --test`.
 */

export type OrderType = "dine-in" | "takeaway" | "delivery";

export type OrderLine = {
  name: string;
  quantity: number;
  /** Unit price in rupees, only when a public listed price exists. */
  price?: number;
};

export type OrderEnquiryInput = {
  orderType: OrderType;
  name?: string;
  phone?: string;
  notes?: string;
  items: OrderLine[];
};

export const ORDER_TYPE_LABEL: Record<OrderType, string> = {
  "dine-in": "Dine-in table pre-order",
  takeaway: "Self pickup / takeaway",
  delivery: "Home delivery enquiry",
};

export const ORDER_TYPE_NOTE: Record<OrderType, string> = {
  "dine-in": "For table pre-orders the restaurant will confirm the table and timing first.",
  takeaway: "Pickup timing will be confirmed by the restaurant.",
  delivery: "Delivery availability, area and charges are confirmed by the restaurant.",
};

export function formatRupees(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function itemsTotal(lines: OrderLine[]): number | null {
  if (lines.length === 0) return null;
  let total = 0;
  for (const line of lines) {
    if (typeof line.price !== "number") return null;
    total += line.price * line.quantity;
  }
  return total;
}

export function itemsCount(lines: OrderLine[]): number {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

/** WhatsApp wants plain text with newlines; *bold* and _italic_ are supported. */
export function buildOrderMessage(input: OrderEnquiryInput): string {
  const lines: string[] = [];
  lines.push(`*${"Calicut Paradise"} — Order enquiry*`);
  lines.push(`Type: ${ORDER_TYPE_LABEL[input.orderType]}`);
  if (input.name?.trim()) lines.push(`Name: ${input.name.trim()}`);
  if (input.phone?.trim()) lines.push(`Phone: ${input.phone.trim()}`);
  lines.push("");
  lines.push("*Items*");

  input.items.forEach((item, index) => {
    const price = typeof item.price === "number" ? ` — ${formatRupees(item.price * item.quantity)}` : "";
    lines.push(`${index + 1}. ${item.name} × ${item.quantity}${price}`);
  });

  const total = itemsTotal(input.items);
  lines.push("");
  if (total !== null) {
    lines.push(`_Indicative total: ${formatRupees(total)} (listed prices, not a confirmed bill)_`);
  } else {
    lines.push("_Prices to be confirmed by the restaurant._");
  }

  if (input.notes?.trim()) {
    lines.push("");
    lines.push(`Notes: ${input.notes.trim()}`);
  }

  lines.push("");
  lines.push(ORDER_TYPE_NOTE[input.orderType]);
  lines.push("_This is an enquiry only — the order is confirmed when the restaurant replies._");
  return lines.join("\n");
}

export type ReservationEnquiryInput = {
  name: string;
  phone?: string;
  date: string;
  time: string;
  guests: string;
  seating: "ac-indoor" | "outdoor" | "no-preference";
  notes?: string;
};

export const SEATING_LABEL: Record<ReservationEnquiryInput["seating"], string> = {
  "ac-indoor": "AC indoor",
  outdoor: "Outdoor seating",
  "no-preference": "No preference",
};

export function buildReservationMessage(input: ReservationEnquiryInput): string {
  const lines: string[] = [];
  lines.push("*Calicut Paradise — Table reservation enquiry*");
  lines.push("");
  lines.push(`Name: ${input.name.trim()}`);
  if (input.phone?.trim()) lines.push(`Phone: ${input.phone.trim()}`);
  lines.push(`Date: ${input.date}`);
  lines.push(`Time: ${input.time}`);
  lines.push(`Guests: ${input.guests}`);
  lines.push(`Seating: ${SEATING_LABEL[input.seating]}`);
  if (input.notes?.trim()) {
    lines.push("");
    lines.push(`Notes: ${input.notes.trim()}`);
  }
  lines.push("");
  lines.push("_Enquiry only — the table is held once the restaurant confirms._");
  return lines.join("\n");
}

export function whatsappUrl(phoneDigits: string, message: string): string {
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;
}
