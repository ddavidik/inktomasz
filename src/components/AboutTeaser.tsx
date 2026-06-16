import about from "@content/about.json";
import site from "@content/site.json";
import { SectionHeader } from "~/components/SectionHeader";
import { TextLink } from "~/components/TextLink";

export const AboutTeaser = () => {
  const segments = about.teaser.headingSegments;
  const heading = (
    <>
      <span className="block leading-none">{segments[0]!.text}</span>
      <span className="block italic leading-none mt-1 md:mt-0">{segments[1]!.text}</span>
      <span className="block leading-none mt-1 md:mt-0">{segments[2]!.text}</span>
    </>
  );

  return (
    <section id="about" className="relative scroll-mt-16 py-28 md:py-40">
      <div className="mx-auto grid max-w-350 gap-12 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <SectionHeader
            rune={site.aboutTeaserSection.rune}
            label={site.aboutTeaserSection.label}
            heading={heading}
            headingClassName="reveal"
          />
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <p className="serif-tight reveal text-pretty text-xl leading-snug text-(--bone-paper) md:text-2xl">
            {about.teaser.lead}
          </p>
          <div className="mt-10">
            <TextLink href="/about">{about.teaser.ctaLink}</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
};
