"use client";

import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";

export type BadgeType =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Variante visuelle du badge. */
  type?: BadgeType;
  children?: ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { type = "default", className = "", children, ...props },
  ref
) {
  const classNames = ["ui-badge", type, className].filter(Boolean).join(" ");

  return (
    <span ref={ref} className={classNames} {...props}>
      {children}
    </span>
  );
});

Badge.displayName = "Badge";
