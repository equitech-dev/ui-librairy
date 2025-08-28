import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

// Fonctions utilitaires pour les dates
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

const formatDate = (date) => {
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long'
  });
};

const isSameDay = (date1, date2) => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

const isToday = (date) => {
  return isSameDay(date, new Date());
};

const isOtherMonth = (date, currentYear, currentMonth) => {
  return date.getFullYear() !== currentYear || date.getMonth() !== currentMonth;
};

// Composant principal Calendar
const Calendar = ({
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
  
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  // Génération des jours du mois
  const calendarDays = useMemo(() => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    
    // Jours du mois précédent
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
    
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const date = new Date(prevYear, prevMonth, day);
      days.push({
        date,
        day,
        isOtherMonth: true,
        isToday: isToday(date),
        isSelected: selectedDate && isSameDay(date, selectedDate),
        isDisabled: disabledDates.some(d => isSameDay(date, new Date(d))) ||
                   (minDate && date < new Date(minDate)) ||
                   (maxDate && date > new Date(maxDate)),
        hasEvents: events.some(e => isSameDay(date, new Date(e.date)))
      });
    }
    
    // Jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      days.push({
        date,
        day,
        isOtherMonth: false,
        isToday: isToday(date),
        isSelected: selectedDate && isSameDay(date, selectedDate),
        isDisabled: disabledDates.some(d => isSameDay(date, new Date(d))) ||
                   (minDate && date < new Date(minDate)) ||
                   (maxDate && date > new Date(maxDate)),
        hasEvents: events.some(e => isSameDay(date, new Date(e.date)))
      });
    }
    
    // Jours du mois suivant
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    const remainingDays = 42 - days.length; // 6 semaines * 7 jours
    
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(nextYear, nextMonth, day);
      days.push({
        date,
        day,
        isOtherMonth: true,
        isToday: isToday(date),
        isSelected: selectedDate && isSameDay(date, selectedDate),
        isDisabled: disabledDates.some(d => isSameDay(date, new Date(d))) ||
                   (minDate && date < new Date(minDate)) ||
                   (maxDate && date > new Date(maxDate)),
        hasEvents: events.some(e => isSameDay(date, new Date(e.date)))
      });
    }
    
    return days;
  }, [currentYear, currentMonth, selectedDate, events, disabledDates, minDate, maxDate]);
  
  const handlePreviousMonth = useCallback(() => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (newDate.getMonth() === 0) {
        newDate.setFullYear(newDate.getFullYear() - 1);
        newDate.setMonth(11);
      } else {
        newDate.setMonth(newDate.getMonth() - 1);
      }
      return newDate;
    });
  }, []);
  
  const handleNextMonth = useCallback(() => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (newDate.getMonth() === 11) {
        newDate.setFullYear(newDate.getFullYear() + 1);
        newDate.setMonth(0);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
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
  
  const handleDayClick = useCallback((day) => {
    if (!day.isDisabled) {
      setSelectedDate(day.date);
      if (onSelect) {
        onSelect(day.date);
      }
    }
  }, [onSelect]);
  
  const handleViewChange = useCallback((newView) => {
    if (onViewChange) {
      onViewChange(newView);
    }
  }, [onViewChange]);
  
  const getEventsForDay = useCallback((date) => {
    return events.filter(event => isSameDay(new Date(event.date), date));
  }, [events]);
  
  const weekdays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  
  const calendarClasses = [
    'ui-calendar',
    `ui-calendar--${size}`,
    `ui-calendar--${variant}`,
    loading && 'ui-calendar--loading',
    error && 'ui-calendar--error',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div
      className={calendarClasses}
      role="application"
      aria-label="Calendrier"
      id={id}
      {...props}
    >
      {showNavigation && (
        <div className="ui-calendar__header">
          <h2 className="ui-calendar__title">
            {formatDate(currentDate)}
          </h2>
          
          <div className="ui-calendar__navigation">
            <button
              type="button"
              className="ui-calendar__nav-button"
              onClick={handlePreviousMonth}
              disabled={disabled}
              aria-label="Mois précédent"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            
            <button
              type="button"
              className="ui-calendar__nav-button"
              onClick={handleNextMonth}
              disabled={disabled}
              aria-label="Mois suivant"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>
            
            {showViewSelector && (
              <div className="ui-calendar__view-selector">
                <button
                  type="button"
                  className={`ui-calendar__view-button ${view === 'month' ? 'ui-calendar__view-button--active' : ''}`}
                  onClick={() => handleViewChange('month')}
                  disabled={disabled}
                >
                  Mois
                </button>
                <button
                  type="button"
                  className={`ui-calendar__view-button ${view === 'week' ? 'ui-calendar__view-button--active' : ''}`}
                  onClick={() => handleViewChange('week')}
                  disabled={disabled}
                >
                  Semaine
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="ui-calendar__body">
        <div className="ui-calendar__weekdays">
          {weekdays.map(day => (
            <div key={day} className="ui-calendar__weekday">
              {day}
            </div>
          ))}
        </div>
        
        <div className="ui-calendar__grid">
          {calendarDays.map((day, index) => {
            const dayClasses = [
              'ui-calendar__day',
              day.isSelected && 'ui-calendar__day--selected',
              day.isToday && 'ui-calendar__day--today',
              day.isOtherMonth && 'ui-calendar__day--other-month',
              day.isDisabled && 'ui-calendar__day--disabled',
              day.hasEvents && 'ui-calendar__day--has-events'
            ].filter(Boolean).join(' ');
            
            const dayEvents = getEventsForDay(day.date);
            
            return (
              <div
                key={index}
                className={dayClasses}
                onClick={() => handleDayClick(day)}
                tabIndex={day.isDisabled ? -1 : 0}
                role="button"
                aria-label={`${day.day} ${day.isToday ? '(aujourd\'hui)' : ''}`}
                aria-selected={day.isSelected}
                aria-disabled={day.isDisabled}
              >
                <span className="ui-calendar__day-number">{day.day}</span>
                
                {dayEvents.length > 0 && (
                  <div className="ui-calendar__events">
                    {dayEvents.map((event, eventIndex) => (
                      <div key={eventIndex} className="ui-calendar__event">
                        <div className="ui-calendar__event-title">{event.title}</div>
                        {event.time && (
                          <div className="ui-calendar__event-time">{event.time}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {(showLegend || showActions) && (
        <div className="ui-calendar__footer">
          {showLegend && (
            <div className="ui-calendar__legend">
              <div className="ui-calendar__legend-item">
                <div className="ui-calendar__legend-dot"></div>
                <span>Événements</span>
              </div>
            </div>
          )}
          
          {showActions && (
            <div className="ui-calendar__actions">
              <button
                type="button"
                className="ui-calendar__action"
                onClick={handleToday}
                disabled={disabled}
              >
                Aujourd'hui
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

Calendar.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  onSelect: PropTypes.func,
  events: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    title: PropTypes.string.isRequired,
    time: PropTypes.string
  })),
  view: PropTypes.oneOf(['month', 'week']),
  onViewChange: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['default', 'compact', 'spacious', 'bordered', 'elevated']),
  showNavigation: PropTypes.bool,
  showViewSelector: PropTypes.bool,
  showLegend: PropTypes.bool,
  showActions: PropTypes.bool,
  disabledDates: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])),
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

export default Calendar;


