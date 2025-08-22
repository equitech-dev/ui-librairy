# 🔄 Switch/Toggle

Interrupteur on/off avec animations fluides et variantes de taille et de style.

## 📋 Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `checked` | `boolean` | `false` | État actuel du switch (on/off) |
| `onChange` | `function` | - | Callback appelé lors du changement d'état |
| `disabled` | `boolean` | `false` | Désactive le switch |
| `size` | `'s' \| 'm' \| 'l'` | `'m'` | Taille du switch |
| `label` | `string` | - | Label textuel associé au switch |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Position du label par rapport au switch |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `aria-label` | `string` | - | Label pour l'accessibilité |

## 🚀 Exemple d'utilisation

```jsx
import { Switch } from '@equitech/ui-library';
import { useState } from 'react';

function MonComposant() {
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [autoSave, setAutoSave] = useState(false);

  const handleNotificationChange = (checked) => {
    setNotifications(checked);
    console.log(`Notifications ${checked ? 'activées' : 'désactivées'}`);
  };

  return (
    <div className="ui-settings-panel">
      {/* Switch simple */}
      <Switch
        checked={notifications}
        onChange={handleNotificationChange}
        label="Notifications push"
      />
      
      {/* Switch avec label à gauche */}
      <Switch
        checked={darkMode}
        onChange={setDarkMode}
        label="Mode sombre"
        labelPosition="left"
      />
      
      {/* Switch désactivé */}
      <Switch
        checked={autoSave}
        onChange={setAutoSave}
        label="Sauvegarde automatique"
        disabled
      />
      
      {/* Switch de différentes tailles */}
      <Switch
        checked={notifications}
        onChange={handleNotificationChange}
        label="Notifications (petit)"
        size="s"
      />
      
      <Switch
        checked={notifications}
        onChange={handleNotificationChange}
        label="Notifications (grand)"
        size="l"
      />
      
      {/* Switch sans label */}
      <Switch
        checked={notifications}
        onChange={handleNotificationChange}
        aria-label="Activer les notifications"
      />
    </div>
  );
}

// Utilisation dans un formulaire de paramètres
function ParametresUtilisateur() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    twoFactorAuth: true,
    locationSharing: false
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Ici vous pourriez sauvegarder en base de données
    console.log(`Paramètre ${key} changé vers: ${value}`);
  };

  return (
    <div className="ui-settings-form">
      <h3>Paramètres de notification</h3>
      
      <div className="ui-setting-item">
        <Switch
          checked={settings.emailNotifications}
          onChange={(checked) => handleSettingChange('emailNotifications', checked)}
          label="Notifications par email"
        />
        <p className="ui-setting-description">
          Recevez des notifications importantes par email
        </p>
      </div>
      
      <div className="ui-setting-item">
        <Switch
          checked={settings.smsNotifications}
          onChange={(checked) => handleSettingChange('smsNotifications', checked)}
          label="Notifications par SMS"
        />
        <p className="ui-setting-description">
          Recevez des alertes urgentes par SMS
        </p>
      </div>
      
      <div className="ui-setting-item">
        <Switch
          checked={settings.marketingEmails}
          onChange={(checked) => handleSettingChange('marketingEmails', checked)}
          label="Emails marketing"
        />
        <p className="ui-setting-description">
          Recevez nos offres et nouveautés
        </p>
      </div>
      
      <h3>Sécurité</h3>
      
      <div className="ui-setting-item">
        <Switch
          checked={settings.twoFactorAuth}
          onChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
          label="Authentification à deux facteurs"
        />
        <p className="ui-setting-description">
          Sécurisez votre compte avec un code supplémentaire
        </p>
      </div>
      
      <div className="ui-setting-item">
        <Switch
          checked={settings.locationSharing}
          onChange={(checked) => handleSettingChange('locationSharing', checked)}
          label="Partage de localisation"
        />
        <p className="ui-setting-description">
          Autorisez l'accès à votre position pour des fonctionnalités avancées
        </p>
      </div>
    </div>
  );
}
```

## ♿ Accessibilité

- **Support des attributs HTML natifs** : Tous les attributs d'accessibilité sont supportés
- **Navigation clavier** : Support complet avec Tab, Space et Enter
- **Focus visible** : Indicateur de focus clair et visible
- **Support des lecteurs d'écran** : Compatible avec les technologies d'assistance
- **États désactivés** : Gestion appropriée de l'état désactivé
- **Rôle sémantique** : Utilise le rôle `switch` approprié

## 🎨 Personnalisation

Le switch utilise les classes CSS suivantes pour la personnalisation :

