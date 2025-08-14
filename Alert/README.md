# Alert

Message d’alerte universel, accessible et personnalisable.

## Props
- `type` : info | success | warning | error
- `children` : contenu du message
- `className`, `style` : personnalisation
- `aria-label` : accessibilité

## Exemple
```jsx
<Alert type="success">Opération réussie !</Alert>
```

## Accessibilité
- Rôle `alert` pour les lecteurs d'écran 