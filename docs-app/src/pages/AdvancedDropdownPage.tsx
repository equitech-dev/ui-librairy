import React, { useState, useRef, useEffect } from 'react';

const AdvancedDropdownPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [multiSelected, setMultiSelected] = useState<string[]>([]);
  const [isOpenMulti, setIsOpenMulti] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isOpenCustom, setIsOpenCustom] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: 'option1', label: 'Option 1', description: 'Description de l\'option 1', icon: '🚀' },
    { value: 'option2', label: 'Option 2', description: 'Description de l\'option 2', icon: '⚡' },
    { value: 'option3', label: 'Option 3', description: 'Description de l\'option 3', icon: '🎯' },
    { value: 'option4', label: 'Option 4', description: 'Description de l\'option 4', icon: '💡' },
    { value: 'option5', label: 'Option 5', description: 'Description de l\'option 5', icon: '🌟' }
  ];

  const categories = [
    {
      name: 'Développement',
      options: [
        { value: 'react', label: 'React', description: 'Bibliothèque JavaScript', icon: '⚛️' },
        { value: 'vue', label: 'Vue.js', description: 'Framework progressif', icon: '💚' },
        { value: 'angular', label: 'Angular', description: 'Plateforme complète', icon: '🅰️' }
      ]
    },
    {
      name: 'Design',
      options: [
        { value: 'figma', label: 'Figma', description: 'Outil de design collaboratif', icon: '🎨' },
        { value: 'sketch', label: 'Sketch', description: 'Design pour Mac', icon: '✏️' },
        { value: 'adobe', label: 'Adobe XD', description: 'Prototypage et design', icon: '🎭' }
      ]
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsOpenMulti(false);
        setIsOpenSearch(false);
        setIsOpenCustom(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const handleMultiSelect = (value: string) => {
    setMultiSelected(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSelectedLabel = () => {
    const option = options.find(opt => opt.value === selectedOption);
    return option ? option.label : 'Sélectionner une option';
  };

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Advanced Dropdown</h1>
        <p className="section-description">
          Composant de dropdown avancé avec support de la recherche, sélection multiple, catégories et personnalisation. Offre une interface riche et intuitive pour la sélection d'options complexes.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Dropdown basique</h3>
          <div className="demo-content">
            <p>Dropdown simple avec sélection d'option :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-dropdown-demo">
                <div className="ui-dropdown" ref={dropdownRef}>
                  <button
                    className="ui-dropdown__trigger"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                  >
                    <span className="ui-dropdown__selected">{getSelectedLabel()}</span>
                    <span className={`ui-dropdown__arrow ${isOpen ? 'ui-dropdown__arrow--open' : ''}`}>
                      ▼
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="ui-dropdown__menu">
                      {options.map(option => (
                        <div
                          key={option.value}
                          className={`ui-dropdown__option ${selectedOption === option.value ? 'ui-dropdown__option--selected' : ''}`}
                          onClick={() => handleOptionSelect(option.value)}
                        >
                          <span className="ui-dropdown__option-icon">{option.icon}</span>
                          <div className="ui-dropdown__option-content">
                            <span className="ui-dropdown__option-label">{option.label}</span>
                            <span className="ui-dropdown__option-description">{option.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="ui-dropdown__info">
                  <span>Option sélectionnée : </span>
                  <span className="ui-text--primary">
                    {selectedOption ? options.find(opt => opt.value === selectedOption)?.label : 'Aucune'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { AdvancedDropdown } from '@equitech-dev/ui-library';

const [selectedOption, setSelectedOption] = useState(null);

<AdvancedDropdown
  options={options}
  value={selectedOption}
  onChange={setSelectedOption}
  placeholder="Sélectionner une option"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Dropdown avec recherche</h3>
          <div className="demo-content">
            <p>Dropdown avec barre de recherche intégrée :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-dropdown-demo">
                <div className="ui-dropdown ui-dropdown--searchable" ref={dropdownRef}>
                  <button
                    className="ui-dropdown__trigger"
                    onClick={() => setIsOpenSearch(!isOpenSearch)}
                    aria-expanded={isOpenSearch}
                  >
                    <span className="ui-dropdown__selected">
                      {selectedOption ? options.find(opt => opt.value === selectedOption)?.label : 'Rechercher...'}
                    </span>
                    <span className={`ui-dropdown__arrow ${isOpenSearch ? 'ui-dropdown__arrow--open' : ''}`}>
                      ▼
                    </span>
                  </button>
                  
                  {isOpenSearch && (
                    <div className="ui-dropdown__menu">
                      <div className="ui-dropdown__search">
                        <input
                          type="text"
                          className="ui-dropdown__search-input"
                          placeholder="Rechercher..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          autoFocus
                        />
                      </div>
                      
                      <div className="ui-dropdown__options">
                        {filteredOptions.length > 0 ? (
                          filteredOptions.map(option => (
                            <div
                              key={option.value}
                              className={`ui-dropdown__option ${selectedOption === option.value ? 'ui-dropdown__option--selected' : ''}`}
                              onClick={() => {
                                handleOptionSelect(option.value);
                                setSearchTerm('');
                              }}
                            >
                              <span className="ui-dropdown__option-icon">{option.icon}</span>
                              <div className="ui-dropdown__option-content">
                                <span className="ui-dropdown__option-label">{option.label}</span>
                                <span className="ui-dropdown__option-description">{option.description}</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="ui-dropdown__no-results">
                            Aucun résultat trouvé
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<AdvancedDropdown
  options={options}
  value={selectedOption}
  onChange={setSelectedOption}
  searchable={true}
  placeholder="Rechercher..."
  onSearch={handleSearch}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Dropdown avec sélection multiple</h3>
          <div className="demo-content">
            <p>Dropdown permettant la sélection de plusieurs options :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-dropdown-demo">
                <div className="ui-dropdown ui-dropdown--multi" ref={dropdownRef}>
                  <button
                    className="ui-dropdown__trigger"
                    onClick={() => setIsOpenMulti(!isOpenMulti)}
                    aria-expanded={isOpenMulti}
                  >
                    <span className="ui-dropdown__selected">
                      {multiSelected.length > 0 
                        ? `${multiSelected.length} option(s) sélectionnée(s)`
                        : 'Sélectionner des options'
                      }
                    </span>
                    <span className={`ui-dropdown__arrow ${isOpenMulti ? 'ui-dropdown__arrow--open' : ''}`}>
                      ▼
                    </span>
                  </button>
                  
                  {isOpenMulti && (
                    <div className="ui-dropdown__menu">
                      <div className="ui-dropdown__header">
                        <span className="ui-dropdown__header-title">Options disponibles</span>
                        {multiSelected.length > 0 && (
                          <button
                            className="ui-dropdown__clear-all"
                            onClick={() => setMultiSelected([])}
                          >
                            Tout effacer
                          </button>
                        )}
                      </div>
                      
                      <div className="ui-dropdown__options">
                        {options.map(option => (
                          <div
                            key={option.value}
                            className={`ui-dropdown__option ui-dropdown__option--checkbox ${multiSelected.includes(option.value) ? 'ui-dropdown__option--selected' : ''}`}
                            onClick={() => handleMultiSelect(option.value)}
                          >
                            <div className="ui-dropdown__checkbox">
                              <input
                                type="checkbox"
                                checked={multiSelected.includes(option.value)}
                                onChange={() => {}}
                                readOnly
                              />
                            </div>
                            <span className="ui-dropdown__option-icon">{option.icon}</span>
                            <div className="ui-dropdown__option-content">
                              <span className="ui-dropdown__option-label">{option.label}</span>
                              <span className="ui-dropdown__option-description">{option.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="ui-dropdown__footer">
                        <button
                          className="ui-button ui-button--primary ui-button--small"
                          onClick={() => setIsOpenMulti(false)}
                        >
                          Valider ({multiSelected.length})
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {multiSelected.length > 0 && (
                  <div className="ui-dropdown__selected-tags">
                    {multiSelected.map(value => {
                      const option = options.find(opt => opt.value === value);
                      return (
                        <span key={value} className="ui-dropdown__tag">
                          {option?.icon} {option?.label}
                          <button
                            className="ui-dropdown__tag-remove"
                            onClick={() => handleMultiSelect(value)}
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<AdvancedDropdown
  options={options}
  value={multiSelected}
  onChange={setMultiSelected}
  multiple={true}
  placeholder="Sélectionner des options"
  showSelectedCount={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Dropdown avec catégories</h3>
          <div className="demo-content">
            <p>Dropdown organisé par catégories :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-dropdown-demo">
                <div className="ui-dropdown ui-dropdown--categorized" ref={dropdownRef}>
                  <button
                    className="ui-dropdown__trigger"
                    onClick={() => setIsOpenCustom(!isOpenCustom)}
                    aria-expanded={isOpenCustom}
                  >
                    <span className="ui-dropdown__selected">
                      {selectedOption ? options.find(opt => opt.value === selectedOption)?.label : 'Choisir une catégorie'}
                    </span>
                    <span className={`ui-dropdown__arrow ${isOpenCustom ? 'ui-dropdown__arrow--open' : ''}`}>
                      ▼
                    </span>
                  </button>
                  
                  {isOpenCustom && (
                    <div className="ui-dropdown__menu">
                      {categories.map(category => (
                        <div key={category.name} className="ui-dropdown__category">
                          <div className="ui-dropdown__category-header">
                            <span className="ui-dropdown__category-title">{category.name}</span>
                          </div>
                          
                          <div className="ui-dropdown__category-options">
                            {category.options.map(option => (
                              <div
                                key={option.value}
                                className={`ui-dropdown__option ${selectedOption === option.value ? 'ui-dropdown__option--selected' : ''}`}
                                onClick={() => handleOptionSelect(option.value)}
                              >
                                <span className="ui-dropdown__option-icon">{option.icon}</span>
                                <div className="ui-dropdown__option-content">
                                  <span className="ui-dropdown__option-label">{option.label}</span>
                                  <span className="ui-dropdown__option-description">{option.description}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<AdvancedDropdown
  options={categorizedOptions}
  value={selectedOption}
  onChange={setSelectedOption}
  categorized={true}
  showCategoryHeaders={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Dropdown avec variantes</h3>
          <div className="demo-content">
            <p>Différentes variantes de dropdown :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-dropdown-demo ui-dropdown-demo--variants">
                <div className="ui-dropdown-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Compact</h4>
                  <div className="ui-dropdown ui-dropdown--compact">
                    <button className="ui-dropdown__trigger ui-dropdown__trigger--compact">
                      <span>Compact</span>
                      <span className="ui-dropdown__arrow">▼</span>
                    </button>
                  </div>
                </div>
                
                <div className="ui-dropdown-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</h4>
                  <div className="ui-dropdown ui-dropdown--large">
                    <button className="ui-dropdown__trigger ui-dropdown__trigger--large">
                      <span>Large</span>
                      <span className="ui-dropdown__arrow">▼</span>
                    </button>
                  </div>
                </div>
                
                <div className="ui-dropdown-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Bordered</h4>
                  <div className="ui-dropdown ui-dropdown--bordered">
                    <button className="ui-dropdown__trigger ui-dropdown__trigger--bordered">
                      <span>Bordered</span>
                      <span className="ui-dropdown__arrow">▼</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<AdvancedDropdown variant="compact" />
<AdvancedDropdown variant="large" />
<AdvancedDropdown variant="bordered" />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Dropdown en contexte</h3>
          <div className="demo-content">
            <p>Exemples d'utilisation dans des contextes réels :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-dropdown-demo ui-dropdown-demo--context">
                <div className="ui-dropdown-context">
                  <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Sélection de pays</h4>
                  
                  <div className="ui-dropdown ui-dropdown--country">
                    <button className="ui-dropdown__trigger">
                      <span className="ui-dropdown__flag">🇫🇷</span>
                      <span className="ui-dropdown__selected">France</span>
                      <span className="ui-dropdown__arrow">▼</span>
                    </button>
                  </div>
                  
                  <div style={{ marginTop: '1rem' }}>
                    <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Sélection de langue</h4>
                    <div className="ui-dropdown ui-dropdown--language">
                      <button className="ui-dropdown__trigger">
                        <span className="ui-dropdown__flag">🇫🇷</span>
                        <span className="ui-dropdown__selected">Français</span>
                        <span className="ui-dropdown__arrow">▼</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<CountrySelector
  value={selectedCountry}
  onChange={setSelectedCountry}
  showFlags={true}
  searchable={true}
/>

<LanguageSelector
  value={selectedLanguage}
  onChange={setSelectedLanguage}
  showFlags={true}
  categorized={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant AdvancedDropdown :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>options</strong> : array (options disponibles)</li>
                <li><strong>value</strong> : any (valeur sélectionnée)</li>
                <li><strong>onChange</strong> : (value: any) =&gt; void (callback de changement)</li>
                <li><strong>placeholder</strong> : string (texte par défaut)</li>
                <li><strong>disabled</strong> : boolean (désactivation du dropdown)</li>
              </ul>
              
              <h4>Props de fonctionnalité :</h4>
              <ul>
                <li><strong>searchable</strong> : boolean (activation de la recherche)</li>
                <li><strong>multiple</strong> : boolean (sélection multiple)</li>
                <li><strong>categorized</strong> : boolean (organisation par catégories)</li>
                <li><strong>clearable</strong> : boolean (bouton de suppression)</li>
                <li><strong>creatable</strong> : boolean (création d'options)</li>
              </ul>
              
              <h4>Props de personnalisation :</h4>
              <ul>
                <li><strong>variant</strong> : "default" | "compact" | "large" | "bordered"</li>
                <li><strong>size</strong> : "small" | "medium" | "large"</li>
                <li><strong>showIcons</strong> : boolean (affichage des icônes)</li>
                <li><strong>showDescriptions</strong> : boolean (affichage des descriptions)</li>
                <li><strong>maxHeight</strong> : string | number (hauteur maximale du menu)</li>
              </ul>
              
              <h4>Props d'état :</h4>
              <ul>
                <li><strong>loading</strong> : boolean (état de chargement)</li>
                <li><strong>error</strong> : string (message d'erreur)</li>
                <li><strong>noOptionsMessage</strong> : string (message si aucune option)</li>
                <li><strong>noResultsMessage</strong> : string (message si aucun résultat)</li>
              </ul>
              
              <h4>Variants spécialisés :</h4>
              <ul>
                <li><strong>SearchableDropdown</strong> : Dropdown avec recherche</li>
                <li><strong>MultiSelectDropdown</strong> : Dropdown à sélection multiple</li>
                <li><strong>CategorizedDropdown</strong> : Dropdown par catégories</li>
                <li><strong>CountryDropdown</strong> : Dropdown pour pays</li>
                <li><strong>LanguageDropdown</strong> : Dropdown pour langues</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onOpen</strong> : () =&gt; void</li>
                <li><strong>onClose</strong> : () =&gt; void</li>
                <li><strong>onSearch</strong> : (term: string) =&gt; void</li>
                <li><strong>onOptionSelect</strong> : (option: any) =&gt; void</li>
                <li><strong>onOptionDeselect</strong> : (option: any) =&gt; void</li>
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
                <h4>Sélection de pays/régions</h4>
                <p>Dropdown avec drapeaux et recherche pour la localisation.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Filtres avancés</h4>
                <p>Dropdown avec catégories pour les filtres complexes.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Sélection de tags</h4>
                <p>Dropdown à sélection multiple pour la gestion des étiquettes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedDropdownPage;


