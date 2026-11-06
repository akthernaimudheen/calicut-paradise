import Image from "next/image";

type LogoProps = {
  className?: string;
  variant?: "gold" | "dark" | "ivory";
};

/**
 * Brand crest.
 *
 * The rendered size is driven by the `--logo-size` custom property (see
 * `.logo-mark` in globals.css), not by the image's intrinsic pixels: the asset
 * is a 483×483 square, so leaving the size to the image itself makes the crest
 * balloon far past the header. Callers set the property with a Tailwind
 * arbitrary-property class, which lets it change per breakpoint:
 *
 *   <CalicutParadiseLogo className="[--logo-size:46px] sm:[--logo-size:36px]" />
 */
export function CalicutParadiseLogo({ className = "", variant = "gold" }: LogoProps) {
  const src =
    variant === "dark"
      ? "/images/brand/logo-dark.png"
      : variant === "ivory"
        ? "/images/brand/logo-ivory.png"
        : "/images/brand/logo-gold.png";

  return (
    <span className={`logo-mark relative inline-flex items-center justify-center ${className}`}>
      <Image
        src={src}
        alt=""
        width={483}
        height={483}
        sizes="120px"
        className="h-auto w-full"
        priority
      />
    </span>
  );
}
