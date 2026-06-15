import { useState, type MouseEvent } from "react";
import clsx from "clsx";
import wannado from "@content/wannado.json";
import site from "@content/site.json";
import { SectionHeader } from "~/components/SectionHeader";
import { CtaLink } from "~/components/CtaLink";
import { ImageLightbox } from "~/components/ImageLightbox";
import { createOpenHandler, createKeyDownHandler, createPreloadHandler } from "~/utils/lightboxHandlers";

type Props = {
  onClaim: (id: string, title: string) => void;
};

type LightboxItem = {
  src: string;
  alt: string;
  title: string;
  meta: string;
  claimId: string;
  claimTitle: string;
};

const handleTagClick = (setActive: (tag: string) => void, tag: string) => () => setActive(tag);

const handleClaimClick =
  (onClaim: (id: string, title: string) => void, id: string, title: string) => (e: MouseEvent) => {
    e.stopPropagation();
    onClaim(id, title);
  };

export const WannaDo = ({ onClaim }: Props) => {
  const [active, setActive] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    active === "all" ? wannado.ideas : wannado.ideas.filter((i) => i.tags.includes(active));

  const lightboxItems: LightboxItem[] = filtered.map(({ id, alt, src, title, tags }) => ({
    src,
    alt,
    title,
    meta: tags.join(" · "),
    claimId: id,
    claimTitle: title,
  }));

  return (
    <section id="wannado" className="relative scroll-mt-16 border-t border-white/5 py-28 md:py-40">
      <div className="mx-auto max-w-350 px-6 md:px-10">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionHeader
              rune={site.wannadoSection.rune}
              label={site.wannadoSection.label}
              heading={wannado.heading}
            />
          </div>
          <p className="max-w-md text-(--bone-warm)">{wannado.lead}</p>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {wannado.tags.map((tag) => {
            const isOn = active === tag;

            return (
              <button
                key={tag}
                onClick={handleTagClick(setActive, tag)}
                className={clsx(
                  "mono border px-4 py-2 transition-colors cursor-pointer",
                  isOn
                    ? "border-(--blood-bright) bg-(--blood-bright)/10 text-(--bone-paper)"
                    : "border-white/10 text-(--bone-fade) hover:border-white/40 hover:text-(--bone-paper)",
                )}
              >
                {tag}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {filtered.map(({ id, alt, src, title, tags, width, height }, i) => (
            <figure
              key={id}
              suppressHydrationWarning
              role="button"
              tabIndex={0}
              onClick={createOpenHandler(setLightboxIndex, i)}
              onKeyDown={createKeyDownHandler(setLightboxIndex, i)}
              onMouseEnter={createPreloadHandler(src)}
              aria-label={site.wannadoSection.lightboxAria.replace("{title}", title)}
              className="reveal group relative flex flex-col overflow-hidden border border-white/5 bg-(--ink-iron) cursor-pointer focus-visible:outline-2 focus-visible:outline-(--blood-bright) focus-visible:outline-offset-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  loading="lazy"
                  className="block aspect-4/5 w-full object-cover transition-transform duration-1200 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 text-(--bone-fade) group-hover:text-(--bone-paper) transition-colors text-lg">
                  ⤢
                </div>
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-linear-to-b from-transparent via-transparent to-black/85 p-4">
                  <div>
                    <div className="display text-xl leading-tight">{title}</div>
                    <div className="mono mt-1 text-[10px]">{tags.join(" · ")}</div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClaimClick(onClaim, id, title)}
                className="mono group/btn flex items-center justify-between gap-2 border-t border-white/5 bg-(--ink-stone) px-4 py-3 text-[10px] text-(--bone-paper) transition-colors hover:bg-(--blood-bright)/10 hover:text-(--blood-bright) cursor-pointer"
              >
                <span className="hidden sm:inline">{site.wannadoSection.claimLabel}</span>
                <span className="sm:hidden">{site.wannadoSection.claimLabelMobile}</span>
                <span aria-hidden className="transition-transform group-hover/btn:translate-x-1">
                  →
                </span>
              </button>
            </figure>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-white/5 pt-10">
          <p className="serif-tight max-w-xl text-pretty text-xl text-(--bone-warm) md:text-2xl">
            {site.wannadoSection.ctaPrompt}
          </p>
          <CtaLink href="#inquire" showArrow className="px-7 py-4">
            {site.wannadoSection.ctaLink}
          </CtaLink>
        </div>
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          items={lightboxItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
          onClaim={onClaim}
        />
      )}
    </section>
  );
};
