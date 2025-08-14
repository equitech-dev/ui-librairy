# Tooltip

Info-bulle universelle, accessible et personnalisable.

## Props
- `label` : texte affiché dans la bulle
- `children` : élément survolé
- `position` : top | right | bottom | left
- `className`, `style` : personnalisation
- `aria-label` : accessibilité

## Exemple
```jsx
<Tooltip label="Info" position="right"><button>?</button></Tooltip>
```

## Accessibilité
- Affichage au focus clavier et à la souris
- Rôle `tooltip` pour les lecteurs d'écran 