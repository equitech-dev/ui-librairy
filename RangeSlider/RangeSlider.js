import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
const RangeSlider = ({
  min = 0,
  max = 100,
  value,
  defaultValue,
  step = 1,
  disabled = false,
  showLabels = true,
  showValue = true,
  showTicks = false,
  showTooltip = false,
  orientation = 'horizontal',
  range = false,
  minValue,
  maxValue,
  defaultMinValue,
  defaultMaxValue,
  onValueChange,
  onRangeChange,
  onChange,
  className = "",
  size = "medium",
  variant = "default",
  label,
  minLabel,
  maxLabel,
  formatValue,
  ticks,
  children
}) => {
  const [currentValue, setCurrentValue] = useState(defaultValue || min);
  const [currentMinValue, setCurrentMinValue] = useState(defaultMinValue || min);
  const [currentMaxValue, setCurrentMaxValue] = useState(defaultMaxValue || max);
  const [isDragging, setIsDragging] = useState(false);
  const [activeThumb, setActiveThumb] = useState(null);
  const [showTooltipState, setShowTooltipState] = useState(false);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const minThumbRef = useRef(null);
  const maxThumbRef = useRef(null);

  // Initialisation des valeurs
  useEffect(() => {
    if (value !== undefined) {
      setCurrentValue(value);
    }
    if (minValue !== undefined) {
      setCurrentMinValue(minValue);
    }
    if (maxValue !== undefined) {
      setCurrentMaxValue(maxValue);
    }
  }, [value, minValue, maxValue]);

  // Calcul du pourcentage
  const getPercentage = useCallback(val => {
    return (val - min) / (max - min) * 100;
  }, [min, max]);

  // Calcul de la valeur depuis le pourcentage
  const getValueFromPercentage = useCallback(percentage => {
    const value = percentage / 100 * (max - min) + min;
    return Math.round(value / step) * step;
  }, [min, max, step]);

  // Formatage de la valeur
  const formatDisplayValue = useCallback(val => {
    if (formatValue) {
      return formatValue(val);
    }
    return val.toString();
  }, [formatValue]);

  // Gestion du clic sur la piste
  const handleTrackClick = useCallback(e => {
    if (disabled) return;
    const rect = trackRef.current.getBoundingClientRect();
    const isVertical = orientation === 'vertical';
    const clickPosition = isVertical ? (rect.bottom - e.clientY) / rect.height : (e.clientX - rect.left) / rect.width;
    const percentage = Math.max(0, Math.min(100, clickPosition * 100));
    const newValue = getValueFromPercentage(percentage);
    if (range) {
      const minDist = Math.abs(newValue - currentMinValue);
      const maxDist = Math.abs(newValue - currentMaxValue);
      if (minDist <= maxDist) {
        const newMinValue = Math.min(newValue, currentMaxValue);
        setCurrentMinValue(newMinValue);
        if (onRangeChange) onRangeChange(newMinValue, currentMaxValue);
        if (onChange) onChange({
          min: newMinValue,
          max: currentMaxValue
        });
      } else {
        const newMaxValue = Math.max(newValue, currentMinValue);
        setCurrentMaxValue(newMaxValue);
        if (onRangeChange) onRangeChange(currentMinValue, newMaxValue);
        if (onChange) onChange({
          min: currentMinValue,
          max: newMaxValue
        });
      }
    } else {
      setCurrentValue(newValue);
      if (onValueChange) onValueChange(newValue);
      if (onChange) onChange(newValue);
    }
  }, [disabled, orientation, range, currentMinValue, currentMaxValue, onRangeChange, onValueChange, onChange, getValueFromPercentage]);

  // Gestion du début du drag
  const handleMouseDown = useCallback((e, thumbType) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(true);
    setActiveThumb(thumbType);
    setShowTooltipState(showTooltip);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [disabled, showTooltip]);

  // Gestion du mouvement de la souris
  const handleMouseMove = useCallback(e => {
    if (!isDragging || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const isVertical = orientation === 'vertical';
    const mousePosition = isVertical ? (rect.bottom - e.clientY) / rect.height : (e.clientX - rect.left) / rect.width;
    const percentage = Math.max(0, Math.min(100, mousePosition * 100));
    const newValue = getValueFromPercentage(percentage);
    if (range) {
      if (activeThumb === 'min') {
        const clampedValue = Math.min(newValue, currentMaxValue - step);
        setCurrentMinValue(clampedValue);
        if (onRangeChange) onRangeChange(clampedValue, currentMaxValue);
        if (onChange) onChange({
          min: clampedValue,
          max: currentMaxValue
        });
      } else {
        const clampedValue = Math.max(newValue, currentMinValue + step);
        setCurrentMaxValue(clampedValue);
        if (onRangeChange) onRangeChange(currentMinValue, clampedValue);
        if (onChange) onChange({
          min: currentMinValue,
          max: clampedValue
        });
      }
    } else {
      setCurrentValue(newValue);
      if (onValueChange) onValueChange(newValue);
      if (onChange) onChange(newValue);
    }
  }, [isDragging, orientation, range, activeThumb, currentMinValue, currentMaxValue, step, onRangeChange, onValueChange, onChange, getValueFromPercentage]);

  // Gestion de la fin du drag
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setActiveThumb(null);
    setShowTooltipState(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  // Gestion des touches clavier
  const handleKeyDown = useCallback((e, thumbType) => {
    if (disabled) return;
    const isVertical = orientation === 'vertical';
    const increment = e.shiftKey ? step * 10 : step;
    let newValue;
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        e.preventDefault();
        newValue = range ? (thumbType === 'min' ? currentMinValue : currentMaxValue) + increment : currentValue + increment;
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        e.preventDefault();
        newValue = range ? (thumbType === 'min' ? currentMinValue : currentMaxValue) - increment : currentValue - increment;
        break;
      case 'Home':
        e.preventDefault();
        newValue = min;
        break;
      case 'End':
        e.preventDefault();
        newValue = max;
        break;
      default:
        return;
    }

    // Appliquer les contraintes
    newValue = Math.max(min, Math.min(max, newValue));
    if (range) {
      if (thumbType === 'min') {
        const clampedValue = Math.min(newValue, currentMaxValue - step);
        setCurrentMinValue(clampedValue);
        if (onRangeChange) onRangeChange(clampedValue, currentMaxValue);
        if (onChange) onChange({
          min: clampedValue,
          max: currentMaxValue
        });
      } else {
        const clampedValue = Math.max(newValue, currentMinValue + step);
        setCurrentMaxValue(clampedValue);
        if (onRangeChange) onRangeChange(currentMinValue, clampedValue);
        if (onChange) onChange({
          min: currentMinValue,
          max: clampedValue
        });
      }
    } else {
      setCurrentValue(newValue);
      if (onValueChange) onValueChange(newValue);
      if (onChange) onChange(newValue);
    }
  }, [disabled, orientation, range, currentMinValue, currentMaxValue, currentValue, step, min, max, onRangeChange, onValueChange, onChange]);

  // Nettoyage des event listeners
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Calcul des positions
  const minPercentage = getPercentage(currentMinValue);
  const maxPercentage = getPercentage(currentMaxValue);
  const valuePercentage = getPercentage(currentValue);

  // Classes CSS
  const sliderClasses = ['ui-range-slider', size !== 'medium' && `ui-range-slider--${size}`, variant !== 'default' && `ui-range-slider--${variant}`, orientation === 'vertical' && 'vertical', range && 'range', disabled && 'disabled', className].filter(Boolean).join(' ');

  // Génération des ticks
  const generateTicks = () => {
    if (!showTicks && !ticks) return null;
    const tickValues = ticks || [];
    if (!ticks) {
      const tickCount = Math.min(10, Math.floor((max - min) / step) + 1);
      for (let i = 0; i < tickCount; i++) {
        tickValues.push(min + i * step);
      }
    }
    return tickValues.map((tickValue, index) => {
      const tickPercentage = getPercentage(tickValue);
      const isActive = range ? tickValue >= currentMinValue && tickValue <= currentMaxValue : Math.abs(tickValue - currentValue) <= step / 2;
      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: `ui-range-slider-tick ${isActive ? 'active' : ''}`,
        style: {
          [orientation === 'vertical' ? 'bottom' : 'left']: `${tickPercentage}%`
        }
      }, showTicks && /*#__PURE__*/React.createElement("div", {
        className: "ui-range-slider-tick-label"
      }, formatDisplayValue(tickValue)));
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: sliderClasses
  }, label && /*#__PURE__*/React.createElement("div", {
    className: "ui-range-slider-label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "ui-range-slider-container",
    ref: containerRef
  }, /*#__PURE__*/React.createElement("div", {
    className: `ui-range-slider-track ${disabled ? 'disabled' : ''}`,
    ref: trackRef,
    onClick: handleTrackClick
  }, range && /*#__PURE__*/React.createElement("div", {
    className: "ui-range-slider-selection",
    style: {
      [orientation === 'vertical' ? 'bottom' : 'left']: `${minPercentage}%`,
      [orientation === 'vertical' ? 'height' : 'width']: `${maxPercentage - minPercentage}%`
    }
  }), generateTicks()), range && /*#__PURE__*/React.createElement("div", {
    ref: minThumbRef,
    className: `ui-range-slider-thumb ${disabled ? 'disabled' : ''}`,
    style: {
      [orientation === 'vertical' ? 'bottom' : 'left']: `${minPercentage}%`
    },
    onMouseDown: e => handleMouseDown(e, 'min'),
    onKeyDown: e => handleKeyDown(e, 'min'),
    tabIndex: disabled ? -1 : 0,
    role: "slider",
    "aria-valuemin": min,
    "aria-valuemax": max,
    "aria-valuenow": currentMinValue,
    "aria-label": "Valeur minimale"
  }, showTooltipState && activeThumb === 'min' && /*#__PURE__*/React.createElement("div", {
    className: "ui-range-slider-tooltip visible"
  }, formatDisplayValue(currentMinValue))), /*#__PURE__*/React.createElement("div", {
    ref: range ? maxThumbRef : minThumbRef,
    className: `ui-range-slider-thumb ${disabled ? 'disabled' : ''}`,
    style: {
      [orientation === 'vertical' ? 'bottom' : 'left']: `${range ? maxPercentage : valuePercentage}%`
    },
    onMouseDown: e => handleMouseDown(e, range ? 'max' : 'single'),
    onKeyDown: e => handleKeyDown(e, range ? 'max' : 'single'),
    tabIndex: disabled ? -1 : 0,
    role: "slider",
    "aria-valuemin": min,
    "aria-valuemax": max,
    "aria-valuenow": range ? currentMaxValue : currentValue,
    "aria-label": range ? "Valeur maximale" : "Valeur"
  }, showTooltipState && (activeThumb === 'max' || !range) && /*#__PURE__*/React.createElement("div", {
    className: "ui-range-slider-tooltip visible"
  }, formatDisplayValue(range ? currentMaxValue : currentValue)))), showLabels && /*#__PURE__*/React.createElement("div", {
    className: "ui-range-slider-labels"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ui-range-slider-label"
  }, minLabel || formatDisplayValue(min)), showValue && /*#__PURE__*/React.createElement("div", {
    className: "ui-range-slider-value"
  }, range ? `${formatDisplayValue(currentMinValue)} - ${formatDisplayValue(currentMaxValue)}` : formatDisplayValue(currentValue)), /*#__PURE__*/React.createElement("div", {
    className: "ui-range-slider-label"
  }, maxLabel || formatDisplayValue(max))), children);
};
RangeSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  step: PropTypes.number,
  disabled: PropTypes.bool,
  showLabels: PropTypes.bool,
  showValue: PropTypes.bool,
  showTicks: PropTypes.bool,
  showTooltip: PropTypes.bool,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  range: PropTypes.bool,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  defaultMinValue: PropTypes.number,
  defaultMaxValue: PropTypes.number,
  onValueChange: PropTypes.func,
  onRangeChange: PropTypes.func,
  onChange: PropTypes.func,
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['default', 'outlined', 'filled', 'gradient', 'rounded', 'success', 'warning', 'error']),
  label: PropTypes.string,
  minLabel: PropTypes.string,
  maxLabel: PropTypes.string,
  formatValue: PropTypes.func,
  ticks: PropTypes.arrayOf(PropTypes.number),
  children: PropTypes.node
};
export default RangeSlider;