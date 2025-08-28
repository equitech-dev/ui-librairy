# Popover

Composant d'infobulle contextuelle pour afficher des informations supplémentaires au survol ou au clic.

## Utilisation

```jsx
import { Popover } from 'ui-library';

// Exemple simple
<Popover
  trigger={<button>Cliquez-moi</button>}
  content="Contenu de l'infobulle"
/>

// Exemple avec contenu riche
<Popover
  trigger={<span className="ui-icon ui-icon-info" />}
  content={
    <div>
      <div className="ui-popover-header info">Information</div>
      <div className="ui-popover-body">
        Contenu détaillé de l'infobulle avec du texte formaté.
      </div>
      <div className="ui-popover-footer">
        <button>Action</button>
      </div>
    </div>
  }
  variant="info"
  position="top"
/>
```

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `trigger` | `node` | **requis** | Élément déclencheur de l'infobulle |
| `content` | `node` | **requis** | Contenu de l'infobulle |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Position de l'infobulle |
| `variant` | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | Variante visuelle |
| `size` | `'default' \| 'small' \| 'large'` | `'default'` | Taille de l'infobulle |
| `disabled` | `boolean` | `false` | Désactive l'infobulle |
| `onOpen` | `function` | - | Callback appelé à l'ouverture |
| `onClose` | `function` | - | Callback appelé à la fermeture |
| `className` | `string` | `''` | Classe CSS personnalisée |
| `style` | `object` | `{}` | Styles inline personnalisés |

## Variantes

### Positions
- `top` : Au-dessus du déclencheur
- `bottom` : En-dessous du déclencheur (défaut)
- `left` : À gauche du déclencheur
- `right` : À droite du déclencheur

### Types
- `default` : Style standard
- `info` : Avec bordure et icône bleue
- `success` : Avec bordure et icône verte
- `warning` : Avec bordure et icône orange
- `error` : Avec bordure et icône rouge

### Tailles
- `small` : Petite taille (150px min-width)
- `default` : Taille standard (200px min-width)
- `large` : Grande taille (250px min-width)

## Structure du contenu

Pour un contenu riche, vous pouvez utiliser cette structure :

```jsx
<div>
  <div className="ui-popover-header [variant]">Titre</div>
  <div className="ui-popover-body">Contenu principal</div>
  <div className="ui-popover-footer">
    <button>Action 1</button>
    <button>Action 2</button>
  </div>
</div>
```

## Fonctionnalités

- **Positionnement automatique** : L'infobulle s'adapte automatiquement si elle dépasse les bords de l'écran
- **Fermeture automatique** : Se ferme au clic extérieur ou avec la touche Échap
- **Accessibilité** : Support complet des attributs ARIA
- **Responsive** : S'adapte aux écrans mobiles
- **Animations** : Transitions fluides à l'ouverture/fermeture

## Exemples d'utilisation

### Infobulle d'aide
```jsx
<Popover
  trigger={<span className="ui-icon ui-icon-help" />}
  content="Texte d'aide contextuel"
  variant="info"
  position="top"
/>
```

### Infobulle de confirmation
```jsx
<Popover
  trigger={<button>Supprimer</button>}
  content={
    <div>
      <div className="ui-popover-header warning">Confirmation</div>
      <div className="ui-popover-body">
        Êtes-vous sûr de vouloir supprimer cet élément ?
      </div>
      <div className="ui-popover-footer">
        <button>Annuler</button>
        <button>Confirmer</button>
      </div>
    </div>
  }
  variant="warning"
/>
```

### Infobulle avec contenu riche
```jsx
<Popover
  trigger={<span>Plus d'infos</span>}
  content={
    <div>
      <div className="ui-popover-header success">Succès</div>
      <div className="ui-popover-body">
        <p>Opération réussie !</p>
        <ul>
          <li>Point 1</li>
          <li>Point 2</li>
        </ul>
      </div>
    </div>
  }
  variant="success"
  size="large"
/>
```
