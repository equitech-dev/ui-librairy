import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './Popover.scss';
const Popover = ({
  trigger,
  content,
  position = 'bottom',
  variant = 'default',
  size = 'default',
  disabled = false,
  onOpen,
  onClose,
  className = '',
  style = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [calculatedPosition, setCalculatedPosition] = useState(position);
  const popoverRef = useRef(null);
  const triggerRef = useRef(null);
  const contentRef = useRef(null);

  // Calculer la position optimale
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !contentRef.current) return position;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const positions = ['top', 'bottom', 'left', 'right'];
    let bestPosition = position;

    // Vérifier si la position actuelle fonctionne
    const checkPosition = pos => {
      let fits = true;
      switch (pos) {
        case 'top':
          fits = triggerRect.top - contentRect.height > 0;
          break;
        case 'bottom':
          fits = triggerRect.bottom + contentRect.height < viewportHeight;
          break;
        case 'left':
          fits = triggerRect.left - contentRect.width > 0;
          break;
        case 'right':
          fits = triggerRect.right + contentRect.width < viewportWidth;
          break;
        default:
          break;
      }
      return fits;
    };

    // Trouver la meilleure position
    if (!checkPosition(position)) {
      for (const pos of positions) {
        if (checkPosition(pos)) {
          bestPosition = pos;
          break;
        }
      }
    }
    setCalculatedPosition(bestPosition);
  }, [position]);

  // Gérer l'ouverture/fermeture
  const handleToggle = useCallback(() => {
    if (disabled) return;
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (newIsOpen) {
      onOpen?.();
      // Calculer la position après le rendu
      setTimeout(calculatePosition, 0);
    } else {
      onClose?.();
    }
  }, [isOpen, disabled, onOpen, onClose, calculatePosition]);

  // Fermer au clic extérieur
  useEffect(() => {
    const handleClickOutside = event => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
        onClose?.();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
          setIsOpen(false);
          onClose?.();
        }
      });
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Recalculer la position au redimensionnement
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        calculatePosition();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, calculatePosition]);
  const popoverClasses = ['ui-popover', className].filter(Boolean).join(' ');
  const contentClasses = ['ui-popover-content', calculatedPosition, variant !== 'default' ? variant : '', size !== 'default' ? size : '', isOpen ? 'visible' : ''].filter(Boolean).join(' ');

  // Styles de positionnement
  const getContentStyles = () => {
    if (!triggerRef.current) return {};
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const baseStyles = {
      ...style
    };
    switch (calculatedPosition) {
      case 'top':
        baseStyles.bottom = `${window.innerHeight - triggerRect.top + 8}px`;
        baseStyles.left = `${triggerRect.left + triggerRect.width / 2}px`;
        baseStyles.transform = 'translateX(-50%)';
        break;
      case 'bottom':
        baseStyles.top = `${triggerRect.bottom + 8}px`;
        baseStyles.left = `${triggerRect.left + triggerRect.width / 2}px`;
        baseStyles.transform = 'translateX(-50%)';
        break;
      case 'left':
        baseStyles.right = `${window.innerWidth - triggerRect.left + 8}px`;
        baseStyles.top = `${triggerRect.top + triggerRect.height / 2}px`;
        baseStyles.transform = 'translateY(-50%)';
        break;
      case 'right':
        baseStyles.left = `${triggerRect.right + 8}px`;
        baseStyles.top = `${triggerRect.top + triggerRect.height / 2}px`;
        baseStyles.transform = 'translateY(-50%)';
        break;
      default:
        break;
    }
    return baseStyles;
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: popoverRef,
    className: popoverClasses
  }, /*#__PURE__*/React.createElement("button", {
    ref: triggerRef,
    className: "ui-popover-trigger",
    onClick: handleToggle,
    disabled: disabled,
    "aria-expanded": isOpen,
    "aria-haspopup": "dialog"
  }, trigger), /*#__PURE__*/React.createElement("div", {
    ref: contentRef,
    className: contentClasses,
    style: getContentStyles(),
    role: "dialog",
    "aria-modal": "false"
  }, content));
};
Popover.propTypes = {
  trigger: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  variant: PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['default', 'small', 'large']),
  disabled: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
};
export default Popover;