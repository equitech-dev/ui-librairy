"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from "react";
const Footer = ({
  children,
  className = '',
  style = {},
  'aria-label': ariaLabel,
  ...props
}) => {
  return /*#__PURE__*/React.createElement("footer", _extends({
    className: `ui-footer ${className}`,
    style: style,
    "aria-label": ariaLabel
  }, props), children);
};
export { Footer };