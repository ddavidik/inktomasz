import React, { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";

type Props = {
  href: string;
  children: ReactNode;
  showArrow?: boolean;
  onClick?: () => void;
  className?: string;
};

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

/** Parse "/#portfolio" → { to: "/", hash: "portfolio" }
 *  Parse "#inquire"    → { to: "/", hash: "inquire" }
 *  Parse "/about"      → { to: "/about", hash: undefined } */
const parseInternal = (href: string) => {
  const hashIdx = href.indexOf("#");
  const to = hashIdx > 0 ? href.slice(0, hashIdx) : hashIdx === 0 ? "/" : href;
  const hash = hashIdx !== -1 ? href.slice(hashIdx + 1) : undefined;
  return { to, hash };
};

const sharedClass = (extra: string) =>
  `mono group inline-flex items-center gap-3 border border-(--blood-bright) text-(--bone-paper) transition-colors hover:text-(--blood-bright) ${extra}`.trimEnd();

export const CtaButton = ({
  href,
  children,
  showArrow = false,
  onClick,
  className = "",
}: Props): React.ReactElement => {
  const arrow = showArrow && (
    <span aria-hidden className="transition-transform group-hover:translate-x-1">
      →
    </span>
  );

  if (isExternal(href)) {
    return (
      <a href={href} onClick={onClick} className={sharedClass(className)}>
        {children}
        {arrow}
      </a>
    );
  }

  const { to, hash } = parseInternal(href);

  return (
    <Link to={to} hash={hash} onClick={onClick} className={sharedClass(className)}>
      {children}
      {arrow}
    </Link>
  );
};
