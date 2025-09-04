# Icônes

Ce dossier contient tous les composants React d'icônes de la librairie UI Equitech.

## Utilisation

### Import direct d'une icône

```javascript
import { BoxIcon, CartIcon, SearchIcon } from '@equitech-dev/ui-library';

function MyComponent() {
  return (
    <div>
      <BoxIcon width={24} height={24} color="#007bff" />
      <CartIcon width={32} height={32} color="#28a745" />
      <SearchIcon width={20} height={20} color="#6c757d" />
    </div>
  );
}
```

### Import dynamique

```javascript
import { icons } from '@equitech-dev/ui-library';

function MyComponent() {
  const [IconComponent, setIconComponent] = useState(null);

  useEffect(() => {
    icons.box().then(module => {
      setIconComponent(() => module.default);
    });
  }, []);

  return IconComponent ? <IconComponent width={24} height={24} color="#007bff" /> : <div>Chargement...</div>;
}
```

## Icônes disponibles

- `BoxIcon` - Icône de boîte
- `CartIcon` - Icône de panier
- `ChevronIcon` - Icône de chevron
- `EditIcon` - Icône d'édition
- `ExclamationIcon` - Icône d'exclamation
- `OrderIcon` - Icône de commande
- `SearchIcon` - Icône de recherche
- `SettingsIcon` - Icône de paramètres
- `ShopBagIcon` - Icône de sac de magasin
- `SquaresIcon` - Icône de carrés
- `StatsIcon` - Icône de statistiques
- `TrashIcon` - Icône de poubelle
- `UploadImgIcon` - Icône d'upload d'image
- `UsersIcon` - Icône d'utilisateurs

## Props disponibles

Tous les composants d'icônes acceptent les props suivantes :

- `width` (number, default: 24) - Largeur de l'icône
- `height` (number, default: 24) - Hauteur de l'icône  
- `color` (string, default: "currentColor") - Couleur de l'icône
- `className` (string) - Classe CSS personnalisée
- `...props` - Toutes les autres props SVG

## Personnalisation

Les icônes peuvent être stylisées avec CSS ou via les props :

```css
.my-icon {
  width: 24px;
  height: 24px;
  fill: #007bff;
  stroke: none;
}
```

```javascript
<BoxIcon 
  width={32} 
  height={32} 
  color="#007bff" 
  className="my-custom-icon"
  style={{ marginRight: '8px' }}
/>
```
