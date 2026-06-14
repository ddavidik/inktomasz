import type { TextareaHTMLAttributes, ChangeEvent, FormEvent, DetailedHTMLProps } from "react";
import clsx from "clsx";

type Props = {
  label: string;
  rows?: number;
  error?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onInput?: (e: FormEvent<HTMLTextAreaElement>) => void;
} & Omit<
  DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
  "onChange" | "onInput"
>;

export const Textarea = ({ label, error, rows = 5, className, ...props }: Props) => (
  <label
    className={clsx(
      "block bg-(--ink-iron) px-5 pt-4 pb-3 focus-within:bg-(--ink-stone) border-l-2",
      error ? "border-(--blood-bright)" : "border-transparent",
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
    <textarea
      rows={rows}
      className={clsx(
        "block w-full resize-none bg-transparent serif-tight pt-1 text-lg text-(--bone-paper) outline-none focus-visible:outline-2 focus-visible:outline-(--blood-bright) placeholder:text-(--bone-fade)",
        className,
      )}
      {...props}
    />
  </label>
);
