"use client";
import React from "react";
<<<<<<< HEAD
=======
import './Grid.module.scss';

>>>>>>> 88b103b1a3a143a75fa63cbe205807c38b1f55ad
/**
 * Props :
 * - children : éléments à afficher dans la grille
 * - className : classes CSS additionnelles
 * - style : style inline additionnel
 * - ...props: props natifs (aria-*, tabIndex, ref, etc.)
 */
const Grid = React.forwardRef(({ children, className = '', style = {}, ...props }, ref) => (
  <div ref={ref} className={`grid_container ${className}`} style={style} {...props}>
    {children}
  </div>
));
Grid.displayName = 'Grid';
export { Grid }; 