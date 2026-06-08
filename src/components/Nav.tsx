import React, { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import site from "@content/site.json";
import { CtaButton } from "./CtaButton";

export const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color] duration-500 ${
        isScrolled
          ? "bg-(--ink-void)/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-350 items-center justify-between px-6 py-4 lg:px-10">
        <div className="flex items-baseline gap-2 text-(--bone-paper)">
          <Link
            to="/"
            className="display text-2xl leading-none lg:text-3xl"
            aria-label={`${site.artist.name} home`}
          >
            {site.artist.firstName}{" "}
            <span className="text-(--blood-bright)">{site.artist.lastName}</span>
          </Link>
          <span className="mono hidden lg:inline text-[10px] tracking-[0.4em] text-(--bone-fade)">
            ᛏ {site.artist.studio} · {site.artist.studioCity}
          </span>
        </div>

        <nav className="hidden items-center gap-4 md:flex lg:gap-6 xl:gap-8">
          {site.navLinks.map((l) => (
            <NavLink key={l.href} href={l.href} label={l.label} isCta={l.cta ?? false} />
          ))}
        </nav>

        <button
          aria-label="Menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((isOpen) => !isOpen)}
          className="relative h-10 w-10 md:hidden"
        >
          <span
            className={`absolute left-2 top-4 h-px w-6 bg-(--bone-paper) transition-transform duration-300 ${
              isOpen ? "translate-y-1 rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-2 top-6 h-px w-6 bg-(--bone-paper) transition-transform duration-300 ${
              isOpen ? "-translate-y-1 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* mobile sheet */}
      <div
        className={`md:hidden overflow-hidden border-t border-white/5 bg-(--ink-pitch)/95 backdrop-blur-md transition-[max-height,opacity] duration-500 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {site.navLinks.map(({ href, label, cta }) =>
            cta ? (
              <CtaButton
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="mt-2 self-start px-5 py-2"
              >
                {label}
              </CtaButton>
            ) : (
              <a
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="py-3 text-2xl display border-b border-white/5 last:border-0"
              >
                {label}
              </a>
            ),
          )}
        </nav>
      </div>
    </header>
  );
};

const NavLink = ({
  href,
  label,
  isCta,
}: {
  href: string;
  label: string;
  isCta: boolean;
}): React.ReactElement => {
  const isAnchor = href.startsWith("/#");

  if (isCta) {
    return (
      <CtaButton href={href} className="px-4 py-2">
        {label}
      </CtaButton>
    );
  }

  if (isAnchor) {
    return (
      <a
        href={href}
        className="mono link-underline whitespace-nowrap text-(--bone-paper) hover:text-(--bone-paper)"
      >
        {label}
      </a>
    );
  }

  return (
    <Link
      to={href}
      className="mono link-underline whitespace-nowrap text-(--bone-paper)"
      activeProps={{ className: "text-(--blood-bright)" }}
    >
      {label}
    </Link>
  );
};
