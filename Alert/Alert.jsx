"use client";
import React from 'react';
import styles from './Alert.module.scss';

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