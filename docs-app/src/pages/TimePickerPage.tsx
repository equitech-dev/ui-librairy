import React, { useState } from 'react';

const TimePickerPage: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [selectedTime24, setSelectedTime24] = useState('14:30');
  const [selectedTimeRange, setSelectedTimeRange] = useState({ start: '08:00', end: '17:00' });
  const [selectedTimeWithSeconds, setSelectedTimeWithSeconds] = useState('10:30:45');

  const timeOptions = [
    '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30',
    '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30',
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
  ];

  const formatTime12 = (time24: string) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Time Picker</h1>
        <p className="section-description">
          Composant de sélection d'heure avec support des formats 12h/24h, plages horaires et personnalisation avancée. 
          Offre une interface intuitive pour la gestion des créneaux horaires.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Time Picker basique</h3>
          <div className="demo-content">
            <p>Sélection d'heure simple avec format 12h :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-time-picker-demo">
                <div className="ui-time-picker">
                  <label htmlFor="basic-time" className="ui-time-picker__label">
                    Heure de début
                  </label>
                  <div className="ui-time-picker__input-group">
                    <input
                      type="time"
                      id="basic-time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="ui-time-picker__input"
                    />
                    <span className="ui-time-picker__format">12h</span>
                  </div>
                  <div className="ui-time-picker__display">
                    Heure sélectionnée : <strong>{formatTime12(selectedTime)}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { TimePicker } from '@equitech-dev/ui-library';
         
const [selectedTime, setSelectedTime] = useState('09:00');
         
