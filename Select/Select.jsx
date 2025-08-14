"use client";
import React from 'react';
import styles from './Select.module.scss';

const Select = React.forwardRef(({ value, onChange, options = [], disabled, className = '', style = {}, 'aria-label': ariaLabel, ...props }, ref) => (
  <select
    ref={ref}
    value={value}
    onChange={onChange}
    disabled={disabled}
    className={`${styles.select} ${className}`}
    style={style}
    aria-label={ariaLabel}
    {...props}
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value} disabled={opt.disabled}>
        {opt.label}
      </option>
    ))}
  </select>
));

Select.displayName = 'Select';

export default Select; 