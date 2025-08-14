"use client";
import React from 'react';
<<<<<<< HEAD
=======
import styles from './Alert.module.scss';
>>>>>>> 88b103b1a3a143a75fa63cbe205807c38b1f55ad

const Alert = ({ type = 'info', children, className = '', style = {}, 'aria-label': ariaLabel, ...props }) => (
  <div
    className={`${styles.alert} ${styles[type]} ${className}`}
    style={style}
    role="alert"
    aria-label={ariaLabel}
    {...props}
  >
    {children}
  </div>
);

export default Alert; 