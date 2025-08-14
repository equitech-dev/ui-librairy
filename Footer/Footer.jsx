"use client";
import React from "react";
import styles from './Footer.module.scss';

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