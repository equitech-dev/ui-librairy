# Progress

Le composant Progress affiche une barre de progression linéaire ou circulaire pour indiquer l'avancement d'une tâche.

## Utilisation

```jsx
import Progress from './Progress';

// Progress linéaire basique
<Progress value={75} label="Progression" />

// Progress circulaire avec pourcentage
<Progress 
  type="circular" 
  value={60} 
  showPercentage 
  label="Téléchargement" 
/>

// Progress avec variante et style
<Progress 
  value={80} 
  variant="success" 
  style="gradient" 
  showPercentage 
  label="Installation" 
/>
```

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `number` | `0` | Valeur actuelle de la progression |
| `max` | `number` | `100` | Valeur maximale |
| `label` | `string` | - | Texte d'étiquette |
| `showLabel` | `boolean` | `true` | Afficher l'étiquette |
| `showPercentage` | `boolean` | `false` | Afficher le pourcentage |
| `variant` | `'default' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Variante de couleur |
| `size` | `'default' \| 'small' \| 'large' \| 'xlarge'` | `'default'` | Taille du composant |
| `style` | `'default' \| 'striped' \| 'gradient' \| 'bordered' \| 'rounded'` | `'default'` | Style visuel |
| `type` | `'linear' \| 'circular'` | `'linear'` | Type de progress |
| `disabled` | `boolean` | `false` | État désactivé |
| `animated` | `boolean` | `true` | Activer les animations |
| `className` | `string` | - | Classe CSS personnalisée |
| `style` | `object` | - | Styles CSS personnalisés |

## Variantes

### Types
- **Linear** : Barre de progression horizontale
- **Circular** : Progress circulaire avec SVG

### Tailles
- **Small** : Taille réduite
- **Default** : Taille standard
- **Large** : Taille grande
- **XLarge** : Taille très grande

### Variantes de couleur
- **Default** : Couleur primaire verte
- **Success** : Vert de succès
- **Warning** : Orange d'avertissement
- **Error** : Rouge d'erreur
- **Info** : Bleu d'information

### Styles
- **Default** : Style standard
- **Striped** : Rayures animées
- **Gradient** : Dégradé de couleur
- **Bordered** : Avec bordure
- **Rounded** : Coins arrondis

## Exemples

### Progress linéaire basique
```jsx
<Progress value={50} label="Téléchargement" />
```

### Progress avec pourcentage
```jsx
<Progress 
  value={75} 
  showPercentage 
  label="Installation" 
/>
```

### Progress circulaire
```jsx
<Progress 
  type="circular" 
  value={80} 
  showPercentage 
  label="Sauvegarde" 
/>
```

### Progress avec variante
```jsx
<Progress 
  value={90} 
  variant="success" 
  label="Terminé" 
/>
```

### Progress avec style gradient
```jsx
<Progress 
  value={60} 
  style="gradient" 
  showPercentage 
  label="Synchronisation" 
/>
```

### Progress désactivé
```jsx
<Progress 
  value={30} 
  disabled 
  label="En pause" 
/>
```

### Progress de différentes tailles
```jsx
<div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
  <Progress value={50} size="small" label="Petit" />
  <Progress value={50} label="Normal" />
  <Progress value={50} size="large" label="Grand" />
</div>
```

### Progress circulaire de différentes tailles
```jsx
<div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
  <Progress type="circular" value={60} size="small" showPercentage />
  <Progress type="circular" value={60} showPercentage />
  <Progress type="circular" value={60} size="large" showPercentage />
</div>
```


