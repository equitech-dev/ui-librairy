# Kanban - Tableau Kanban Interactif

Composant de tableau Kanban interactif avec support pour le drag & drop, la gestion des colonnes et cartes, et les actions contextuelles.

## ✨ Fonctionnalités

- **Drag & Drop** : Déplacement de cartes entre colonnes
- **Gestion des colonnes** : Ajout, modification, suppression de colonnes
- **Gestion des cartes** : Création, édition, suppression de cartes
- **Métadonnées** : Assignation, priorité, dates d'échéance
- **Actions contextuelles** : Menu d'actions sur chaque carte
- **Sélection** : Sélection de cartes pour actions groupées
- **Responsive** : Adaptation mobile et tablette
- **Accessibilité** : Support complet ARIA et navigation clavier

## 🚀 Utilisation

```jsx
import Kanban from './Kanban';

const columns = [
  { id: 'todo', title: 'À faire' },
  { id: 'in-progress', title: 'En cours' },
  { id: 'done', title: 'Terminé' }
];

const cards = [
  {
    id: '1',
    title: 'Créer la maquette',
    content: 'Designer l\'interface utilisateur',
    columnId: 'todo',
    assignee: 'JD',
    priority: 'high',
    dueDate: '2024-01-15'
  }
];

function MyComponent() {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <Kanban
      title="Projet Web"
      columns={columns}
      cards={cards}
      onCardDrop={(cardId, columnId) => {
        console.log(`Déplacer la carte ${cardId} vers ${columnId}`);
      }}
      onCardAction={(action, card) => {
        console.log(`Action ${action} sur la carte ${card.title}`);
      }}
      onCardSelect={setSelectedCard}
      selectedCard={selectedCard}
    />
  );
}
```

## 📋 Props

### Kanban

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `title` | `string` | `'Tableau Kanban'` | Titre du tableau |
| `columns` | `Column[]` | `[]` | Liste des colonnes |
| `cards` | `Card[]` | `[]` | Liste des cartes |
| `onCardDrop` | `(cardId: string, columnId: string) => void` | - | Callback de déplacement |
| `onCardAction` | `(action: string, card: Card) => void` | - | Callback d'action sur carte |
| `onCardSelect` | `(card: Card) => void` | - | Callback de sélection |
| `onColumnAction` | `(action: string, column: Column) => void` | - | Callback d'action sur colonne |
| `onAddColumn` | `() => void` | - | Callback d'ajout de colonne |
| `selectedCard` | `Card` | - | Carte sélectionnée |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du composant |
| `variant` | `'default' \| 'compact' \| 'spacious'` | `'default'` | Style du composant |
| `disabled` | `boolean` | `false` | Désactiver le composant |
| `loading` | `boolean` | `false` | État de chargement |
| `error` | `boolean` | `false` | État d'erreur |

### Column

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Identifiant unique de la colonne |
| `title` | `string` | Titre de la colonne |

### Card

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Identifiant unique de la carte |
| `title` | `string` | Titre de la carte |
| `content` | `string` | Contenu de la carte |
| `columnId` | `string` | ID de la colonne parente |
| `assignee` | `string \| ReactNode` | Assigné (initiales ou avatar) |
| `priority` | `'low' \| 'medium' \| 'high'` | Priorité de la carte |
| `dueDate` | `Date \| string` | Date d'échéance |

## 📝 Exemples

### Tableau Kanban basique

```jsx
const columns = [
  { id: 'todo', title: 'À faire' },
  { id: 'in-progress', title: 'En cours' },
  { id: 'done', title: 'Terminé' }
];

const cards = [
  {
    id: '1',
    title: 'Tâche 1',
    content: 'Description de la tâche',
    columnId: 'todo'
  }
];

<Kanban
  columns={columns}
  cards={cards}
  onCardDrop={(cardId, columnId) => {
    // Logique de déplacement
    console.log(`Déplacer ${cardId} vers ${columnId}`);
  }}
/>
```

### Avec métadonnées

```jsx
const cards = [
  {
    id: '1',
    title: 'Bug critique',
    content: 'Corriger le problème de connexion',
    columnId: 'in-progress',
    assignee: 'https://example.com/avatar.jpg',
    priority: 'high',
    dueDate: '2024-01-10'
  },
  {
    id: '2',
    title: 'Amélioration UI',
    content: 'Améliorer l\'interface utilisateur',
    columnId: 'todo',
    assignee: 'AM',
    priority: 'medium',
    dueDate: '2024-01-20'
  }
];

<Kanban
  columns={columns}
  cards={cards}
  onCardAction={(action, card) => {
    if (action === 'edit') {
      // Ouvrir modal d'édition
    } else if (action === 'delete') {
      // Confirmer suppression
    }
  }}
/>
```

