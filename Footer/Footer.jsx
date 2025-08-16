"use client";
import React from "react";

const Footer = ({ children, className = '', style = {}, 'aria-label': ariaLabel, ...props }) => {
  return (
    <footer className={`ui-footer ${className}`} style={style} aria-label={ariaLabel} {...props}>
      {children}
    </footer>
  );
};

export { Footer }; 