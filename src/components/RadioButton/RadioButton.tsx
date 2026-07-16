"use client";

import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

export interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Libellé affiché à côté du bouton radio. */
  label?: ReactNode;
}

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(function RadioButton(
  { label, className = "", ...props },
  ref
) {
  return (
    <label className={["ui-radio", className].filter(Boolean).join(" ")}>
      <input ref={ref} type="radio" {...props} />
      {label && <span>{label}</span>}
    </label>
  );
});

RadioButton.displayName = "RadioButton";
