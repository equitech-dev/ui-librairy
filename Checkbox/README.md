# ☑️ Checkbox

Case à cocher universelle, accessible et personnalisable pour les sélections multiples.

## 📋 Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `checked` | `boolean` | `false` | État de la case à cocher |
| `onChange` | `function` | - | Callback appelé lors du changement |
| `label` | `string` | - | Texte du label associé |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `object` | `{}` | Styles inline additionnels |
| `disabled` | `boolean` | `false` | Désactive la case à cocher |
| `aria-label` | `string` | - | Label pour l'accessibilité |

## 🚀 Exemple d'utilisation

```jsx
import { Checkbox } from '@equitech/ui-library';
import { useState } from 'react';

function MonFormulaire() {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [notifications, setNotifications] = useState(false);

  return (
    <form>
      {/* Case à cocher simple */}
      <Checkbox
        checked={acceptTerms}
        onChange={(e) => setAcceptTerms(e.target.checked)}
        label="J'accepte les conditions d'utilisation"
        aria-label="Accepter les conditions d'utilisation"
      />
      
      {/* Case à cocher avec label personnalisé */}
      <Checkbox
        checked={newsletter}
        onChange={(e) => setNewsletter(e.target.checked)}
        label="Recevoir la newsletter"
        className="newsletter-checkbox"
      />
      
      {/* Case à cocher désactivée */}
      <Checkbox
        checked={notifications}
        onChange={(e) => setNotifications(e.target.checked)}
        label="Notifications push"
        disabled
        aria-label="Notifications push (désactivé)"
      />
      
      {/* Case à cocher sans label visible */}
      <Checkbox
        checked={acceptTerms}
        onChange={(e) => setAcceptTerms(e.target.checked)}
        aria-label="Accepter les conditions"
      />
    </form>
  );
}

// Utilisation dans une liste
function ListePreferences() {
  const [preferences, setPreferences] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false
  });

  const handlePreferenceChange = (key) => (e) => {
    setPreferences(prev => ({
      ...prev,
      [key]: e.target.checked
    }));
  };

  return (
    <div>
      <h3>Préférences de communication</h3>
      
      <Checkbox
        checked={preferences.email}
        onChange={handlePreferenceChange('email')}
        label="Notifications par email"
      />
      
      <Checkbox
        checked={preferences.sms}
        onChange={handlePreferenceChange('sms')}
        label="Notifications par SMS"
      />
      
      <Checkbox
        checked={preferences.push}
        onChange={handlePreferenceChange('push')}
        label="Notifications push"
      />
      
      <Checkbox
        checked={preferences.marketing}
        onChange={handlePreferenceChange('marketing')}
        label="Recevoir des offres marketing"
      />
    </div>
  );
}
```

## ♿ Accessibilité

- **Support des attributs HTML natifs** : Tous les attributs d'accessibilité sont supportés
- **Navigation clavier** : Support complet de la navigation avec Tab et Espace
- **Focus visible** : Indicateur de focus clair et visible
- **Support des lecteurs d'écran** : Compatible avec les technologies d'assistance
- **Label associé** : Liaison automatique entre le label et la case à cocher
- **États désactivés** : Gestion appropriée de l'état désactivé

## 🎨 Personnalisation

La checkbox utilise les classes CSS suivantes pour la personnalisation :
- `.checkbox` : Conteneur principal
- `.checkbox input` : Élément input natif
- `.checkbox label` : Label associé

```scss
// Exemple de personnalisation
.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    border: 2px solid #d1d5db;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:checked {
      background-color: #3b82f6;
      border-color: #3b82f6;
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
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
```

## 📱 Responsive

La checkbox s'adapte automatiquement aux différentes tailles d'écran :
- **Mobile** : Taille optimisée pour les écrans tactiles
- **Tablette/Desktop** : Espacement et taille optimaux pour la sélection

## 🔧 Fonctionnalités

- **États multiples** : Checked, unchecked, disabled, indeterminate
- **Support des groupes** : Utilisation avec des groupes de checkboxes
- **Validation** : Intégration avec les systèmes de validation de formulaires
- **Référence React** : Support des refs pour le focus programmatique
- **Événements personnalisés** : Support des événements natifs et personnalisés

## 🎨 Cas d'usage

- **Formulaires** : Acceptation de conditions, préférences
- **Listes de sélection** : Choix multiples dans des listes
- **Paramètres** : Configuration d'options utilisateur
- **Filtres** : Sélection de critères de filtrage
- **Permissions** : Gestion des autorisations utilisateur 