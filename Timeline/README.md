# Timeline

Le composant Timeline affiche une chronologie d'événements avec différents layouts et styles visuels.

## Utilisation

```jsx
import Timeline from './Timeline';

// Timeline basique
<Timeline>
  <Timeline.Item 
    title="Événement 1" 
    date="2024-01-15" 
    description="Description de l'événement" 
  />
  <Timeline.Item 
    title="Événement 2" 
    date="2024-01-20" 
    description="Description de l'événement" 
  />
</Timeline>

// Timeline alternée
<Timeline layout="alternate">
  <Timeline.Item 
    title="Événement 1" 
    variant="success" 
    badge="Terminé" 
  />
  <Timeline.Item 
    title="Événement 2" 
    variant="warning" 
    badge="En cours" 
  />
</Timeline>

// Timeline horizontale
<Timeline layout="horizontal">
  <Timeline.Item title="Étape 1" />
  <Timeline.Item title="Étape 2" />
  <Timeline.Item title="Étape 3" />
</Timeline>
```

## Props

### Timeline

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `node` | - | Éléments Timeline.Item |
| `layout` | `'vertical' \| 'horizontal' \| 'alternate'` | `'vertical'` | Type de layout |
| `position` | `'left' \| 'center' \| 'right' \| 'top'` | `'left'` | Position de la ligne |
| `lineStyle` | `'default' \| 'dashed' \| 'dotted' \| 'gradient'` | `'default'` | Style de la ligne |
| `size` | `'default' \| 'small' \| 'large'` | `'default'` | Taille du composant |
| `variant` | `'default' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Variante de couleur |
| `className` | `string` | - | Classe CSS personnalisée |
| `style` | `object` | - | Styles CSS personnalisés |

### Timeline.Item

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `title` | `string` | - | Titre de l'événement |
| `date` | `string` | - | Date de l'événement |
| `description` | `string` | - | Description de l'événement |
| `badge` | `string` | - | Badge à afficher |
| `variant` | `'default' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Variante de couleur |
| `dotStyle` | `'default' \| 'outlined' \| 'square' \| 'large' \| 'xlarge'` | `'default'` | Style du point |
| `contentStyle` | `'default' \| 'bordered' \| 'elevated' \| 'flat'` | `'default'` | Style du contenu |
| `actions` | `node` | - | Actions à afficher |
| `children` | `node` | - | Contenu personnalisé |
| `className` | `string` | - | Classe CSS personnalisée |
| `style` | `object` | - | Styles CSS personnalisés |

## Variantes

### Layouts
- **Vertical** : Timeline verticale standard
- **Horizontal** : Timeline horizontale avec défilement
- **Alternate** : Timeline alternée (gauche/droite)

### Positions
- **Left** : Ligne à gauche (par défaut)
- **Center** : Ligne au centre
- **Right** : Ligne à droite
- **Top** : Ligne en haut (pour horizontal)

### Styles de ligne
- **Default** : Ligne continue
- **Dashed** : Ligne pointillée
- **Dotted** : Ligne en pointillés
- **Gradient** : Ligne avec dégradé

### Tailles
- **Small** : Taille réduite
- **Default** : Taille standard
- **Large** : Taille grande

### Variantes de couleur
- **Default** : Couleur primaire verte
- **Success** : Vert de succès
- **Warning** : Orange d'avertissement
- **Error** : Rouge d'erreur
- **Info** : Bleu d'information

### Styles de point
- **Default** : Point circulaire plein
- **Outlined** : Point avec contour
- **Square** : Point carré
- **Large** : Point plus grand
- **XLarge** : Point très grand

### Styles de contenu
- **Default** : Style standard avec ombre
- **Bordered** : Avec bordure colorée à gauche
- **Elevated** : Ombre plus prononcée
- **Flat** : Sans ombre ni bordure

## Exemples

