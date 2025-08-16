"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
const Button = /*#__PURE__*/React.forwardRef(({
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
  const classNames = ['ui-button', model, size, reverse ? 'reverse' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    ref: ref,
    className: classNames,
    style: style,
    onClick: onClick,
    disabled: disabled
  }, props), children);
});
Button.displayName = 'Button';
export { Button };