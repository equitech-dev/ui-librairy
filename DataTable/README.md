# 📊 DataTable

Tableaux de données avancés avec tri, recherche, pagination et actions intégrées.

## 📋 Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `data` | `Array<Object>` | `[]` | Données à afficher |
| `columns` | `Array<Column>` | `[]` | Configuration des colonnes |
| `title` | `string` | - | Titre du tableau |
| `searchable` | `boolean` | `true` | Activer la recherche |
| `sortable` | `boolean` | `true` | Activer le tri |
| `pagination` | `boolean` | `true` | Activer la pagination |
| `itemsPerPage` | `number` | `10` | Nombre d'éléments par page |
| `variant` | `'default' \| 'striped' \| 'bordered'` | `'default'` | Style du tableau |
| `loading` | `boolean` | `false` | État de chargement |
| `onRowClick` | `function` | - | Callback lors du clic sur une ligne |
| `onAction` | `function` | - | Callback lors d'une action |
| `className` | `string` | `''` | Classes CSS additionnelles |

## 🚀 Exemple d'utilisation

```jsx
import { DataTable } from '@equitech/ui-library';
import { useState } from 'react';

function MonComposant() {
  const [data, setData] = useState([
    { id: 1, name: 'Jean Dupont', email: 'jean@example.com', role: 'Admin', status: 'Actif' },
    { id: 2, name: 'Marie Martin', email: 'marie@example.com', role: 'User', status: 'Inactif' },
    { id: 3, name: 'Pierre Durand', email: 'pierre@example.com', role: 'Manager', status: 'Actif' },
    { id: 4, name: 'Sophie Bernard', email: 'sophie@example.com', role: 'User', status: 'Actif' },
    { id: 5, name: 'Lucas Petit', email: 'lucas@example.com', role: 'Admin', status: 'Inactif' }
  ]);

  const columns = [
    { 
      key: 'name', 
      label: 'Nom', 
      sortable: true,
      render: (value, row) => (
        <div className="ui-user-info">
          <div className="ui-avatar">{value.charAt(0)}</div>
          <span>{value}</span>
        </div>
      )
    },
    { 
      key: 'email', 
      label: 'Email', 
      sortable: true 
    },
    { 
      key: 'role', 
      label: 'Rôle', 
      sortable: true,
      render: (value) => (
        <span className={`ui-badge ui-badge-${value.toLowerCase()}`}>
          {value}
        </span>
      )
    },
    { 
      key: 'status', 
      label: 'Statut', 
      sortable: true,
      render: (value) => (
        <span className={`ui-status ui-status-${value.toLowerCase()}`}>
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (value, row) => (
        <div className="ui-actions">
          <button 
            className="ui-button-icon"
            onClick={() => handleEdit(row)}
            aria-label="Modifier"
          >
            <div className="ui-icon-edit"></div>
          </button>
          <button 
            className="ui-button-icon"
            onClick={() => handleDelete(row)}
            aria-label="Supprimer"
          >
            <div className="ui-icon-trash"></div>
          </button>
        </div>
      )
    }
  ];

  const handleEdit = (row) => {
    console.log('Modifier:', row);
  };

  const handleDelete = (row) => {
    console.log('Supprimer:', row);
  };

  const handleRowClick = (row) => {
    console.log('Clic sur la ligne:', row);
  };

  return (
    <div>
      {/* DataTable simple */}
      <DataTable
        data={data}
        columns={columns}
        title="Liste des utilisateurs"
        onRowClick={handleRowClick}
      />
      
      {/* DataTable avec variante striped */}
      <DataTable
        data={data}
        columns={columns}
        title="Utilisateurs (striped)"
        variant="striped"
        searchable={false}
      />
      
      {/* DataTable avec variante bordered */}
      <DataTable
        data={data}
        columns={columns}
        title="Utilisateurs (bordered)"
        variant="bordered"
        itemsPerPage={5}
      />
      
      {/* DataTable en mode chargement */}
      <DataTable
        data={[]}
        columns={columns}
        title="Chargement..."
        loading={true}
      />
    </div>
  );
}

// Utilisation avec données dynamiques
function DataTableAvecAPI() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'title', label: 'Titre', sortable: true },
    { key: 'category', label: 'Catégorie', sortable: true },
    { key: 'price', label: 'Prix', sortable: true, render: (value) => `€${value}` },
    { key: 'stock', label: 'Stock', sortable: true },
    {
      key: 'actions',
      label: 'Actions',
      render: (value, row) => (
        <div className="ui-actions">
          <button className="ui-button small primary">Voir</button>
          <button className="ui-button small secondary">Modifier</button>
        </div>
      )
    }
  ];

  // Simulation d'un appel API
  const fetchData = async (page = 1, search = '', sortBy = '', sortOrder = '') => {
    setLoading(true);
    
    // Simulation d'un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulation de données
    const mockData = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      title: `Produit ${i + 1}`,
      category: ['Électronique', 'Vêtements', 'Livres', 'Sport'][i % 4],
      price: Math.floor(Math.random() * 1000) + 10,
      stock: Math.floor(Math.random() * 100)
    }));
    
    setData(mockData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataTable
      data={data}
      columns={columns}
      title="Catalogue de produits"
      loading={loading}
      variant="striped"
      onRowClick={(row) => console.log('Produit sélectionné:', row)}
    />
  );
}

// Utilisation avec filtres personnalisés
function DataTableAvecFiltres() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all'
  });

  const columns = [
    { key: 'name', label: 'Nom', sortable: true },
    { key: 'category', label: 'Catégorie', sortable: true },
    { key: 'status', label: 'Statut', sortable: true },
    { key: 'createdAt', label: 'Créé le', sortable: true, render: (value) => new Date(value).toLocaleDateString() }
  ];

  const filteredData = data.filter(item => {
    if (filters.status !== 'all' && item.status !== filters.status) return false;
    if (filters.category !== 'all' && item.category !== filters.category) return false;
    return true;
  });

  return (
    <div>
      {/* Filtres personnalisés */}
      <div className="ui-filters">
        <select 
          value={filters.status} 
          onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          className="ui-select"
        >
          <option value="all">Tous les statuts</option>
          <option value="active">Actif</option>
          <option value="inactive">Inactif</option>
        </select>
        
        <select 
          value={filters.category} 
          onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          className="ui-select"
        >
          <option value="all">Toutes les catégories</option>
          <option value="tech">Technologie</option>
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>
      
      <DataTable
        data={filteredData}
        columns={columns}
        title="Données filtrées"
        variant="bordered"
      />
    </div>
  );
}
```

