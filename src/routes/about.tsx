import { createFileRoute } from "@tanstack/react-router";
import about from "@content/about.json";
import site from "@content/site.json";
import { PageHeader } from "~/components/PageHeader";
import { CarvedDivider } from "~/components/CarvedDivider";
import { CtaLink } from "~/components/CtaLink";
import { TextLink } from "~/components/TextLink";
import { AboutChapter } from "~/components/AboutChapter";

const AboutPage = () => {
  const chapters = about.full.chapters;
  const totalStr = String(chapters.length).padStart(2, "0");

  const headingSegments = about.page.headingSegments;
  const heading = (
    <>
      <span className="block leading-none">{headingSegments[0]!.text}</span>
      <span className="block italic leading-none mt-1 md:mt-0">{headingSegments[1]!.text}</span>
      <span className="block leading-none mt-1 md:mt-0">{headingSegments[2]!.text}</span>
    </>
  );

  return (
    <>
      <article className="pt-40 pb-32">
        <PageHeader
          rune={site.aboutPageSection.rune}
          label={site.aboutPageSection.label}
          heading={heading}
        />

        <CarvedDivider className="mt-24" />

        <div className="mx-auto mt-24 max-w-350 px-6 md:px-10">
          <AboutChapter
            chapter={chapters[0]!}
            chapterNumber={1}
            totalChapters={totalStr}
            imageSrc="/images/about/mugshot.jpg"
            imageAlt="Tomasz Górnicki — tattoo artist at Der Grimm Tattoo, Berlin"
            imageWidth={956}
            imageHeight={965}
            imageSide="left"
            loading="eager"
          />
        </div>

        <div className="mx-auto mt-16 max-w-350 px-6 md:px-10 flex flex-col gap-16">
          {chapters.slice(1).map((ch, i) => {
            const chapterNumber = i + 2;

            return (
              <AboutChapter
                key={ch.title}
                chapter={ch}
                chapterNumber={chapterNumber}
                totalChapters={totalStr}
                imageSrc={ch.image}
                imageAlt={ch.imageAlt}
                imageSide={ch.imageSide}
              />
            );
          })}
        </div>

        <div className="mx-auto mt-32 max-w-350 px-6 md:px-10">
          <div className="rune-rule mono">ᛟ</div>
          <div className="mt-12 flex flex-col items-start gap-4 md:flex-row md:flex-wrap md:items-center md:gap-6">
            <CtaLink href="/#inquire" showArrow className="px-7 py-4">
              {about.page.ctaLink}
            </CtaLink>
            <span className="mono text-(--bone-fade)">{about.page.ctaAlt}</span>
            <TextLink href="/#portfolio">{about.page.ctaSecondary}</TextLink>
          </div>
        </div>
      </article>
    </>
  );
};

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: site.seo.aboutTitle },
      {
        name: "description",
        content: site.seo.aboutDescription,
      },
    ],
  }),
});
