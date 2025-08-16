"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
const Badge = ({
  type = 'default',
  children,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => /*#__PURE__*/React.createElement("span", _extends({
  className: `ui-badge ${type} ${className}`,
  "aria-label": ariaLabel
}, props), children);
export default Badge;