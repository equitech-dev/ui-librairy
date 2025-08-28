# 🚪 Drawer/Sidebar

Un composant de panneau latéral coulissant avec support pour différentes positions, tailles et thèmes.

## 📋 Fonctionnalités

- **Positions multiples** : gauche, droite, haut, bas
- **Tailles configurables** : sm, md, lg, xl, full
- **Thèmes** : default, dark, glass
- **Animations** : slide, fade, scale
- **Accessibilité** : ARIA, focus management, navigation clavier
- **Responsive** : adaptation mobile/tablet
- **Overlay** : avec ou sans flou d'arrière-plan
- **Footer** : avec alignement configurable

## 🎯 Utilisation

```jsx
import { Drawer } from 'ui-library';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Ouvrir le panneau
      </button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Mon Panneau"
        subtitle="Description du panneau"
        position="left"
        size="md"
      >
        <p>Contenu du panneau</p>
      </Drawer>
    </>
  );
}
```

## 🔧 Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `isOpen` | `boolean` | **requis** | État d'ouverture du panneau |
| `onClose` | `function` | **requis** | Fonction appelée à la fermeture |
| `position` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` | Position du panneau |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Taille du panneau |
| `title` | `string` | - | Titre du panneau |
| `subtitle` | `string` | - | Sous-titre du panneau |
| `children` | `node` | - | Contenu du panneau |
| `footer` | `node` | - | Contenu du footer |
| `footerAlignment` | `'left' \| 'center' \| 'right' \| 'space-between'` | `'right'` | Alignement du footer |
| `showOverlay` | `boolean` | `true` | Afficher l'overlay |
| `overlayBlur` | `boolean` | `false` | Appliquer un flou à l'overlay |
| `closeOnOverlayClick` | `boolean` | `true` | Fermer en cliquant sur l'overlay |
| `closeOnEscape` | `boolean` | `true` | Fermer avec la touche Échap |
| `preventScroll` | `boolean` | `true` | Empêcher le scroll du body |
| `animation` | `'slide' \| 'fade' \| 'scale'` | `'slide'` | Type d'animation |
| `theme` | `'default' \| 'dark' \| 'glass'` | `'default'` | Thème du panneau |
| `className` | `string` | `''` | Classes CSS additionnelles |

## 📐 Tailles

| Taille | Largeur | Hauteur (top/bottom) |
|--------|---------|---------------------|
| `sm` | 320px | 320px |
| `md` | 480px | 480px |
| `lg` | 640px | 640px |
| `xl` | 800px | 800px |
| `full` | 100vw | 100vh |

## 🎨 Thèmes

### Default
Panneau blanc standard avec ombre portée.

### Dark
Panneau sombre avec texte blanc.

### Glass
Panneau transparent avec effet de flou.

## 🎬 Animations

### Slide (défaut)
Animation de glissement depuis la position.

### Fade
Animation de fondu en opacité.

### Scale
Animation d'échelle avec zoom.

## 📱 Responsive

- **Tablet** : Les tailles md, lg, xl sont limitées à 90vw
- **Mobile** : Toutes les tailles passent à 100vw

## ♿ Accessibilité

- **ARIA** : `role="dialog"`, `aria-modal="true"`
- **Focus** : Gestion automatique du focus
- **Clavier** : Support de la touche Échap
- **Screen readers** : Labels et descriptions appropriés

## 💡 Exemples

### Panneau avec footer
```jsx
<Drawer
  isOpen={isOpen}
  onClose={onClose}
  title="Configuration"
  footer={
    <div>
      <button onClick={onClose}>Annuler</button>
      <button onClick={onSave}>Sauvegarder</button>
    </div>
  }
  footerAlignment="space-between"
>
  <form>
    {/* Contenu du formulaire */}
  </form>
</Drawer>
```

### Panneau sombre en haut
```jsx
<Drawer
  isOpen={isOpen}
  onClose={onClose}
  position="top"
  size="lg"
  theme="dark"
  title="Notifications"
  overlayBlur
>
  <div>
    {/* Liste des notifications */}
  </div>
</Drawer>
```

### Panneau sans overlay
```jsx
<Drawer
  isOpen={isOpen}
  onClose={onClose}
  position="right"
  showOverlay={false}
  closeOnOverlayClick={false}
  animation="fade"
>
  <div>
    {/* Contenu du panneau */}
  </div>
</Drawer>
```

### Panneau avec animation personnalisée
```jsx
<Drawer
  isOpen={isOpen}
  onClose={onClose}
  animation="scale"
  theme="glass"
  className="custom-drawer"
>
  <div>
    {/* Contenu avec style personnalisé */}
  </div>
</Drawer>
```

## 🎨 CSS Classes

### Classes principales
- `.ui-drawer` - Conteneur principal
- `.ui-drawer-header` - En-tête du panneau
- `.ui-drawer-body` - Corps du panneau
- `.ui-drawer-footer` - Pied de page
- `.ui-drawer-overlay` - Overlay d'arrière-plan

### Modificateurs de position
- `.ui-drawer--left` - Position gauche
- `.ui-drawer--right` - Position droite
- `.ui-drawer--top` - Position haut
- `.ui-drawer--bottom` - Position bas

### Modificateurs de taille
- `.ui-drawer--sm` - Taille petite
- `.ui-drawer--md` - Taille moyenne
- `.ui-drawer--lg` - Taille grande
- `.ui-drawer--xl` - Taille très grande
- `.ui-drawer--full` - Taille pleine

### Modificateurs de thème
- `.ui-drawer--dark` - Thème sombre
- `.ui-drawer--glass` - Thème verre

### Modificateurs d'animation
- `.ui-drawer--slide` - Animation de glissement
- `.ui-drawer--fade` - Animation de fondu
- `.ui-drawer--scale` - Animation d'échelle

## 🔧 Personnalisation

### Variables CSS personnalisées
```scss
:root {
  --z-drawer: 1000;
  --drawer-transition: 0.3s ease-in-out;
}
```

### Styles personnalisés
```scss
.custom-drawer {
  .ui-drawer-header {
    background: linear-gradient(45deg, var(--primary), var(--secondary));
    color: white;
  }
}
```


