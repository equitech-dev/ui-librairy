# Modal

Fenêtre modale universelle, accessible et personnalisable.

## Props
- `open` : booléen, affiche ou non la modale
- `onClose` : callback de fermeture
- `children` : contenu de la modale
- `className`, `style` : personnalisation
- `aria-label` : accessibilité

## Exemple
```jsx
<Modal open={open} onClose={closeModal}>Contenu</Modal>
```

## Accessibilité
- Rôle `dialog`, `aria-modal`, gestion Escape, focus piégé (à améliorer si besoin) 