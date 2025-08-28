import React, { useState } from 'react';

const TimelinePage: React.FC = () => {
  const [activeItem, setActiveItem] = useState(2);
  const [expandedItems, setExpandedItems] = useState<number[]>([1, 3]);

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const timelineData = [
    {
      id: 1,
      title: 'Commande passée',
      description: 'Votre commande a été reçue et est en cours de traitement.',
      date: '2024-01-15',
      time: '10:30',
      status: 'completed',
      icon: '📦',
      details: 'Commande #12345 confirmée. Paiement reçu par carte bancaire.'
    },
    {
      id: 2,
      title: 'En préparation',
      description: 'Votre commande est en cours de préparation dans nos entrepôts.',
      date: '2024-01-16',
      time: '14:15',
      status: 'active',
      icon: '⚙️',
      details: 'Articles en cours de picking et d\'emballage. Vérification qualité en cours.'
    },
    {
      id: 3,
      title: 'Expédiée',
      description: 'Votre commande a été expédiée et est en route.',
      date: '2024-01-17',
      time: '09:45',
      status: 'pending',
      icon: '🚚',
      details: 'Numéro de suivi : TRK789456. Livraison estimée : 2-3 jours ouvrés.'
    },
    {
      id: 4,
      title: 'En livraison',
      description: 'Votre commande est en cours de livraison.',
      date: '2024-01-18',
      time: '11:20',
      status: 'pending',
      icon: '📮',
      details: 'Livreur en route. Livraison prévue aujourd\'hui entre 14h et 18h.'
    },
    {
      id: 5,
      title: 'Livrée',
      description: 'Votre commande a été livrée avec succès.',
      date: '2024-01-19',
      time: '15:30',
      status: 'pending',
      icon: '✅',
      details: 'Commande livrée et signée. Merci pour votre confiance !'
    }
  ];

  const projectTimeline = [
    {
      id: 1,
      title: 'Phase de conception',
      description: 'Définition des besoins et création des maquettes',
      startDate: '2024-01-01',
      endDate: '2024-01-15',
      status: 'completed',
      progress: 100,
      team: ['Designer', 'Product Owner'],
      milestones: ['Brief client validé', 'Wireframes approuvés', 'Maquettes finalisées']
    },
    {
      id: 2,
      title: 'Phase de développement',
      description: 'Codage et implémentation des fonctionnalités',
      startDate: '2024-01-16',
      endDate: '2024-02-15',
      status: 'active',
      progress: 65,
      team: ['Développeurs', 'DevOps'],
      milestones: ['Architecture définie', 'API développée', 'Interface utilisateur']
    },
    {
      id: 3,
      title: 'Phase de test',
      description: 'Tests unitaires, intégration et validation',
      startDate: '2024-02-16',
      endDate: '2024-03-01',
      status: 'pending',
      progress: 0,
      team: ['QA', 'Testeurs'],
      milestones: ['Tests unitaires', 'Tests d\'intégration', 'Tests utilisateur']
    },
    {
      id: 4,
      title: 'Déploiement',
      description: 'Mise en production et lancement',
      startDate: '2024-03-02',
      endDate: '2024-03-15',
      status: 'pending',
      progress: 0,
      team: ['DevOps', 'Support'],
      milestones: ['Environnement de production', 'Déploiement', 'Monitoring']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'var(--ui-success-color)';
      case 'active':
        return 'var(--ui-primary-color)';
      case 'pending':
        return 'var(--ui-border-color)';
      case 'error':
        return 'var(--ui-error-color)';
      default:
        return 'var(--ui-border-color)';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'active':
        return '●';
      case 'pending':
        return '○';
      case 'error':
        return '✗';
      default:
        return '○';
    }
  };

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Timeline</h1>
        <p className="section-description">
          Composant de timeline pour afficher une chronologie d'événements ou d'étapes. Permet de visualiser l'ordre et la progression des actions dans le temps, avec des indicateurs visuels clairs.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Timeline basique</h3>
          <div className="demo-content">
            <p>Timeline simple avec étapes et statuts :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-timeline-demo">
                <div className="ui-timeline">
                  {timelineData.map((item, index) => (
                    <div 
                      key={item.id} 
                      className={`ui-timeline__item ui-timeline__item--${item.status}`}
                      onClick={() => setActiveItem(item.id)}
                    >
                      <div className="ui-timeline__marker">
                        <div 
                          className="ui-timeline__status"
                          style={{ backgroundColor: getStatusColor(item.status) }}
                        >
                          {getStatusIcon(item.status)}
                        </div>
                      </div>
                      
                      <div className="ui-timeline__content">
                        <div className="ui-timeline__header">
                          <div className="ui-timeline__icon">{item.icon}</div>
                          <div className="ui-timeline__info">
                            <h4 className="ui-timeline__title">{item.title}</h4>
                            <p className="ui-timeline__description">{item.description}</p>
                          </div>
                          <div className="ui-timeline__date">
                            <div className="ui-timeline__date-main">{item.date}</div>
                            <div className="ui-timeline__date-time">{item.time}</div>
                          </div>
                        </div>
                        
                        {activeItem === item.id && (
                          <div className="ui-timeline__details">
                            <p>{item.details}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div style={{ marginTop: '1rem' }}>
                  <button
                    className="ui-button ui-button--outline"
                    onClick={() => setActiveItem(0)}
                  >
                    Masquer les détails
                  </button>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { Timeline } from '@equitech-dev/ui-library';

const timelineData = [
  {
    title: 'Commande passée',
    description: 'Votre commande a été reçue',
    date: '2024-01-15',
    status: 'completed'
  }
];

<Timeline
  items={timelineData}
  activeItem={activeItem}
  onItemClick={setActiveItem}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Timeline avec variantes</h3>
          <div className="demo-content">
            <p>Différentes variantes de timeline selon le contexte :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-timeline-demo ui-timeline-demo--variants">
                <div className="ui-timeline-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Vertical (défaut)</h4>
                  <div className="ui-timeline ui-timeline--vertical">
                    {timelineData.slice(0, 3).map((item, index) => (
                      <div key={item.id} className={`ui-timeline__item ui-timeline__item--${item.status}`}>
                        <div className="ui-timeline__marker">
                          <div className="ui-timeline__status" style={{ backgroundColor: getStatusColor(item.status) }}>
                            {getStatusIcon(item.status)}
                          </div>
                        </div>
                        <div className="ui-timeline__content">
                          <h5 className="ui-timeline__title">{item.title}</h5>
                          <p className="ui-timeline__description">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="ui-timeline-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Horizontal</h4>
                  <div className="ui-timeline ui-timeline--horizontal">
                    {timelineData.slice(0, 4).map((item, index) => (
                      <div key={item.id} className={`ui-timeline__item ui-timeline__item--${item.status}`}>
                        <div className="ui-timeline__marker">
                          <div className="ui-timeline__status" style={{ backgroundColor: getStatusColor(item.status) }}>
                            {getStatusIcon(item.status)}
                          </div>
                        </div>
                        <div className="ui-timeline__content">
                          <h5 className="ui-timeline__title">{item.title}</h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="ui-timeline-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Centré</h4>
                  <div className="ui-timeline ui-timeline--centered">
                    {timelineData.slice(0, 3).map((item, index) => (
                      <div key={item.id} className={`ui-timeline__item ui-timeline__item--${item.status}`}>
                        <div className="ui-timeline__marker">
                          <div className="ui-timeline__status" style={{ backgroundColor: getStatusColor(item.status) }}>
                            {getStatusIcon(item.status)}
                          </div>
                        </div>
                        <div className="ui-timeline__content">
                          <h5 className="ui-timeline__title">{item.title}</h5>
                          <p className="ui-timeline__description">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Timeline variant="vertical" items={timelineData} />
<Timeline variant="horizontal" items={timelineData} />
<Timeline variant="centered" items={timelineData} />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Timeline avec étapes</h3>
          <div className="demo-content">
            <p>Timeline avec étapes numérotées et progression :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-timeline-demo">
                <div className="ui-timeline ui-timeline--steps">
                  {timelineData.map((item, index) => (
                    <div key={item.id} className={`ui-timeline__item ui-timeline__item--${item.status}`}>
                      <div className="ui-timeline__marker">
                        <div className="ui-timeline__step">
                          {item.status === 'completed' ? '✓' : index + 1}
                        </div>
                      </div>
                      
                      <div className="ui-timeline__content">
                        <div className="ui-timeline__header">
                          <h4 className="ui-timeline__title">Étape {index + 1}: {item.title}</h4>
                          <div className="ui-timeline__date">{item.date}</div>
                        </div>
                        <p className="ui-timeline__description">{item.description}</p>
                        
                        {item.status === 'active' && (
                          <div className="ui-timeline__progress">
                            <div className="ui-timeline__progress-bar">
                              <div className="ui-timeline__progress-fill" style={{ width: '75%' }}></div>
                            </div>
                            <span className="ui-timeline__progress-text">75% terminé</span>
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
{`<Timeline
  variant="steps"
  items={timelineData}
  showProgress={true}
  showStepNumbers={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Timeline de projet</h3>
          <div className="demo-content">
            <p>Timeline détaillée pour un projet avec dates et équipes :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-timeline-demo">
                <div className="ui-timeline ui-timeline--project">
                  {projectTimeline.map((item, index) => (
                    <div key={item.id} className={`ui-timeline__item ui-timeline__item--${item.status}`}>
                      <div className="ui-timeline__marker">
                        <div className="ui-timeline__status" style={{ backgroundColor: getStatusColor(item.status) }}>
                          {getStatusIcon(item.status)}
                        </div>
                      </div>
                      
                      <div className="ui-timeline__content">
                        <div className="ui-timeline__header">
                          <h4 className="ui-timeline__title">{item.title}</h4>
                          <div className="ui-timeline__dates">
                            <span>{item.startDate}</span>
                            <span>→</span>
                            <span>{item.endDate}</span>
                          </div>
                        </div>
                        
                        <p className="ui-timeline__description">{item.description}</p>
                        
                        <div className="ui-timeline__meta">
                          <div className="ui-timeline__team">
                            <strong>Équipe :</strong> {item.team.join(', ')}
                          </div>
                          
                          <div className="ui-timeline__progress">
                            <div className="ui-timeline__progress-bar">
                              <div 
                                className="ui-timeline__progress-fill" 
                                style={{ width: `${item.progress}%` }}
                              ></div>
                            </div>
                            <span className="ui-timeline__progress-text">{item.progress}%</span>
                          </div>
                        </div>
                        
                        {expandedItems.includes(item.id) && (
                          <div className="ui-timeline__details">
                            <h5>Jalons :</h5>
                            <ul className="ui-timeline__milestones">
                              {item.milestones.map((milestone, idx) => (
                                <li key={idx}>{milestone}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <button
                          className="ui-timeline__toggle"
                          onClick={() => toggleExpanded(item.id)}
                        >
                          {expandedItems.includes(item.id) ? 'Masquer' : 'Afficher'} les détails
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<ProjectTimeline
  items={projectTimeline}
  showProgress={true}
  showTeam={true}
  showMilestones={true}
  expandable={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Timeline avec connecteurs</h3>
          <div className="demo-content">
            <p>Timeline avec différents styles de connecteurs :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-timeline-demo ui-timeline-demo--connectors">
                <div className="ui-timeline-demo__connector-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Ligne simple</h4>
                  <div className="ui-timeline ui-timeline--line">
                    {timelineData.slice(0, 3).map((item, index) => (
                      <div key={item.id} className={`ui-timeline__item ui-timeline__item--${item.status}`}>
                        <div className="ui-timeline__marker">
                          <div className="ui-timeline__status" style={{ backgroundColor: getStatusColor(item.status) }}>
                            {getStatusIcon(item.status)}
                          </div>
                        </div>
                        <div className="ui-timeline__content">
                          <h5 className="ui-timeline__title">{item.title}</h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="ui-timeline-demo__connector-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Ligne pointillée</h4>
                  <div className="ui-timeline ui-timeline--dashed">
                    {timelineData.slice(0, 3).map((item, index) => (
                      <div key={item.id} className={`ui-timeline__item ui-timeline__item--${item.status}`}>
                        <div className="ui-timeline__marker">
                          <div className="ui-timeline__status" style={{ backgroundColor: getStatusColor(item.status) }}>
                            {getStatusIcon(item.status)}
                          </div>
                        </div>
                        <div className="ui-timeline__content">
                          <h5 className="ui-timeline__title">{item.title}</h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="ui-timeline-demo__connector-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Sans connecteur</h4>
                  <div className="ui-timeline ui-timeline--no-connector">
                    {timelineData.slice(0, 3).map((item, index) => (
                      <div key={item.id} className={`ui-timeline__item ui-timeline__item--${item.status}`}>
                        <div className="ui-timeline__marker">
                          <div className="ui-timeline__status" style={{ backgroundColor: getStatusColor(item.status) }}>
                            {getStatusIcon(item.status)}
                          </div>
                        </div>
                        <div className="ui-timeline__content">
                          <h5 className="ui-timeline__title">{item.title}</h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Timeline connector="line" items={timelineData} />
<Timeline connector="dashed" items={timelineData} />
<Timeline connector="none" items={timelineData} />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Timeline avec actions</h3>
          <div className="demo-content">
            <p>Timeline interactive avec actions et boutons :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-timeline-demo">
                <div className="ui-timeline ui-timeline--interactive">
                  {timelineData.map((item, index) => (
                    <div key={item.id} className={`ui-timeline__item ui-timeline__item--${item.status}`}>
                      <div className="ui-timeline__marker">
                        <div className="ui-timeline__status" style={{ backgroundColor: getStatusColor(item.status) }}>
                          {getStatusIcon(item.status)}
                        </div>
                      </div>
                      
                      <div className="ui-timeline__content">
                        <div className="ui-timeline__header">
                          <h4 className="ui-timeline__title">{item.title}</h4>
                          <div className="ui-timeline__date">{item.date}</div>
                        </div>
                        
                        <p className="ui-timeline__description">{item.description}</p>
                        
                        <div className="ui-timeline__actions">
                          {item.status === 'active' && (
                            <>
                              <button className="ui-button ui-button--small ui-button--primary">
                                Marquer comme terminé
                              </button>
                              <button className="ui-button ui-button--small ui-button--outline">
                                Modifier
                              </button>
                            </>
                          )}
                          
                          {item.status === 'pending' && (
                            <button className="ui-button ui-button--small ui-button--outline">
                              Démarrer
                            </button>
                          )}
                          
                          <button className="ui-button ui-button--small ui-button--text">
                            Voir les détails
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<InteractiveTimeline
  items={timelineData}
  onAction={(action, item) => handleAction(action, item)}
  showActions={true}
  actions={[
    { label: 'Marquer comme terminé', action: 'complete' },
    { label: 'Modifier', action: 'edit' }
  ]}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant Timeline :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>items</strong> : array (liste des éléments de la timeline)</li>
                <li><strong>variant</strong> : "vertical" | "horizontal" | "centered"</li>
                <li><strong>connector</strong> : "line" | "dashed" | "none"</li>
                <li><strong>activeItem</strong> : number (élément actuellement actif)</li>
                <li><strong>showDates</strong> : boolean (afficher les dates)</li>
                <li><strong>showIcons</strong> : boolean (afficher les icônes)</li>
                <li><strong>showProgress</strong> : boolean (afficher la progression)</li>
              </ul>
              
              <h4>Props d'interaction :</h4>
              <ul>
                <li><strong>onItemClick</strong> : (item: any) =&gt; void</li>
                <li><strong>onAction</strong> : (action: string, item: any) =&gt; void</li>
                <li><strong>expandable</strong> : boolean (éléments extensibles)</li>
                <li><strong>showActions</strong> : boolean (afficher les actions)</li>
              </ul>
              
              <h4>Props de personnalisation :</h4>
              <ul>
                <li><strong>markerSize</strong> : "small" | "medium" | "large"</li>
                <li><strong>markerShape</strong> : "circle" | "square" | "diamond"</li>
                <li><strong>colors</strong> : object (couleurs personnalisées)</li>
                <li><strong>className</strong> : string (classe CSS personnalisée)</li>
                <li><strong>style</strong> : object (styles inline personnalisés)</li>
              </ul>
              
              <h4>Variants spécialisés :</h4>
              <ul>
                <li><strong>ProjectTimeline</strong> : Timeline pour projets avec équipes et jalons</li>
                <li><strong>StepTimeline</strong> : Timeline avec étapes numérotées</li>
                <li><strong>InteractiveTimeline</strong> : Timeline avec actions et boutons</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onItemExpand</strong> : (item: any) =&gt; void</li>
                <li><strong>onItemCollapse</strong> : (item: any) =&gt; void</li>
                <li><strong>onStatusChange</strong> : (item: any, newStatus: string) =&gt; void</li>
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
                <h4>Suivi de commandes</h4>
                <p>Afficher le statut et la progression d'une commande en ligne.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Gestion de projets</h4>
                <p>Visualiser les phases et jalons d'un projet avec équipes et dates.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Processus métier</h4>
                <p>Représenter les étapes d'un workflow ou processus d'approbation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;


