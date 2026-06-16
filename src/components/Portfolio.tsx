import { useState } from "react";
import portfolio from "@content/portfolio.json";
import site from "@content/site.json";
import { SectionHeader } from "~/components/SectionHeader";
import { CtaRow } from "~/components/CtaRow";
import { GalleryFigure } from "~/components/GalleryFigure";
import { ImageLightbox } from "~/components/ImageLightbox";

type LightboxItem = {
  src: string;
  alt: string;
  title: string;
  meta: string;
};

export const Portfolio = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxItems: LightboxItem[] = portfolio.pieces.map(
    ({ id: _id, src, alt, title, style, year }) => ({
      src,
      alt,
      title,
      meta: `${style} · ${year}`,
    }),
  );

  return (
    <section id="portfolio" className="relative scroll-mt-16 py-28 md:py-40">
      <div className="mx-auto max-w-350 px-6 md:px-10">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionHeader
              rune={site.portfolioSection.rune}
              label={site.portfolioSection.label}
              heading={portfolio.heading}
            />
          </div>
          <p className="max-w-md text-(--bone-paper) text-sm md:text-lg">
            {portfolio.lead}{" "}
            <a
              href={site.artist.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-bold text-(--bone-paper)"
            >
              Instagram
            </a>
            .
          </p>
        </div>

        {/* Mobile: explicit 2-col alternating masonry (fixes CSS columns balance bug on iOS) */}
        <div className="grid grid-cols-2 gap-6 lg:hidden">
          {[0, 1].map((col) => (
            <div key={col} className="flex flex-col gap-6">
              {portfolio.pieces
                .filter((_, i) => i % 2 === col)
                .map(({ id, src, alt, title, style, year, width, height }) => {
                  const globalIndex = portfolio.pieces.findIndex((p) => p.id === id);
                  return (
                    <GalleryFigure
                      key={id}
                      src={src}
                      alt={alt}
                      width={width}
                      height={height}
                      title={title}
                      meta={style}
                      metaSecondary={String(year)}
                      index={globalIndex}
                      ariaLabel={`View ${title} in lightbox`}
                      onOpen={setLightboxIndex}
                      titleClassName="text-2xl"
                    />
                  );
                })}
            </div>
          ))}
        </div>

        {/* Lg+: CSS 3-column masonry */}
        <div className="hidden lg:block columns-3 gap-6">
          {portfolio.pieces.map(({ id, src, alt, title, style, year, width, height }, i) => (
            <div key={id} className="mb-6 break-inside-avoid">
              <GalleryFigure
                src={src}
                alt={alt}
                width={width}
                height={height}
                title={title}
                meta={style}
                metaSecondary={String(year)}
                index={i}
                ariaLabel={`View ${title} in lightbox`}
                onOpen={setLightboxIndex}
                titleClassName="text-2xl"
              />
            </div>
          ))}
        </div>

        <CtaRow
          prompt={site.portfolioSection.ctaPrompt}
          linkText={site.portfolioSection.ctaLink}
          linkHref="/#inquire"
        />
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          items={lightboxItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </section>
  );
};
