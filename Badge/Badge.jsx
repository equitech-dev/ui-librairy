"use client";
import React from 'react';

const Badge = ({ type = 'default', children, className = '', 'aria-label': ariaLabel, ...props }) => (
  <span className={`ui-badge ${type} ${className}`} aria-label={ariaLabel} {...props}>
    {children}
  </span>
);

export default Badge; 