"use client";

import { useId } from "react";
import type { ChangeEvent, HTMLAttributes, ReactNode } from "react";

export type SwitchSize = "small" | "medium" | "large";
export type SwitchVariant = "default" | "success" | "warning" | "error" | "info";

export interface SwitchProps extends Omit<HTMLAttributes<HTMLLabelElement>, "onChange"> {
  checked?: boolean;
  /** Callback appelé avec l'état booléen puis l'évènement natif. */
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  label?: ReactNode;
  size?: SwitchSize;
  variant?: SwitchVariant;
  showIcons?: boolean;
  showText?: boolean;
  id?: string;
}

export const Switch = ({
  checked = false,
  onChange,
  disabled = false,
  label,
  size = "medium",
  variant = "default",
  showIcons = false,
  showText = false,
  className = "",
  id,
  ...props
}: SwitchProps) => {
  const generatedId = useId();
  const switchId = id ?? generatedId;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(event.target.checked, event);
    }
  };

  const labelClass = [
    "ui-switch",
    size,
    variant,
    showIcons ? "with-icons" : "",
    showText ? "with-text" : "",
    disabled ? "disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={labelClass} htmlFor={switchId} {...props}>
      <input
        id={switchId}
        type="checkbox"
        className="ui-switch-input"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        role="switch"
        aria-checked={checked}
      />
      <div className="ui-switch-track">
        <div className="ui-switch-thumb" />
      </div>
      {label && <span className="ui-switch-label">{label}</span>}
    </label>
  );
};

Switch.displayName = "Switch";
