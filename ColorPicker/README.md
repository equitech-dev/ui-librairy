# 🎨 ColorPicker

Composant de sélection de couleur avec interface moderne et accessible.

## 📋 Fonctionnalités

- ✅ Sélecteur de couleur HSL interactif
- ✅ Palette de couleurs prédéfinies
- ✅ Support de la transparence (alpha)
- ✅ Conversion automatique des formats (HEX, RGB, HSL)
- ✅ Interface responsive
- ✅ Accessibilité complète (ARIA)
- ✅ Navigation clavier
- ✅ États d'erreur et de succès
- ✅ Tailles multiples (sm, md, lg)

## 🚀 Utilisation

```jsx
import { ColorPicker } from 'ui-library';

function MyComponent() {
  const [color, setColor] = useState('');

  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      placeholder="Sélectionner une couleur"
    />
  );
}
```

## 📖 Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `string` | `''` | Valeur sélectionnée (format HEX) |
| `onChange` | `function` | - | Callback appelé lors du changement de valeur |
| `placeholder` | `string` | `'Sélectionner une couleur'` | Texte d'aide |
| `disabled` | `boolean` | `false` | Désactive le composant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du composant |
| `variant` | `'default' \| 'error' \| 'success'` | `'default'` | Variante visuelle |
| `presets` | `string[]` | `[]` | Couleurs prédéfinies personnalisées |
| `showAlpha` | `boolean` | `false` | Affiche le contrôle de transparence |
| `format` | `'hex' \| 'rgb' \| 'hsl'` | `'hex'` | Format de sortie |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `id` | `string` | - | ID de l'élément |
| `name` | `string` | - | Nom du champ |
| `required` | `boolean` | `false` | Champ requis |
| `error` | `boolean` | `false` | État d'erreur |
| `success` | `boolean` | `false` | État de succès |
| `onFocus` | `function` | - | Callback focus |
| `onBlur` | `function` | - | Callback blur |

## 🎨 Exemples

### Basique

```jsx
<ColorPicker
  value="#ff0000"
  onChange={(color) => console.log('Couleur sélectionnée:', color)}
/>
```

### Avec transparence

```jsx
<ColorPicker
  value="#ff0000"
  onChange={setColor}
  showAlpha={true}
  placeholder="Couleur avec transparence"
/>
```

### Couleurs prédéfinies personnalisées

```jsx
const customPresets = [
  '#ff0000', '#00ff00', '#0000ff',
  '#ffff00', '#ff00ff', '#00ffff',
  '#ffffff', '#000000'
];

<ColorPicker
  value={color}
  onChange={setColor}
  presets={customPresets}
/>
```

### États

```jsx
// État d'erreur
<ColorPicker
  value=""
  onChange={setColor}
  error={true}
  placeholder="Couleur invalide"
/>

// État de succès
<ColorPicker
  value="#00ff00"
  onChange={setColor}
  success={true}
/>

// Désactivé
<ColorPicker
  value="#ff0000"
  onChange={setColor}
  disabled={true}
/>
```

### Tailles

```jsx
<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
  <ColorPicker size="sm" placeholder="Petit" />
  <ColorPicker size="md" placeholder="Moyen" />
  <ColorPicker size="lg" placeholder="Grand" />
</div>
```

## 🎯 Cas d'usage

### Éditeur de thème

```jsx
function ThemeEditor() {
  const [primaryColor, setPrimaryColor] = useState('#007bff');
  const [secondaryColor, setSecondaryColor] = useState('#6c757d');
  const [accentColor, setAccentColor] = useState('#28a745');

  return (
    <div>
      <h3>Personnalisation du thème</h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>Couleur primaire</label>
        <ColorPicker
          value={primaryColor}
          onChange={setPrimaryColor}
          placeholder="Couleur principale"
        />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>Couleur secondaire</label>
        <ColorPicker
          value={secondaryColor}
          onChange={setSecondaryColor}
          placeholder="Couleur secondaire"
        />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>Couleur d'accent</label>
        <ColorPicker
          value={accentColor}
          onChange={setAccentColor}
          placeholder="Couleur d'accent"
        />
      </div>
    </div>
  );
}
```

### Sélecteur de couleur pour graphiques

