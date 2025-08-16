"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from "react";
const Checkbox = ({
  checked,
  onChange,
  label,
  className = '',
  disabled = false,
  'aria-label': ariaLabel,
  ...props
}) => /*#__PURE__*/React.createElement("label", {
  className: `ui-checkbox ${className}`
}, /*#__PURE__*/React.createElement("input", _extends({
  type: "checkbox",
  checked: checked,
  onChange: onChange,
  disabled: disabled,
  "aria-label": ariaLabel
}, props)), label && /*#__PURE__*/React.createElement("span", null, label));
export { Checkbox };