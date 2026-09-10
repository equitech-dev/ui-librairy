"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export type ModalSize = "sm" | "md" | "wide";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  titleId?: string;
  children?: ReactNode;
  /** sm 400px · md 480px · wide 760px */
  size?: ModalSize;
  closeDisabled?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

export function Modal({
  open,
  onClose,
  title,
  titleId = "ui-modal-title",
  children,
  size = "md",
  closeDisabled = false,
  closeOnOverlayClick = true,
  className = "",
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !closeDisabled) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, closeDisabled]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open || !mounted) {
    return null;
  }

  const allowOverlayClose = closeOnOverlayClick && !closeDisabled;
  const sizeClass = size === "wide" ? "ui-modal--wide" : size === "sm" ? "ui-modal--sm" : "";

  return createPortal(
    <div
      className="ui-modal-overlay"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget && allowOverlayClose) onClose();
      }}
    >
      <div
        className={["ui-modal", sizeClass, className].filter(Boolean).join(" ")}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="ui-modal-header">
          <h2 id={titleId} className="ui-modal-title">
            {title}
          </h2>
          <button
            type="button"
            className="ui-modal-close"
            onClick={onClose}
            aria-label="Fermer"
            disabled={closeDisabled}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}

Modal.displayName = "Modal";
