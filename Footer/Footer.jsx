"use client";
import React from "react";
<<<<<<< HEAD
=======
import styles from './Footer.module.scss';
>>>>>>> 88b103b1a3a143a75fa63cbe205807c38b1f55ad

/**
 * Props :
 * - children: contenu du footer (liens, logos, etc.)
 * - className: classes CSS additionnelles
 * - style: style inline additionnel
 * - ...props: props natifs (aria-*, tabIndex, ref, etc.)
 */
const Footer = React.forwardRef(({ children, className = '', style = {}, ...props }, ref) => {
  return (
    <footer ref={ref} className={`${styles['lib-footer']} ${className}`} style={style} {...props}>
      {children}
    </footer>
  );
});
Footer.displayName = 'Footer';
export { Footer }; 