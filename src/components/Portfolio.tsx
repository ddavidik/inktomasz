import { useState } from "react";
import portfolio from "@content/portfolio.json";
import site from "@content/site.json";
import { SectionHeader } from "~/components/SectionHeader";
import { CtaLink } from "~/components/CtaLink";
import { ImageLightbox } from "~/components/ImageLightbox";
import { createOpenHandler, createKeyDownHandler, createPreloadHandler } from "~/utils/lightboxHandlers";

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
    <section
      id="portfolio"
      className="relative scroll-mt-16 border-t border-white/5 bg-(--ink-pitch) py-28 md:py-40"
    >
      <div className="mx-auto max-w-350 px-6 md:px-10">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionHeader
              rune={site.portfolioSection.rune}
              label={site.portfolioSection.label}
              heading={portfolio.heading}
            />
          </div>
          <p className="max-w-md text-(--bone-warm)">
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

        <div className="columns-2 gap-6 lg:columns-3 [column-fill:balance]">
          {portfolio.pieces.map(({ id, src, alt, title, style, year, width, height }, i) => (
            <figure
              key={id}
              suppressHydrationWarning
              role="button"
              tabIndex={0}
              onClick={createOpenHandler(setLightboxIndex, i)}
              onKeyDown={createKeyDownHandler(setLightboxIndex, i)}
              onMouseEnter={createPreloadHandler(src)}
              aria-label={`View ${title} in lightbox`}
              className="reveal group relative mb-6 break-inside-avoid overflow-hidden border border-white/5 bg-(--ink-iron) cursor-pointer focus-visible:outline-2 focus-visible:outline-(--blood-bright) focus-visible:outline-offset-2"
            >
              <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                loading="lazy"
                className="block w-full transition-transform duration-1200 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 text-(--bone-fade) group-hover:text-(--bone-paper) transition-colors text-lg">
                ⤢
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-linear-to-t from-black/85 via-black/40 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div>
                  <div className="display text-2xl leading-tight">{title}</div>
                  <div className="mono mt-1">{style}</div>
                </div>
                <div className="mono">{year}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-white/5 pt-10">
          <p className="serif-tight max-w-xl text-pretty text-xl text-(--bone-warm) md:text-2xl">
            {site.portfolioSection.ctaPrompt}
          </p>
          <CtaLink href="/#inquire" showArrow className="px-7 py-4">
            {site.portfolioSection.ctaLink}
          </CtaLink>
        </div>
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
