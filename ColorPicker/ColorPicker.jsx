import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import './ColorPicker.scss';

const ColorPicker = ({
  value,
  onChange,
  placeholder = 'Sélectionner une couleur',
  disabled = false,
  size = 'md',
  variant = 'default',
  presets = [],
  showAlpha = false,
  format = 'hex',
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
  const [tempColor, setTempColor] = useState(value || '');
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [alpha, setAlpha] = useState(1);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  // Default color presets
  const defaultPresets = useMemo(() => [
    '#ff0000', '#ff8000', '#ffff00', '#80ff00',
    '#00ff00', '#00ff80', '#00ffff', '#0080ff',
    '#0000ff', '#8000ff', '#ff00ff', '#ff0080',
    '#ffffff', '#cccccc', '#999999', '#666666',
    '#333333', '#000000'
  ], []);

  const colorPresets = presets.length > 0 ? presets : defaultPresets;

  // Convert color formats
  const hexToHsl = useCallback((hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }, []);

  const hslToHex = useCallback((h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = (c) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }, []);

  const hslToRgb = useCallback((h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  }, []);

  // Initialize color from value
  useEffect(() => {
    if (value) {
      const hsl = hexToHsl(value);
      setHue(hsl.h);
      setSaturation(hsl.s);
      setLightness(hsl.l);
      setTempColor(value);
    }
  }, [value, hexToHsl]);

  // Update temp color when HSL changes
  useEffect(() => {
    const hex = hslToHex(hue, saturation, lightness);
    setTempColor(hex);
  }, [hue, saturation, lightness, hslToHex]);

  // Handle trigger click
  const handleTriggerClick = useCallback(() => {
    if (!disabled) {
      setIsOpen(true);
    }
  }, [disabled]);

  // Handle preset selection
  const handlePresetSelect = useCallback((presetColor) => {
    const hsl = hexToHsl(presetColor);
    setHue(hsl.h);
    setSaturation(hsl.s);
    setLightness(hsl.l);
    setTempColor(presetColor);
  }, [hexToHsl]);

  // Handle hue slider
  const handleHueChange = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    setHue(Math.round(percentage * 360));
  }, []);

  // Handle saturation/lightness picker
  const handlePickerChange = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const saturation = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const lightness = Math.max(0, Math.min(100, (1 - y / rect.height) * 100));
    setSaturation(Math.round(saturation));
    setLightness(Math.round(lightness));
  }, []);

  // Handle alpha slider
  const handleAlphaChange = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    setAlpha(percentage);
  }, []);

  // Handle input changes
  const handleInputChange = useCallback((type, value) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;

    switch (type) {
      case 'hue':
        setHue(Math.max(0, Math.min(360, numValue)));
        break;
      case 'saturation':
        setSaturation(Math.max(0, Math.min(100, numValue)));
        break;
      case 'lightness':
        setLightness(Math.max(0, Math.min(100, numValue)));
        break;
      case 'alpha':
        setAlpha(Math.max(0, Math.min(1, numValue / 100)));
        break;
      default:
        break;
    }
  }, []);

  // Handle confirm
  const handleConfirm = useCallback(() => {
    if (tempColor && onChange) {
      const finalColor = showAlpha && alpha < 1 
        ? `${tempColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
        : tempColor;
      onChange(finalColor);
    }
    setIsOpen(false);
  }, [tempColor, onChange, showAlpha, alpha]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    if (value) {
      const hsl = hexToHsl(value);
      setHue(hsl.h);
      setSaturation(hsl.s);
      setLightness(hsl.l);
      setTempColor(value);
    }
    setIsOpen(false);
  }, [value, hexToHsl]);

  // Handle clear
  const handleClear = useCallback(() => {
    if (onChange) {
      onChange('');
    }
    setTempColor('');
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

  // Generate CSS classes
  const containerClasses = [
    'ui-colorpicker',
    size !== 'md' && `ui-colorpicker--${size}`,
    variant !== 'default' && `ui-colorpicker--${variant}`,
    disabled && 'ui-colorpicker--disabled',
    error && 'ui-colorpicker--error',
    success && 'ui-colorpicker--success',
    className
  ].filter(Boolean).join(' ');

  const dropdownClasses = [
    'ui-colorpicker__dropdown',
    isOpen && 'ui-colorpicker__dropdown--open'
  ].filter(Boolean).join(' ');

  const previewClasses = [
    'ui-colorpicker__preview',
    !tempColor && 'ui-colorpicker__preview--empty'
  ].filter(Boolean).join(' ');

  // Generate picker background
  const pickerBackground = useMemo(() => {
    const rgb = hslToRgb(hue, 100, 50);
    return `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))`;
  }, [hue, hslToRgb]);

  // Generate current color for alpha slider
  const currentColor = useMemo(() => {
    return hslToHex(hue, saturation, lightness);
  }, [hue, saturation, lightness, hslToHex]);

  return (
    <div ref={containerRef} className={containerClasses} {...props}>
      <button
        ref={triggerRef}
        type="button"
        className="ui-colorpicker__trigger"
        onClick={handleTriggerClick}
        disabled={disabled}
        id={id}
        name={name}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        role="combobox"
      >
        <div 
          className={previewClasses}
          style={{ 
            '--color-preview': tempColor || 'transparent'
          }}
        />
        <span className="ui-colorpicker__value">
          {tempColor || placeholder}
        </span>
        <svg className="ui-colorpicker__icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </button>

      {isOpen && (
        <div className={dropdownClasses}>
          <div className="ui-colorpicker__header">
            <span className="ui-colorpicker__title">
              Sélectionner une couleur
            </span>
            <button
              type="button"
              className="ui-colorpicker__close"
              onClick={handleCancel}
              aria-label="Fermer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          <div className="ui-colorpicker__content">
            <div className="ui-colorpicker__section">
              <label className="ui-colorpicker__label">Couleurs prédéfinies</label>
              <div className="ui-colorpicker__presets">
                {colorPresets.map((presetColor) => (
                  <button
                    key={presetColor}
                    type="button"
                    className={`ui-colorpicker__preset ${
                      tempColor === presetColor ? 'ui-colorpicker__preset--selected' : ''
                    }`}
                    style={{ backgroundColor: presetColor }}
                    onClick={() => handlePresetSelect(presetColor)}
                    aria-label={`Sélectionner ${presetColor}`}
                  />
                ))}
              </div>
            </div>

            <div className="ui-colorpicker__section">
              <label className="ui-colorpicker__label">Sélecteur de couleur</label>
              <div 
                className="ui-colorpicker__picker"
                style={{ background: pickerBackground }}
                onClick={handlePickerChange}
                onMouseDown={(e) => {
                  const handleMouseMove = (moveEvent) => {
                    handlePickerChange(moveEvent);
                  };
                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                  };
                  document.addEventListener('mousemove', handleMouseMove);
                  document.addEventListener('mouseup', handleMouseUp);
                }}
              />
              
              <div 
                className="ui-colorpicker__hue-slider"
                style={{ '--hue-position': `${(hue / 360) * 100}%` }}
                onClick={handleHueChange}
                onMouseDown={(e) => {
                  const handleMouseMove = (moveEvent) => {
                    handleHueChange(moveEvent);
                  };
                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                  };
                  document.addEventListener('mousemove', handleMouseMove);
                  document.addEventListener('mouseup', handleMouseUp);
                }}
              />

              {showAlpha && (
                <div 
                  className="ui-colorpicker__alpha-slider"
                  style={{ 
                    '--alpha-position': `${alpha * 100}%`,
                    '--current-color': currentColor
                  }}
                  onClick={handleAlphaChange}
                  onMouseDown={(e) => {
                    const handleMouseMove = (moveEvent) => {
                      handleAlphaChange(moveEvent);
                    };
                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                />
              )}
            </div>

            <div className="ui-colorpicker__section">
              <label className="ui-colorpicker__label">Valeurs</label>
              <div className="ui-colorpicker__inputs">
                <div className="ui-colorpicker__input-group">
                  <label className="ui-colorpicker__input-label">H</label>
                  <input
                    type="number"
                    className="ui-colorpicker__input"
                    value={hue}
                    onChange={(e) => handleInputChange('hue', e.target.value)}
                    min="0"
                    max="360"
                  />
                </div>
                <div className="ui-colorpicker__input-group">
                  <label className="ui-colorpicker__input-label">S</label>
                  <input
                    type="number"
                    className="ui-colorpicker__input"
                    value={saturation}
                    onChange={(e) => handleInputChange('saturation', e.target.value)}
                    min="0"
                    max="100"
                  />
                </div>
                <div className="ui-colorpicker__input-group">
                  <label className="ui-colorpicker__input-label">L</label>
                  <input
                    type="number"
                    className="ui-colorpicker__input"
                    value={lightness}
                    onChange={(e) => handleInputChange('lightness', e.target.value)}
                    min="0"
                    max="100"
                  />
                </div>
                {showAlpha && (
                  <div className="ui-colorpicker__input-group">
                    <label className="ui-colorpicker__input-label">A</label>
                    <input
                      type="number"
                      className="ui-colorpicker__input"
                      value={Math.round(alpha * 100)}
                      onChange={(e) => handleInputChange('alpha', e.target.value)}
                      min="0"
                      max="100"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="ui-colorpicker__footer">
            <div className="ui-colorpicker__current">
              <div 
                className="ui-colorpicker__current-preview"
                style={{ '--current-color': currentColor }}
              />
              <span>{tempColor || 'Aucune couleur sélectionnée'}</span>
            </div>
            <div className="ui-colorpicker__actions">
              <button
                type="button"
                className="ui-colorpicker__button"
                onClick={handleClear}
              >
                Effacer
              </button>
              <button
                type="button"
                className="ui-colorpicker__button"
                onClick={handleCancel}
              >
                Annuler
              </button>
              <button
                type="button"
                className="ui-colorpicker__button ui-colorpicker__button--primary"
                onClick={handleConfirm}
                disabled={!tempColor}
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

ColorPicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['default', 'error', 'success']),
  presets: PropTypes.arrayOf(PropTypes.string),
  showAlpha: PropTypes.bool,
  format: PropTypes.oneOf(['hex', 'rgb', 'hsl']),
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.bool,
  success: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

export default ColorPicker;


