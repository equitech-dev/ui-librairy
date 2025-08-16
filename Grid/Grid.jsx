"use client";
import React from "react";
/**
 * Props :
 * - children : éléments à afficher dans la grille
 * - className : classes CSS additionnelles
 * - style : style inline additionnel
 * - ...props: props natifs (aria-*, tabIndex, ref, etc.)
 */
const Grid = ({ children, className = '', style = {}, 'aria-label': ariaLabel, ...props }) => (
  <div className={`ui-grid ${className}`} style={style} aria-label={ariaLabel} {...props}>
    {children}
  </div>
);

export { Grid }; 