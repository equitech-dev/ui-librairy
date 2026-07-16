"use client";

import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className = "", children, ...props },
  ref
) {
  return (
    <div ref={ref} className={["ui-card", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
});

Card.displayName = "Card";
