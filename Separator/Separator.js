"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from "react";
const Separator = ({
  className = '',
  style = {},
  'aria-label': ariaLabel,
  ...props
}) => /*#__PURE__*/React.createElement("hr", _extends({
  className: `ui-separator ${className}`,
  style: style,
  "aria-label": ariaLabel
}, props));
export { Separator };