# Checkbox

Case à cocher universelle, accessible et personnalisable.

## Props
- `checked` : booléen, état de la case
- `onChange` : callback de changement
- `label` : texte du label (optionnel)
- `className` : classes CSS additionnelles
- `style` : style inline additionnel
- `ref` : référence React (focus, accessibilité)
- `aria-*`, `tabIndex`, ... : props d’accessibilité natifs

## Exemple
```jsx
import { Checkbox } from 'ui-library/Checkbox';

<Checkbox
  checked={isChecked}
  onChange={handleChange}
  label="J'accepte les conditions"
  className="my-checkbox"
  style={{ margin: 8 }}
  aria-label="Accepter les conditions"
  ref={checkboxRef}
/>
```

## Accessibilité
- Supporte tous les attributs ARIA natifs
- Navigation clavier et focus accessibles
- Compatible lecteurs d'écran 