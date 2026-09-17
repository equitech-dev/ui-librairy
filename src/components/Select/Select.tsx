"use client";

import {
  Children,
  forwardRef,
  isValidElement,
  type ChangeEvent,
  type ReactNode,
  type Ref,
  type SelectHTMLAttributes,
} from "react";
import * as RadixSelect from "@radix-ui/react-select";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  italic?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size" | "onChange" | "value"> {
  options?: SelectOption[];
  placeholder?: string;
  value?: string | string[];
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  onValueChange?: (value: string) => void;
}

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

function optionsFromChildren(children: ReactNode): SelectOption[] {
  const out: SelectOption[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement(child) || child.type !== "option") return;
    const props = child.props as {
      value?: string | number;
      children?: ReactNode;
      disabled?: boolean;
      style?: { fontStyle?: string };
    };
    out.push({
      value: String(props.value ?? ""),
      label: String(props.children ?? props.value ?? ""),
      disabled: props.disabled,
      italic: props.style?.fontStyle === "italic",
    });
  });
  return out;
}

function ChevronIcon() {
  return (
    <svg className="ui-select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function emitChange(
  onChange: SelectProps["onChange"],
  onValueChange: SelectProps["onValueChange"],
  next: string,
  name?: string,
) {
  onValueChange?.(next);
  if (!onChange) return;
  onChange({
    target: { value: next, name: name ?? "" },
    currentTarget: { value: next, name: name ?? "" },
  } as ChangeEvent<HTMLSelectElement>);
}

export const Select = forwardRef<HTMLButtonElement | HTMLSelectElement, SelectProps>(function Select(
  {
    className = "",
    options,
    placeholder,
    children,
    value,
    defaultValue,
    onChange,
    onValueChange,
    disabled,
    multiple,
    name,
    id,
    required,
    ...props
  },
  ref,
) {
  const items = options && options.length > 0 ? options : optionsFromChildren(children);

  if (multiple) {
    return (
      <select
        ref={ref as Ref<HTMLSelectElement>}
        id={id}
        name={name}
        className={cx("ui-select", "ui-select--native", className)}
        disabled={disabled}
        multiple
        required={required}
        value={value}
        onChange={onChange}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {items.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  const stringValue = Array.isArray(value) ? value[0] : value;
  const current = stringValue === "" || stringValue === undefined ? undefined : stringValue;
  const defaultString = typeof defaultValue === "string" && defaultValue !== "" ? defaultValue : undefined;

  return (
    <RadixSelect.Root
      value={current}
      defaultValue={defaultString}
      onValueChange={(next) => emitChange(onChange, onValueChange, next, name)}
      disabled={disabled}
      name={name}
      required={required}
    >
      <RadixSelect.Trigger
        ref={ref as Ref<HTMLButtonElement>}
        id={id}
        className={cx("ui-select", className)}
        aria-required={required || undefined}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className="ui-select-icon">
          <ChevronIcon />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className="ui-select-content" position="popper" sideOffset={4} collisionPadding={12}>
          <RadixSelect.Viewport className="ui-select-viewport">
            {items.map((option) => (
              <RadixSelect.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className={cx("ui-select-item", option.italic && "ui-select-item--italic")}
              >
                <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
});

Select.displayName = "Select";
