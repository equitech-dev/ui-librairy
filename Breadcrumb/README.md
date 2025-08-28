# 🍞 Breadcrumb - Fil d'Ariane

## 🎯 Objectif
Composant de navigation permettant d'afficher le chemin de navigation actuel et de naviguer vers les niveaux supérieurs.

## 📋 API

### Props
```typescript
interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: 'default' | 'compact' | 'large';
  onItemClick?: (href: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}
```

## 🚀 Utilisation

### Exemple de base
```jsx
import Breadcrumb from '@equitech-dev/ui-library/Breadcrumb';

const breadcrumbItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Produits', href: '/products' },
  { label: 'Électronique', href: '/products/electronics' },
  { label: 'Smartphones' } // Dernier élément (actif par défaut)
];

<Breadcrumb items={breadcrumbItems} />
```

### Avec gestion des clics
```jsx
const handleBreadcrumbClick = (href) => {
  console.log('Navigation vers:', href);
  // Logique de navigation
};

<Breadcrumb 
  items={breadcrumbItems} 
  onItemClick={handleBreadcrumbClick}
/>
```

### Variantes d'affichage
```jsx
// Compact
<Breadcrumb items={breadcrumbItems} variant="compact" />

// Large
<Breadcrumb items={breadcrumbItems} variant="large" />
```

## 🔧 Configuration

### Variantes disponibles
- **default** : Taille normale avec padding standard
- **compact** : Version réduite avec moins d'espacement
- **large** : Version agrandie pour les interfaces importantes

### Accessibilité
- Utilise la sémantique HTML `<nav>` et `<ol>`
- Attribut `aria-label="Fil d'Ariane"` sur le conteneur
- Attribut `aria-current="page"` sur l'élément actif
- Support de la navigation au clavier

### Responsive
- Adaptation automatique sur mobile
- Réduction de la taille des icônes et du texte
- Espacement optimisé pour les écrans tactiles

## 🎨 Styles

### Classes CSS
- `.ui-breadcrumb` : Conteneur principal
- `.ui-breadcrumb-list` : Liste ordonnée
- `.ui-breadcrumb-item` : Élément individuel
- `.ui-breadcrumb-link` : Lien de navigation
- `.ui-breadcrumb-separator` : Séparateur entre les éléments

### États
- **Hover** : Changement de couleur et background subtil
- **Focus** : Outline visible pour l'accessibilité
- **Active** : Texte en gras, pas de lien

## 🐛 Troubleshooting

### Problèmes courants
1. **Aucun élément affiché** : Vérifiez que `items` n'est pas vide
2. **Séparateurs manquants** : Assurez-vous que les éléments ont des `href` valides
3. **Styles manquants** : Importez le fichier SCSS du composant

### Bonnes pratiques
- Limitez le nombre d'éléments à 5 maximum
- Utilisez des labels courts et descriptifs
- Évitez les URLs trop longues dans les `href`
