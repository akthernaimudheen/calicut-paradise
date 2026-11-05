"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Navigation, Phone, UtensilsCrossed } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

const GENERAL_ENQUIRY =
  "Hello Calicut Paradise! I'd like to ask about the menu and placing an order.";

const links = [
  {
    label: "Menu",
    href: "/menu",
    icon: UtensilsCrossed,
    external: false,
  },
  {
    label: "Call",
    href: `tel:${siteConfig.phone.tel}`,
    icon: Phone,
    external: true,
  },
  {
    label: "WhatsApp",
    href: whatsappUrl(siteConfig.phone.whatsapp, GENERAL_ENQUIRY),
    icon: MessageCircle,
    external: true,
  },
  {
    label: "Directions",
    href: siteConfig.links.directions,
    icon: Navigation,
    external: true,
  },
] as const;

export function MobileDock() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-paper/10 bg-ink/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
    >
      <ul className="grid grid-cols-4">
        {links.map((link) => {
          const active = !link.external && pathname === link.href;
          const Icon = link.icon;
          const content = (
            <>
              <Icon className="size-[18px]" aria-hidden />
              <span className="text-[10px] font-medium tracking-[0.06em]">{link.label}</span>
            </>
          );
          return (
            <li key={link.label} className="relative">
              {active ? (
                <div className="absolute inset-x-4 top-0 h-[2px] bg-brass" />
              ) : null}
              {link.external ? (
                <a
                  href={link.href}
                  target={link.href.startsWith("tel:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex min-h-[52px] flex-col items-center justify-center gap-1 py-1.5 text-paper/70 transition-colors hover:text-brass active:bg-paper/5"
                >
                  {content}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className={`flex min-h-[52px] flex-col items-center justify-center gap-1 py-1.5 transition-colors active:bg-paper/5 ${
                    active ? "text-brass font-medium" : "text-paper/70 hover:text-brass"
                  }`}
                >
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
