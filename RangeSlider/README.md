# Range Slider Component

Composant de curseur de plage interactif avec support des curseurs simples et doubles, orientation verticale/horizontale et personnalisation avancée.

## Utilisation

```jsx
import { RangeSlider } from 'ui-library';

function MyComponent() {
  const [value, setValue] = useState(50);
  const [range, setRange] = useState({ min: 20, max: 80 });

  return (
    <div>
      {/* Curseur simple */}
      <RangeSlider
        min={0}
        max={100}
        value={value}
        onValueChange={setValue}
        label="Volume"
      />
      
      {/* Curseur double */}
      <RangeSlider
        min={0}
        max={100}
        range={true}
        minValue={range.min}
        maxValue={range.max}
        onRangeChange={(min, max) => setRange({ min, max })}
        label="Plage de prix"
      />
    </div>
  );
}
```

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `min` | `number` | `0` | Valeur minimale |
| `max` | `number` | `100` | Valeur maximale |
| `value` | `number` | - | Valeur actuelle (curseur simple) |
| `defaultValue` | `number` | `min` | Valeur par défaut (curseur simple) |
| `step` | `number` | `1` | Pas d'incrémentation |
| `disabled` | `boolean` | `false` | Désactive le composant |
| `showLabels` | `boolean` | `true` | Affiche les labels min/max |
| `showValue` | `boolean` | `true` | Affiche la valeur actuelle |
| `showTicks` | `boolean` | `false` | Affiche les marqueurs |
| `showTooltip` | `boolean` | `false` | Affiche le tooltip au survol |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation du curseur |
| `range` | `boolean` | `false` | Active le mode curseur double |
| `minValue` | `number` | - | Valeur minimale (curseur double) |
| `maxValue` | `number` | - | Valeur maximale (curseur double) |
| `defaultMinValue` | `number` | `min` | Valeur min par défaut |
| `defaultMaxValue` | `number` | `max` | Valeur max par défaut |
| `onValueChange` | `function` | - | Callback changement valeur (simple) |
| `onRangeChange` | `function` | - | Callback changement plage (double) |
| `onChange` | `function` | - | Callback générique |
| `className` | `string` | `""` | Classe CSS personnalisée |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Taille du composant |
| `variant` | `'default' \| 'outlined' \| 'filled' \| 'gradient' \| 'rounded' \| 'success' \| 'warning' \| 'error'` | `'default'` | Variante de style |
| `label` | `string` | - | Label principal |
| `minLabel` | `string` | - | Label personnalisé pour min |
| `maxLabel` | `string` | - | Label personnalisé pour max |
| `formatValue` | `function` | - | Fonction de formatage des valeurs |
| `ticks` | `number[]` | - | Positions personnalisées des marqueurs |
| `children` | `node` | - | Contenu personnalisé |

## Variantes

### Tailles

```jsx
<RangeSlider size="small" />
<RangeSlider size="medium" />
<RangeSlider size="large" />
```

### Styles

```jsx
<RangeSlider variant="default" />
<RangeSlider variant="outlined" />
<RangeSlider variant="filled" />
<RangeSlider variant="gradient" />
<RangeSlider variant="rounded" />
<RangeSlider variant="success" />
<RangeSlider variant="warning" />
<RangeSlider variant="error" />
```

## Exemples

### Curseur simple basique

```jsx
<RangeSlider
  min={0}
  max={100}
  value={50}
  onValueChange={(value) => console.log('Nouvelle valeur:', value)}
  label="Volume"
/>
```

### Curseur double avec formatage

```jsx
<RangeSlider
  min={0}
  max={1000}
  range={true}
  minValue={200}
  maxValue={800}
  onRangeChange={(min, max) => console.log('Plage:', min, '-', max)}
  formatValue={(value) => `${value}€`}
  label="Plage de prix"
  minLabel="Min"
  maxLabel="Max"
/>
```

### Curseur avec marqueurs

```jsx
<RangeSlider
  min={0}
  max={10}
  step={1}
  showTicks={true}
  showTooltip={true}
  label="Note"
  formatValue={(value) => `${value}/10`}
/>
```

### Curseur vertical

```jsx
<RangeSlider
  min={0}
  max={100}
  orientation="vertical"
  value={75}
  onValueChange={setValue}
  label="Hauteur"
/>
```

### Curseur avec marqueurs personnalisés

```jsx
<RangeSlider
  min={0}
  max={100}
  ticks={[0, 25, 50, 75, 100]}
  showTicks={true}
  formatValue={(value) => {
    const labels = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert', 'Maître'];
    return labels[Math.floor(value / 25)];
  }}
  label="Niveau"
/>
```

### Curseur avec validation

```jsx
const [price, setPrice] = useState(500);

<RangeSlider
  min={100}
  max={1000}
  value={price}
  onValueChange={setPrice}
  variant={price > 800 ? 'warning' : price > 600 ? 'success' : 'default'}
  label="Prix"
  formatValue={(value) => `${value}€`}
/>
```

## Navigation au clavier

Le composant supporte la navigation au clavier :

- **Flèches** : Incrémente/décrémente par `step`
- **Shift + Flèches** : Incrémente/décrémente par `step * 10`
- **Home** : Va à la valeur minimale
- **End** : Va à la valeur maximale
- **Tab** : Navigation entre les curseurs

## Accessibilité

- Support complet des attributs ARIA (`role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`)
- Navigation au clavier
- Labels descriptifs
- Support des lecteurs d'écran
- Focus visible

## Notes techniques

- Support du drag & drop natif
- Gestion des événements tactiles
- Calcul automatique des positions
- Contraintes automatiques pour les curseurs doubles
- Performance optimisée avec `useCallback`
- Responsive design intégré


