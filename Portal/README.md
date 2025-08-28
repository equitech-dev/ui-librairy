# 🌐 Portal

Un composant pour rendre du contenu en dehors de la hiérarchie DOM normale, utile pour les modales, tooltips, et autres éléments flottants.

## 📋 Fonctionnalités

- **Rendu externe** : Contenu rendu en dehors du DOM parent
- **Conteneurs personnalisés** : Support pour différents conteneurs cibles
- **Positionnement flexible** : Fixed, absolute avec alignements multiples
- **Backdrop** : Overlay avec variantes et flou
- **Animations** : Fade, slide, scale
- **Gestion des z-index** : Niveaux de priorité configurables
- **Composants utilitaires** : Container, Backdrop, Content

## 🎯 Utilisation

```jsx
import { Portal, PortalContainer, PortalBackdrop, PortalContent } from 'ui-library';

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Ouvrir la modale
      </button>

      {showModal && (
        <Portal showBackdrop backdropBlur>
          <PortalContainer variant="constrained">
            <PortalContent>
              <div className="ui-card">
                <h2>Contenu de la modale</h2>
                <p>Ce contenu est rendu en dehors du DOM parent.</p>
                <button onClick={() => setShowModal(false)}>
                  Fermer
                </button>
              </div>
            </PortalContent>
          </PortalContainer>
        </Portal>
      )}
    </>
  );
}
```

## 🔧 Props

### Portal

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `node` | **requis** | Contenu à rendre dans le portal |
| `container` | `string \| HTMLElement` | `document.body` | Conteneur cible |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `position` | `'fixed' \| 'absolute'` | `'fixed'` | Position du portal |
| `alignment` | `'center' \| 'top' \| 'bottom' \| 'left' \| 'right'` | `'center'` | Alignement du contenu |
| `showBackdrop` | `boolean` | `false` | Afficher l'overlay |
| `backdropBlur` | `boolean` | `false` | Appliquer un flou à l'overlay |
| `backdropVariant` | `'default' \| 'light' \| 'dark'` | `'default'` | Variante de l'overlay |
| `animation` | `'fade-in' \| 'slide-in' \| 'scale-in'` | `'fade-in'` | Animation d'entrée |
| `zIndex` | `'low' \| 'medium' \| 'high' \| 'top'` | `'medium'` | Niveau de z-index |
| `disablePortal` | `boolean` | `false` | Désactiver le portal |

### PortalContainer

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `node` | **requis** | Contenu du conteneur |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `variant` | `'constrained' \| 'full' \| 'auto'` | `'constrained'` | Type de conteneur |

### PortalBackdrop

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `className` | `string` | `''` | Classes CSS additionnelles |
| `variant` | `'default' \| 'light' \| 'dark'` | `'default'` | Variante de l'overlay |
| `blur` | `boolean` | `false` | Appliquer un flou |
| `onClick` | `function` | - | Gestionnaire de clic |

### PortalContent

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `node` | **requis** | Contenu à positionner |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `position` | `'center' \| 'top' \| 'bottom' \| 'left' \| 'right'` | `'center'` | Position du contenu |

## 📐 Variantes de Conteneur

| Variante | Description |
|----------|-------------|
| `constrained` | Largeur/hauteur limitées (90vw/90vh) |
| `full` | Pleine largeur/hauteur (100vw/100vh) |
| `auto` | Taille automatique basée sur le contenu |

## 🎨 Variantes d'Overlay

| Variante | Opacité | Description |
|----------|---------|-------------|
| `default` | 0.5 | Overlay standard |
| `light` | 0.2 | Overlay léger |
| `dark` | 0.8 | Overlay sombre |

## 🎬 Animations

| Animation | Description |
|-----------|-------------|
| `fade-in` | Apparition en fondu |
| `slide-in` | Glissement depuis le haut |
| `scale-in` | Zoom depuis le centre |

## 📱 Responsive

