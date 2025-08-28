import React, { useState } from 'react';

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Réunion équipe',
      date: new Date(2024, 0, 15),
      time: '10:00',
      duration: 60,
      type: 'meeting',
      color: 'var(--ui-primary-color)'
    },
    {
      id: 2,
      title: 'Déjeuner client',
      date: new Date(2024, 0, 16),
      time: '12:30',
      duration: 90,
      type: 'lunch',
      color: 'var(--ui-success-color)'
    },
    {
      id: 3,
      title: 'Deadline projet',
      date: new Date(2024, 0, 20),
      time: '17:00',
      duration: 0,
      type: 'deadline',
      color: 'var(--ui-error-color)'
    }
  ]);

  const getDaysInMonth = (date: Date) => {
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
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Jours du mois actuel
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      days.push({ date: currentDate, isCurrentMonth: true });
    }
    
    // Jours du mois suivant
    const remainingDays = 42 - days.length; // 6 semaines * 7 jours
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }
    
    return days;
  };

  const getWeekDays = () => {
    return ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  };

  const getMonthName = (date: Date) => {
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return months[date.getMonth()];
  };

  const getYear = (date: Date) => {
    return date.getFullYear();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    
    return (
      <div className="ui-calendar__month-view">
        <div className="ui-calendar__header">
          <button 
            className="ui-calendar__nav-btn"
            onClick={() => navigateMonth('prev')}
          >
            ◀
          </button>
          <h2 className="ui-calendar__title">
            {getMonthName(currentDate)} {getYear(currentDate)}
          </h2>
          <button 
            className="ui-calendar__nav-btn"
            onClick={() => navigateMonth('next')}
          >
            ▶
          </button>
        </div>
        
        <div className="ui-calendar__weekdays">
          {getWeekDays().map(day => (
            <div key={day} className="ui-calendar__weekday">{day}</div>
          ))}
        </div>
        
        <div className="ui-calendar__days">
          {days.map((day, index) => {
            const dayEvents = getEventsForDate(day.date);
            return (
              <div
                key={index}
                className={`ui-calendar__day ${
                  !day.isCurrentMonth ? 'ui-calendar__day--other-month' : ''
                } ${
                  isToday(day.date) ? 'ui-calendar__day--today' : ''
                } ${
                  isSelected(day.date) ? 'ui-calendar__day--selected' : ''
                }`}
                onClick={() => setSelectedDate(day.date)}
              >
                <span className="ui-calendar__day-number">
                  {day.date.getDate()}
                </span>
                
                {dayEvents.length > 0 && (
                  <div className="ui-calendar__day-events">
                    {dayEvents.slice(0, 2).map(event => (
                      <div
                        key={event.id}
                        className="ui-calendar__event-indicator"
                        style={{ backgroundColor: event.color }}
                        title={event.title}
                      />
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="ui-calendar__more-events">
                        +{dayEvents.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    const dayOfWeek = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      weekDays.push(day);
    }
    
    return (
      <div className="ui-calendar__week-view">
        <div className="ui-calendar__header">
          <button 
            className="ui-calendar__nav-btn"
            onClick={() => navigateWeek('prev')}
          >
            ◀
          </button>
          <h2 className="ui-calendar__title">
            Semaine du {startOfWeek.getDate()} {getMonthName(startOfWeek)}
          </h2>
          <button 
            className="ui-calendar__nav-btn"
            onClick={() => navigateWeek('next')}
          >
            ▶
          </button>
        </div>
        
        <div className="ui-calendar__week-grid">
          <div className="ui-calendar__time-column">
            <div className="ui-calendar__time-header">Heure</div>
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} className="ui-calendar__time-slot">
                {i.toString().padStart(2, '0')}:00
              </div>
            ))}
          </div>
          
          {weekDays.map(day => (
            <div key={day.toDateString()} className="ui-calendar__day-column">
              <div className="ui-calendar__day-header">
                <div className="ui-calendar__day-name">
                  {getWeekDays()[day.getDay()]}
                </div>
                <div className="ui-calendar__day-date">
                  {day.getDate()}
                </div>
              </div>
              
              {Array.from({ length: 24 }, (_, hour) => {
                const hourEvents = events.filter(event => 
                  event.date.toDateString() === day.toDateString() &&
                  parseInt(event.time.split(':')[0]) === hour
                );
                
                return (
                  <div key={hour} className="ui-calendar__time-slot">
                    {hourEvents.map(event => (
                      <div
                        key={event.id}
                        className="ui-calendar__week-event"
                        style={{ backgroundColor: event.color }}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dayEvents = events.filter(event => 
      event.date.toDateString() === currentDate.toDateString()
    );
    
    return (
      <div className="ui-calendar__day-view">
        <div className="ui-calendar__header">
          <button 
            className="ui-calendar__nav-btn"
            onClick={() => navigateDay('prev')}
          >
            ◀
          </button>
          <h2 className="ui-calendar__title">
            {currentDate.getDate()} {getMonthName(currentDate)} {getYear(currentDate)}
          </h2>
          <button 
            className="ui-calendar__nav-btn"
            onClick={() => navigateDay('next')}
          >
            ▶
          </button>
        </div>
        
        <div className="ui-calendar__day-timeline">
          {Array.from({ length: 24 }, (_, hour) => {
            const hourEvents = dayEvents.filter(event => 
              parseInt(event.time.split(':')[0]) === hour
            );
            
            return (
              <div key={hour} className="ui-calendar__timeline-hour">
                <div className="ui-calendar__timeline-time">
                  {hour.toString().padStart(2, '0')}:00
                </div>
                <div className="ui-calendar__timeline-content">
                  {hourEvents.map(event => (
                    <div
                      key={event.id}
                      className="ui-calendar__timeline-event"
                      style={{ backgroundColor: event.color }}
                    >
                      <div className="ui-calendar__event-time">{event.time}</div>
                      <div className="ui-calendar__event-title">{event.title}</div>
                      {event.duration > 0 && (
                        <div className="ui-calendar__event-duration">
                          {event.duration} min
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderEventList = () => {
    const sortedEvents = [...events].sort((a, b) => 
      new Date(a.date.getTime() + a.time).getTime() - 
      new Date(b.date.getTime() + b.time).getTime()
    );
    
    return (
      <div className="ui-calendar__event-list">
        <h3 className="ui-calendar__event-list-title">Événements à venir</h3>
        {sortedEvents.map(event => (
          <div key={event.id} className="ui-calendar__event-item">
            <div 
              className="ui-calendar__event-color"
              style={{ backgroundColor: event.color }}
            />
            <div className="ui-calendar__event-content">
              <div className="ui-calendar__event-title">{event.title}</div>
              <div className="ui-calendar__event-details">
                {event.date.toLocaleDateString()} à {event.time}
                {event.duration > 0 && ` (${event.duration} min)`}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Calendar</h1>
        <p className="section-description">
          Composant de calendrier pour afficher et gérer des événements dans le temps. Permet de visualiser des dates, de naviguer entre les périodes et d'afficher des événements de manière organisée.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Calendar basique</h3>
          <div className="demo-content">
            <p>Calendrier simple avec vue mensuelle :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-calendar-demo">
                <div className="ui-calendar">
                  {renderMonthView()}
                </div>
                
                <div style={{ marginTop: '1rem' }}>
                  <div className="ui-calendar__info">
                    <p><strong>Date sélectionnée :</strong> {selectedDate ? selectedDate.toLocaleDateString() : 'Aucune'}</p>
                    <p><strong>Vue actuelle :</strong> {viewMode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { Calendar } from '@equitech-dev/ui-library';

const [currentDate, setCurrentDate] = useState(new Date());
const [selectedDate, setSelectedDate] = useState(null);

<Calendar
  currentDate={currentDate}
  selectedDate={selectedDate}
  onDateSelect={setSelectedDate}
  viewMode="month"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Calendar avec événements</h3>
          <div className="demo-content">
            <p>Calendrier avec affichage des événements :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-calendar-demo">
                <div className="ui-calendar ui-calendar--with-events">
                  {renderMonthView()}
                </div>
                
                {renderEventList()}
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Calendar
  currentDate={currentDate}
  events={events}
  showEventIndicators={true}
  onEventClick={handleEventClick}
  eventColors={{
    meeting: 'primary',
    lunch: 'success',
    deadline: 'error'
  }}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Calendar avec vues multiples</h3>
          <div className="demo-content">
            <p>Calendrier avec différentes vues (mois, semaine, jour) :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-calendar-demo">
                <div className="ui-calendar__view-controls">
                  <button
                    className={`ui-button ${viewMode === 'month' ? 'ui-button--primary' : 'ui-button--outline'}`}
                    onClick={() => setViewMode('month')}
                  >
                    Mois
                  </button>
                  <button
                    className={`ui-button ${viewMode === 'week' ? 'ui-button--primary' : 'ui-button--outline'}`}
                    onClick={() => setViewMode('week')}
                  >
                    Semaine
                  </button>
                  <button
                    className={`ui-button ${viewMode === 'day' ? 'ui-button--primary' : 'ui-button--outline'}`}
                    onClick={() => setViewMode('day')}
                  >
                    Jour
                  </button>
                </div>
                
                <div className="ui-calendar">
                  {viewMode === 'month' && renderMonthView()}
                  {viewMode === 'week' && renderWeekView()}
                  {viewMode === 'day' && renderDayView()}
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Calendar
  currentDate={currentDate}
  viewMode={viewMode}
  onViewModeChange={setViewMode}
  showViewControls={true}
  views={['month', 'week', 'day']}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Calendar avec navigation</h3>
          <div className="demo-content">
            <p>Calendrier avec navigation avancée et raccourcis :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-calendar-demo">
                <div className="ui-calendar__navigation">
                  <button
                    className="ui-button ui-button--outline"
                    onClick={() => setCurrentDate(new Date())}
                  >
                    Aujourd'hui
                  </button>
                  
                  <div className="ui-calendar__nav-group">
                    <button
                      className="ui-button ui-button--outline"
                      onClick={() => navigateMonth('prev')}
                    >
                      ◀ Mois précédent
                    </button>
                    <button
                      className="ui-button ui-button--outline"
                      onClick={() => navigateMonth('next')}
                    >
                      Mois suivant ▶
                    </button>
                  </div>
                </div>
                
                <div className="ui-calendar">
                  {renderMonthView()}
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Calendar
  currentDate={currentDate}
  onNavigate={setCurrentDate}
  showTodayButton={true}
  showNavigation={true}
  navigationButtons={['prev', 'next', 'today']}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Calendar avec sélection de dates</h3>
          <div className="demo-content">
            <p>Calendrier avec sélection de dates et plages :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-calendar-demo">
                <div className="ui-calendar ui-calendar--selectable">
                  {renderMonthView()}
                </div>
                
                <div style={{ marginTop: '1rem' }}>
                  <div className="ui-calendar__selection-info">
                    <p><strong>Date sélectionnée :</strong> {selectedDate ? selectedDate.toLocaleDateString() : 'Aucune'}</p>
                    <p><strong>Jour de la semaine :</strong> {selectedDate ? getWeekDays()[selectedDate.getDay()] : '-'}</p>
                    <p><strong>Événements ce jour :</strong> {selectedDate ? getEventsForDate(selectedDate).length : 0}</p>
                  </div>
                  
                  <button
                    className="ui-button ui-button--outline"
                    onClick={() => setSelectedDate(null)}
                    disabled={!selectedDate}
                  >
                    Effacer la sélection
                  </button>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<SelectableCalendar
  currentDate={currentDate}
  selectedDate={selectedDate}
  onDateSelect={setSelectedDate}
  selectable={true}
  showSelectionInfo={true}
  selectionMode="single"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Calendar avec variantes</h3>
          <div className="demo-content">
            <p>Différentes variantes de calendrier selon le contexte :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-calendar-demo ui-calendar-demo--variants">
                <div className="ui-calendar-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Compact</h4>
                  <div className="ui-calendar ui-calendar--compact">
                    {renderMonthView()}
                  </div>
                </div>
                
                <div className="ui-calendar-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</h4>
                  <div className="ui-calendar ui-calendar--large">
                    {renderMonthView()}
                  </div>
                </div>
                
                <div className="ui-calendar-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Bordered</h4>
                  <div className="ui-calendar ui-calendar--bordered">
                    {renderMonthView()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Calendar variant="compact" currentDate={currentDate} />
<Calendar variant="large" currentDate={currentDate} />
<Calendar variant="bordered" currentDate={currentDate} />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant Calendar :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>currentDate</strong> : Date (date actuellement affichée)</li>
                <li><strong>selectedDate</strong> : Date | null (date sélectionnée)</li>
                <li><strong>viewMode</strong> : "month" | "week" | "day"</li>
                <li><strong>events</strong> : array (événements à afficher)</li>
                <li><strong>selectable</strong> : boolean (sélection de dates possible)</li>
                <li><strong>showEventIndicators</strong> : boolean (affichage des indicateurs d'événements)</li>
              </ul>
              
              <h4>Props de navigation :</h4>
              <ul>
                <li><strong>onNavigate</strong> : (date: Date) =&gt; void</li>
                <li><strong>onDateSelect</strong> : (date: Date) =&gt; void</li>
                <li><strong>onViewModeChange</strong> : (mode: string) =&gt; void</li>
                <li><strong>showNavigation</strong> : boolean (affichage des boutons de navigation)</li>
                <li><strong>showTodayButton</strong> : boolean (bouton "Aujourd'hui")</li>
              </ul>
              
              <h4>Props de personnalisation :</h4>
              <ul>
                <li><strong>variant</strong> : "default" | "compact" | "large" | "bordered"</li>
                <li><strong>locale</strong> : string (locale pour la localisation)</li>
                <li><strong>firstDayOfWeek</strong> : number (premier jour de la semaine)</li>
                <li><strong>weekendDays</strong> : number[] (jours de weekend)</li>
                <li><strong>className</strong> : string (classe CSS personnalisée)</li>
                <li><strong>style</strong> : object (styles inline personnalisés)</li>
              </ul>
              
              <h4>Variants spécialisés :</h4>
              <ul>
                <li><strong>SelectableCalendar</strong> : Calendrier avec sélection de dates</li>
                <li><strong>EventCalendar</strong> : Calendrier avec gestion d'événements</li>
                <li><strong>RangeCalendar</strong> : Calendrier avec sélection de plages</li>
                <li><strong>MiniCalendar</strong> : Calendrier compact pour navigation</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onEventClick</strong> : (event: any) =&gt; void</li>
                <li><strong>onDateHover</strong> : (date: Date) =&gt; void</li>
                <li><strong>onMonthChange</strong> : (date: Date) =&gt; void</li>
                <li><strong>onYearChange</strong> : (date: Date) =&gt; void</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Cas d'usage courants</h3>
          <div className="demo-content">
            <p>Exemples d'utilisation dans des contextes réels :</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Planification de rendez-vous</h4>
                <p>Calendrier pour la prise de rendez-vous et la gestion d'agenda.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Gestion de projets</h4>
                <p>Calendrier pour visualiser les échéances et jalons de projets.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Réservation de ressources</h4>
                <p>Calendrier pour la réservation de salles, équipements ou services.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;