```scss
// Classes principales
.ui-switch { /* Conteneur principal */ }
.ui-switch-input { /* Input caché */ }
.ui-switch-track { /* Piste du switch */ }
.ui-switch-thumb { /* Curseur du switch */ }
.ui-switch-label { /* Label textuel */ }

// Tailles
.ui-switch.s { /* Taille petite */ }
.ui-switch.m { /* Taille moyenne */ }
.ui-switch.l { /* Taille grande */ }

// États
.ui-switch:checked .ui-switch-track { /* État activé */ }
.ui-switch:disabled { /* État désactivé */ }
.ui-switch:focus .ui-switch-track { /* État focus */ }

// Exemple de personnalisation
.ui-switch {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  
  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  .ui-switch-input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .ui-switch-track {
    position: relative;
    width: 3rem;
    height: 1.5rem;
    background: #d1d5db;
    border-radius: 1rem;
    transition: all 0.2s ease;
    
    .ui-switch-thumb {
      position: absolute;
      top: 0.125rem;
      left: 0.125rem;
      width: 1.25rem;
      height: 1.25rem;
      background: white;
      border-radius: 50%;
      transition: all 0.2s ease;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
  }
  
  // État activé
  .ui-switch-input:checked + .ui-switch-track {
    background: #2BA985;
    
    .ui-switch-thumb {
      transform: translateX(1.5rem);
    }
  }
  
  // État focus
  .ui-switch-input:focus + .ui-switch-track {
    box-shadow: 0 0 0 3px rgba(43, 169, 133, 0.1);
  }
  
  // État désactivé
  .ui-switch-input:disabled + .ui-switch-track {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .ui-switch-label {
    font-size: 0.875rem;
    color: #374151;
    user-select: none;
  }
  
  // Tailles
  &.s {
    .ui-switch-track {
      width: 2rem;
      height: 1rem;
      
      .ui-switch-thumb {
        width: 0.75rem;
        height: 0.75rem;
      }
    }
    
    .ui-switch-input:checked + .ui-switch-track .ui-switch-thumb {
      transform: translateX(1rem);
    }
  }
  
  &.l {
    .ui-switch-track {
      width: 4rem;
      height: 2rem;
      
      .ui-switch-thumb {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
    
    .ui-switch-input:checked + .ui-switch-track .ui-switch-thumb {
      transform: translateX(2rem);
    }
  }
  
  // Label à gauche
  &.label-left {
    flex-direction: row-reverse;
  }
}
```

## 📱 Responsive

Le switch s'adapte automatiquement aux différentes tailles d'écran :
- **Mobile** : Taille optimisée pour les écrans tactiles
- **Tablette/Desktop** : Espacement et taille optimaux pour la navigation

### Classes utilitaires pour le responsive

```scss
// Ajuster la taille sur mobile
@media screen and (max-width: 768px) {
  .ui-switch {
    .ui-switch-track {
      min-width: 44px; // Taille minimale pour le toucher
      min-height: 22px;
    }
    
    .ui-switch-thumb {
      min-width: 18px;
      min-height: 18px;
    }
  }
}
```

## 🔧 Fonctionnalités

- **Animations fluides** : Transitions CSS pour les changements d'état
- **Tailles multiples** : S, M, L pour différents contextes
- **Support des labels** : Positionnement flexible (gauche/droite)
- **États interactifs** : Hover, focus, active, disabled
- **Accessibilité complète** : Support clavier et lecteurs d'écran
- **Performance optimisée** : Rendu efficace avec CSS pur

## 🎯 Cas d'usage

### Switch de paramètre simple
```jsx
<Switch
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Activer la fonctionnalité"
/>
```

### Switch avec label à gauche
```jsx
<Switch
  checked={darkMode}
  onChange={setDarkMode}
  label="Mode sombre"
  labelPosition="left"
/>
```

### Switch de différentes tailles
```jsx
<Switch checked={value} onChange={setValue} label="Petit" size="s" />
<Switch checked={value} onChange={setValue} label="Moyen" size="m" />
<Switch checked={value} onChange={setValue} label="Grand" size="l" />
```

### Switch désactivé
```jsx
<Switch
  checked={value}
  onChange={setValue}
  label="Fonctionnalité temporairement indisponible"
  disabled
/>
```

### Switch sans label (avec aria-label)
```jsx
<Switch
  checked={value}
  onChange={setValue}
  aria-label="Activer les notifications"
/>
```

## 📊 Gestion des états

### États du switch
- **Off** : État par défaut (gris)
- **On** : État activé (couleur primaire)
- **Hover** : Effet visuel au survol
- **Focus** : Indicateur de focus pour l'accessibilité
- **Disabled** : État désactivé (opacité réduite)

### Animations
- **Transition d'état** : Animation fluide du curseur
- **Changement de couleur** : Transition de la piste
- **Focus** : Animation de l'outline
