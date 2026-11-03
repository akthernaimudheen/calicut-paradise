import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { CartProvider } from "@/components/cart/cart-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileDock } from "@/components/mobile-dock";
import { CartSheet } from "@/components/cart/cart-sheet";
import { siteConfig } from "@/lib/site";
import { restaurantJsonLd } from "@/lib/structured-data";
import "./globals.css";

const display = localFont({
  src: "./fonts/Fraunces-Variable.woff2",
  weight: "300 700",
  style: "normal",
  display: "swap",
  variable: "--font-display",
  fallback: ["Iowan Old Style", "Georgia", "serif"],
});

const body = localFont({
  src: "./fonts/DMSans-Variable.woff2",
  weight: "300 700",
  style: "normal",
  display: "swap",
  variable: "--font-body",
  fallback: ["Segoe UI", "system-ui", "sans-serif"],
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
    <html lang="en-IN" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-dvh bg-charcoal">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-saffron focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-charcoal"
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
