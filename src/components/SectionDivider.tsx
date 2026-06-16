type Props = { rune: string };

export const SectionDivider = ({ rune }: Props) => (
  <div className="w-full">
    <div className="mx-auto max-w-350 px-6 md:px-10">
      <div className="rune-rule mono">{rune}</div>
    </div>
  </div>
);
