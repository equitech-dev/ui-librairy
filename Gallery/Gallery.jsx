'use client';
import React from 'react';

export default function Gallery({ 
  images = [], 
  mode = 'grid', 
  columns = 3, 
  rows = 1, 
  gap = 16, 
  renderItem,
  className = '',
  'aria-label': ariaLabel = 'Galerie d\'images'
}) {
  if (mode === 'scroll') {
    return (
      <div className={`ui-gallery ui-gallery-scroll ${className}`} style={{ gap }} aria-label={ariaLabel}>
        {images.map((img, i) => (
          <div key={i} className="ui-gallery-item" style={{ flex: '0 0 auto' }}>
            {renderItem ? renderItem(img, i) : <img src={img.src} alt={img.alt} />}
          </div>
        ))}
      </div>
    );
  }
  
  if (mode === 'bento') {
    return (
      <div className={`ui-gallery ui-gallery-bento ${className}`} style={{ gap }} aria-label={ariaLabel}>
        {images.map((img, i) => {
          let itemClass = 'ui-gallery-item';
          if (i % 5 === 0) itemClass += ' ui-gallery-item-large';
          else if (i % 3 === 0) itemClass += ' ui-gallery-item-wide';
          else if (i % 2 === 0) itemClass += ' ui-gallery-item-tall';
          
          return (
            <div key={i} className={itemClass}>
              {renderItem ? renderItem(img, i) : <img src={img.src} alt={img.alt} />}
            </div>
          );
        })}
      </div>
    );
  }
  
  // Default: grid
  return (
    <div 
      className={`ui-gallery ui-gallery-grid ${className}`} 
      style={{ gap, gridTemplateColumns: `repeat(${columns}, 1fr)` }} 
      aria-label={ariaLabel}
    >
      {images.map((img, i) => (
        <div key={i} className="ui-gallery-item">
          {renderItem ? renderItem(img, i) : <img src={img.src} alt={img.alt} style={{ height: 120 }} />}
        </div>
      ))}
    </div>
  );
} 