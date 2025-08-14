# Textarea

Zone de texte multi-lignes universelle, accessible et personnalisable.

## Props
- `value` : valeur contrôlée
- `onChange` : callback de changement
- `placeholder` : texte d'aide
- `disabled` : désactive la zone
- `className`, `style` : personnalisation
- `aria-label` : accessibilité
- ...props natifs HTML

## Exemple
```jsx
<Textarea placeholder="Votre message" value={value} onChange={handleChange} />
```

## Accessibilité
- Compatible clavier
- Supporte les attributs ARIA 