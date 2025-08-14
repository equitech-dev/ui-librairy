"use client";
import React from 'react';
<<<<<<< HEAD
=======
import styles from './Badge.module.scss';
>>>>>>> 88b103b1a3a143a75fa63cbe205807c38b1f55ad

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