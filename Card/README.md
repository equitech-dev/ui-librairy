# Card

Composant carte générique pour contenir tout type de contenu.

## Utilisation de base

```jsx
import Card from 'ui-library/Card';

<Card>
  <h2>Titre</h2>
  <p>Contenu</p>
</Card>
```

## Exemples de composition

### NewsCard
```jsx
<Card>
  <h3>Actualité</h3>
  <p>Texte de l’actualité...</p>
</Card>
```

### ContactCard
```jsx
<Card>
  <h3>Contactez-nous</h3>
  <form>...</form>
</Card>
```

### ConfirmationCard
```jsx
<Card>
  <h2>Merci pour votre commande !</h2>
  <p>Votre commande a bien été enregistrée.</p>
</Card>
```

## Props
- `children` : contenu libre
- `className`, `style` : personnalisation 