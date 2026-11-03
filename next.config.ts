import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Cloud VM serves previews from a *.style.dev hostname. Next dev blocks
  // unknown hosts for HMR/asset requests unless they are listed here.
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "pv-7d5c6279fa76-ebbe5a49-a9fb-4fb8-8b9e-a04917d4e298.style.dev",
    "*.style.dev",
  ],
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536, 1920],
    // Next 16 only serves qualities listed here; anything else returns 400.
    qualities: [75, 82],
  },
  poweredByHeader: false,
  // Keep the dev-mode status badge out of client previews and screenshots.
  devIndicators: false,
};

export default nextConfig;
