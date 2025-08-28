# 🕐 TimePicker

Composant de sélection d'heure avec interface moderne et accessible.

## 📋 Fonctionnalités

- ✅ Sélection d'heure en format 12h ou 24h
- ✅ Support des secondes (optionnel)
- ✅ Contraintes min/max
- ✅ Pas de temps personnalisable
- ✅ Interface responsive
- ✅ Accessibilité complète (ARIA)
- ✅ Navigation clavier
- ✅ États d'erreur et de succès
- ✅ Tailles multiples (sm, md, lg)

## 🚀 Utilisation

```jsx
import { TimePicker } from 'ui-library';

function MyComponent() {
  const [time, setTime] = useState('');

  return (
    <TimePicker
      value={time}
      onChange={setTime}
      placeholder="Sélectionner une heure"
    />
  );
}
```

## 📖 Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `string` | `''` | Valeur sélectionnée (format HH:MM ou HH:MM:SS) |
| `onChange` | `function` | - | Callback appelé lors du changement de valeur |
| `placeholder` | `string` | `'Sélectionner une heure'` | Texte d'aide |
| `disabled` | `boolean` | `false` | Désactive le composant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du composant |
| `variant` | `'default' \| 'error' \| 'success'` | `'default'` | Variante visuelle |
| `showSeconds` | `boolean` | `false` | Affiche les secondes |
| `format` | `'12h' \| '24h'` | `'24h'` | Format d'affichage |
| `minTime` | `string` | - | Heure minimum autorisée |
| `maxTime` | `string` | - | Heure maximum autorisée |
| `step` | `number` | `15` | Pas entre les options (en minutes) |
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
<TimePicker
  value="14:30"
  onChange={(time) => console.log('Heure sélectionnée:', time)}
/>
```

### Avec contraintes

```jsx
<TimePicker
  value="09:00"
  onChange={setTime}
  minTime="08:00"
  maxTime="18:00"
  step={30}
  placeholder="Heure de travail"
/>
```

### Format 12h avec secondes

```jsx
<TimePicker
  value="02:30:45"
  onChange={setTime}
  format="12h"
  showSeconds={true}
  step={15}
/>
```

### États

```jsx
// État d'erreur
<TimePicker
  value=""
  onChange={setTime}
  error={true}
  placeholder="Heure invalide"
/>

// État de succès
<TimePicker
  value="15:00"
  onChange={setTime}
  success={true}
/>

// Désactivé
<TimePicker
  value="10:30"
  onChange={setTime}
  disabled={true}
/>
```

### Tailles

```jsx
<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
  <TimePicker size="sm" placeholder="Petit" />
  <TimePicker size="md" placeholder="Moyen" />
  <TimePicker size="lg" placeholder="Grand" />
</div>
```

## 🎯 Cas d'usage

### Formulaire de réservation

```jsx
function ReservationForm() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  return (
    <form>
      <div style={{ marginBottom: '1rem' }}>
        <label>Heure de début</label>
        <TimePicker
          value={startTime}
          onChange={setStartTime}
          minTime="08:00"
          maxTime="20:00"
          step={30}
        />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>Heure de fin</label>
        <TimePicker
          value={endTime}
          onChange={setEndTime}
          minTime={startTime || "08:00"}
          maxTime="22:00"
          step={30}
        />
      </div>
    </form>
  );
}
```

### Sélecteur de créneaux

```jsx
function TimeSlotSelector() {
  const [selectedSlot, setSelectedSlot] = useState('');

  const availableSlots = [
    '09:00', '09:30', '10:00', '10:30',
    '14:00', '14:30', '15:00', '15:30'
  ];

  return (
    <div>
      <h3>Sélectionner un créneau</h3>
      <TimePicker
        value={selectedSlot}
        onChange={setSelectedSlot}
        minTime="09:00"
        maxTime="16:00"
        step={30}
        placeholder="Choisir un créneau disponible"
      />
    </div>
  );
}
```

## ♿ Accessibilité

Le composant TimePicker respecte les standards d'accessibilité WCAG 2.1 :

- **Rôles ARIA** : `combobox`, `listbox`, `option`
- **Attributs ARIA** : `aria-haspopup`, `aria-expanded`, `aria-selected`
- **Navigation clavier** : 
  - `Tab` : Navigation entre les éléments
  - `Enter` : Sélection/confirmation
  - `Escape` : Fermeture du dropdown
- **Lecteurs d'écran** : Labels et descriptions appropriés

## 🎨 Personnalisation

### Variables CSS

```scss
:root {
  --timepicker-border-radius: var(--border-radius-md);
  --timepicker-shadow: var(--shadow-lg);
  --timepicker-z-index: var(--z-index-dropdown);
}
```

### Classes CSS

```scss
.ui-timepicker {
  // Conteneur principal
}

.ui-timepicker__input {
  // Champ de saisie
}

.ui-timepicker__dropdown {
  // Dropdown des options
}

.ui-timepicker__option {
  // Option individuelle
}

.ui-timepicker__option--selected {
  // Option sélectionnée
}
```

## 🔧 Développement

### Structure des fichiers

```
TimePicker/
├── TimePicker.scss    # Styles du composant
├── TimePicker.jsx     # Composant React
├── index.js          # Export
└── README.md         # Documentation
```

### Tests

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import TimePicker from './TimePicker';

test('TimePicker opens dropdown on click', () => {
  render(<TimePicker />);
  
  const input = screen.getByRole('combobox');
  fireEvent.click(input);
  
  expect(screen.getByText('Sélectionner une heure')).toBeInTheDocument();
});
```

## 📝 Notes

- Le composant utilise un format de temps standard (HH:MM ou HH:MM:SS)
- Les contraintes min/max sont appliquées lors de la génération des options
- Le pas (step) détermine l'intervalle entre les options disponibles
- En mode responsive, le dropdown s'affiche en modal centré
- Le composant gère automatiquement la fermeture lors d'un clic extérieur


