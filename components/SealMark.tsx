import type { SVGProps } from "react";

type SealMarkProps = SVGProps<SVGSVGElement> & {
  decorative?: boolean;
};

export function SealMark({
  className = "",
  decorative = false,
  ...props
}: SealMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : "SinoName seal mark"}
      fill="none"
      {...props}
    >
      <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="5" />
      <path
        d="M19 34h62M19 66h62M35 10v80M65 10v80M35 50h30M50 34v32"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="square"
      />
    </svg>
  );
}
