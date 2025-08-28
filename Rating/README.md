# Rating

Le composant Rating affiche un système d'évaluation par étoiles interactif avec différentes variantes et fonctionnalités.

## Utilisation

```jsx
import Rating, { RatingWithText, RatingGroup } from './Rating';

// Rating basique
<Rating value={4} />

// Rating interactif
<Rating 
  value={3.5} 
  precision={0.5} 
  onRatingChange={(value) => console.log(value)} 
/>

// Rating avec texte détaillé
<RatingWithText 
  value={4.2} 
  totalRatings={156} 
/>

// Rating group pour distribution
<RatingGroup 
  ratings={[
    { count: 45 },
    { count: 32 },
    { count: 28 },
    { count: 15 },
    { count: 8 }
  ]} 
/>
```

## Props

### Rating

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `number` | `0` | Valeur actuelle de l'évaluation |
| `max` | `number` | `5` | Nombre maximum d'étoiles |
| `precision` | `0 \| 0.5 \| 1` | `1` | Précision de l'évaluation |
| `size` | `'default' \| 'small' \| 'large' \| 'xlarge'` | `'default'` | Taille des étoiles |
| `variant` | `'default' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Variante de couleur |
| `style` | `'default' \| 'outlined' \| 'rounded'` | `'default'` | Style visuel |
| `disabled` | `boolean` | `false` | État désactivé |
| `readonly` | `boolean` | `false` | État en lecture seule |
| `animated` | `boolean` | `false` | Activer les animations |
| `showText` | `boolean` | `false` | Afficher le texte descriptif |
| `showValue` | `boolean` | `false` | Afficher la valeur numérique |
| `onRatingChange` | `function` | - | Callback lors du changement |
| `className` | `string` | - | Classe CSS personnalisée |
| `style` | `object` | - | Styles CSS personnalisés |

### RatingWithText

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `number` | `0` | Valeur moyenne de l'évaluation |
| `max` | `number` | `5` | Nombre maximum d'étoiles |
| `totalRatings` | `number` | `0` | Nombre total d'évaluations |
| `size` | `'default' \| 'small' \| 'large' \| 'xlarge'` | `'default'` | Taille des étoiles |
| `variant` | `'default' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Variante de couleur |
| `className` | `string` | - | Classe CSS personnalisée |
| `style` | `object` | - | Styles CSS personnalisés |

### RatingGroup

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `ratings` | `array` | `[]` | Tableau des évaluations par niveau |
| `max` | `number` | `5` | Nombre maximum d'étoiles |
| `size` | `'default' \| 'small' \| 'large' \| 'xlarge'` | `'default'` | Taille des étoiles |
| `variant` | `'default' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Variante de couleur |
| `className` | `string` | - | Classe CSS personnalisée |
| `style` | `object` | - | Styles CSS personnalisés |

## Variantes

### Tailles
- **Small** : Étoiles de 16px
- **Default** : Étoiles de 20px
- **Large** : Étoiles de 24px
- **XLarge** : Étoiles de 32px

### Variantes de couleur
- **Default** : Couleur primaire verte
- **Success** : Vert de succès
- **Warning** : Orange d'avertissement
- **Error** : Rouge d'erreur
- **Info** : Bleu d'information

### Styles
- **Default** : Étoiles pleines
- **Outlined** : Étoiles avec contour
- **Rounded** : Étoiles avec coins arrondis

### Précision
- **0** : Étoiles entières uniquement
- **0.5** : Demi-étoiles autorisées
- **1** : Étoiles entières uniquement

## Exemples

### Rating basique
```jsx
<Rating value={4} />
```

### Rating avec précision demi-étoiles
```jsx
<Rating 
  value={3.5} 
  precision={0.5} 
  showText 
  showValue 
/>
```

### Rating interactif
```jsx
const [rating, setRating] = useState(0);

<Rating 
  value={rating} 
  onRatingChange={setRating}
  animated 
/>
```

### Rating en lecture seule
```jsx
<Rating 
  value={4.2} 
  readonly 
  showText 
  showValue 
/>
```

### Rating désactivé
```jsx
<Rating 
  value={3} 
  disabled 
  showText 
/>
```

### Rating avec variante
```jsx
<Rating 
  value={5} 
  variant="success" 
  size="large" 
/>
```

### Rating avec style outlined
```jsx
<Rating 
  value={4} 
  style="outlined" 
  variant="info" 
/>
```

### RatingWithText
```jsx
<RatingWithText 
  value={4.2} 
  totalRatings={156} 
  size="large" 
/>
```

### RatingGroup pour distribution
```jsx
const ratings = [
  { count: 45 }, // 5 étoiles
  { count: 32 }, // 4 étoiles
  { count: 28 }, // 3 étoiles
  { count: 15 }, // 2 étoiles
  { count: 8 }   // 1 étoile
];

<RatingGroup 
  ratings={ratings} 
  variant="success" 
/>
```

### Rating de différentes tailles
```jsx
<div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
  <Rating value={4} size="small" />
  <Rating value={4} />
  <Rating value={4} size="large" />
  <Rating value={4} size="xlarge" />
</div>
```

### Rating avec différentes variantes
```jsx
<div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
  <Rating value={4} variant="default" />
  <Rating value={4} variant="success" />
  <Rating value={4} variant="warning" />
  <Rating value={4} variant="error" />
  <Rating value={4} variant="info" />
</div>
```


