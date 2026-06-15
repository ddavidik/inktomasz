import { type MouseEvent, type KeyboardEvent } from "react";

const preloadImage = (src: string) => {
  const img = new Image();
  img.src = src;
};

export const createOpenHandler =
  (setLightboxIndex: (i: number) => void, index: number) => (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.blur();
    setLightboxIndex(index);
  };

export const createKeyDownHandler =
  (setLightboxIndex: (i: number) => void, index: number) => (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setLightboxIndex(index);
    }
  };

export const createPreloadHandler = (src: string) => () => preloadImage(src);
