import portfolio from "@content/portfolio.json";
import site from "@content/site.json";
import { SectionHeader } from "~/components/SectionHeader";
import { CtaButton } from "~/components/CtaButton";

export const Portfolio = () => (
  <section
    id="portfolio"
    className="relative border-t border-white/5 bg-(--ink-pitch) py-28 md:py-40"
  >
    <div className="mx-auto max-w-350 px-6 md:px-10">
      <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionHeader rune="ᛉ" label="Portfolio" heading={portfolio.heading} />
        </div>
        <p className="max-w-md text-(--bone-warm)">
          {portfolio.lead}{" "}
          <a
            href={site.artist.instagram}
            target="_blank"
            rel="noreferrer"
            className="link-underline font-bold text-(--bone-paper)"
          >
            Instagram
          </a>
          .
        </p>
      </div>

      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:balance]">
        {portfolio.pieces.map((p) => (
          <figure
            key={p.id}
            className="reveal group relative mb-6 break-inside-avoid overflow-hidden border border-white/5 bg-(--ink-iron)"
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="block w-full transition-transform duration-1200 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-linear-to-t from-black/85 via-black/40 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div>
                <div className="display text-2xl leading-tight">{p.title}</div>
                <div className="mono mt-1">{p.style}</div>
              </div>
              <div className="mono">{p.year}</div>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-white/5 pt-10">
        <p className="serif-tight max-w-xl text-pretty text-xl text-(--bone-warm) md:text-2xl">
          Seen something that speaks to you?
        </p>
        <CtaButton href="/#inquire" showArrow className="px-7 py-4">
          {site.hero.cta}
        </CtaButton>
      </div>
    </div>
  </section>
);
