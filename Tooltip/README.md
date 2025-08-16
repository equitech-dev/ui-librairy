# 💡 Tooltip

Info-bulle contextuelle universelle, accessible et personnalisable pour afficher des informations complémentaires.

## 📋 Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Élément déclencheur du tooltip |
| `label` | `string` | - | Texte affiché dans le tooltip |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position du tooltip |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `aria-label` | `string` | - | Label pour l'accessibilité (utilise `label` si non fourni) |

## 🚀 Exemple d'utilisation

```jsx
import { Tooltip } from '@equitech/ui-library';

function MonComposant() {
  return (
    <div>
      {/* Tooltip simple */}
      <Tooltip label="Cliquez pour plus d'informations">
        <button>Plus d'infos</button>
      </Tooltip>
      
      {/* Tooltip avec position personnalisée */}
      <Tooltip label="Ce champ est obligatoire" position="right">
        <input type="text" placeholder="Nom *" />
      </Tooltip>
      
      {/* Tooltip sur une icône */}
      <Tooltip label="Supprimer cet élément" position="bottom">
        <button aria-label="Supprimer">🗑️</button>
      </Tooltip>
      
      {/* Tooltip personnalisé */}
      <Tooltip 
        label="Version 2.1.0 - Dernière mise à jour" 
        position="left"
        className="custom-tooltip"
      >
        <span>ℹ️</span>
      </Tooltip>
    </div>
  );
}

// Utilisation dans un formulaire
function FormulaireAvecTooltips() {
  return (
    <form>
      <div>
        <label>Mot de passe</label>
        <Tooltip label="Le mot de passe doit contenir au moins 8 caractères">
          <input type="password" />
        </Tooltip>
      </div>
      
      <div>
        <label>Code postal</label>
        <Tooltip label="Format : 12345" position="right">
          <input type="text" maxLength="5" />
        </Tooltip>
      </div>
    </form>
  );
}
```

## ♿ Accessibilité

- **Rôle `tooltip`** : Identifie l'élément comme une info-bulle
- **Support clavier** : Activation avec Tab et Espace/Entrée
- **Support des lecteurs d'écran** : Le contenu est annoncé automatiquement
- **Gestion du focus** : Le tooltip apparaît au focus et disparaît à la perte de focus
- **Support tactile** : Fonctionne sur les appareils tactiles

## 🎨 Positions disponibles

| Position | Description |
|----------|-------------|
| `top` | Au-dessus de l'élément (par défaut) |
| `bottom` | En dessous de l'élément |
| `left` | À gauche de l'élément |
| `right` | À droite de l'élément |

## 🎨 Personnalisation

Le tooltip utilise les classes CSS suivantes pour la personnalisation :
- `.wrapper` : Conteneur de l'élément déclencheur
- `.tooltip` : Conteneur principal du tooltip
- `.tooltip.top` : Position en haut
- `.tooltip.bottom` : Position en bas
- `.tooltip.left` : Position à gauche
- `.tooltip.right` : Position à droite

```scss
// Exemple de personnalisation
.tooltip {
  position: absolute;
  background: #1f2937;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &.top {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 8px;
    
    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 4px solid transparent;
      border-top-color: #1f2937;
    }
  }
  
  &.bottom {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 8px;
  }
}
```

## 📱 Responsive

Le tooltip s'adapte automatiquement aux différentes tailles d'écran :
- **Mobile** : Positionnement optimisé pour éviter les débordements
- **Tablette/Desktop** : Positionnement standard avec flèches directionnelles

## 🔧 Comportement

- **Apparition** : Au survol ou au focus de l'élément déclencheur
- **Disparition** : À la perte du survol ou du focus
- **Délai** : Pas de délai pour une réactivité immédiate
- **Positionnement automatique** : Évite les débordements d'écran 