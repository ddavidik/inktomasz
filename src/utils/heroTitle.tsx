import { Fragment, type ReactNode } from "react";

type HeroTitleSegment = { text: string; italic?: boolean; underline?: boolean; br?: boolean };

export type HeroTitle = readonly HeroTitleSegment[];

export const renderHeroTitle = (segments: HeroTitle): ReactNode => (
  <>
    {segments.map((seg, i) => {
      let el: ReactNode = seg.text;

      if (seg.italic) el = <span className="italic">{el}</span>;
      if (seg.underline)
        el = (
          <span className="relative">
            {el}
            <span aria-hidden className="absolute -bottom-0.5 left-0 h-1 w-full bg-(--blood)" />
          </span>
        );

      return (
        <Fragment key={i}>
          {el}
          {seg.br && <br />}
        </Fragment>
      );
    })}
  </>
);
