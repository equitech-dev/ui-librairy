import React from 'react';
import './MapEmbed.module.scss';

/**
 * Composant générique pour intégrer une carte via iframe.
 * Props :
 * - src : URL de l'iframe (obligatoire)
 * - width, height, style, ...props : personnalisations optionnelles
 */
export default function MapEmbed({ src, width = '100%', height = 350, className = '', ...props }) {
  return (
    <div className={`map-embed ${className}`} {...props}>
      <iframe
        src={src}
        width={width}
        height={height}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Carte intégrée"
      />
    </div>
  );
} 