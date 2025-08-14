"use client";
import React from "react";
import styles from './Section.module.scss';

/**
 * Props :
 * - children: contenu de la section
 * - className: classes CSS additionnelles
 * - style: style inline additionnel
 * - ...props: props natifs (aria-*, tabIndex, ref, etc.)
 */
const Section = React.forwardRef(({ children, className = '', style = {}, ...props }, ref) => {
  return (
    <section ref={ref} className={`${styles['lib-section']} ${className}`} style={style} {...props}>
      {children}
    </section>
  );
});
Section.displayName = 'Section';
export { Section }; 