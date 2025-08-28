# Toggle Switch Component

Composant d'interrupteur avancé avec support des modes simple, avancé et groupe, offrant une expérience utilisateur flexible et accessible.

## Utilisation

```jsx
import { ToggleSwitch } from 'ui-library';

function MyComponent() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [theme, setTheme] = useState('light');

  return (
    <div>
      {/* Mode simple */}
      <ToggleSwitch
        checked={isEnabled}
        onChange={setIsEnabled}
        label="Notifications"
        description="Recevoir les notifications par email"
      />
      
      {/* Mode avancé */}
      <ToggleSwitch
        mode="advanced"
        options={[
          { value: 'light', label: 'Mode clair', description: 'Thème par défaut' },
          { value: 'dark', label: 'Mode sombre', description: 'Économise la batterie' },
          { value: 'auto', label: 'Automatique', description: 'Suit les préférences système' }
        ]}
        value={theme}
        onValueChange={setTheme}
      />
    </div>
  );
}
```

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `checked` | `boolean` | `false` | État actuel (mode simple) |
| `defaultChecked` | `boolean` | `false` | État par défaut (mode simple) |
| `disabled` | `boolean` | `false` | Désactive le composant |
| `label` | `string` | - | Label principal |
| `description` | `string` | - | Description (mode simple) |
| `onChange` | `function` | - | Callback changement (mode simple) |
| `onValueChange` | `function` | - | Callback changement valeur |
| `className` | `string` | `""` | Classe CSS personnalisée |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Taille du composant |
| `variant` | `'default' \| 'outlined' \| 'filled' \| 'rounded' \| 'success' \| 'warning' \| 'error'` | `'default'` | Variante de style |
| `mode` | `'simple' \| 'advanced' \| 'group'` | `'simple'` | Mode d'affichage |
| `options` | `array` | `[]` | Options disponibles (modes avancé/groupe) |
| `value` | `string \| number \| array` | - | Valeur actuelle |
| `defaultValue` | `string \| number \| array` | - | Valeur par défaut |
| `multiple` | `boolean` | `false` | Sélection multiple (mode avancé) |
| `title` | `string` | - | Titre (mode groupe) |
| `groupDescription` | `string` | - | Description (mode groupe) |
| `animated` | `boolean` | `true` | Active les animations |
| `children` | `node` | - | Contenu personnalisé |

### Structure des options

```jsx
const options = [
  {
    value: 'option1',           // Valeur unique (requis)
    label: 'Option 1',          // Label affiché (requis)
    description: 'Description', // Description optionnelle
    disabled: false             // Désactive l'option
  }
];
```

## Variantes

### Tailles

```jsx
<ToggleSwitch size="small" />
<ToggleSwitch size="medium" />
<ToggleSwitch size="large" />
```

### Styles

```jsx
<ToggleSwitch variant="default" />
<ToggleSwitch variant="outlined" />
<ToggleSwitch variant="filled" />
<ToggleSwitch variant="rounded" />
<ToggleSwitch variant="success" />
<ToggleSwitch variant="warning" />
<ToggleSwitch variant="error" />
```

## Exemples

### Mode simple basique

```jsx
<ToggleSwitch
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Activer les notifications"
/>
```

### Mode simple avec description

```jsx
<ToggleSwitch
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Mode sombre"
  description="Économise la batterie et réduit la fatigue oculaire"
  variant="success"
/>
```

### Mode avancé - Sélection unique

```jsx
<ToggleSwitch
  mode="advanced"
  options={[
    { value: 'fr', label: 'Français', description: 'Langue française' },
    { value: 'en', label: 'English', description: 'English language' },
    { value: 'es', label: 'Español', description: 'Idioma español' }
  ]}
  value={language}
  onValueChange={setLanguage}
/>
```

### Mode avancé - Sélection multiple

```jsx
<ToggleSwitch
  mode="advanced"
  multiple={true}
  options={[
    { value: 'email', label: 'Email', description: 'Notifications par email' },
    { value: 'sms', label: 'SMS', description: 'Notifications par SMS' },
    { value: 'push', label: 'Push', description: 'Notifications push' }
  ]}
  value={notifications}
  onValueChange={setNotifications}
/>
```

### Mode groupe

```jsx
<ToggleSwitch
  mode="group"
  title="Préférences de confidentialité"
  groupDescription="Choisissez comment vos données sont utilisées"
  options={[
    { value: 'public', label: 'Public', description: 'Votre profil est visible par tous' },
    { value: 'friends', label: 'Amis', description: 'Visible uniquement par vos amis' },
    { value: 'private', label: 'Privé', description: 'Visible uniquement par vous' }
  ]}
  value={privacy}
  onValueChange={setPrivacy}
/>
```

### Toggle avec validation

```jsx
const [isPremium, setIsPremium] = useState(false);

<ToggleSwitch
  checked={isPremium}
  onChange={setIsPremium}
  label="Mode Premium"
  description="Accédez à toutes les fonctionnalités"
  variant={isPremium ? 'success' : 'default'}
  size="large"
/>
```

### Toggle avec options désactivées

```jsx
<ToggleSwitch
  mode="advanced"
  options={[
    { value: 'free', label: 'Gratuit', description: 'Plan de base' },
    { value: 'pro', label: 'Pro', description: 'Plan professionnel' },
    { value: 'enterprise', label: 'Entreprise', description: 'Plan entreprise', disabled: true }
  ]}
  value={plan}
  onValueChange={setPlan}
/>
```

## Navigation au clavier

Le composant supporte la navigation au clavier :

- **Espace/Entrée** : Active/désactive le toggle
- **Tab** : Navigation entre les éléments
- **Flèches** : Navigation entre les options (modes avancé/groupe)

## Accessibilité

- Support complet des attributs ARIA (`role="switch"`, `aria-checked`, `aria-pressed`)
- Navigation au clavier
- Labels descriptifs
- Support des lecteurs d'écran
- Focus visible
- États désactivés clairement indiqués

## Notes techniques

- Gestion automatique des états contrôlés/non-contrôlés
- Support des sélections multiples
- Animations fluides et personnalisables
- Performance optimisée avec `useCallback`
- Responsive design intégré
- Support des options désactivées