<TimePicker
  value={selectedTime}
  onChange={setSelectedTime}
  label="Heure de début"
  format="12h"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Time Picker avec format 24h</h3>
          <div className="demo-content">
            <p>Sélection d'heure avec format 24h :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-time-picker-demo">
                <div className="ui-time-picker">
                  <label htmlFor="time-24h" className="ui-time-picker__label">
                    Heure de fin
                  </label>
                  <div className="ui-time-picker__input-group">
                    <input
                      type="time"
                      id="time-24h"
                      value={selectedTime24}
                      onChange={(e) => setSelectedTime24(e.target.value)}
                      className="ui-time-picker__input"
                    />
                    <span className="ui-time-picker__format">24h</span>
                  </div>
                  <div className="ui-time-picker__display">
                    Heure sélectionnée : <strong>{selectedTime24}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<TimePicker
  value={selectedTime}
  onChange={setSelectedTime}
  label="Heure de fin"
  format="24h"
  showSeconds={false}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Time Picker avec secondes</h3>
          <div className="demo-content">
            <p>Sélection d'heure incluant les secondes :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-time-picker-demo">
                <div className="ui-time-picker">
                  <label htmlFor="time-seconds" className="ui-time-picker__label">
                    Heure précise
                  </label>
                  <div className="ui-time-picker__input-group">
                    <input
                      type="time"
                      id="time-seconds"
                      value={selectedTimeWithSeconds}
                      onChange={(e) => setSelectedTimeWithSeconds(e.target.value)}
                      className="ui-time-picker__input"
                      step="1"
                    />
                    <span className="ui-time-picker__format">24h</span>
                  </div>
                  <div className="ui-time-picker__display">
                    Heure sélectionnée : <strong>{selectedTimeWithSeconds}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<TimePicker
  value={selectedTime}
  onChange={setSelectedTime}
  label="Heure précise"
  format="24h"
  showSeconds={true}
  step={1}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Time Picker avec plage horaire</h3>
          <div className="demo-content">
            <p>Sélection d'une plage horaire (début et fin) :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-time-picker-demo">
                <div className="ui-time-picker-range">
                  <div className="ui-time-picker-range__item">
                    <label htmlFor="start-time" className="ui-time-picker__label">
                      Heure de début
                    </label>
                    <div className="ui-time-picker__input-group">
                      <input
                        type="time"
                        id="start-time"
                        value={selectedTimeRange.start}
                        onChange={(e) => setSelectedTimeRange(prev => ({ ...prev, start: e.target.value }))}
                        className="ui-time-picker__input"
                      />
                    </div>
                  </div>
                  
                  <div className="ui-time-picker-range__separator">
                    <span>à</span>
                  </div>
                  
                  <div className="ui-time-picker-range__item">
                    <label htmlFor="end-time" className="ui-time-picker__label">
                      Heure de fin
                    </label>
                    <div className="ui-time-picker__input-group">
                      <input
                        type="time"
                        id="end-time"
                        value={selectedTimeRange.end}
                        onChange={(e) => setSelectedTimeRange(prev => ({ ...prev, end: e.target.value }))}
                        className="ui-time-picker__input"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="ui-time-picker__display">
                  Plage sélectionnée : <strong>{formatTime12(selectedTimeRange.start)} - {formatTime12(selectedTimeRange.end)}</strong>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<TimeRangePicker
  startTime={startTime}
  endTime={endTime}
  onStartTimeChange={setStartTime}
  onEndTimeChange={setEndTime}
  label="Plage horaire"
  format="12h"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Time Picker avec options prédéfinies</h3>
          <div className="demo-content">
            <p>Sélection rapide parmi des heures prédéfinies :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-time-picker-demo">
                <div className="ui-time-picker">
                  <label className="ui-time-picker__label">
                    Heure rapide
                  </label>
                  <div className="ui-time-picker__quick-options">
                    {['08:00', '09:00', '10:00', '12:00', '14:00', '16:00', '18:00'].map(time => (
                      <button
                        key={time}
                        className={`ui-time-picker__quick-option ${selectedTime === time ? 'ui-time-picker__quick-option--selected' : ''}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {formatTime12(time)}
                      </button>
                    ))}
                  </div>
                  <div className="ui-time-picker__display">
                    Heure sélectionnée : <strong>{formatTime12(selectedTime)}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<TimePicker
  value={selectedTime}
  onChange={setSelectedTime}
  label="Heure rapide"
  quickOptions={['08:00', '09:00', '10:00', '12:00', '14:00', '16:00', '18:00']}
  format="12h"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Time Picker avec validation</h3>
          <div className="demo-content">
            <p>Time Picker avec validation et messages d'erreur :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-time-picker-demo">
                <div className="ui-time-picker ui-time-picker--error">
                  <label htmlFor="time-validation" className="ui-time-picker__label">
                    Heure avec validation
                  </label>
                  <div className="ui-time-picker__input-group">
                    <input
                      type="time"
                      id="time-validation"
                      value="25:00"
                      className="ui-time-picker__input ui-time-picker__input--error"
                      readOnly
                    />
                    <span className="ui-time-picker__format">24h</span>
                  </div>
                  <div className="ui-time-picker__error">
                    ⚠️ Heure invalide. Veuillez sélectionner une heure entre 00:00 et 23:59.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<TimePicker
  value={selectedTime}
  onChange={setSelectedTime}
  label="Heure avec validation"
  format="24h"
  minTime="00:00"
  maxTime="23:59"
  error="Heure invalide"
  onValidationError={handleValidationError}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Time Picker avec variantes</h3>
          <div className="demo-content">
            <p>Différentes variantes de Time Picker :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-time-picker-demo ui-time-picker-demo--variants">
                <div className="ui-time-picker-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Compact</h4>
                  <div className="ui-time-picker ui-time-picker--compact">
                    <input
                      type="time"
                      className="ui-time-picker__input ui-time-picker__input--compact"
                      value="09:00"
                      readOnly
                    />
                  </div>
                </div>
                
                <div className="ui-time-picker-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</h4>
                  <div className="ui-time-picker ui-time-picker--large">
                    <input
                      type="time"
                      className="ui-time-picker__input ui-time-picker__input--large"
                      value="14:30"
                      readOnly
                    />
                  </div>
                </div>
                
                <div className="ui-time-picker-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Bordered</h4>
                  <div className="ui-time-picker ui-time-picker--bordered">
                    <input
                      type="time"
                      className="ui-time-picker__input ui-time-picker__input--bordered"
                      value="16:45"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<TimePicker variant="compact" />
<TimePicker variant="large" />
<TimePicker variant="bordered" />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Time Picker en contexte</h3>
          <div className="demo-content">
            <p>Exemples d'utilisation dans des contextes réels :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-time-picker-demo ui-time-picker-demo--context">
                <div className="ui-time-picker-context">
                  <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Configuration des horaires de travail</h4>
                  
                  <div className="ui-time-picker-schedule">
                    <div className="ui-time-picker-schedule__item">
                      <span className="ui-time-picker-schedule__day">Lundi - Vendredi</span>
                      <div className="ui-time-picker-range">
                        <input type="time" value="09:00" className="ui-time-picker__input" readOnly />
                        <span>à</span>
                        <input type="time" value="18:00" className="ui-time-picker__input" readOnly />
                      </div>
                    </div>
                    
                    <div className="ui-time-picker-schedule__item">
                      <span className="ui-time-picker-schedule__day">Samedi</span>
                      <div className="ui-time-picker-range">
                        <input type="time" value="10:00" className="ui-time-picker__input" readOnly />
                        <span>à</span>
                        <input type="time" value="16:00" className="ui-time-picker__input" readOnly />
                      </div>
                    </div>
                    
                    <div className="ui-time-picker-schedule__item">
                      <span className="ui-time-picker-schedule__day">Dimanche</span>
                      <div className="ui-time-picker-schedule__closed">
                        Fermé
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<WorkSchedule>
  <TimeRangePicker
    label="Lundi - Vendredi"
    startTime="09:00"
    endTime="18:00"
    onChange={handleScheduleChange}
  />
  <TimeRangePicker
    label="Samedi"
    startTime="10:00"
    endTime="16:00"
    onChange={handleScheduleChange}
  />
  <TimeRangePicker
    label="Dimanche"
    startTime=""
    endTime=""
    disabled={true}
    placeholder="Fermé"
  />
</WorkSchedule>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant TimePicker :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>value</strong> : string (heure sélectionnée au format HH:MM ou HH:MM:SS)</li>
                <li><strong>onChange</strong> : (time: string) =&gt; void (callback de changement)</li>
                <li><strong>label</strong> : string (label du champ)</li>
                <li><strong>id</strong> : string (identifiant unique)</li>
                <li><strong>name</strong> : string (nom du champ)</li>
              </ul>
              
              <h4>Props de format :</h4>
              <ul>
                <li><strong>format</strong> : "12h" | "24h" (format d'affichage)</li>
                <li><strong>showSeconds</strong> : boolean (afficher les secondes)</li>
                <li><strong>step</strong> : number (pas de sélection en secondes)</li>
                <li><strong>timezone</strong> : string (fuseau horaire)</li>
              </ul>
              
              <h4>Props de validation :</h4>
              <ul>
                <li><strong>minTime</strong> : string (heure minimale)</li>
                <li><strong>maxTime</strong> : string (heure maximale)</li>
                <li><strong>required</strong> : boolean (champ requis)</li>
                <li><strong>error</strong> : string (message d'erreur)</li>
                <li><strong>onValidationError</strong> : (error: string) =&gt; void</li>
              </ul>
              
              <h4>Props de personnalisation :</h4>
              <ul>
                <li><strong>variant</strong> : "default" | "compact" | "large" | "bordered"</li>
                <li><strong>size</strong> : "small" | "medium" | "large"</li>
                <li><strong>placeholder</strong> : string (texte par défaut)</li>
                <li><strong>disabled</strong> : boolean (désactivation du champ)</li>
                <li><strong>readOnly</strong> : boolean (lecture seule)</li>
              </ul>
              
              <h4>Variants spécialisés :</h4>
              <ul>
                <li><strong>TimeRangePicker</strong> : Sélection de plage horaire</li>
                <li><strong>QuickTimePicker</strong> : Sélection rapide avec options prédéfinies</li>
                <li><strong>TimePickerWithSeconds</strong> : Picker avec secondes</li>
                <li><strong>TimePicker12h</strong> : Picker format 12h</li>
                <li><strong>TimePicker24h</strong> : Picker format 24h</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onFocus</strong> : (e: FocusEvent) =&gt; void</li>
                <li><strong>onBlur</strong> : (e: FocusEvent) =&gt; void</li>
                <li><strong>onKeyDown</strong> : (e: KeyboardEvent) =&gt; void</li>
                <li><strong>onTimeSelect</strong> : (time: string) =&gt; void</li>
                <li><strong>onTimeChange</strong> : (time: string) =&gt; void</li>
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
                <h4>Réservation de créneaux</h4>
                <p>Sélection d'horaires pour des rendez-vous et réservations.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Configuration des horaires</h4>
                <p>Définition des heures d'ouverture et de fermeture.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Planification de tâches</h4>
                <p>Gestion des créneaux horaires pour la planification.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimePickerPage;


