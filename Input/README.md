# 📝 Input

Champ de saisie texte universel, accessible et personnalisable pour la collecte de données utilisateur.

## 📋 Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `type` | `string` | `'text'` | Type d'input HTML (text, email, password, etc.) |
| `value` | `string` | - | Valeur contrôlée du champ |
| `onChange` | `function` | - | Callback appelé lors de la modification |
| `placeholder` | `string` | - | Texte d'aide affiché dans le champ |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `disabled` | `boolean` | `false` | Désactive le champ |
| `aria-label` | `string` | - | Label pour l'accessibilité |

## 🚀 Exemple d'utilisation

```jsx
import { Input } from '@equitech/ui-library';
import { useState } from 'react';

function MonFormulaire() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Votre adresse email"
        aria-label="Adresse email"
      />
      
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Votre mot de passe"
        aria-label="Mot de passe"
      />
      
      <Input
        type="text"
        placeholder="Nom d'utilisateur"
        disabled
        aria-label="Nom d'utilisateur (désactivé)"
      />
    </form>
  );
}
```

## ♿ Accessibilité

- **Support des attributs HTML natifs** : Tous les attributs d'accessibilité sont supportés
- **Focus visible** : Indicateur de focus clair et visible
- **Support des lecteurs d'écran** : Compatible avec les technologies d'assistance
- **Validation native** : Support des types HTML5 pour la validation côté client

## 🎨 Personnalisation

L'input utilise la classe CSS `.input` pour la personnalisation :

```scss
// Exemple de personnalisation
.input {
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
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
  }
}
```

## 📱 Responsive

L'input s'adapte automatiquement aux différentes tailles d'écran :
- **Mobile** : Taille de police adaptée et padding optimisé
- **Tablette/Desktop** : Espacement et taille optimaux pour la saisie

## 🔧 Types supportés

Tous les types d'input HTML5 sont supportés :
- `text`, `email`, `password`, `number`, `tel`, `url`
- `search`, `date`, `time`, `datetime-local`
- `file`, `range`, `color`, etc. 