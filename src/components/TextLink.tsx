import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { parseHref } from "~/utils/href";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

const arrow = (
  <span aria-hidden className="transition-transform group-hover:translate-x-1">
    →
  </span>
);

export const TextLink = ({ href, children, className = "", onClick }: TextLinkProps): ReactNode => {
  const { to, hash } = parseHref(href);

  const handleClick = () => {
    onClick?.();
  };

  return (
    <Link
      to={to}
      hash={hash}
      onClick={handleClick}
      className={`mono group inline-flex items-center gap-3 border-b border-(--bone-fade) pb-2 text-(--bone-paper) transition-colors hover:border-(--blood-bright) hover:text-(--blood-bright) ${className}`}
    >
      {children}
      {arrow}
    </Link>
  );
};
