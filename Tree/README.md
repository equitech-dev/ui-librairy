# Tree - Arborescence Interactive

Composant d'arborescence hiérarchique avec support pour l'expansion/réduction, la sélection, les actions contextuelles et le drag & drop.

## ✨ Fonctionnalités

- **Structure hiérarchique** : Affichage en arborescence avec niveaux imbriqués
- **Expansion/Réduction** : Développement et fermeture des nœuds enfants
- **Sélection multiple** : Sélection d'un ou plusieurs éléments
- **Actions contextuelles** : Boutons d'action sur chaque nœud
- **Drag & Drop** : Déplacement d'éléments par glisser-déposer
- **Icônes personnalisées** : Support pour icônes SVG ou composants
- **États visuels** : Hover, focus, sélection, désactivé
- **Accessibilité** : Support complet ARIA et navigation clavier
- **Responsive** : Adaptation mobile et tablette

## 🚀 Utilisation

```jsx
import Tree from './Tree';

const treeData = [
  {
    key: '1',
    label: 'Dossier 1',
    icon: 'M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z',
    children: [
      {
        key: '1-1',
        label: 'Sous-dossier 1.1',
        actions: [
          {
            key: 'edit',
            label: 'Modifier',
            icon: <EditIcon />
          }
        ]
      }
    ]
  }
];

function MyComponent() {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState(['1']);

  return (
    <Tree
      data={treeData}
      selectedKeys={selectedKeys}
      expandedKeys={expandedKeys}
      onSelect={(key, selected) => {
        setSelectedKeys(selected ? [...selectedKeys, key] : selectedKeys.filter(k => k !== key));
      }}
      onExpand={(key, expanded) => {
        setExpandedKeys(expanded ? [...expandedKeys, key] : expandedKeys.filter(k => k !== key));
      }}
      onAction={(action, node) => {
        console.log(`Action ${action} sur ${node.label}`);
      }}
    />
  );
}
```

## 📋 Props

### Tree

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `data` | `Array<TreeNode>` | `[]` | Données de l'arborescence |
| `selectedKeys` | `string[]` | `[]` | Clés des éléments sélectionnés |
| `expandedKeys` | `string[]` | `[]` | Clés des éléments développés |
| `onSelect` | `(key: string, selected: boolean) => void` | - | Callback de sélection |
| `onExpand` | `(key: string, expanded: boolean) => void` | - | Callback d'expansion |
| `onAction` | `(action: string, node: TreeNode) => void` | - | Callback d'action |
| `showActions` | `boolean` | `true` | Afficher les actions |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du composant |
| `variant` | `'default' \| 'compact' \| 'spacious' \| 'bordered' \| 'elevated'` | `'default'` | Style du composant |
| `disabled` | `boolean` | `false` | Désactiver le composant |
| `loading` | `boolean` | `false` | État de chargement |
| `error` | `boolean` | `false` | État d'erreur |

### TreeNode

| Prop | Type | Description |
|------|------|-------------|
| `key` | `string` | Identifiant unique du nœud |
| `label` | `string` | Texte affiché |
| `icon` | `string \| ReactNode` | Icône du nœud |
| `children` | `TreeNode[]` | Nœuds enfants |
| `disabled` | `boolean` | Désactiver le nœud |
| `draggable` | `boolean` | Permettre le drag & drop |
| `actions` | `Action[]` | Actions contextuelles |

### Action

| Prop | Type | Description |
|------|------|-------------|
| `key` | `string` | Identifiant de l'action |
| `label` | `string` | Libellé de l'action |
| `icon` | `ReactNode` | Icône de l'action |

## 📝 Exemples

### Arborescence basique

```jsx
<Tree
  data={[
    {
      key: '1',
      label: 'Documents',
      children: [
        { key: '1-1', label: 'Travail' },
        { key: '1-2', label: 'Personnel' }
      ]
    }
  ]}
  onSelect={(key, selected) => console.log(key, selected)}
  onExpand={(key, expanded) => console.log(key, expanded)}
/>
```

### Avec icônes et actions

