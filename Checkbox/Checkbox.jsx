"use client";
import React from "react";
import './Checkbox.module.scss';

/**
 * Props :
 * - checked : booléen, état de la case
 * - onChange : callback de changement
 * - label : texte du label (optionnel)
 * - className : classes CSS additionnelles
 * - style : style inline additionnel
 * - ...props: props natifs (aria-*, tabIndex, ref, etc.)
 */
const Checkbox = React.forwardRef(({ checked, onChange, label, className = '', style = {}, ...props }, ref) => (
  <label className={`checkbox_container ${className}`} style={style}>
    <input ref={ref} type="checkbox" checked={checked} onChange={onChange} {...props} />
    {label && <span>{label}</span>}
  </label>
));
Checkbox.displayName = 'Checkbox';
export { Checkbox }; 