// ===================================
// MAPPING DES VARIABLES CSS - MIGRATION
// ===================================
// Ce fichier définit le mapping entre les anciennes variables --ui-* 
// et les nouvelles variables unifiées EQUITECH

export const variableMapping = {
  // Couleurs principales
  '--ui-primary-color': '--primary-green',
  '--ui-secondary-color': '--secondary-teal',
  '--ui-primary-dark': '--primary-dark',
  
  // Couleurs sémantiques
  '--ui-success-color': '--success-color',
  '--ui-warning-color': '--warning-color',
  '--ui-error-color': '--error-color',
  '--ui-info-color': '--info-color',
  
  // Couleurs de fond
  '--ui-background-color': '--color-background',
  '--ui-surface-color': '--color-background-muted',
  '--ui-hover-color': '--color-background-hover',
  
  // Couleurs de texte
  '--ui-text-color': '--color-text-primary',
  '--ui-text-muted': '--color-text-muted',
  '--ui-text-dark': '--color-text-secondary',
  
  // Couleurs de bordure
  '--ui-border-color': '--color-border',
  
  // Typographie
  '--ui-font-family-title': '--font-title',
  '--ui-font-family-body': '--font-body',
  '--ui-font-size-base': '--text-base',
  
  // Espacement
  '--ui-spacing-xs': '--spacing-xs',
  '--ui-spacing-sm': '--spacing-sm',
  '--ui-spacing-md': '--spacing-md',
  '--ui-spacing-lg': '--spacing-lg',
  '--ui-spacing-xl': '--spacing-xl',
  '--ui-spacing-2xl': '--spacing-2xl',
  
  // Bordures
  '--ui-border-radius': '--border-radius-md',
  '--ui-border-width': '1px',
  
  // Ombres
  '--ui-shadow-sm': '--shadow-sm',
  '--ui-shadow-md': '--shadow-md',
  '--ui-shadow-lg': '--shadow-lg',
  
  // Transitions
  '--ui-transition-duration': '0.2s',
  '--ui-transition-timing': 'ease-in-out',
  
  // Variables spécifiques à la documentation (gardent leurs valeurs)
  '--ui-line-height-base': '--ui-line-height-base'
};

// Fonction utilitaire pour convertir une variable
export const convertVariable = (oldVariable: string): string => {
  return variableMapping[oldVariable as keyof typeof variableMapping] || oldVariable;
};

// Fonction pour convertir un style inline
export const convertStyle = (style: string): string => {
  let convertedStyle = style;
  
  Object.entries(variableMapping).forEach(([oldVar, newVar]) => {
    const regex = new RegExp(oldVar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    convertedStyle = convertedStyle.replace(regex, newVar);
  });
  
  return convertedStyle;
}; 