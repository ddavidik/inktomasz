import { BodyLink } from "~/components/BodyLink";

type TextSegmentObject = {
  text: string;
  href?: string;
  bold?: boolean;
};

type BodyContent = string | (string | TextSegmentObject)[];

export const FormattedText = ({ segments }: { segments: BodyContent | undefined }) => {
  if (typeof segments === "undefined") return null;
  if (typeof segments === "string") return <>{segments}</>;

  return (
    <>
      {segments.map((seg, i) => {
        if (typeof seg === "string") return <span key={i}>{seg}</span>;
        if (seg.href) {
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
