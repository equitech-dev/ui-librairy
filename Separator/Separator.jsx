"use client";
import React from "react";
import './Separator.module.scss';

/**
 * Props :
 * - className : classes CSS additionnelles
 * - style : style inline additionnel
 * - ...props: props natifs (aria-*, tabIndex, ref, etc.)
 */
const Separator = React.forwardRef(({ className = '', style = {}, ...props }, ref) => (
  <div ref={ref} className={`separator ${className}`} style={style} {...props} />
));
Separator.displayName = 'Separator';
export { Separator }; 