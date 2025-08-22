# 🧩 GridItem

Élément de grille individuel avec support du drag & drop, redimensionnement et verrouillage.

## 📋 Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Contenu à afficher dans l'élément |
| `id` | `string` | - | Identifiant unique de l'élément |
| `col` | `number` | `1` | Position en colonne (basé sur 1) |
| `row` | `number` | `1` | Position en ligne (basé sur 1) |
| `w` | `number` | `1` | Largeur en colonnes |
| `h` | `number` | `1` | Hauteur en lignes |
| `draggable` | `boolean` | `true` | Activer le glisser-déposer |
| `resizable` | `boolean` | `true` | Activer le redimensionnement |
| `lockable` | `boolean` | `true` | Activer le verrouillage |
| `locked` | `boolean` | `false` | État de verrouillage initial |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `object` | `{}` | Styles inline additionnels |

## 🚀 Exemple d'utilisation

```jsx
import { GridItem } from '@equitech/ui-library';

function MonComposant() {
  return (
    <div className="ui-advanced-grid">
      {/* GridItem simple */}
      <GridItem id="item1" col={1} row={1}>
        <h3>Élément 1</h3>
        <p>Contenu de base</p>
      </GridItem>
      
      {/* GridItem plus large */}
      <GridItem 
        id="item2" 
        col={2} 
        row={1} 
        w={2} 
        h={1}
      >
        <h3>Élément Large</h3>
        <p>Occupe 2 colonnes</p>
      </GridItem>
      
      {/* GridItem verrouillé */}
      <GridItem 
        id="item3" 
        col={1} 
        row={2}
        locked={true}
        draggable={false}
      >
        <h3>Élément Verrouillé</h3>
        <p>Ne peut pas être déplacé</p>
      </GridItem>
      
      {/* GridItem non redimensionnable */}
      <GridItem 
        id="item4" 
        col={3} 
        row={2}
        resizable={false}
      >
        <h3>Taille Fixe</h3>
        <p>Ne peut pas être redimensionné</p>
      </GridItem>
    </div>
  );
}
```

## ♿ Accessibilité

- **Navigation clavier** : Support complet avec Tab et Arrow keys
- **Focus visible** : Indicateur de focus clair
- **Support des lecteurs d'écran** : Compatible avec les technologies d'assistance
- **Attributs ARIA** : Labels appropriés pour les actions
- **États désactivés** : Gestion des états verrouillé/désactivé

## 🎨 Personnalisation

Le GridItem utilise les classes CSS suivantes :

```scss
// Classes principales
.ui-grid-item { /* Conteneur principal */ }
.ui-grid-item.ui-draggable { /* État déplaçable */ }
.ui-grid-item.ui-resizable { /* État redimensionnable */ }
.ui-grid-item.ui-locked { /* État verrouillé */ }
.ui-resize-handle { /* Poignée de redimensionnement */ }

// États
.ui-grid-item.ui-dragging { /* En cours de déplacement */ }
.ui-grid-item:hover { /* Au survol */ }
.ui-grid-item:focus { /* Au focus */ }
```

## 🎯 Cas d'usage

### Élément de tableau de bord
```jsx
<GridItem id="dashboard-widget" col={1} row={1} w={2} h={1}>
  <DashboardWidget />
</GridItem>
```

### Élément non interactif
```jsx
<GridItem 
  id="static-content" 
  draggable={false} 
  resizable={false}
>
  <StaticContent />
</GridItem>
```

### Élément verrouillé
```jsx
<GridItem 
  id="locked-item" 
  locked={true}
  className="important-item"
>
  <ImportantContent />
</GridItem>
```
