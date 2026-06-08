import about from "@content/about.json";
import { Link } from "@tanstack/react-router";
import { SectionHeader } from "~/components/SectionHeader";

export const AboutTeaser = () => (
  <section id="about" className="relative border-t border-white/5 py-28 md:py-40">
    <div className="mx-auto grid max-w-350 gap-12 px-6 md:grid-cols-12 md:px-10">
      <div className="md:col-span-4">
        <SectionHeader
          rune="ᛁ"
          label="About"
          heading={about.teaser.heading}
          headingClassName="reveal"
        />
      </div>
      <div className="md:col-span-7 md:col-start-6">
        <p className="serif-tight reveal text-pretty text-2xl leading-snug text-(--bone-warm) md:text-3xl">
          {about.teaser.lead}
        </p>
        <Link
          to="/about"
          className="mono group mt-10 inline-flex items-center gap-3 border-b border-(--bone-fade) pb-2 text-(--bone-paper) transition-colors hover:border-(--blood-bright) hover:text-(--blood-bright)"
        >
          Read the full story
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </div>
  </section>
);
