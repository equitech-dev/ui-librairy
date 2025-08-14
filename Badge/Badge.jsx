"use client";
import React from 'react';

const Badge = ({ label, type = 'default', className = '', style = {}, 'aria-label': ariaLabel, ...props }) => (
  <span
    className={`${styles.badge} ${styles[type]} ${className}`}
    style={style}
    aria-label={ariaLabel || label}
    {...props}
  >
    {label}
  </span>
);

export default Badge; 