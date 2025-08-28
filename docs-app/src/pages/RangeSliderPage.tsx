import React, { useState } from 'react';

const RangeSliderPage: React.FC = () => {
  const [priceRange, setPriceRange] = useState([20, 80]);
  const [ageRange, setAgeRange] = useState([25, 65]);
  const [ratingRange, setRatingRange] = useState([3, 5]);
  const [dateRange, setDateRange] = useState([new Date(2024, 0, 1), new Date(2024, 11, 31)]);
  const [customRange, setCustomRange] = useState([0, 100]);
  const [singleValue, setSingleValue] = useState(50);

  const formatPrice = (value: number) => `$${value}`;
  const formatAge = (value: number) => `${value} ans`;
  const formatRating = (value: number) => `${value}★`;
  const formatDate = (date: Date) => date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
  const formatPercentage = (value: number) => `${value}%`;

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Range Slider</h1>
        <p className="section-description">
          Composant de curseur à plage pour sélectionner des valeurs dans une fourchette. Permet aux utilisateurs de définir des intervalles de valeurs de manière intuitive et visuelle, avec support des valeurs simples et doubles.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Range Slider basique</h3>
          <div className="demo-content">
            <p>Curseur simple avec une seule valeur :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-range-slider-demo">
                <div className="ui-range-slider">
                  <div className="ui-range-slider__track">
                    <div 
                      className="ui-range-slider__fill"
                      style={{ width: `${singleValue}%` }}
                    />
                    <div 
                      className="ui-range-slider__thumb"
                      style={{ left: `${singleValue}%` }}
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={singleValue}
                    onChange={(e) => setSingleValue(Number(e.target.value))}
                    className="ui-range-slider__input"
                  />
                </div>
                
                <div className="ui-range-slider__value">
                  Valeur : {formatPercentage(singleValue)}
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { RangeSlider } from '@equitech-dev/ui-library';

const [value, setValue] = useState(50);

<RangeSlider
  min={0}
  max={100}
  value={value}
  onChange={setValue}
  formatValue={(val) => \`\${val}%\`}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Range Slider double</h3>
          <div className="demo-content">
            <p>Curseur avec deux poignées pour définir une plage :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-range-slider-demo">
                <div className="ui-range-slider ui-range-slider--double">
                  <div className="ui-range-slider__track">
                    <div 
                      className="ui-range-slider__fill"
                      style={{ 
                        left: `${priceRange[0]}%`,
                        width: `${priceRange[1] - priceRange[0]}%`
                      }}
                    />
                    <div 
                      className="ui-range-slider__thumb ui-range-slider__thumb--left"
                      style={{ left: `${priceRange[0]}%` }}
                    />
                    <div 
                      className="ui-range-slider__thumb ui-range-slider__thumb--right"
                      style={{ left: `${priceRange[1]}%` }}
                    />
                  </div>
                  
                  <div className="ui-range-slider__inputs">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[0]}
                      onChange={(e) => {
                        const newValue = Number(e.target.value);
                        if (newValue < priceRange[1]) {
                          setPriceRange([newValue, priceRange[1]]);
                        }
                      }}
                      className="ui-range-slider__input"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[1]}
                      onChange={(e) => {
                        const newValue = Number(e.target.value);
                        if (newValue > priceRange[0]) {
                          setPriceRange([priceRange[0], newValue]);
                        }
                      }}
                      className="ui-range-slider__input"
                    />
                  </div>
                </div>
                
                <div className="ui-range-slider__values">
                  <span>Prix : {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<RangeSlider
  min={0}
  max={100}
  value={[min, max]}
  onChange={setRange}
  double={true}
  formatValue={(val) => \`$$\${val}\`}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Range Slider avec étiquettes</h3>
          <div className="demo-content">
            <p>Curseur avec étiquettes et valeurs formatées :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-range-slider-demo">
                <div className="ui-range-slider ui-range-slider--labeled">
                  <div className="ui-range-slider__labels">
                    <span className="ui-range-slider__label">18</span>
                    <span className="ui-range-slider__label">25</span>
                    <span className="ui-range-slider__label">35</span>
                    <span className="ui-range-slider__label">50</span>
                    <span className="ui-range-slider__label">65+</span>
                  </div>
                  
                  <div className="ui-range-slider__track">
                    <div 
                      className="ui-range-slider__fill"
                      style={{ 
                        left: `${ageRange[0]}%`,
                        width: `${ageRange[1] - ageRange[0]}%`
                      }}
                    />
                    <div 
                      className="ui-range-slider__thumb ui-range-slider__thumb--left"
                      style={{ left: `${ageRange[0]}%` }}
                    />
                    <div 
                      className="ui-range-slider__thumb ui-range-slider__thumb--right"
                      style={{ left: `${ageRange[1]}%` }}
                    />
                  </div>
                  
                  <div className="ui-range-slider__inputs">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={ageRange[0]}
                      onChange={(e) => {
                        const newValue = Number(e.target.value);
                        if (newValue < ageRange[1]) {
                          setAgeRange([newValue, ageRange[1]]);
                        }
                      }}
                      className="ui-range-slider__input"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={ageRange[1]}
                      onChange={(e) => {
                        const newValue = Number(e.target.value);
                        if (newValue > ageRange[0]) {
                          setAgeRange([ageRange[0], newValue]);
                        }
                      }}
                      className="ui-range-slider__input"
                    />
                  </div>
                </div>
                
                <div className="ui-range-slider__values">
                  <span>Tranche d'âge : {formatAge(ageRange[0])} - {formatAge(ageRange[1])}</span>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<LabeledRangeSlider
  min={18}
  max={65}
  value={[minAge, maxAge]}
  onChange={setAgeRange}
  labels={['18', '25', '35', '50', '65+']}
  formatValue={(val) => \`\${val} ans\`}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Range Slider avec étapes</h3>
          <div className="demo-content">
            <p>Curseur avec valeurs discrètes et étapes prédéfinies :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-range-slider-demo">
                <div className="ui-range-slider ui-range-slider--stepped">
                  <div className="ui-range-slider__track">
                    <div className="ui-range-slider__steps">
                      {[1, 2, 3, 4, 5].map(step => (
                        <div 
                          key={step}
                          className="ui-range-slider__step"
                          style={{ left: `${(step - 1) * 25}%` }}
                        />
                      ))}
                    </div>
                    <div 
                      className="ui-range-slider__fill"
                      style={{ 
                        left: `${(ratingRange[0] - 1) * 25}%`,
                        width: `${(ratingRange[1] - ratingRange[0] + 1) * 25}%`
                      }}
                    />
                    <div 
                      className="ui-range-slider__thumb ui-range-slider__thumb--left"
                      style={{ left: `${(ratingRange[0] - 1) * 25}%` }}
                    />
                    <div 
                      className="ui-range-slider__thumb ui-range-slider__thumb--right"
                      style={{ left: `${(ratingRange[1] - 1) * 25}%` }}
                    />
                  </div>
                  
                  <div className="ui-range-slider__inputs">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={ratingRange[0]}
                      onChange={(e) => {
                        const newValue = Number(e.target.value);
                        if (newValue <= ratingRange[1]) {
                          setRatingRange([newValue, ratingRange[1]]);
                        }
                      }}
                      className="ui-range-slider__input"
                    />
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={ratingRange[1]}
                      onChange={(e) => {
                        const newValue = Number(e.target.value);
                        if (newValue >= ratingRange[0]) {
                          setRatingRange([ratingRange[0], newValue]);
                        }
                      }}
                      className="ui-range-slider__input"
                    />
                  </div>
                </div>
                
                <div className="ui-range-slider__values">
                  <span>Note : {formatRating(ratingRange[0])} - {formatRating(ratingRange[1])}</span>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<SteppedRangeSlider
  min={1}
  max={5}
  step={1}
  value={[minRating, maxRating]}
  onChange={setRatingRange}
  showSteps={true}
  formatValue={(val) => \`\${val}★\`}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Range Slider avec personnalisation</h3>
          <div className="demo-content">
            <p>Curseur avec styles personnalisés et variantes :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-range-slider-demo ui-range-slider-demo--variants">
                <div className="ui-range-slider-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Compact</h4>
                  <div className="ui-range-slider ui-range-slider--compact">
                    <div className="ui-range-slider__track">
                      <div 
                        className="ui-range-slider__fill"
                        style={{ width: `${customRange[1]}%` }}
                      />
                      <div 
                        className="ui-range-slider__thumb"
                        style={{ left: `${customRange[1]}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={customRange[1]}
                      onChange={(e) => setCustomRange([customRange[0], Number(e.target.value)])}
                      className="ui-range-slider__input"
                    />
                  </div>
                </div>
                
                <div className="ui-range-slider-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</h4>
                  <div className="ui-range-slider ui-range-slider--large">
                    <div className="ui-range-slider__track">
                      <div 
                        className="ui-range-slider__fill"
                        style={{ width: `${customRange[0]}%` }}
                      />
                      <div 
                        className="ui-range-slider__thumb"
                        style={{ left: `${customRange[0]}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={customRange[0]}
                      onChange={(e) => setCustomRange([Number(e.target.value), customRange[1]])}
                      className="ui-range-slider__input"
                    />
                  </div>
                </div>
                
                <div className="ui-range-slider-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Coloré</h4>
                  <div className="ui-range-slider ui-range-slider--colored">
                    <div className="ui-range-slider__track">
                      <div 
                        className="ui-range-slider__fill"
                        style={{ width: `${customRange[1]}%` }}
                      />
                      <div 
                        className="ui-range-slider__thumb"
                        style={{ left: `${customRange[1]}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={customRange[1]}
                      onChange={(e) => setCustomRange([customRange[0], Number(e.target.value)])}
                      className="ui-range-slider__input"
                    />
                  </div>
                </div>
              </div>
              
              <div className="ui-range-slider__values" style={{ marginTop: '1rem' }}>
                <span>Plage personnalisée : {formatPercentage(customRange[0])} - {formatPercentage(customRange[1])}</span>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<RangeSlider
  variant="compact"
  min={0}
  max={100}
  value={value}
  onChange={setValue}
  showLabels={false}
  showTooltip={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Range Slider avec tooltips</h3>
          <div className="demo-content">
            <p>Curseur avec tooltips et informations contextuelles :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-range-slider-demo">
                <div className="ui-range-slider ui-range-slider--with-tooltips">
                  <div className="ui-range-slider__track">
                    <div 
                      className="ui-range-slider__fill"
                      style={{ 
                        left: `${dateRange[0].getTime() / (new Date(2024, 11, 31).getTime() - new Date(2024, 0, 1).getTime()) * 100}%`,
                        width: `${(dateRange[1].getTime() - dateRange[0].getTime()) / (new Date(2024, 11, 31).getTime() - new Date(2024, 0, 1).getTime()) * 100}%`
                      }}
                    />
                    <div 
                      className="ui-range-slider__thumb ui-range-slider__thumb--left"
                      style={{ 
                        left: `${dateRange[0].getTime() / (new Date(2024, 11, 31).getTime() - new Date(2024, 0, 1).getTime()) * 100}%`
                      }}
                    >
                      <div className="ui-range-slider__tooltip">
                        {formatDate(dateRange[0])}
                      </div>
                    </div>
                    <div 
                      className="ui-range-slider__thumb ui-range-slider__thumb--right"
                      style={{ 
                        left: `${dateRange[1].getTime() / (new Date(2024, 11, 31).getTime() - new Date(2024, 0, 1).getTime()) * 100}%`
                      }}
                    >
                      <div className="ui-range-slider__tooltip">
                        {formatDate(dateRange[1])}
                      </div>
                    </div>
                  </div>
                  
                  <div className="ui-range-slider__inputs">
                    <input
                      type="range"
                      min={new Date(2024, 0, 1).getTime()}
                      max={new Date(2024, 11, 31).getTime()}
                      value={dateRange[0].getTime()}
                      onChange={(e) => {
                        const newDate = new Date(Number(e.target.value));
                        if (newDate < dateRange[1]) {
                          setDateRange([newDate, dateRange[1]]);
                        }
                      }}
                      className="ui-range-slider__input"
                    />
                    <input
                      type="range"
                      min={new Date(2024, 0, 1).getTime()}
                      max={new Date(2024, 11, 31).getTime()}
                      value={dateRange[1].getTime()}
                      onChange={(e) => {
                        const newDate = new Date(Number(e.target.value));
                        if (newDate > dateRange[0]) {
                          setDateRange([dateRange[0], newDate]);
                        }
                      }}
                      className="ui-range-slider__input"
                    />
                  </div>
                </div>
                
                <div className="ui-range-slider__values">
                  <span>Période : {formatDate(dateRange[0])} - {formatDate(dateRange[1])}</span>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<TooltipRangeSlider
  min={startDate}
  max={endDate}
  value={[start, end]}
  onChange={setDateRange}
  showTooltip={true}
  tooltipFormat={(date) => date.toLocaleDateString()}
  type="date"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant RangeSlider :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>min</strong> : number (valeur minimale)</li>
                <li><strong>max</strong> : number (valeur maximale)</li>
                <li><strong>value</strong> : number | [number, number] (valeur(s) actuelle(s))</li>
                <li><strong>step</strong> : number (pas entre les valeurs)</li>
                <li><strong>double</strong> : boolean (mode double curseur)</li>
              </ul>
              
              <h4>Props d'interaction :</h4>
              <ul>
                <li><strong>onChange</strong> : (value: number | [number, number]) =&gt; void</li>
                <li><strong>onChangeStart</strong> : (value: number | [number, number]) =&gt; void</li>
                <li><strong>onChangeEnd</strong> : (value: number | [number, number]) =&gt; void</li>
                <li><strong>disabled</strong> : boolean (désactivation du curseur)</li>
                <li><strong>readOnly</strong> : boolean (lecture seule)</li>
              </ul>
              
              <h4>Props de personnalisation :</h4>
              <ul>
                <li><strong>variant</strong> : "default" | "compact" | "large" | "colored"</li>
                <li><strong>showLabels</strong> : boolean (affichage des étiquettes)</li>
                <li><strong>showTooltip</strong> : boolean (affichage des tooltips)</li>
                <li><strong>showSteps</strong> : boolean (affichage des étapes)</li>
                <li><strong>formatValue</strong> : (value: number) =&gt; string</li>
                <li><strong>className</strong> : string (classe CSS personnalisée)</li>
                <li><strong>style</strong> : object (styles inline personnalisés)</li>
              </ul>
              
              <h4>Variants spécialisés :</h4>
              <ul>
                <li><strong>SingleRangeSlider</strong> : Curseur à valeur unique</li>
                <li><strong>DoubleRangeSlider</strong> : Curseur à double valeur</li>
                <li><strong>LabeledRangeSlider</strong> : Curseur avec étiquettes</li>
                <li><strong>SteppedRangeSlider</strong> : Curseur avec étapes</li>
                <li><strong>TooltipRangeSlider</strong> : Curseur avec tooltips</li>
                <li><strong>DateRangeSlider</strong> : Curseur pour dates</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onFocus</strong> : (e: FocusEvent) =&gt; void</li>
                <li><strong>onBlur</strong> : (e: FocusEvent) =&gt; void</li>
                <li><strong>onKeyDown</strong> : (e: KeyboardEvent) =&gt; void</li>
                <li><strong>onMouseDown</strong> : (e: MouseEvent) =&gt; void</li>
                <li><strong>onMouseUp</strong> : (e: MouseEvent) =&gt; void</li>
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
                <h4>Filtres de prix</h4>
                <p>Définition de fourchettes de prix pour le e-commerce.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Sélection d'âge</h4>
                <p>Filtrage par tranche d'âge dans les formulaires.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Plages de dates</h4>
                <p>Sélection de périodes pour les réservations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeSliderPage;


