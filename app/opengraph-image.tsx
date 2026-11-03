import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = "Calicut Paradise — Malabar restaurant in Thrissur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card. Rendered with the platform's bundled font so the brand name is
 * always legible when the link is shared on WhatsApp or Instagram.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(115deg, #1d1613 0%, #161210 55%, #241a15 100%)",
          padding: "64px 72px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -120,
            width: 620,
            height: 620,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(184,74,39,0.55) 0%, rgba(184,74,39,0) 70%)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 66,
              height: 66,
              borderRadius: 999,
              border: "1px solid rgba(217,155,38,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#D99B26",
              fontSize: 24,
              letterSpacing: 2,
            }}
          >
            {siteConfig.monogram}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#FBF6EE", fontSize: 24, letterSpacing: 1 }}>
              Calicut Paradise
            </span>
            <span style={{ color: "rgba(251,246,238,0.45)", fontSize: 14, letterSpacing: 7 }}>
              THRISSUR
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "#D99B26", fontSize: 17, letterSpacing: 6 }}>
            MALABAR KITCHEN · IKKANDA WARRIOR ROAD
          </span>
          <span
            style={{
              color: "#FBF6EE",
              fontSize: 76,
              lineHeight: 1.06,
              marginTop: 18,
              maxWidth: 900,
            }}
          >
            Experience the soul of Malabar.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(251,246,238,0.14)",
            paddingTop: 22,
          }}
        >
          <span style={{ color: "rgba(251,246,238,0.6)", fontSize: 19 }}>
            Dum biryani · charcoal grills · Sulaimani
          </span>
          <span style={{ color: "rgba(251,246,238,0.45)", fontSize: 18 }}>
            {siteConfig.phone.display} · Daily {siteConfig.hours.display}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
