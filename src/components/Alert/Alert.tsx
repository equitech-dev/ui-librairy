"use client";

import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";

export type AlertType = "info" | "success" | "warning" | "error";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Variante sémantique de l'alerte. */
  type?: AlertType;
  children?: ReactNode;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { type = "info", className = "", children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      role="alert"
      className={["ui-alert", type, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
});

Alert.displayName = "Alert";
