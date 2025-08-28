import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import './TimePicker.scss';

const TimePicker = ({
  value,
  onChange,
  placeholder = 'Sélectionner une heure',
  disabled = false,
  size = 'md',
  variant = 'default',
  showSeconds = false,
  format = '24h',
  minTime,
  maxTime,
  step = 15,
  className = '',
  id,
  name,
  required = false,
  error = false,
  success = false,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempValue, setTempValue] = useState(value || '');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Parse time string to hours, minutes, seconds
  const parseTime = useCallback((timeStr) => {
    if (!timeStr) return { hours: 0, minutes: 0, seconds: 0 };
    
    const parts = timeStr.split(':').map(Number);
    return {
      hours: parts[0] || 0,
      minutes: parts[1] || 0,
      seconds: parts[2] || 0
    };
  }, []);

  // Format time object to string
  const formatTime = useCallback(({ hours, minutes, seconds }) => {
    const pad = (num) => num.toString().padStart(2, '0');
    
    if (showSeconds) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(hours)}:${pad(minutes)}`;
  }, [showSeconds]);

  // Generate time options
  const timeOptions = useMemo(() => {
    const options = [];
    const maxHours = format === '24h' ? 24 : 12;
    
    for (let hour = 0; hour < maxHours; hour++) {
      for (let minute = 0; minute < 60; minute += step) {
        if (showSeconds) {
          for (let second = 0; second < 60; second += step) {
            const time = { hours: hour, minutes: minute, seconds: second };
            const timeStr = formatTime(time);
            
            // Check min/max constraints
            if (minTime && timeStr < minTime) continue;
            if (maxTime && timeStr > maxTime) continue;
            
            options.push({
              value: timeStr,
              label: timeStr,
              time
            });
          }
        } else {
          const time = { hours: hour, minutes: minute, seconds: 0 };
          const timeStr = formatTime(time);
          
          // Check min/max constraints
          if (minTime && timeStr < minTime) continue;
          if (maxTime && timeStr > maxTime) continue;
          
          options.push({
            value: timeStr,
            label: timeStr,
            time
          });
        }
      }
    }
    
    return options;
  }, [format, step, showSeconds, formatTime, minTime, maxTime]);

  // Handle input click
  const handleInputClick = useCallback(() => {
    if (!disabled) {
      setIsOpen(true);
      setTempValue(value || '');
    }
  }, [disabled, value]);

  // Handle option selection
  const handleOptionSelect = useCallback((option) => {
    setTempValue(option.value);
  }, []);

  // Handle confirm
  const handleConfirm = useCallback(() => {
    if (tempValue && onChange) {
      onChange(tempValue);
    }
    setIsOpen(false);
  }, [tempValue, onChange]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    setTempValue(value || '');
    setIsOpen(false);
  }, [value]);

  // Handle clear
  const handleClear = useCallback(() => {
    if (onChange) {
      onChange('');
    }
    setTempValue('');
    setIsOpen(false);
  }, [onChange]);

  // Handle escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      handleCancel();
    } else if (e.key === 'Enter' && isOpen) {
      handleConfirm();
    }
  }, [isOpen, handleCancel, handleConfirm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        handleCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleCancel, handleKeyDown]);

  // Update temp value when value prop changes
  useEffect(() => {
    setTempValue(value || '');
  }, [value]);

  // Generate CSS classes
  const containerClasses = [
    'ui-timepicker',
    size !== 'md' && `ui-timepicker--${size}`,
    variant !== 'default' && `ui-timepicker--${variant}`,
    disabled && 'ui-timepicker--disabled',
    error && 'ui-timepicker--error',
    success && 'ui-timepicker--success',
    className
  ].filter(Boolean).join(' ');

  const dropdownClasses = [
    'ui-timepicker__dropdown',
    isOpen && 'ui-timepicker__dropdown--open'
  ].filter(Boolean).join(' ');

  return (
    <div ref={containerRef} className={containerClasses} {...props}>
      <input
        ref={inputRef}
        type="text"
        className="ui-timepicker__input"
        value={value || ''}
        placeholder={placeholder}
        readOnly
        disabled={disabled}
        id={id}
        name={name}
        required={required}
        onClick={handleInputClick}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-autocomplete="none"
        role="combobox"
      />
      
      <svg className="ui-timepicker__icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>

      {isOpen && (
        <div className={dropdownClasses}>
          <div className="ui-timepicker__header">
            <span className="ui-timepicker__title">
              Sélectionner une heure
            </span>
            <button
              type="button"
              className="ui-timepicker__close"
              onClick={handleCancel}
              aria-label="Fermer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          <div className="ui-timepicker__content">
            <div className="ui-timepicker__section">
              <label className="ui-timepicker__label">Heures disponibles</label>
              <div className="ui-timepicker__grid">
                {timeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`ui-timepicker__option ${
                      tempValue === option.value ? 'ui-timepicker__option--selected' : ''
                    }`}
                    onClick={() => handleOptionSelect(option)}
                    aria-selected={tempValue === option.value}
                    role="option"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="ui-timepicker__footer">
            <span className="ui-timepicker__current">
              {tempValue || 'Aucune heure sélectionnée'}
            </span>
            <div className="ui-timepicker__actions">
              <button
                type="button"
                className="ui-timepicker__button"
                onClick={handleClear}
              >
                Effacer
              </button>
              <button
                type="button"
                className="ui-timepicker__button"
                onClick={handleCancel}
              >
                Annuler
              </button>
              <button
                type="button"
                className="ui-timepicker__button ui-timepicker__button--primary"
                onClick={handleConfirm}
                disabled={!tempValue}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

TimePicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['default', 'error', 'success']),
  showSeconds: PropTypes.bool,
  format: PropTypes.oneOf(['12h', '24h']),
  minTime: PropTypes.string,
  maxTime: PropTypes.string,
  step: PropTypes.number,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.bool,
  success: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

export default TimePicker;


