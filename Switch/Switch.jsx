import React from 'react';
import './Switch.scss';

const Switch = ({
  checked = false,
  onChange,
  disabled = false,
  label,
  size = 'medium', // small, medium, large
  variant = 'default', // default, success, warning, error, info
  showIcons = false,
  showText = false,
  className = '',
  id,
  ...props
}) => {
  const handleChange = (event) => {
    if (!disabled && onChange) {
      onChange(event.target.checked, event);
    }
  };

  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <label 
      className={`ui-switch ${size} ${variant} ${showIcons ? 'with-icons' : ''} ${showText ? 'with-text' : ''} ${disabled ? 'disabled' : ''} ${className}`}
      htmlFor={switchId}
      {...props}
    >
      <input
        id={switchId}
        type="checkbox"
        className="ui-switch-input"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        role="switch"
        aria-checked={checked}
      />
      <div className="ui-switch-track">
        <div className="ui-switch-thumb" />
      </div>
      {label && (
        <span className="ui-switch-label">
          {label}
        </span>
      )}
    </label>
  );
};

export default Switch;

