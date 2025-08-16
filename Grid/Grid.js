"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from "react";
/**
 * Props :
 * - children : éléments à afficher dans la grille
 * - className : classes CSS additionnelles
 * - style : style inline additionnel
 * - ...props: props natifs (aria-*, tabIndex, ref, etc.)
 */
const Grid = ({
  children,
  className = '',
  style = {},
  'aria-label': ariaLabel,
  ...props
}) => /*#__PURE__*/React.createElement("div", _extends({
  className: `ui-grid ${className}`,
  style: style,
  "aria-label": ariaLabel
}, props), children);
export { Grid };