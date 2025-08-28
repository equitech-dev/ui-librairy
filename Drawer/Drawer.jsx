import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const Drawer = ({
  isOpen,
  onClose,
  position = 'left',
  size = 'md',
  title,
  subtitle,
  children,
  footer,
  footerAlignment = 'right',
  showOverlay = true,
  overlayBlur = false,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  preventScroll = true,
  animation = 'slide',
  theme = 'default',
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);

  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(true);
      
      // Prevent body scroll
      if (preventScroll) {
        document.body.style.overflow = 'hidden';
      }

      // Focus management
      const focusableElements = drawerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements?.length > 0) {
        focusableElements[0].focus();
      }

      // Auto-close on escape
      if (closeOnEscape) {
        const handleEscape = (e) => {
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

  // Handle overlay click
  const handleOverlayClick = useCallback((e) => {
    if (closeOnOverlayClick && e.target === overlayRef.current) {
      onClose();
    }
  }, [closeOnOverlayClick, onClose]);

  // Handle close button click
  const handleCloseClick = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isVisible) return null;

  const drawerClasses = [
    'ui-drawer',
    `ui-drawer--${position}`,
    `ui-drawer--${size}`,
    `ui-drawer--${animation}`,
    theme !== 'default' && `ui-drawer--${theme}`,
    isOpen && 'ui-drawer--open',
    className
  ].filter(Boolean).join(' ');

  const overlayClasses = [
    'ui-drawer-overlay',
    showOverlay && 'ui-drawer-overlay--visible',
    overlayBlur && 'ui-drawer-overlay--blur'
  ].filter(Boolean).join(' ');

  const footerClasses = [
    'ui-drawer-footer',
    footerAlignment !== 'right' && `ui-drawer-footer--${footerAlignment}`
  ].filter(Boolean).join(' ');

  const drawerContent = (
    <>
      {/* Overlay */}
      {showOverlay && (
        <div
          ref={overlayRef}
          className={overlayClasses}
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={drawerClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
        aria-describedby={subtitle ? 'drawer-subtitle' : undefined}
        {...props}
      >
        {/* Header */}
        {(title || subtitle) && (
          <div className="ui-drawer-header">
            <div>
              {title && (
                <h2 id="drawer-title" className="ui-drawer-title">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p id="drawer-subtitle" className="ui-drawer-subtitle">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              type="button"
              className="ui-drawer-close"
              onClick={handleCloseClick}
              aria-label="Fermer le panneau"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        <div className="ui-drawer-body">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className={footerClasses}>
            {footer}
          </div>
        )}
      </div>
    </>
  );

  // Use Portal for better z-index management
  return createPortal(drawerContent, document.body);
};

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'full']),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.node,
  footerAlignment: PropTypes.oneOf(['left', 'center', 'right', 'space-between']),
  showOverlay: PropTypes.bool,
  overlayBlur: PropTypes.bool,
  closeOnOverlayClick: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  preventScroll: PropTypes.bool,
  animation: PropTypes.oneOf(['slide', 'fade', 'scale']),
  theme: PropTypes.oneOf(['default', 'dark', 'glass']),
  className: PropTypes.string
};

export default Drawer;


