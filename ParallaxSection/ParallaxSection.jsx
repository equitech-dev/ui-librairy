"use client";
import React, { useEffect, useRef } from 'react';

const ParallaxSection = ({ 
  children, 
  speed = 0.5, 
  className = '', 
  style = {}, 
  'aria-label': ariaLabel,
  ...props 
}) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      
      sectionRef.current.style.transform = `translateY(${rate}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  const customClasses = className || '';
  
  return (
    <section
      ref={sectionRef}
      className={`ui-parallaxSection ${customClasses}`.trim()}
      style={style}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </section>
  );
};

export default ParallaxSection; 