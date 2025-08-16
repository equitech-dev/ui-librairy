import React from 'react';

export default function MapEmbed({ 
  src, 
  width = '100%', 
  height = 350, 
  className = '', 
  size = 'medium',
  'aria-label': ariaLabel = 'Carte intégrée',
  ...props 
}) {
  const sizeClass = size === 'small' ? 'ui-map-embed-small' : 
                   size === 'large' ? 'ui-map-embed-large' : '';
  
  return (
    <div className={`ui-map-embed ${sizeClass} ${className}`} {...props} aria-label={ariaLabel}>
      <iframe
        src={src}
        width={width}
        height={height}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={ariaLabel}
      />
    </div>
  );
} 