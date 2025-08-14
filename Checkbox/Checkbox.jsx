"use client";
import React from "react";
<<<<<<< HEAD
=======
import './Checkbox.module.scss';
>>>>>>> 88b103b1a3a143a75fa63cbe205807c38b1f55ad

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