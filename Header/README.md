# Header

En-tête universel, personnalisable et accessible.

## Props
- `children` : contenu du header (logo, navigation, etc.)
- `className` : classes CSS additionnelles
- `style` : style inline additionnel
- `ref` : référence React (focus, accessibilité)
- `aria-*`, `tabIndex`, ... : props d’accessibilité natifs

## Exemple
```jsx
import { Header } from '@equitech/ui-library';

<Header
  className="my-header"
  style={{ background: '#eee' }}
  aria-label="En-tête principal"
  ref={headerRef}
>
  <Logo />
  <Nav />
</Header>
```

## Accessibilité
- Supporte tous les attributs ARIA natifs
- Compatible lecteurs d'écran 