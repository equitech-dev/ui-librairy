import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './Rating.scss';
const Rating = ({
  value = 0,
  max = 5,
  precision = 1,
  size = 'default',
  variant = 'default',
  style = 'default',
  disabled = false,
  readonly = false,
  animated = false,
  showText = false,
  showValue = false,
  onRatingChange,
  className = '',
  style: customStyle = {}
}) => {
  const [hoverValue, setHoverValue] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const handleStarClick = useCallback(starValue => {
    if (disabled || readonly) return;
    const newValue = precision === 0.5 ? starValue === value ? starValue - 0.5 : starValue : starValue;
    onRatingChange?.(newValue);
  }, [value, precision, disabled, readonly, onRatingChange]);
  const handleStarHover = useCallback(starValue => {
    if (disabled || readonly) return;
    setHoverValue(starValue);
    setIsHovering(true);
  }, [disabled, readonly]);
  const handleStarLeave = useCallback(() => {
    if (disabled || readonly) return;
    setIsHovering(false);
    setHoverValue(0);
  }, [disabled, readonly]);
  const getStarState = starIndex => {
    const currentValue = isHovering ? hoverValue : value;
    const starValue = starIndex + 1;
    if (precision === 0.5) {
      if (currentValue >= starValue) return 'filled';
      if (currentValue >= starValue - 0.5) return 'half-filled';
      return 'empty';
    }
    return currentValue >= starValue ? 'filled' : 'empty';
  };
  const getRatingText = () => {
    const currentValue = isHovering ? hoverValue : value;
    const texts = {
      0: 'Aucune évaluation',
      0.5: 'Très mauvais',
      1: 'Mauvais',
      1.5: 'Assez mauvais',
      2: 'Moyen',
      2.5: 'Assez bien',
      3: 'Bien',
      3.5: 'Très bien',
      4: 'Excellent',
      4.5: 'Exceptionnel',
      5: 'Parfait'
    };
    return texts[currentValue] || 'Aucune évaluation';
  };
  const ratingClasses = ['ui-rating', size !== 'default' ? size : '', variant !== 'default' ? variant : '', style !== 'default' ? style : '', disabled ? 'disabled' : '', readonly ? 'readonly' : '', animated ? 'animated' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: ratingClasses,
    style: customStyle
  }, /*#__PURE__*/React.createElement("div", {
    className: "ui-rating-stars"
  }, Array.from({
    length: max
  }, (_, index) => {
    const starState = getStarState(index);
    const starClasses = ['ui-rating-star', starState, variant !== 'default' ? variant : ''].filter(Boolean).join(' ');
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: starClasses,
      onClick: () => handleStarClick(index + 1),
      onMouseEnter: () => handleStarHover(index + 1),
      onMouseLeave: handleStarLeave,
      role: "button",
      tabIndex: disabled || readonly ? -1 : 0,
      "aria-label": `${index + 1} étoile${index > 0 ? 's' : ''}`,
      "aria-pressed": starState === 'filled' || starState === 'half-filled'
    });
  })), (showText || showValue) && /*#__PURE__*/React.createElement("div", {
    className: "ui-rating-text"
  }, showValue && `${value}/${max}`, showText && showValue && ' - ', showText && getRatingText()));
};

// Composant Rating avec texte détaillé
export const RatingWithText = ({
  value = 0,
  max = 5,
  totalRatings = 0,
  size = 'default',
  variant = 'default',
  className = '',
  style = {}
}) => {
  const averageText = value.toFixed(1);
  const percentage = value / max * 100;
  const ratingClasses = ['ui-rating-with-text', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: ratingClasses,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "ui-rating-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ui-rating-average"
  }, averageText), /*#__PURE__*/React.createElement("span", {
    className: "ui-rating-max"
  }, "/ ", max), /*#__PURE__*/React.createElement(Rating, {
    value: value,
    max: max,
    size: size,
    variant: variant,
    readonly: true,
    showText: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "ui-rating-details"
  }, "Bas\xE9 sur ", totalRatings, " \xE9valuation", totalRatings > 1 ? 's' : ''));
};

// Composant Rating group pour afficher la distribution
export const RatingGroup = ({
  ratings = [],
  max = 5,
  size = 'default',
  variant = 'default',
  className = '',
  style = {}
}) => {
  const totalRatings = ratings.reduce((sum, rating) => sum + rating.count, 0);
  const ratingClasses = ['ui-rating-group', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: ratingClasses,
    style: style
  }, ratings.map((rating, index) => {
    const percentage = totalRatings > 0 ? rating.count / totalRatings * 100 : 0;
    const starValue = max - index;
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: "ui-rating-item"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ui-rating-label"
    }, starValue, " \xE9toile", starValue > 1 ? 's' : ''), /*#__PURE__*/React.createElement("div", {
      className: "ui-rating-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ui-rating-fill",
      style: {
        width: `${percentage}%`
      }
    })), /*#__PURE__*/React.createElement("span", {
      className: "ui-rating-count"
    }, rating.count));
  }));
};
Rating.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  precision: PropTypes.oneOf([0, 0.5, 1]),
  size: PropTypes.oneOf(['default', 'small', 'large', 'xlarge']),
  variant: PropTypes.oneOf(['default', 'success', 'warning', 'error', 'info']),
  style: PropTypes.oneOf(['default', 'outlined', 'rounded']),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  animated: PropTypes.bool,
  showText: PropTypes.bool,
  showValue: PropTypes.bool,
  onRatingChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
};
RatingWithText.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  totalRatings: PropTypes.number,
  size: PropTypes.oneOf(['default', 'small', 'large', 'xlarge']),
  variant: PropTypes.oneOf(['default', 'success', 'warning', 'error', 'info']),
  className: PropTypes.string,
  style: PropTypes.object
};
RatingGroup.propTypes = {
  ratings: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number.isRequired
  })),
  max: PropTypes.number,
  size: PropTypes.oneOf(['default', 'small', 'large', 'xlarge']),
  variant: PropTypes.oneOf(['default', 'success', 'warning', 'error', 'info']),
  className: PropTypes.string,
  style: PropTypes.object
};
export default Rating;