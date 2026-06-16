import {
  useEffect,
  useState,
  type ReactElement,
  type MouseEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import clsx from "clsx";
import site from "@content/site.json";
import { CtaLink } from "./CtaLink";
import { parseHref } from "~/utils/href";
import { scrollToHash, scrollToHashDelayed } from "~/utils/scrollToHash";

const handleScroll = (setIsScrolled: (v: boolean) => void) => () =>
  setIsScrolled(window.scrollY > 24);

const toggleOpen = (setIsOpen: Dispatch<SetStateAction<boolean>>) => () =>
  setIsOpen((prev) => !prev);

const closeMobileMenu = (setIsOpen: Dispatch<SetStateAction<boolean>>) => () => setIsOpen(false);

const handleMobileNavClick =
  (setIsOpen: Dispatch<SetStateAction<boolean>>, hash: string | undefined) => (_e: MouseEvent) => {
    setIsOpen(false);
    if (hash) scrollToHashDelayed(hash, 320);
  };

export const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScrollHandler = handleScroll(setIsScrolled);
    onScrollHandler();
    window.addEventListener("scroll", onScrollHandler, { passive: true });

    return () => window.removeEventListener("scroll", onScrollHandler);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-nav transition-[background,backdrop-filter,border-color] duration-500",
        isScrolled
          ? "bg-(--ink-void)/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="mx-auto flex max-w-350 items-center justify-between px-6 py-3.5 lg:px-10">
        <div className="flex items-baseline gap-2 text-(--bone-paper)">
          <Link
            to="/"
            onClick={closeMobileMenu(setIsOpen)}
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
          onClick={toggleOpen(setIsOpen)}
          className="relative size-11 md:hidden"
        >
          <span
            className={clsx(
              "absolute left-2 top-4 h-px w-6 bg-(--bone-paper) transition-transform duration-300",
              isOpen && "translate-y-1 rotate-45",
            )}
          />
          <span
            className={clsx(
              "absolute left-2 top-6 h-px w-6 bg-(--bone-paper) transition-transform duration-300",
              isOpen && "-translate-y-1 -rotate-45",
            )}
          />
        </button>
      </div>

      {/* mobile sheet */}
      <div
        className={clsx(
          "md:hidden overflow-hidden border-t border-white/5 bg-(--ink-void)/80 backdrop-blur-md transition-[max-height,opacity] duration-500",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {site.navLinks.map(({ href, label, cta }) => {
            const { to, hash } = parseHref(href);

            return cta ? (
              <CtaLink
                key={href}
                href={href}
                onClick={closeMobileMenu(setIsOpen)}
                className="mt-2 self-start px-5 py-2"
              >
                {label}
              </CtaLink>
            ) : (
              <Link
                key={href}
                to={to}
                hash={hash}
                onClick={handleMobileNavClick(setIsOpen, hash)}
                className="py-3 text-2xl display border-b border-white/5 last:border-0"
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

type NavLinkProps = {
  href: string;
  label: string;
  isCta: boolean;
};

const NavLink = ({ href, label, isCta }: NavLinkProps): ReactElement => {
  const currentPath = useRouterState({ select: (s) => s.location.pathname });

  if (isCta)
    return (
      <CtaLink href={href} className="px-4 py-2">
        {label}
      </CtaLink>
    );

  const { to, hash } = parseHref(href);

  const handleClick = (e: MouseEvent) => {
    if (hash && currentPath === to) {
      e.preventDefault();
      scrollToHash(hash);
    }
  };

  return (
    <Link
      to={to}
      hash={hash}
      onClick={handleClick}
      className="mono link-underline whitespace-nowrap text-(--bone-paper)"
      activeProps={
        !hash
          ? { className: "text-(--blood-bright)", "aria-current": "page" as const }
          : { "aria-current": "page" as const }
      }
      activeOptions={!hash ? undefined : { exact: false }}
    >
      {label}
    </Link>
  );
};
