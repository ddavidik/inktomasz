import { type ReactNode } from "react";
import clsx from "clsx";
import { ctaBaseClass } from "~/utils/ctaStyles";
import { CtaArrow } from "~/components/CtaArrow";

type CtaButtonProps = {
  type: "submit" | "button" | "reset";
  disabled?: boolean;
  children: ReactNode;
  showArrow?: boolean;
  className?: string;
  onClick?: () => void;
};

export const CtaButton = ({
  type,
  disabled,
  children,
  showArrow = false,
  onClick,
  className = "",
}: CtaButtonProps): ReactNode => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={clsx(
      ctaBaseClass,
      "cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
      className,
    )}
  >
    {children}
    {showArrow && <CtaArrow />}
  </button>
);
