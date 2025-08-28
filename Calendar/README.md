# Calendar - Calendrier Interactif

Composant de calendrier interactif avec support pour la navigation, la sélection de dates, les événements, et les vues multiples.

## ✨ Fonctionnalités

- **Navigation temporelle** : Navigation entre les mois et années
- **Sélection de dates** : Sélection simple ou multiple de dates
- **Affichage d'événements** : Visualisation des événements sur les dates
- **Vues multiples** : Vue mensuelle et hebdomadaire
- **Dates désactivées** : Support pour dates non sélectionnables
- **Plages de dates** : Limitation par date minimale et maximale
- **États visuels** : Aujourd'hui, sélection, autres mois
- **Accessibilité** : Support complet ARIA et navigation clavier
- **Responsive** : Adaptation mobile et tablette

## 🚀 Utilisation

```jsx
import Calendar from './Calendar';

const events = [
  {
    date: '2024-01-15',
    title: 'Réunion équipe',
    time: '14:00'
  },
  {
    date: '2024-01-20',
    title: 'Deadline projet',
    time: '18:00'
  }
];

function MyComponent() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <Calendar
      value={selectedDate}
      onSelect={(date) => setSelectedDate(date)}
      events={events}
      onViewChange={(view) => console.log('Vue changée:', view)}
      showNavigation={true}
      showViewSelector={true}
    />
  );
}
```

## 📋 Props

### Calendar

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `Date \| string` | - | Date sélectionnée |
| `onSelect` | `(date: Date) => void` | - | Callback de sélection |
| `events` | `Event[]` | `[]` | Liste des événements |
| `view` | `'month' \| 'week'` | `'month'` | Vue actuelle |
| `onViewChange` | `(view: string) => void` | - | Callback de changement de vue |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du composant |
| `variant` | `'default' \| 'compact' \| 'spacious' \| 'bordered' \| 'elevated'` | `'default'` | Style du composant |
| `showNavigation` | `boolean` | `true` | Afficher la navigation |
| `showViewSelector` | `boolean` | `true` | Afficher le sélecteur de vue |
| `showLegend` | `boolean` | `true` | Afficher la légende |
| `showActions` | `boolean` | `true` | Afficher les actions |
| `disabledDates` | `(Date \| string)[]` | `[]` | Dates désactivées |
| `minDate` | `Date \| string` | - | Date minimale |
| `maxDate` | `Date \| string` | - | Date maximale |
| `disabled` | `boolean` | `false` | Désactiver le composant |
| `loading` | `boolean` | `false` | État de chargement |
| `error` | `boolean` | `false` | État d'erreur |

### Event

| Prop | Type | Description |
|------|------|-------------|
| `date` | `Date \| string` | Date de l'événement |
| `title` | `string` | Titre de l'événement |
| `time` | `string` | Heure de l'événement |

## 📝 Exemples

### Calendrier basique

```jsx
<Calendar
  onSelect={(date) => console.log('Date sélectionnée:', date)}
/>
```

### Avec événements

```jsx
const events = [
  {
    date: '2024-01-15',
    title: 'Réunion équipe',
    time: '14:00'
  },
  {
    date: '2024-01-20',
    title: 'Deadline projet',
    time: '18:00'
  }
];

<Calendar
  events={events}
  onSelect={(date) => console.log('Date sélectionnée:', date)}
/>
```

### Avec dates désactivées

```jsx
const disabledDates = [
  '2024-01-01', // Nouvel an
  '2024-01-15', // Date spécifique
  new Date('2024-01-20') // Date passée
];

<Calendar
  disabledDates={disabledDates}
  onSelect={(date) => console.log('Date sélectionnée:', date)}
/>
```

### Avec plage de dates

```jsx
<Calendar
  minDate="2024-01-01"
  maxDate="2024-12-31"
  onSelect={(date) => console.log('Date sélectionnée:', date)}
/>
```

### Vue hebdomadaire

```jsx
<Calendar
  view="week"
  onViewChange={(view) => console.log('Vue changée:', view)}
  onSelect={(date) => console.log('Date sélectionnée:', date)}
/>
```

### Styles variés

```jsx
// Compact
<Calendar variant="compact" size="sm" />

// Spacieux avec bordure
<Calendar variant="spacious" size="lg" />

// Élevé avec ombre
<Calendar variant="elevated" />

// Avec bordure simple
<Calendar variant="bordered" />
```

### États

