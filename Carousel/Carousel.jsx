'use client';
import React, { useState, useRef, useEffect } from 'react';
import './Carousel.module.scss';

/**
 * Carousel générique, sans dépendance externe.
 * Props :
 * - items : array
 * - renderItem : (item, i) => ReactNode
 * - autoPlay : bool
 * - interval : ms
 * - arrows : bool
 * - dots : bool
 */
export default function Carousel({ items = [], renderItem, autoPlay = false, interval = 4000, arrows = true, dots = true }) {
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
    <div className="ui-library-carousel">
      <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {items.map((item, i) => (
          <div key={i} style={{ minWidth: '100%' }}>
            {renderItem ? renderItem(item, i) : item}
          </div>
        ))}
      </div>
      {arrows && (
        <>
          <button className="carousel-arrow left" onClick={() => goTo(index - 1)}>‹</button>
          <button className="carousel-arrow right" onClick={() => goTo(index + 1)}>›</button>
        </>
      )}
      {dots && (
        <div className="carousel-dot-group">
          {items.map((_, i) => (
            <button key={i} className={`carousel-dot${i === index ? ' active' : ''}`} onClick={() => goTo(i)} />
          ))}
        </div>
      )}
    </div>
  );
} 