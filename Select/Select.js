"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
const Select = ({
  options = [],
  value,
  onChange,
  placeholder = 'Sélectionner...',
  className = '',
  disabled = false,
  'aria-label': ariaLabel,
  ...props
}) => /*#__PURE__*/React.createElement("select", _extends({
  value: value,
  onChange: onChange,
  className: `ui-select ${className}`,
  disabled: disabled,
  "aria-label": ariaLabel
}, props), placeholder && /*#__PURE__*/React.createElement("option", {
  value: ""
}, placeholder), options.map((option, index) => /*#__PURE__*/React.createElement("option", {
  key: index,
  value: option.value
}, option.label)));
export default Select;