import { type ReactNode } from "react";
import { FormattedText, type BodyContent } from "~/components/FormattedText";

type Chapter = {
  id?: string;
  title: string;
  body: BodyContent;
  image?: string;
  imageAlt?: string;
  imageSide?: string;
};

type AboutChapterTextProps = {
  chapterNumber: number;
  totalChapters: string;
  chapter: Chapter;
  compact?: boolean;
};

export { type Chapter };

export const AboutChapterText = ({
  chapterNumber,
  totalChapters,
  chapter,
  compact = false,
}: AboutChapterTextProps): ReactNode => (
  <>
    <div className="mono text-(--bone-fade)">
      {String(chapterNumber).padStart(2, "0")} / {totalChapters}
    </div>
    <h2 className="display mt-2 text-4xl md:text-5xl">{chapter.title}</h2>
    {!compact && (
      <p className="serif-tight mt-6 wrap-break-word text-pretty text-xl leading-relaxed text-(--bone-warm) md:text-2xl">
        <FormattedText segments={chapter.body} />
      </p>
    )}
  </>
);
