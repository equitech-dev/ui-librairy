"use client";
import React from "react";

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