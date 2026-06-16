import testimonials from "@content/testimonials.json";
import site from "@content/site.json";
import { SectionHeader } from "~/components/SectionHeader";

export const Testimonials = () => (
  <section id="voices" className="relative scroll-mt-16 py-28 md:py-40">
    <div className="mx-auto max-w-350 px-6 md:px-10">
      <SectionHeader
        rune={site.testimonialsSection.rune}
        label={site.testimonialsSection.label}
        heading={testimonials.heading}
      />

      <div className="mt-16 grid gap-px bg-white/5 border border-white/5 md:grid-cols-3">
        {testimonials.items.map(({ quote, author }) => (
          <blockquote
            key={author}
            className="reveal flex flex-col gap-6 bg-(--ink-iron) p-8 md:p-10"
          >
            <span aria-hidden className="display text-5xl leading-none text-(--blood-bright)">
              "
            </span>
            <p className="serif-tight flex-1 text-pretty text-lg leading-relaxed text-(--bone-warm) md:text-xl">
              {quote}
            </p>
            <footer className="mono text-(--bone-fade)">{author}</footer>
          </blockquote>
        ))}
      </div>
    </div>
  </section>
);
