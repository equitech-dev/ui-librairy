"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
  disabled = false,
  'aria-label': ariaLabel,
  ...props
}) => /*#__PURE__*/React.createElement("input", _extends({
  type: type,
  value: value,
  onChange: onChange,
  placeholder: placeholder,
  className: `ui-input ${className}`,
  disabled: disabled,
  "aria-label": ariaLabel
}, props));
export default Input;