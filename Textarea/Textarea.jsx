"use client";
import React from 'react';

const Textarea = ({ value, onChange, placeholder, rows = 4, className = '', disabled = false, 'aria-label': ariaLabel, ...props }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className={`ui-textarea ${className}`}
    disabled={disabled}
    aria-label={ariaLabel}
    {...props}
  />
);

export default Textarea; 