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
  const fieldsetClasses = [
    'ui-fieldset',
    layout !== 'vertical' && `ui-fieldset--${layout}`,
    size !== 'md' && `ui-fieldset--${size}`,
    variant !== 'default' && `ui-fieldset--${variant}`,
    style !== 'outlined' && `ui-fieldset--${style}`,
    disabled && 'ui-fieldset--disabled',
    required && 'ui-fieldset--required',
    optional && 'ui-fieldset--optional',
    error && 'ui-fieldset--error',
    success && 'ui-fieldset--success',
    warning && 'ui-fieldset--warning',
    info && 'ui-fieldset--info',
    className
  ].filter(Boolean).join(' ');

  const legendClasses = [
    'ui-fieldset__legend',
    required && 'ui-fieldset__legend--required',
    optional && 'ui-fieldset__legend--optional'
  ].filter(Boolean).join(' ');

  // Status message
  const statusMessage = useMemo(() => {
    if (error) return { type: 'error', message: error };
    if (success) return { type: 'success', message: success };
    if (warning) return { type: 'warning', message: warning };
    if (info) return { type: 'info', message: info };
    return null;
  }, [error, success, warning, info]);

  return (
    <fieldset
      className={fieldsetClasses}
      id={id}
      name={name}
      disabled={disabled}
      {...props}
    >
      {legend && (
        <legend className={legendClasses}>
          {legend}
        </legend>
      )}
      
      {description && (
        <div className="ui-fieldset__description">
          {description}
        </div>
      )}
      
      <div className="ui-fieldset__content">
        {children}
      </div>
      
      {(footer || actions || statusMessage) && (
        <div className="ui-fieldset__footer">
          {statusMessage && (
            <div className={`ui-fieldset__status ui-fieldset__status--${statusMessage.type}`}>
              <span>{statusMessage.message}</span>
            </div>
          )}
          
          {footer && (
            <div className="ui-fieldset__footer-content">
              {footer}
            </div>
          )}
          
          {actions && (
            <div className="ui-fieldset__actions">
              {actions}
            </div>
          )}
        </div>
      )}
    </fieldset>
  );
};

// Fieldset Row Component
const FieldsetRow = ({
  children,
  cols = 1,
  className = '',
  ...props
}) => {
  const rowClasses = [
    'ui-fieldset__row',
    `ui-fieldset__row--cols-${cols}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={rowClasses} {...props}>
      {children}
    </div>
  );
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
  const fieldClasses = [
    'ui-fieldset__field',
    error && 'ui-fieldset__field--error',
    success && 'ui-fieldset__field--success',
    className
  ].filter(Boolean).join(' ');

  const labelClasses = [
    'ui-fieldset__label',
    required && 'ui-fieldset__label--required',
    optional && 'ui-fieldset__label--optional'
  ].filter(Boolean).join(' ');

  return (
    <div className={fieldClasses} {...props}>
      {label && (
        <label className={labelClasses}>
          {label}
        </label>
      )}
      
      {children}
      
      {help && (
        <div className="ui-fieldset__help">{help}</div>
      )}
      
      {error && (
        <div className="ui-fieldset__error">{error}</div>
      )}
      
      {success && (
        <div className="ui-fieldset__success">{success}</div>
      )}
    </div>
  );
};

// Fieldset Button Component
const FieldsetButton = ({
  children,
  variant = 'default',
  disabled = false,
  className = '',
  ...props
}) => {
  const buttonClasses = [
    'ui-fieldset__button',
    variant !== 'default' && `ui-fieldset__button--${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
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


