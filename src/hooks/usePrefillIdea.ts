import { useEffect, useState } from "react";

const STORAGE_KEY = "inktomasz:idea";

export type Prefill = { id: string; title: string };

export const usePrefillIdea = () => {
  const [prefill, setPrefill] = useState<Prefill | null>(null);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (raw) setPrefill(JSON.parse(raw) as Prefill);
    } catch (error) {
      console.warn("inktomasz: failed to parse prefill idea", error);
    }
  }, []);

  const setPrefillIdea = (id: string, title: string) => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ id, title }));
    } catch {
      /* ignore */
    }
    setPrefill({ id, title });
  };

  const clearPrefill = () => {
    setPrefill(null);
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  return { prefill, setPrefillIdea, clearPrefill };
};
