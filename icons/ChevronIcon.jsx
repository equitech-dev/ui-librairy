import React from 'react';

const ChevronIcon = ({ width = 24, height = 24, className, color = "currentColor", ...props }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 42 23" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M0.932219 0.949387C-0.31074 2.19976 -0.31074 4.22721 0.932219 5.47755L16.5028 21.1265C18.9892 23.6253 23.0179 23.6243 25.503 21.1246L33.2853 13.2953L41.0676 5.46602C42.3108 4.21568 42.3108 2.18824 41.0676 0.937829C39.8247 -0.31261 37.8094 -0.31261 36.5666 0.937829L23.2449 14.3398C22.002 15.5904 19.9867 15.5901 18.7438 14.3398L5.43329 0.949387C4.19037 -0.301052 2.17515 -0.301052 0.932219 0.949387Z" fill={color}/>
    </svg>
  );
};

export default ChevronIcon;

