import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

// Utilitaires de dates mémorisés
const createDateUtils = () => {
  const cache = new Map();
  
  return {
    getDaysInMonth: (year, month) => {
      const key = `${year}-${month}`;
      if (cache.has(key)) return cache.get(key);
      
      const days = new Date(year, month + 1, 0).getDate();
      cache.set(key, days);
      return days;
    },

    getFirstDayOfMonth: (year, month) => {
      const key = `first-${year}-${month}`;
      if (cache.has(key)) return cache.get(key);
      
      const day = new Date(year, month, 1).getDay();
      cache.set(key, day);
      return day;
    },

    formatDate: (date) => {
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long'
      });
    },

    isSameDay: (date1, date2) => {
      return date1.getFullYear() === date2.getFullYear() &&
             date1.getMonth() === date2.getMonth() &&
             date1.getDate() === date2.getDate();
    },

    isToday: (date) => {
      const today = new Date();
      return this.isSameDay(date, today);
    },

    isOtherMonth: (date, currentYear, currentMonth) => {
      return date.getFullYear() !== currentYear || date.getMonth() !== currentMonth;
    },

    clearCache: () => {
      cache.clear();
    }
  };
};

// Hook personnalisé pour la gestion des événements
const useEvents = (events = []) => {
  const eventsByDate = useMemo(() => {
    const indexed = new Map();
    
    events.forEach(event => {
      const dateKey = new Date(event.date).toDateString();
      if (!indexed.has(dateKey)) {
        indexed.set(dateKey, []);
      }
      indexed.get(dateKey).push(event);
    });
    
    return indexed;
  }, [events]);
  
  const getEventsForDate = useCallback((date) => {
    const dateKey = date.toDateString();
    return eventsByDate.get(dateKey) || [];
  }, [eventsByDate]);
  
  const hasEventsForDate = useCallback((date) => {
    const dateKey = date.toDateString();
    return eventsByDate.has(dateKey);
  }, [eventsByDate]);
  
  return {
    getEventsForDate,
    hasEventsForDate,
    eventsByDate
  };
};

