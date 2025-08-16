# 🏷️ Badge

Badge d'information universel, accessible et personnalisable pour afficher des étiquettes, statuts ou compteurs.

## 📋 Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `type` | `'default' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Type de badge déterminant le style |
| `children` | `ReactNode` | - | Contenu du badge |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `aria-label` | `string` | - | Label pour l'accessibilité |

## 🚀 Exemple d'utilisation

```jsx
import { Badge } from '@equitech/ui-library';

function MonComposant() {
  return (
    <div>
      {/* Badges de statut */}
      <Badge type="success">Actif</Badge>
      <Badge type="warning">En attente</Badge>
      <Badge type="error">Erreur</Badge>
      <Badge type="info">Nouveau</Badge>
      
      {/* Badges de compteur */}
      <Badge type="default">42</Badge>
      <Badge type="success">+5</Badge>
      
      {/* Badges personnalisés */}
      <Badge type="info" className="custom-badge">
        Version 2.0
      </Badge>
    </div>
  );
}

// Utilisation dans une liste
function ListeUtilisateurs() {
  const users = [
    { name: 'Alice', status: 'online' },
    { name: 'Bob', status: 'offline' },
    { name: 'Charlie', status: 'away' }
  ];

  const getStatusBadge = (status) => {
    const types = {
      online: 'success',
      offline: 'default',
      away: 'warning'
    };
    
    return <Badge type={types[status]}>{status}</Badge>;
  };

  return (
    <ul>
      {users.map(user => (
        <li key={user.name}>
          {user.name} {getStatusBadge(user.status)}
        </li>
      ))}
    </ul>
  );
}
```

## ♿ Accessibilité

- **Support des lecteurs d'écran** : Le contenu est annoncé automatiquement
- **Contraste élevé** : Respect des standards d'accessibilité pour la lisibilité
- **Couleurs sémantiques** : Chaque type a une signification visuelle claire
- **Support des attributs ARIA** : Compatible avec les technologies d'assistance

## 🎨 Types de badges

| Type | Couleur | Usage |
|------|---------|-------|
| `default` | Gris | Informations neutres, compteurs |
| `success` | Vert | Statuts positifs, confirmations |
| `warning` | Orange | Avertissements, états intermédiaires |
| `error` | Rouge | Erreurs, problèmes, alertes |
| `info` | Bleu | Informations, nouveautés |

## 🎨 Personnalisation

Le badge utilise les classes CSS suivantes pour la personnalisation :
- `.badge` : Conteneur principal
- `.badge.default` : Style par défaut
- `.badge.success` : Style pour les succès
- `.badge.warning` : Style pour les avertissements
- `.badge.error` : Style pour les erreurs
- `.badge.info` : Style pour les informations

```scss
// Exemple de personnalisation
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &.success {
    background: #ecfdf5;
    color: #065f46;
    border: 1px solid #a7f3d0;
  }
  
  &.warning {
    background: #fffbeb;
    color: #92400e;
    border: 1px solid #fcd34d;
  }
  
  &.error {
    background: #fef2f2;
    color: #991b1b;
    border: 1px solid #fca5a5;
  }
}
```

## 📱 Responsive

Les badges s'adaptent automatiquement aux différentes tailles d'écran :
- **Mobile** : Taille de police adaptée et padding optimisé
- **Tablette/Desktop** : Espacement et taille optimaux pour la lecture

## 🔧 Cas d'usage

- **Statuts utilisateur** : En ligne, hors ligne, occupé
- **Compteurs de notifications** : Nombre de messages non lus
- **Étiquettes de contenu** : Catégories, tags, versions
- **Indicateurs de progression** : Étapes d'un processus
- **Alertes contextuelles** : Nouveautés, mises à jour 