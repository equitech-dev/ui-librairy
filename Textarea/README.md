# 📄 Textarea

Zone de texte multi-lignes universelle, accessible et personnalisable pour la saisie de contenu long.

## 📋 Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `string` | - | Valeur contrôlée du champ |
| `onChange` | `function` | - | Callback appelé lors de la modification |
| `placeholder` | `string` | - | Texte d'aide affiché dans le champ |
| `rows` | `number` | `4` | Nombre de lignes visibles |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `disabled` | `boolean` | `false` | Désactive le champ |
| `aria-label` | `string` | - | Label pour l'accessibilité |

## 🚀 Exemple d'utilisation

```jsx
import { Textarea } from '@equitech/ui-library';
import { useState } from 'react';

function MonFormulaire() {
  const [message, setMessage] = useState('');
  const [description, setDescription] = useState('');

  return (
    <form>
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Votre message..."
        rows={6}
        aria-label="Zone de saisie du message"
      />
      
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description courte"
        rows={3}
        aria-label="Description du projet"
      />
      
      <Textarea
        placeholder="Commentaire (lecture seule)"
        disabled
        rows={4}
        aria-label="Commentaire (désactivé)"
      />
    </form>
  );
}
```

## ♿ Accessibilité

- **Support des attributs HTML natifs** : Tous les attributs d'accessibilité sont supportés
- **Redimensionnement** : L'utilisateur peut redimensionner la zone de texte
- **Focus visible** : Indicateur de focus clair et visible
- **Support des lecteurs d'écran** : Compatible avec les technologies d'assistance
- **Navigation clavier** : Support complet de la navigation

## 🎨 Personnalisation

Le textarea utilise la classe CSS `.textarea` pour la personnalisation :

```scss
// Exemple de personnalisation
.textarea {
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  line-height: 1.5;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &:disabled {
    background-color: #f9fafb;
    color: #6b7280;
    cursor: not-allowed;
    resize: none;
  }
}
```

## 📱 Responsive

Le textarea s'adapte automatiquement aux différentes tailles d'écran :
- **Mobile** : Taille de police adaptée et padding optimisé
- **Tablette/Desktop** : Espacement et taille optimaux pour la saisie

## 🔧 Fonctionnalités

- **Redimensionnement vertical** : L'utilisateur peut ajuster la hauteur
- **Scroll automatique** : Défilement automatique pour le contenu long
- **Support des caractères spéciaux** : Compatible avec tous les encodages
- **Validation native** : Support des attributs de validation HTML5 