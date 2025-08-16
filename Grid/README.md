# Grid Components

Ce dossier contient les composants de grille de la librairie UI, offrant des fonctionnalités de base et avancées.

## Composants Disponibles

### 1. `Grid` - Grille de base
Composant de grille simple et statique, parfait pour les layouts basiques.

### 2. `AdvancedGrid` - Grille avancée
Grille avec fonctionnalités avancées : drag & drop, resize, repositionnement intelligent, et système de lock.

### 3. `GridItem` - Élément de grille
Composant pour les éléments individuels de la grille, compatible avec les deux types de grille.

## Utilisation

### Grille de base (Grid)

```jsx
import { Grid } from './Grid';

<Grid columns={12} gap="20px" className="my-grid">
  <div>Contenu 1</div>
  <div>Contenu 2</div>
  <div>Contenu 3</div>
</Grid>
```

### Grille avancée (AdvancedGrid)

#### Configuration basique
```jsx
import { AdvancedGrid, GridItem } from './Grid';

<AdvancedGrid columns={12} gap="10px" rowHeight="100px">
  <GridItem id="1" col={1} row={1} w={2} h={2}>
    Élément 1
  </GridItem>
  <GridItem id="2" col={3} row={1} w={1} h={1}>
    Élément 2
  </GridItem>
</AdvancedGrid>
```

#### Avec fonctionnalités avancées
```jsx
<AdvancedGrid 
  columns={12}
  gap="10px"
  rowHeight="100px"
  draggable={true}
  resizable={true}
  autoReposition={true}
  lockSystem={true}
  collisionDetection="advanced"
  onItemMove={(itemId, newPosition) => console.log('Item moved:', itemId, newPosition)}
  onItemResize={(itemId, newSize) => console.log('Item resized:', itemId, newSize)}
  onItemLock={(itemId, isLocked) => console.log('Item locked:', itemId, isLocked)}
>
  <GridItem id="1" col={1} row={1} w={2} h={2}>
    Élément draggable et resizable
  </GridItem>
  <GridItem id="2" col={3} row={1} w={1} h={1} locked={true}>
    Élément verrouillé
  </GridItem>
</AdvancedGrid>
```

## Props de Configuration

### AdvancedGrid

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `columns` | number | 12 | Nombre de colonnes de la grille |
| `gap` | string | "10px" | Espacement entre les éléments |
| `rowHeight` | string | "100px" | Hauteur des lignes |
| `draggable` | boolean | false | Activer le drag & drop |
| `resizable` | boolean | false | Activer le resize |
| `autoReposition` | boolean | false | Repositionnement automatique des autres éléments |
| `lockSystem` | boolean | false | Système de verrouillage des éléments |
| `collisionDetection` | "basic" \| "advanced" | "basic" | Mode de détection des collisions |
| `onItemMove` | function | - | Callback lors du déplacement d'un élément |
| `onItemResize` | function | - | Callback lors du redimensionnement |
| `onItemLock` | function | - | Callback lors du verrouillage/déverrouillage |

### GridItem

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `id` | string | - | Identifiant unique de l'élément |
| `col` | number | 1 | Position en colonne (1-based) |
| `row` | number | 1 | Position en ligne (1-based) |
| `w` | number | 1 | Largeur en colonnes |
| `h` | number | 1 | Hauteur en lignes |
| `draggable` | boolean | true | Activer le drag pour cet élément |
| `resizable` | boolean | true | Activer le resize pour cet élément |
| `lockable` | boolean | true | Activer le lock pour cet élément |
| `locked` | boolean | false | État de verrouillage initial |

## Niveaux de Fonctionnalité

### Niveau 1 : Grille statique
```jsx
<AdvancedGrid columns={12}>
  <GridItem>Contenu</GridItem>
</AdvancedGrid>
```

### Niveau 2 : Drag & Drop simple
```jsx
<AdvancedGrid columns={12} draggable={true}>
  <GridItem>Contenu draggable</GridItem>
</AdvancedGrid>
```

### Niveau 3 : Resize simple
```jsx
<AdvancedGrid columns={12} draggable={true} resizable={true}>
  <GridItem>Contenu draggable et resizable</GridItem>
</AdvancedGrid>
```

### Niveau 4 : Toutes les fonctionnalités
```jsx
<AdvancedGrid 
  columns={12}
  draggable={true}
  resizable={true}
  autoReposition={true}
  lockSystem={true}
  collisionDetection="advanced"
>
  <GridItem>Contenu complet</GridItem>
</AdvancedGrid>
```

## Fonctionnalités Avancées

### Repositionnement Intelligent
- **Algorithme de priorité** : Remonte → Côtés → Descend
- **Gestion des collisions** : Repositionnement automatique des éléments bloquants
- **Optimisation** : Résolution des chevauchements en cascade

### Système de Lock
- **Double-clic** pour verrouiller/déverrouiller
- **Éléments verrouillés** : Non déplaçables, non redimensionnables
- **Style visuel** : Opacité réduite et filtre grayscale

### Gestion des Collisions
- **Mode basique** : Vérification simple des chevauchements
- **Mode avancé** : Algorithmes intelligents de repositionnement

## Callbacks et Événements

### onItemMove
```jsx
onItemMove={(itemId, newPosition) => {
  console.log(`Élément ${itemId} déplacé vers:`, newPosition);
  // newPosition: { col, row, w, h }
}}
```

### onItemResize
```jsx
onItemResize={(itemId, newSize) => {
  console.log(`Élément ${itemId} redimensionné:`, newSize);
  // newSize: { w, h }
}}
```

### onItemLock
```jsx
onItemLock={(itemId, isLocked) => {
  console.log(`Élément ${itemId} ${isLocked ? 'verrouillé' : 'déverrouillé'}`);
}}
```

## Classes CSS

### Grille
- `.ui-advanced-grid` : Conteneur principal
- `.ui-grid` : Grille de base (compatibilité)

### Éléments
- `.ui-grid-item` : Élément de grille
- `.ui-draggable` : Élément draggable
- `.ui-resizable` : Élément resizable
- `.ui-locked` : Élément verrouillé
- `.ui-dragging` : Élément en cours de drag
- `.ui-resize-handle` : Poignée de resize

## Accessibilité

- Support des préférences de mouvement réduit
- Support du mode contraste élevé
- Navigation au clavier
- Labels ARIA appropriés
- Styles d'impression

## Performance

- Utilisation de `useCallback` pour optimiser les fonctions
- Gestion conditionnelle des fonctionnalités
- Événements nettoyés automatiquement
- Métriques de grille calculées à la demande

## Compatibilité

- React 18+
- Navigateurs modernes (CSS Grid support)
- Support mobile et responsive
- Thèmes personnalisables via CSS variables 