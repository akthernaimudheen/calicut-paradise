import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type CtaVariant = "primary" | "secondary" | "tertiary";
export type CtaSize = "sm" | "md";

/**
 * Single source of truth for CTA classes. The visual language lives in
 * globals.css (.btn / .btn-primary / .btn-secondary / .btn-tertiary); this
 * helper only maps a variant + size onto it so no screen re-invents a button.
 */
export function ctaClass(variant: CtaVariant = "primary", size: CtaSize = "md", extra = "") {
  const base =
    variant === "tertiary"
      ? "btn btn-tertiary"
      : variant === "secondary"
        ? "btn btn-secondary"
        : "btn btn-primary";
  const compact = size === "sm" && variant !== "tertiary" ? "btn-sm" : "";
  return [base, compact, extra].filter(Boolean).join(" ");
}

function CtaArrow({ external }: { external?: boolean }) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return <Icon className="cta-arrow size-4" aria-hidden />;
}

type SharedProps = {
  children: ReactNode;
  variant?: CtaVariant;
  size?: CtaSize;
  className?: string;
  /** Trailing arrow; pass "external" for links that leave the site. */
  arrow?: boolean | "external";
};

type LinkCtaProps = SharedProps & {
  href: string;
  onClick?: () => void;
};

/**
 * Every navigational action on the site: internal routes, phone links and
 * external listings. External URLs open in a new tab with safe rel.
 */
export function CTA({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  arrow = false,
  onClick,
}: LinkCtaProps) {
  const classes = ctaClass(variant, size, className);
  const content = (
    <>
      {children}
      {arrow ? <CtaArrow external={arrow === "external"} /> : null}
    </>
  );
  const isExternal = /^https?:\/\//i.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  if (/^(tel:|mailto:)/i.test(href)) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {content}
    </Link>
  );
}

type CtaButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

/** The same language for actions that submit or mutate, rather than navigate. */
export function CtaButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  arrow = false,
  type = "button",
  ...rest
}: CtaButtonProps) {
  return (
    <button type={type} className={ctaClass(variant, size, className)} {...rest}>
      {children}
      {arrow ? <CtaArrow /> : null}
    </button>
  );
}
