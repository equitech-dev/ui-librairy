"use client";
import React, { useState } from 'react';

const Tooltip = ({ label, children, position = 'top', className = '', style = {}, 'aria-label': ariaLabel, ...props }) => {
  const [visible, setVisible] = useState(false);
  return (
    <span
      className={styles.wrapper}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      tabIndex={0}
      style={style}
      {...props}
    >
      {children}
      {visible && (
        <span className={`${styles.tooltip} ${styles[position]} ${className}`} role="tooltip" aria-label={ariaLabel || label}>
          {label}
        </span>
      )}
    </span>
  );
};

export default Tooltip; 