# Button

Bouton universel, accessible et personnalisable.

## Props
- `model` : 'primary' | 'secondary' | 'valid' | 'info' | 'warning' (défaut : 'primary')
- `size` : 's' | 'm' | 'l' (défaut : 'm')
- `reverse` : booléen, variante inversée (défaut : false)
- `onClick` : callback JS
- `children` : contenu du bouton (texte ou JSX)
- `className` : classes CSS additionnelles
- `style` : style inline additionnel
- `ref` : référence React (focus, accessibilité)
- `aria-*`, `tabIndex`, ... : props d’accessibilité natifs

## Exemple
```jsx
import { Button } from 'ui-library/Button';

<Button
  model="primary"
  size="m"
  onClick={handleClick}
  className="my-btn"
  style={{ minWidth: 120 }}
  aria-label="Valider la commande"
  ref={btnRef}
>
  Valider
</Button>
```

## Accessibilité
- Supporte tous les attributs ARIA natifs
- Navigation clavier et focus accessibles
- Compatible lecteurs d'écran 