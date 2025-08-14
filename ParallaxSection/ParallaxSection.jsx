'use client';
import React, { useRef, useEffect } from 'react';
import styles from './ParallaxSection.module.scss'; // Optionnel, pour la base

/**
 * Composant ParallaxSection générique (librairie)
 * Props :
 * - bgSrc (string, requis) : image de fond
 * - backgroundStartPercent (number, défaut 100)
 * - maxShift (number, défaut 30)
 * - minHeight (number, défaut 600)
 * - customClasses (string, optionnel)
 * - backgroundSize (string, défaut 'cover')
 * - children (ReactNode, requis)
 */
const ParallaxSection = ({
  bgSrc,
  backgroundStartPercent = 100,
  maxShift = 30,
  minHeight = 600,
  customClasses = '',
  backgroundSize = 'cover',
  children,
}) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollRatio = (windowHeight - rect.top) / windowHeight;
      const backgroundY = backgroundStartPercent + -scrollRatio * maxShift;
      el.style.backgroundPosition = `center ${backgroundY}%`;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [backgroundStartPercent, maxShift]);

  return (
    <section
      ref={sectionRef}
      className={`${styles.parallaxSection || ''} ${customClasses}`.trim()}
      style={{
        backgroundImage: `url(${bgSrc})`,
        backgroundSize,
        backgroundRepeat: 'no-repeat',
        minHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {children}
    </section>
  );
};

export default ParallaxSection; 