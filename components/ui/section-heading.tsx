import type { ReactNode } from "react";
import { Reveal } from "./reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  copy?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  tone = "dark",
  className = "",
  as: Component = "h2",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal
      className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow ? (
        <span className={`label mb-2 block ${centered ? "text-center" : ""}`}>
          {eyebrow}
        </span>
      ) : null}
      <Component className={`display-lg ${tone === "light" ? "display-on-light" : ""}`}>
        {title}
      </Component>
      {copy ? (
        <p className={`lede mt-3 ${tone === "light" ? "lede-light" : ""}`}>{copy}</p>
      ) : null}
    </Reveal>
  );
}
