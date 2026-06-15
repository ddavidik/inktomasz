import { BodyLink } from "~/components/BodyLink";

type TextSegmentLink = {
  text: string;
  href: string;
};

type TextSegmentBold = {
  text: string;
  bold: boolean;
};

type TextSegmentObject = TextSegmentLink | TextSegmentBold;

type BodyContent = string | (string | TextSegmentObject)[];

export type { BodyContent, TextSegmentObject, TextSegmentLink, TextSegmentBold };

export const FormattedText = ({ segments }: { segments: BodyContent | undefined }) => {
  if (typeof segments === "undefined") return null;
  if (typeof segments === "string") return <>{segments}</>;

  return (
    <>
      {segments.map((seg, i) => {
        if (typeof seg === "string") return <span key={i}>{seg}</span>;
        if ("href" in seg) {
          return (
            <BodyLink key={i} href={seg.href}>
              {seg.text}
            </BodyLink>
          );
        }
        if (seg.bold) {
          return (
            <strong key={i} className="font-bold text-(--bone-paper)">
              {seg.text}
            </strong>
          );
        }
        return <span key={i}>{seg.text}</span>;
      })}
    </>
  );
};
