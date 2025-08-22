# 📅 DatePicker

Sélecteur de date avec calendrier interactif, validation et support des dates min/max.

## 📋 Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `Date \| null` | `null` | Date sélectionnée |
| `onChange` | `function` | - | Callback appelé lors de la sélection |
| `placeholder` | `string` | `'Sélectionner une date'` | Texte d'aide |
| `minDate` | `Date` | - | Date minimale autorisée |
| `maxDate` | `Date` | - | Date maximale autorisée |
| `disabled` | `boolean` | `false` | Désactive le sélecteur |
| `withIcon` | `boolean` | `true` | Afficher l'icône de calendrier |
| `format` | `string` | `'DD/MM/YYYY'` | Format d'affichage de la date |
| `locale` | `string` | `'fr-FR'` | Locale pour l'affichage |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `aria-label` | `string` | `'Sélecteur de date'` | Label pour l'accessibilité |

## 🚀 Exemple d'utilisation

```jsx
import { DatePicker } from '@equitech/ui-library';
import { useState } from 'react';

function MonComposant() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [meetingDate, setMeetingDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log('Date sélectionnée:', date);
  };

  // Date minimale (aujourd'hui)
  const today = new Date();
  
  // Date maximale (dans 1 an)
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <div className="ui-form">
      {/* DatePicker simple */}
      <div className="ui-form-group">
        <label className="ui-label">Date de naissance</label>
        <DatePicker
          value={birthDate}
          onChange={setBirthDate}
          placeholder="Votre date de naissance"
          maxDate={today}
        />
      </div>
      
      {/* DatePicker avec dates min/max */}
      <div className="ui-form-group">
        <label className="ui-label">Date de réunion</label>
        <DatePicker
          value={meetingDate}
          onChange={setMeetingDate}
          placeholder="Sélectionner une date de réunion"
          minDate={today}
          maxDate={maxDate}
        />
      </div>
      
      {/* DatePicker sans icône */}
      <div className="ui-form-group">
        <label className="ui-label">Date personnalisée</label>
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          withIcon={false}
          format="DD-MM-YYYY"
        />
      </div>
      
      {/* DatePicker désactivé */}
      <div className="ui-form-group">
        <label className="ui-label">Date (désactivé)</label>
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          disabled
        />
      </div>
    </div>
  );
}

// Utilisation dans un formulaire de réservation
function FormulaireReservation() {
  const [reservation, setReservation] = useState({
    checkIn: null,
    checkOut: null,
    guests: 1
  });

  const today = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const handleCheckInChange = (date) => {
    setReservation(prev => ({
      ...prev,
      checkIn: date,
      // Réinitialiser la date de départ si elle est antérieure
      checkOut: prev.checkOut && date && prev.checkOut < date ? null : prev.checkOut
    }));
  };

  const handleCheckOutChange = (date) => {
    setReservation(prev => ({
      ...prev,
      checkOut: date
    }));
  };

  return (
    <div className="ui-reservation-form">
      <h3>Réserver votre séjour</h3>
      
      <div className="ui-form-row">
        <div className="ui-form-group">
          <label className="ui-label">Date d'arrivée</label>
          <DatePicker
            value={reservation.checkIn}
            onChange={handleCheckInChange}
            placeholder="Date d'arrivée"
            minDate={today}
            maxDate={maxDate}
          />
        </div>
        
        <div className="ui-form-group">
          <label className="ui-label">Date de départ</label>
          <DatePicker
            value={reservation.checkOut}
            onChange={handleCheckOutChange}
            placeholder="Date de départ"
            minDate={reservation.checkIn || today}
            maxDate={maxDate}
            disabled={!reservation.checkIn}
          />
        </div>
      </div>
      
      <div className="ui-form-group">
        <label className="ui-label">Nombre de voyageurs</label>
        <select 
          value={reservation.guests}
          onChange={(e) => setReservation(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
          className="ui-select"
        >
          {[1, 2, 3, 4, 5, 6].map(num => (
            <option key={num} value={num}>{num} {num > 1 ? 'personnes' : 'personne'}</option>
          ))}
        </select>
      </div>
      
      <button 
        className="ui-button primary"
        disabled={!reservation.checkIn || !reservation.checkOut}
        onClick={() => console.log('Réservation:', reservation)}
      >
        Réserver maintenant
      </button>
    </div>
  );
}

// Utilisation avec validation personnalisée
function DatePickerAvecValidation() {
  const [date, setDate] = useState(null);
  const [error, setError] = useState('');

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setError('');

    if (newDate) {
      // Validation personnalisée
      const dayOfWeek = newDate.getDay();
      if (dayOfWeek === 0) { // Dimanche
        setError('Les réservations ne sont pas possibles le dimanche');
      } else if (dayOfWeek === 6) { // Samedi
        setError('Attention : tarif weekend appliqué');
      }
    }
  };

  return (
    <div className="ui-form-group">
      <label className="ui-label">Date de rendez-vous</label>
      <DatePicker
        value={date}
        onChange={handleDateChange}
        placeholder="Sélectionner une date"
        minDate={new Date()}
      />
      {error && <p className="ui-error-message">{error}</p>}
    </div>
  );
}
```

## ♿ Accessibilité

- **Navigation clavier** : Support complet avec Tab, Arrow keys, Enter et Escape
- **Focus visible** : Indicateur de focus clair sur tous les éléments
- **Support des lecteurs d'écran** : Compatible avec les technologies d'assistance
- **Attributs ARIA** : Rôles et labels appropriés pour le calendrier
- **Validation native** : Support des dates min/max avec messages d'erreur
- **Gestion des états** : États disabled, error, focus