### Timeline basique
```jsx
<Timeline>
  <Timeline.Item 
    title="Création du projet" 
    date="15 janvier 2024" 
    description="Initialisation du projet EQUITECH" 
  />
  <Timeline.Item 
    title="Développement" 
    date="20 janvier 2024" 
    description="Développement des fonctionnalités principales" 
  />
  <Timeline.Item 
    title="Tests" 
    date="25 janvier 2024" 
    description="Tests et validation" 
  />
</Timeline>
```

### Timeline avec badges et variantes
```jsx
<Timeline>
  <Timeline.Item 
    title="Étape 1" 
    variant="success" 
    badge="Terminé" 
    description="Étape terminée avec succès" 
  />
  <Timeline.Item 
    title="Étape 2" 
    variant="warning" 
    badge="En cours" 
    description="Étape en cours de développement" 
  />
  <Timeline.Item 
    title="Étape 3" 
    variant="info" 
    badge="À venir" 
    description="Étape planifiée" 
  />
</Timeline>
```

### Timeline alternée
```jsx
<Timeline layout="alternate">
  <Timeline.Item 
    title="Événement 1" 
    date="2024-01-15" 
    description="Description de l'événement" 
  />
  <Timeline.Item 
    title="Événement 2" 
    date="2024-01-20" 
    description="Description de l'événement" 
  />
  <Timeline.Item 
    title="Événement 3" 
    date="2024-01-25" 
    description="Description de l'événement" 
  />
</Timeline>
```

### Timeline horizontale
```jsx
<Timeline layout="horizontal">
  <Timeline.Item 
    title="Étape 1" 
    description="Première étape" 
  />
  <Timeline.Item 
    title="Étape 2" 
    description="Deuxième étape" 
  />
  <Timeline.Item 
    title="Étape 3" 
    description="Troisième étape" 
  />
</Timeline>
```

### Timeline avec styles personnalisés
```jsx
<Timeline lineStyle="gradient" position="center">
  <Timeline.Item 
    title="Événement" 
    dotStyle="outlined" 
    contentStyle="bordered" 
    variant="success" 
  />
</Timeline>
```

### Timeline avec actions
```jsx
<Timeline>
  <Timeline.Item 
    title="Événement avec actions" 
    description="Description de l'événement" 
    actions={
      <div>
        <button>Voir détails</button>
        <button>Modifier</button>
      </div>
    }
  />
</Timeline>
```

### Timeline avec contenu personnalisé
```jsx
<Timeline>
  <Timeline.Item title="Événement personnalisé">
    <div style={{ padding: '10px', background: '#f5f5f5' }}>
      <h4>Contenu personnalisé</h4>
      <p>Ce contenu peut être n'importe quoi</p>
      <ul>
        <li>Liste d'éléments</li>
        <li>Autres éléments</li>
      </ul>
    </div>
  </Timeline.Item>
</Timeline>
```

### Timeline de différentes tailles
```jsx
<div style={{ display: 'flex', gap: '40px' }}>
  <Timeline size="small">
    <Timeline.Item title="Petit" description="Timeline petite" />
  </Timeline>
  
  <Timeline>
    <Timeline.Item title="Normal" description="Timeline normale" />
  </Timeline>
  
  <Timeline size="large">
    <Timeline.Item title="Grand" description="Timeline grande" />
  </Timeline>
</div>
```

### Timeline avec différents styles de ligne
```jsx
<div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
  <Timeline lineStyle="default">
    <Timeline.Item title="Ligne continue" />
  </Timeline>
  
  <Timeline lineStyle="dashed">
    <Timeline.Item title="Ligne pointillée" />
  </Timeline>
  
  <Timeline lineStyle="dotted">
    <Timeline.Item title="Ligne en pointillés" />
  </Timeline>
  
  <Timeline lineStyle="gradient">
    <Timeline.Item title="Ligne avec dégradé" />
  </Timeline>
</div>
```