## ♿ Accessibilité

- **Navigation clavier** : Support complet avec Tab, Arrow keys et Enter
- **Focus visible** : Indicateur de focus clair sur tous les éléments interactifs
- **Support des lecteurs d'écran** : Compatible avec les technologies d'assistance
- **Attributs ARIA** : Rôles `table`, `row`, `cell` appropriés
- **Tri accessible** : Indicateurs de tri et annonces pour les lecteurs d'écran
- **Pagination accessible** : Navigation claire entre les pages

## 🎨 Personnalisation

Le DataTable utilise les classes CSS suivantes pour la personnalisation :

```scss
// Classes principales
.ui-datatable { /* Conteneur principal */ }
.ui-datatable-header { /* En-tête avec titre et recherche */ }
.ui-datatable-title { /* Titre du tableau */ }
.ui-datatable-search { /* Zone de recherche */ }
.ui-datatable-table { /* Tableau HTML */ }
.ui-datatable-footer { /* Pied de page avec pagination */ }

// Variantes
.ui-datatable.striped .ui-datatable-table tr:nth-child(even) { /* Lignes alternées */ }
.ui-datatable.bordered .ui-datatable-table { /* Bordures complètes */ }

// États
.ui-datatable.loading { /* État de chargement */ }
.ui-datatable-table th.sortable { /* En-tête triable */ }
.ui-datatable-table th.sorted { /* En-tête trié */ }
.ui-datatable-table tr:hover { /* Ligne au survol */ }

// Exemple de personnalisation
.ui-datatable {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  .ui-datatable-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    
    .ui-datatable-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #374151;
      margin: 0;
    }
    
    .ui-datatable-search {
      position: relative;
      
      input {
        padding: 0.5rem 1rem;
        padding-left: 2.5rem;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        width: 250px;
        
        &:focus {
          outline: none;
          border-color: #2BA985;
          box-shadow: 0 0 0 3px rgba(43, 169, 133, 0.1);
        }
      }
      
      .ui-icon-search {
        position: absolute;
        left: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        color: #6b7280;
      }
    }
  }
  
  .ui-datatable-table {
    width: 100%;
    border-collapse: collapse;
    
    th {
      background: #f9fafb;
      padding: 0.75rem 1rem;
      text-align: left;
      font-weight: 600;
      color: #374151;
      border-bottom: 1px solid #e5e7eb;
      
      &.sortable {
        cursor: pointer;
        user-select: none;
        
        &:hover {
          background: #f3f4f6;
        }
        
        &::after {
          content: '↕';
          margin-left: 0.5rem;
          opacity: 0.5;
        }
        
        &.sorted-asc::after {
          content: '↑';
          opacity: 1;
        }
        
        &.sorted-desc::after {
          content: '↓';
          opacity: 1;
        }
      }
    }
    
    td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #f3f4f6;
      color: #374151;
    }
    
    tr {
      transition: background-color 0.2s ease;
      
      &:hover {
        background: #f9fafb;
      }
      
      &.clickable {
        cursor: pointer;
      }
    }
  }
  
  // Variante striped
  &.striped .ui-datatable-table tr:nth-child(even) {
    background: #f9fafb;
    
    &:hover {
      background: #f3f4f6;
    }
  }
  
  // Variante bordered
  &.bordered .ui-datatable-table {
    border: 1px solid #e5e7eb;
    
    th, td {
      border: 1px solid #e5e7eb;
    }
  }
  
  .ui-datatable-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    border-top: 1px solid #e5e7eb;
    background: #f9fafb;
    
    .ui-datatable-info {
      color: #6b7280;
      font-size: 0.875rem;
    }
  }
  
  // État de chargement
  &.loading {
    .ui-datatable-table {
      opacity: 0.6;
      pointer-events: none;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 2rem;
      height: 2rem;
      border: 2px solid #e5e7eb;
      border-top-color: #2BA985;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }
}

@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
```

