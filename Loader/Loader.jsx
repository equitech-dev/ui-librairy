"use client";
import React from 'react';

const Loader = ({ className = '', 'aria-label': ariaLabel = 'Chargement en cours...', ...props }) => (
  <div className={`ui-loader ${className}`} role="status" aria-label={ariaLabel} {...props}>
    <div className="ui-spinner"></div>
  </div>
);

export default Loader; 