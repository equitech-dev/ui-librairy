"use client";
import React from "react";

/**
 * Props :
 * - children: contenu de la section
 * - className: classes CSS additionnelles
 * - style: style inline additionnel
 * - ...props: props natifs (aria-*, tabIndex, ref, etc.)
 */
const Section = ({ children, className = '', style = {}, 'aria-label': ariaLabel, ...props }) => {
  return (
    <section className={`ui-section ${className}`} style={style} aria-label={ariaLabel} {...props}>
      {children}
    </section>
  );
};

export { Section }; 