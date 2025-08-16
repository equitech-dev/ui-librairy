"use client";
import React from "react";

const Separator = ({ className = '', style = {}, 'aria-label': ariaLabel, ...props }) => (
  <hr className={`ui-separator ${className}`} style={style} aria-label={ariaLabel} {...props} />
);

export { Separator }; 