function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
const Overlay = ({
  isOpen,
  onClose,
  children,
  className = '',
  backdrop = true,
  backdropVariant = 'default',
  backdropBlur = false,
  backdropBlurIntensity = 'normal',
  contentPosition = 'center',
  contentConstraint = 'constrained',
  contentAnimation = 'fade-in',
  overlayAnimation = 'fade',
  theme = 'default',
  showCloseButton = false,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  preventScroll = true,
  loading = false,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const overlayRef = useRef(null);
  const backdropRef = useRef(null);

  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(true);

      // Prevent body scroll
      if (preventScroll) {
        document.body.style.overflow = 'hidden';
      }

      // Auto-close on escape
      if (closeOnEscape) {
        const handleEscape = e => {
          if (e.key === 'Escape') {
            onClose();
          }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
      }
    } else {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);

        // Restore body scroll
        if (preventScroll) {
          document.body.style.overflow = '';
        }
      }, 300); // Match transition duration

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, closeOnEscape, preventScroll]);

  // Handle backdrop click
  const handleBackdropClick = useCallback(e => {
    if (closeOnBackdropClick && e.target === backdropRef.current) {
      onClose();
    }
  }, [closeOnBackdropClick, onClose]);

  // Handle close button click
  const handleCloseClick = useCallback(() => {
    onClose();
  }, [onClose]);
  if (!isVisible) return null;

  // Build overlay classes
  const overlayClasses = ['ui-overlay', 'ui-overlay--active', backdrop && `ui-overlay--backdrop`, backdrop && backdropVariant !== 'default' && `ui-overlay--backdrop-${backdropVariant}`, backdropBlur && `ui-overlay--backdrop-blur`, backdropBlur && backdropBlurIntensity !== 'normal' && `ui-overlay--backdrop-blur-${backdropBlurIntensity}`, `ui-overlay--content-${contentPosition}`, `ui-overlay--${overlayAnimation}`, overlayAnimation === 'slide' && `ui-overlay--slide-${contentPosition}`, theme !== 'default' && `ui-overlay--${theme}`, loading && 'ui-overlay--loading', preventScroll && 'ui-overlay--scroll-lock', isOpen && 'ui-overlay--visible', !isOpen && 'ui-overlay--hidden', className].filter(Boolean).join(' ');

  // Build content classes
  const contentClasses = ['ui-overlay-content', `ui-overlay-content--${contentConstraint}`, `ui-overlay-content--${contentAnimation}`].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: overlayRef,
    className: overlayClasses,
    role: "dialog",
    "aria-modal": "true"
  }, props), backdrop && /*#__PURE__*/React.createElement("div", {
    ref: backdropRef,
    className: "ui-overlay-backdrop",
    onClick: handleBackdropClick,
    "aria-hidden": "true"
  }), showCloseButton && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ui-overlay-close",
    onClick: handleCloseClick,
    "aria-label": "Fermer"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }))), /*#__PURE__*/React.createElement("div", {
    className: contentClasses
  }, loading ? /*#__PURE__*/React.createElement("div", {
    className: "ui-loader ui-loader--spinner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ui-loader-spinner"
  }), /*#__PURE__*/React.createElement("span", null, "Chargement...")) : children));
};
Overlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  backdrop: PropTypes.bool,
  backdropVariant: PropTypes.oneOf(['default', 'light', 'dark']),
  backdropBlur: PropTypes.bool,
  backdropBlurIntensity: PropTypes.oneOf(['light', 'normal', 'heavy']),
  contentPosition: PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right']),
  contentConstraint: PropTypes.oneOf(['constrained', 'full', 'auto']),
  contentAnimation: PropTypes.oneOf(['fade-in', 'slide-in', 'scale-in', 'bounce-in']),
  overlayAnimation: PropTypes.oneOf(['fade', 'slide', 'scale']),
  theme: PropTypes.oneOf(['default', 'glass', 'dark']),
  showCloseButton: PropTypes.bool,
  closeOnBackdropClick: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  preventScroll: PropTypes.bool,
  loading: PropTypes.bool
};

// Overlay Content Component
export const OverlayContent = ({
  children,
  className = '',
  constraint = 'constrained',
  animation = 'fade-in',
  ...props
}) => {
  const contentClasses = ['ui-overlay-content', `ui-overlay-content--${constraint}`, `ui-overlay-content--${animation}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: contentClasses
  }, props), children);
};
OverlayContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  constraint: PropTypes.oneOf(['constrained', 'full', 'auto']),
  animation: PropTypes.oneOf(['fade-in', 'slide-in', 'scale-in', 'bounce-in'])
};

// Overlay Backdrop Component
export const OverlayBackdrop = ({
  className = '',
  variant = 'default',
  blur = false,
  blurIntensity = 'normal',
  onClick,
  ...props
}) => {
  const backdropClasses = ['ui-overlay-backdrop', variant !== 'default' && `ui-overlay-backdrop--${variant}`, blur && `ui-overlay-backdrop--blur`, blur && blurIntensity !== 'normal' && `ui-overlay-backdrop--blur-${blurIntensity}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: backdropClasses,
    onClick: onClick
  }, props));
};
OverlayBackdrop.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'light', 'dark']),
  blur: PropTypes.bool,
  blurIntensity: PropTypes.oneOf(['light', 'normal', 'heavy']),
  onClick: PropTypes.func
};

// Overlay Close Button Component
export const OverlayCloseButton = ({
  className = '',
  onClick,
  size = 'md',
  theme = 'default',
  ...props
}) => {
  const buttonClasses = ['ui-overlay-close', size !== 'md' && `ui-overlay-close--${size}`, theme !== 'default' && `ui-overlay-close--${theme}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: buttonClasses,
    onClick: onClick,
    "aria-label": "Fermer"
  }, props), /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })));
};
OverlayCloseButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  theme: PropTypes.oneOf(['default', 'dark', 'glass'])
};
export default Overlay;