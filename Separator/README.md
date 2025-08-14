# Separator

Séparateur universel, personnalisable et accessible.

## Props
- `className` : classes CSS additionnelles
- `style` : style inline additionnel
- `ref` : référence React (focus, accessibilité)
- `aria-*`, `tabIndex`, ... : props d’accessibilité natifs

## Exemple
```jsx
import { Separator } from 'ui-library/Separator';

<Separator
  className="my-separator"
  style={{ margin: '16px 0' }}
  aria-label="Séparateur de section"
  ref={separatorRef}
/>
```

## Accessibilité
- Supporte tous les attributs ARIA natifs
- Compatible lecteurs d'écran 