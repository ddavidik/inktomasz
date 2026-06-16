import site from "@content/site.json";
import { CtaLink } from "~/components/CtaLink";
import { scrollToHash } from "~/utils/scrollToHash";
import { TextLink } from "~/components/TextLink";
import { renderHeroTitle } from "~/utils/heroTitle";

const scrollToPortfolio = () => scrollToHash("portfolio");

export const Hero = () => (
  <section className="relative isolate flex min-h-svh items-end overflow-hidden pt-40 md:items-end">
    {/* background runic ornament */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-below flex items-center justify-center"
    >
      <div className="display flicker select-none text-[40vw] leading-none text-(--bone-paper)/6 md:text-[28vw]">
        ᛏ
      </div>
    </div>

    {/* decorative side runes */}
    <div
      aria-hidden
      className="mono pointer-events-none absolute left-3 top-32 flex flex-col gap-2 text-[7px] tracking-[0.5em] text-(--bone-fade) md:left-6 md:gap-3 md:text-[10px] md:tracking-[0.6em]"
    >
      <span>ᚠ</span>
      <span>ᚢ</span>
      <span>ᚦ</span>
      <span>ᚨ</span>
      <span>ᚱ</span>
    </div>
    <div
      aria-hidden
      className="mono pointer-events-none absolute right-3 top-40 flex flex-col gap-2 text-[7px] tracking-[0.5em] text-(--bone-fade) md:right-6 md:gap-3 md:text-[10px] md:tracking-[0.6em]"
    >
      <span>ᚾ 52.56°</span>
      <span>·</span>
      <span>ᛖ 13.46°</span>
    </div>

    {/* vignette overlay */}
    <div aria-hidden className="hero-vignette absolute inset-0 z-below" />

    <div className="mx-auto w-full max-w-350 px-6 pb-20 md:px-10 md:pb-32">
      <p className="mono mb-6 text-(--blood-bright)">ᛟ &nbsp; {site.hero.kicker}</p>
      <h1 className="display text-balance text-[14vw] leading-[0.9] md:text-[clamp(5rem,9vw,11rem)]">
        {renderHeroTitle(site.hero.titleSegments)}
      </h1>
      <div className="mt-10 grid gap-8 md:grid-cols-12">
        <p className="serif-tight col-span-12 max-w-2xl text-pretty text-xl leading-snug text-(--bone-paper) md:col-span-7 md:text-2xl pr-2">
          {site.hero.subtitle}
        </p>
      </div>
      <div className="mt-10 flex flex-col items-start gap-4 md:flex-row md:flex-wrap md:items-center md:gap-6">
        <CtaLink href="/#inquire" showArrow className="px-7 py-4">
          {site.hero.cta}
        </CtaLink>
        <span className="mono text-(--bone-fade)">{site.hero.ctaAlt}</span>
        <TextLink href="/#portfolio" onClick={scrollToPortfolio}>
          {site.hero.ctaSecondary}
        </TextLink>
      </div>
    </div>

    {/* scroll cue */}
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-(--bone-fade)"
    >
      <div className="mx-auto h-12 w-px bg-linear-to-b from-transparent via-(--bone-fade) to-transparent" />
    </div>
  </section>
);
