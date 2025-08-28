# 🎭 Overlay

Un composant de superposition avancé pour créer des modales, notifications, et autres éléments flottants avec gestion complète des interactions.

## 📋 Fonctionnalités

- **Superposition flexible** : Backdrop avec variantes et flou
- **Positionnement** : Centre, haut, bas, gauche, droite
- **Animations** : Fade, slide, scale, bounce
- **Thèmes** : Default, glass, dark
- **Gestion des clics** : Backdrop, escape, bouton de fermeture
- **États** : Loading, scroll lock
- **Responsive** : Adaptation mobile/tablet
- **Composants utilitaires** : Content, Backdrop, CloseButton

## 🎯 Utilisation

```jsx
import { Overlay, OverlayContent, OverlayBackdrop, OverlayCloseButton } from 'ui-library';

function App() {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <>
      <button onClick={() => setShowOverlay(true)}>
        Ouvrir l'overlay
      </button>

      <Overlay
        isOpen={showOverlay}
        onClose={() => setShowOverlay(false)}
        backdrop={true}
        backdropBlur={true}
        contentPosition="center"
        showCloseButton={true}
      >
        <OverlayContent>
          <div className="ui-card">
            <h2>Contenu de l'overlay</h2>
            <p>Ce contenu est affiché en superposition.</p>
          </div>
        </OverlayContent>
      </Overlay>
    </>
  );
}
```

## 🔧 Props

### Overlay

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `isOpen` | `boolean` | **requis** | État d'ouverture de l'overlay |
| `onClose` | `function` | **requis** | Fonction appelée à la fermeture |
| `children` | `node` | - | Contenu de l'overlay |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `backdrop` | `boolean` | `true` | Afficher le backdrop |
| `backdropVariant` | `'default' \| 'light' \| 'dark'` | `'default'` | Variante du backdrop |
| `backdropBlur` | `boolean` | `false` | Appliquer un flou au backdrop |
| `backdropBlurIntensity` | `'light' \| 'normal' \| 'heavy'` | `'normal'` | Intensité du flou |
| `contentPosition` | `'center' \| 'top' \| 'bottom' \| 'left' \| 'right'` | `'center'` | Position du contenu |
| `contentConstraint` | `'constrained' \| 'full' \| 'auto'` | `'constrained'` | Contrainte du contenu |
| `contentAnimation` | `'fade-in' \| 'slide-in' \| 'scale-in' \| 'bounce-in'` | `'fade-in'` | Animation du contenu |
| `overlayAnimation` | `'fade' \| 'slide' \| 'scale'` | `'fade'` | Animation de l'overlay |
| `theme` | `'default' \| 'glass' \| 'dark'` | `'default'` | Thème de l'overlay |
| `showCloseButton` | `boolean` | `false` | Afficher le bouton de fermeture |
| `closeOnBackdropClick` | `boolean` | `true` | Fermer en cliquant sur le backdrop |
| `closeOnEscape` | `boolean` | `true` | Fermer avec la touche Échap |
| `preventScroll` | `boolean` | `true` | Empêcher le scroll du body |
| `loading` | `boolean` | `false` | Afficher l'état de chargement |

### OverlayContent

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `node` | **requis** | Contenu à afficher |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `constraint` | `'constrained' \| 'full' \| 'auto'` | `'constrained'` | Contrainte de taille |
| `animation` | `'fade-in' \| 'slide-in' \| 'scale-in' \| 'bounce-in'` | `'fade-in'` | Animation d'entrée |

### OverlayBackdrop

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `className` | `string` | `''` | Classes CSS additionnelles |
| `variant` | `'default' \| 'light' \| 'dark'` | `'default'` | Variante du backdrop |
| `blur` | `boolean` | `false` | Appliquer un flou |
| `blurIntensity` | `'light' \| 'normal' \| 'heavy'` | `'normal'` | Intensité du flou |
| `onClick` | `function` | - | Gestionnaire de clic |

### OverlayCloseButton

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `className` | `string` | `''` | Classes CSS additionnelles |
| `onClick` | `function` | - | Gestionnaire de clic |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du bouton |
| `theme` | `'default' \| 'dark' \| 'glass'` | `'default'` | Thème du bouton |

## 📐 Variantes de Backdrop

| Variante | Opacité | Description |
|----------|---------|-------------|
| `default` | 0.5 | Backdrop standard |
| `light` | 0.2 | Backdrop léger |
| `dark` | 0.8 | Backdrop sombre |

## 🎬 Animations

### Overlay
| Animation | Description |
|-----------|-------------|
| `fade` | Apparition en fondu |
| `slide` | Glissement depuis la position |
| `scale` | Zoom depuis le centre |

