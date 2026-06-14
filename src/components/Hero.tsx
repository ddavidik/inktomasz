import site from "@content/site.json";
import { Link } from "@tanstack/react-router";
import { CtaLink } from "~/components/CtaLink";
import { scrollToHash } from "~/lib/scroll-to-hash";

const scrollToPortfolio = () => scrollToHash("portfolio");

export const Hero = () => (
  <section className="relative isolate flex min-h-svh items-end overflow-hidden pt-40 md:items-end">
    {/* background runic ornament */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
    >
      <div className="display flicker select-none text-[40vw] leading-none text-(--bone-paper)/[0.06] md:text-[28vw]">
        ᛏ
      </div>
    </div>

    {/* decorative side runes */}
    <div
      aria-hidden
      className="mono pointer-events-none absolute left-6 top-32 hidden flex-col gap-3 text-[10px] tracking-[0.6em] text-(--bone-fade) md:flex"
    >
      <span>ᚠ</span>
      <span>ᚢ</span>
      <span>ᚦ</span>
      <span>ᚨ</span>
      <span>ᚱ</span>
    </div>
    <div
      aria-hidden
      className="mono pointer-events-none absolute right-6 top-40 hidden flex-col gap-3 text-[10px] tracking-[0.6em] text-(--bone-fade) md:flex"
    >
      <span>ᚾ 52.56°</span>
      <span>·</span>
      <span>ᛖ 13.46°</span>
    </div>

    {/* vignette overlay */}
    <div aria-hidden className="hero-vignette absolute inset-0 -z-10" />

    <div className="mx-auto w-full max-w-350 px-6 pb-20 md:px-10 md:pb-32">
      <p className="mono mb-6 text-(--blood-bright)">ᛟ &nbsp; {site.hero.kicker}</p>
      <h1 className="display text-balance text-[14vw] leading-[0.9] md:text-[clamp(5rem,9vw,11rem)]">
        Skin is the
        <br />
        <span className="italic">oldest</span>{" "}
        <span className="relative">
          canvas
          <span aria-hidden className="absolute -bottom-0.5 left-0 h-1 w-full bg-(--blood)" />
        </span>
        .
      </h1>
      <div className="mt-10 grid gap-8 md:grid-cols-12">
        <p className="serif-tight col-span-12 max-w-2xl text-pretty text-xl leading-snug text-(--bone-warm) md:col-span-7 md:text-2xl pr-2">
          {site.hero.subtitle}
        </p>
      </div>
      <div className="mt-10 flex flex-col items-start gap-4 md:flex-row md:flex-wrap md:items-center md:gap-6">
        <CtaLink href="/#inquire" showArrow className="px-7 py-4">
          Book a consultation
        </CtaLink>
        <span className="mono text-(--bone-fade)">or</span>
        <Link
          to="/"
          hash="portfolio"
          onClick={scrollToPortfolio}
          className="mono group inline-flex items-center gap-3 border-b border-(--bone-fade) pb-2 text-(--bone-paper) transition-colors hover:border-(--blood-bright) hover:text-(--blood-bright)"
        >
          See the work
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
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
