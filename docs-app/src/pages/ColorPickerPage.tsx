import React, { useState } from 'react';

const ColorPickerPage: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState('#2BA985');
  const [selectedColorRGB, setSelectedColorRGB] = useState({ r: 43, g: 169, b: 133 });
  const [selectedColorHSL, setSelectedColorHSL] = useState({ h: 162, s: 59, l: 42 });
  const [selectedColorHEX, setSelectedColorHEX] = useState('#2BA985');

  const predefinedColors = [
    '#2BA985', '#0C3640', '#1A2A38', '#FFA726', '#EF5350', '#42A5F5',
    '#9C27B0', '#FF5722', '#795548', '#607D8B', '#E91E63', '#00BCD4'
  ];

  const colorPalettes = {
    'EQUITECH': ['#2BA985', '#0C3640', '#1A2A38', '#239672', '#082a32'],
    'Material': ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5'],
    'Nature': ['#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FF9800']
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return { h: 0, s: 0, l: 0 };
    
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setSelectedColorHEX(color);
    const rgb = hexToRgb(color);
    const hsl = hexToHsl(color);
    if (rgb) setSelectedColorRGB(rgb);
    if (hsl) setSelectedColorHSL(hsl);
  };

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Color Picker</h1>
        <p className="section-description">
          Composant de sélection de couleur avec support des formats HEX, RGB, HSL et palettes prédéfinies. 
          Offre une interface intuitive pour la gestion des couleurs et l'identité visuelle.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Color Picker basique</h3>
          <div className="demo-content">
            <p>Sélection de couleur simple avec format HEX :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-color-picker-demo">
                <div className="ui-color-picker">
                  <label htmlFor="basic-color" className="ui-color-picker__label">
                    Couleur principale
                  </label>
                  <div className="ui-color-picker__input-group">
                    <input
                      type="color"
                      id="basic-color"
                      value={selectedColor}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="ui-color-picker__input"
                    />
                    <input
                      type="text"
                      value={selectedColor}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="ui-color-picker__hex-input"
                      placeholder="#000000"
                    />
                  </div>
                  <div className="ui-color-picker__preview">
                    <div 
                      className="ui-color-picker__swatch"
                      style={{ backgroundColor: selectedColor }}
                    />
                    <span className="ui-color-picker__value">{selectedColor}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { ColorPicker } from '@equitech-dev/ui-library';
         
const [selectedColor, setSelectedColor] = useState('#2BA985');
         
