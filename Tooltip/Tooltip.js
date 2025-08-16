"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useState } from 'react';
const Tooltip = ({
  children,
  label,
  position = 'top',
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "ui-wrapper",
    onMouseEnter: () => setIsVisible(true),
    onMouseLeave: () => setIsVisible(false),
    onFocus: () => setIsVisible(true),
    onBlur: () => setIsVisible(false)
  }, props), children, isVisible && /*#__PURE__*/React.createElement("span", {
    className: `ui-tooltip ${position} ${className}`,
    role: "tooltip",
    "aria-label": ariaLabel || label
  }, label));
};
export default Tooltip;