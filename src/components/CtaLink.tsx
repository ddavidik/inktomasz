import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { parseHref } from "~/lib/href";
import { scrollToHash } from "~/lib/scroll-to-hash";
import { ctaBaseClass } from "~/lib/cta-styles";
import { CtaArrow } from "~/components/CtaArrow";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  showArrow?: boolean;
  className?: string;
  onClick?: () => void;
};

export const CtaLink = ({
  href,
  children,
  showArrow = false,
  onClick,
  className = "",
}: CtaLinkProps): ReactNode => {
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);

  if (isExternal) {
    return (
      <a href={href} onClick={onClick} className={clsx(ctaBaseClass, className)}>
        {children}
        {showArrow && <CtaArrow />}
      </a>
    );
  }

  const { to, hash } = parseHref(href);

  const handleClick = () => {
    onClick?.();
    if (hash) scrollToHash(hash);
  };

  return (
    <Link
      to={to}
      hash={hash}
      onClick={handleClick}
      className={clsx(ctaBaseClass, className)}
    >
      {children}
      {showArrow && <CtaArrow />}
    </Link>
  );
};
