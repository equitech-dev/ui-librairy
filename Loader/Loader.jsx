"use client";
import React from 'react';
<<<<<<< HEAD
=======
import styles from './Loader.module.scss';
>>>>>>> 88b103b1a3a143a75fa63cbe205807c38b1f55ad

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