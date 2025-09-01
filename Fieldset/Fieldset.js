function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './Fieldset.scss';
const Fieldset = ({
  children,
  legend,
  description,
  layout = 'vertical',
  size = 'md',
  variant = 'default',
  style = 'outlined',
  className = '',
  id,
  name,
  disabled = false,
  required = false,
  optional = false,
  error,
  success,
  warning,
  info,
  footer,
  actions,
  ...props
}) => {
  // Generate CSS classes
  const fieldsetClasses = ['ui-fieldset', layout !== 'vertical' && `ui-fieldset--${layout}`, size !== 'md' && `ui-fieldset--${size}`, variant !== 'default' && `ui-fieldset--${variant}`, style !== 'outlined' && `ui-fieldset--${style}`, disabled && 'ui-fieldset--disabled', required && 'ui-fieldset--required', optional && 'ui-fieldset--optional', error && 'ui-fieldset--error', success && 'ui-fieldset--success', warning && 'ui-fieldset--warning', info && 'ui-fieldset--info', className].filter(Boolean).join(' ');
  const legendClasses = ['ui-fieldset__legend', required && 'ui-fieldset__legend--required', optional && 'ui-fieldset__legend--optional'].filter(Boolean).join(' ');

  // Status message
  const statusMessage = useMemo(() => {
    if (error) return {
      type: 'error',
      message: error
    };
    if (success) return {
      type: 'success',
      message: success
    };
    if (warning) return {
      type: 'warning',
      message: warning
    };
    if (info) return {
      type: 'info',
      message: info
    };
    return null;
  }, [error, success, warning, info]);
  return /*#__PURE__*/React.createElement("fieldset", _extends({
    className: fieldsetClasses,
    id: id,
    name: name,
    disabled: disabled
  }, props), legend && /*#__PURE__*/React.createElement("legend", {
    className: legendClasses
  }, legend), description && /*#__PURE__*/React.createElement("div", {
    className: "ui-fieldset__description"
  }, description), /*#__PURE__*/React.createElement("div", {
    className: "ui-fieldset__content"
  }, children), (footer || actions || statusMessage) && /*#__PURE__*/React.createElement("div", {
    className: "ui-fieldset__footer"
  }, statusMessage && /*#__PURE__*/React.createElement("div", {
    className: `ui-fieldset__status ui-fieldset__status--${statusMessage.type}`
  }, /*#__PURE__*/React.createElement("span", null, statusMessage.message)), footer && /*#__PURE__*/React.createElement("div", {
    className: "ui-fieldset__footer-content"
  }, footer), actions && /*#__PURE__*/React.createElement("div", {
    className: "ui-fieldset__actions"
  }, actions)));
};

// Fieldset Row Component
const FieldsetRow = ({
  children,
  cols = 1,
  className = '',
  ...props
}) => {
  const rowClasses = ['ui-fieldset__row', `ui-fieldset__row--cols-${cols}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: rowClasses
  }, props), children);
};

// Fieldset Field Component
const FieldsetField = ({
  children,
  label,
  help,
  error,
  success,
  required = false,
  optional = false,
  className = '',
  ...props
}) => {
  const fieldClasses = ['ui-fieldset__field', error && 'ui-fieldset__field--error', success && 'ui-fieldset__field--success', className].filter(Boolean).join(' ');
  const labelClasses = ['ui-fieldset__label', required && 'ui-fieldset__label--required', optional && 'ui-fieldset__label--optional'].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: fieldClasses
  }, props), label && /*#__PURE__*/React.createElement("label", {
    className: labelClasses
  }, label), children, help && /*#__PURE__*/React.createElement("div", {
    className: "ui-fieldset__help"
  }, help), error && /*#__PURE__*/React.createElement("div", {
    className: "ui-fieldset__error"
  }, error), success && /*#__PURE__*/React.createElement("div", {
    className: "ui-fieldset__success"
  }, success));
};

// Fieldset Button Component
const FieldsetButton = ({
  children,
  variant = 'default',
  disabled = false,
  className = '',
  ...props
}) => {
  const buttonClasses = ['ui-fieldset__button', variant !== 'default' && `ui-fieldset__button--${variant}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    className: buttonClasses,
    disabled: disabled
  }, props), children);
};

// PropTypes
Fieldset.propTypes = {
  children: PropTypes.node,
  legend: PropTypes.string,
  description: PropTypes.string,
  layout: PropTypes.oneOf(['vertical', 'horizontal']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['default', 'compact', 'spacious']),
  style: PropTypes.oneOf(['outlined', 'filled', 'elevated', 'bordered']),
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  optional: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.string,
  warning: PropTypes.string,
  info: PropTypes.string,
  footer: PropTypes.node,
  actions: PropTypes.node
};
FieldsetRow.propTypes = {
  children: PropTypes.node,
  cols: PropTypes.oneOf([1, 2, 3, 4]),
  className: PropTypes.string
};
FieldsetField.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  help: PropTypes.string,
  error: PropTypes.string,
  success: PropTypes.string,
  required: PropTypes.bool,
  optional: PropTypes.bool,
  className: PropTypes.string
};
FieldsetButton.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'danger']),
  disabled: PropTypes.bool,
  className: PropTypes.string
};

// Export components
Fieldset.Row = FieldsetRow;
Fieldset.Field = FieldsetField;
Fieldset.Button = FieldsetButton;
export default Fieldset;