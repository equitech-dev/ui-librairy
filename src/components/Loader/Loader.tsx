"use client";

import { forwardRef, type HTMLAttributes } from "react";

export type LoaderSize = "s" | "m";

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  /** `s` 20px (boutons) · `m` 32px (page). */
  size?: LoaderSize;
  /** Texte visible à côté / sous le spinner. Sert aussi de nom accessible. */
  label?: string;
}

export const Loader = forwardRef<HTMLDivElement, LoaderProps>(function Loader(
  {
    size = "s",
    label,
    className = "",
    "aria-label": ariaLabel,
    "aria-hidden": ariaHidden,
    ...props
  },
  ref,
) {
  const hidden = ariaHidden === true || ariaHidden === "true";
  const classNames = [
    "ui-loader",
    size === "m" ? "ui-loader--m" : "ui-loader--s",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={ref}
      className={classNames}
      role={hidden ? undefined : "status"}
      aria-label={hidden || label ? undefined : (ariaLabel ?? "Chargement en cours...")}
      aria-hidden={ariaHidden}
      {...props}
    >
      <div className="ui-spinner" aria-hidden="true" />
      {label ? <span className="ui-loader-label">{label}</span> : null}
    </div>
  );
});

Loader.displayName = "Loader";
