"use client";

import React from 'react';

const Input = ({ type = 'text', value, onChange, placeholder, className = '', disabled = false, 'aria-label': ariaLabel, ...props }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`ui-input ${className}`}
    disabled={disabled}
    aria-label={ariaLabel}
    {...props}
  />
);

export default Input; 