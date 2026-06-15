export const scrollToHash = (hash: string): void => {
  document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
};

export const scrollToHashDelayed = (hash: string, delayMs: number): void => {
  setTimeout(() => scrollToHash(hash), delayMs);
};
