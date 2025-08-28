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
    const calculated = Math.min(Math.max((value / max) * 100, 0), 100);
    return Math.round(calculated);
  }, [value, max]);

  const progressClasses = [
    'ui-progress',
    type === 'circular' ? 'ui-progress-circular' : '',
    variant !== 'default' ? variant : '',
    size !== 'default' ? size : '',
    style !== 'default' ? style : '',
    disabled ? 'disabled' : '',
    className
  ].filter(Boolean).join(' ');

  const fillClasses = [
    'ui-progress-fill',
    variant !== 'default' ? variant : '',
    !animated ? 'no-animation' : ''
  ].filter(Boolean).join(' ');

  // Progress linéaire
  if (type === 'linear') {
    return (
      <div className={progressClasses} style={customStyle}>
        {showLabel && (
          <div className="ui-progress-label">
            <span>{label}</span>
            {showPercentage && (
              <span className="ui-progress-text">{percentage}%</span>
            )}
          </div>
        )}
        
        <div className="ui-progress-bar">
          <div
            className={fillClasses}
            style={{ width: `${percentage}%` }}
          />
          {showPercentage && (
            <div 
              className="ui-progress-indicator"
              style={{ left: `${percentage}%` }}
            >
              {percentage}%
            </div>
          )}
        </div>
      </div>
    );
  }

  // Progress circulaire
  const radius = size === 'small' ? 26 : size === 'large' ? 52 : size === 'xlarge' ? 70 : 40;
  const strokeWidth = size === 'small' ? 3 : size === 'large' ? 6 : size === 'xlarge' ? 8 : 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={progressClasses} style={customStyle}>
      <svg
        className="ui-progress-svg"
        width={radius * 2 + strokeWidth}
        height={radius * 2 + strokeWidth}
      >
        <circle
          className="ui-progress-track"
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className={fillClasses}
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      
      <div className="ui-progress-content">
        {showPercentage && (
          <div className="ui-progress-percentage">{percentage}%</div>
        )}
        {label && (
          <div className="ui-progress-label">{label}</div>
        )}
      </div>
    </div>
  );
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


