# Input

Champ de saisie universel, accessible et personnalisable.

## Props
- `type` : type d'input (`text`, `email`, `password`, etc.)
- `value` : valeur contrôlée
- `onChange` : callback de changement
- `placeholder` : texte d'aide
- `disabled` : désactive le champ
- `className`, `style` : personnalisation
- `aria-label` : accessibilité
- ...props natifs HTML

## Exemple
```jsx
<Input type="email" placeholder="Votre email" value={value} onChange={handleChange} />
```

## Accessibilité
- Compatible clavier
- Supporte les attributs ARIA 