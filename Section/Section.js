"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from "react";

/**
 * Props :
 * - children: contenu de la section
 * - className: classes CSS additionnelles
 * - style: style inline additionnel
 * - ...props: props natifs (aria-*, tabIndex, ref, etc.)
 */
const Section = ({
  children,
  className = '',
  style = {},
  'aria-label': ariaLabel,
  ...props
}) => {
  return /*#__PURE__*/React.createElement("section", _extends({
    className: `ui-section ${className}`,
    style: style,
    "aria-label": ariaLabel
  }, props), children);
};
export { Section };