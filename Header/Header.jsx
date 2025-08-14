"use client";
import React from "react";
<<<<<<< HEAD
=======
import styles from './Header.module.scss';
>>>>>>> 88b103b1a3a143a75fa63cbe205807c38b1f55ad

/**
 * Props :
 * - children: contenu du header (logo, navigation, etc.)
 * - className: classes CSS additionnelles
 * - style: style inline additionnel
 * - ...props: props natifs (aria-*, tabIndex, ref, etc.)
 */
const Header = React.forwardRef(({ children, className = '', style = {}, ...props }, ref) => {
  return (
    <header ref={ref} className={`${styles['lib-header']} ${className}`} style={style} {...props}>
      {children}
    </header>
  );
});
Header.displayName = 'Header';
export { Header }; 