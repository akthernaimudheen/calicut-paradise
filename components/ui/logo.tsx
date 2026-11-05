import Image from "next/image";

type LogoProps = {
  className?: string;
  variant?: "gold" | "dark" | "ivory";
  size?: number;
};

export function CalicutParadiseLogo({
  className = "",
  variant = "gold",
  size = 42,
}: LogoProps) {
  const src =
    variant === "dark"
      ? "/images/brand/logo-dark.png"
      : variant === "ivory"
        ? "/images/brand/logo-ivory.png"
        : "/images/brand/logo-gold.png";

  return (
    <span className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <Image
        src={src}
        alt="Calicut Paradise Crest"
        width={size}
        height={size}
        className="object-contain"
        style={{ width: size, height: "auto" }}
        priority
      />
    </span>
  );
}
