"use client";
import React from 'react';
import styles from './Loader.module.scss';

const Loader = ({ size = 32, color, className = '', style = {}, 'aria-label': ariaLabel = 'Chargement...', ...props }) => (
  <span
    className={`${styles.loader} ${className}`}
    style={{ width: size, height: size, borderColor: color, ...style }}
    role="status"
    aria-label={ariaLabel}
    {...props}
  />
);

export default Loader; 