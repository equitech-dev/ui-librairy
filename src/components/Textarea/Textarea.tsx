"use client";

import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { rows = 4, className = "", ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={["ui-textarea", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
