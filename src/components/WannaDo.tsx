import { useState, type MouseEvent } from "react";
import clsx from "clsx";
import wannado from "@content/wannado.json";
import site from "@content/site.json";
import { SectionHeader } from "~/components/SectionHeader";
import { CtaRow } from "~/components/CtaRow";
import { GalleryFigure } from "~/components/GalleryFigure";
import { ImageLightbox } from "~/components/ImageLightbox";

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
    <section id="wannado" className="relative scroll-mt-16 py-28 md:py-40">
      <div className="mx-auto max-w-350 px-6 md:px-10">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between text-lg">
          <div>
            <SectionHeader
              rune={site.wannadoSection.rune}
              label={site.wannadoSection.label}
              heading={wannado.heading}
            />
          </div>
          <p className="max-w-md text-(--bone-paper) text-sm md:text-lg">{wannado.lead}</p>
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
            <GalleryFigure
              key={id}
              src={src}
              alt={alt}
              width={width}
              height={height}
              title={title}
              meta={tags.join(" · ")}
              index={i}
              ariaLabel={site.wannadoSection.lightboxAria.replace("{title}", title)}
              onOpen={setLightboxIndex}
              imgClassName="aspect-4/5 object-cover"
            >
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
            </GalleryFigure>
          ))}
        </div>

        <CtaRow
          prompt={site.wannadoSection.ctaPrompt}
          linkText={site.wannadoSection.ctaLink}
          linkHref="#inquire"
        />
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
