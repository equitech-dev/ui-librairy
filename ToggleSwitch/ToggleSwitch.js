import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
const ToggleSwitch = ({
  checked = false,
  defaultChecked = false,
  disabled = false,
  label,
  description,
  onChange,
  onValueChange,
  className = "",
  size = "medium",
  variant = "default",
  mode = "simple",
  options = [],
  value,
  defaultValue,
  multiple = false,
  title,
  groupDescription,
  animated = true,
  children
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [selectedValues, setSelectedValues] = useState(defaultValue || []);

  // Gestion du changement d'état
  const handleToggle = useCallback(() => {
    if (disabled) return;
    const newValue = !isChecked;
    setIsChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
  }, [disabled, isChecked, onChange, onValueChange]);

  // Gestion de la sélection d'option (mode avancé)
  const handleOptionSelect = useCallback(optionValue => {
    if (disabled) return;
    if (multiple) {
      const newValues = selectedValues.includes(optionValue) ? selectedValues.filter(v => v !== optionValue) : [...selectedValues, optionValue];
      setSelectedValues(newValues);
      if (onValueChange) {
        onValueChange(newValues);
      }
    } else {
      setSelectedValue(optionValue);
      if (onValueChange) {
        onValueChange(optionValue);
      }
    }
  }, [disabled, multiple, selectedValues, selectedValue, onValueChange]);

  // Gestion du clic sur le label
  const handleLabelClick = useCallback(() => {
    if (!disabled) {
      handleToggle();
    }
  }, [disabled, handleToggle]);

  // Gestion des touches clavier
  const handleKeyDown = useCallback(e => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  }, [disabled, handleToggle]);

  // Classes CSS
  const switchClasses = ['ui-toggle-switch', size !== 'medium' && `ui-toggle-switch--${size}`, variant !== 'default' && `ui-toggle-switch--${variant}`, mode !== 'simple' && mode, animated && 'animated', disabled && 'disabled', className].filter(Boolean).join(' ');
  const containerClasses = ['ui-toggle-switch-container', disabled && 'disabled'].filter(Boolean).join(' ');
  const trackClasses = ['ui-toggle-switch-track', (checked !== undefined ? checked : isChecked) && 'checked', disabled && 'disabled'].filter(Boolean).join(' ');
  const thumbClasses = ['ui-toggle-switch-thumb', (checked !== undefined ? checked : isChecked) && 'checked', disabled && 'disabled'].filter(Boolean).join(' ');
  const labelClasses = ['ui-toggle-switch-label', disabled && 'disabled'].filter(Boolean).join(' ');

  // Mode simple
  if (mode === 'simple') {
    return /*#__PURE__*/React.createElement("div", {
      className: switchClasses
    }, /*#__PURE__*/React.createElement("div", {
      className: containerClasses
    }, /*#__PURE__*/React.createElement("div", {
      className: trackClasses,
      onClick: handleToggle,
      onKeyDown: handleKeyDown,
      tabIndex: disabled ? -1 : 0,
      role: "switch",
      "aria-checked": checked !== undefined ? checked : isChecked,
      "aria-disabled": disabled,
      "aria-label": label
    }, /*#__PURE__*/React.createElement("div", {
      className: thumbClasses
    }))), label && /*#__PURE__*/React.createElement("div", {
      className: "ui-toggle-switch-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: labelClasses,
      onClick: handleLabelClick
    }, label), description && /*#__PURE__*/React.createElement("div", {
      className: "ui-toggle-switch-description"
    }, description)), /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "ui-toggle-switch-input",
      checked: checked !== undefined ? checked : isChecked,
      onChange: handleToggle,
      disabled: disabled
    }));
  }

  // Mode avancé avec options
  if (mode === 'advanced') {
    const currentValue = value !== undefined ? value : selectedValue;
    const currentValues = value !== undefined ? value : selectedValues;
    return /*#__PURE__*/React.createElement("div", {
      className: switchClasses
    }, /*#__PURE__*/React.createElement("div", {
      className: containerClasses
    }, /*#__PURE__*/React.createElement("div", {
      className: "ui-toggle-switch-options"
    }, options.map(option => {
      const isActive = multiple ? currentValues.includes(option.value) : currentValue === option.value;
      return /*#__PURE__*/React.createElement("div", {
        key: option.value,
        className: `ui-toggle-switch-option ${isActive ? 'active' : ''} ${option.disabled ? 'disabled' : ''}`,
        onClick: () => !option.disabled && handleOptionSelect(option.value),
        onKeyDown: e => {
          if (!option.disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleOptionSelect(option.value);
          }
        },
        tabIndex: option.disabled ? -1 : 0,
        role: "button",
        "aria-pressed": isActive,
        "aria-disabled": option.disabled
      }, /*#__PURE__*/React.createElement("div", {
        className: "ui-toggle-switch-option-content"
      }, /*#__PURE__*/React.createElement("div", {
        className: "ui-toggle-switch-option-label"
      }, option.label), option.description && /*#__PURE__*/React.createElement("div", {
        className: "ui-toggle-switch-option-description"
      }, option.description)), /*#__PURE__*/React.createElement("div", {
        className: `ui-toggle-switch-option-indicator ${isActive ? 'active' : ''}`
      }));
    }))), children);
  }

  // Mode groupe
  if (mode === 'group') {
    const currentValue = value !== undefined ? value : selectedValue;
    return /*#__PURE__*/React.createElement("div", {
      className: switchClasses
    }, /*#__PURE__*/React.createElement("div", {
      className: containerClasses
    }, (title || groupDescription) && /*#__PURE__*/React.createElement("div", {
      className: "ui-toggle-switch-group-header"
    }, title && /*#__PURE__*/React.createElement("div", {
      className: "ui-toggle-switch-group-title"
    }, title)), groupDescription && /*#__PURE__*/React.createElement("div", {
      className: "ui-toggle-switch-group-description"
    }, groupDescription), /*#__PURE__*/React.createElement("div", {
      className: "ui-toggle-switch-group-items"
    }, options.map(option => {
      const isActive = currentValue === option.value;
      return /*#__PURE__*/React.createElement("div", {
        key: option.value,
        className: `ui-toggle-switch-group-item ${isActive ? 'active' : ''} ${option.disabled ? 'disabled' : ''}`,
        onClick: () => !option.disabled && handleOptionSelect(option.value),
        onKeyDown: e => {
          if (!option.disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleOptionSelect(option.value);
          }
        },
        tabIndex: option.disabled ? -1 : 0,
        role: "button",
        "aria-pressed": isActive,
        "aria-disabled": option.disabled
      }, /*#__PURE__*/React.createElement("div", {
        className: "ui-toggle-switch-group-item-content"
      }, /*#__PURE__*/React.createElement("div", {
        className: "ui-toggle-switch-group-item-label"
      }, option.label), option.description && /*#__PURE__*/React.createElement("div", {
        className: "ui-toggle-switch-group-item-description"
      }, option.description)), /*#__PURE__*/React.createElement("div", {
        className: `ui-toggle-switch-option-indicator ${isActive ? 'active' : ''}`
      }));
    }))), children);
  }
  return null;
};
ToggleSwitch.propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  description: PropTypes.string,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['default', 'outlined', 'filled', 'rounded', 'success', 'warning', 'error']),
  mode: PropTypes.oneOf(['simple', 'advanced', 'group']),
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    disabled: PropTypes.bool
  })),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  multiple: PropTypes.bool,
  title: PropTypes.string,
  groupDescription: PropTypes.string,
  animated: PropTypes.bool,
  children: PropTypes.node
};
export default ToggleSwitch;