"use client";
import React, { useState } from 'react';

const Tooltip = ({ children, label, position = 'top', className = '', 'aria-label': ariaLabel, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="ui-wrapper"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      {...props}
    >
      {children}
      {isVisible && (
        <span className={`ui-tooltip ${position} ${className}`} role="tooltip" aria-label={ariaLabel || label}>
          {label}
        </span>
      )}
    </div>
  );
};

export default Tooltip; 