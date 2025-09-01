function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import './Form.scss';
const Form = ({
  children,
  title,
  subtitle,
  onSubmit,
  onReset,
  onCancel,
  layout = 'vertical',
  size = 'md',
  variant = 'default',
  className = '',
  id,
  name,
  method = 'post',
  action,
  target,
  encType = 'application/x-www-form-urlencoded',
  autoComplete = 'on',
  noValidate = false,
  disabled = false,
  loading = false,
  validating = false,
  valid = false,
  invalid = false,
  error,
  success,
  warning,
  info,
  progress,
  showProgress = false,
  ...props
}) => {
  const [collapsedSections, setCollapsedSections] = useState(new Set());

  // Handle form submission
  const handleSubmit = useCallback(e => {
    e.preventDefault();
    if (onSubmit && !disabled && !loading) {
      onSubmit(e);
    }
  }, [onSubmit, disabled, loading]);

  // Handle form reset
  const handleReset = useCallback(e => {
    if (onReset && !disabled) {
      onReset(e);
    }
  }, [onReset, disabled]);

  // Handle form cancel
  const handleCancel = useCallback(e => {
    if (onCancel && !disabled) {
      onCancel(e);
    }
  }, [onCancel, disabled]);

  // Toggle section collapse
  const toggleSection = useCallback(sectionId => {
    setCollapsedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  }, []);

  // Generate CSS classes
  const formClasses = ['ui-form', layout !== 'vertical' && `ui-form--${layout}`, size !== 'md' && `ui-form--${size}`, variant !== 'default' && `ui-form--${variant}`, validating && 'ui-form--validating', valid && 'ui-form--valid', invalid && 'ui-form--invalid', className].filter(Boolean).join(' ');

  // Calculate progress percentage
  const progressPercentage = useMemo(() => {
    if (!progress || !showProgress) return 0;
    return Math.min(100, Math.max(0, progress));
  }, [progress, showProgress]);

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
  return /*#__PURE__*/React.createElement("form", _extends({
    className: formClasses,
    onSubmit: handleSubmit,
    onReset: handleReset,
    id: id,
    name: name,
    method: method,
    action: action,
    target: target,
    encType: encType,
    autoComplete: autoComplete,
    noValidate: noValidate
  }, props), (title || subtitle) && /*#__PURE__*/React.createElement("div", {
    className: "ui-form__header"
  }, title && /*#__PURE__*/React.createElement("h2", {
    className: "ui-form__title"
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    className: "ui-form__subtitle"
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    className: "ui-form__content"
  }, children), /*#__PURE__*/React.createElement("div", {
    className: "ui-form__footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ui-form__status-section"
  }, statusMessage && /*#__PURE__*/React.createElement("div", {
    className: `ui-form__status ui-form__status--${statusMessage.type}`
  }, /*#__PURE__*/React.createElement("span", null, statusMessage.message)), showProgress && /*#__PURE__*/React.createElement("div", {
    className: "ui-form__progress"
  }, /*#__PURE__*/React.createElement("span", null, Math.round(progressPercentage), "%"), /*#__PURE__*/React.createElement("div", {
    className: "ui-form__progress-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ui-form__progress-fill",
    style: {
      width: `${progressPercentage}%`
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "ui-form__actions"
  }, onCancel && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ui-form__button",
    onClick: handleCancel,
    disabled: disabled || loading
  }, "Annuler"), onReset && /*#__PURE__*/React.createElement("button", {
    type: "reset",
    className: "ui-form__button",
    disabled: disabled || loading
  }, "R\xE9initialiser"), onSubmit && /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "ui-form__button ui-form__button--primary",
    disabled: disabled || loading || invalid
  }, loading ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("svg", {
    className: "ui-spinner",
    viewBox: "0 0 24 24",
    width: "16",
    height: "16"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    strokeWidth: "2",
    fill: "none",
    strokeDasharray: "31.416",
    strokeDashoffset: "31.416"
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "stroke-dasharray",
    dur: "2s",
    values: "0 31.416;15.708 15.708;0 31.416",
    repeatCount: "indefinite"
  }), /*#__PURE__*/React.createElement("animate", {
    attributeName: "stroke-dashoffset",
    dur: "2s",
    values: "0;-15.708;-31.416",
    repeatCount: "indefinite"
  }))), "Envoi en cours...") : 'Envoyer'))));
};

// Form Section Component
const FormSection = ({
  children,
  title,
  collapsible = false,
  collapsed = false,
  className = '',
  ...props
}) => {
  const sectionId = useMemo(() => `section-${Math.random().toString(36).substr(2, 9)}`, []);
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const handleToggle = useCallback(() => {
    if (collapsible) {
      setIsCollapsed(prev => !prev);
    }
  }, [collapsible]);
  const sectionClasses = ['ui-form__section', collapsible && 'ui-form__section--collapsible', isCollapsed && 'ui-form__section--collapsed', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: sectionClasses
  }, props), (title || collapsible) && /*#__PURE__*/React.createElement("div", {
    className: "ui-form__section-header",
    onClick: collapsible ? handleToggle : undefined
  }, title && /*#__PURE__*/React.createElement("h3", {
    className: "ui-form__section-title"
  }, title), collapsible && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ui-form__section-toggle",
    onClick: handleToggle,
    "aria-label": isCollapsed ? 'Développer' : 'Réduire'
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    width: "16",
    height: "16"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 10l5 5 5-5z"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "ui-form__section-content"
  }, children));
};

// Form Row Component
const FormRow = ({
  children,
  cols = 1,
  className = '',
  ...props
}) => {
  const rowClasses = ['ui-form__row', `ui-form__row--cols-${cols}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: rowClasses
  }, props), children);
};

// Form Field Component
const FormField = ({
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
  const fieldClasses = ['ui-form__field', error && 'ui-form__field--error', success && 'ui-form__field--success', className].filter(Boolean).join(' ');
  const labelClasses = ['ui-form__label', required && 'ui-form__label--required', optional && 'ui-form__label--optional'].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: fieldClasses
  }, props), label && /*#__PURE__*/React.createElement("label", {
    className: labelClasses
  }, label), children, help && /*#__PURE__*/React.createElement("div", {
    className: "ui-form__help"
  }, help), error && /*#__PURE__*/React.createElement("div", {
    className: "ui-form__error"
  }, error), success && /*#__PURE__*/React.createElement("div", {
    className: "ui-form__success"
  }, success));
};

// PropTypes
Form.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  onCancel: PropTypes.func,
  layout: PropTypes.oneOf(['vertical', 'horizontal']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['default', 'compact', 'spacious']),
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  method: PropTypes.string,
  action: PropTypes.string,
  target: PropTypes.string,
  encType: PropTypes.string,
  autoComplete: PropTypes.string,
  noValidate: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  validating: PropTypes.bool,
  valid: PropTypes.bool,
  invalid: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.string,
  warning: PropTypes.string,
  info: PropTypes.string,
  progress: PropTypes.number,
  showProgress: PropTypes.bool
};
FormSection.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  collapsible: PropTypes.bool,
  collapsed: PropTypes.bool,
  className: PropTypes.string
};
FormRow.propTypes = {
  children: PropTypes.node,
  cols: PropTypes.oneOf([1, 2, 3, 4]),
  className: PropTypes.string
};
FormField.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  help: PropTypes.string,
  error: PropTypes.string,
  success: PropTypes.string,
  required: PropTypes.bool,
  optional: PropTypes.bool,
  className: PropTypes.string
};

// Export components
Form.Section = FormSection;
Form.Row = FormRow;
Form.Field = FormField;
export default Form;