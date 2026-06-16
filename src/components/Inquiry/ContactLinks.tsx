import site from "@content/site.json";
import { resolveHandle } from "~/utils/resolveHandle";

export const ContactLinks = () => {
  const igDM = `https://ig.me/m/${site.artist.handle}`;
  const linkText = resolveHandle(site.inquiry.contactLinkDM);

  return (
    <div className="mt-10 flex flex-col gap-3">
      <a
        href={igDM}
        target="_blank"
        rel="noopener noreferrer"
        className="mono group inline-flex items-center gap-3 text-(--bone-paper) link-underline"
      >
        {linkText}
      </a>
    </div>
  );
};
