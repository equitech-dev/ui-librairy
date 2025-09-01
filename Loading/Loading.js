function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Loading.scss';
const Loading = ({
  variant = 'spinner',
  size = 'default',
  color = 'primary',
  text,
  progress,
  showProgress = false,
  className = '',
  style = {}
}) => {
  const [currentProgress, setCurrentProgress] = useState(0);

  // Mettre à jour la progression
  useEffect(() => {
    if (progress !== undefined) {
      setCurrentProgress(Math.min(Math.max(progress, 0), 100));
    }
  }, [progress]);
  const loadingClasses = ['ui-loading', variant, size !== 'default' ? size : '', color !== 'primary' ? color : '', className].filter(Boolean).join(' ');
  const renderLoadingContent = () => {
    switch (variant) {
      case 'dots':
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
          className: "ui-loading-dot"
        }), /*#__PURE__*/React.createElement("div", {
          className: "ui-loading-dot"
        }), /*#__PURE__*/React.createElement("div", {
          className: "ui-loading-dot"
        }));
      case 'wave':
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
          className: "ui-loading-bar"
        }), /*#__PURE__*/React.createElement("div", {
          className: "ui-loading-bar"
        }), /*#__PURE__*/React.createElement("div", {
          className: "ui-loading-bar"
        }), /*#__PURE__*/React.createElement("div", {
          className: "ui-loading-bar"
        }), /*#__PURE__*/React.createElement("div", {
          className: "ui-loading-bar"
        }));
      case 'cube':
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
          className: "ui-loading-face"
        }), /*#__PURE__*/React.createElement("div", {
          className: "ui-loading-face"
        }), /*#__PURE__*/React.createElement("div", {
          className: "ui-loading-face"
        }), /*#__PURE__*/React.createElement("div", {
          className: "ui-loading-face"
        }), /*#__PURE__*/React.createElement("div", {
          className: "ui-loading-face"
        }), /*#__PURE__*/React.createElement("div", {
          className: "ui-loading-face"
        }));
      default:
        return null;
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: loadingClasses,
    style: style
  }, renderLoadingContent(), showProgress && /*#__PURE__*/React.createElement("div", {
    className: "ui-loading-progress"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ui-loading-progress-bar",
    style: {
      width: `${currentProgress}%`
    }
  })), text && /*#__PURE__*/React.createElement("div", {
    className: "ui-loading-text"
  }, text));
};

// Composant LoadingContainer pour wrapper le loading
const LoadingContainer = ({
  children,
  variant = 'default',
  size = 'default',
  text,
  progress,
  showProgress = false,
  className = '',
  style = {}
}) => {
  const containerClasses = ['ui-loading-container', variant !== 'default' ? variant : '', size !== 'default' ? size : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: containerClasses,
    style: style
  }, /*#__PURE__*/React.createElement(Loading, {
    variant: "spinner",
    size: size,
    text: text,
    progress: progress,
    showProgress: showProgress
  }), children);
};

// Composant LoadingOverlay pour overlay plein écran
const LoadingOverlay = ({
  isVisible = false,
  text = 'Chargement...',
  progress,
  showProgress = false,
  onClose,
  className = '',
  style = {}
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (isVisible) {
      setIsMounted(true);
    } else {
      const timer = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);
  if (!isMounted) return null;
  const overlayClasses = ['ui-loading-container', 'overlay', isVisible ? 'loading' : 'loaded', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: overlayClasses,
    style: style
  }, /*#__PURE__*/React.createElement(Loading, {
    variant: "spinner",
    size: "large",
    text: text,
    progress: progress,
    showProgress: showProgress
  }), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      position: 'absolute',
      top: 'var(--spacing-l)',
      right: 'var(--spacing-l)',
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: 'var(--primary-dark)'
    }
  }, "\xD7"));
};

// Composant LoadingButton pour bouton avec état de chargement
const LoadingButton = ({
  children,
  loading = false,
  loadingText = 'Chargement...',
  variant = 'spinner',
  size = 'small',
  disabled = false,
  onClick,
  className = '',
  style = {},
  ...props
}) => {
  const buttonClasses = ['ui-button', loading ? 'loading' : '', disabled ? 'disabled' : '', className].filter(Boolean).join(' ');
  const handleClick = e => {
    if (!loading && !disabled && onClick) {
      onClick(e);
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    className: buttonClasses,
    onClick: handleClick,
    disabled: disabled || loading,
    style: style
  }, props), loading ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--spacing-xs)'
    }
  }, /*#__PURE__*/React.createElement(Loading, {
    variant: variant,
    size: size
  }), /*#__PURE__*/React.createElement("span", null, loadingText)) : children);
};

// Composant LoadingProgress pour barre de progression
const LoadingProgress = ({
  progress = 0,
  text,
  showText = true,
  size = 'default',
  color = 'primary',
  className = '',
  style = {}
}) => {
  const progressClasses = ['ui-loading-progress', size !== 'default' ? size : '', color !== 'primary' ? color : '', className].filter(Boolean).join(' ');
  const progressBarClasses = ['ui-loading-progress-bar', color !== 'primary' ? color : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: progressClasses,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: progressBarClasses,
    style: {
      width: `${Math.min(Math.max(progress, 0), 100)}%`
    }
  }), showText && text && /*#__PURE__*/React.createElement("div", {
    className: "ui-loading-text",
    style: {
      marginTop: 'var(--spacing-xs)'
    }
  }, text));
};
Loading.propTypes = {
  variant: PropTypes.oneOf(['spinner', 'dots', 'pulse', 'wave', 'ring', 'cube', 'heartbeat']),
  size: PropTypes.oneOf(['default', 'small', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary', 'white']),
  text: PropTypes.string,
  progress: PropTypes.number,
  showProgress: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
};
LoadingContainer.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'overlay', 'inline', 'minimal']),
  size: PropTypes.oneOf(['default', 'small', 'large']),
  text: PropTypes.string,
  progress: PropTypes.number,
  showProgress: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
};
LoadingOverlay.propTypes = {
  isVisible: PropTypes.bool,
  text: PropTypes.string,
  progress: PropTypes.number,
  showProgress: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
};
LoadingButton.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  variant: PropTypes.oneOf(['spinner', 'dots', 'pulse', 'wave', 'ring', 'cube', 'heartbeat']),
  size: PropTypes.oneOf(['default', 'small', 'large']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
};
LoadingProgress.propTypes = {
  progress: PropTypes.number,
  text: PropTypes.string,
  showText: PropTypes.bool,
  size: PropTypes.oneOf(['default', 'small', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary', 'white']),
  className: PropTypes.string,
  style: PropTypes.object
};

// Attacher les sous-composants à Loading
Loading.Container = LoadingContainer;
Loading.Overlay = LoadingOverlay;
Loading.Button = LoadingButton;
Loading.Progress = LoadingProgress;
export default Loading;