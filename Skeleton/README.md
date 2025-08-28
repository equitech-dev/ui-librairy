# Skeleton

Composant de placeholder animé pour afficher l'état de chargement des contenus.

## Utilisation

```jsx
import { Skeleton } from 'ui-library';

// Exemple simple
<Skeleton variant="text" />

// Exemple avec contenu complet
<Skeleton.Content showAvatar lines={3} />

// Exemple de carte
<Skeleton.Card showImage showAvatar lines={2} />

// Exemple de tableau
<Skeleton.Table rows={5} columns={4} />
```

## Composants

### Skeleton (Base)
Composant de base pour créer des placeholders.

```jsx
<Skeleton variant="text" />
<Skeleton variant="avatar" size="large" />
<Skeleton variant="button" animation="pulse" />
```

### Skeleton.Group
Groupe plusieurs skeletons avec différents layouts.

```jsx
<Skeleton.Group layout="horizontal">
  <Skeleton variant="avatar" />
  <Skeleton variant="text" />
</Skeleton.Group>

<Skeleton.Group layout="grid">
  <Skeleton variant="card" />
  <Skeleton variant="card" />
  <Skeleton variant="card" />
</Skeleton.Group>
```

### Skeleton.Content
Crée un contenu skeleton complet avec titre et paragraphes.

```jsx
<Skeleton.Content 
  showAvatar 
  avatarSize="large" 
  lines={4} 
  title={true} 
/>
```

### Skeleton.Card
Crée une carte skeleton avec image et contenu.

```jsx
<Skeleton.Card 
  showImage 
  showAvatar 
  lines={3} 
/>
```

### Skeleton.Table
Crée un tableau skeleton avec en-têtes et lignes.

```jsx
<Skeleton.Table 
  rows={6} 
  columns={5} 
  showHeader={true} 
/>
```

## Props

### Skeleton (Base)
| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `variant` | `string` | `'text'` | Type de skeleton (voir variantes) |
| `size` | `'default' \| 'small' \| 'large'` | `'default'` | Taille du skeleton |
| `color` | `'default' \| 'primary' \| 'secondary' \| 'dark'` | `'default'` | Couleur du skeleton |
| `animation` | `'loading' \| 'pulse' \| 'wave' \| 'static'` | `'loading'` | Type d'animation |
| `width` | `string \| number` | - | Largeur personnalisée |
| `height` | `string \| number` | - | Hauteur personnalisée |
| `className` | `string` | `''` | Classe CSS personnalisée |
| `style` | `object` | `{}` | Styles inline personnalisés |

### Skeleton.Group
| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `node` | **requis** | Skeletons à grouper |
| `layout` | `'vertical' \| 'horizontal' \| 'grid' \| 'inline'` | `'vertical'` | Disposition du groupe |
| `className` | `string` | `''` | Classe CSS personnalisée |
| `style` | `object` | `{}` | Styles inline personnalisés |

### Skeleton.Content
| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `showAvatar` | `boolean` | `false` | Afficher un avatar skeleton |
| `avatarSize` | `'default' \| 'small' \| 'large'` | `'default'` | Taille de l'avatar |
| `lines` | `number` | `3` | Nombre de lignes de texte |
| `title` | `boolean` | `true` | Afficher un titre skeleton |
| `className` | `string` | `''` | Classe CSS personnalisée |
| `style` | `object` | `{}` | Styles inline personnalisés |

### Skeleton.Card
| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `showImage` | `boolean` | `false` | Afficher une image skeleton |
| `showAvatar` | `boolean` | `false` | Afficher un avatar skeleton |
| `lines` | `number` | `2` | Nombre de lignes de texte |
| `className` | `string` | `''` | Classe CSS personnalisée |
| `style` | `object` | `{}` | Styles inline personnalisés |

### Skeleton.Table
| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `rows` | `number` | `5` | Nombre de lignes |
| `columns` | `number` | `4` | Nombre de colonnes |
| `showHeader` | `boolean` | `true` | Afficher l'en-tête |
| `className` | `string` | `''` | Classe CSS personnalisée |
| `style` | `object` | `{}` | Styles inline personnalisés |

## Variantes

### Types de skeleton
- `text` : Ligne de texte simple
- `title` : Titre principal
- `heading` : Sous-titre
- `paragraph` : Paragraphe
- `avatar` : Avatar circulaire
- `avatar-large` : Grand avatar
- `avatar-small` : Petit avatar
- `button` : Bouton
- `button-small` : Petit bouton
- `button-large` : Grand bouton
- `input` : Champ de saisie
- `card` : Carte complète
- `image` : Image rectangulaire
- `image-square` : Image carrée
- `image-circle` : Image circulaire
- `table-row` : Ligne de tableau
- `list-item` : Élément de liste
- `badge` : Badge
- `chip` : Chip

### Animations
- `loading` : Animation de chargement par défaut (dégradé)
- `pulse` : Animation de pulsation (opacité)
- `wave` : Animation d'onde (effet de vague)
- `static` : Aucune animation

### Couleurs
- `default` : Couleur grise par défaut
- `primary` : Couleur primaire EQUITECH
- `secondary` : Couleur secondaire EQUITECH
- `dark` : Couleur sombre EQUITECH

### Layouts (Skeleton.Group)
- `vertical` : Disposition verticale (défaut)
- `horizontal` : Disposition horizontale
- `grid` : Disposition en grille
- `inline` : Disposition en ligne

## Exemples d'utilisation

### Page de chargement complète
```jsx
<div>
  <Skeleton variant="title" style={{ marginBottom: 'var(--spacing-l)' }} />
  
  <Skeleton.Group layout="grid">
    <Skeleton.Card showImage showAvatar lines={3} />
    <Skeleton.Card showImage showAvatar lines={3} />
    <Skeleton.Card showImage showAvatar lines={3} />
  </Skeleton.Group>
  
  <Skeleton.Table rows={4} columns={3} style={{ marginTop: 'var(--spacing-l)' }} />
</div>
```

### Liste d'utilisateurs
```jsx
<Skeleton.Group layout="vertical">
  {Array.from({ length: 5 }, (_, index) => (
    <Skeleton.Group key={index} layout="horizontal">
      <Skeleton variant="avatar" />
      <div style={{ flex: 1 }}>
        <Skeleton variant="heading" />
        <Skeleton variant="text" />
      </div>
      <Skeleton variant="button-small" />
    </Skeleton.Group>
  ))}
</Skeleton.Group>
```

### Formulaire de chargement
```jsx
<div>
  <Skeleton variant="heading" style={{ marginBottom: 'var(--spacing-m)' }} />
  
  <Skeleton.Group layout="vertical">
    <Skeleton variant="input" />
    <Skeleton variant="input" />
    <Skeleton variant="input" />
  </Skeleton.Group>
  
  <Skeleton.Group layout="horizontal" style={{ marginTop: 'var(--spacing-m)' }}>
    <Skeleton variant="button" />
    <Skeleton variant="button" />
  </Skeleton.Group>
</div>
```

### Profil utilisateur
```jsx
<Skeleton.Group layout="horizontal">
  <Skeleton variant="avatar-large" />
  <div style={{ flex: 1, marginLeft: 'var(--spacing-m)' }}>
    <Skeleton.Content showAvatar={false} lines={2} />
  </div>
</Skeleton.Group>
```

## Accessibilité

- Le composant utilise `aria-hidden="true"` pour être ignoré par les lecteurs d'écran
- Les animations peuvent être désactivées via les préférences utilisateur (`prefers-reduced-motion`)
- Les skeletons sont purement visuels et ne doivent pas contenir de contenu sémantique
