# Footer

Pied de page universel, personnalisable et accessible.

## Props
- `children` : contenu du footer (liens, logos, etc.)
- `className` : classes CSS additionnelles
- `style` : style inline additionnel
- `ref` : référence React (focus, accessibilité)
- `aria-*`, `tabIndex`, ... : props d’accessibilité natifs

## Exemple
```jsx
import { Footer } from 'ui-library/Footer';

<Footer
  className="my-footer"
  style={{ background: '#222', color: '#fff' }}
  aria-label="Pied de page principal"
  ref={footerRef}
>
  <p>© 2024 Equitech</p>
</Footer>
```

## Accessibilité
- Supporte tous les attributs ARIA natifs
- Compatible lecteurs d'écran 