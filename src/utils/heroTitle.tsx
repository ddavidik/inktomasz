import { Fragment, type ReactNode } from "react";

type HeroTitleSegment = { text: string; italic?: boolean; underline?: boolean; br?: boolean };

export type HeroTitle = readonly HeroTitleSegment[];

export const renderHeroTitle = (segments: HeroTitle): ReactNode => (
  <>
    {segments.map((seg, i) => {
      const inner = seg.br ? (
        <Fragment key={i}>
          {seg.text}
          <br />
        </Fragment>
      ) : null;

      if (seg.underline) {
        return (
          <span key={i} className="relative">
            {inner ?? seg.text}
            <span aria-hidden className="absolute -bottom-0.5 left-0 h-1 w-full bg-(--blood)" />
          </span>
        );
      }

      if (seg.italic) {
        return (
          <span key={i} className="italic">
            {inner ?? seg.text}
          </span>
        );
      }

      if (seg.br) {
        return inner;
      }

      return <Fragment key={i}>{seg.text}</Fragment>;
    })}
  </>
);
