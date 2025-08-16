"use client";
import React from "react";

const Header = ({ children, className = '', style = {}, 'aria-label': ariaLabel, ...props }) => {
  return (
    <header className={`ui-header ${className}`} style={style} aria-label={ariaLabel} {...props}>
      {children}
    </header>
  );
};

export { Header }; 