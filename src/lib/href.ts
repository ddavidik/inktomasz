type ParsedHref = { to: string; hash: string | undefined };

export const parseHref = (href: string): ParsedHref => {
  const hashIdx = href.indexOf("#");
  const to = hashIdx > 0 ? href.slice(0, hashIdx) : hashIdx === 0 ? "/" : href;
  const hash = hashIdx !== -1 ? href.slice(hashIdx + 1) : undefined;

  return { to, hash };
};
