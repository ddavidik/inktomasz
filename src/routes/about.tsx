import { createFileRoute, Link } from "@tanstack/react-router";
import about from "@content/about.json";
import site from "@content/site.json";
import { PageHeader } from "~/components/PageHeader";
import { CarvedDivider } from "~/components/CarvedDivider";
import { CtaLink } from "~/components/CtaLink";
import { scrollToHash } from "~/lib/scroll-to-hash";
import { type Chapter } from "~/components/AboutChapterText";
import { AboutChapter } from "~/components/AboutChapter";

const scrollToPortfolio = () => scrollToHash("portfolio");

const AboutPage = () => {
  const chapters = about.full.chapters as Chapter[];
  const totalStr = String(chapters.length).padStart(2, "0");

  return (
    <>
      <article className="pt-40 pb-32">
        <PageHeader
          rune="ᛁ"
          label="About"
          heading={
            <>
              The hand
              <br />
              <span className="italic">behind</span> the needle.
            </>
          }
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
              Start an inquiry
            </CtaLink>
            <span className="mono text-(--bone-fade)">or</span>
            <Link
              to="/"
              hash="portfolio"
              onClick={scrollToPortfolio}
              className="mono group inline-flex items-center gap-3 border-b border-(--bone-fade) pb-2 text-(--bone-paper) transition-colors hover:border-(--blood-bright) hover:text-(--blood-bright)"
            >
              Browse the work
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
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
