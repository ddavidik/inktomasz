import type { TextareaHTMLAttributes, ChangeEvent, DetailedHTMLProps } from "react";

type Props = {
  label: string;
  rows?: number;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
} & Omit<
  DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
  "onChange"
>;

export const Textarea = ({ label, rows = 5, className, ...props }: Props) => (
  <label className="block bg-(--ink-iron) px-5 pt-4 pb-3 focus-within:bg-(--ink-stone)">
    <span className="mono block text-[10px] text-(--bone-fade)">{label}</span>
    <textarea
      rows={rows}
      className={`block w-full resize-none bg-transparent serif-tight pt-1 text-lg text-(--bone-paper) outline-none placeholder:text-(--bone-fade) ${className}`}
      {...props}
    />
  </label>
);