### Contenu
| Animation | Description |
|-----------|-------------|
| `fade-in` | Apparition en fondu |
| `slide-in` | Glissement depuis le haut |
| `scale-in` | Zoom depuis le centre |
| `bounce-in` | Rebondissement |

## 🎨 Thèmes

### Default
Overlay standard avec backdrop semi-transparent.

### Glass
Effet de verre avec flou et transparence.

### Dark
Thème sombre avec backdrop opaque.

## 📱 Responsive

- **Tablet** : Padding réduit, contraintes ajustées
- **Mobile** : Pleine largeur/hauteur, boutons plus petits

## 💡 Exemples

### Modale simple
```jsx
<Overlay
  isOpen={isOpen}
  onClose={onClose}
  contentPosition="center"
  showCloseButton
>
  <OverlayContent>
    <div className="ui-card">
      <h2>Modale</h2>
      <p>Contenu de la modale</p>
    </div>
  </OverlayContent>
</Overlay>
```

### Notification en haut
```jsx
<Overlay
  isOpen={isOpen}
  onClose={onClose}
  contentPosition="top"
  backdrop={false}
  overlayAnimation="slide"
>
  <OverlayContent constraint="auto">
    <div className="ui-alert ui-alert--success">
      Action effectuée avec succès !
    </div>
  </OverlayContent>
</Overlay>
```

### Overlay avec effet glass
```jsx
<Overlay
  isOpen={isOpen}
  onClose={onClose}
  theme="glass"
  backdropBlur
  backdropBlurIntensity="heavy"
  contentAnimation="bounce-in"
>
  <OverlayContent>
    <div className="ui-card">
      <h2>Effet Glass</h2>
      <p>Overlay avec effet de verre</p>
    </div>
  </OverlayContent>
</Overlay>
```

### Overlay de chargement
```jsx
<Overlay
  isOpen={isLoading}
  onClose={() => {}}
  loading={true}
  closeOnBackdropClick={false}
  closeOnEscape={false}
  backdropVariant="dark"
>
  <OverlayContent>
    <div>Chargement en cours...</div>
  </OverlayContent>
</Overlay>
```

### Overlay sans backdrop
```jsx
<Overlay
  isOpen={isOpen}
  onClose={onClose}
  backdrop={false}
  contentPosition="bottom"
  overlayAnimation="slide"
>
  <OverlayContent constraint="full">
    <div className="ui-drawer">
      <h2>Panneau latéral</h2>
      <p>Contenu du panneau</p>
    </div>
  </OverlayContent>
</Overlay>
```

## 🎨 CSS Classes

### Classes principales
- `.ui-overlay` - Conteneur principal de l'overlay
- `.ui-overlay-content` - Wrapper pour le contenu
- `.ui-overlay-backdrop` - Backdrop d'arrière-plan
- `.ui-overlay-close` - Bouton de fermeture

### Modificateurs de position
- `.ui-overlay--content-center` - Contenu centré
- `.ui-overlay--content-top` - Contenu en haut
- `.ui-overlay--content-bottom` - Contenu en bas
- `.ui-overlay--content-left` - Contenu à gauche
- `.ui-overlay--content-right` - Contenu à droite

### Modificateurs de backdrop
- `.ui-overlay--backdrop` - Backdrop standard
- `.ui-overlay--backdrop-light` - Backdrop léger
- `.ui-overlay--backdrop-dark` - Backdrop sombre
- `.ui-overlay--backdrop-blur` - Backdrop avec flou

### Modificateurs d'animation
- `.ui-overlay--fade` - Animation de fondu
- `.ui-overlay--slide` - Animation de glissement
- `.ui-overlay--scale` - Animation d'échelle

### Modificateurs de thème
- `.ui-overlay--glass` - Thème verre
- `.ui-overlay--dark` - Thème sombre

## 🔧 Personnalisation

### Variables CSS personnalisées
```scss
:root {
  --z-overlay: 1000;
  --overlay-transition: 0.3s ease-in-out;
}
```

### Styles personnalisés
```scss
.custom-overlay {
  .ui-overlay-content {
    background: linear-gradient(45deg, var(--primary), var(--secondary));
    border-radius: var(--radius-xl);
  }
}
```

## ⚠️ Notes importantes

1. **Z-index** : L'overlay utilise un z-index élevé, ajustez si nécessaire
2. **Scroll lock** : Empêche le scroll du body par défaut
3. **Accessibilité** : Gère automatiquement les attributs ARIA
4. **Performance** : Les animations utilisent des propriétés optimisées
5. **Mobile** : Adaptation automatique pour les petits écrans


