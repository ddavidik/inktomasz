import type { InputHTMLAttributes } from "react";
import type { DetailedHTMLProps } from "react";

type Props = {
  label: string;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "onChange">;

export const Field = ({ label, type = "text", className, ...props }: Props) => (
  <label className="block bg-(--ink-iron) px-5 pt-4 pb-3 focus-within:bg-(--ink-stone)">
    <span className="mono block text-[10px] text-(--bone-fade)">{label}</span>
    <input
      type={type}
      className={`block w-full bg-transparent serif-tight pt-1 text-lg text-(--bone-paper) outline-none placeholder:text-(--bone-fade) scheme:dark ${className}`}
      {...props}
    />
  </label>
);