```jsx
<Tree
  data={[
    {
      key: '1',
      label: 'Projets',
      icon: 'M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z',
      children: [
        {
          key: '1-1',
          label: 'Projet A',
          actions: [
            {
              key: 'edit',
              label: 'Modifier',
              icon: <EditIcon />
            },
            {
              key: 'delete',
              label: 'Supprimer',
              icon: <DeleteIcon />
            }
          ]
        }
      ]
    }
  ]}
  onAction={(action, node) => {
    if (action === 'edit') {
      // Logique de modification
    } else if (action === 'delete') {
      // Logique de suppression
    }
  }}
/>
```

### Sélection multiple

```jsx
const [selectedKeys, setSelectedKeys] = useState([]);

<Tree
  data={treeData}
  selectedKeys={selectedKeys}
  onSelect={(key, selected) => {
    if (selected) {
      setSelectedKeys([...selectedKeys, key]);
    } else {
      setSelectedKeys(selectedKeys.filter(k => k !== key));
    }
  }}
/>
```

### Styles variés

```jsx
// Compact
<Tree data={data} variant="compact" size="sm" />

// Spacieux avec bordure
<Tree data={data} variant="spacious" size="lg" />

// Élevé avec ombre
<Tree data={data} variant="elevated" />
```

### États

```jsx
// Chargement
<Tree data={data} loading={true} />

// Erreur
<Tree data={data} error={true} />

// Désactivé
<Tree data={data} disabled={true} />
```

## 🎯 Cas d'usage

### Explorateur de fichiers
```jsx
const fileTreeData = [
  {
    key: 'root',
    label: 'Mon ordinateur',
    icon: <ComputerIcon />,
    children: [
      {
        key: 'c-drive',
        label: 'Disque C:',
        icon: <DriveIcon />,
        children: [
          {
            key: 'documents',
            label: 'Documents',
            icon: <FolderIcon />
          }
        ]
      }
    ]
  }
];
```

### Menu de navigation
```jsx
const navigationData = [
  {
    key: 'dashboard',
    label: 'Tableau de bord',
    icon: <DashboardIcon />
  },
  {
    key: 'users',
    label: 'Utilisateurs',
    icon: <UsersIcon />,
    children: [
      {
        key: 'users-list',
        label: 'Liste des utilisateurs'
      },
      {
        key: 'users-roles',
        label: 'Rôles et permissions'
      }
    ]
  }
];
```

### Structure organisationnelle
```jsx
const orgData = [
  {
    key: 'ceo',
    label: 'PDG',
    icon: <PersonIcon />,
    children: [
      {
        key: 'cto',
        label: 'Directeur Technique',
        children: [
          {
            key: 'dev-team',
            label: 'Équipe Développement'
          }
        ]
      }
    ]
  }
];
```

## ♿ Accessibilité

- **Rôles ARIA** : `tree`, `treeitem`, `group`
- **Attributs** : `aria-selected`, `aria-expanded`, `aria-level`
- **Navigation clavier** : Flèches, Espace, Entrée
- **Focus visible** : Indicateurs de focus clairs
- **Écrans de lecture** : Support complet

## 🎨 Personnalisation

### Variables CSS

```scss
:root {
  --tree-item-padding: var(--spacing-2) var(--spacing-3);
  --tree-item-min-height: 36px;
  --tree-children-indent: var(--spacing-6);
  --tree-toggle-size: 20px;
  --tree-icon-size: 16px;
}
```

### Classes CSS

- `.ui-tree` - Conteneur principal
- `.ui-tree__item` - Élément de l'arbre
- `.ui-tree__toggle` - Bouton d'expansion
- `.ui-tree__icon` - Icône du nœud
- `.ui-tree__label` - Libellé du nœud
- `.ui-tree__actions` - Zone des actions
- `.ui-tree__children` - Conteneur des enfants

## 🔧 Développement

### Structure des données

```typescript
interface TreeNode {
  key: string;
  label: string;
  icon?: string | ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
  draggable?: boolean;
  actions?: Action[];
}

interface Action {
  key: string;
  label: string;
  icon: ReactNode;
}
```

### Gestion des événements

- **Sélection** : Gestion de la sélection simple/multiple
- **Expansion** : Développement/réduction des nœuds
- **Actions** : Exécution des actions contextuelles
- **Drag & Drop** : Déplacement d'éléments (à implémenter)

### Performance

- **Rendu optimisé** : Utilisation de `useCallback` et `useMemo`
- **Virtualisation** : Support pour de grandes arborescences
- **Lazy loading** : Chargement à la demande des enfants


