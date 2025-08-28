import React, { useState } from 'react';

const TabsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeTabVertical, setActiveTabVertical] = useState('profile');
  const [activeTabPills, setActiveTabPills] = useState('design');

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: '📊' },
    { id: 'features', label: 'Fonctionnalités', icon: '⚡' },
    { id: 'pricing', label: 'Tarifs', icon: '💰' },
    { id: 'support', label: 'Support', icon: '🆘' }
  ];

  const verticalTabs = [
    { id: 'profile', label: 'Profil', icon: '👤' },
    { id: 'settings', label: 'Paramètres', icon: '⚙️' },
    { id: 'security', label: 'Sécurité', icon: '🔒' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' }
  ];

  const pillTabs = [
    { id: 'design', label: 'Design', icon: '🎨' },
    { id: 'development', label: 'Développement', icon: '💻' },
    { id: 'marketing', label: 'Marketing', icon: '📈' },
    { id: 'analytics', label: 'Analytics', icon: '📊' }
  ];

  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case 'overview':
        return (
          <div className="ui-tab-content">
            <h3>Vue d'ensemble du produit</h3>
            <p>Cette section présente une vue d'ensemble complète de notre solution. Découvrez les principales fonctionnalités et avantages qui font de notre produit le choix idéal pour votre entreprise.</p>
            <div className="ui-tab-content__features">
              <div className="ui-tab-content__feature">
                <span className="ui-tab-content__feature-icon">✅</span>
                <span>Interface intuitive et moderne</span>
              </div>
              <div className="ui-tab-content__feature">
                <span className="ui-tab-content__feature-icon">✅</span>
                <span>Performance optimisée</span>
              </div>
              <div className="ui-tab-content__feature">
                <span className="ui-tab-content__feature-icon">✅</span>
                <span>Support 24/7</span>
              </div>
            </div>
          </div>
        );
      case 'features':
        return (
          <div className="ui-tab-content">
            <h3>Fonctionnalités avancées</h3>
            <p>Explorez toutes les fonctionnalités disponibles dans notre solution. Chaque fonctionnalité a été conçue pour améliorer votre productivité et simplifier vos processus.</p>
            <div className="ui-tab-content__grid">
              <div className="ui-tab-content__card">
                <h4>Gestion des utilisateurs</h4>
                <p>Gérez facilement les accès et permissions de votre équipe.</p>
              </div>
              <div className="ui-tab-content__card">
                <h4>Rapports avancés</h4>
                <p>Générez des rapports détaillés et personnalisables.</p>
              </div>
              <div className="ui-tab-content__card">
                <h4>Intégrations API</h4>
                <p>Connectez-vous avec vos outils existants.</p>
              </div>
            </div>
          </div>
        );
      case 'pricing':
        return (
          <div className="ui-tab-content">
            <h3>Plans tarifaires</h3>
            <p>Choisissez le plan qui correspond le mieux à vos besoins. Tous nos plans incluent les fonctionnalités essentielles et notre support client.</p>
            <div className="ui-tab-content__pricing">
              <div className="ui-tab-content__plan">
                <h4>Starter</h4>
                <div className="ui-tab-content__price">29€<span>/mois</span></div>
                <ul>
                  <li>5 utilisateurs</li>
                  <li>Fonctionnalités de base</li>
                  <li>Support email</li>
                </ul>
              </div>
              <div className="ui-tab-content__plan ui-tab-content__plan--featured">
                <h4>Professional</h4>
                <div className="ui-tab-content__price">79€<span>/mois</span></div>
                <ul>
                  <li>25 utilisateurs</li>
                  <li>Toutes les fonctionnalités</li>
                  <li>Support prioritaire</li>
                </ul>
              </div>
              <div className="ui-tab-content__plan">
                <h4>Enterprise</h4>
                <div className="ui-tab-content__price">199€<span>/mois</span></div>
                <ul>
                  <li>Utilisateurs illimités</li>
                  <li>Fonctionnalités avancées</li>
                  <li>Support dédié</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'support':
        return (
          <div className="ui-tab-content">
            <h3>Support client</h3>
            <p>Notre équipe de support est là pour vous aider. Nous proposons plusieurs canaux de support pour répondre à tous vos besoins.</p>
            <div className="ui-tab-content__support">
              <div className="ui-tab-content__support-item">
                <span className="ui-tab-content__support-icon">📧</span>
                <h4>Support email</h4>
                <p>Réponse sous 24h</p>
              </div>
              <div className="ui-tab-content__support-item">
                <span className="ui-tab-content__support-icon">💬</span>
                <h4>Chat en direct</h4>
                <p>Disponible 24/7</p>
              </div>
              <div className="ui-tab-content__support-item">
                <span className="ui-tab-content__support-icon">📚</span>
                <h4>Documentation</h4>
                <p>Guides détaillés</p>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="ui-tab-content">Contenu non trouvé</div>;
    }
  };

  const renderVerticalTabContent = (tabId: string) => {
    switch (tabId) {
      case 'profile':
        return (
          <div className="ui-tab-content">
            <h3>Profil utilisateur</h3>
            <p>Gérez vos informations personnelles et vos préférences de compte.</p>
            <div className="ui-tab-content__form">
              <div className="ui-tab-content__form-group">
                <label>Nom complet</label>
                <input type="text" placeholder="Votre nom complet" />
              </div>
              <div className="ui-tab-content__form-group">
                <label>Email</label>
                <input type="email" placeholder="votre@email.com" />
              </div>
              <div className="ui-tab-content__form-group">
                <label>Bio</label>
                <textarea placeholder="Parlez-nous de vous..."></textarea>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="ui-tab-content">
            <h3>Paramètres du compte</h3>
            <p>Personnalisez votre expérience selon vos préférences.</p>
            <div className="ui-tab-content__settings">
              <div className="ui-tab-content__setting">
                <span>Notifications push</span>
                <label className="ui-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="ui-switch__slider"></span>
                </label>
              </div>
              <div className="ui-tab-content__setting">
                <span>Mode sombre</span>
                <label className="ui-switch">
                  <input type="checkbox" />
                  <span className="ui-switch__slider"></span>
                </label>
              </div>
              <div className="ui-tab-content__setting">
                <span>Langue</span>
                <select>
                  <option>Français</option>
                  <option>English</option>
                  <option>Español</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="ui-tab-content">
            <h3>Sécurité du compte</h3>
            <p>Protégez votre compte avec des options de sécurité avancées.</p>
            <div className="ui-tab-content__security">
              <div className="ui-tab-content__security-item">
                <h4>Authentification à deux facteurs</h4>
                <p>Ajoutez une couche de sécurité supplémentaire à votre compte.</p>
                <button className="ui-button ui-button--primary">Activer 2FA</button>
              </div>
              <div className="ui-tab-content__security-item">
                <h4>Changer le mot de passe</h4>
                <p>Mettez à jour votre mot de passe régulièrement.</p>
                <button className="ui-button ui-button--secondary">Changer</button>
              </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="ui-tab-content">
            <h3>Préférences de notifications</h3>
            <p>Configurez comment et quand vous recevez vos notifications.</p>
            <div className="ui-tab-content__notifications">
              <div className="ui-tab-content__notification-type">
                <h4>Notifications par email</h4>
                <div className="ui-tab-content__notification-options">
                  <label><input type="checkbox" defaultChecked /> Nouveaux messages</label>
                  <label><input type="checkbox" defaultChecked /> Mises à jour de sécurité</label>
                  <label><input type="checkbox" /> Newsletter</label>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="ui-tab-content">Contenu non trouvé</div>;
    }
  };

  const renderPillTabContent = (tabId: string) => {
    switch (tabId) {
      case 'design':
        return (
          <div className="ui-tab-content">
            <h3>Design & UI/UX</h3>
            <p>Découvrez nos meilleures pratiques de design et nos composants UI.</p>
            <div className="ui-tab-content__design">
              <div className="ui-tab-content__design-item">
                <h4>Principes de design</h4>
                <p>Accessibilité, cohérence et simplicité au cœur de notre approche.</p>
              </div>
            </div>
          </div>
        );
      case 'development':
        return (
          <div className="ui-tab-content">
            <h3>Développement</h3>
            <p>Guide complet pour les développeurs et intégrateurs.</p>
            <div className="ui-tab-content__dev">
              <div className="ui-tab-content__dev-item">
                <h4>Documentation API</h4>
                <p>Référence complète de nos APIs et composants.</p>
              </div>
            </div>
          </div>
        );
      case 'marketing':
        return (
          <div className="ui-tab-content">
            <h3>Marketing & Growth</h3>
            <p>Stratégies et outils pour développer votre présence en ligne.</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="ui-tab-content">
            <h3>Analytics & Insights</h3>
            <p>Mesurez et analysez vos performances avec nos outils avancés.</p>
          </div>
        );
      default:
        return <div className="ui-tab-content">Contenu non trouvé</div>;
    }
  };

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Tabs</h1>
        <p className="section-description">
          Composant de navigation par onglets pour organiser le contenu en sections logiques. Permet aux utilisateurs de naviguer facilement entre différentes vues sans recharger la page.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Tabs horizontales basiques</h3>
          <div className="demo-content">
            <p>Navigation par onglets horizontale avec contenu dynamique :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-tabs">
                <div className="ui-tabs__header">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      className={`ui-tabs__tab ${activeTab === tab.id ? 'ui-tabs__tab--active' : ''}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <span className="ui-tabs__tab-icon">{tab.icon}</span>
                      <span className="ui-tabs__tab-label">{tab.label}</span>
                    </button>
                  ))}
                </div>
                <div className="ui-tabs__content">
                  {renderTabContent(activeTab)}
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { Tabs } from '@equitech-dev/ui-library';

const [activeTab, setActiveTab] = useState('overview');

<Tabs
  tabs={[
    { id: 'overview', label: 'Vue d\'ensemble', icon: '📊' },
    { id: 'features', label: 'Fonctionnalités', icon: '⚡' }
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Tabs verticales</h3>
          <div className="demo-content">
            <p>Navigation par onglets verticale pour les interfaces avec sidebar :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-tabs ui-tabs--vertical">
                <div className="ui-tabs__header">
                  {verticalTabs.map(tab => (
                    <button
                      key={tab.id}
                      className={`ui-tabs__tab ${activeTabVertical === tab.id ? 'ui-tabs__tab--active' : ''}`}
                      onClick={() => setActiveTabVertical(tab.id)}
                    >
                      <span className="ui-tabs__tab-icon">{tab.icon}</span>
                      <span className="ui-tabs__tab-label">{tab.label}</span>
                    </button>
                  ))}
                </div>
                <div className="ui-tabs__content">
                  {renderVerticalTabContent(activeTabVertical)}
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Tabs
  variant="vertical"
  tabs={verticalTabs}
  activeTab={activeTabVertical}
  onTabChange={setActiveTabVertical}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Tabs en forme de pills</h3>
          <div className="demo-content">
            <p>Onglets avec un style pill moderne et arrondi :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-tabs ui-tabs--pills">
                <div className="ui-tabs__header">
                  {pillTabs.map(tab => (
                    <button
                      key={tab.id}
                      className={`ui-tabs__tab ${activeTabPills === tab.id ? 'ui-tabs__tab--active' : ''}`}
                      onClick={() => setActiveTabPills(tab.id)}
                    >
                      <span className="ui-tabs__tab-icon">{tab.icon}</span>
                      <span className="ui-tabs__tab-label">{tab.label}</span>
                    </button>
                  ))}
                </div>
                <div className="ui-tabs__content">
                  {renderPillTabContent(activeTabPills)}
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Tabs
  variant="pills"
  tabs={pillTabs}
  activeTab={activeTabPills}
  onTabChange={setActiveTabPills}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Tabs avec tailles</h3>
          <div className="demo-content">
            <p>Différentes tailles d'onglets selon le contexte :</p>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Small</h4>
                <div className="ui-tabs ui-tabs--small">
                  <div className="ui-tabs__header">
                    <button className="ui-tabs__tab ui-tabs__tab--active">Onglet 1</button>
                    <button className="ui-tabs__tab">Onglet 2</button>
                    <button className="ui-tabs__tab">Onglet 3</button>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Medium (défaut)</h4>
                <div className="ui-tabs">
                  <div className="ui-tabs__header">
                    <button className="ui-tabs__tab ui-tabs__tab--active">Onglet 1</button>
                    <button className="ui-tabs__tab">Onglet 2</button>
                    <button className="ui-tabs__tab">Onglet 3</button>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</h4>
                <div className="ui-tabs ui-tabs--large">
                  <div className="ui-tabs__header">
                    <button className="ui-tabs__tab ui-tabs__tab--active">Onglet 1</button>
                    <button className="ui-tabs__tab">Onglet 2</button>
                    <button className="ui-tabs__tab">Onglet 3</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Tabs size="small" tabs={tabs} />
<Tabs size="medium" tabs={tabs} />
<Tabs size="large" tabs={tabs} />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Tabs avec badges</h3>
          <div className="demo-content">
            <p>Onglets avec badges pour afficher des informations supplémentaires :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-tabs">
                <div className="ui-tabs__header">
                  <button className="ui-tabs__tab ui-tabs__tab--active">
                    Messages
                    <span className="ui-tabs__tab-badge">12</span>
                  </button>
                  <button className="ui-tabs__tab">
                    Notifications
                    <span className="ui-tabs__tab-badge ui-tabs__tab-badge--warning">3</span>
                  </button>
                  <button className="ui-tabs__tab">
                    Tâches
                    <span className="ui-tabs__tab-badge ui-tabs__tab-badge--error">!</span>
                  </button>
                </div>
                <div className="ui-tabs__content">
                  <div className="ui-tab-content">
                    <h3>Messages</h3>
                    <p>Vous avez 12 nouveaux messages non lus.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Tabs
  tabs={[
    { id: 'messages', label: 'Messages', badge: 12 },
    { id: 'notifications', label: 'Notifications', badge: 3, badgeType: 'warning' }
  ]}
  showBadges={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant Tabs :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>tabs</strong> : Array&lt;Tab&gt; (liste des onglets)</li>
                <li><strong>activeTab</strong> : string (onglet actuellement actif)</li>
                <li><strong>onTabChange</strong> : function (callback de changement d'onglet)</li>
                <li><strong>variant</strong> : "horizontal" | "vertical" | "pills"</li>
                <li><strong>size</strong> : "small" | "medium" | "large"</li>
                <li><strong>showIcons</strong> : boolean (afficher les icônes)</li>
                <li><strong>showBadges</strong> : boolean (afficher les badges)</li>
                <li><strong>disabled</strong> : boolean (désactiver les onglets)</li>
                <li><strong>fullWidth</strong> : boolean (onglets en pleine largeur)</li>
              </ul>
              
              <h4>Types :</h4>
              <ul>
                <li><strong>Tab</strong> : &#123; id: string, label: string, icon?: string, badge?: number | string, badgeType?: string, disabled?: boolean &#125;</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onTabChange</strong> : (tabId: string) =&gt; void</li>
                <li><strong>onTabClick</strong> : (tab: Tab) =&gt; void</li>
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
                <h4>Dashboards</h4>
                <p>Organiser les métriques et KPIs par catégories.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Formulaires complexes</h4>
                <p>Diviser les formulaires longs en sections logiques.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Navigation de contenu</h4>
                <p>Organiser le contenu d'une page en sections thématiques.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsPage;


