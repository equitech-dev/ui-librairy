"use client";

import React from 'react';
import styles from './Input.module.scss';

const Input = React.forwardRef(({ type = 'text', value, onChange, placeholder, disabled, className = '', style = {}, 'aria-label': ariaLabel, ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    className={`${styles.input} ${className}`}
    style={style}
    aria-label={ariaLabel}
    {...props}
  />
));

Input.displayName = 'Input';

export default Input; 