# List - Liste Interactive

Composant de liste interactive avec support pour la sélection, les actions contextuelles, les avatars, et le drag & drop.

## ✨ Fonctionnalités

- **Affichage flexible** : Titre, description, avatar, icône, métadonnées
- **Sélection multiple** : Sélection d'un ou plusieurs éléments
- **Actions contextuelles** : Boutons d'action sur chaque élément
- **Avatars et icônes** : Support pour images, initiales ou icônes SVG
- **Métadonnées** : Badges, texte et informations supplémentaires
- **Drag & Drop** : Déplacement d'éléments par glisser-déposer
- **États visuels** : Hover, focus, sélection, désactivé
- **Accessibilité** : Support complet ARIA et navigation clavier
- **Responsive** : Adaptation mobile et tablette

## 🚀 Utilisation

```jsx
import List from './List';

const listData = [
  {
    key: '1',
    title: 'Jean Dupont',
    description: 'Développeur Frontend',
    avatar: 'JD',
    meta: [
      { text: 'En ligne' },
      { badge: { text: 'Actif', variant: 'success' } }
    ],
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
];

function MyComponent() {
  const [selectedKeys, setSelectedKeys] = useState([]);

  return (
    <List
      data={listData}
      selectedKeys={selectedKeys}
      onSelect={(key, selected) => {
        setSelectedKeys(selected ? [...selectedKeys, key] : selectedKeys.filter(k => k !== key));
      }}
      onAction={(action, item) => {
        console.log(`Action ${action} sur ${item.title}`);
      }}
      showCheckbox={true}
      showActions={true}
    />
  );
}
```

## 📋 Props

### List

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `data` | `Array<ListItem>` | `[]` | Données de la liste |
| `selectedKeys` | `string[]` | `[]` | Clés des éléments sélectionnés |
| `onSelect` | `(key: string, selected: boolean) => void` | - | Callback de sélection |
| `onAction` | `(action: string, item: ListItem) => void` | - | Callback d'action |
| `showCheckbox` | `boolean` | `false` | Afficher les cases à cocher |
| `showActions` | `boolean` | `true` | Afficher les actions |
| `showDragHandle` | `boolean` | `false` | Afficher les poignées de drag |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du composant |
| `variant` | `'default' \| 'compact' \| 'spacious' \| 'bordered' \| 'elevated' \| 'striped'` | `'default'` | Style du composant |
| `emptyText` | `string` | `'Aucun élément'` | Texte d'état vide |
| `emptyDescription` | `string` | `'Aucun élément à afficher'` | Description d'état vide |
| `disabled` | `boolean` | `false` | Désactiver le composant |
| `loading` | `boolean` | `false` | État de chargement |
| `error` | `boolean` | `false` | État d'erreur |

### ListItem

| Prop | Type | Description |
|------|------|-------------|
| `key` | `string` | Identifiant unique de l'élément |
| `title` | `string` | Titre principal |
| `description` | `string` | Description secondaire |
| `avatar` | `string \| ReactNode` | Avatar (URL, initiales ou composant) |
| `icon` | `string \| ReactNode` | Icône (SVG path ou composant) |
| `meta` | `MetaItem[]` | Métadonnées et badges |
| `actions` | `Action[]` | Actions contextuelles |
| `disabled` | `boolean` | Désactiver l'élément |
| `draggable` | `boolean` | Permettre le drag & drop |

### MetaItem

| Prop | Type | Description |
|------|------|-------------|
| `text` | `string` | Texte simple |
| `badge` | `Badge` | Badge avec variante |

### Badge

| Prop | Type | Description |
|------|------|-------------|
| `text` | `string` | Texte du badge |
| `variant` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'error'` | Style du badge |

### Action

| Prop | Type | Description |
|------|------|-------------|
| `key` | `string` | Identifiant de l'action |
| `label` | `string` | Libellé de l'action |
| `icon` | `ReactNode` | Icône de l'action |

## 📝 Exemples

### Liste basique

```jsx
<List
  data={[
    { key: '1', title: 'Élément 1' },
    { key: '2', title: 'Élément 2' },
    { key: '3', title: 'Élément 3' }
  ]}
  onSelect={(key, selected) => console.log(key, selected)}
/>
```

### Avec avatars et descriptions

```jsx
<List
  data={[
    {
      key: '1',
      title: 'Marie Martin',
      description: 'Designer UI/UX',
      avatar: 'https://example.com/avatar1.jpg'
    },
    {
      key: '2',
      title: 'Pierre Durand',
      description: 'Développeur Backend',
      avatar: 'PD'
    }
  ]}
/>
```

### Avec métadonnées et badges

```jsx
<List
  data={[
    {
      key: '1',
      title: 'Projet Alpha',
      description: 'Application web moderne',
      meta: [
        { text: 'Il y a 2h' },
        { badge: { text: 'En cours', variant: 'primary' } },
        { badge: { text: 'Urgent', variant: 'warning' } }
      ]
    }
  ]}
