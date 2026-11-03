import Link from "next/link";
import { CalendarCheck, MapPin, MessageCircle, UtensilsCrossed } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

const GENERAL_ENQUIRY =
  "Hello Calicut Paradise! I'm browsing your website and would like help placing an order.";

const icons = {
  menu: UtensilsCrossed,
  whatsapp: MessageCircle,
  pin: MapPin,
  table: CalendarCheck,
} as const;

const actions = [
  {
    icon: "menu" as const,
    label: "View full menu",
    hint: "Eight categories",
    href: "/menu",
    external: false,
  },
  {
    icon: "whatsapp" as const,
    label: "Order on WhatsApp",
    hint: "Send an enquiry",
    href: whatsappUrl(siteConfig.phone.whatsapp, GENERAL_ENQUIRY),
    external: true,
  },
  {
    icon: "pin" as const,
    label: "Maps & parking",
    hint: "Ikkanda Warrior Rd",
    href: siteConfig.links.directions,
    external: true,
  },
  {
    icon: "table" as const,
    label: "Book a table",
    hint: "Family & AC seating",
    href: "/reserve",
    external: false,
  },
];

/**
 * The Linktree replacement: the four things someone tapping in from Instagram
 * usually wants, without a redirect in between.
 */
export function QuickActions() {
  return (
    <section aria-label="Quick actions" className="border-b border-parchment/10 bg-clove/40">
      <div className="shell -mt-px grid grid-cols-2 gap-2 py-4 sm:gap-3 md:grid-cols-4 md:py-5">
        {actions.map((action) => {
          const Icon = icons[action.icon];
          const className =
            "group flex min-h-16 items-center gap-3 rounded-xl border border-parchment/10 bg-charcoal/60 px-3.5 py-3 transition-colors hover:border-saffron/40 hover:bg-charcoal md:px-4";
          const inner = (
            <>
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-saffron/12 text-saffron transition-colors group-hover:bg-saffron/20">
                <Icon className="size-4" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-semibold text-parchment/90">
                  {action.label}
                </span>
                <span className="block truncate text-[11px] text-parchment/60">{action.hint}</span>
              </span>
            </>
          );

          return action.external ? (
            <a
              key={action.label}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {inner}
            </a>
          ) : (
            <Link key={action.label} href={action.href} className={className}>
              {inner}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