<ColorPicker
  value={selectedColor}
  onChange={setSelectedColor}
  label="Couleur principale"
  format="hex"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Color Picker avec formats multiples</h3>
          <div className="demo-content">
            <p>Sélection de couleur avec affichage des formats HEX, RGB et HSL :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-color-picker-demo">
                <div className="ui-color-picker ui-color-picker--multi-format">
                  <label className="ui-color-picker__label">
                    Couleur avec formats
                  </label>
                  
                  <div className="ui-color-picker__input-group">
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="ui-color-picker__input"
                    />
                  </div>
                  
                  <div className="ui-color-picker__formats">
                    <div className="ui-color-picker__format">
                      <span className="ui-color-picker__format-label">HEX</span>
                      <input
                        type="text"
                        value={selectedColorHEX}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="ui-color-picker__format-input"
                      />
                    </div>
                    
                    <div className="ui-color-picker__format">
                      <span className="ui-color-picker__format-label">RGB</span>
                      <div className="ui-color-picker__rgb-inputs">
                        <input
                          type="number"
                          min="0"
                          max="255"
                          value={selectedColorRGB.r}
                          onChange={(e) => {
                            const newRGB = { ...selectedColorRGB, r: parseInt(e.target.value) || 0 };
                            setSelectedColorRGB(newRGB);
                            // Convertir RGB vers HEX
                            const hex = `#${newRGB.r.toString(16).padStart(2, '0')}${newRGB.g.toString(16).padStart(2, '0')}${newRGB.b.toString(16).padStart(2, '0')}`;
                            setSelectedColor(hex);
                            setSelectedColorHEX(hex);
                          }}
                          className="ui-color-picker__rgb-input"
                        />
                        <input
                          type="number"
                          min="0"
                          max="255"
                          value={selectedColorRGB.g}
                          onChange={(e) => {
                            const newRGB = { ...selectedColorRGB, g: parseInt(e.target.value) || 0 };
                            setSelectedColorRGB(newRGB);
                            const hex = `#${newRGB.r.toString(16).padStart(2, '0')}${newRGB.g.toString(16).padStart(2, '0')}${newRGB.b.toString(16).padStart(2, '0')}`;
                            setSelectedColor(hex);
                            setSelectedColorHEX(hex);
                          }}
                          className="ui-color-picker__rgb-input"
                        />
                        <input
                          type="number"
                          min="0"
                          max="255"
                          value={selectedColorRGB.b}
                          onChange={(e) => {
                            const newRGB = { ...selectedColorRGB, b: parseInt(e.target.value) || 0 };
                            setSelectedColorRGB(newRGB);
                            const hex = `#${newRGB.r.toString(16).padStart(2, '0')}${newRGB.g.toString(16).padStart(2, '0')}${newRGB.b.toString(16).padStart(2, '0')}`;
                            setSelectedColor(hex);
                            setSelectedColorHEX(hex);
                          }}
                          className="ui-color-picker__rgb-input"
                        />
                      </div>
                    </div>
                    
                    <div className="ui-color-picker__format">
                      <span className="ui-color-picker__format-label">HSL</span>
                      <div className="ui-color-picker__hsl-inputs">
                        <input
                          type="number"
                          min="0"
                          max="360"
                          value={selectedColorHSL.h}
                          className="ui-color-picker__hsl-input"
                          readOnly
                        />
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={selectedColorHSL.s}
                          className="ui-color-picker__hsl-input"
                          readOnly
                        />
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={selectedColorHSL.l}
                          className="ui-color-picker__hsl-input"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="ui-color-picker__preview">
                    <div 
                      className="ui-color-picker__swatch ui-color-picker__swatch--large"
                      style={{ backgroundColor: selectedColor }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<ColorPicker
  value={selectedColor}
  onChange={setSelectedColor}
  label="Couleur avec formats"
  showFormats={['hex', 'rgb', 'hsl']}
  showPreview={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Color Picker avec palettes prédéfinies</h3>
          <div className="demo-content">
            <p>Sélection rapide parmi des palettes de couleurs prédéfinies :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-color-picker-demo">
                <div className="ui-color-picker">
                  <label className="ui-color-picker__label">
                    Palette EQUITECH
                  </label>
                  
                  <div className="ui-color-picker__palette">
                    {colorPalettes.EQUITECH.map(color => (
                      <button
                        key={color}
                        className={`ui-color-picker__palette-color ${selectedColor === color ? 'ui-color-picker__palette-color--selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorChange(color)}
                        title={color}
                      />
                    ))}
                  </div>
                  
                  <div className="ui-color-picker__preview">
                    <div 
                      className="ui-color-picker__swatch"
                      style={{ backgroundColor: selectedColor }}
                    />
                    <span className="ui-color-picker__value">{selectedColor}</span>
                  </div>
                </div>
                
                <div className="ui-color-picker" style={{ marginTop: '1rem' }}>
                  <label className="ui-color-picker__label">
                    Palette Material
                  </label>
                  
                  <div className="ui-color-picker__palette">
                    {colorPalettes.Material.map(color => (
                      <button
                        key={color}
                        className={`ui-color-picker__palette-color ${selectedColor === color ? 'ui-color-picker__palette-color--selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorChange(color)}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<ColorPicker
  value={selectedColor}
  onChange={setSelectedColor}
  label="Palette EQUITECH"
  predefinedPalettes={['EQUITECH', 'Material', 'Nature']}
  showPaletteSelector={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Color Picker avec couleurs rapides</h3>
          <div className="demo-content">
            <p>Sélection rapide parmi des couleurs couramment utilisées :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-color-picker-demo">
                <div className="ui-color-picker">
                  <label className="ui-color-picker__label">
                    Couleurs rapides
                  </label>
                  
                  <div className="ui-color-picker__quick-colors">
                    {predefinedColors.map(color => (
                      <button
                        key={color}
                        className={`ui-color-picker__quick-color ${selectedColor === color ? 'ui-color-picker__quick-color--selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorChange(color)}
                        title={color}
                      />
                    ))}
                  </div>
                  
                  <div className="ui-color-picker__preview">
                    <div 
                      className="ui-color-picker__swatch"
                      style={{ backgroundColor: selectedColor }}
                    />
                    <span className="ui-color-picker__value">{selectedColor}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<ColorPicker
  value={selectedColor}
  onChange={setSelectedColor}
  label="Couleurs rapides"
  quickColors={['#2BA985', '#0C3640', '#1A2A38', '#FFA726', '#EF5350']}
  showQuickColors={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Color Picker avec validation</h3>
          <div className="demo-content">
            <p>Color Picker avec validation et messages d'erreur :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-color-picker-demo">
                <div className="ui-color-picker ui-color-picker--error">
                  <label className="ui-color-picker__label">
                    Couleur avec validation
                  </label>
                  
                  <div className="ui-color-picker__input-group">
                    <input
                      type="text"
                      value="invalid-color"
                      className="ui-color-picker__hex-input ui-color-picker__hex-input--error"
                      readOnly
                    />
                  </div>
                  
                  <div className="ui-color-picker__error">
                    ⚠️ Format de couleur invalide. Veuillez utiliser le format HEX (#RRGGBB).
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<ColorPicker
  value={selectedColor}
  onChange={setSelectedColor}
  label="Couleur avec validation"
  validateFormat={true}
  error="Format de couleur invalide"
  onValidationError={handleValidationError}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Color Picker avec variantes</h3>
          <div className="demo-content">
            <p>Différentes variantes de Color Picker :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-color-picker-demo ui-color-picker-demo--variants">
                <div className="ui-color-picker-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Compact</h4>
                  <div className="ui-color-picker ui-color-picker--compact">
                    <input
                      type="color"
                      className="ui-color-picker__input ui-color-picker__input--compact"
                      value="#2BA985"
                      readOnly
                    />
                  </div>
                </div>
                
                <div className="ui-color-picker-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</h4>
                  <div className="ui-color-picker ui-color-picker--large">
                    <input
                      type="color"
                      className="ui-color-picker__input ui-color-picker__input--large"
                      value="#0C3640"
                      readOnly
                    />
                  </div>
                </div>
                
                <div className="ui-color-picker-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Bordered</h4>
                  <div className="ui-color-picker ui-color-picker--bordered">
                    <input
                      type="color"
                      className="ui-color-picker__input ui-color-picker__input--bordered"
                      value="#1A2A38"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<ColorPicker variant="compact" />
<ColorPicker variant="large" />
<ColorPicker variant="bordered" />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Color Picker en contexte</h3>
          <div className="demo-content">
            <p>Exemples d'utilisation dans des contextes réels :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-color-picker-demo ui-color-picker-demo--context">
                <div className="ui-color-picker-context">
                  <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Configuration du thème EQUITECH</h4>
                  
                  <div className="ui-color-picker-theme">
                    <div className="ui-color-picker-theme__item">
                      <span className="ui-color-picker-theme__label">Couleur principale</span>
                      <div className="ui-color-picker__input-group">
                        <input
                          type="color"
                          value="#2BA985"
                          className="ui-color-picker__input"
                          readOnly
                        />
                        <span className="ui-color-picker__theme-value">#2BA985</span>
                      </div>
                    </div>
                    
                    <div className="ui-color-picker-theme__item">
                      <span className="ui-color-picker-theme__label">Couleur secondaire</span>
                      <div className="ui-color-picker__input-group">
                        <input
                          type="color"
                          value="#0C3640"
                          className="ui-color-picker__input"
                          readOnly
                        />
                        <span className="ui-color-picker__theme-value">#0C3640</span>
                      </div>
                    </div>
                    
                    <div className="ui-color-picker-theme__item">
                      <span className="ui-color-picker-theme__label">Couleur d'accent</span>
                      <div className="ui-color-picker__input-group">
                        <input
                          type="color"
                          value="#FFA726"
                          className="ui-color-picker__input"
                          readOnly
                        />
                        <span className="ui-color-picker__theme-value">#FFA726</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<ThemeConfigurator>
  <ColorPicker
    label="Couleur principale"
    value={primaryColor}
    onChange={setPrimaryColor}
    predefinedPalettes={['EQUITECH']}
  />
  <ColorPicker
    label="Couleur secondaire"
    value={secondaryColor}
    onChange={setSecondaryColor}
    predefinedPalettes={['EQUITECH']}
  />
  <ColorPicker
    label="Couleur d'accent"
    value={accentColor}
    onChange={setAccentColor}
    predefinedPalettes={['EQUITECH']}
  />
</ThemeConfigurator>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant ColorPicker :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>value</strong> : string (couleur sélectionnée au format HEX)</li>
                <li><strong>onChange</strong> : (color: string) =&gt; void (callback de changement)</li>
                <li><strong>label</strong> : string (label du champ)</li>
                <li><strong>id</strong> : string (identifiant unique)</li>
                <li><strong>name</strong> : string (nom du champ)</li>
              </ul>
              
              <h4>Props de format :</h4>
              <ul>
                <li><strong>format</strong> : "hex" | "rgb" | "hsl" (format principal)</li>
                <li><strong>showFormats</strong> : array (formats à afficher)</li>
                <li><strong>showAlpha</strong> : boolean (afficher la transparence)</li>
                <li><strong>showPreview</strong> : boolean (afficher l'aperçu)</li>
              </ul>
              
              <h4>Props de personnalisation :</h4>
              <ul>
                <li><strong>variant</strong> : "default" | "compact" | "large" | "bordered"</li>
                <li><strong>size</strong> : "small" | "medium" | "large"</li>
                <li><strong>placeholder</strong> : string (texte par défaut)</li>
                <li><strong>disabled</strong> : boolean (désactivation du champ)</li>
                <li><strong>readOnly</strong> : boolean (lecture seule)</li>
              </ul>
              
              <h4>Props de palettes :</h4>
              <ul>
                <li><strong>predefinedPalettes</strong> : array (palettes disponibles)</li>
                <li><strong>quickColors</strong> : array (couleurs rapides)</li>
                <li><strong>showPaletteSelector</strong> : boolean (sélecteur de palettes)</li>
                <li><strong>showQuickColors</strong> : boolean (couleurs rapides)</li>
                <li><strong>customPalettes</strong> : object (palettes personnalisées)</li>
              </ul>
              
              <h4>Props de validation :</h4>
              <ul>
                <li><strong>validateFormat</strong> : boolean (validation du format)</li>
                <li><strong>allowedFormats</strong> : array (formats autorisés)</li>
                <li><strong>error</strong> : string (message d'erreur)</li>
                <li><strong>onValidationError</strong> : (error: string) =&gt; void</li>
              </ul>
              
              <h4>Variants spécialisés :</h4>
              <ul>
                <li><strong>HexColorPicker</strong> : Picker format HEX uniquement</li>
                <li><strong>RGBColorPicker</strong> : Picker format RGB uniquement</li>
                <li><strong>HSLColorPicker</strong> : Picker format HSL uniquement</li>
                <li><strong>PaletteColorPicker</strong> : Picker avec palettes</li>
                <li><strong>QuickColorPicker</strong> : Picker avec couleurs rapides</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onFocus</strong> : (e: FocusEvent) =&gt; void</li>
                <li><strong>onBlur</strong> : (e: FocusEvent) =&gt; void</li>
                <li><strong>onKeyDown</strong> : (e: KeyboardEvent) =&gt; void</li>
                <li><strong>onColorSelect</strong> : (color: string) =&gt; void</li>
                <li><strong>onColorChange</strong> : (color: string) =&gt; void</li>
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
                <h4>Configuration de thème</h4>
                <p>Personnalisation des couleurs de l'interface utilisateur.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Design de marque</h4>
                <p>Gestion de la palette de couleurs de l'identité visuelle.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Éditeur graphique</h4>
                <p>Sélection de couleurs pour la création de contenu visuel.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPickerPage;
