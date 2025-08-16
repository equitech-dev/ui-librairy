# 🔘 Button

Bouton universel, accessible et personnalisable pour toutes les actions utilisateur.

## 📋 Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `model` | `'primary' \| 'secondary' \| 'success' \| 'info' \| 'warning'` | `'primary'` | Style visuel du bouton |
| `size` | `'s' \| 'm' \| 'l'` | `'m'` | Taille du bouton |
| `outline` | `boolean` | `false` | Variante avec bordure (sans fond) |
| `reverse` | `boolean` | `false` | Inverser l'ordre du contenu (icône + texte) |
| `disabled` | `boolean` | `false` | Désactive le bouton |
| `onClick` | `function` | - | Callback appelé lors du clic |
| `children` | `ReactNode` | - | Contenu du bouton |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `aria-label` | `string` | - | Label pour l'accessibilité |

## 🚀 Exemple d'utilisation

```jsx
import { Button } from '@equitech/ui-library';

function MonComposant() {
  const handleClick = () => {
    console.log('Bouton cliqué !');
  };

  return (
    <div className="ui-flex ui-gap-m ui-flex-wrap">
      {/* Boutons de base */}
      <Button model="primary" onClick={handleClick}>
        Action principale
      </Button>
      
      <Button model="secondary" onClick={handleClick}>
        Action secondaire
      </Button>
      
      {/* Boutons avec différentes tailles */}
      <Button size="s" model="success">
        Petit bouton
      </Button>
      
      <Button size="l" model="warning">
        Grand bouton
      </Button>
      
      {/* Bouton outline */}
      <Button model="primary" outline>
        Bouton outline
      </Button>
      
      {/* Bouton inversé */}
      <Button model="info" reverse>
        <span>ℹ️</span>
        <span>Info</span>
      </Button>
      
      {/* Bouton désactivé */}
      <Button disabled>
        Bouton désactivé
      </Button>
      
      {/* Bouton avec personnalisation */}
      <Button 
        model="success" 
        className="ui-rounded"
        aria-label="Confirmer l'action"
      >
        ✓ Confirmer
      </Button>
    </div>
  );
}

// Utilisation dans un formulaire
function FormulaireAvecBoutons() {
  return (
    <form className="ui-flex ui-gap-m">
      <input type="text" placeholder="Nom" className="ui-input" />
      
      <div className="ui-flex ui-gap-s">
        <Button model="secondary" type="button">
          Annuler
        </Button>
        
        <Button model="primary" type="submit">
          Envoyer
        </Button>
      </div>
    </form>
  );
}
```

## ♿ Accessibilité

- **Support des attributs HTML natifs** : Tous les attributs d'accessibilité sont supportés
- **Navigation clavier** : Support complet de la navigation avec Tab
- **Focus visible** : Indicateur de focus clair et visible
- **Support des lecteurs d'écran** : Compatible avec les technologies d'assistance
- **États désactivés** : Gestion appropriée de l'état désactivé
- **Rôle sémantique** : Utilise l'élément `<button>` natif

## 🎨 Modèles disponibles

| Modèle | Couleur | Usage |
|--------|---------|-------|
| `primary` | Bleu (#0070f3) | Actions principales, soumissions |
| `secondary` | Gris (#989898) | Actions secondaires, annulations |
| `success` | Vert (#36A12D) | Confirmations, succès |
| `info` | Bleu clair (#5E8CB7) | Informations, détails |
| `warning` | Orange (#BF3232) | Avertissements, actions critiques |

## 🎨 Tailles disponibles

| Taille | Padding | Hauteur min | Usage |
|--------|---------|-------------|-------|
| `s` | 0.5rem 1rem | 32px | Actions compactes, icônes |
| `m` | 0.75rem 1.5rem | 40px | Actions standard (par défaut) |
| `l` | 1rem 2rem | 48px | Actions importantes, CTA |

## 🎨 Personnalisation

Le bouton utilise les classes CSS suivantes pour la personnalisation :

```scss
// Classes principales
.ui-button { /* Conteneur principal */ }
.ui-button.primary { /* Style primaire */ }
.ui-button.secondary { /* Style secondaire */ }
.ui-button.success { /* Style de validation */ }
.ui-button.info { /* Style d'information */ }
.ui-button.warning { /* Style d'avertissement */ }

// Tailles
.ui-button.s { /* Taille petite */ }
.ui-button.m { /* Taille moyenne */ }
.ui-button.l { /* Taille grande */ }

// Variantes
.ui-button.outline { /* Variante avec bordure */ }
.ui-button.reverse { /* Contenu inversé */ }

// États
.ui-button:disabled { /* État désactivé */ }
.ui-button:hover { /* État hover */ }
.ui-button:focus { /* État focus */ }
```

### Exemple de personnalisation avancée

```scss
// Personnalisation d'un bouton spécifique
.ui-button.custom-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }
}

// Personnalisation des couleurs
.ui-button.primary {
  background: #your-primary-color;
  color: #your-text-color;
  
  &:hover {
    background: color.adjust(#your-primary-color, $lightness: -10%);
  }
}
```

## 📱 Responsive

Les boutons s'adaptent automatiquement aux différentes tailles d'écran :
- **Mobile** : Taille optimisée pour les écrans tactiles (min 44px de hauteur)
- **Tablette/Desktop** : Espacement et taille optimaux pour la navigation

### Classes utilitaires pour le responsive

```scss
// Masquer/afficher selon la taille d'écran
.ui-tablet-hidden { /* Masqué sur tablette */ }
.ui-desktop-hidden { /* Masqué sur desktop */ }

// Ajuster la taille selon l'écran
@media screen and (max-width: 768px) {
  .ui-button {
    width: 100%; // Boutons pleine largeur sur mobile
  }
}
```

## 🔧 Fonctionnalités

- **Support des types HTML** : `button`, `submit`, `reset`
- **Référence React** : Support des refs pour le focus programmatique
- **États interactifs** : Hover, focus, active, disabled
- **Contenu flexible** : Texte, icônes, ou combinaison des deux
- **Variantes multiples** : Outline, reverse, différentes tailles
- **Accessibilité complète** : ARIA, navigation clavier, lecteurs d'écran

## 🎯 Cas d'usage

### Bouton d'action principale
```jsx
<Button model="primary" size="l">
  Créer un compte
</Button>
```

### Bouton d'action secondaire
```jsx
<Button model="secondary" outline>
  Annuler
</Button>
```

### Bouton avec icône
```jsx
<Button model="info" reverse>
  <span>📧</span>
  <span>Envoyer un email</span>
</Button>
```

### Bouton de confirmation
```jsx
<Button model="success" size="s">
  ✓ Confirmer
</Button>
``` 