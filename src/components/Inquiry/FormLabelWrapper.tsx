import type { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

export const FormLabelWrapper = ({ label, error, children, className }: Props) => (
  <label
    className={clsx(
      "block bg-(--ink-iron) px-5 pt-4 pb-3 focus-within:bg-(--ink-stone) border-l-2",
      error ? "border-(--blood-bright)" : "border-transparent",
      className,
    )}
  >
    <span
      className={clsx(
        "mono block text-[10px]",
        error ? "text-(--blood-bright)" : "text-(--bone-fade)",
      )}
    >
      {label}
    </span>
    {children}
  </label>
);
