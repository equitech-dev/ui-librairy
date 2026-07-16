"use client";

import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { type = "text", className = "", ...props },
  ref
) {
  return (
    <input
      ref={ref}
      type={type}
      className={["ui-input", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
});

Input.displayName = "Input";
