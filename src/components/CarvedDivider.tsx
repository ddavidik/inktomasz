import clsx from "clsx";

type CarvedDividerProps = {
  className?: string;
};

export const CarvedDivider = ({ className }: CarvedDividerProps) => (
  <div className={clsx("carved-divider mx-auto max-w-350", className)} />
);
