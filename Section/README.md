# Section

Section universelle, personnalisable et accessible.

## Props
- `children` : contenu de la section
- `className` : classes CSS additionnelles
- `style` : style inline additionnel
- `ref` : référence React (focus, accessibilité)
- `aria-*`, `tabIndex`, ... : props d’accessibilité natifs

## Exemple
```jsx
import { Section } from 'ui-library/Section';

<Section
  className="my-section"
  style={{ padding: 24 }}
  aria-label="Section principale"
  ref={sectionRef}
>
  <h2>Titre</h2>
  <p>Contenu...</p>
</Section>
```

## Accessibilité
- Supporte tous les attributs ARIA natifs
- Compatible lecteurs d'écran 