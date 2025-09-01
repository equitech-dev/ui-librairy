function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
const Portal = ({
  children,
  container = document.body,
  className = '',
  position = 'fixed',
  alignment = 'center',
  showBackdrop = false,
  backdropBlur = false,
  backdropVariant = 'default',
  animation = 'fade-in',
  zIndex = 'medium',
  disablePortal = false,
  ...props
}) => {
  const [mounted, setMounted] = useState(false);
  const [portalContainer, setPortalContainer] = useState(null);
  const containerRef = useRef(null);

  // Handle container creation and mounting
  useEffect(() => {
    setMounted(true);

    // Create portal container if needed
    if (typeof container === 'string') {
      let targetContainer = document.getElementById(container);
      if (!targetContainer) {
        targetContainer = document.createElement('div');
        targetContainer.id = container;
        document.body.appendChild(targetContainer);
      }
      setPortalContainer(targetContainer);
    } else if (container instanceof HTMLElement) {
      setPortalContainer(container);
    } else {
      setPortalContainer(document.body);
    }
    return () => {
      // Cleanup custom container if it was created
      if (typeof container === 'string' && containerRef.current) {
        const targetContainer = document.getElementById(container);
        if (targetContainer && targetContainer.children.length === 0) {
          targetContainer.remove();
        }
      }
    };
  }, [container]);

  // Don't render until mounted
  if (!mounted || disablePortal) {
    return children;
  }

  // Build portal classes
  const portalClasses = ['ui-portal', `ui-portal--${position}`, `ui-portal--${alignment}`, `ui-portal--z-${zIndex}`, showBackdrop && 'ui-portal--overlay', showBackdrop && backdropBlur && 'ui-portal--overlay-blur', showBackdrop && backdropVariant !== 'default' && `ui-portal--overlay-${backdropVariant}`, animation && `ui-portal--${animation}`, className].filter(Boolean).join(' ');

  // Portal content
  const portalContent = /*#__PURE__*/React.createElement("div", _extends({
    ref: containerRef,
    className: portalClasses
  }, props), children);

  // Render portal
  return /*#__PURE__*/createPortal(portalContent, portalContainer);
};
Portal.propTypes = {
  children: PropTypes.node.isRequired,
  container: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(HTMLElement)]),
  className: PropTypes.string,
  position: PropTypes.oneOf(['fixed', 'absolute']),
  alignment: PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right']),
  showBackdrop: PropTypes.bool,
  backdropBlur: PropTypes.bool,
  backdropVariant: PropTypes.oneOf(['default', 'light', 'dark']),
  animation: PropTypes.oneOf(['fade-in', 'slide-in', 'scale-in']),
  zIndex: PropTypes.oneOf(['low', 'medium', 'high', 'top']),
  disablePortal: PropTypes.bool
};

// Portal Container Component
export const PortalContainer = ({
  children,
  className = '',
  variant = 'constrained',
  ...props
}) => {
  const containerClasses = ['ui-portal-container', `ui-portal-container--${variant}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: containerClasses
  }, props), children);
};
PortalContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['constrained', 'full', 'auto'])
};

// Portal Backdrop Component
export const PortalBackdrop = ({
  className = '',
  variant = 'default',
  blur = false,
  onClick,
  ...props
}) => {
  const backdropClasses = ['ui-portal-backdrop', variant !== 'default' && `ui-portal-backdrop--${variant}`, blur && 'ui-portal-backdrop--blur', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: backdropClasses,
    onClick: onClick
  }, props));
};
PortalBackdrop.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'light', 'dark']),
  blur: PropTypes.bool,
  onClick: PropTypes.func
};

// Portal Content Component
export const PortalContent = ({
  children,
  className = '',
  position = 'center',
  ...props
}) => {
  const contentClasses = ['ui-portal-content', `ui-portal-content--${position}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: contentClasses
  }, props), children);
};
PortalContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  position: PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right'])
};
export default Portal;