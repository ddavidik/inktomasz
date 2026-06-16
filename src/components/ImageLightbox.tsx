import { createPortal } from "react-dom";
import { useEffect, useRef, useState, type TouchEvent, type MouseEvent } from "react";
import { CtaButton } from "./CtaButton";
import { Spinner } from "./Spinner";
import site from "@content/site.json";

type LightboxItem = {
  src: string;
  alt: string;
  title: string;
  meta?: string;
  claimId?: string;
  claimTitle?: string;
};

type Props = {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
  onClaim?: (id: string, title: string) => void;
};

type ExitDir = "next" | "prev" | "close" | null;
type EnterDir = "from-right" | "from-left" | "from-bottom" | null;

export const ImageLightbox = ({ items, index, onClose, onChange, onClaim }: Props) => {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const total = items.length;
  const [isLoading, setIsLoading] = useState(true);

  const [exitDir, setExitDir] = useState<ExitDir>(null);
  const [enterDir, setEnterDir] = useState<EnterDir>("from-bottom");
  const pendingRef = useRef<(() => void) | null>(null);
  const isAnimatingRef = useRef(false);

  const currentItem = index >= 0 && index < total ? items[index] : undefined;

  const handleImageLoad = () => setIsLoading(false);
  const handleImageError = () => setIsLoading(false);

  useEffect(() => {
    if (!currentItem) return;
    if (imgRef.current?.complete) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [currentItem?.src]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const preventTouchScroll = (e: globalThis.TouchEvent) => e.preventDefault();
    el.addEventListener("touchmove", preventTouchScroll, { passive: false });
    return () => {
      el.removeEventListener("touchmove", preventTouchScroll);
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        animatedClose();
      } else if (e.key === "ArrowLeft") {
        navigateTo((index - 1 + total) % total, "prev");
      } else if (e.key === "ArrowRight") {
        navigateTo((index + 1) % total, "next");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index, total]);

  if (!currentItem) return null;

  const navigateTo = (newIndex: number, dir: "next" | "prev") => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    pendingRef.current = () => {
      setEnterDir(dir === "next" ? "from-right" : "from-left");
      onChange(newIndex);
    };
    setExitDir(dir);
  };

  const animatedClose = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    pendingRef.current = onClose;
    setExitDir("close");
  };

  const handleExitAnimEnd = () => {
    const action = pendingRef.current;
    pendingRef.current = null;
    setExitDir(null);
    isAnimatingRef.current = false;
    action?.();
  };

  const handleEnterAnimEnd = () => {
    setEnterDir(null);
  };

  const EXIT_CLASS: Record<string, string> = {
    next: "animate-slide-out-left",
    prev: "animate-slide-out-right",
    close: "animate-slide-out-top",
  };
  const ENTER_CLASS: Record<string, string> = {
    "from-right": "animate-slide-in-right",
    "from-left": "animate-slide-in-left",
    "from-bottom": "animate-slide-in-bottom",
  };
  const exitClass = EXIT_CLASS[exitDir ?? ""] ?? "";
  const enterClass = ENTER_CLASS[enterDir ?? ""] ?? "";

  const animClass = exitDir ? exitClass : enterClass;

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    if (touch) touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const start = touchStartRef.current;
    const touch = e.changedTouches[0];
    if (!start || !touch) return;
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {
      animatedClose();
    } else if (Math.abs(deltaX) > 50) {
      navigateTo(
        deltaX > 0 ? (index - 1 + total) % total : (index + 1) % total,
        deltaX > 0 ? "prev" : "next",
      );
    } else if (Math.abs(deltaX) < 20 && Math.abs(deltaY) < 20) {
      const third = window.innerWidth / 3;
      if (touch.clientX < third) navigateTo((index - 1 + total) % total, "prev");
      else if (touch.clientX > third * 2) navigateTo((index + 1) % total, "next");
    }
    touchStartRef.current = null;
  };

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) animatedClose();
  };

  const prevIndex = (index - 1 + total) % total;
  const nextIndex = (index + 1) % total;

  // Preload adjacent images
  const prevItem = items[prevIndex]!;
  const nextItem = items[nextIndex]!;

  return createPortal(
    <div
      className="fixed inset-0 z-backdrop bg-black/90"
      onClick={handleBackdropClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label={site.lightbox.ariaLabel}
    >
      <div
        className="fixed inset-0 z-lightbox flex flex-col items-center justify-center p-4"
        ref={containerRef}
      >
        <button
          onClick={animatedClose}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          className="absolute top-5 right-6 z-base text-(--bone-fade) hover:text-(--blood-bright) transition-colors text-5xl md:text-6xl leading-none cursor-pointer"
          aria-label={site.lightbox.closeLabel}
        >
          ×
        </button>

        {/* Preload images (hidden, no layout impact) */}
        <img src={prevItem.src} alt="" hidden aria-hidden="true" />
        <img src={nextItem.src} alt="" hidden aria-hidden="true" />

        <div className="relative flex h-[70vh] w-[85vw] max-w-3xl items-center justify-center border border-white/5 overflow-hidden">
          {isLoading && <Spinner />}
          <img
            ref={imgRef}
            src={currentItem.src}
            alt={currentItem.alt}
            onLoad={handleImageLoad}
            onError={handleImageError}
            onAnimationEnd={exitDir ? handleExitAnimEnd : handleEnterAnimEnd}
            className={`max-h-full max-w-full object-contain ${animClass}`}
            key={currentItem.src}
          />
        </div>

        <div className="mt-4 text-center px-4">
          <div className="display text-2xl md:text-3xl text-(--bone-paper) leading-tight">
            {currentItem.title}
          </div>
          {currentItem.meta && (
            <div className="mono text-xs md:text-sm text-(--bone-mid) mt-1">{currentItem.meta}</div>
          )}
        </div>

        {currentItem.claimId && currentItem.claimTitle && onClaim && (
          <CtaButton
            onClick={() => {
              onClaim(currentItem.claimId!, currentItem.claimTitle!);
              onClose();
            }}
            type="button"
            className="mt-4 px-7 py-4 mb-4"
            showArrow
          >
            <span>{site.lightbox.claimLabel}</span>
          </CtaButton>
        )}

        <button
          onClick={() => navigateTo(prevIndex, "prev")}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-base display text-4xl md:text-5xl text-(--bone-fade) hover:text-(--blood-bright) transition-colors cursor-pointer"
          aria-label={site.lightbox.prevLabel}
        >
          ←
        </button>
        <button
          onClick={() => navigateTo(nextIndex, "next")}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-base display text-4xl md:text-5xl text-(--bone-fade) hover:text-(--blood-bright) transition-colors cursor-pointer"
          aria-label={site.lightbox.nextLabel}
        >
          →
        </button>
      </div>
    </div>,
    document.body,
  );
};
