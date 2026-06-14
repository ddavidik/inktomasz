import type { InputHTMLAttributes, FormEvent, DetailedHTMLProps } from "react";
import clsx from "clsx";

type Props = {
  label: string;
  error?: string;
  onInput?: (e: FormEvent<HTMLInputElement>) => void;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "onInput">;

export const Field = ({ label, error, onInput, type = "text", className, ...props }: Props) => (
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
    <input
      type={type}
      onInput={onInput}
      className={clsx(
        "block w-full bg-transparent serif-tight pt-1 text-lg text-(--bone-paper) outline-none focus-visible:outline-2 focus-visible:outline-(--blood-bright) placeholder:text-(--bone-fade) scheme:dark",
        className,
      )}
      {...props}
    />
  </label>
);
