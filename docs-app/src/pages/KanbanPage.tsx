import React, { useState } from 'react';

const KanbanPage: React.FC = () => {
  const [columns, setColumns] = useState([
    {
      id: 'todo',
      title: 'À faire',
      color: 'var(--ui-warning-color)',
      cards: [
        {
          id: 'card-1',
          title: 'Créer la maquette',
          description: 'Dessiner les wireframes pour la nouvelle interface',
          priority: 'high',
          assignee: 'Alice',
          dueDate: '2024-01-20',
          tags: ['design', 'urgent'],
          progress: 0
        },
        {
          id: 'card-2',
          title: 'Réviser la documentation',
          description: 'Mettre à jour le guide utilisateur',
          priority: 'medium',
          assignee: 'Bob',
          dueDate: '2024-01-25',
          tags: ['documentation'],
          progress: 0
        }
      ]
    },
    {
      id: 'in-progress',
      title: 'En cours',
      color: 'var(--ui-primary-color)',
      cards: [
        {
          id: 'card-3',
          title: 'Développer l\'API',
          description: 'Implémenter les endpoints REST',
          priority: 'high',
          assignee: 'Charlie',
          dueDate: '2024-01-22',
          tags: ['backend', 'api'],
          progress: 75
        }
      ]
    },
    {
      id: 'review',
      title: 'En révision',
      color: 'var(--ui-info-color)',
      cards: [
        {
          id: 'card-4',
          title: 'Tests unitaires',
          description: 'Vérifier la couverture des tests',
          priority: 'medium',
          assignee: 'Diana',
          dueDate: '2024-01-23',
          tags: ['testing'],
          progress: 100
        }
      ]
    },
    {
      id: 'done',
      title: 'Terminé',
      color: 'var(--ui-success-color)',
      cards: [
        {
          id: 'card-5',
          title: 'Setup du projet',
          description: 'Configuration initiale de l\'environnement',
          priority: 'low',
          assignee: 'Eve',
          dueDate: '2024-01-18',
          tags: ['setup'],
          progress: 100
        }
      ]
    }
  ]);

  const [draggedCard, setDraggedCard] = useState<string | null>(null);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);

  const handleDragStart = (cardId: string, columnId: string) => {
    setDraggedCard(cardId);
    setDraggedColumn(columnId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetColumnId: string) => {
    if (draggedCard && draggedColumn && draggedColumn !== targetColumnId) {
      const newColumns = [...columns];
      
      // Trouver la colonne source
      const sourceColumn = newColumns.find(col => col.id === draggedColumn);
      // Trouver la colonne cible
      const targetColumn = newColumns.find(col => col.id === targetColumnId);
      
      if (sourceColumn && targetColumn) {
        // Trouver la carte
        const cardIndex = sourceColumn.cards.findIndex(card => card.id === draggedCard);
        if (cardIndex !== -1) {
          const card = sourceColumn.cards[cardIndex];
          
          // Supprimer de la colonne source
          sourceColumn.cards.splice(cardIndex, 1);
          
          // Ajouter à la colonne cible
          targetColumn.cards.push(card);
          
          setColumns(newColumns);
        }
      }
    }
    
    setDraggedCard(null);
    setDraggedColumn(null);
  };

  const addCard = (columnId: string) => {
    const newCard = {
      id: `card-${Date.now()}`,
      title: 'Nouvelle tâche',
      description: 'Description de la nouvelle tâche',
      priority: 'medium',
      assignee: 'Nouveau',
      dueDate: '2024-01-30',
      tags: ['nouveau'],
      progress: 0
    };

    const newColumns = columns.map(col => 
      col.id === columnId 
        ? { ...col, cards: [...col.cards, newCard] }
        : col
    );
    
    setColumns(newColumns);
  };

  const removeCard = (columnId: string, cardId: string) => {
    const newColumns = columns.map(col => 
      col.id === columnId 
        ? { ...col, cards: col.cards.filter(card => card.id !== cardId) }
        : col
    );
    
    setColumns(newColumns);
  };

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

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Kanban</h1>
        <p className="section-description">
          Composant de tableau Kanban pour la gestion de flux de travail et de projets. Permet d'organiser les tâches en colonnes représentant différentes étapes du processus, avec possibilité de glisser-déposer pour réorganiser les éléments.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Kanban basique</h3>
          <div className="demo-content">
            <p>Tableau Kanban simple avec colonnes et cartes :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-kanban-demo">
                <div className="ui-kanban">
                  {columns.map(column => (
                    <div key={column.id} className="ui-kanban__column">
                      <div 
                        className="ui-kanban__column-header"
                        style={{ borderTopColor: column.color }}
                      >
                        <h3 className="ui-kanban__column-title">{column.title}</h3>
                        <span className="ui-kanban__column-count">{column.cards.length}</span>
                      </div>
                      
                      <div 
                        className="ui-kanban__column-content"
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(column.id)}
                      >
                        {column.cards.map(card => (
                          <div
                            key={card.id}
                            className="ui-kanban__card"
                            draggable
                            onDragStart={() => handleDragStart(card.id, column.id)}
                          >
                            <div className="ui-kanban__card-header">
                              <div className="ui-kanban__card-priority">
                                <span 
                                  className="ui-kanban__priority-icon"
                                  title={card.priority}
                                >
                                  {getPriorityIcon(card.priority)}
                                </span>
                              </div>
                              <button
                                className="ui-kanban__card-remove"
                                onClick={() => removeCard(column.id, card.id)}
                                title="Supprimer"
                              >
                                ×
                              </button>
                            </div>
                            
                            <h4 className="ui-kanban__card-title">{card.title}</h4>
                            <p className="ui-kanban__card-description">{card.description}</p>
                            
                            <div className="ui-kanban__card-meta">
                              <div className="ui-kanban__card-assignee">
                                👤 {card.assignee}
                              </div>
                              <div className="ui-kanban__card-due-date">
                                📅 {card.dueDate}
                              </div>
                            </div>
                            
                            <div className="ui-kanban__card-tags">
                              {card.tags.map(tag => (
                                <span key={tag} className="ui-kanban__card-tag">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            
                            {card.progress !== undefined && (
                              <div className="ui-kanban__card-progress">
                                <div className="ui-kanban__progress-bar">
                                  <div 
                                    className="ui-kanban__progress-fill"
                                    style={{ width: `${card.progress}%` }}
                                  />
                                </div>
                                <span className="ui-kanban__progress-text">{card.progress}%</span>
                              </div>
                            )}
                          </div>
                        ))}
                        
                        <button
                          className="ui-kanban__add-card-btn"
                          onClick={() => addCard(column.id)}
                        >
                          + Ajouter une carte
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div style={{ marginTop: '1rem' }}>
                  <div className="ui-kanban__info">
                    <p><strong>Total des cartes :</strong> {columns.reduce((sum, col) => sum + col.cards.length, 0)}</p>
                    <p><strong>Instructions :</strong> Glissez-déposez les cartes entre les colonnes pour changer leur statut</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { Kanban } from '@equitech-dev/ui-library';

const [columns, setColumns] = useState([
  {
    id: 'todo',
    title: 'À faire',
    cards: [
      {
        id: 'card-1',
        title: 'Tâche 1',
        description: 'Description de la tâche'
      }
    ]
  }
]);

<Kanban
  columns={columns}
  onColumnsChange={setColumns}
  draggable={true}
  droppable={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Kanban avec filtres</h3>
          <div className="demo-content">
            <p>Kanban avec système de filtrage et recherche :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-kanban-demo">
                <div className="ui-kanban__filters">
                  <div className="ui-kanban__filter-group">
                    <label className="ui-kanban__filter-label">Priorité :</label>
                    <select className="ui-kanban__filter-select">
                      <option value="">Toutes</option>
                      <option value="high">Haute</option>
                      <option value="medium">Moyenne</option>
                      <option value="low">Basse</option>
                    </select>
                  </div>
                  
                  <div className="ui-kanban__filter-group">
                    <label className="ui-kanban__filter-label">Assigné à :</label>
                    <select className="ui-kanban__filter-select">
                      <option value="">Tous</option>
                      <option value="Alice">Alice</option>
                      <option value="Bob">Bob</option>
                      <option value="Charlie">Charlie</option>
                    </select>
                  </div>
                  
                  <div className="ui-kanban__filter-group">
                    <label className="ui-kanban__filter-label">Recherche :</label>
                    <input
                      type="text"
                      className="ui-input"
                      placeholder="Rechercher dans les cartes..."
                      style={{ width: '200px' }}
                    />
                  </div>
                </div>
                
                <div className="ui-kanban ui-kanban--filtered">
                  {columns.map(column => (
                    <div key={column.id} className="ui-kanban__column">
                      <div 
                        className="ui-kanban__column-header"
                        style={{ borderTopColor: column.color }}
                      >
                        <h3 className="ui-kanban__column-title">{column.title}</h3>
                        <span className="ui-kanban__column-count">{column.cards.length}</span>
                      </div>
                      
                      <div className="ui-kanban__column-content">
                        {column.cards.slice(0, 2).map(card => (
                          <div key={card.id} className="ui-kanban__card">
                            <h4 className="ui-kanban__card-title">{card.title}</h4>
                            <p className="ui-kanban__card-description">{card.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<FilterableKanban
  columns={columns}
  filters={{
    priority: ['high', 'medium', 'low'],
    assignee: ['Alice', 'Bob', 'Charlie'],
    search: true
  }}
  onFilterChange={handleFilterChange}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Kanban avec statistiques</h3>
          <div className="demo-content">
            <p>Kanban avec tableau de bord et métriques :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-kanban-demo">
                <div className="ui-kanban__stats">
                  <div className="ui-kanban__stat-item">
                    <div className="ui-kanban__stat-value">
                      {columns.reduce((sum, col) => sum + col.cards.length, 0)}
                    </div>
                    <div className="ui-kanban__stat-label">Total des tâches</div>
                  </div>
                  
                  <div className="ui-kanban__stat-item">
                    <div className="ui-kanban__stat-value">
                      {columns.find(col => col.id === 'done')?.cards.length || 0}
                    </div>
                    <div className="ui-kanban__stat-label">Terminées</div>
                  </div>
                  
                  <div className="ui-kanban__stat-item">
                    <div className="ui-kanban__stat-value">
                      {columns.find(col => col.id === 'in-progress')?.cards.length || 0}
                    </div>
                    <div className="ui-kanban__stat-label">En cours</div>
                  </div>
                  
                  <div className="ui-kanban__stat-item">
                    <div className="ui-kanban__stat-value">
                      {columns.find(col => col.id === 'todo')?.cards.length || 0}
                    </div>
                    <div className="ui-kanban__stat-label">À faire</div>
                  </div>
                </div>
                
                <div className="ui-kanban ui-kanban--with-stats">
                  {columns.map(column => (
                    <div key={column.id} className="ui-kanban__column">
                      <div 
                        className="ui-kanban__column-header"
                        style={{ borderTopColor: column.color }}
                      >
                        <h3 className="ui-kanban__column-title">{column.title}</h3>
                        <span className="ui-kanban__column-count">{column.cards.length}</span>
                      </div>
                      
                      <div className="ui-kanban__column-content">
                        {column.cards.map(card => (
                          <div key={card.id} className="ui-kanban__card">
                            <h4 className="ui-kanban__card-title">{card.title}</h4>
                            <p className="ui-kanban__card-description">{card.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<KanbanWithStats
  columns={columns}
  showStats={true}
  stats={['total', 'completed', 'in-progress', 'todo']}
  onStatsUpdate={handleStatsUpdate}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Kanban avec actions avancées</h3>
          <div className="demo-content">
            <p>Kanban avec actions contextuelles et gestion avancée :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-kanban-demo">
                <div className="ui-kanban__toolbar">
                  <button className="ui-button ui-button--primary">
                    📊 Vue d'ensemble
                  </button>
                  <button className="ui-button ui-button--outline">
                    📅 Vue calendrier
                  </button>
                  <button className="ui-button ui-button--outline">
                    📋 Export
                  </button>
                  <button className="ui-button ui-button--outline">
                    ⚙️ Paramètres
                  </button>
                </div>
                
                <div className="ui-kanban ui-kanban--advanced">
                  {columns.map(column => (
                    <div key={column.id} className="ui-kanban__column">
                      <div 
                        className="ui-kanban__column-header"
                        style={{ borderTopColor: column.color }}
                      >
                        <h3 className="ui-kanban__column-title">{column.title}</h3>
                        <div className="ui-kanban__column-actions">
                          <span className="ui-kanban__column-count">{column.cards.length}</span>
                          <button className="ui-kanban__column-menu" title="Menu">
                            ⋮
                          </button>
                        </div>
                      </div>
                      
                      <div className="ui-kanban__column-content">
                        {column.cards.map(card => (
                          <div key={card.id} className="ui-kanban__card ui-kanban__card--advanced">
                            <div className="ui-kanban__card-header">
                              <div className="ui-kanban__card-priority">
                                <span className="ui-kanban__priority-icon">
                                  {getPriorityIcon(card.priority)}
                                </span>
                              </div>
                              <div className="ui-kanban__card-actions">
                                <button className="ui-kanban__card-action" title="Modifier">
                                  ✏️
                                </button>
                                <button className="ui-kanban__card-action" title="Dupliquer">
                                  📋
                                </button>
                                <button className="ui-kanban__card-action" title="Supprimer">
                                  🗑️
                                </button>
                              </div>
                            </div>
                            
                            <h4 className="ui-kanban__card-title">{card.title}</h4>
                            <p className="ui-kanban__card-description">{card.description}</p>
                            
                            <div className="ui-kanban__card-meta">
                              <div className="ui-kanban__card-assignee">
                                👤 {card.assignee}
                              </div>
                              <div className="ui-kanban__card-due-date">
                                📅 {card.dueDate}
                              </div>
                            </div>
                            
                            <div className="ui-kanban__card-tags">
                              {card.tags.map(tag => (
                                <span key={tag} className="ui-kanban__card-tag">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<AdvancedKanban
  columns={columns}
  showToolbar={true}
  showColumnActions={true}
  showCardActions={true}
  actions={{
    edit: true,
    duplicate: true,
    delete: true,
    export: true,
    settings: true
  }}
  onAction={handleAction}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Kanban avec variantes</h3>
          <div className="demo-content">
            <p>Différentes variantes de Kanban selon le contexte :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-kanban-demo ui-kanban-demo--variants">
                <div className="ui-kanban-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Compact</h4>
                  <div className="ui-kanban ui-kanban--compact">
                    {columns.slice(0, 2).map(column => (
                      <div key={column.id} className="ui-kanban__column">
                        <div className="ui-kanban__column-header">
                          <h3 className="ui-kanban__column-title">{column.title}</h3>
                        </div>
                        <div className="ui-kanban__column-content">
                          {column.cards.slice(0, 1).map(card => (
                            <div key={card.id} className="ui-kanban__card">
                              <h4 className="ui-kanban__card-title">{card.title}</h4>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="ui-kanban-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</h4>
                  <div className="ui-kanban ui-kanban--large">
                    {columns.slice(0, 2).map(column => (
                      <div key={column.id} className="ui-kanban__column">
                        <div className="ui-kanban__column-header">
                          <h3 className="ui-kanban__column-title">{column.title}</h3>
                        </div>
                        <div className="ui-kanban__column-content">
                          {column.cards.slice(0, 1).map(card => (
                            <div key={card.id} className="ui-kanban__card">
                              <h4 className="ui-kanban__card-title">{card.title}</h4>
                              <p className="ui-kanban__card-description">{card.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="ui-kanban-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Bordered</h4>
                  <div className="ui-kanban ui-kanban--bordered">
                    {columns.slice(0, 2).map(column => (
                      <div key={column.id} className="ui-kanban__column">
                        <div className="ui-kanban__column-header">
                          <h3 className="ui-kanban__column-title">{column.title}</h3>
                        </div>
                        <div className="ui-kanban__column-content">
                          {column.cards.slice(0, 1).map(card => (
                            <div key={card.id} className="ui-kanban__card">
                              <h4 className="ui-kanban__card-title">{card.title}</h4>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Kanban variant="compact" columns={columns} />
<Kanban variant="large" columns={columns} />
<Kanban variant="bordered" columns={columns} />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant Kanban :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>columns</strong> : array (colonnes du tableau)</li>
                <li><strong>variant</strong> : "default" | "compact" | "large" | "bordered"</li>
                <li><strong>draggable</strong> : boolean (cartes déplaçables)</li>
                <li><strong>droppable</strong> : boolean (colonnes réceptrices)</li>
                <li><strong>showStats</strong> : boolean (affichage des statistiques)</li>
                <li><strong>showToolbar</strong> : boolean (affichage de la barre d'outils)</li>
              </ul>
              
              <h4>Props d'interaction :</h4>
              <ul>
                <li><strong>onColumnsChange</strong> : (columns: array) =&gt; void</li>
                <li><strong>onCardMove</strong> : (cardId: string, fromColumn: string, toColumn: string) =&gt; void</li>
                <li><strong>onCardClick</strong> : (card: any) =&gt; void</li>
                <li><strong>onColumnClick</strong> : (column: any) =&gt; void</li>
                <li><strong>onAddCard</strong> : (columnId: string) =&gt; void</li>
              </ul>
              
              <h4>Props de personnalisation :</h4>
              <ul>
                <li><strong>columnWidth</strong> : string | number (largeur des colonnes)</li>
                <li><strong>cardHeight</strong> : string | number (hauteur des cartes)</li>
                <li><strong>showColumnCount</strong> : boolean (affichage du nombre de cartes)</li>
                <li><strong>showCardPriority</strong> : boolean (affichage des priorités)</li>
                <li><strong>showCardAssignee</strong> : boolean (affichage des assignés)</li>
                <li><strong>showCardDueDate</strong> : boolean (affichage des dates d'échéance)</li>
                <li><strong>className</strong> : string (classe CSS personnalisée)</li>
                <li><strong>style</strong> : object (styles inline personnalisés)</li>
              </ul>
              
              <h4>Variants spécialisés :</h4>
              <ul>
                <li><strong>FilterableKanban</strong> : Kanban avec filtres</li>
                <li><strong>KanbanWithStats</strong> : Kanban avec statistiques</li>
                <li><strong>AdvancedKanban</strong> : Kanban avec actions avancées</li>
                <li><strong>MiniKanban</strong> : Kanban compact pour navigation</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onDragStart</strong> : (cardId: string, columnId: string) =&gt; void</li>
                <li><strong>onDragOver</strong> : (columnId: string) =&gt; void</li>
                <li><strong>onDrop</strong> : (cardId: string, columnId: string) =&gt; void</li>
                <li><strong>onColumnAdd</strong> : (column: any) =&gt; void</li>
                <li><strong>onColumnRemove</strong> : (columnId: string) =&gt; void</li>
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
                <h4>Gestion de projets</h4>
                <p>Suivi des tâches et du workflow de développement.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Support client</h4>
                <p>Gestion des tickets et du pipeline de résolution.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Recrutement</h4>
                <p>Suivi des candidats à travers le processus d'embauche.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanPage;
