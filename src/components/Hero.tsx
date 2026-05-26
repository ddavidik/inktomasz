import site from "@content/site.json";

export const Hero = () => (
  <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden pt-24">
    {/* background runic ornament */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
    >
      <div className="display flicker select-none text-[40vw] leading-none text-(--bone-paper)/[0.035] md:text-[28vw]">
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
      <span>N 54°</span>
      <span>·</span>
      <span>E 18°</span>
    </div>

    {/* vignette overlay */}
    <div aria-hidden className="hero-vignette absolute inset-0 -z-10" />

    <div className="mx-auto w-full max-w-350 px-6 pb-20 md:px-10 md:pb-32">
      <p className="mono mb-6 text-(--blood-bright)">
        ᛟ &nbsp; {site.hero.kicker}
      </p>
      <h1 className="display text-balance text-[14vw] leading-[0.9] md:text-[clamp(5rem,9vw,11rem)]">
        Marks
        <br />
        <span className="italic">of the</span>{" "}
        <span className="relative">
          North
          <span
            aria-hidden
            className="absolute -bottom-2 left-0 h-1 w-full bg-(--blood)"
          />
        </span>
        .
      </h1>
      <div className="mt-10 grid gap-8 md:grid-cols-12">
        <p className="serif-tight col-span-12 max-w-2xl text-pretty text-xl leading-snug text-(--bone-warm) md:col-span-7 md:text-2xl">
          {site.hero.subtitle}
        </p>
        <div className="col-span-12 flex flex-wrap items-center gap-5 md:col-span-5 md:justify-end">
          <a
            href="/#inquire"
            className="group relative inline-flex items-center gap-3 border border-(--bone-paper)/30 px-7 py-4 mono text-(--bone-paper) transition-colors hover:border-(--blood-bright) hover:text-(--blood-bright)"
          >
            <span>{site.hero.cta}</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="/#portfolio"
            className="mono link-underline text-(--bone-warm)"
          >
            See the work
          </a>
        </div>
      </div>
    </div>

    {/* scroll cue */}
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-(--bone-fade)"
    >
      <div className="mx-auto h-12 w-px bg-gradient-to-b from-transparent via-(--bone-fade) to-transparent" />
    </div>
  </section>
);
