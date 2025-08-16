"use client";
import React from "react";

/**
 * Props :
 * - children : contenu de la carte
 * - className : classes CSS additionnelles
 * - style : style inline additionnel
 * - ...props: props natifs (aria-*, tabIndex, ref, etc.)
 */
const Card = ({ children, className = '', style = {}, 'aria-label': ariaLabel, ...props }) => (
  <div className={`ui-card ${className}`} style={style} aria-label={ariaLabel} {...props}>
    {children}
  </div>
);

export { Card }; 