## 📱 Responsive

Le DataTable s'adapte automatiquement aux différentes tailles d'écran :
- **Mobile** : Affichage en cartes ou tableau scrollable
- **Tablette/Desktop** : Affichage tabulaire complet

### Classes utilitaires pour le responsive

```scss
// Tableau scrollable sur mobile
@media screen and (max-width: 768px) {
  .ui-datatable {
    .ui-datatable-header {
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
      
      .ui-datatable-search input {
        width: 100%;
      }
    }
    
    .ui-datatable-table {
      display: block;
      overflow-x: auto;
      white-space: nowrap;
      
      th, td {
        min-width: 120px;
      }
    }
  }
}

// Affichage en cartes sur très petit écran
@media screen and (max-width: 480px) {
  .ui-datatable {
    .ui-datatable-table {
      display: none;
    }
    
    .ui-datatable-cards {
      display: block;
      
      .ui-datatable-card {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        padding: 1rem;
        margin-bottom: 1rem;
        
        .ui-datatable-card-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
```

## 🔧 Fonctionnalités

- **Tri intelligent** : Tri sur plusieurs colonnes avec indicateurs visuels
- **Recherche globale** : Recherche dans toutes les colonnes
- **Pagination intégrée** : Navigation entre les pages avec contrôle du nombre d'éléments
- **Actions personnalisées** : Boutons d'action par ligne
- **Variantes visuelles** : Styles default, striped, bordered
- **États de chargement** : Indicateur de chargement intégré
- **Accessibilité complète** : Support clavier et lecteurs d'écran
- **Performance optimisée** : Rendu efficace même avec beaucoup de données

## 🎯 Cas d'usage

### DataTable simple
```jsx
<DataTable
  data={users}
  columns={userColumns}
  title="Utilisateurs"
/>
```

### DataTable avec actions
```jsx
<DataTable
  data={products}
  columns={productColumns}
  title="Produits"
  onRowClick={handleProductClick}
  onAction={handleAction}
/>
```

### DataTable avec filtres
```jsx
<DataTable
  data={filteredData}
  columns={columns}
  title="Données filtrées"
  variant="striped"
  searchable={false}
/>
```

### DataTable en mode chargement
```jsx
<DataTable
  data={[]}
  columns={columns}
  title="Chargement..."
  loading={true}
/>
```

## 📊 Gestion des états

### États du DataTable
- **Vide** : Aucune donnée à afficher
- **Chargement** : Données en cours de chargement
- **Trié** : Colonne triée avec indicateur
- **Recherche** : Filtrage des données
- **Pagination** : Navigation entre les pages

### Interactions
- **Clic sur ligne** : Sélection ou navigation
- **Clic sur en-tête** : Tri de la colonne
- **Recherche** : Filtrage en temps réel
- **Actions** : Boutons d'action par ligne
