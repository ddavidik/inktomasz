import { useEffect, useRef } from "react";

/**
 * Adds .in to elements with .reveal once they enter the viewport.
 * Mount once at app root.
 */
export function useRevealOnScroll() {
  const armed = useRef(false);
  useEffect(() => {
    if (armed.current) return;
    armed.current = true;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    const scan = () => {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
