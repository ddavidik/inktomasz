import type { ReactNode } from "react";
import clsx from "clsx";

type SectionHeaderProps = {
  rune: string;
  label: string;
  heading: ReactNode;
  headingClassName?: string;
};

export const SectionHeader = ({ rune, label, heading, headingClassName }: SectionHeaderProps) => (
  <>
    <p className="mono mb-6 text-(--bone-fade)">
      {rune}&nbsp; {label}
    </p>
    <h2 className={clsx("display text-5xl leading-[0.95] md:text-7xl", headingClassName)}>
      {heading}
    </h2>
  </>
);
