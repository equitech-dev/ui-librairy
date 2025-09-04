import React from 'react';

const BoxIcon = ({ width = 24, height = 24, className, color = "currentColor", ...props }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 46 47" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M44.7669 12.2484L22.8835 1.30664L1 12.2484V34.132L22.8835 45.0738L44.7669 34.132V12.2484Z" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
      <path d="M1 12.1309L23.1188 23.4256" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M23.1191 45.0741V23.4258" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M44.7673 12.1309L23.1191 23.4256" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M33.943 6.95312L11.8242 17.7773" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default BoxIcon;