// Composant de jour optimisé
const CalendarDay = React.memo(({
  day,
  date,
  isOtherMonth,
  isToday,
  isSelected,
  isDisabled,
  hasEvents,
  onClick,
  onDoubleClick,
  events
}) => {
  const handleClick = useCallback(() => {
    if (!isDisabled && onClick) {
      onClick(date);
    }
  }, [date, isDisabled, onClick]);
  
  const handleDoubleClick = useCallback(() => {
    if (!isDisabled && onDoubleClick) {
      onDoubleClick(date, events);
    }
  }, [date, isDisabled, onDoubleClick, events]);
  
  const dayClasses = [
    'ui-calendar-day',
    isOtherMonth && 'ui-calendar-day--other-month',
    isToday && 'ui-calendar-day--today',
    isSelected && 'ui-calendar-day--selected',
    isDisabled && 'ui-calendar-day--disabled',
    hasEvents && 'ui-calendar-day--has-events'
  ].filter(Boolean).join(' ');
  
  return (
    <div
      className={dayClasses}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-label={`${day} ${date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`}
      aria-selected={isSelected}
      aria-disabled={isDisabled}
    >
      <span className="ui-calendar-day-number">{day}</span>
      {hasEvents && (
        <div className="ui-calendar-day-events">
          {events.slice(0, 3).map((event, index) => (
            <div
              key={index}
              className="ui-calendar-day-event"
              style={{ backgroundColor: event.color || '#2BA985' }}
              title={event.title}
            />
          ))}
          {events.length > 3 && (
            <div className="ui-calendar-day-event-more">
              +{events.length - 3}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

// Composant de navigation optimisé
const CalendarNavigation = React.memo(({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onToday,
  showNavigation,
  showViewSelector,
  view,
  onViewChange
}) => {
  const handlePreviousMonth = useCallback(() => {
    if (onPreviousMonth) {
      onPreviousMonth();
    }
  }, [onPreviousMonth]);
  
  const handleNextMonth = useCallback(() => {
    if (onNextMonth) {
      onNextMonth();
    }
  }, [onNextMonth]);
  
  const handleToday = useCallback(() => {
    if (onToday) {
      onToday();
    }
  }, [onToday]);
  
  const handleViewChange = useCallback((newView) => {
    if (onViewChange) {
      onViewChange(newView);
    }
  }, [onViewChange]);
  
  if (!showNavigation) return null;
  
  return (
    <div className="ui-calendar-navigation">
      <div className="ui-calendar-navigation-controls">
        <button
          type="button"
          className="ui-calendar-nav-button"
          onClick={handlePreviousMonth}
          aria-label="Mois précédent"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        
        <button
          type="button"
          className="ui-calendar-nav-button ui-calendar-nav-button--today"
          onClick={handleToday}
        >
          Aujourd'hui
        </button>
        
        <button
          type="button"
          className="ui-calendar-nav-button"
          onClick={handleNextMonth}
          aria-label="Mois suivant"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      </div>
      
      <h2 className="ui-calendar-title">
        {currentDate.toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long'
        })}
      </h2>
      
      {showViewSelector && (
        <div className="ui-calendar-view-selector">
          <button
            type="button"
            className={`ui-calendar-view-button ${view === 'month' ? 'ui-calendar-view-button--active' : ''}`}
            onClick={() => handleViewChange('month')}
          >
            Mois
          </button>
          <button
            type="button"
            className={`ui-calendar-view-button ${view === 'week' ? 'ui-calendar-view-button--active' : ''}`}
            onClick={() => handleViewChange('week')}
          >
            Semaine
          </button>
        </div>
      )}
    </div>
  );
});

/**
 * Calendar Optimized - Calendar component with optimized date calculations and event handling
 * 
 * Props :
 * - value: Selected date value
 * - onSelect: Callback when date is selected (date)
 * - events: Array of events to display
 * - view: Calendar view - 'month' | 'week' (default: 'month')
 * - onViewChange: Callback when view changes (view)
 * - size: Calendar size - 'sm' | 'md' | 'lg' (default: 'md')
 * - variant: Calendar variant - 'default' | 'bordered' | 'compact' (default: 'default')
 * - showNavigation: Show navigation controls (default: true)
 * - showViewSelector: Show view selector (default: true)
 * - showLegend: Show event legend (default: true)
 * - showActions: Show action buttons (default: true)
 * - disabledDates: Array of disabled dates
 * - minDate: Minimum selectable date
 * - maxDate: Maximum selectable date
 * - className: Additional CSS classes
 * - id: Element ID
 * - name: Element name
 * - disabled: Disable calendar (default: false)
 * - loading: Loading state (default: false)
 * - error: Error state (default: false)
 * - ...props: Native props
 */
const CalendarOptimized = ({
  value,
  onSelect,
  events = [],
  view = 'month',
  onViewChange,
  size = 'md',
  variant = 'default',
  showNavigation = true,
  showViewSelector = true,
  showLegend = true,
  showActions = true,
  disabledDates = [],
  minDate,
  maxDate,
  className,
  id,
  name,
  disabled,
  loading,
  error,
  ...props
}) => {
  const [currentDate, setCurrentDate] = useState(value ? new Date(value) : new Date());
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  
  // Utilitaires de dates mémorisés
  const dateUtils = useMemo(() => createDateUtils(), []);
  
  // Gestion des événements optimisée
  const { getEventsForDate, hasEventsForDate } = useEvents(events);
  
  // Calculs mémorisés pour le mois actuel
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  // Génération des jours du mois mémorisée
  const calendarDays = useMemo(() => {
    const days = [];
    const daysInMonth = dateUtils.getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = dateUtils.getFirstDayOfMonth(currentYear, currentMonth);
    
    // Jours du mois précédent
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = dateUtils.getDaysInMonth(prevYear, prevMonth);
    
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const date = new Date(prevYear, prevMonth, day);
      const dayEvents = getEventsForDate(date);
      
      days.push({
        date,
        day,
        isOtherMonth: true,
        isToday: dateUtils.isToday(date),
        isSelected: selectedDate && dateUtils.isSameDay(date, selectedDate),
        isDisabled: disabledDates.some(d => dateUtils.isSameDay(date, new Date(d))) ||
                   (minDate && date < new Date(minDate)) ||
                   (maxDate && date > new Date(maxDate)),
        hasEvents: dayEvents.length > 0,
        events: dayEvents
      });
    }
    
    // Jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayEvents = getEventsForDate(date);
      
      days.push({
        date,
        day,
        isOtherMonth: false,
        isToday: dateUtils.isToday(date),
        isSelected: selectedDate && dateUtils.isSameDay(date, selectedDate),
        isDisabled: disabledDates.some(d => dateUtils.isSameDay(date, new Date(d))) ||
                   (minDate && date < new Date(minDate)) ||
                   (maxDate && date > new Date(maxDate)),
        hasEvents: dayEvents.length > 0,
        events: dayEvents
      });
    }
    
    // Jours du mois suivant
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    const remainingDays = 42 - days.length; // 6 semaines * 7 jours
    
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(nextYear, nextMonth, day);
      const dayEvents = getEventsForDate(date);
      
      days.push({
        date,
        day,
        isOtherMonth: true,
        isToday: dateUtils.isToday(date),
        isSelected: selectedDate && dateUtils.isSameDay(date, selectedDate),
        isDisabled: disabledDates.some(d => dateUtils.isSameDay(date, new Date(d))) ||
                   (minDate && date < new Date(minDate)) ||
                   (maxDate && date > new Date(maxDate)),
        hasEvents: dayEvents.length > 0,
        events: dayEvents
      });
    }
    
    return days;
  }, [currentYear, currentMonth, selectedDate, disabledDates, minDate, maxDate, dateUtils, getEventsForDate]);
  
  // Gestionnaires d'événements optimisés
  const handleDateSelect = useCallback((date) => {
    if (disabled) return;
    
    setSelectedDate(date);
    if (onSelect) {
      onSelect(date);
    }
  }, [disabled, onSelect]);
  
  const handleDateDoubleClick = useCallback((date, events) => {
    if (disabled) return;
    
    // Ici on pourrait ouvrir un modal pour voir les événements
    console.log('Événements pour', date, events);
  }, [disabled]);
  
  const handlePreviousMonth = useCallback(() => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  }, []);
  
  const handleNextMonth = useCallback(() => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  }, []);
  
  const handleToday = useCallback(() => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
    if (onSelect) {
      onSelect(today);
    }
  }, [onSelect]);
  
  // Classes CSS mémorisées
  const calendarClasses = useMemo(() => [
    'ui-calendar',
    `ui-calendar--${size}`,
    `ui-calendar--${variant}`,
    disabled && 'ui-calendar--disabled',
    loading && 'ui-calendar--loading',
    error && 'ui-calendar--error',
    className
  ].filter(Boolean).join(' '), [size, variant, disabled, loading, error, className]);
  
  // Jours de la semaine mémorisés
  const weekDays = useMemo(() => [
    'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'
  ], []);
  
  if (loading) {
    return (
      <div className={calendarClasses} {...props}>
        <div className="ui-calendar-loading">
          <div className="ui-loading-spinner"></div>
          <span>Chargement...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className={calendarClasses} {...props}>
      {/* Navigation */}
      <CalendarNavigation
        currentDate={currentDate}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
        showNavigation={showNavigation}
        showViewSelector={showViewSelector}
        view={view}
        onViewChange={onViewChange}
      />
      
      {/* En-têtes des jours */}
      <div className="ui-calendar-weekdays">
        {weekDays.map((day, index) => (
          <div key={index} className="ui-calendar-weekday">
            {day}
          </div>
        ))}
      </div>
      
      {/* Grille des jours */}
      <div className="ui-calendar-grid">
        {calendarDays.map((dayData, index) => (
          <CalendarDay
            key={`${dayData.date.toISOString()}-${index}`}
            day={dayData.day}
            date={dayData.date}
            isOtherMonth={dayData.isOtherMonth}
            isToday={dayData.isToday}
            isSelected={dayData.isSelected}
            isDisabled={dayData.isDisabled}
            hasEvents={dayData.hasEvents}
            events={dayData.events}
            onClick={handleDateSelect}
            onDoubleClick={handleDateDoubleClick}
          />
        ))}
      </div>
      
      {/* Légende des événements */}
      {showLegend && events.length > 0 && (
        <div className="ui-calendar-legend">
          <h4>Légende</h4>
          <div className="ui-calendar-legend-items">
            {events.slice(0, 5).map((event, index) => (
              <div key={index} className="ui-calendar-legend-item">
                <div
                  className="ui-calendar-legend-color"
                  style={{ backgroundColor: event.color || '#2BA985' }}
                />
                <span>{event.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

CalendarOptimized.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  onSelect: PropTypes.func,
  events: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string
  })),
  view: PropTypes.oneOf(['month', 'week']),
  onViewChange: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['default', 'bordered', 'compact']),
  showNavigation: PropTypes.bool,
  showViewSelector: PropTypes.bool,
  showLegend: PropTypes.bool,
  showActions: PropTypes.bool,
  disabledDates: PropTypes.array,
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

export default CalendarOptimized;
