# 🔘 RadioButton

Bouton radio universel, accessible et personnalisable pour les sélections uniques dans un groupe.

## 📋 Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `checked` | `boolean` | `false` | État du bouton radio |
| `onChange` | `function` | - | Callback appelé lors du changement |
| `label` | `string` | - | Texte du label associé |
| `name` | `string` | - | Nom du groupe radio (obligatoire) |
| `value` | `string` | - | Valeur du bouton radio |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `object` | `{}` | Styles inline additionnels |
| `disabled` | `boolean` | `false` | Désactive le bouton radio |
| `aria-label` | `string` | - | Label pour l'accessibilité |

## 🚀 Exemple d'utilisation

```jsx
import { RadioButton } from '@equitech/ui-library';
import { useState } from 'react';

function MonFormulaire() {
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  return (
    <form>
      {/* Groupe de boutons radio */}
      <fieldset>
        <legend>Genre</legend>
        <RadioButton
          checked={selectedGender === 'male'}
          onChange={(e) => setSelectedGender(e.target.value)}
          label="Homme"
          name="gender"
          value="male"
          aria-label="Sélectionner Homme"
        />
        
        <RadioButton
          checked={selectedGender === 'female'}
          onChange={(e) => setSelectedGender(e.target.value)}
          label="Femme"
          name="gender"
          value="female"
          aria-label="Sélectionner Femme"
        />
        
        <RadioButton
          checked={selectedGender === 'other'}
          onChange={(e) => setSelectedGender(e.target.value)}
          label="Autre"
          name="gender"
          value="other"
          aria-label="Sélectionner Autre"
        />
      </fieldset>
      
      {/* Groupe de tailles */}
      <fieldset>
        <legend>Taille</legend>
        <RadioButton
          checked={selectedSize === 'small'}
          onChange={(e) => setSelectedSize(e.target.value)}
          label="Petit"
          name="size"
          value="small"
        />
        
        <RadioButton
          checked={selectedSize === 'medium'}
          onChange={(e) => setSelectedSize(e.target.value)}
          label="Moyen"
          name="size"
          value="medium"
        />
        
        <RadioButton
          checked={selectedSize === 'large'}
          onChange={(e) => setSelectedSize(e.target.value)}
          label="Grand"
          name="size"
          value="large"
        />
      </fieldset>
    </form>
  );
}

// Utilisation avec gestion d'état avancée
function ChoixLivraison() {
  const [livraison, setLivraison] = useState('standard');

  const optionsLivraison = [
    { value: 'standard', label: 'Livraison standard (3-5 jours)', price: 'Gratuit' },
    { value: 'express', label: 'Livraison express (1-2 jours)', price: '+5€' },
    { value: 'premium', label: 'Livraison premium (24h)', price: '+15€' }
  ];

  return (
    <div>
      <h3>Mode de livraison</h3>
      
      {optionsLivraison.map(option => (
        <RadioButton
          key={option.value}
          checked={livraison === option.value}
          onChange={(e) => setLivraison(e.target.value)}
          label={`${option.label} - ${option.price}`}
          name="livraison"
          value={option.value}
          className="livraison-option"
        />
      ))}
    </div>
  );
}
```

## ♿ Accessibilité

- **Support des attributs HTML natifs** : Tous les attributs d'accessibilité sont supportés
- **Navigation clavier** : Support complet de la navigation avec Tab et flèches
- **Focus visible** : Indicateur de focus clair et visible
- **Support des lecteurs d'écran** : Compatible avec les technologies d'assistance
- **Groupes radio** : Liaison automatique entre les boutons d'un même groupe
- **Label associé** : Liaison automatique entre le label et le bouton radio
- **États désactivés** : Gestion appropriée de l'état désactivé

## 🎨 Personnalisation

Le bouton radio utilise les classes CSS suivantes pour la personnalisation :
- `.radio` : Conteneur principal
- `.radio input` : Élément input natif
- `.radio label` : Label associé

```scss
// Exemple de personnalisation
.radio {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  input[type="radio"] {
    width: 18px;
    height: 18px;
    border: 2px solid #d1d5db;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:checked {
      border-color: #3b82f6;
      background: radial-gradient(circle, #3b82f6 0%, #3b82f6 40%, transparent 40%);
    }
    
    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    &:disabled {
      background-color: #f9fafb;
      border-color: #d1d5db;
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
  
  label {
    font-size: 14px;
    color: #374151;
    cursor: pointer;
    
    &:hover {
      color: #1f2937;
    }
  }
}

// Style pour les groupes
fieldset {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  
  legend {
    font-weight: 600;
    color: #374151;
    padding: 0 8px;
  }
}
```

## 📱 Responsive

Le bouton radio s'adapte automatiquement aux différentes tailles d'écran :
- **Mobile** : Taille optimisée pour les écrans tactiles
- **Tablette/Desktop** : Espacement et taille optimaux pour la sélection

## 🔧 Fonctionnalités

- **Groupes radio** : Sélection unique dans un groupe de boutons
- **États multiples** : Checked, unchecked, disabled
- **Validation** : Intégration avec les systèmes de validation de formulaires
- **Référence React** : Support des refs pour le focus programmatique
- **Événements personnalisés** : Support des événements natifs et personnalisés

## 🎨 Cas d'usage

- **Formulaires** : Sélection de genre, préférences, options
- **Configuration** : Choix de paramètres utilisateur
- **Sondages** : Questions à choix unique
- **Filtres** : Sélection de critères uniques
- **Navigation** : Sélection de modes d'affichage

## ⚠️ Bonnes pratiques

- **Toujours utiliser un `name`** : Obligatoire pour le fonctionnement des groupes
- **Utiliser des `fieldset` et `legend`** : Pour grouper visuellement les options
- **Labels descriptifs** : Des labels clairs améliorent l'accessibilité
- **Valeurs uniques** : Chaque bouton doit avoir une valeur différente dans le groupe 