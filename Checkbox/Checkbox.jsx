"use client";
import React from "react";

const Checkbox = ({ checked, onChange, label, className = '', disabled = false, 'aria-label': ariaLabel, ...props }) => (
  <label className={`ui-checkbox ${className}`}>
    <input 
      type="checkbox" 
      checked={checked} 
      onChange={onChange} 
      disabled={disabled}
      aria-label={ariaLabel}
      {...props} 
    />
    {label && <span>{label}</span>}
  </label>
);

export { Checkbox }; 