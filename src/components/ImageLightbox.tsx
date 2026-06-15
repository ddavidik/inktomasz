import { createPortal } from "react-dom";
import { useEffect, useRef, useState, type TouchEvent, type MouseEvent } from "react";
import { CtaButton } from "./CtaButton";
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

const handleClaim =
  (
    onClaim: ((id: string, title: string) => void) | undefined,
    onClose: () => void,
    claimId: string | undefined,
    claimTitle: string | undefined,
  ) =>
  () => {
    if (claimId && claimTitle) onClaim?.(claimId, claimTitle);
    onClose();
  };

const handlePrev = (onChange: (i: number) => void, prevIndex: number) => () => onChange(prevIndex);

const handleNext = (onChange: (i: number) => void, nextIndex: number) => () => onChange(nextIndex);

export const ImageLightbox = ({ items, index, onClose, onChange, onClaim }: Props) => {
  const touchStartRef = useRef<number | null>(null);
  const total = items.length;
  const [isLoading, setIsLoading] = useState(true);

  const currentItem = index >= 0 && index < total ? items[index] : undefined;

  const handleImageLoad = () => setIsLoading(false);
  const handleImageError = () => setIsLoading(false);

  useEffect(() => {
    if (currentItem) setIsLoading(true);
  }, [currentItem?.src]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onChange((index - 1 + total) % total);
      } else if (e.key === "ArrowRight") {
        onChange((index + 1) % total);
      }
    };
    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [index, total, onClose, onChange]);

  if (!currentItem) return null;

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    if (touch) touchStartRef.current = touch.clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const start = touchStartRef.current;
    const touch = e.changedTouches[0];
    if (start === null || !touch) return;
    const delta = touch.clientX - start;
    if (Math.abs(delta) > 50) {
      onChange(delta > 0 ? (index - 1 + total) % total : (index + 1) % total);
    }
    touchStartRef.current = null;
  };

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
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
      <div className="fixed inset-0 z-lightbox flex flex-col items-center justify-center p-4">
        <button
          onClick={onClose}
          className="absolute top-5 right-6 z-base text-(--bone-fade) hover:text-(--bone-paper) transition-colors text-4xl leading-none cursor-pointer"
          aria-label={site.lightbox.closeLabel}
        >
          ×
        </button>

        {/* Preload images (hidden, no layout impact) */}
        <img src={prevItem.src} alt="" hidden aria-hidden="true" />
        <img src={nextItem.src} alt="" hidden aria-hidden="true" />

        <div className="relative max-h-[85vh] max-w-[90vw] border border-white/5">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-base">
              <svg
                className="animate-spin h-10 w-10 text-(--blood-bright)"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          )}
          <img
            src={currentItem.src}
            alt={currentItem.alt}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className="block max-h-[85vh] max-w-[90vw] object-contain animate-fade-in"
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

        {currentItem.claimId && currentItem.claimTitle && (
          <CtaButton
            onClick={handleClaim(onClaim, onClose, currentItem.claimId, currentItem.claimTitle)}
            type="button"
            className="mt-4 px-7 py-4 mb-4"
            showArrow
          >
            <span>{site.lightbox.claimLabel}</span>
          </CtaButton>
        )}

        <button
          onClick={handlePrev(onChange, prevIndex)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-base display text-4xl md:text-5xl text-(--bone-fade) hover:text-(--blood-bright) transition-colors cursor-pointer"
          aria-label={site.lightbox.prevLabel}
        >
          ←
        </button>
        <button
          onClick={handleNext(onChange, nextIndex)}
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
