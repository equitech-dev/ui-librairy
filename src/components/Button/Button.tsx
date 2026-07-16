"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonModel =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "error";

export type ButtonSize = "s" | "m" | "l" | "xl";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Modèle de couleur EQUITECH. */
  model?: ButtonModel;
  /** Taille du bouton. */
  size?: ButtonSize;
  /** Inverse l'ordre icône / texte (flex-direction: row-reverse). */
  reverse?: boolean;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { model = "primary", size = "m", reverse = false, className = "", children, ...props },
  ref
) {
  const classNames = ["ui-button", model, size, reverse ? "reverse" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <button ref={ref} className={classNames} {...props}>
      {children}
    </button>
  );
});

Button.displayName = "Button";
