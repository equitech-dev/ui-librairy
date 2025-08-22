function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useState, useEffect, useRef } from 'react';
import './DatePicker.scss';
const DatePicker = ({
  value,
  onChange,
  placeholder = 'Sélectionner une date',
  disabled = false,
  size = 'medium',
  // small, medium, large
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
    const handleClickOutside = event => {
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
  const formatDate = date => {
    if (!date) return '';
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  const getMonthName = date => {
    return date.toLocaleDateString('fr-FR', {
      month: 'long',
      year: 'numeric'
    });
  };
  const getDaysInMonth = date => {
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
  const isToday = date => {
    const today = new Date();
    return isSameDay(date, today);
  };
  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  };
  const isDateDisabled = date => {
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    return false;
  };
  const handleDateClick = day => {
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
  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleInputClick();
    }
  };
  const weekdays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const days = getDaysInMonth(currentDate);
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: datepickerRef,
    className: `ui-datepicker ${size} ${showIcon ? 'with-icon' : ''} ${className}`
  }, props), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "ui-datepicker-input",
    value: formatDate(selectedDate),
    placeholder: placeholder,
    onClick: handleInputClick,
    onKeyDown: handleKeyDown,
    readOnly: true,
    disabled: disabled,
    role: "button",
    "aria-haspopup": "true",
    "aria-expanded": isOpen
  }), showIcon && /*#__PURE__*/React.createElement("div", {
    className: "ui-datepicker-icon"
  }), /*#__PURE__*/React.createElement("div", {
    className: `ui-datepicker-calendar ${isOpen ? 'open' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "ui-datepicker-header"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "ui-datepicker-title"
  }, getMonthName(currentDate)), /*#__PURE__*/React.createElement("div", {
    className: "ui-datepicker-nav"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ui-datepicker-nav-button prev",
    onClick: handlePrevMonth,
    "aria-label": "Mois pr\xE9c\xE9dent"
  }), /*#__PURE__*/React.createElement("button", {
    className: "ui-datepicker-nav-button next",
    onClick: handleNextMonth,
    "aria-label": "Mois suivant"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ui-datepicker-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ui-datepicker-weekdays"
  }, weekdays.map((day, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "ui-datepicker-weekday"
  }, day))), /*#__PURE__*/React.createElement("div", {
    className: "ui-datepicker-days"
  }, days.map((day, index) => /*#__PURE__*/React.createElement("button", {
    key: index,
    className: `ui-datepicker-day ${day.isCurrentMonth ? '' : 'other-month'} ${day.isToday ? 'today' : ''} ${day.isSelected ? 'selected' : ''} ${day.isDisabled ? 'disabled' : ''}`,
    onClick: () => handleDateClick(day),
    disabled: day.isDisabled,
    "aria-label": day.date.toLocaleDateString('fr-FR'),
    "aria-selected": day.isSelected
  }, day.date.getDate())))), /*#__PURE__*/React.createElement("div", {
    className: "ui-datepicker-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ui-datepicker-current-date"
  }, selectedDate ? formatDate(selectedDate) : 'Aucune date sélectionnée'), /*#__PURE__*/React.createElement("div", {
    className: "ui-datepicker-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ui-datepicker-button secondary",
    onClick: () => setIsOpen(false)
  }, "Annuler"), /*#__PURE__*/React.createElement("button", {
    className: "ui-datepicker-button primary",
    onClick: () => setIsOpen(false)
  }, "Valider")))));
};
export default DatePicker;