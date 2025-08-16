"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useEffect } from 'react';
const Modal = ({
  open,
  onClose,
  children,
  className = '',
  style = {},
  'aria-label': ariaLabel = 'Fenêtre modale',
  ...props
}) => {
  useEffect(() => {
    if (!open) return;
    const handleKey = e => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "ui-overlay",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", _extends({
    className: `ui-modal ${className}`,
    style: style,
    role: "dialog",
    "aria-modal": "true",
    "aria-label": ariaLabel,
    onClick: e => e.stopPropagation()
  }, props), children, /*#__PURE__*/React.createElement("button", {
    className: "ui-closeBtn",
    onClick: onClose,
    "aria-label": "Fermer"
  }, "\xD7")));
};
export default Modal;