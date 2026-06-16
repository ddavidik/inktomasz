import { type MouseEvent, type KeyboardEvent, type ReactNode } from "react";
import { createPreloadHandler } from "~/utils/lightboxHandlers";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  /** Meta line below the title (e.g. "blackwork · 2024", "style · year"). */
  meta?: string;
  /** Second meta line (Portfolio uses title + style on one side, year on the other). */
  metaSecondary?: string;
  index: number;
  ariaLabel: string;
  onOpen: (index: number) => void;
  /** Aspect ratio on <img>. Default: none. */
  imgClassName?: string;
  /** Override title text size class. Default: "text-xl". */
  titleClassName?: string;
  /** Slot below the image area, e.g. a Claim button. */
  children?: ReactNode;
};

export const GalleryFigure = ({
  src,
  alt,
  width,
  height,
  title,
  meta,
  metaSecondary,
  index,
  ariaLabel,
  onOpen,
  imgClassName,
  titleClassName = "text-xl",
  children,
}: Props) => {
  const handleOpen = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.blur();
    onOpen(index);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(index);
    }
  };

  return (
    <figure
      suppressHydrationWarning
      role="button"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={handleKeyDown}
      onMouseEnter={createPreloadHandler(src)}
      aria-label={ariaLabel}
      className="reveal group relative flex flex-col overflow-hidden border border-white/5 bg-(--ink-iron) cursor-pointer focus-visible:outline-2 focus-visible:outline-(--blood-bright) focus-visible:outline-offset-2"
    >
      <div className="relative overflow-hidden">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          className={`block w-full transition-transform duration-1200 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105 ${imgClassName ?? ""}`}
        />
        <div className="absolute top-3 right-3 text-(--bone-fade) group-hover:text-(--bone-paper) transition-colors text-lg">
          ⤢
        </div>
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-linear-to-b from-transparent via-transparent to-black/85 p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className={metaSecondary ? "flex items-end justify-between gap-4" : ""}>
            <div>
              <div className={`display ${titleClassName} leading-tight`}>{title}</div>
              {meta && <div className="mono mt-1">{meta}</div>}
            </div>
            {metaSecondary && <div className="mono">{metaSecondary}</div>}
          </div>
        </div>
      </div>
      {children}
    </figure>
  );
};