/>
```

### Avec actions contextuelles

```jsx
<List
  data={[
    {
      key: '1',
      title: 'Document important',
      actions: [
        {
          key: 'edit',
          label: 'Modifier',
          icon: <EditIcon />
        },
        {
          key: 'share',
          label: 'Partager',
          icon: <ShareIcon />
        },
        {
          key: 'delete',
          label: 'Supprimer',
          icon: <DeleteIcon />
        }
      ]
    }
  ]}
  onAction={(action, item) => {
    if (action === 'edit') {
      // Logique de modification
    } else if (action === 'delete') {
      // Logique de suppression
    }
  }}
/>
```

### Sélection avec cases à cocher

```jsx
const [selectedKeys, setSelectedKeys] = useState([]);

<List
  data={listData}
  selectedKeys={selectedKeys}
  showCheckbox={true}
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
<List data={data} variant="compact" size="sm" />

// Spacieux avec bordure
<List data={data} variant="spacious" size="lg" />

// Élevé avec ombre
<List data={data} variant="elevated" />

// Avec rayures
<List data={data} variant="striped" />
```

### États

```jsx
// Chargement
<List data={data} loading={true} />

// Erreur
<List data={data} error={true} />

// Désactivé
<List data={data} disabled={true} />

// État vide
<List data={[]} emptyText="Aucun utilisateur" emptyDescription="Aucun utilisateur trouvé" />
```

## 🎯 Cas d'usage

### Liste d'utilisateurs
```jsx
const usersData = [
  {
    key: 'user1',
    title: 'Alice Johnson',
    description: 'alice@example.com',
    avatar: 'AJ',
    meta: [
      { text: 'Administrateur' },
      { badge: { text: 'En ligne', variant: 'success' } }
    ],
    actions: [
      { key: 'edit', label: 'Modifier', icon: <EditIcon /> },
      { key: 'delete', label: 'Supprimer', icon: <DeleteIcon /> }
    ]
  }
];
```

### Liste de fichiers
```jsx
const filesData = [
  {
    key: 'file1',
    title: 'document.pdf',
    description: 'Document de présentation',
    icon: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6z',
    meta: [
      { text: '2.5 MB' },
      { text: 'Il y a 1h' }
    ]
  }
];
```

### Liste de notifications
```jsx
const notificationsData = [
  {
    key: 'notif1',
    title: 'Nouveau message',
    description: 'Vous avez reçu un nouveau message de Jean',
    meta: [
      { badge: { text: 'Nouveau', variant: 'primary' } },
      { text: 'Il y a 5min' }
    ],
    actions: [
      { key: 'mark-read', label: 'Marquer comme lu', icon: <CheckIcon /> }
    ]
  }
];
```

## ♿ Accessibilité

- **Rôles ARIA** : `list`, `listitem`, `checkbox`
- **Attributs** : `aria-selected`, `aria-checked`, `aria-label`
- **Navigation clavier** : Tab, Espace, Entrée
- **Focus visible** : Indicateurs de focus clairs
- **Écrans de lecture** : Support complet

## 🎨 Personnalisation

### Variables CSS

```scss
:root {
  --list-item-padding: var(--spacing-3) var(--spacing-4);
  --list-item-min-height: 48px;
  --list-avatar-size: 40px;
  --list-icon-size: 24px;
  --list-action-size: 32px;
}
```

### Classes CSS

- `.ui-list` - Conteneur principal
- `.ui-list__item` - Élément de la liste
- `.ui-list__avatar` - Avatar de l'élément
- `.ui-list__icon` - Icône de l'élément
- `.ui-list__content` - Contenu principal
- `.ui-list__title` - Titre de l'élément
- `.ui-list__description` - Description de l'élément
- `.ui-list__meta` - Métadonnées
- `.ui-list__badge` - Badge
- `.ui-list__actions` - Zone des actions
- `.ui-list__action` - Bouton d'action
- `.ui-list__checkbox` - Case à cocher
- `.ui-list__drag-handle` - Poignée de drag
- `.ui-list__empty` - État vide

## 🔧 Développement

### Structure des données

```typescript
interface ListItem {
  key: string;
  title: string;
  description?: string;
  avatar?: string | ReactNode;
  icon?: string | ReactNode;
  meta?: MetaItem[];
  actions?: Action[];
  disabled?: boolean;
  draggable?: boolean;
}

interface MetaItem {
  text?: string;
  badge?: Badge;
}

interface Badge {
  text: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
}

interface Action {
  key: string;
  label: string;
  icon: ReactNode;
}
```

### Gestion des événements

- **Sélection** : Gestion de la sélection simple/multiple
- **Actions** : Exécution des actions contextuelles
- **Drag & Drop** : Déplacement d'éléments (à implémenter)

### Performance

- **Rendu optimisé** : Utilisation de `useCallback`
- **Virtualisation** : Support pour de grandes listes
- **Lazy loading** : Chargement à la demande des avatars


