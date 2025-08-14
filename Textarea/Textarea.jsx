"use client";
import React from 'react';
import styles from './Textarea.module.scss';

const Textarea = React.forwardRef(({ value, onChange, placeholder, disabled, className = '', style = {}, 'aria-label': ariaLabel, ...props }, ref) => (
  <textarea
    ref={ref}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    className={`${styles.textarea} ${className}`}
    style={style}
    aria-label={ariaLabel}
    {...props}
  />
));

Textarea.displayName = 'Textarea';

export default Textarea; 