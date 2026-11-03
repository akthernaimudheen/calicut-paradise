import assert from "node:assert/strict";
import test from "node:test";
import {
  ORDER_TYPE_LABEL,
  buildOrderMessage,
  buildReservationMessage,
  itemsCount,
  itemsTotal,
  whatsappUrl,
} from "../lib/whatsapp.ts";

test("counts quantities, not lines", () => {
  assert.equal(
    itemsCount([
      { name: "Mutton Biryani", quantity: 2, price: 540 },
      { name: "Nool Porotta", quantity: 3, price: 45 },
    ]),
    5,
  );
});

test("totals only when every line has a price", () => {
  assert.equal(
    itemsTotal([
      { name: "Mutton Biryani", quantity: 2, price: 540 },
      { name: "Nool Porotta", quantity: 3, price: 45 },
    ]),
    1215,
  );
  assert.equal(
    itemsTotal([
      { name: "Mutton Biryani", quantity: 2, price: 540 },
      { name: "Fish Alfaham", quantity: 1 },
    ]),
    null,
  );
  assert.equal(itemsTotal([]), null);
});

test("order message itemises each line with an indicative total", () => {
  const message = buildOrderMessage({
    orderType: "takeaway",
    name: "  Arjun  ",
    notes: "Less spice",
    items: [
      { name: "Manavatty Mutton Dum Biryani", quantity: 2, price: 540 },
      { name: "Nool Porotta", quantity: 3, price: 45 },
    ],
  });

  assert.match(message, /Order enquiry/);
  assert.match(message, new RegExp(ORDER_TYPE_LABEL.takeaway));
  assert.match(message, /Name: Arjun/);
  assert.match(message, /1\. Manavatty Mutton Dum Biryani × 2 — ₹1,080/);
  assert.match(message, /2\. Nool Porotta × 3 — ₹135/);
  assert.match(message, /Indicative total: ₹1,215/);
  assert.match(message, /Notes: Less spice/);
  assert.match(message, /enquiry only/i);
});

test("order message flags unpriced dishes instead of inventing a total", () => {
  const message = buildOrderMessage({
    orderType: "delivery",
    items: [{ name: "Fish Al Faham", quantity: 1 }],
  });
  assert.match(message, /Prices to be confirmed/);
  assert.doesNotMatch(message, /Indicative total/);
});

test("reservation message carries every booking field", () => {
  const message = buildReservationMessage({
    name: "Meera",
    phone: "+91 90000 00000",
    date: "Sat, 8 Nov 2026",
    time: "7:30 PM",
    guests: "4",
    seating: "outdoor",
    notes: "Birthday",
  });
  assert.match(message, /Table reservation enquiry/);
  assert.match(message, /Name: Meera/);
  assert.match(message, /Date: Sat, 8 Nov 2026/);
  assert.match(message, /Guests: 4/);
  assert.match(message, /Seating: Outdoor seating/);
  assert.match(message, /Birthday/);
  assert.match(message, /Enquiry only/);
});

test("WhatsApp URL targets the restaurant and encodes the message", () => {
  const url = whatsappUrl("919562367000", "Hii & birayani\n2 plates");
  assert.ok(url.startsWith("https://wa.me/919562367000?text="));
  assert.ok(!url.includes("\n"));
  assert.ok(!url.includes("&birayani"));
  assert.ok(decodeURIComponent(url.split("?text=")[1]) === "Hii & birayani\n2 plates");
});
