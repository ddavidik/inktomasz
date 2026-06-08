import { useEffect } from "react";

/**
 * Adds .in to elements with .reveal once they enter the viewport.
 * Mount once at app root.
 *
 * Observer setup is deferred to the next animation frame to avoid
 * interfering with React 19's hydrateRoot reconciliation pass.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    let io: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;

    const raf = requestAnimationFrame(() => {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io!.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
      );

      const scan = () => {
        document.querySelectorAll(".reveal:not(.in)").forEach((el) => io!.observe(el));
      };

      scan();

      mo = new MutationObserver(scan);
      mo.observe(document.body, { childList: true, subtree: true });
    });

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      mo?.disconnect();
    };
  }, []);
}
