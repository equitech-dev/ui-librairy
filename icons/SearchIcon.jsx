import React from 'react';

const SearchIcon = ({ width = 24, height = 24, className, color = "currentColor", ...props }) => {
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
      <path d="M20.592 36.592C31.7609 36.592 40.592 28.7609 40.592 17.592C40.592 6.42311 31.7609 -1.408 20.592 -1.408C9.42311 -1.408 0.592 6.42311 0.592 17.592C0.592 28.7609 9.42311 36.592 20.592 36.592Z" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M30.592 30.592L42.592 42.592" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default SearchIcon;

