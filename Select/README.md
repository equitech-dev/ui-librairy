# Select

Liste déroulante universelle, accessible et personnalisable.

## Props
- `value` : valeur sélectionnée
- `onChange` : callback de changement
- `options` : tableau d'options `{ value, label, disabled? }`
- `disabled` : désactive le select
- `className`, `style` : personnalisation
- `aria-label` : accessibilité
- ...props natifs HTML

## Exemple
```jsx
<Select value={value} onChange={handleChange} options={[{value: '1', label: 'Un'}]} />
```

## Accessibilité
- Compatible clavier
- Supporte les attributs ARIA 