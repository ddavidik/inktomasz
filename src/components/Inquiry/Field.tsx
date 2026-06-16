import type { InputHTMLAttributes, InputEvent, DetailedHTMLProps } from "react";
import clsx from "clsx";
import { FormLabelWrapper } from "./FormLabelWrapper";

type Props = {
  label: string;
  error?: string;
  onInput?: (e: InputEvent<HTMLInputElement>) => void;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "onInput">;

export const Field = ({ label, error, onInput, type = "text", className, ...props }: Props) => (
  <FormLabelWrapper label={label} error={error}>
    <input
      type={type}
      onInput={onInput}
      className={clsx(
        "block w-full bg-transparent serif-tight pt-1 text-lg text-(--bone-paper) outline-none focus-visible:outline-2 focus-visible:outline-(--blood-bright) placeholder:text-(--bone-fade) scheme:dark",
        className,
      )}
      {...props}
    />
  </FormLabelWrapper>
);
