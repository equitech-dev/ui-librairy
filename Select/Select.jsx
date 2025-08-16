"use client";
import React from 'react';

const Select = ({ options = [], value, onChange, placeholder = 'Sélectionner...', className = '', disabled = false, 'aria-label': ariaLabel, ...props }) => (
  <select
    value={value}
    onChange={onChange}
    className={`ui-select ${className}`}
    disabled={disabled}
    aria-label={ariaLabel}
    {...props}
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map((option, index) => (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default Select; 