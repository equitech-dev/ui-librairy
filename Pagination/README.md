# 📄 Pagination

Navigation entre pages avec indicateurs visuels et contrôles de navigation intuitifs.

## 📋 Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `currentPage` | `number` | `1` | Page actuellement affichée |
| `totalPages` | `number` | `1` | Nombre total de pages |
| `onPageChange` | `function` | - | Callback appelé lors du changement de page |
| `showInfo` | `boolean` | `true` | Afficher l'information "Page X sur Y" |
| `showPrevNext` | `boolean` | `true` | Afficher les boutons précédent/suivant |
| `maxVisiblePages` | `number` | `5` | Nombre maximum de pages visibles |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `aria-label` | `string` | `'Navigation des pages'` | Label pour l'accessibilité |

## 🚀 Exemple d'utilisation

```jsx
import { Pagination } from '@equitech/ui-library';
import { useState } from 'react';

function MonComposant() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 25;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Ici vous pouvez charger les données de la nouvelle page
    console.log(`Changement vers la page ${newPage}`);
  };

  return (
    <div>
      {/* Pagination simple */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      
      {/* Pagination sans information */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        showInfo={false}
      />
      
      {/* Pagination avec moins de pages visibles */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        maxVisiblePages={3}
      />
      
      {/* Pagination personnalisée */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        className="custom-pagination"
        aria-label="Navigation des résultats de recherche"
      />
    </div>
  );
}

// Utilisation avec une liste de données
function ListeAvecPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const itemsPerPage = 10;
  const totalItems = 250;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const loadPageData = (page) => {
    // Simulation du chargement des données
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Ici vous feriez un appel API
    console.log(`Chargement des éléments ${startIndex} à ${endIndex}`);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    loadPageData(newPage);
  };

  return (
    <div>
      {/* Liste des éléments */}
      <div className="ui-list">
        {items.map((item, index) => (
          <div key={index} className="ui-list-item">
            {item.name}
          </div>
        ))}
      </div>
      
      {/* Pagination en bas */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
```

## ♿ Accessibilité

- **Navigation clavier** : Support complet de la navigation avec Tab et Arrow keys
- **Focus visible** : Indicateur de focus clair sur tous les boutons
- **Support des lecteurs d'écran** : Compatible avec les technologies d'assistance
- **Attributs ARIA** : Rôles et labels appropriés pour la navigation
- **États désactivés** : Gestion appropriée des boutons désactivés

## 🎨 Personnalisation

La pagination utilise les classes CSS suivantes pour la personnalisation :

```scss
// Classes principales
.ui-pagination { /* Conteneur principal */ }
.ui-pagination-info { /* Information "Page X sur Y" */ }
.ui-pagination-list { /* Liste des boutons de page */ }
.ui-pagination-item { /* Bouton de page individuel */ }
.ui-pagination-prev { /* Bouton précédent */ }
.ui-pagination-next { /* Bouton suivant */ }

// États
.ui-pagination-item.active { /* Page actuelle */ }
.ui-pagination-item:hover { /* État hover */ }
.ui-pagination-item:focus { /* État focus */ }
.ui-pagination-item:disabled { /* État désactivé */ }

// Exemple de personnalisation
.ui-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
  
  .ui-pagination-info {
    color: #6b7280;
    font-size: 0.875rem;
  }
  
  .ui-pagination-list {
    display: flex;
    gap: 0.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .ui-pagination-item {
    padding: 0.5rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background: white;
    color: #374151;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background: #f9fafb;
      border-color: #9ca3af;
    }
    
    &.active {
      background: #2BA985;
      color: white;
      border-color: #2BA985;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
```

## 📱 Responsive

La pagination s'adapte automatiquement aux différentes tailles d'écran :
- **Mobile** : Boutons plus grands pour faciliter le toucher
- **Tablette/Desktop** : Espacement et taille optimaux pour la navigation

### Classes utilitaires pour le responsive

```scss
// Masquer l'information sur mobile
@media screen and (max-width: 768px) {
  .ui-pagination-info {
    display: none;
  }
  
  .ui-pagination-item {
    min-width: 44px; // Taille minimale pour le toucher
  }
}
```

## 🔧 Fonctionnalités

- **Navigation intuitive** : Boutons précédent/suivant avec états désactivés
- **Indicateurs visuels** : Page actuelle clairement identifiée
- **Gestion des grandes listes** : Affichage intelligent avec ellipsis
- **Accessibilité complète** : Support clavier et lecteurs d'écran
- **Personnalisation flexible** : Classes CSS modulaires
- **Performance optimisée** : Rendu efficace même avec beaucoup de pages

## 🎯 Cas d'usage

### Pagination de liste simple
```jsx
<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => console.log(`Page ${page}`)}
/>
```

### Pagination avec chargement de données
```jsx
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
  showInfo={true}
  maxVisiblePages={7}
/>
```

### Pagination compacte
```jsx
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
  showInfo={false}
  maxVisiblePages={3}
/>
```

### Pagination avec personnalisation
```jsx
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
  className="ui-pagination-compact"
  aria-label="Navigation des résultats"
/>
```

## 📊 Gestion des états

### États des boutons
- **Actif** : Page actuellement affichée
- **Hover** : Effet visuel au survol
- **Focus** : Indicateur de focus pour l'accessibilité
- **Désactivé** : Boutons précédent/suivant aux extrémités

### Logique d'affichage
- **Pages visibles** : Affichage intelligent autour de la page actuelle
- **Ellipsis** : Indication des pages masquées
- **Limites** : Gestion des cas aux extrémités
