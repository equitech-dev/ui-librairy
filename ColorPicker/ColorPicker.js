function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

// Cache pour les conversions de couleurs
const colorCache = new Map();

// Fonctions de conversion optimisées avec cache
const createColorUtils = () => {
  const hexToRgb = hex => {
    if (colorCache.has(`hex2rgb-${hex}`)) {
      return colorCache.get(`hex2rgb-${hex}`);
    }
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const rgb = result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : {
      r: 0,
      g: 0,
      b: 0
    };
    colorCache.set(`hex2rgb-${hex}`, rgb);
    return rgb;
  };
  const rgbToHex = (r, g, b) => {
    const key = `rgb2hex-${r}-${g}-${b}`;
    if (colorCache.has(key)) {
      return colorCache.get(key);
    }
    const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    colorCache.set(key, hex);
    return hex;
  };
  const rgbToHsl = (r, g, b) => {
    const key = `rgb2hsl-${r}-${g}-${b}`;
    if (colorCache.has(key)) {
      return colorCache.get(key);
    }
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    const hsl = {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
    colorCache.set(key, hsl);
    return hsl;
  };
  const hslToRgb = (h, s, l) => {
    const key = `hsl2rgb-${h}-${s}-${l}`;
    if (colorCache.has(key)) {
      return colorCache.get(key);
    }
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const rgb = {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
    colorCache.set(key, rgb);
    return rgb;
  };
  const hexToHsl = hex => {
    const rgb = hexToRgb(hex);
    return rgbToHsl(rgb.r, rgb.g, rgb.b);
  };
  const hslToHex = (h, s, l) => {
    const rgb = hslToRgb(h, s, l);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  };
  return {
    hexToRgb,
    rgbToHex,
    rgbToHsl,
    hslToRgb,
    hexToHsl,
    hslToHex,
    clearCache: () => colorCache.clear()
  };
};

// Hook pour le debouncing
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

// Composant de slider optimisé
const ColorSlider = /*#__PURE__*/React.memo(({
  type,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className = '',
  style = {},
  ...props
}) => {
  const handleChange = useCallback(e => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  }, [onChange]);
  return /*#__PURE__*/React.createElement("input", _extends({
    type: "range",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: handleChange,
    className: `ui-color-slider ui-color-slider--${type} ${className}`,
    style: style
  }, props));
});

// Composant de picker optimisé
const ColorPicker = /*#__PURE__*/React.memo(({
  hue,
  saturation,
  lightness,
  onChange,
  className = '',
  ...props
}) => {
  const handleClick = useCallback(e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const s = Math.max(0, Math.min(100, x / rect.width * 100));
    const l = Math.max(0, Math.min(100, (1 - y / rect.height) * 100));
    onChange(s, l);
  }, [onChange]);
  const backgroundStyle = useMemo(() => ({
    background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))`
  }), [hue]);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `ui-color-picker ${className}`,
    style: backgroundStyle,
    onClick: handleClick
  }, props));
});

/**
 * ColorPicker Optimized - Color picker component with optimized conversions and debouncing
 * 
 * Props :
 * - value: Current color value (hex)
 * - onChange: Callback when color changes (hex)
 * - presets: Array of preset colors
 * - showAlpha: Show alpha slider (default: false)
 * - disabled: Disable color picker (default: false)
 * - className: Additional CSS classes
 * - ...props: Native props
 */
const ColorPickerOptimized = ({
  value = '#000000',
  onChange,
  presets = [],
  showAlpha = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [lightness, setLightness] = useState(0);
  const [alpha, setAlpha] = useState(1);
  const [tempColor, setTempColor] = useState(value);
  const containerRef = useRef(null);
  const colorUtils = useMemo(() => createColorUtils(), []);

  // Debounced color changes
  const debouncedTempColor = useDebounce(tempColor, 100);

  // Mémoriser les conversions de couleurs
  const colorConversions = useMemo(() => {
    const hsl = colorUtils.hexToHsl(value);
    const rgb = colorUtils.hexToRgb(value);
    return {
      hsl,
      rgb
    };
  }, [value, colorUtils]);

  // Initialiser les valeurs depuis la couleur
  useEffect(() => {
    if (value) {
      const hsl = colorUtils.hexToHsl(value);
      setHue(hsl.h);
      setSaturation(hsl.s);
      setLightness(hsl.l);
      setTempColor(value);
    }
  }, [value, colorUtils]);

  // Mettre à jour la couleur temporaire quand HSL change
  useEffect(() => {
    const hex = colorUtils.hslToHex(hue, saturation, lightness);
    setTempColor(hex);
  }, [hue, saturation, lightness, colorUtils]);

  // Appliquer la couleur debouncée
  useEffect(() => {
    if (debouncedTempColor && onChange && debouncedTempColor !== value) {
      const finalColor = showAlpha && alpha < 1 ? `${debouncedTempColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}` : debouncedTempColor;
      onChange(finalColor);
    }
  }, [debouncedTempColor, alpha, showAlpha, onChange, value]);

  // Gestionnaires optimisés
  const handleTriggerClick = useCallback(() => {
    if (!disabled) {
      setIsOpen(true);
    }
  }, [disabled]);
  const handlePresetSelect = useCallback(presetColor => {
    const hsl = colorUtils.hexToHsl(presetColor);
    setHue(hsl.h);
    setSaturation(hsl.s);
    setLightness(hsl.l);
    setTempColor(presetColor);
  }, [colorUtils]);
  const handleHueChange = useCallback(newHue => {
    setHue(newHue);
  }, []);
  const handlePickerChange = useCallback((newSaturation, newLightness) => {
    setSaturation(newSaturation);
    setLightness(newLightness);
  }, []);
  const handleAlphaChange = useCallback(newAlpha => {
    setAlpha(newAlpha);
  }, []);
  const handleInputChange = useCallback((type, inputValue) => {
    const numValue = parseInt(inputValue, 10);
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
  const handleConfirm = useCallback(() => {
    if (tempColor && onChange) {
      const finalColor = showAlpha && alpha < 1 ? `${tempColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}` : tempColor;
      onChange(finalColor);
    }
    setIsOpen(false);
  }, [tempColor, onChange, showAlpha, alpha]);
  const handleCancel = useCallback(() => {
    setTempColor(value);
    setIsOpen(false);
  }, [value]);

  // Fermer au clic extérieur
  useEffect(() => {
    const handleClickOutside = event => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Classes CSS mémorisées
  const pickerClasses = useMemo(() => ['ui-colorpicker', disabled && 'ui-colorpicker--disabled', isOpen && 'ui-colorpicker--open', className].filter(Boolean).join(' '), [disabled, isOpen, className]);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: pickerClasses,
    ref: containerRef
  }, props), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ui-colorpicker-trigger",
    onClick: handleTriggerClick,
    disabled: disabled,
    "aria-label": "S\xE9lectionner une couleur"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ui-colorpicker-preview",
    style: {
      backgroundColor: tempColor
    }
  })), isOpen && /*#__PURE__*/React.createElement("div", {
    className: "ui-colorpicker-dropdown"
  }, presets.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "ui-colorpicker-presets"
  }, presets.map((preset, index) => /*#__PURE__*/React.createElement("button", {
    key: index,
    type: "button",
    className: "ui-colorpicker-preset",
    style: {
      backgroundColor: preset
    },
    onClick: () => handlePresetSelect(preset),
    "aria-label": `Couleur prédéfinie ${preset}`
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ui-colorpicker-main"
  }, /*#__PURE__*/React.createElement(ColorPicker, {
    hue: hue,
    saturation: saturation,
    lightness: lightness,
    onChange: handlePickerChange,
    className: "ui-colorpicker-canvas"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ui-colorpicker-hue"
  }, /*#__PURE__*/React.createElement(ColorSlider, {
    type: "hue",
    value: hue,
    onChange: handleHueChange,
    min: 0,
    max: 360,
    className: "ui-colorpicker-hue-slider"
  })), showAlpha && /*#__PURE__*/React.createElement("div", {
    className: "ui-colorpicker-alpha"
  }, /*#__PURE__*/React.createElement(ColorSlider, {
    type: "alpha",
    value: alpha,
    onChange: handleAlphaChange,
    min: 0,
    max: 1,
    step: 0.01,
    className: "ui-colorpicker-alpha-slider"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ui-colorpicker-inputs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ui-colorpicker-input-group"
  }, /*#__PURE__*/React.createElement("label", null, "H"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: hue,
    onChange: e => handleInputChange('hue', e.target.value),
    min: 0,
    max: 360,
    className: "ui-colorpicker-input"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ui-colorpicker-input-group"
  }, /*#__PURE__*/React.createElement("label", null, "S"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: saturation,
    onChange: e => handleInputChange('saturation', e.target.value),
    min: 0,
    max: 100,
    className: "ui-colorpicker-input"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ui-colorpicker-input-group"
  }, /*#__PURE__*/React.createElement("label", null, "L"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: lightness,
    onChange: e => handleInputChange('lightness', e.target.value),
    min: 0,
    max: 100,
    className: "ui-colorpicker-input"
  })), showAlpha && /*#__PURE__*/React.createElement("div", {
    className: "ui-colorpicker-input-group"
  }, /*#__PURE__*/React.createElement("label", null, "A"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: Math.round(alpha * 100),
    onChange: e => handleInputChange('alpha', e.target.value),
    min: 0,
    max: 100,
    className: "ui-colorpicker-input"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ui-colorpicker-actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ui-button ui-button--secondary",
    onClick: handleCancel
  }, "Annuler"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ui-button ui-button--primary",
    onClick: handleConfirm
  }, "Confirmer")))));
};
ColorPickerOptimized.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  presets: PropTypes.arrayOf(PropTypes.string),
  showAlpha: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string
};
export default ColorPickerOptimized;