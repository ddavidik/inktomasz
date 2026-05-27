import React, { type ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  showArrow?: boolean;
  onClick?: () => void;
  className?: string;
};

export const CtaButton = ({
  href,
  children,
  showArrow = false,
  onClick,
  className = "",
}: Props): React.ReactElement => (
  <a
    href={href}
    onClick={onClick}
    className={`mono group inline-flex items-center gap-3 border border-(--blood-bright) text-(--bone-paper) transition-colors hover:text-(--blood-bright) ${className}`}
  >
    {children}
    {showArrow && (
      <span aria-hidden className="transition-transform group-hover:translate-x-1">
        →
      </span>
    )}
  </a>
);
