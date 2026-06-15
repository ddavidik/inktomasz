import { useEffect, useState } from "react";

export function useActiveSection(ids: string[]): string {
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    if (ids.length === 0) return;

    const observers: IntersectionObserver[] = [];
    const visible = new Set<string>();

    const pickActive = () => {
      for (const id of ids) {
        if (visible.has(id)) {
          setActiveId(id);
          return;
        }
      }
    };

    for (const id of ids) {
      const el = document.getElementById(id);

      if (!el) continue;

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry!.isIntersecting) {
            visible.add(id);
          } else {
            visible.delete(id);
          }
          pickActive();
        },
        { rootMargin: "-20% 0px -55% 0px", threshold: 0 },
      );

      io.observe(el);
      observers.push(io);
    }

    return () => {
      for (const io of observers) io.disconnect();
    };
  }, [ids.join(",")]);

  return activeId;
}