```jsx
// Chargement
<Calendar loading={true} />

// Erreur
<Calendar error={true} />

// Désactivé
<Calendar disabled={true} />

// Sans navigation
<Calendar showNavigation={false} />

// Sans sélecteur de vue
<Calendar showViewSelector={false} />
```

## 🎯 Cas d'usage

### Calendrier de réservation
```jsx
const reservationEvents = [
  {
    date: '2024-01-15',
    title: 'Réservation confirmée',
    time: '14:00'
  }
];

<Calendar
  events={reservationEvents}
  minDate={new Date()}
  onSelect={(date) => {
    // Logique de réservation
    console.log('Réservation pour:', date);
  }}
/>
```

### Calendrier d'événements
```jsx
const eventCalendar = [
  {
    date: '2024-01-20',
    title: 'Conférence tech',
    time: '09:00'
  },
  {
    date: '2024-01-25',
    title: 'Workshop design',
    time: '14:00'
  }
];

<Calendar
  events={eventCalendar}
  onSelect={(date) => {
    // Afficher les événements du jour
    const dayEvents = eventCalendar.filter(e => 
      new Date(e.date).toDateString() === date.toDateString()
    );
    console.log('Événements du jour:', dayEvents);
  }}
/>
```

### Calendrier de planning
```jsx
const planningEvents = [
  {
    date: '2024-01-10',
    title: 'Sprint planning',
    time: '10:00'
  },
  {
    date: '2024-01-17',
    title: 'Sprint review',
    time: '16:00'
  }
];

<Calendar
  events={planningEvents}
  disabledDates={['2024-01-01', '2024-01-02']} // Week-end
  onSelect={(date) => {
    // Créer un nouvel événement
    console.log('Nouvel événement pour:', date);
  }}
/>
```

## ♿ Accessibilité

- **Rôles ARIA** : `application`, `button`
- **Attributs** : `aria-label`, `aria-selected`, `aria-disabled`
- **Navigation clavier** : Tab, Espace, Entrée, Flèches
- **Focus visible** : Indicateurs de focus clairs
- **Écrans de lecture** : Support complet

## 🎨 Personnalisation

### Variables CSS

```scss
:root {
  --calendar-header-padding: var(--spacing-4);
  --calendar-body-padding: var(--spacing-4);
  --calendar-day-min-height: 40px;
  --calendar-day-padding: var(--spacing-2);
  --calendar-nav-button-size: 32px;
}
```

### Classes CSS

- `.ui-calendar` - Conteneur principal
- `.ui-calendar__header` - En-tête avec navigation
- `.ui-calendar__title` - Titre du mois/année
- `.ui-calendar__navigation` - Zone de navigation
- `.ui-calendar__nav-button` - Boutons de navigation
- `.ui-calendar__view-selector` - Sélecteur de vue
- `.ui-calendar__view-button` - Boutons de vue
- `.ui-calendar__body` - Corps du calendrier
- `.ui-calendar__weekdays` - En-têtes des jours
- `.ui-calendar__weekday` - En-tête d'un jour
- `.ui-calendar__grid` - Grille des jours
- `.ui-calendar__day` - Jour du calendrier
- `.ui-calendar__day-number` - Numéro du jour
- `.ui-calendar__events` - Liste des événements
- `.ui-calendar__event` - Événement individuel
- `.ui-calendar__footer` - Pied de page
- `.ui-calendar__legend` - Légende
- `.ui-calendar__actions` - Actions

## 🔧 Développement

### Structure des données

```typescript
interface CalendarEvent {
  date: Date | string;
  title: string;
  time?: string;
}

interface CalendarDay {
  date: Date;
  day: number;
  isOtherMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  hasEvents: boolean;
}
```

### Fonctions utilitaires

- **`getDaysInMonth(year, month)`** : Nombre de jours dans un mois
- **`getFirstDayOfMonth(year, month)`** : Premier jour de la semaine
- **`formatDate(date)`** : Formatage de date en français
- **`isSameDay(date1, date2)`** : Comparaison de dates
- **`isToday(date)`** : Vérification si c'est aujourd'hui

### Gestion des événements

- **Navigation** : Précédent/suivant mois
- **Sélection** : Clic sur un jour
- **Vue** : Changement entre mois/semaine
- **Aujourd'hui** : Retour à la date actuelle

### Performance

- **Rendu optimisé** : Utilisation de `useMemo` et `useCallback`
- **Calculs de dates** : Fonctions utilitaires optimisées
- **Événements** : Filtrage efficace par date


