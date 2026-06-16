import { CtaLink } from "~/components/CtaLink";

type Props = {
  prompt: string;
  linkText: string;
  linkHref: string;
};

export const CtaRow = ({ prompt, linkText, linkHref }: Props) => (
  <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-white/5 pt-10">
    <p className="serif-tight max-w-xl text-pretty text-xl text-(--bone-warm)">{prompt}</p>
    <CtaLink href={linkHref} showArrow className="px-7 py-4">
      {linkText}
    </CtaLink>
  </div>
);