- **Tablet** : Overlay avec padding réduit
- **Mobile** : Conteneurs contraints à 100vw/100vh

## 💡 Exemples

### Modale simple
```jsx
<Portal showBackdrop>
  <PortalContainer>
    <PortalContent>
      <div className="ui-card">
        <h2>Modale</h2>
        <p>Contenu de la modale</p>
      </div>
    </PortalContent>
  </PortalContainer>
</Portal>
```

### Tooltip avec portal
```jsx
<Portal 
  container="tooltip-container"
  position="absolute"
  alignment="top"
  zIndex="high"
>
  <div className="ui-tooltip">
    Contenu du tooltip
  </div>
</Portal>
```

### Notification en haut
```jsx
<Portal 
  alignment="top"
  animation="slide-in"
  showBackdrop={false}
>
  <PortalContainer variant="auto">
    <div className="ui-alert ui-alert--success">
      Notification envoyée avec succès !
    </div>
  </PortalContainer>
</Portal>
```

### Modal avec backdrop personnalisé
```jsx
<Portal 
  showBackdrop 
  backdropBlur 
  backdropVariant="dark"
  animation="scale-in"
>
  <PortalContainer variant="constrained">
    <PortalContent>
      <div className="ui-modal">
        {/* Contenu de la modale */}
      </div>
    </PortalContent>
  </PortalContainer>
</Portal>
```

### Conteneur personnalisé
```jsx
// Créer un conteneur personnalisé
const customContainer = document.getElementById('my-portal-container');

<Portal 
  container={customContainer}
  position="absolute"
  alignment="center"
>
  <div>Contenu dans le conteneur personnalisé</div>
</Portal>
```

## 🎨 CSS Classes

### Classes principales
- `.ui-portal` - Conteneur principal du portal
- `.ui-portal-container` - Conteneur pour le contenu
- `.ui-portal-backdrop` - Overlay d'arrière-plan
- `.ui-portal-content` - Wrapper pour le contenu positionné

### Modificateurs de position
- `.ui-portal--fixed` - Position fixe
- `.ui-portal--absolute` - Position absolue
- `.ui-portal--center` - Alignement centré
- `.ui-portal--top` - Alignement en haut
- `.ui-portal--bottom` - Alignement en bas
- `.ui-portal--left` - Alignement à gauche
- `.ui-portal--right` - Alignement à droite

### Modificateurs d'overlay
- `.ui-portal--overlay` - Overlay standard
- `.ui-portal--overlay-light` - Overlay léger
- `.ui-portal--overlay-dark` - Overlay sombre
- `.ui-portal--overlay-blur` - Overlay avec flou

### Modificateurs d'animation
- `.ui-portal--fade-in` - Animation de fondu
- `.ui-portal--slide-in` - Animation de glissement
- `.ui-portal--scale-in` - Animation d'échelle

### Modificateurs de z-index
- `.ui-portal--z-low` - Z-index bas
- `.ui-portal--z-medium` - Z-index moyen
- `.ui-portal--z-high` - Z-index élevé
- `.ui-portal--z-top` - Z-index maximum

## 🔧 Personnalisation

### Variables CSS personnalisées
```scss
:root {
  --z-portal: 9999;
  --z-portal-low: 1000;
  --z-portal-medium: 2000;
  --z-portal-high: 3000;
  --z-portal-top: 9999;
}
```

### Styles personnalisés
```scss
.custom-portal {
  .ui-portal-container {
    background: var(--primary);
    border-radius: var(--radius-lg);
  }
}
```

## ⚠️ Notes importantes

1. **Conteneurs personnalisés** : Les conteneurs créés automatiquement sont nettoyés si vides
2. **Z-index** : Utilisez les niveaux appropriés pour éviter les conflits
3. **Accessibilité** : Le portal ne gère pas automatiquement le focus, utilisez avec des composants accessibles
4. **Performance** : Évitez de créer trop de portals simultanément


