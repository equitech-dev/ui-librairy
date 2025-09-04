import React from 'react';

const TrashIcon = ({ width = 24, height = 24, className, color = "currentColor", ...props }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 44 44" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M8.592 12.592V36.592C8.592 38.7609 10.4231 40.592 12.592 40.592H28.592C30.7609 40.592 32.592 38.7609 32.592 36.592V12.592" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.592 8.592H24.592" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.592 12.592H36.592" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.592 20.592V32.592" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22.592 20.592V32.592" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default TrashIcon;

