# 📋 Select

Liste déroulante universelle, accessible et personnalisable pour la sélection d'options.

## 📋 Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `options` | `Array<{value: string, label: string}>` | `[]` | Liste des options disponibles |
| `value` | `string` | - | Valeur sélectionnée |
| `onChange` | `function` | - | Callback appelé lors de la sélection |
| `placeholder` | `string` | `'Sélectionner...'` | Texte affiché quand aucune option n'est sélectionnée |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `disabled` | `boolean` | `false` | Désactive la liste déroulante |
| `aria-label` | `string` | - | Label pour l'accessibilité |

## 🚀 Exemple d'utilisation

```jsx
import { Select } from '@equitech/ui-library';
import { useState } from 'react';

function MonFormulaire() {
  const [selectedCountry, setSelectedCountry] = useState('');
  
  const countries = [
    { value: 'fr', label: 'France' },
    { value: 'ca', label: 'Canada' },
    { value: 'be', label: 'Belgique' },
    { value: 'ch', label: 'Suisse' }
  ];

  return (
    <form>
      <Select
        options={countries}
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        placeholder="Choisissez votre pays"
        aria-label="Sélection du pays"
      />
      
      <Select
        options={[
          { value: 'small', label: 'Petit' },
          { value: 'medium', label: 'Moyen' },
          { value: 'large', label: 'Grand' }
        ]}
        disabled
        aria-label="Taille (désactivé)"
      />
    </form>
  );
}
```

## ♿ Accessibilité

- **Support des attributs HTML natifs** : Tous les attributs d'accessibilité sont supportés
- **Navigation clavier** : Support complet de la navigation avec les flèches
- **Focus visible** : Indicateur de focus clair et visible
- **Support des lecteurs d'écran** : Compatible avec les technologies d'assistance
- **Rôle `combobox`** : Identifie l'élément comme une liste déroulante

## 🎨 Personnalisation

Le select utilise la classe CSS `.select` pour la personnalisation :

```scss
// Exemple de personnalisation
.select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 40px;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &:disabled {
    background-color: #f9fafb;
    color: #6b7280;
    cursor: not-allowed;
  }
}
```

## 📱 Responsive

Le select s'adapte automatiquement aux différentes tailles d'écran :
- **Mobile** : Taille optimisée pour les écrans tactiles
- **Tablette/Desktop** : Espacement et taille optimaux pour la sélection

## 🔧 Structure des options

Chaque option doit avoir la structure suivante :
```javascript
{
  value: string,  // Valeur envoyée lors de la soumission
  label: string   // Texte affiché à l'utilisateur
}
``` 