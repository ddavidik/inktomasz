import { type ReactNode } from "react";
import { useActiveSection } from "~/hooks/useActiveSection";
import clsx from "clsx";
import site from "@content/site.json";

type Section = { id: string; label: string };
type SectionNavProps = { sections: Section[] };

const scrollToSection = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.pushState(null, "", `#${id}`);
};

export const SectionNav = ({ sections }: SectionNavProps): ReactNode => {
  const ids = sections.map((s) => s.id);
  const activeId = useActiveSection(ids);

  return (
    <nav
      aria-label={site.sectionNav.ariaLabel}
      className="fixed top-1/2 right-2 z-40 -translate-y-1/2 flex flex-col gap-5 items-end md:right-4 xl:right-6"
    >
      <div className="group flex flex-col gap-5 items-end">
        {sections.map(({ id, label }) => {
          const isActive = id === activeId;

          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={scrollToSection(id)}
              title={label}
              aria-label={label}
              aria-current={isActive ? "true" : undefined}
              className="flex items-center gap-2.5 no-underline"
            >
              {/* Label — desktop hover-reveal (all expand together) */}
              <span
                className={clsx(
                  "hidden md:inline-block overflow-hidden whitespace-nowrap mono text-xs tracking-widest uppercase transition-all duration-300",
                  "max-w-0 opacity-0 group-hover:max-w-24 group-hover:opacity-70",
                  isActive ? "text-(--bone-paper)" : "text-(--bone-fade)",
                )}
              >
                {label}
              </span>

              {/* Dot */}
              <span
                className={clsx(
                  "block rounded-full transition-all duration-300 shrink-0",
                  isActive
                    ? "w-2 h-2 bg-(--blood-bright) shadow-[0_0_6px_1px_var(--blood-bright)]"
                    : "w-1.5 h-1.5 bg-(--bone-fade)/50 group-hover:bg-(--bone-fade) group-hover:opacity-80",
                )}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
};
