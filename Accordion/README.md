# 🪗 Accordion - Panneaux Pliables

## 🎯 Objectif
Composant pour organiser le contenu en sections pliables, permettant de réduire l'encombrement visuel tout en gardant l'information accessible.

## 📋 API

### Props
```typescript
interface AccordionProps {
  items: AccordionItem[];
  variant?: 'default' | 'bordered' | 'separated';
  size?: 'default' | 'compact' | 'large';
  allowMultiple?: boolean;
  onItemToggle?: (index: number, isExpanded: boolean, expandedItems: number[]) => void;
  className?: string;
  style?: React.CSSProperties;
}

interface AccordionItem {
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
  variant?: 'default' | 'error' | 'success' | 'warning';
  className?: string;
}
```

## 🚀 Utilisation

### Exemple de base
```jsx
import Accordion from '@equitech-dev/ui-library/Accordion';

const accordionItems = [
  {
    title: 'Section 1',
    content: 'Contenu de la première section...'
  },
  {
    title: 'Section 2',
    content: 'Contenu de la deuxième section...'
  },
  {
    title: 'Section 3',
    content: 'Contenu de la troisième section...'
  }
];

<Accordion items={accordionItems} />
```

### Avec contenu complexe
```jsx
const complexItems = [
  {
    title: 'Informations Produit',
    content: (
      <div>
        <p>Description détaillée du produit...</p>
        <ul>
          <li>Caractéristique 1</li>
          <li>Caractéristique 2</li>
        </ul>
      </div>
    )
  },
  {
    title: 'Prix et Stock',
    content: (
      <div>
        <p>Prix: 29.99€</p>
        <p>Stock disponible: 15 unités</p>
      </div>
    )
  }
];

<Accordion items={complexItems} />
```

### Variantes d'affichage
```jsx
// Avec bordures séparées
<Accordion items={accordionItems} variant="separated" />

// Compact
<Accordion items={accordionItems} size="compact" />

// Large
<Accordion items={accordionItems} size="large" />
```

### États spéciaux
```jsx
const itemsWithStates = [
  {
    title: 'Succès',
    content: 'Opération réussie',
    variant: 'success'
  },
  {
    title: 'Erreur',
    content: 'Une erreur est survenue',
    variant: 'error'
  },
  {
    title: 'Désactivé',
    content: 'Cette section est désactivée',
    disabled: true
  }
];

<Accordion items={itemsWithStates} />
```

### Gestion des événements
```jsx
const handleItemToggle = (index, isExpanded, expandedItems) => {
  console.log(`Section ${index} ${isExpanded ? 'ouverte' : 'fermée'}`);
  console.log('Sections ouvertes:', expandedItems);
};

<Accordion 
  items={accordionItems} 
  allowMultiple={true}
  onItemToggle={handleItemToggle}
/>
```

## 🔧 Configuration

### Variantes disponibles
- **default** : Style standard avec bordures
- **bordered** : Bordures plus marquées
- **separated** : Chaque section séparée individuellement

### Tailles disponibles
- **default** : Taille normale
- **compact** : Version réduite
- **large** : Version agrandie

### États spéciaux
- **error** : Bordure rouge pour les erreurs
- **success** : Bordure verte pour les succès
- **warning** : Bordure orange pour les avertissements
- **disabled** : Section non cliquable

### Accessibilité
- Support de la navigation au clavier (Enter, Espace)
- Attributs ARIA appropriés (`aria-expanded`, `aria-disabled`)
- Structure sémantique avec `<h3>` pour les titres

### Responsive
- Adaptation automatique sur mobile
- Réduction des espacements et tailles
- Optimisation pour les écrans tactiles

## 🎨 Styles

### Classes CSS
- `.ui-accordion` : Conteneur principal
- `.ui-accordion-item` : Élément individuel
- `.ui-accordion-header` : En-tête cliquable
- `.ui-accordion-title` : Titre de la section
- `.ui-accordion-icon` : Icône de toggle
- `.ui-accordion-content` : Conteneur du contenu
- `.ui-accordion-body` : Corps du contenu

### États
- **Hover** : Changement de background sur l'en-tête
- **Focus** : Outline visible pour l'accessibilité
- **Expanded** : Rotation de l'icône et affichage du contenu
- **Disabled** : Opacité réduite et curseur interdit

## 🐛 Troubleshooting

### Problèmes courants
1. **Contenu coupé** : Vérifiez que le contenu n'a pas de hauteur fixe
2. **Animations saccadées** : Assurez-vous que le contenu a une hauteur définie
3. **Styles manquants** : Importez le fichier SCSS du composant

### Bonnes pratiques
- Limitez le nombre d'éléments à 10 maximum
- Utilisez des titres courts et descriptifs
- Évitez le contenu trop long dans une section
- Testez l'accessibilité avec un lecteur d'écran
