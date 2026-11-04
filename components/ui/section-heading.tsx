import type { ReactNode } from "react";
import { Reveal } from "./reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  copy?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  tone = "dark",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal
      className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      <span className={`eyebrow ${tone === "light" ? "eyebrow-on-light" : ""}`}>{eyebrow}</span>
      <h2 className={`display-lg mt-4 ${tone === "light" ? "display-on-light" : ""}`}>{title}</h2>
      {copy ? (
        <p className={`lede mt-4 ${tone === "light" ? "lede-light" : ""}`}>{copy}</p>
      ) : null}
    </Reveal>
  );
}
