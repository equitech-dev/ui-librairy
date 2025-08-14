# RadioButton

Bouton radio universel, accessible et personnalisable.

## Props
- `checked` : booléen, état du bouton
- `onChange` : callback de changement
- `label` : texte du label (optionnel)
- `name` : nom du groupe radio
- `value` : valeur du bouton
- `className` : classes CSS additionnelles
- `style` : style inline additionnel
- `ref` : référence React (focus, accessibilité)
- `aria-*`, `tabIndex`, ... : props d’accessibilité natifs

## Exemple
```jsx
import { RadioButton } from 'ui-library/RadioButton';

<RadioButton
  checked={selected === 'option1'}
  onChange={handleChange}
  label="Option 1"
  name="groupe"
  value="option1"
  className="my-radio"
  style={{ margin: 8 }}
  aria-label="Choisir l'option 1"
  ref={radioRef}
/>
```

## Accessibilité
- Supporte tous les attributs ARIA natifs
- Navigation clavier et focus accessibles
- Compatible lecteurs d'écran 