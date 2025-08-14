"use client";
import React from "react";
import './Card.module.scss';

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