"use client";
import React from "react";

/**
 * Props :
 * - model: 'primary' | 'secondary' | 'valid' | 'info' | 'warning'
 * - size: 's' | 'm' | 'l'
 * - reverse: bool (optionnel)
 * - children: contenu du bouton
 * - onClick: fonction de callback
 * - className: classes CSS additionnelles
 * - style: style inline additionnel
 * - ...props: props natifs (aria-*, tabIndex, ref, etc.)
 */
const Button = React.forwardRef(({ 
  model = 'primary', 
  size = 'm', 
  reverse = false, 
  children, 
  onClick, 
  className = '', 
  style = {}, 
  disabled = false,
  ...props 
}, ref) => {
  const classNames = [
    'ui-button',
    model,
    size,
    reverse ? 'reverse' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      ref={ref} 
      className={classNames} 
      style={style} 
      onClick={onClick} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
export { Button }; 