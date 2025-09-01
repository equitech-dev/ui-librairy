import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './Progress.scss';
const Progress = ({
  value = 0,
  max = 100,
  label,
  showLabel = true,
  showPercentage = false,
  variant = 'default',
  size = 'default',
  style = 'default',
  type = 'linear',
  disabled = false,
  animated = true,
  className = '',
  style: customStyle = {}
}) => {
  const percentage = useMemo(() => {
    const calculated = Math.min(Math.max(value / max * 100, 0), 100);
    return Math.round(calculated);
  }, [value, max]);
  const progressClasses = ['ui-progress', type === 'circular' ? 'ui-progress-circular' : '', variant !== 'default' ? variant : '', size !== 'default' ? size : '', style !== 'default' ? style : '', disabled ? 'disabled' : '', className].filter(Boolean).join(' ');
  const fillClasses = ['ui-progress-fill', variant !== 'default' ? variant : '', !animated ? 'no-animation' : ''].filter(Boolean).join(' ');

  // Progress linéaire
  if (type === 'linear') {
    return /*#__PURE__*/React.createElement("div", {
      className: progressClasses,
      style: customStyle
    }, showLabel && /*#__PURE__*/React.createElement("div", {
      className: "ui-progress-label"
    }, /*#__PURE__*/React.createElement("span", null, label), showPercentage && /*#__PURE__*/React.createElement("span", {
      className: "ui-progress-text"
    }, percentage, "%")), /*#__PURE__*/React.createElement("div", {
      className: "ui-progress-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: fillClasses,
      style: {
        width: `${percentage}%`
      }
    }), showPercentage && /*#__PURE__*/React.createElement("div", {
      className: "ui-progress-indicator",
      style: {
        left: `${percentage}%`
      }
    }, percentage, "%")));
  }

  // Progress circulaire
  const radius = size === 'small' ? 26 : size === 'large' ? 52 : size === 'xlarge' ? 70 : 40;
  const strokeWidth = size === 'small' ? 3 : size === 'large' ? 6 : size === 'xlarge' ? 8 : 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - percentage / 100 * circumference;
  return /*#__PURE__*/React.createElement("div", {
    className: progressClasses,
    style: customStyle
  }, /*#__PURE__*/React.createElement("svg", {
    className: "ui-progress-svg",
    width: radius * 2 + strokeWidth,
    height: radius * 2 + strokeWidth
  }, /*#__PURE__*/React.createElement("circle", {
    className: "ui-progress-track",
    cx: radius + strokeWidth / 2,
    cy: radius + strokeWidth / 2,
    r: radius,
    strokeWidth: strokeWidth
  }), /*#__PURE__*/React.createElement("circle", {
    className: fillClasses,
    cx: radius + strokeWidth / 2,
    cy: radius + strokeWidth / 2,
    r: radius,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    strokeDashoffset: strokeDashoffset
  })), /*#__PURE__*/React.createElement("div", {
    className: "ui-progress-content"
  }, showPercentage && /*#__PURE__*/React.createElement("div", {
    className: "ui-progress-percentage"
  }, percentage, "%"), label && /*#__PURE__*/React.createElement("div", {
    className: "ui-progress-label"
  }, label)));
};
Progress.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  showPercentage: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'success', 'warning', 'error', 'info']),
  size: PropTypes.oneOf(['default', 'small', 'large', 'xlarge']),
  style: PropTypes.oneOf(['default', 'striped', 'gradient', 'bordered', 'rounded']),
  type: PropTypes.oneOf(['linear', 'circular']),
  disabled: PropTypes.bool,
  animated: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
};
export default Progress;