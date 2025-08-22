function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import './Switch.scss';
const Switch = ({
  checked = false,
  onChange,
  disabled = false,
  label,
  size = 'medium',
  // small, medium, large
  variant = 'default',
  // default, success, warning, error, info
  showIcons = false,
  showText = false,
  className = '',
  id,
  ...props
}) => {
  const handleChange = event => {
    if (!disabled && onChange) {
      onChange(event.target.checked, event);
    }
  };
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;
  return /*#__PURE__*/React.createElement("label", _extends({
    className: `ui-switch ${size} ${variant} ${showIcons ? 'with-icons' : ''} ${showText ? 'with-text' : ''} ${disabled ? 'disabled' : ''} ${className}`,
    htmlFor: switchId
  }, props), /*#__PURE__*/React.createElement("input", {
    id: switchId,
    type: "checkbox",
    className: "ui-switch-input",
    checked: checked,
    onChange: handleChange,
    disabled: disabled,
    role: "switch",
    "aria-checked": checked
  }), /*#__PURE__*/React.createElement("div", {
    className: "ui-switch-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ui-switch-thumb"
  })), label && /*#__PURE__*/React.createElement("span", {
    className: "ui-switch-label"
  }, label));
};
export default Switch;