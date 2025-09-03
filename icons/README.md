# Icônes

Ce dossier contient toutes les icônes SVG de la librairie UI Equitech.

## Utilisation

### Import direct d'une icône

```javascript
import { BoxIcon, CartIcon, SearchIcon } from '@equitech-dev/ui-library';

function MyComponent() {
  return (
    <div>
      <BoxIcon />
      <CartIcon />
      <SearchIcon />
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

  return IconComponent ? <IconComponent /> : <div>Chargement...</div>;
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

## Personnalisation

Les icônes SVG peuvent être stylisées avec CSS :

```css
.my-icon {
  width: 24px;
  height: 24px;
  fill: #007bff;
  stroke: none;
}
```
