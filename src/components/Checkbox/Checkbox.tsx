"use client";

import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Libellé affiché à côté de la case. */
  label?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className = "", ...props },
  ref
) {
  return (
    <label className={["ui-checkbox", className].filter(Boolean).join(" ")}>
      <input ref={ref} type="checkbox" {...props} />
      {label && <span>{label}</span>}
    </label>
  );
});

Checkbox.displayName = "Checkbox";
