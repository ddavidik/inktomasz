import { type ReactNode } from "react";
import { FormattedText } from "~/components/FormattedText";
import { AboutChapterText, type Chapter } from "~/components/AboutChapterText";

type AboutChapterProps = {
  chapter: Chapter;
  chapterNumber: number;
  totalChapters: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageSide?: string;
  loading?: "lazy" | "eager";
};

const handleLoad = (loading: "lazy" | "eager" | undefined) =>
  loading === "eager" ? undefined : "lazy";

export const AboutChapter = ({
  chapter,
  chapterNumber,
  totalChapters,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  imageSide,
  loading = "lazy",
}: AboutChapterProps): ReactNode => {
  const hasImage = Boolean(imageSrc);
  const alt = imageAlt ?? imageSrc ?? chapter.imageAlt ?? chapter.title;
  const isRight = (imageSide ?? chapter.imageSide) === "right";
  const lazyLoad = handleLoad(loading);

  if (!hasImage)
    return (
      <section className="reveal grid grid-cols-12 gap-6 md:gap-10">
        <div className="col-span-12 md:col-span-3">
          <AboutChapterText
            chapterNumber={chapterNumber}
            totalChapters={totalChapters}
            chapter={chapter}
            compact
          />
        </div>
        <div className="col-span-12 min-w-0 md:col-span-8 md:col-start-5">
          <p className="serif-tight wrap-break-word text-pretty text-xl leading-relaxed text-(--bone-warm) md:text-2xl">
            <FormattedText segments={chapter.body} />
          </p>
        </div>
      </section>
    );

  return (
    <section className="reveal grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10">
      {isRight ? (
        <>
          <div className="md:col-span-6">
            <AboutChapterText
              chapterNumber={chapterNumber}
              totalChapters={totalChapters}
              chapter={chapter}
            />
          </div>
          <figure className="md:col-span-6 md:col-start-7">
            <img
              src={imageSrc}
              alt={alt}
              width={imageWidth}
              height={imageHeight}
              loading={lazyLoad}
              className="w-full object-cover"
            />
          </figure>
        </>
      ) : (
        <>
          <figure className="order-last md:order-0 md:col-span-6 md:col-start-1">
            <img
              src={imageSrc}
              alt={alt}
              width={imageWidth}
              height={imageHeight}
              loading={lazyLoad}
              className="w-full object-cover"
            />
          </figure>
          <div className="md:col-span-6 md:col-start-7">
            <AboutChapterText
              chapterNumber={chapterNumber}
              totalChapters={totalChapters}
              chapter={chapter}
            />
          </div>
        </>
      )}
    </section>
  );
};
