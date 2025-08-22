# 📑 Tabs

Organisation du contenu en onglets avec navigation claire et transitions fluides.

## 📋 Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `activeTab` | `number` | `0` | Index de l'onglet actuellement actif |
| `onTabChange` | `function` | - | Callback appelé lors du changement d'onglet |
| `tabs` | `Array<{id: string, label: string, icon?: string}>` | `[]` | Configuration des onglets |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation des onglets |
| `variant` | `'default' \| 'pills' \| 'underline'` | `'default'` | Style visuel des onglets |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `aria-label` | `string` | `'Navigation par onglets'` | Label pour l'accessibilité |

## 🚀 Exemple d'utilisation

```jsx
import { Tabs } from '@equitech/ui-library';
import { useState } from 'react';

function MonComposant() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 'profile', label: 'Profil', icon: '👤' },
    { id: 'settings', label: 'Paramètres', icon: '⚙️' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'security', label: 'Sécurité', icon: '🔒' }
  ];

  const handleTabChange = (index) => {
    setActiveTab(index);
    console.log(`Changement vers l'onglet: ${tabs[index].label}`);
  };

  return (
    <div>
      {/* Tabs simple */}
      <Tabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        tabs={tabs}
      >
        <div className="ui-tab-content">
          <div className="ui-tab-panel">
            <h3>Informations du profil</h3>
            <p>Contenu de l'onglet profil...</p>
          </div>
          <div className="ui-tab-panel">
            <h3>Paramètres de l'application</h3>
            <p>Contenu de l'onglet paramètres...</p>
          </div>
          <div className="ui-tab-panel">
            <h3>Centre de notifications</h3>
            <p>Contenu de l'onglet notifications...</p>
          </div>
          <div className="ui-tab-panel">
            <h3>Paramètres de sécurité</h3>
            <p>Contenu de l'onglet sécurité...</p>
          </div>
        </div>
      </Tabs>
      
      {/* Tabs avec variante pills */}
      <Tabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        tabs={tabs}
        variant="pills"
        className="ui-tabs-pills"
      >
        <div className="ui-tab-content">
          {/* Contenu des onglets */}
        </div>
      </Tabs>
      
      {/* Tabs verticaux */}
      <Tabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        tabs={tabs}
        orientation="vertical"
        className="ui-tabs-vertical"
      >
        <div className="ui-tab-content">
          {/* Contenu des onglets */}
        </div>
      </Tabs>
    </div>
  );
}

// Utilisation avec contenu dynamique
function TabsAvecContenuDynamique() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'reports', label: 'Rapports' }
  ];

  const tabContents = {
    overview: (
      <div>
        <h3>Vue d'ensemble</h3>
        <div className="ui-stats-grid">
          <div className="ui-stat-card">
            <h4>Utilisateurs actifs</h4>
            <p className="ui-stat-number">1,234</p>
          </div>
          <div className="ui-stat-card">
            <h4>Revenus</h4>
            <p className="ui-stat-number">€45,678</p>
          </div>
        </div>
      </div>
    ),
    analytics: (
      <div>
        <h3>Analytics</h3>
        <p>Graphiques et analyses détaillées...</p>
      </div>
    ),
    reports: (
      <div>
        <h3>Rapports</h3>
        <p>Génération et export de rapports...</p>
      </div>
    )
  };

  return (
    <Tabs
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabs={tabs}
    >
      <div className="ui-tab-content">
        {Object.values(tabContents).map((content, index) => (
          <div 
            key={index} 
            className={`ui-tab-panel ${activeTab === index ? 'active' : ''}`}
          >
            {content}
          </div>
        ))}
      </div>
    </Tabs>
  );
}
```

## ♿ Accessibilité

- **Navigation clavier** : Support complet avec Tab, Arrow keys et Enter/Space
- **Focus visible** : Indicateur de focus clair sur les onglets
- **Support des lecteurs d'écran** : Compatible avec les technologies d'assistance
- **Attributs ARIA** : Rôles `tablist`, `tab`, `tabpanel` appropriés
- **Gestion des états** : États actif, hover, focus et disabled

## 🎨 Personnalisation

Les tabs utilisent les classes CSS suivantes pour la personnalisation :

```scss
// Classes principales
.ui-tabs { /* Conteneur principal */ }
.ui-tab-list { /* Liste des onglets */ }
.ui-tab-button { /* Bouton d'onglet individuel */ }
.ui-tab-content { /* Conteneur du contenu */ }
.ui-tab-panel { /* Panneau de contenu */ }