## 🎨 Personnalisation

Le DatePicker utilise les classes CSS suivantes pour la personnalisation :

```scss
// Classes principales
.ui-datepicker { /* Conteneur principal */ }
.ui-datepicker-input { /* Champ de saisie */ }
.ui-datepicker-icon { /* Icône de calendrier */ }
.ui-datepicker-calendar { /* Calendrier popup */ }
.ui-datepicker-header { /* En-tête du calendrier */ }
.ui-datepicker-nav { /* Navigation du calendrier */ }
.ui-datepicker-grid { /* Grille des jours */ }
.ui-datepicker-day { /* Jour individuel */ }

// États
.ui-datepicker-day.today { /* Jour actuel */ }
.ui-datepicker-day.selected { /* Jour sélectionné */ }
.ui-datepicker-day.disabled { /* Jour désactivé */ }
.ui-datepicker-day.outside { /* Jour hors mois */ }
.ui-datepicker-day:hover { /* État hover */ }

// Exemple de personnalisation
.ui-datepicker {
  position: relative;
  display: inline-block;
  
  .ui-datepicker-input {
    padding: 0.75rem 1rem;
    padding-right: 2.5rem; // Espace pour l'icône
    border: 2px solid #d1d5db;
    border-radius: 0.5rem;
    font-size: 1rem;
    width: 100%;
    background: white;
    cursor: pointer;
    transition: border-color 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: #2BA985;
      box-shadow: 0 0 0 3px rgba(43, 169, 133, 0.1);
    }
    
    &:disabled {
      background: #f9fafb;
      color: #6b7280;
      cursor: not-allowed;
    }
  }
  
  .ui-datepicker-icon {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
    color: #6b7280;
    pointer-events: none;
  }
  
  .ui-datepicker-calendar {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    margin-top: 0.25rem;
    
    .ui-datepicker-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid #e5e7eb;
      
      .ui-datepicker-nav {
        display: flex;
        gap: 0.5rem;
        
        button {
          padding: 0.5rem;
          border: none;
          background: transparent;
          cursor: pointer;
          border-radius: 0.25rem;
          
          &:hover {
            background: #f3f4f6;
          }
        }
      }
      
      .ui-datepicker-title {
        font-weight: 600;
        color: #374151;
      }
    }
    
    .ui-datepicker-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1px;
      padding: 0.5rem;
      
      .ui-datepicker-day {
        padding: 0.5rem;
        text-align: center;
        cursor: pointer;
        border-radius: 0.25rem;
        transition: all 0.2s ease;
        
        &:hover:not(.disabled) {
          background: #f3f4f6;
        }
        
        &.today {
          background: #dbeafe;
          color: #1d4ed8;
          font-weight: 600;
        }
        
        &.selected {
          background: #2BA985;
          color: white;
          font-weight: 600;
        }
        
        &.disabled {
          color: #d1d5db;
          cursor: not-allowed;
        }
        
        &.outside {
          color: #9ca3af;
        }
      }
    }
  }
}
```

## 📱 Responsive

Le DatePicker s'adapte automatiquement aux différentes tailles d'écran :
- **Mobile** : Calendrier plein écran ou modal
- **Tablette/Desktop** : Popup positionné relativement au champ

### Classes utilitaires pour le responsive

```scss
// Calendrier plein écran sur mobile
@media screen and (max-width: 768px) {
  .ui-datepicker-calendar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    border-radius: 0;
    z-index: 9999;
    
    .ui-datepicker-grid {
      grid-template-columns: repeat(7, 1fr);
      
      .ui-datepicker-day {
        padding: 1rem 0.5rem;
        min-height: 44px; // Taille minimale pour le toucher
      }
    }
  }
}
```

## 🔧 Fonctionnalités

- **Sélection intuitive** : Navigation par clic ou clavier
- **Validation des dates** : Support des dates min/max
- **Format flexible** : Personnalisation du format d'affichage
- **Localisation** : Support de différentes locales
- **Accessibilité complète** : Support clavier et lecteurs d'écran
- **Performance optimisée** : Rendu efficace du calendrier

## 🎯 Cas d'usage

### DatePicker simple
```jsx
<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Sélectionner une date"
/>
```

### DatePicker avec contraintes
```jsx
<DatePicker
  value={date}
  onChange={setDate}
  minDate={new Date()}
  maxDate={maxDate}
  placeholder="Date future uniquement"
/>
```

### DatePicker personnalisé
```jsx
<DatePicker
  value={date}
  onChange={setDate}
  format="DD-MM-YYYY"
  locale="fr-FR"
  withIcon={false}
  className="custom-datepicker"
/>
```

### DatePicker désactivé
```jsx
<DatePicker
  value={date}
  onChange={setDate}
  disabled
  placeholder="Date non modifiable"
/>
```

## 📊 Gestion des états

### États du DatePicker
- **Vide** : Aucune date sélectionnée
- **Rempli** : Date sélectionnée affichée
- **Focus** : Calendrier ouvert
- **Disabled** : Sélecteur désactivé
- **Error** : Date invalide ou hors limites

### Validation
- **Dates min/max** : Contrôle des limites
- **Format** : Validation du format de saisie
- **Locale** : Gestion des formats régionaux
- **Personnalisée** : Validation métier spécifique
