import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { CartProvider } from "@/components/cart/cart-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileDock } from "@/components/mobile-dock";
import { CartSheet } from "@/components/cart/cart-sheet";
import { siteConfig } from "@/lib/site";
import { restaurantJsonLd } from "@/lib/structured-data";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Malabar restaurant in Thrissur`,
    template: `%s · ${siteConfig.name}, Thrissur`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Calicut Paradise Thrissur",
    "Malabar restaurant Thrissur",
    "biryani restaurant Thrissur",
    "Kerala restaurant Kokkala",
    "family restaurant Thrissur",
    "Ikkanda Warrior Road restaurant",
    "dum biryani Thrissur",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Experience the soul of Malabar in Thrissur`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/brand/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name}, Thrissur`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Malabar restaurant in Thrissur`,
    description: siteConfig.description,
    images: ["/images/brand/og-cover.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "restaurant",
};

export const viewport: Viewport = {
  themeColor: "#161210",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="min-h-dvh bg-charcoal">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-charcoal"
        >
          Skip to content
        </a>
        <CartProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <MobileDock />
          <CartSheet />
        </CartProvider>
        <script
          type="application/ld+json"
          // Structured data is generated from the same config as the visible page.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd()) }}
        />
      </body>
    </html>
  );
}
