import React, { useState } from 'react';

const ListPage: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set(['item-1', 'item-3']));
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['item-1']));
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterText, setFilterText] = useState('');

  const toggleSelected = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const listData = [
    {
      id: 'item-1',
      title: 'Premier élément de la liste',
      description: 'Description détaillée du premier élément avec des informations supplémentaires.',
      icon: '📱',
      status: 'active',
      date: '2024-01-15',
      priority: 'high',
      tags: ['important', 'urgent']
    },
    {
      id: 'item-2',
      title: 'Deuxième élément',
      description: 'Description du deuxième élément de la liste.',
      icon: '💻',
      status: 'pending',
      date: '2024-01-16',
      priority: 'medium',
      tags: ['normal']
    },
    {
      id: 'item-3',
      title: 'Troisième élément avec un titre plus long',
      description: 'Description du troisième élément qui peut être très longue et contenir beaucoup de texte.',
      icon: '📊',
      status: 'completed',
      date: '2024-01-17',
      priority: 'low',
      tags: ['terminé', 'archivé']
    },
    {
      id: 'item-4',
      title: 'Quatrième élément',
      description: 'Description du quatrième élément.',
      icon: '🎯',
      status: 'active',
      date: '2024-01-18',
      priority: 'high',
      tags: ['important']
    }
  ];

  const filteredData = listData.filter(item => 
    item.title.toLowerCase().includes(filterText.toLowerCase()) ||
    item.description.toLowerCase().includes(filterText.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(filterText.toLowerCase()))
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'var(--ui-error-color)';
      case 'medium':
        return 'var(--ui-warning-color)';
      case 'low':
        return 'var(--ui-success-color)';
      default:
        return 'var(--ui-text-muted)';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'var(--ui-success-color)';
      case 'pending':
        return 'var(--ui-warning-color)';
      case 'completed':
        return 'var(--ui-primary-color)';
      default:
        return 'var(--ui-text-muted)';
    }
  };

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">List</h1>
        <p className="section-description">
          Composant de liste pour afficher des collections d'éléments de manière organisée. Permet de présenter des données structurées avec différentes variantes d'affichage et d'interaction.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">List basique</h3>
          <div className="demo-content">
            <p>Liste simple avec éléments basiques :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-list-demo">
                <div className="ui-list">
                  {listData.map(item => (
                    <div key={item.id} className="ui-list__item">
                      <div className="ui-list__icon">{item.icon}</div>
                      <div className="ui-list__content">
                        <h4 className="ui-list__title">{item.title}</h4>
                        <p className="ui-list__description">{item.description}</p>
                      </div>
                      <div className="ui-list__meta">
                        <span className="ui-list__date">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { List } from '@equitech-dev/ui-library';

const listData = [
  {
    title: 'Premier élément',
    description: 'Description de l\'élément',
    icon: '📱'
  }
];

<List items={listData} />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">List avec sélection</h3>
          <div className="demo-content">
            <p>Liste avec possibilité de sélection multiple :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-list-demo">
                <div className="ui-list ui-list--selectable">
                  {listData.map(item => (
                    <div 
                      key={item.id} 
                      className={`ui-list__item ${selectedItems.has(item.id) ? 'ui-list__item--selected' : ''}`}
                      onClick={() => toggleSelected(item.id)}
                    >
                      <div className="ui-list__checkbox">
                        <input
                          type="checkbox"
                          checked={selectedItems.has(item.id)}
                          onChange={() => toggleSelected(item.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div className="ui-list__icon">{item.icon}</div>
                      <div className="ui-list__content">
                        <h4 className="ui-list__title">{item.title}</h4>
                        <p className="ui-list__description">{item.description}</p>
                      </div>
                      <div className="ui-list__meta">
                        <span className="ui-list__date">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div style={{ marginTop: '1rem' }}>
                  <div className="ui-list__info">
                    <p><strong>Éléments sélectionnés :</strong> {Array.from(selectedItems).join(', ')}</p>
                  </div>
                  
                  <button
                    className="ui-button ui-button--outline"
                    onClick={() => setSelectedItems(new Set())}
                  >
                    Désélectionner tout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<SelectableList
  items={listData}
  selectedItems={selectedItems}
  onToggleSelected={setSelectedItems}
  multiSelect={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">List avec statuts et priorités</h3>
          <div className="demo-content">
            <p>Liste avec indicateurs de statut et de priorité :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-list-demo">
                <div className="ui-list ui-list--with-status">
                  {listData.map(item => (
                    <div key={item.id} className="ui-list__item">
                      <div className="ui-list__icon">{item.icon}</div>
                      <div className="ui-list__content">
                        <div className="ui-list__header">
                          <h4 className="ui-list__title">{item.title}</h4>
                          <div className="ui-list__indicators">
                            <span 
                              className="ui-list__priority"
                              style={{ backgroundColor: getPriorityColor(item.priority) }}
                            >
                              {item.priority}
                            </span>
                            <span 
                              className="ui-list__status"
                              style={{ backgroundColor: getStatusColor(item.status) }}
                            >
                              {item.status}
                            </span>
                          </div>
                        </div>
                        <p className="ui-list__description">{item.description}</p>
                        <div className="ui-list__tags">
                          {item.tags.map(tag => (
                            <span key={tag} className="ui-list__tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div className="ui-list__meta">
                        <span className="ui-list__date">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<StatusList
  items={listData}
  showPriority={true}
  showStatus={true}
  showTags={true}
  priorityColors={{
    high: 'error',
    medium: 'warning',
    low: 'success'
  }}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">List avec actions</h3>
          <div className="demo-content">
            <p>Liste avec actions contextuelles sur chaque élément :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-list-demo">
                <div className="ui-list ui-list--with-actions">
                  {listData.map(item => (
                    <div key={item.id} className="ui-list__item">
                      <div className="ui-list__icon">{item.icon}</div>
                      <div className="ui-list__content">
                        <h4 className="ui-list__title">{item.title}</h4>
                        <p className="ui-list__description">{item.description}</p>
                      </div>
                      <div className="ui-list__actions">
                        <button className="ui-list__action-btn" title="Voir">
                          👁️
                        </button>
                        <button className="ui-list__action-btn" title="Modifier">
                          ✏️
                        </button>
                        <button className="ui-list__action-btn" title="Supprimer">
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<ActionList
  items={listData}
  actions={[
    { label: 'Voir', icon: '👁️', action: 'view' },
    { label: 'Modifier', icon: '✏️', action: 'edit' },
    { label: 'Supprimer', icon: '🗑️', action: 'delete' }
  ]}
  onAction={(action, item) => handleAction(action, item)}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">List avec recherche et tri</h3>
          <div className="demo-content">
            <p>Liste avec fonctionnalités de recherche et de tri :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-list-demo">
                <div className="ui-list__controls">
                  <div className="ui-list__search">
                    <input
                      type="text"
                      className="ui-input"
                      placeholder="Rechercher dans la liste..."
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                      style={{ width: '300px' }}
                    />
                  </div>
                  
                  <div className="ui-list__sort">
                    <button
                      className="ui-button ui-button--outline"
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    >
                      Tri: {sortOrder === 'asc' ? 'A→Z' : 'Z→A'}
                    </button>
                  </div>
                </div>
                
                <div className="ui-list ui-list--searchable">
                  {sortedData.map(item => (
                    <div key={item.id} className="ui-list__item">
                      <div className="ui-list__icon">{item.icon}</div>
                      <div className="ui-list__content">
                        <h4 className="ui-list__title">{item.title}</h4>
                        <p className="ui-list__description">{item.description}</p>
                      </div>
                      <div className="ui-list__meta">
                        <span className="ui-list__date">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div style={{ marginTop: '1rem' }}>
                  <p className="ui-list__info">
                    <strong>{sortedData.length}</strong> élément(s) trouvé(s)
                  </p>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<SearchableList
  items={listData}
  searchable={true}
  sortable={true}
  onSearch={setFilterText}
  onSort={setSortOrder}
  sortOptions={[
    { label: 'Titre A→Z', value: 'title-asc' },
    { label: 'Titre Z→A', value: 'title-desc' },
    { label: 'Date', value: 'date' }
  ]}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">List avec éléments expansibles</h3>
          <div className="demo-content">
            <p>Liste avec éléments qui peuvent être développés :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-list-demo">
                <div className="ui-list ui-list--expandable">
                  {listData.map(item => (
                    <div key={item.id} className="ui-list__item">
                      <div className="ui-list__icon">{item.icon}</div>
                      <div className="ui-list__content">
                        <div className="ui-list__header">
                          <h4 className="ui-list__title">{item.title}</h4>
                          <button
                            className="ui-list__expand-toggle"
                            onClick={() => toggleExpanded(item.id)}
                          >
                            {expandedItems.has(item.id) ? '▼' : '▶'}
                          </button>
                        </div>
                        
                        {expandedItems.has(item.id) && (
                          <div className="ui-list__expanded-content">
                            <p className="ui-list__description">{item.description}</p>
                            <div className="ui-list__details">
                              <div className="ui-list__detail-item">
                                <strong>Statut :</strong> {item.status}
                              </div>
                              <div className="ui-list__detail-item">
                                <strong>Priorité :</strong> {item.priority}
                              </div>
                              <div className="ui-list__detail-item">
                                <strong>Tags :</strong> {item.tags.join(', ')}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<ExpandableList
  items={listData}
  expandedItems={expandedItems}
  onToggleExpanded={setExpandedItems}
  showDetails={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">List avec variantes</h3>
          <div className="demo-content">
            <p>Différentes variantes de liste selon le contexte :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-list-demo ui-list-demo--variants">
                <div className="ui-list-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Compact</h4>
                  <div className="ui-list ui-list--compact">
                    {listData.slice(0, 2).map(item => (
                      <div key={item.id} className="ui-list__item">
                        <div className="ui-list__icon">{item.icon}</div>
                        <div className="ui-list__content">
                          <h4 className="ui-list__title">{item.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="ui-list-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</h4>
                  <div className="ui-list ui-list--large">
                    {listData.slice(0, 2).map(item => (
                      <div key={item.id} className="ui-list__item">
                        <div className="ui-list__icon">{item.icon}</div>
                        <div className="ui-list__content">
                          <h4 className="ui-list__title">{item.title}</h4>
                          <p className="ui-list__description">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="ui-list-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Bordered</h4>
                  <div className="ui-list ui-list--bordered">
                    {listData.slice(0, 2).map(item => (
                      <div key={item.id} className="ui-list__item">
                        <div className="ui-list__icon">{item.icon}</div>
                        <div className="ui-list__content">
                          <h4 className="ui-list__title">{item.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<List variant="compact" items={listData} />
<List variant="large" items={listData} />
<List variant="bordered" items={listData} />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant List :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>items</strong> : array (éléments de la liste)</li>
                <li><strong>variant</strong> : "default" | "compact" | "large" | "bordered"</li>
                <li><strong>selectable</strong> : boolean (sélection possible)</li>
                <li><strong>multiSelect</strong> : boolean (sélection multiple)</li>
                <li><strong>searchable</strong> : boolean (recherche possible)</li>
                <li><strong>sortable</strong> : boolean (tri possible)</li>
                <li><strong>expandable</strong> : boolean (éléments expansibles)</li>
              </ul>
              
              <h4>Props d'interaction :</h4>
              <ul>
                <li><strong>selectedItems</strong> : Set&lt;string&gt; (éléments sélectionnés)</li>
                <li><strong>expandedItems</strong> : Set&lt;string&gt; (éléments développés)</li>
                <li><strong>onToggleSelected</strong> : (items: Set&lt;string&gt;) =&gt; void</li>
                <li><strong>onToggleExpanded</strong> : (items: Set&lt;string&gt;) =&gt; void</li>
                <li><strong>onItemClick</strong> : (item: any) =&gt; void</li>
              </ul>
              
              <h4>Props de personnalisation :</h4>
              <ul>
                <li><strong>showIcons</strong> : boolean (affichage des icônes)</li>
                <li><strong>showStatus</strong> : boolean (affichage des statuts)</li>
                <li><strong>showPriority</strong> : boolean (affichage des priorités)</li>
                <li><strong>showTags</strong> : boolean (affichage des tags)</li>
                <li><strong>showActions</strong> : boolean (affichage des actions)</li>
                <li><strong>className</strong> : string (classe CSS personnalisée)</li>
                <li><strong>style</strong> : object (styles inline personnalisés)</li>
              </ul>
              
              <h4>Variants spécialisés :</h4>
              <ul>
                <li><strong>SelectableList</strong> : Liste avec sélection</li>
                <li><strong>ActionList</strong> : Liste avec actions</li>
                <li><strong>StatusList</strong> : Liste avec statuts</li>
                <li><strong>SearchableList</strong> : Liste avec recherche</li>
                <li><strong>ExpandableList</strong> : Liste avec éléments expansibles</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onSearch</strong> : (query: string) =&gt; void</li>
                <li><strong>onSort</strong> : (sortBy: string) =&gt; void</li>
                <li><strong>onAction</strong> : (action: string, item: any) =&gt; void</li>
                <li><strong>onSelectionChange</strong> : (items: Set&lt;string&gt;) =&gt; void</li>
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
                <h4>Liste de tâches</h4>
                <p>Affichage de tâches avec statuts, priorités et actions.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Liste d'utilisateurs</h4>
                <p>Présentation d'utilisateurs avec informations et actions de gestion.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Liste de produits</h4>
                <p>Affichage de produits avec descriptions et actions d'achat.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPage;


