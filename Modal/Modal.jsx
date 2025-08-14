"use client";
import React, { useEffect } from 'react';
import styles from './Modal.module.scss';

const Modal = ({ open, onClose, children, className = '', style = {}, 'aria-label': ariaLabel = 'Fenêtre modale', ...props }) => {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${className}`}
        style={style}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        onClick={e => e.stopPropagation()}
        {...props}
      >
        {children}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Fermer">×</button>
      </div>
    </div>
  );
};

export default Modal; 