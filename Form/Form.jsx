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
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (onSubmit && !disabled && !loading) {
      onSubmit(e);
    }
  }, [onSubmit, disabled, loading]);

  // Handle form reset
  const handleReset = useCallback((e) => {
    if (onReset && !disabled) {
      onReset(e);
    }
  }, [onReset, disabled]);

  // Handle form cancel
  const handleCancel = useCallback((e) => {
    if (onCancel && !disabled) {
      onCancel(e);
    }
  }, [onCancel, disabled]);

  // Toggle section collapse
  const toggleSection = useCallback((sectionId) => {
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
  const formClasses = [
    'ui-form',
    layout !== 'vertical' && `ui-form--${layout}`,
    size !== 'md' && `ui-form--${size}`,
    variant !== 'default' && `ui-form--${variant}`,
    validating && 'ui-form--validating',
    valid && 'ui-form--valid',
    invalid && 'ui-form--invalid',
    className
  ].filter(Boolean).join(' ');

  // Calculate progress percentage
  const progressPercentage = useMemo(() => {
    if (!progress || !showProgress) return 0;
    return Math.min(100, Math.max(0, progress));
  }, [progress, showProgress]);

  // Status message
  const statusMessage = useMemo(() => {
    if (error) return { type: 'error', message: error };
    if (success) return { type: 'success', message: success };
    if (warning) return { type: 'warning', message: warning };
    if (info) return { type: 'info', message: info };
    return null;
  }, [error, success, warning, info]);

  return (
    <form
      className={formClasses}
      onSubmit={handleSubmit}
      onReset={handleReset}
      id={id}
      name={name}
      method={method}
      action={action}
      target={target}
      encType={encType}
      autoComplete={autoComplete}
      noValidate={noValidate}
      {...props}
    >
      {/* Header */}
      {(title || subtitle) && (
        <div className="ui-form__header">
          {title && (
            <h2 className="ui-form__title">{title}</h2>
          )}
          {subtitle && (
            <p className="ui-form__subtitle">{subtitle}</p>
          )}
        </div>
      )}

      {/* Content */}
      <div className="ui-form__content">
        {children}
      </div>

      {/* Footer */}
      <div className="ui-form__footer">
        {/* Status and Progress */}
        <div className="ui-form__status-section">
          {statusMessage && (
            <div className={`ui-form__status ui-form__status--${statusMessage.type}`}>
              <span>{statusMessage.message}</span>
            </div>
          )}
          
          {showProgress && (
            <div className="ui-form__progress">
              <span>{Math.round(progressPercentage)}%</span>
              <div className="ui-form__progress-bar">
                <div 
                  className="ui-form__progress-fill"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="ui-form__actions">
          {onCancel && (
            <button
              type="button"
              className="ui-form__button"
              onClick={handleCancel}
              disabled={disabled || loading}
            >
              Annuler
            </button>
          )}
          
          {onReset && (
            <button
              type="reset"
              className="ui-form__button"
              disabled={disabled || loading}
            >
              Réinitialiser
            </button>
          )}
          
          {onSubmit && (
            <button
              type="submit"
              className="ui-form__button ui-form__button--primary"
              disabled={disabled || loading || invalid}
            >
              {loading ? (
                <>
                  <svg className="ui-spinner" viewBox="0 0 24 24" width="16" height="16">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="31.416" strokeDashoffset="31.416">
                      <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                      <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                  Envoi en cours...
                </>
              ) : (
                'Envoyer'
              )}
            </button>
          )}
        </div>
      </div>
    </form>
  );
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

  const sectionClasses = [
    'ui-form__section',
    collapsible && 'ui-form__section--collapsible',
    isCollapsed && 'ui-form__section--collapsed',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={sectionClasses} {...props}>
      {(title || collapsible) && (
        <div className="ui-form__section-header" onClick={collapsible ? handleToggle : undefined}>
          {title && (
            <h3 className="ui-form__section-title">{title}</h3>
          )}
          {collapsible && (
            <button
              type="button"
              className="ui-form__section-toggle"
              onClick={handleToggle}
              aria-label={isCollapsed ? 'Développer' : 'Réduire'}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </button>
          )}
        </div>
      )}
      <div className="ui-form__section-content">
        {children}
      </div>
    </div>
  );
};

// Form Row Component
const FormRow = ({
  children,
  cols = 1,
  className = '',
  ...props
}) => {
  const rowClasses = [
    'ui-form__row',
    `ui-form__row--cols-${cols}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={rowClasses} {...props}>
      {children}
    </div>
  );
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
  const fieldClasses = [
    'ui-form__field',
    error && 'ui-form__field--error',
    success && 'ui-form__field--success',
    className
  ].filter(Boolean).join(' ');

  const labelClasses = [
    'ui-form__label',
    required && 'ui-form__label--required',
    optional && 'ui-form__label--optional'
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
        <div className="ui-form__help">{help}</div>
      )}
      
      {error && (
        <div className="ui-form__error">{error}</div>
      )}
      
      {success && (
        <div className="ui-form__success">{success}</div>
      )}
    </div>
  );
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