```jsx
function ChartColorSelector() {
  const [chartColors, setChartColors] = useState([
    '#ff6384', '#36a2eb', '#cc65fe', '#ffce56'
  ]);

  const updateColor = (index, color) => {
    const newColors = [...chartColors];
    newColors[index] = color;
    setChartColors(newColors);
  };

  return (
    <div>
      <h3>Couleurs du graphique</h3>
      {chartColors.map((color, index) => (
        <div key={index} style={{ marginBottom: '0.5rem' }}>
          <label>Série {index + 1}</label>
          <ColorPicker
            value={color}
            onChange={(newColor) => updateColor(index, newColor)}
            placeholder={`Couleur série ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
}
```

### Éditeur de design

```jsx
function DesignEditor() {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [borderColor, setBorderColor] = useState('#e0e0e0');

  return (
    <div>
      <h3>Éditeur de design</h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>Arrière-plan</label>
        <ColorPicker
          value={backgroundColor}
          onChange={setBackgroundColor}
          showAlpha={true}
          placeholder="Couleur d'arrière-plan"
        />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>Couleur du texte</label>
        <ColorPicker
          value={textColor}
          onChange={setTextColor}
          placeholder="Couleur du texte"
        />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>Couleur de bordure</label>
        <ColorPicker
          value={borderColor}
          onChange={setBorderColor}
          showAlpha={true}
          placeholder="Couleur de bordure"
        />
      </div>
      
      {/* Aperçu en temps réel */}
      <div 
        style={{
          padding: '1rem',
          backgroundColor,
          color: textColor,
          border: `2px solid ${borderColor}`,
          borderRadius: '8px'
        }}
      >
        <p>Aperçu du design</p>
      </div>
    </div>
  );
}
```

## ♿ Accessibilité

Le composant ColorPicker respecte les standards d'accessibilité WCAG 2.1 :

- **Rôles ARIA** : `combobox`, `dialog`
- **Attributs ARIA** : `aria-haspopup`, `aria-expanded`, `aria-label`
- **Navigation clavier** : 
  - `Tab` : Navigation entre les éléments
  - `Enter` : Sélection/confirmation
  - `Escape` : Fermeture du dropdown
  - `Flèches` : Navigation dans les couleurs prédéfinies
- **Lecteurs d'écran** : Labels et descriptions appropriés
- **Contraste** : Vérification automatique du contraste pour les couleurs

## 🎨 Personnalisation

### Variables CSS

```scss
:root {
  --colorpicker-border-radius: var(--border-radius-md);
  --colorpicker-shadow: var(--shadow-lg);
  --colorpicker-z-index: var(--z-index-dropdown);
  --colorpicker-preview-size: 20px;
  --colorpicker-preset-size: 32px;
}
```

### Classes CSS

```scss
.ui-colorpicker {
  // Conteneur principal
}

.ui-colorpicker__trigger {
  // Bouton de déclenchement
}

.ui-colorpicker__preview {
  // Aperçu de la couleur
}

.ui-colorpicker__dropdown {
  // Dropdown du sélecteur
}

.ui-colorpicker__picker {
  // Zone de sélection HSL
}

.ui-colorpicker__preset {
  // Couleur prédéfinie
}

.ui-colorpicker__preset--selected {
  // Couleur prédéfinie sélectionnée
}
```

## 🔧 Développement

### Structure des fichiers

```
ColorPicker/
├── ColorPicker.scss    # Styles du composant
├── ColorPicker.jsx     # Composant React
├── index.js          # Export
└── README.md         # Documentation
```

### Tests

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import ColorPicker from './ColorPicker';

test('ColorPicker opens dropdown on click', () => {
  render(<ColorPicker />);
  
  const trigger = screen.getByRole('combobox');
  fireEvent.click(trigger);
  
  expect(screen.getByText('Sélectionner une couleur')).toBeInTheDocument();
});

test('ColorPicker selects preset color', () => {
  const onChange = jest.fn();
  render(<ColorPicker onChange={onChange} />);
  
  const trigger = screen.getByRole('combobox');
  fireEvent.click(trigger);
  
  const preset = screen.getByLabelText('Sélectionner #ff0000');
  fireEvent.click(preset);
  
  const confirmButton = screen.getByText('Confirmer');
  fireEvent.click(confirmButton);
  
  expect(onChange).toHaveBeenCalledWith('#ff0000');
});
```

## 📝 Notes

- Le composant utilise le format HEX par défaut pour la compatibilité
- Les couleurs prédéfinies incluent une palette complète de couleurs web
- Le sélecteur HSL offre une précision maximale pour la sélection de couleurs
- La transparence (alpha) est supportée via le format HEX8
- Le composant gère automatiquement la fermeture lors d'un clic extérieur
- Les conversions de couleur sont optimisées pour les performances
- En mode responsive, le dropdown s'affiche en modal centré


