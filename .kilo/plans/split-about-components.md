# Split about.tsx into components

## Target
Split `src/routes/about.tsx` (180 lines, 2 components in 1 file) into:
- `src/components/AboutChapterText.tsx` — chapter number + title + body text
- `src/components/AboutChapter.tsx` — single chapter section (handles image/no-image layout variants)
- `src/routes/about.tsx` — route-only, imports both

## Current violations
- Code standards: one component per file (breaking for `ChapterText` inline in route file)
- Type extraction: `BodyContent`, `Chapter`, `ChapterTextProps` defined inline in route file

## Files to create

### 1. `src/components/AboutChapterText.tsx`
Extract `ChapterText` + all related types. This is the "pure text" part: chapter number, title, and optional body.

```tsx
import { type ReactNode } from "react";
import { FormattedText } from "~/components/FormattedText";

type BodyContent = string | ({ text: string; href?: string; bold?: boolean } | string)[];

type Chapter = {
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

export { type Chapter, type BodyContent };

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
```

### 2. `src/components/AboutChapter.tsx`
Chapter section wrapper — handles the grid layout and image placement. Three variants:
- **With image (right)**: text left, image right
- **With image (left)**: image left, text right
- **No image (compact)**: numbering sidebar + full body

Props:
```
type AboutChapterProps = {
  chapter: Chapter;
  chapterNumber: number;
  totalChapters: string;
};
```

Logic: reads `chapter.image`, `chapter.imageSide`, `chapter.imageAlt` to decide layout.

```tsx
import { type ReactNode } from "react";
import { AboutChapterText, type Chapter } from "~/components/AboutChapterText";

type AboutChapterProps = {
  chapter: Chapter;
  chapterNumber: number;
  totalChapters: string;
};

export const AboutChapter = ({ chapter, chapterNumber, totalChapters }: AboutChapterProps): ReactNode => {
  const { image, imageSide } = chapter;
  const imageAlt = chapter.imageAlt ?? chapter.title;

  if (!image) {
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
  }

  const isRight = imageSide === "right";

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
            <img src={image} alt={imageAlt} loading="lazy" className="w-full object-cover" />
          </figure>
        </>
      ) : (
        <>
          <figure className="order-last md:order-0 md:col-span-6 md:col-start-1">
            <img src={image} alt={imageAlt} loading="lazy" className="w-full object-cover" />
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
```

Note: `AboutChapter` needs `FormattedText` import for the no-image variant body text. This is because `compact` mode in `AboutChapterText` skips body rendering, so body goes in the main column instead.

### 3. `src/routes/about.tsx` (modified)
Strips out `ChapterText`, `Chapter`, `ChapterTextProps`, `BodyContent` types. Imports `AboutChapterText` and `AboutChapter`. Keeps only route-level logic: data loading, first chapter special case, CTA footer.

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import about from "@content/about.json";
import site from "@content/site.json";
import { PageHeader } from "~/components/PageHeader";
import { CarvedDivider } from "~/components/CarvedDivider";
import { CtaLink } from "~/components/CtaLink";
import { scrollToHash } from "~/lib/scroll-to-hash";
import { AboutChapterText, type Chapter } from "~/components/AboutChapterText";
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
          <section className="reveal grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10">
            <figure className="md:col-span-6">
              <img
                src="/images/about/mugshot.jpg"
                alt="Tomasz Górnicki — tattoo artist at Der Grimm Tattoo, Berlin"
                width={956}
                height={965}
                className="w-full object-cover"
              />
            </figure>
            <div className="md:col-span-6 md:col-start-7">
              <AboutChapterText
                chapterNumber={1}
                totalChapters={totalStr}
                chapter={chapters[0]!}
              />
            </div>
          </section>
        </div>

        <div className="mx-auto mt-16 max-w-350 px-6 md:px-10 flex flex-col gap-16">
          {chapters.slice(1).map((ch, i) => (
            <AboutChapter
              key={ch.title}
              chapter={ch}
              chapterNumber={i + 2}
              totalChapters={totalStr}
            />
          ))}
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
```

### Prop naming notes
- `chNum` → `chapterNumber` (comply with code-standards: no abbreviated variable names)
- `total` → `totalChapters` (descriptive)

## Edge cases
- `chapters[0]!` non-null assertion on first chapter — this is in the data, but if JSON has empty array, this crashes. Add a null guard or keep as-is (current behavior unchanged).
- Chapter 1 mugshot section is NOT wrapped in `AboutChapter` because the mugshot image isn't sourced from `chapter.image` — it's the static `/images/about/mugshot.jpg`. This is intentional.

## Files changed
- **NEW**: `src/components/AboutChapterText.tsx` — component + shared types (`Chapter`, `BodyContent`)
- **NEW**: `src/components/AboutChapter.tsx` — chapter section wrapper
- **MODIFIED**: `src/routes/about.tsx` — route only, imports new components

## Compatibility check
- No changes to `aftercare.tsx` — it doesn't use `ChapterText`, `Chapter`, or any types from `about.tsx`
- No changes to `about.json` content
- User-facing output identical (same DOM, same classes, same data)

## Verification
```bash
bun run typecheck   # ensure no import/type errors
bun run lint        # ensure no violations
bun run build       # ensure prerender still works
```
