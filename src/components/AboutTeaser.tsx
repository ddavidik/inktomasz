import about from "@content/about.json";

export const AboutTeaser = () => (
  <section id="about" className="relative border-t border-white/5 py-28 md:py-40">
    <div className="mx-auto grid max-w-350 gap-12 px-6 md:grid-cols-12 md:px-10">
      <div className="md:col-span-4">
        <p className="mono mb-6 text-(--bone-fade)">
          ᛁ &nbsp; About
        </p>
        <h2 className="display reveal text-5xl leading-[0.95] md:text-7xl">
          {about.teaser.heading}
        </h2>
      </div>
      <div className="md:col-span-7 md:col-start-6">
        <p className="serif-tight reveal text-pretty text-2xl leading-snug text-(--bone-warm) md:text-3xl">
          {about.teaser.lead}
        </p>
        <a
          href="/about"
          className="mono group mt-10 inline-flex items-center gap-3 border-b border-(--bone-fade) pb-2 text-(--bone-paper) transition-colors hover:border-(--blood-bright) hover:text-(--blood-bright)"
        >
          Read the full story
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </div>
  </section>
);
