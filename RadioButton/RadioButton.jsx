"use client";
import React from "react";

const RadioButton = ({ checked, onChange, label, name, value, className = '', disabled = false, 'aria-label': ariaLabel, ...props }) => (
  <label className={`ui-radio ${className}`}>
    <input 
      type="radio" 
      checked={checked} 
      onChange={onChange} 
      name={name} 
      value={value}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props} 
    />
    {label && <span>{label}</span>}
  </label>
);

export { RadioButton }; 