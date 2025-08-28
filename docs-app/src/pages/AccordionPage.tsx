import React, { useState } from 'react';

interface AccordionItem {
  id: string;
  title: string;
  content: string;
  icon?: string;
  badge?: string;
  disabled?: boolean;
}

const AccordionPage: React.FC = () => {
  const [openItems, setOpenItems] = useState<string[]>(['faq-1']);
  const [singleOpenItem, setSingleOpenItem] = useState<string | null>('accordion-1');

  const faqItems: AccordionItem[] = [
    {
      id: 'faq-1',
      title: 'Comment installer la bibliothèque UI ?',
      content: 'Pour installer la bibliothèque UI EQUITECH, utilisez la commande npm install @equitech-dev/ui-library. Assurez-vous d\'avoir Node.js version 16 ou supérieure installé sur votre système.',
      icon: '📦'
    },
    {
      id: 'faq-2',
      title: 'Quels navigateurs sont supportés ?',
      content: 'Notre bibliothèque supporte tous les navigateurs modernes : Chrome 90+, Firefox 88+, Safari 14+, Edge 90+. Pour les navigateurs plus anciens, nous recommandons d\'utiliser des polyfills.',
      icon: '🌐'
    },
    {
      id: 'faq-3',
      title: 'Comment personnaliser les thèmes ?',
      content: 'Vous pouvez personnaliser les thèmes en utilisant nos variables CSS personnalisées ou en créant vos propres fichiers SCSS. Consultez notre guide de personnalisation pour plus de détails.',
      icon: '🎨'
    },
    {
      id: 'faq-4',
      title: 'Y a-t-il une version TypeScript ?',
      content: 'Oui ! Tous nos composants sont écrits en TypeScript et incluent des définitions de types complètes. Vous pouvez importer les types directement depuis le package.',
      icon: '📝'
    }
  ];

  const accordionItems: AccordionItem[] = [
    {
      id: 'accordion-1',
      title: 'Configuration de base',
      content: 'Cette section contient les paramètres de configuration de base de votre application. Vous pouvez modifier les préférences par défaut et définir les options principales.',
      icon: '⚙️'
    },
    {
      id: 'accordion-2',
      title: 'Paramètres avancés',
      content: 'Les paramètres avancés vous permettent de personnaliser davantage l\'expérience utilisateur. Attention, ces modifications peuvent affecter les performances.',
      icon: '🔧',
      badge: 'Pro'
    },
    {
      id: 'accordion-3',
      title: 'Intégrations',
      content: 'Configurez vos intégrations avec des services tiers. Connectez vos outils préférés pour une expérience optimale.',
      icon: '🔗'
    },
    {
      id: 'accordion-4',
      title: 'Sécurité et permissions',
      content: 'Gérez les paramètres de sécurité et les permissions utilisateur. Configurez l\'authentification à deux facteurs et les règles d\'accès.',
      icon: '🔒'
    }
  ];

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleSingleItem = (itemId: string) => {
    setSingleOpenItem(prev => prev === itemId ? null : itemId);
  };

  const isItemOpen = (itemId: string) => openItems.includes(itemId);
  const isSingleItemOpen = (itemId: string) => singleOpenItem === itemId;

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Accordion</h1>
        <p className="section-description">
          Composant d'accordéon pour organiser le contenu en sections pliables. Permet aux utilisateurs de naviguer facilement entre différentes sections tout en gardant l'interface organisée et claire.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Accordion basique</h3>
          <div className="demo-content">
            <p>Accordéon simple avec plusieurs sections ouvertes simultanément :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-accordion">
                {faqItems.map((item) => (
                  <div key={item.id} className="ui-accordion-item">
                    <button
                      className={`ui-accordion-header ${isItemOpen(item.id) ? 'expanded' : ''}`}
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isItemOpen(item.id)}
                      aria-controls={`${item.id}-content`}
                    >
                      <div className="ui-accordion-header-content">
                        {item.icon && <span className="ui-accordion-icon">{item.icon}</span>}
                        <span className="ui-accordion-title">{item.title}</span>
                      </div>
                      <span className="ui-accordion-icon">
                        {isItemOpen(item.id) ? '▼' : '▶'}
                      </span>
                    </button>
                    
                    <div
                      id={`${item.id}-content`}
                      className={`ui-accordion-content ${isItemOpen(item.id) ? 'expanded' : ''}`}
                      aria-hidden={!isItemOpen(item.id)}
                    >
                      <div className="ui-accordion-body">
                        <p>{item.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { Accordion } from '@equitech-dev/ui-library';

const [openItems, setOpenItems] = useState(['faq-1']);

<Accordion
  items={faqItems}
  openItems={openItems}
  onToggle={setOpenItems}
  multiple={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Accordion avec une seule section ouverte</h3>
          <div className="demo-content">
            <p>Accordéon où une seule section peut être ouverte à la fois :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-accordion ui-accordion--single">
                {accordionItems.map((item) => (
                  <div key={item.id} className="ui-accordion-item">
                    <button
                      className={`ui-accordion-header ${isSingleItemOpen(item.id) ? 'ui-accordion-header--open' : ''}`}
                      onClick={() => toggleSingleItem(item.id)}
                      aria-expanded={isSingleItemOpen(item.id)}
                      aria-controls={`${item.id}-single-content`}
                    >
                      <div className="ui-accordion-header-content">
                        {item.icon && <span className="ui-accordion-icon">{item.icon}</span>}
                        <span className="ui-accordion-title">{item.title}</span>
                        {item.badge && (
                          <span className="ui-accordion-badge ui-accordion-badge--pro">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <span className="ui-accordion-icon">
                        {isSingleItemOpen(item.id) ? '▼' : '▶'}
                      </span>
                    </button>
                    
                    <div
                      id={`${item.id}-single-content`}
                      className={`ui-accordion-content ${isSingleItemOpen(item.id) ? 'ui-accordion-content--open' : ''}`}
                      aria-hidden={!isSingleItemOpen(item.id)}
                    >
                      <div className="ui-accordion-content-inner">
                        <p>{item.content}</p>
                        {item.badge && (
                          <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--ui-warning-color)', borderRadius: '4px', fontSize: '0.875rem' }}>
                            ⚠️ Cette fonctionnalité nécessite un abonnement premium.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Accordion
  items={accordionItems}
  openItems={singleOpenItem}
  onToggle={setSingleOpenItem}
  multiple={false}
  variant="single"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Accordion avec icônes et badges</h3>
          <div className="demo-content">
            <p>Accordéon enrichi avec des icônes et des badges informatifs :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-accordion ui-accordion--enriched">
                <div className="ui-accordion-item">
                  <button className="ui-accordion-header ui-accordion-header--open">
                    <div className="ui-accordion-header-content">
                      <span className="ui-accordion-icon">🚀</span>
                      <span className="ui-accordion-title">Fonctionnalités premium</span>
                      <span className="ui-accordion-badge ui-accordion-badge--new">Nouveau</span>
                    </div>
                    <span className="ui-accordion-icon">▼</span>
                  </button>
                  <div className="ui-accordion-content ui-accordion-content--open">
                    <div className="ui-accordion-content-inner">
                      <p>Découvrez nos nouvelles fonctionnalités premium exclusives aux abonnés.</p>
                      <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                        <li>Thèmes personnalisés avancés</li>
                        <li>Support prioritaire 24/7</li>
                        <li>Intégrations API illimitées</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="ui-accordion-item">
                  <button className="ui-accordion-header">
                    <div className="ui-accordion-header-content">
                      <span className="ui-accordion-icon">📊</span>
                      <span className="ui-accordion-title">Analytics avancés</span>
                      <span className="ui-accordion-badge ui-accordion-badge--beta">Beta</span>
                    </div>
                    <span className="ui-accordion-icon">▶</span>
                  </button>
                  <div className="ui-accordion-content">
                    <div className="ui-accordion-content-inner">
                      <p>Fonctionnalité en version beta - testez-la et donnez-nous votre avis !</p>
                    </div>
                  </div>
                </div>
                
                <div className="ui-accordion-item">
                  <button className="ui-accordion-header">
                    <div className="ui-accordion-header-content">
                      <span className="ui-accordion-icon">🔒</span>
                      <span className="ui-accordion-title">Sécurité renforcée</span>
                      <span className="ui-accordion-badge ui-accordion-badge--secure">Sécurisé</span>
                    </div>
                    <span className="ui-accordion-icon">▶</span>
                  </button>
                  <div className="ui-accordion-content">
                    <div className="ui-accordion-content-inner">
                      <p>Protection avancée de vos données avec chiffrement de bout en bout.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Accordion
  items={items}
  showIcons={true}
  showBadges={true}
  badgeTypes={{
    new: { label: 'Nouveau', variant: 'success' },
    beta: { label: 'Beta', variant: 'warning' },
    secure: { label: 'Sécurisé', variant: 'info' }
  }}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Accordion avec tailles</h3>
          <div className="demo-content">
            <p>Différentes tailles d'accordéon selon le contexte :</p>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Small</h4>
                <div className="ui-accordion ui-accordion--small">
                  <div className="ui-accordion-item">
                    <button className="ui-accordion-header ui-accordion-header--open">
                      <span className="ui-accordion-title">Section compacte</span>
                      <span className="ui-accordion-icon">▼</span>
                    </button>
                    <div className="ui-accordion-content ui-accordion-content--open">
                      <div className="ui-accordion-content-inner">
                        <p>Contenu de la section compacte.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Medium (défaut)</h4>
                <div className="ui-accordion">
                  <div className="ui-accordion-item">
                    <button className="ui-accordion-header ui-accordion-header--open">
                      <span className="ui-accordion-title">Section standard</span>
                      <span className="ui-accordion-icon">▼</span>
                    </button>
                    <div className="ui-accordion-content ui-accordion-content--open">
                      <div className="ui-accordion-content-inner">
                        <p>Contenu de la section standard.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</h4>
                <div className="ui-accordion ui-accordion--large">
                  <div className="ui-accordion-item">
                    <button className="ui-accordion-header ui-accordion-header--open">
                      <span className="ui-accordion-title">Section large</span>
                      <span className="ui-accordion-icon">▼</span>
                    </button>
                    <div className="ui-accordion-content ui-accordion-content--open">
                      <div className="ui-accordion-content-inner">
                        <p>Contenu de la section large.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Accordion size="small" items={items} />
<Accordion size="medium" items={items} />
<Accordion size="large" items={items} />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Accordion avec animations</h3>
          <div className="demo-content">
            <p>Accordéon avec animations fluides et transitions :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-accordion ui-accordion--animated">
                <div className="ui-accordion-item">
                  <button className="ui-accordion-header ui-accordion-header--open">
                    <div className="ui-accordion-header-content">
                      <span className="ui-accordion-icon">🎭</span>
                      <span className="ui-accordion-title">Animations et transitions</span>
                    </div>
                    <span className="ui-accordion-icon">▼</span>
                  </button>
                  <div className="ui-accordion-content ui-accordion-content--open">
                    <div className="ui-accordion-content-inner">
                      <p>Cet accordéon utilise des animations CSS pour des transitions fluides :</p>
                      <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                        <li>Animation de l'icône chevron</li>
                        <li>Transition de la hauteur du contenu</li>
                        <li>Effet de fade pour le contenu</li>
                        <li>Animation des badges et icônes</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="ui-accordion-item">
                  <button className="ui-accordion-header">
                    <div className="ui-accordion-header-content">
                      <span className="ui-accordion-icon">⚡</span>
                      <span className="ui-accordion-title">Performance optimisée</span>
                    </div>
                    <span className="ui-accordion-icon">▶</span>
                  </button>
                  <div className="ui-accordion-content">
                    <div className="ui-accordion-content-inner">
                      <p>Les animations sont optimisées pour de meilleures performances.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Accordion
  items={items}
  animated={true}
  animationDuration={300}
  animationEasing="ease-in-out"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Accordion avec états spéciaux</h3>
          <div className="demo-content">
            <p>Gestion des états désactivés et des erreurs :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-accordion">
                <div className="ui-accordion-item">
                  <button className="ui-accordion-header ui-accordion-header--open">
                    <div className="ui-accordion-header-content">
                      <span className="ui-accordion-icon">✅</span>
                      <span className="ui-accordion-title">Section active</span>
                    </div>
                    <span className="ui-accordion-icon">▼</span>
                  </button>
                  <div className="ui-accordion-content ui-accordion-content--open">
                    <div className="ui-accordion-content-inner">
                      <p>Cette section est active et fonctionnelle.</p>
                    </div>
                  </div>
                </div>
                
                <div className="ui-accordion-item ui-accordion-item--disabled">
                  <button className="ui-accordion-header" disabled>
                    <div className="ui-accordion-header-content">
                      <span className="ui-accordion-icon">🚫</span>
                      <span className="ui-accordion-title">Section désactivée</span>
                      <span className="ui-accordion-badge ui-accordion-badge--disabled">Désactivé</span>
                    </div>
                    <span className="ui-accordion-icon">▶</span>
                  </button>
                  <div className="ui-accordion-content">
                    <div className="ui-accordion-content-inner">
                      <p>Cette section est temporairement désactivée.</p>
                    </div>
                  </div>
                </div>
                
                <div className="ui-accordion-item ui-accordion-item--error">
                  <button className="ui-accordion-header">
                    <div className="ui-accordion-header-content">
                      <span className="ui-accordion-icon">⚠️</span>
                      <span className="ui-accordion-title">Section avec erreur</span>
                      <span className="ui-accordion-badge ui-accordion-badge--error">Erreur</span>
                    </div>
                    <span className="ui-accordion-icon">▶</span>
                  </button>
                  <div className="ui-accordion-content">
                    <div className="ui-accordion-content-inner">
                      <p>Cette section contient des erreurs qui nécessitent votre attention.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Accordion
  items={items}
  showStates={true}
  disabledItems={['disabled-section']}
  errorItems={['error-section']}
  stateIndicators={{
    disabled: { icon: '🚫', badge: 'Désactivé' },
    error: { icon: '⚠️', badge: 'Erreur' }
  }}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant Accordion :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>items</strong> : Array&lt;AccordionItem&gt; (éléments de l'accordéon)</li>
                <li><strong>openItems</strong> : string | Array&lt;string&gt; (éléments ouverts)</li>
                <li><strong>onToggle</strong> : function (callback de changement d'état)</li>
                <li><strong>multiple</strong> : boolean (autoriser plusieurs sections ouvertes)</li>
                <li><strong>size</strong> : "small" | "medium" | "large"</li>
                <li><strong>variant</strong> : "default" | "single" | "bordered"</li>
                <li><strong>showIcons</strong> : boolean (afficher les icônes)</li>
                <li><strong>showBadges</strong> : boolean (afficher les badges)</li>
                <li><strong>animated</strong> : boolean (activer les animations)</li>
                <li><strong>animationDuration</strong> : number (durée des animations en ms)</li>
                <li><strong>disabled</strong> : boolean (désactiver l'accordéon)</li>
              </ul>
              
              <h4>Types :</h4>
              <ul>
                <li><strong>AccordionItem</strong> : &#123; id: string, title: string, content: string, icon?: string, badge?: string, disabled?: boolean &#125;</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onToggle</strong> : (itemId: string, isOpen: boolean) =&gt; void</li>
                <li><strong>onItemClick</strong> : (item: AccordionItem) =&gt; void</li>
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
                <h4>FAQ et support</h4>
                <p>Organiser les questions fréquentes et la documentation d'aide.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Paramètres et configuration</h4>
                <p>Grouper les options de configuration par catégories logiques.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Navigation de contenu</h4>
                <p>Organiser le contenu long en sections pliables pour améliorer la lisibilité.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionPage;