### Gestion complète

```jsx
const [columns, setColumns] = useState(initialColumns);
const [cards, setCards] = useState(initialCards);

<Kanban
  columns={columns}
  cards={cards}
  onCardDrop={(cardId, columnId) => {
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, columnId } : card
    ));
  }}
  onCardAction={(action, card) => {
    if (action === 'delete') {
      setCards(prev => prev.filter(c => c.id !== card.id));
    }
  }}
  onColumnAction={(action, column) => {
    if (action === 'add-card') {
      // Ouvrir modal de création de carte
    }
  }}
  onAddColumn={() => {
    const newColumn = {
      id: `column-${Date.now()}`,
      title: 'Nouvelle colonne'
    };
    setColumns(prev => [...prev, newColumn]);
  }}
/>
```

### Styles variés

```jsx
// Compact
<Kanban variant="compact" size="sm" />

// Spacieux
<Kanban variant="spacious" size="lg" />

// Avec titre personnalisé
<Kanban title="Gestion de projet Agile" />
```

### États

```jsx
// Chargement
<Kanban loading={true} />

// Erreur
<Kanban error={true} />

// Désactivé
<Kanban disabled={true} />
```

## 🎯 Cas d'usage

### Gestion de projet
```jsx
const projectColumns = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'sprint', title: 'Sprint actuel' },
  { id: 'in-progress', title: 'En développement' },
  { id: 'review', title: 'En revue' },
  { id: 'done', title: 'Terminé' }
];

const projectCards = [
  {
    id: 'feature-1',
    title: 'Authentification OAuth',
    content: 'Implémenter l\'authentification avec Google et GitHub',
    columnId: 'in-progress',
    assignee: 'Dev1',
    priority: 'high',
    dueDate: '2024-01-15'
  }
];
```

### Gestion de tâches
```jsx
const taskColumns = [
  { id: 'new', title: 'Nouvelles' },
  { id: 'assigned', title: 'Assignées' },
  { id: 'working', title: 'En cours' },
  { id: 'testing', title: 'En test' },
  { id: 'completed', title: 'Complétées' }
];
```

### Workflow de contenu
```jsx
const contentColumns = [
  { id: 'draft', title: 'Brouillons' },
  { id: 'review', title: 'En révision' },
  { id: 'approved', title: 'Approuvés' },
  { id: 'published', title: 'Publiés' }
];
```

## ♿ Accessibilité

- **Rôles ARIA** : `application`, `region`, `button`
- **Attributs** : `aria-label`, `aria-selected`
- **Navigation clavier** : Tab, Espace, Entrée
- **Focus visible** : Indicateurs de focus clairs
- **Écrans de lecture** : Support complet

## 🎨 Personnalisation

### Variables CSS

```scss
:root {
  --kanban-padding: var(--spacing-4);
  --kanban-column-min-width: 300px;
  --kanban-column-max-width: 350px;
  --kanban-card-padding: var(--spacing-3);
  --kanban-card-min-height: 200px;
}
```

### Classes CSS

- `.ui-kanban` - Conteneur principal
- `.ui-kanban__header` - En-tête avec actions
- `.ui-kanban__title` - Titre du tableau
- `.ui-kanban__actions` - Zone des actions
- `.ui-kanban__board` - Zone du tableau
- `.ui-kanban__column` - Colonne
- `.ui-kanban__column-header` - En-tête de colonne
- `.ui-kanban__column-content` - Contenu de colonne
- `.ui-kanban__cards` - Liste des cartes
- `.ui-kanban__card` - Carte individuelle
- `.ui-kanban__card-header` - En-tête de carte
- `.ui-kanban__card-content` - Contenu de carte
- `.ui-kanban__card-footer` - Pied de carte
- `.ui-kanban__drop-zone` - Zone de drop
- `.ui-kanban__add-card` - Bouton d'ajout de carte
- `.ui-kanban__add-column` - Bouton d'ajout de colonne

## 🔧 Développement

### Structure des données

```typescript
interface KanbanColumn {
  id: string;
  title: string;
}

interface KanbanCard {
  id: string;
  title: string;
  content?: string;
  columnId: string;
  assignee?: string | ReactNode;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date | string;
}
```

### Gestion des événements

- **Drag & Drop** : Déplacement de cartes entre colonnes
- **Actions de carte** : Édition, suppression, assignation
- **Actions de colonne** : Ajout de cartes, modification
- **Sélection** : Sélection de cartes pour actions groupées

### Performance

- **Rendu optimisé** : Utilisation de `useCallback`
- **Filtrage efficace** : Cartes filtrées par colonne
- **Drag & Drop** : Gestion native du HTML5 Drag API


