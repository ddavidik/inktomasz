import type { ReactNode } from "react";

type PageHeaderProps = {
  rune: string;
  label: string;
  heading: ReactNode;
  subtitle?: ReactNode;
};

export const PageHeader = ({
  rune,
  label,
  heading,
  subtitle,
}: PageHeaderProps) => (
  <header className="mx-auto max-w-350 px-6 md:px-10">
    <p className="mono mb-6 text-(--blood-bright)">{rune}&nbsp; {label}</p>
    <h1 className="display text-balance text-[14vw] leading-[0.9] md:text-[clamp(4rem,8vw,9rem)]">
      {heading}
    </h1>
    {subtitle !== undefined && (
      <p className="serif-tight mt-8 max-w-2xl text-pretty text-xl text-(--bone-warm) md:text-2xl">
        {subtitle}
      </p>
    )}
  </header>
);
