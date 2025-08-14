"use client";
import React from "react";

/**
 * Props :
 * - checked : booléen, état du bouton
 * - onChange : callback de changement
 * - label : texte du label (optionnel)
 * - name : nom du groupe radio
 * - value : valeur du bouton
 * - className : classes CSS additionnelles
 * - style : style inline additionnel
 * - ...props: props natifs (aria-*, tabIndex, ref, etc.)
 */
const RadioButton = React.forwardRef(({ checked, onChange, label, name, value, className = '', style = {}, ...props }, ref) => (
  <label className={`radio_container ${className}`} style={style}>
    <input ref={ref} type="radio" checked={checked} onChange={onChange} name={name} value={value} {...props} />
    {label && <span>{label}</span>}
  </label>
));
RadioButton.displayName = 'RadioButton';
export { RadioButton }; 