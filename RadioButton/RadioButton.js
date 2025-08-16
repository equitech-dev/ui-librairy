"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from "react";
const RadioButton = ({
  checked,
  onChange,
  label,
  name,
  value,
  className = '',
  disabled = false,
  'aria-label': ariaLabel,
  ...props
}) => /*#__PURE__*/React.createElement("label", {
  className: `ui-radio ${className}`
}, /*#__PURE__*/React.createElement("input", _extends({
  type: "radio",
  checked: checked,
  onChange: onChange,
  name: name,
  value: value,
  disabled: disabled,
  "aria-label": ariaLabel
}, props)), label && /*#__PURE__*/React.createElement("span", null, label));
export { RadioButton };