// Variantes
.ui-tabs.pills .ui-tab-button { /* Style pills */ }
.ui-tabs.underline .ui-tab-button { /* Style underline */ }
.ui-tabs.vertical { /* Orientation verticale */ }

// États
.ui-tab-button.active { /* Onglet actif */ }
.ui-tab-button:hover { /* État hover */ }
.ui-tab-button:focus { /* État focus */ }
.ui-tab-panel.active { /* Panneau actif */ }

// Exemple de personnalisation
.ui-tabs {
  .ui-tab-list {
    display: flex;
    border-bottom: 2px solid #e5e7eb;
    margin-bottom: 1rem;
    
    &.vertical {
      flex-direction: column;
      border-bottom: none;
      border-right: 2px solid #e5e7eb;
      margin-bottom: 0;
      margin-right: 1rem;
    }
  }
  
  .ui-tab-button {
    padding: 0.75rem 1.5rem;
    border: none;
    background: transparent;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    
    &:hover {
      color: #374151;
      background: #f9fafb;
    }
    
    &.active {
      color: #2BA985;
      font-weight: 600;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 2px;
        background: #2BA985;
      }
    }
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(43, 169, 133, 0.1);
    }
  }
  
  // Variante pills
  &.pills .ui-tab-button {
    border-radius: 0.5rem;
    margin-right: 0.5rem;
    
    &.active {
      background: #2BA985;
      color: white;
      
      &::after {
        display: none;
      }
    }
  }
  
  // Variante underline
  &.underline .ui-tab-button {
    border-bottom: 2px solid transparent;
    
    &.active {
      border-bottom-color: #2BA985;
      
      &::after {
        display: none;
      }
    }
  }
}
```

## 📱 Responsive

Les tabs s'adaptent automatiquement aux différentes tailles d'écran :
- **Mobile** : Onglets empilés ou scrollables selon l'espace disponible
- **Tablette/Desktop** : Affichage horizontal ou vertical selon la configuration

### Classes utilitaires pour le responsive

```scss
// Tabs scrollables sur mobile
@media screen and (max-width: 768px) {
  .ui-tab-list {
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
  
  .ui-tab-button {
    white-space: nowrap;
    min-width: 120px;
  }
}

// Orientation verticale sur desktop
@media screen and (min-width: 1024px) {
  .ui-tabs.vertical {
    display: flex;
    
    .ui-tab-list {
      width: 200px;
      flex-shrink: 0;
    }
    
    .ui-tab-content {
      flex: 1;
    }
  }
}
```

## 🔧 Fonctionnalités

- **Navigation intuitive** : Changement d'onglet par clic ou clavier
- **Transitions fluides** : Animations CSS pour les changements d'état
- **Variantes multiples** : Styles default, pills, underline
- **Orientation flexible** : Horizontal ou vertical
- **Support des icônes** : Icônes dans les labels d'onglets
- **Accessibilité complète** : Support clavier et lecteurs d'écran
- **Performance optimisée** : Rendu conditionnel du contenu

## 🎯 Cas d'usage

### Tabs de navigation principale
```jsx
<Tabs
  activeTab={activeTab}
  onTabChange={setActiveTab}
  tabs={[
    { id: 'home', label: 'Accueil' },
    { id: 'products', label: 'Produits' },
    { id: 'about', label: 'À propos' }
  ]}
/>
```

### Tabs avec icônes
```jsx
<Tabs
  activeTab={activeTab}
  onTabChange={setActiveTab}
  tabs={[
    { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
    { id: 'users', label: 'Utilisateurs', icon: '👥' },
    { id: 'settings', label: 'Paramètres', icon: '⚙️' }
  ]}
/>
```

### Tabs en style pills
```jsx
<Tabs
  activeTab={activeTab}
  onTabChange={setActiveTab}
  tabs={tabs}
  variant="pills"
/>
```

### Tabs verticaux
```jsx
<Tabs
  activeTab={activeTab}
  onTabChange={setActiveTab}
  tabs={tabs}
  orientation="vertical"
/>
```

## 📊 Gestion des états

### États des onglets
- **Actif** : Onglet actuellement sélectionné
- **Hover** : Effet visuel au survol
- **Focus** : Indicateur de focus pour l'accessibilité
- **Disabled** : Onglet désactivé (optionnel)

### Transitions
- **Changement d'onglet** : Animation fluide du contenu
- **Indicateur actif** : Transition de la barre/background
- **Focus** : Animation de l'outline
