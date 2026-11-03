import Image from "next/image";
import { siteConfig } from "@/lib/site";

type ImagePlateProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Overrides the global placeholder flag for a single image. */
  placeholder?: boolean;
  /** Must be one of `images.qualities` in next.config.ts. */
  quality?: 75 | 82;
};

/**
 * Every photograph on this site currently lives in a fixed slot under
 * public/images/. Replacing the file with a licensed original is the whole
 * migration — no code change is required.
 */
export function ImagePlate({
  src,
  alt,
  className = "",
  imageClassName = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  placeholder,
  quality = 82,
}: ImagePlateProps) {
  const isPlaceholder = placeholder ?? siteConfig.assets.photoPlaceholders;

  return (
    <div className={`relative overflow-hidden bg-clove ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        className={`object-cover ${imageClassName}`}
      />
      {isPlaceholder ? (
        <span className="pointer-events-none absolute right-2.5 top-2.5 rounded-full border border-parchment/20 bg-charcoal/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-parchment/70 backdrop-blur-sm">
          Placeholder
        </span>
      ) : null}
    </div>
  );
}
