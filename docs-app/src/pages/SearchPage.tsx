import React, { useState } from 'react';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchPills, setSearchPills] = useState([
    { id: 1, label: 'React', category: 'framework' },
    { id: 2, label: 'TypeScript', category: 'language' },
    { id: 3, label: 'UI/UX', category: 'design' }
  ]);

  const addPill = () => {
    if (searchTerm.trim() && !searchPills.find(pill => pill.label.toLowerCase() === searchTerm.toLowerCase())) {
      const newPill = {
        id: Date.now(),
        label: searchTerm.trim(),
        category: 'custom'
      };
      setSearchPills([...searchPills, newPill]);
      setSearchTerm('');
    }
  };

  const removePill = (id: number) => {
    setSearchPills(searchPills.filter(pill => pill.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addPill();
    }
  };

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Search avec Pills</h1>
        <p className="section-description">
          Composant de recherche avancée avec système de pills/tags interactifs pour filtrer et organiser les résultats. Permet aux utilisateurs de créer, gérer et supprimer des filtres de recherche dynamiquement.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Recherche basique avec pills</h3>
          <div className="demo-content">
            <p>Interface de recherche avec pills de filtrage :</p>
            <div style={{ maxWidth: '600px', marginTop: '1rem' }}>
              <div className="ui-search-container">
                <div className="ui-search-input-wrapper">
                  <span className="ui-search-icon">🔍</span>
                  <input
                    className="ui-search-input"
                    placeholder="Rechercher et ajouter des filtres..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button 
                    className="ui-search-button"
                    onClick={addPill}
                    disabled={!searchTerm.trim()}
                  >
                    Ajouter
                  </button>
                </div>
                
                {searchPills.length > 0 && (
                  <div className="ui-search-pills">
                    {searchPills.map(pill => (
                      <div key={pill.id} className="ui-search-pill">
                        <span className="ui-search-pill__label">{pill.label}</span>
                        <button
                          className="ui-search-pill__remove"
                          onClick={() => removePill(pill.id)}
                          aria-label={`Supprimer ${pill.label}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { SearchWithPills } from '@equitech-dev/ui-library';

const [searchTerm, setSearchTerm] = useState('');
const [pills, setPills] = useState([]);

<SearchWithPills
  value={searchTerm}
  onChange={setSearchTerm}
  pills={pills}
  onPillAdd={(label) => setPills([...pills, { id: Date.now(), label }])}
  onPillRemove={(id) => setPills(pills.filter(p => p.id !== id))}
  placeholder="Rechercher et ajouter des filtres..."
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Pills avec catégories</h3>
          <div className="demo-content">
            <p>Pills organisées par catégories avec couleurs différentes :</p>
            <div style={{ maxWidth: '600px', marginTop: '1rem' }}>
              <div className="ui-search-container">
                <div className="ui-search-input-wrapper">
                  <span className="ui-search-icon">🔍</span>
                  <input
                    className="ui-search-input"
                    placeholder="Ajouter un nouveau filtre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button 
                    className="ui-search-button"
                    onClick={addPill}
                    disabled={!searchTerm.trim()}
                  >
                    Ajouter
                  </button>
                </div>
                
                <div className="ui-search-pills">
                  <div className="ui-search-pill ui-search-pill--framework">
                    <span className="ui-search-pill__category">Framework</span>
                    <span className="ui-search-pill__label">React</span>
                    <button className="ui-search-pill__remove">×</button>
                  </div>
                  <div className="ui-search-pill ui-search-pill--language">
                    <span className="ui-search-pill__category">Language</span>
                    <span className="ui-search-pill__label">TypeScript</span>
                    <button className="ui-search-pill__remove">×</button>
                  </div>
                  <div className="ui-search-pill ui-search-pill--design">
                    <span className="ui-search-pill__category">Design</span>
                    <span className="ui-search-pill__label">UI/UX</span>
                    <button className="ui-search-pill__remove">×</button>
                  </div>
                  <div className="ui-search-pill ui-search-pill--custom">
                    <span className="ui-search-pill__category">Custom</span>
                    <span className="ui-search-pill__label">Accessibility</span>
                    <button className="ui-search-pill__remove">×</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<SearchWithPills
  pills={[
    { id: 1, label: 'React', category: 'framework' },
    { id: 2, label: 'TypeScript', category: 'language' },
    { id: 3, label: 'UI/UX', category: 'design' }
  ]}
  onPillAdd={handlePillAdd}
  onPillRemove={handlePillRemove}
  showCategories={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Recherche avec suggestions</h3>
          <div className="demo-content">
            <p>Recherche avec suggestions automatiques et pills prédéfinis :</p>
            <div style={{ maxWidth: '600px', marginTop: '1rem' }}>
              <div className="ui-search-container">
                <div className="ui-search-input-wrapper">
                  <span className="ui-search-icon">🔍</span>
                  <input
                    className="ui-search-input"
                    placeholder="Tapez pour voir les suggestions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {searchTerm && (
                  <div className="ui-search-suggestions">
                    <div className="ui-search-suggestion">
                      <span className="ui-search-suggestion__icon">⚡</span>
                      <span className="ui-search-suggestion__text">Ajouter "{searchTerm}" comme filtre</span>
                      <button className="ui-search-suggestion__add">+</button>
                    </div>
                    <div className="ui-search-suggestion">
                      <span className="ui-search-suggestion__icon">🔍</span>
                      <span className="ui-search-suggestion__text">Rechercher "{searchTerm}" dans la documentation</span>
                    </div>
                  </div>
                )}
                
                <div className="ui-search-pills">
                  <div className="ui-search-pill ui-search-pill--suggested">
                    <span className="ui-search-pill__label">Composants</span>
                    <button className="ui-search-pill__remove">×</button>
                  </div>
                  <div className="ui-search-pill ui-search-pill--suggested">
                    <span className="ui-search-pill__label">Formulaires</span>
                    <button className="ui-search-pill__remove">×</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<SearchWithPills
  suggestions={true}
  predefinedPills={['Composants', 'Formulaires', 'Navigation']}
  onSuggestionSelect={(suggestion) => addPill(suggestion)}
  placeholder="Tapez pour voir les suggestions..."
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Recherche avancée avec filtres</h3>
          <div className="demo-content">
            <p>Interface de recherche complète avec filtres multiples et organisation :</p>
            <div style={{ maxWidth: '800px', marginTop: '1rem' }}>
              <div className="ui-search-container ui-search-container--advanced">
                <div className="ui-search-header">
                  <h4 style={{ margin: '0 0 1rem 0', color: 'var(--ui-primary-color)' }}>Recherche avancée</h4>
                  <div className="ui-search-input-wrapper">
                    <span className="ui-search-icon">🔍</span>
                    <input
                      className="ui-search-input"
                      placeholder="Rechercher dans la documentation..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="ui-search-button ui-search-button--primary">
                      Rechercher
                    </button>
                  </div>
                </div>
                
                <div className="ui-search-filters">
                  <div className="ui-search-filter-group">
                    <label className="ui-search-filter-label">Type de contenu :</label>
                    <div className="ui-search-filter-options">
                      <button className="ui-search-filter-option ui-search-filter-option--active">Tous</button>
                      <button className="ui-search-filter-option">Composants</button>
                      <button className="ui-search-filter-option">Documentation</button>
                      <button className="ui-search-filter-option">Exemples</button>
                    </div>
                  </div>
                  
                  <div className="ui-search-filter-group">
                    <label className="ui-search-filter-label">Filtres actifs :</label>
                    <div className="ui-search-pills ui-search-pills--compact">
                      <div className="ui-search-pill ui-search-pill--small">
                        <span className="ui-search-pill__label">React</span>
                        <button className="ui-search-pill__remove">×</button>
                      </div>
                      <div className="ui-search-pill ui-search-pill--small">
                        <span className="ui-search-pill__label">TypeScript</span>
                        <button className="ui-search-pill__remove">×</button>
                      </div>
                      <div className="ui-search-pill ui-search-pill--small">
                        <span className="ui-search-pill__label">UI/UX</span>
                        <button className="ui-search-pill__remove">×</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<AdvancedSearch
  placeholder="Rechercher dans la documentation..."
  filters={[
    { type: 'content', options: ['Tous', 'Composants', 'Documentation', 'Exemples'] },
    { type: 'category', options: ['React', 'TypeScript', 'UI/UX'] }
  ]}
  pills={activePills}
  onPillAdd={addPill}
  onPillRemove={removePill}
  onSearch={handleSearch}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant SearchWithPills :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>value</strong> : string (valeur de l'input de recherche)</li>
                <li><strong>onChange</strong> : function (callback de changement de valeur)</li>
                <li><strong>pills</strong> : Array&lt;Pill&gt; (liste des pills actifs)</li>
                <li><strong>onPillAdd</strong> : function (callback d'ajout de pill)</li>
                <li><strong>onPillRemove</strong> : function (callback de suppression de pill)</li>
                <li><strong>placeholder</strong> : string (placeholder de l'input)</li>
                <li><strong>suggestions</strong> : boolean (afficher les suggestions)</li>
                <li><strong>predefinedPills</strong> : Array&lt;string&gt; (pills prédéfinis)</li>
                <li><strong>showCategories</strong> : boolean (afficher les catégories)</li>
                <li><strong>maxPills</strong> : number (nombre maximum de pills)</li>
              </ul>
              
              <h4>Types :</h4>
              <ul>
                <li><strong>Pill</strong> : &#123; id: number | string, label: string, category?: string &#125;</li>
                <li><strong>SearchSuggestion</strong> : &#123; text: string, action: 'add' | 'search' &#125;</li>
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
                <h4>Documentation</h4>
                <p>Filtrage de contenu par composants, catégories, niveaux de difficulté.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>E-commerce</h4>
                <p>Filtrage de produits par marque, prix, catégorie, disponibilité.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Dashboard</h4>
                <p>Filtrage de données par période, utilisateur, statut, priorité.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
