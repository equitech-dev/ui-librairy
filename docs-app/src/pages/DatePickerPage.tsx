import React, { useState } from 'react';

const DatePickerPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [timeValue, setTimeValue] = useState<string>('');

  const formatDate = (date: Date | null): string => {
    if (!date) return 'Aucune date sélectionnée';
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateRange = (start: Date | null, end: Date | null): string => {
    if (!start && !end) return 'Aucune période sélectionnée';
    if (!start) return `Jusqu'au ${formatDate(end)}`;
    if (!end) return `À partir du ${formatDate(start)}`;
    return `Du ${formatDate(start)} au ${formatDate(end)}`;
  };

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">DatePicker</h1>
        <p className="section-description">
          Composant de sélection de dates pour permettre aux utilisateurs de choisir des dates de manière intuitive. Supporte la sélection de dates simples, de plages de dates et l'intégration avec des champs de saisie.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">DatePicker basique</h3>
          <div className="demo-content">
            <p>Sélection de date simple avec validation et formatage :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-datepicker-demo">
                <div className="ui-datepicker-demo__field">
                  <label className="ui-datepicker-demo__label">Date de naissance</label>
                  <div className="ui-datepicker-input">
                    <input 
                      type="date" 
                      className="ui-input ui-input--with-icon-left"
                      value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                      onChange={(e) => {
                        const date = e.target.value ? new Date(e.target.value) : null;
                        setSelectedDate(date);
                      }}
                    />
                    <span className="ui-datepicker-input__icon">📅</span>
                  </div>
                  <div className="ui-datepicker-demo__selected">
                    Date sélectionnée : <strong>{formatDate(selectedDate)}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { DatePicker } from '@equitech-dev/ui-library';

const [selectedDate, setSelectedDate] = useState<Date | null>(null);

<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  label="Date de naissance"
  placeholder="Sélectionner une date"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Sélection de plage de dates</h3>
          <div className="demo-content">
            <p>Sélection de période avec validation de cohérence :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-datepicker-demo ui-datepicker-demo--range">
                <div className="ui-datepicker-demo__field">
                  <label className="ui-datepicker-demo__label">Date de début</label>
                  <div className="ui-datepicker-input">
                    <input 
                      type="date" 
                      className="ui-input ui-input--with-icon-left"
                      value={startDate ? startDate.toISOString().split('T')[0] : ''}
                      onChange={(e) => {
                        const date = e.target.value ? new Date(e.target.value) : null;
                        setStartDate(date);
                        // Réinitialiser la date de fin si elle est antérieure
                        if (date && endDate && date > endDate) {
                          setEndDate(null);
                        }
                      }}
                    />
                    <span className="ui-datepicker-input__icon">📅</span>
                  </div>
                </div>
                
                <div className="ui-datepicker-demo__field">
                  <label className="ui-datepicker-demo__label">Date de fin</label>
                  <div className="ui-datepicker-input">
                    <input 
                      type="date" 
                      className="ui-input ui-input--with-icon-left"
                      value={endDate ? endDate.toISOString().split('T')[0] : ''}
                      min={startDate ? startDate.toISOString().split('T')[0] : undefined}
                      onChange={(e) => {
                        const date = e.target.value ? new Date(e.target.value) : null;
                        setEndDate(date);
                      }}
                    />
                    <span className="ui-datepicker-input__icon">📅</span>
                  </div>
                </div>
                
                <div className="ui-datepicker-demo__range-info">
                  <h4>Période sélectionnée :</h4>
                  <p><strong>{formatDateRange(startDate, endDate)}</strong></p>
                  {startDate && endDate && (
                    <div className="ui-datepicker-demo__duration">
                      Durée : <strong>{Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} jours</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<DateRangePicker
  startDate={startDate}
  endDate={endDate}
  onStartDateChange={setStartDate}
  onEndDateChange={setEndDate}
  minDate={new Date()}
  maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">DatePicker avec validation</h3>
          <div className="demo-content">
            <p>Validation des dates avec restrictions et messages d'erreur :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-datepicker-demo ui-datepicker-demo--validation">
                <div className="ui-datepicker-demo__field">
                  <label className="ui-datepicker-demo__label">Date de réservation</label>
                  <div className="ui-datepicker-input">
                    <input 
                      type="date" 
                      className="ui-input ui-input--with-icon-left"
                      min={new Date().toISOString().split('T')[0]}
                      max={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      onChange={(e) => {
                        const date = e.target.value ? new Date(e.target.value) : null;
                        setSelectedDate(date);
                      }}
                    />
                    <span className="ui-datepicker-input__icon">📅</span>
                  </div>
                  <div className="ui-datepicker-demo__validation">
                    <span className="ui-datepicker-demo__validation-rule">✅ Date minimum : Aujourd'hui</span>
                    <span className="ui-datepicker-demo__validation-rule">✅ Date maximum : Dans 90 jours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  minDate={new Date()}
  maxDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)}
  validationRules={[
    { type: 'minDate', message: 'La date doit être dans le futur' },
    { type: 'maxDate', message: 'La date ne peut pas dépasser 90 jours' }
  ]}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">DatePicker avec formatage personnalisé</h3>
          <div className="demo-content">
            <p>Différents formats de date selon les préférences régionales :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-datepicker-demo ui-datepicker-demo--formats">
                <div className="ui-datepicker-demo__format">
                  <h4>Format français (DD/MM/YYYY)</h4>
                  <div className="ui-datepicker-input">
                    <input 
                      type="text" 
                      className="ui-input ui-input--with-icon-left"
                      placeholder="JJ/MM/AAAA"
                      value={selectedDate ? selectedDate.toLocaleDateString('fr-FR') : ''}
                      readOnly
                    />
                    <span className="ui-datepicker-input__icon">🇫🇷</span>
                  </div>
                </div>
                
                <div className="ui-datepicker-demo__format">
                  <h4>Format américain (MM/DD/YYYY)</h4>
                  <div className="ui-datepicker-input">
                    <input 
                      type="text" 
                      className="ui-input ui-input--with-icon-left"
                      placeholder="MM/DD/YYYY"
                      value={selectedDate ? selectedDate.toLocaleDateString('en-US') : ''}
                      readOnly
                    />
                    <span className="ui-datepicker-input__icon">🇺🇸</span>
                  </div>
                </div>
                
                <div className="ui-datepicker-demo__format">
                  <h4>Format ISO (YYYY-MM-DD)</h4>
                  <div className="ui-datepicker-input">
                    <input 
                      type="text" 
                      className="ui-input ui-input--with-icon-left"
                      placeholder="YYYY-MM-DD"
                      value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                      readOnly
                    />
                    <span className="ui-datepicker-input__icon">🌐</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  format="DD/MM/YYYY"
  locale="fr-FR"
  placeholder="Sélectionner une date"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">DatePicker avec sélecteur de temps</h3>
          <div className="demo-content">
            <p>Combinaison de sélection de date et d'heure :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-datepicker-demo ui-datepicker-demo--datetime">
                <div className="ui-datepicker-demo__field">
                  <label className="ui-datepicker-demo__label">Date et heure de rendez-vous</label>
                  <div className="ui-datepicker-demo__datetime-inputs">
                    <div className="ui-datepicker-input">
                      <input 
                        type="date" 
                        className="ui-input ui-input--with-icon-left"
                        value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                        onChange={(e) => {
                          const date = e.target.value ? new Date(e.target.value) : null;
                          if (date && timeValue) {
                            const [hours, minutes] = timeValue.split(':');
                            date.setHours(parseInt(hours), parseInt(minutes));
                          }
                          setSelectedDate(date);
                        }}
                      />
                      <span className="ui-datepicker-input__icon">📅</span>
                    </div>
                    
                    <div className="ui-datepicker-input">
                      <input 
                        type="time" 
                        className="ui-input ui-input--with-icon-left"
                        value={timeValue}
                        onChange={(e) => {
                          setTimeValue(e.target.value);
                          if (selectedDate && e.target.value) {
                            const [hours, minutes] = e.target.value.split(':');
                            const newDate = new Date(selectedDate);
                            newDate.setHours(parseInt(hours), parseInt(minutes));
                            setSelectedDate(newDate);
                          }
                        }}
                      />
                      <span className="ui-datepicker-input__icon">🕐</span>
                    </div>
                  </div>
                  
                  <div className="ui-datepicker-demo__selected">
                    Rendez-vous : <strong>
                      {selectedDate ? selectedDate.toLocaleString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'Aucun rendez-vous sélectionné'}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<DateTimePicker
  value={selectedDateTime}
  onChange={setSelectedDateTime}
  showTime={true}
  timeFormat="24h"
  label="Date et heure de rendez-vous"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">DatePicker avec calendrier inline</h3>
          <div className="demo-content">
            <p>Affichage du calendrier directement dans l'interface :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-datepicker-demo ui-datepicker-demo--inline">
                <div className="ui-calendar">
                  <div className="ui-calendar__header">
                    <button className="ui-calendar__nav ui-calendar__nav--prev">‹</button>
                    <h3 className="ui-calendar__title">Août 2024</h3>
                    <button className="ui-calendar__nav ui-calendar__nav--next">›</button>
                  </div>
                  
                  <div className="ui-calendar__weekdays">
                    <span>Dim</span>
                    <span>Lun</span>
                    <span>Mar</span>
                    <span>Mer</span>
                    <span>Jeu</span>
                    <span>Ven</span>
                    <span>Sam</span>
                  </div>
                  
                  <div className="ui-calendar__days">
                    {Array.from({ length: 31 }, (_, i) => {
                      const day = i + 1;
                      const isToday = day === new Date().getDate() && new Date().getMonth() === 7;
                      const isSelected = selectedDate && selectedDate.getDate() === day;
                      
                      return (
                        <button
                          key={day}
                          className={`ui-calendar__day ${isToday ? 'ui-calendar__day--today' : ''} ${isSelected ? 'ui-calendar__day--selected' : ''}`}
                          onClick={() => {
                            const newDate = new Date(2024, 7, day);
                            setSelectedDate(newDate);
                          }}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                <div className="ui-datepicker-demo__inline-info">
                  <h4>Date sélectionnée :</h4>
                  <p><strong>{formatDate(selectedDate)}</strong></p>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  variant="inline"
  showCalendar={true}
  highlightToday={true}
  highlightSelected={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant DatePicker :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>value</strong> : Date | null (date sélectionnée)</li>
                <li><strong>onChange</strong> : function (callback de changement de date)</li>
                <li><strong>label</strong> : string (label du champ)</li>
                <li><strong>placeholder</strong> : string (texte d'aide)</li>
                <li><strong>format</strong> : string (format d'affichage)</li>
                <li><strong>locale</strong> : string (locale pour le formatage)</li>
                <li><strong>minDate</strong> : Date (date minimum autorisée)</li>
                <li><strong>maxDate</strong> : Date (date maximum autorisée)</li>
                <li><strong>disabled</strong> : boolean (désactiver le composant)</li>
                <li><strong>required</strong> : boolean (champ obligatoire)</li>
                <li><strong>showTime</strong> : boolean (afficher la sélection d'heure)</li>
                <li><strong>timeFormat</strong> : "12h" | "24h" (format d'heure)</li>
                <li><strong>variant</strong> : "default" | "inline" | "popup"</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onChange</strong> : (date: Date | null) =&gt; void</li>
                <li><strong>onFocus</strong> : (event: FocusEvent) =&gt; void</li>
                <li><strong>onBlur</strong> : (event: FocusEvent) =&gt; void</li>
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
                <h4>Formulaires de réservation</h4>
                <p>Sélection de dates pour des rendez-vous, réservations ou événements.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Filtres de recherche</h4>
                <p>Définition de périodes pour filtrer des données ou des résultats.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Rapports et analytics</h4>
                <p>Sélection de plages de dates pour générer des rapports périodiques.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePickerPage;


