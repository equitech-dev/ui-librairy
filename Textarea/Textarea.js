"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
const Textarea = ({
  value,
  onChange,
  placeholder,
  rows = 4,
  className = '',
  disabled = false,
  'aria-label': ariaLabel,
  ...props
}) => /*#__PURE__*/React.createElement("textarea", _extends({
  value: value,
  onChange: onChange,
  placeholder: placeholder,
  rows: rows,
  className: `ui-textarea ${className}`,
  disabled: disabled,
  "aria-label": ariaLabel
}, props));
export default Textarea;