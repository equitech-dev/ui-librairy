# 🚨 Alert

Message d'alerte universel, accessible et personnalisable pour afficher des notifications contextuelles.

## 📋 Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `type` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Type d'alerte déterminant le style |
| `children` | `ReactNode` | - | Contenu du message d'alerte |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `object` | `{}` | Styles inline additionnels |
| `aria-label` | `string` | - | Label pour l'accessibilité |

## 🚀 Exemple d'utilisation

```jsx
import { Alert } from '@equitech/ui-library';

function MonComposant() {
  return (
    <div>
      <Alert type="info">
        Ceci est une information importante.
      </Alert>
      
      <Alert type="success">
        L'opération a été effectuée avec succès !
      </Alert>
      
      <Alert type="warning">
        Attention, cette action est irréversible.
      </Alert>
      
      <Alert type="error">
        Une erreur s'est produite lors du traitement.
      </Alert>
    </div>
  );
}
```

## ♿ Accessibilité

- **Rôle `alert`** : Identifie l'élément comme une alerte pour les lecteurs d'écran
- **Couleurs sémantiques** : Chaque type d'alerte a une couleur distinctive
- **Contraste élevé** : Respect des standards d'accessibilité pour la lisibilité
- **Support des lecteurs d'écran** : Les alertes sont automatiquement annoncées

## 🎨 Types d'alertes

| Type | Couleur | Usage |
|------|---------|-------|
| `info` | Bleu | Informations générales |
| `success` | Vert | Confirmations et succès |
| `warning` | Orange | Avertissements |
| `error` | Rouge | Erreurs et problèmes |

## 🎨 Personnalisation

L'alerte utilise les classes CSS suivantes pour la personnalisation :
- `.alert` : Conteneur principal
- `.alert.info` : Style pour les informations
- `.alert.success` : Style pour les succès
- `.alert.warning` : Style pour les avertissements
- `.alert.error` : Style pour les erreurs

```scss
// Exemple de personnalisation
.alert {
  border-left: 4px solid;
  
  &.info {
    border-color: #3b82f6;
    background: #eff6ff;
  }
  
  &.success {
    border-color: #10b981;
    background: #ecfdf5;
  }
}
```

## 📱 Responsive

Les alertes s'adaptent automatiquement aux différentes tailles d'écran :
- **Mobile** : Padding réduit et police adaptée
- **Tablette/Desktop** : Espacement optimal pour la lecture 