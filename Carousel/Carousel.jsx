'use client';
import React, { useState, useRef, useEffect } from 'react';

export default function Carousel({ 
  items = [], 
  renderItem, 
  autoPlay = false, 
  interval = 4000, 
  arrows = true, 
  dots = true,
  className = '',
  'aria-label': ariaLabel = 'Carrousel d\'images'
}) {
  const [index, setIndex] = useState(0);
  const timer = useRef();

  useEffect(() => {
    if (autoPlay) {
      timer.current = setInterval(() => {
        setIndex(i => (i + 1) % items.length);
      }, interval);
      return () => clearInterval(timer.current);
    }
  }, [autoPlay, interval, items.length]);

  const goTo = i => setIndex((i + items.length) % items.length);

  return (
    <div className={`ui-carousel ${className}`} aria-label={ariaLabel}>
      <div className="ui-carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {items.map((item, i) => (
          <div key={i} style={{ minWidth: '100%' }}>
            {renderItem ? renderItem(item, i) : item}
          </div>
        ))}
      </div>
      {arrows && (
        <>
          <button 
            className="ui-carousel-arrow ui-carousel-arrow-left" 
            onClick={() => goTo(index - 1)}
            aria-label="Image précédente"
          >
            ‹
          </button>
          <button 
            className="ui-carousel-arrow ui-carousel-arrow-right" 
            onClick={() => goTo(index + 1)}
            aria-label="Image suivante"
          >
            ›
          </button>
        </>
      )}
      {dots && (
        <div className="ui-carousel-dots">
          {items.map((_, i) => (
            <button 
              key={i} 
              className={`ui-carousel-dot${i === index ? ' ui-carousel-dot-active' : ''}`} 
              onClick={() => goTo(i)}
              aria-label={`Aller à l'image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 