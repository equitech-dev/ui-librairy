"use client";
import React from "react";
<<<<<<< HEAD
=======
import './Card.module.scss';
>>>>>>> 88b103b1a3a143a75fa63cbe205807c38b1f55ad

/**
 * Props :
 * - children : contenu de la carte
 * - className : classes CSS additionnelles
 * - style : style inline additionnel
 * - ...props: props natifs (aria-*, tabIndex, ref, etc.)
 */
const Card = React.forwardRef(({ children, className = '', style = {}, ...props }, ref) => (
  <div ref={ref} className={`card_container ${className}`} style={style} {...props}>
    {children}
  </div>
));
Card.displayName = 'Card';
export { Card }; 