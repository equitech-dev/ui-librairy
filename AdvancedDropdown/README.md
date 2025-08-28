# Advanced Dropdown Component

Composant de menu déroulant avancé avec support de la recherche, sélection multiple, filtrage et personnalisation complète.

## Utilisation

```jsx
import { AdvancedDropdown } from 'ui-library';

function MyComponent() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  const countries = [
    { value: 'fr', label: 'France', description: 'Pays européen' },
    { value: 'us', label: 'États-Unis', description: 'Pays d\'Amérique du Nord' },
    { value: 'jp', label: 'Japon', description: 'Pays d\'Asie' }
  ];

  return (
    <div>
      {/* Dropdown simple */}
      <AdvancedDropdown
        options={countries}
        value={selectedCountry}
        onValueChange={setSelectedCountry}
        placeholder="Choisir un pays"
        searchable={true}
      />
      
      {/* Dropdown multiple */}
      <AdvancedDropdown
        options={countries}
        value={selectedTags}
        onValueChange={setSelectedTags}
        multiple={true}
        searchable={true}
        selectAll={true}
        placeholder="Choisir des pays"
      />
    </div>
  );
}
```

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `options` | `array` | `[]` | Options disponibles |
| `value` | `string \| number \| array` | - | Valeur(s) sélectionnée(s) |
| `defaultValue` | `string \| number \| array` | - | Valeur(s) par défaut |
| `multiple` | `boolean` | `false` | Active la sélection multiple |
| `searchable` | `boolean` | `false` | Active la recherche |
| `placeholder` | `string` | `"Sélectionner une option"` | Texte d'aide |
| `disabled` | `boolean` | `false` | Désactive le composant |
| `onChange` | `function` | - | Callback changement |
| `onValueChange` | `function` | - | Callback changement valeur |
| `onSearch` | `function` | - | Callback recherche |
| `className` | `string` | `""` | Classe CSS personnalisée |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Taille du composant |
| `variant` | `'default' \| 'outlined' \| 'filled' \| 'rounded' \| 'success' \| 'warning' \| 'error'` | `'default'` | Variante de style |
| `showIcons` | `boolean` | `false` | Affiche les icônes des options |
| `compact` | `boolean` | `false` | Mode compact |
| `clearable` | `boolean` | `true` | Affiche le bouton "Effacer tout" |
| `selectAll` | `boolean` | `false` | Affiche le bouton "Tout sélectionner" |
| `maxSelected` | `number` | - | Nombre maximum d'éléments sélectionnables |
| `loading` | `boolean` | `false` | État de chargement |
| `error` | `string` | - | Message d'erreur |
| `children` | `node` | - | Contenu personnalisé |

### Structure des options

```jsx
const options = [
  {
    value: 'option1',           // Valeur unique (requis)
    label: 'Option 1',          // Label affiché (requis)
    description: 'Description', // Description optionnelle
    icon: <Icon />,            // Icône optionnelle
    disabled: false             // Désactive l'option
  }
];
```

## Variantes

### Tailles

```jsx
<AdvancedDropdown size="small" />
<AdvancedDropdown size="medium" />
<AdvancedDropdown size="large" />
```

### Styles

```jsx
<AdvancedDropdown variant="default" />
<AdvancedDropdown variant="outlined" />
<AdvancedDropdown variant="filled" />
<AdvancedDropdown variant="rounded" />
<AdvancedDropdown variant="success" />
<AdvancedDropdown variant="warning" />
<AdvancedDropdown variant="error" />
```

## Exemples

### Dropdown simple basique

```jsx
<AdvancedDropdown
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]}
  value={selectedValue}
  onValueChange={setSelectedValue}
  placeholder="Choisir une option"
/>
```

### Dropdown avec recherche

```jsx
<AdvancedDropdown
  options={countries}
  value={selectedCountry}
  onValueChange={setSelectedCountry}
  searchable={true}
  placeholder="Rechercher un pays..."
  onSearch={(term, filtered) => console.log('Recherche:', term, filtered)}
/>
```

### Dropdown multiple

```jsx
<AdvancedDropdown
  options={tags}
  value={selectedTags}
  onValueChange={setSelectedTags}
  multiple={true}
  searchable={true}
  selectAll={true}
  clearable={true}
  maxSelected={5}
  placeholder="Choisir des tags (max 5)"
/>
```

### Dropdown avec icônes

```jsx
<AdvancedDropdown
  options={[
    { 
      value: 'email', 
      label: 'Email', 
      icon: <EmailIcon />,
      description: 'Notifications par email' 
    },
    { 
      value: 'sms', 
      label: 'SMS', 
      icon: <SmsIcon />,
      description: 'Notifications par SMS' 
    }
  ]}
  showIcons={true}
  value={notificationType}
  onValueChange={setNotificationType}
/>
```

### Dropdown avec états

```jsx
<AdvancedDropdown
  options={options}
  value={selectedValue}
  onValueChange={setSelectedValue}
  loading={isLoading}
  error={error}
  variant={error ? 'error' : 'default'}
/>
```

### Dropdown avec options désactivées

```jsx
<AdvancedDropdown
  options={[
    { value: 'free', label: 'Gratuit', description: 'Plan de base' },
    { value: 'pro', label: 'Pro', description: 'Plan professionnel' },
    { value: 'enterprise', label: 'Entreprise', description: 'Plan entreprise', disabled: true }
  ]}
  value={plan}
  onValueChange={setPlan}
/>
```

### Dropdown compact

```jsx
<AdvancedDropdown
  options={options}
  value={selectedValue}
  onValueChange={setSelectedValue}
  compact={true}
  size="small"
/>
```

## Navigation au clavier

Le composant supporte la navigation au clavier :

- **Espace/Entrée** : Ouvre/ferme le menu
- **Flèches haut/bas** : Navigation entre les options
- **Entrée** : Sélectionne l'option surlignée
- **Échap** : Ferme le menu
- **Tab** : Navigation entre les éléments

## Accessibilité

- Support complet des attributs ARIA (`role="combobox"`, `aria-expanded`, `aria-haspopup`)
- Navigation au clavier
- Labels descriptifs
- Support des lecteurs d'écran
- Focus visible
- États désactivés clairement indiqués

## Fonctionnalités avancées

### Recherche en temps réel

```jsx
<AdvancedDropdown
  options={options}
  searchable={true}
  onSearch={(term, filtered) => {
    // Recherche personnalisée
    console.log('Terme recherché:', term);
    console.log('Options filtrées:', filtered);
  }}
/>
```

### Limitation de sélection

```jsx
<AdvancedDropdown
  options={options}
  multiple={true}
  maxSelected={3}
  onValueChange={(values) => {
    if (values.length >= 3) {
      console.log('Limite de sélection atteinte');
    }
  }}
/>
```

### Gestion des états de chargement

```jsx
<AdvancedDropdown
  options={options}
  loading={isLoading}
  error={error}
  onValueChange={handleChange}
/>
```

## Notes techniques

- Gestion automatique des états contrôlés/non-contrôlés
- Recherche en temps réel avec filtrage
- Support des sélections multiples avec badges
- Performance optimisée avec `useMemo` et `useCallback`
- Responsive design intégré
- Gestion automatique du focus et de la navigation
- Support des options désactivées et des états d'erreur


