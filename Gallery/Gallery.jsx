'use client';
import React from 'react';
import './Gallery.module.scss';

/**
 * Gallery générique : grille, scroll horizontal, bento.
 * Props :
 * - images : array d'objets {src, alt, ...}
 * - mode : 'grid' | 'scroll' | 'bento'
 * - columns, rows, gap, renderItem, ...
 */
export default function Gallery({ images = [], mode = 'grid', columns = 3, rows = 1, gap = 16, renderItem }) {
  if (mode === 'scroll') {
    return (
      <div className="ui-library-gallery gallery-scroll" style={{ gap }}>
        {images.map((img, i) => (
          <div key={i} className="gallery-item" style={{ flex: '0 0 auto' }}>
            {renderItem ? renderItem(img, i) : <img src={img.src} alt={img.alt} />}
          </div>
        ))}
      </div>
    );
  }
  if (mode === 'bento') {
    return (
      <div className="ui-library-gallery gallery-bento" style={{ gap }}>
        {images.map((img, i) => (
          <div key={i} className="gallery-item" style={{ width: i % 5 === 0 ? 240 : 120, height: i % 3 === 0 ? 180 : 120 }}>
            {renderItem ? renderItem(img, i) : <img src={img.src} alt={img.alt} />}
          </div>
        ))}
      </div>
    );
  }
  // Default: grid
  return (
    <div className="ui-library-gallery gallery-grid" style={{ gap, gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {images.map((img, i) => (
        <div key={i} className="gallery-item">
          {renderItem ? renderItem(img, i) : <img src={img.src} alt={img.alt} style={{ height: 120 }} />}
        </div>
      ))}
    </div>
  );
} 