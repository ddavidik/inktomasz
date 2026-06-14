import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

type BodyLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
};

export const BodyLink = ({ href, children, external }: BodyLinkProps) => {
  const isExternal = external ?? href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline font-bold text-(--bone-paper)"
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className="link-underline font-bold text-(--bone-paper)">
      {children}
    </Link>
  );
};
