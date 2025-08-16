"use client";
import React from 'react';

const Alert = ({ type = 'info', children, className = '', style = {}, 'aria-label': ariaLabel, ...props }) => (
  <div
    className={`ui-alert ${type} ${className}`}
    style={style}
    role="alert"
    aria-label={ariaLabel}
    {...props}
  >
    {children}
  </div>
);

export default Alert; 