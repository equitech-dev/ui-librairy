import React, { useState, useEffect, useRef } from 'react';
import './DatePicker.scss';

const DatePicker = ({
  value,
  onChange,
  placeholder = 'Sélectionner une date',
  disabled = false,
  size = 'medium', // small, medium, large
  showIcon = true,
  className = '',
  minDate,
  maxDate,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(value ? new Date(value) : new Date());
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  const datepickerRef = useRef(null);

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
      setCurrentDate(new Date(value));
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datepickerRef.current && !datepickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getMonthName = (date) => {
    return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    
    // Jours du mois précédent
    for (let i = startingDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        isToday: isToday(prevDate),
        isSelected: selectedDate && isSameDay(prevDate, selectedDate),
        isDisabled: isDateDisabled(prevDate)
      });
    }

    // Jours du mois actuel
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      days.push({
        date: currentDate,
        isCurrentMonth: true,
        isToday: isToday(currentDate),
        isSelected: selectedDate && isSameDay(currentDate, selectedDate),
        isDisabled: isDateDisabled(currentDate)
      });
    }

    // Jours du mois suivant
    const remainingDays = 42 - days.length; // 6 semaines * 7 jours
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        isToday: isToday(nextDate),
        isSelected: selectedDate && isSameDay(nextDate, selectedDate),
        isDisabled: isDateDisabled(nextDate)
      });
    }

    return days;
  };

  const isToday = (date) => {
    const today = new Date();
    return isSameDay(date, today);
  };

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const isDateDisabled = (date) => {
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    return false;
  };

  const handleDateClick = (day) => {
    if (day.isDisabled) return;
    
    setSelectedDate(day.date);
    onChange?.(day.date);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleInputClick();
    }
  };

  const weekdays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const days = getDaysInMonth(currentDate);

  return (
    <div 
      ref={datepickerRef}
      className={`ui-datepicker ${size} ${showIcon ? 'with-icon' : ''} ${className}`}
      {...props}
    >
      <input
        type="text"
        className="ui-datepicker-input"
        value={formatDate(selectedDate)}
        placeholder={placeholder}
        onClick={handleInputClick}
        onKeyDown={handleKeyDown}
        readOnly
        disabled={disabled}
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      />
      
      {showIcon && (
        <div className="ui-datepicker-icon" />
      )}

      <div className={`ui-datepicker-calendar ${isOpen ? 'open' : ''}`}>
        <div className="ui-datepicker-header">
          <h3 className="ui-datepicker-title">
            {getMonthName(currentDate)}
          </h3>
          <div className="ui-datepicker-nav">
            <button
              className="ui-datepicker-nav-button prev"
              onClick={handlePrevMonth}
              aria-label="Mois précédent"
            />
            <button
              className="ui-datepicker-nav-button next"
              onClick={handleNextMonth}
              aria-label="Mois suivant"
            />
          </div>
        </div>

        <div className="ui-datepicker-body">
          <div className="ui-datepicker-weekdays">
            {weekdays.map((day, index) => (
              <div key={index} className="ui-datepicker-weekday">
                {day}
              </div>
            ))}
          </div>

          <div className="ui-datepicker-days">
            {days.map((day, index) => (
              <button
                key={index}
                className={`ui-datepicker-day ${
                  day.isCurrentMonth ? '' : 'other-month'
                } ${
                  day.isToday ? 'today' : ''
                } ${
                  day.isSelected ? 'selected' : ''
                } ${
                  day.isDisabled ? 'disabled' : ''
                }`}
                onClick={() => handleDateClick(day)}
                disabled={day.isDisabled}
                aria-label={day.date.toLocaleDateString('fr-FR')}
                aria-selected={day.isSelected}
              >
                {day.date.getDate()}
              </button>
            ))}
          </div>
        </div>

        <div className="ui-datepicker-footer">
          <div className="ui-datepicker-current-date">
            {selectedDate ? formatDate(selectedDate) : 'Aucune date sélectionnée'}
          </div>
          <div className="ui-datepicker-actions">
            <button
              className="ui-datepicker-button secondary"
              onClick={() => setIsOpen(false)}
            >
              Annuler
            </button>
            <button
              className="ui-datepicker-button primary"
              onClick={() => setIsOpen(false)}
            >
              Valider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;

