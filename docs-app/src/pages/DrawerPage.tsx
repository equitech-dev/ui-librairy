import React, { useState } from 'react';

const DrawerPage: React.FC = () => {
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [isTopDrawerOpen, setIsTopDrawerOpen] = useState(false);
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState(false);

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Drawer / Sidebar</h1>
        <p className="section-description">
          Composant de tiroir latéral pour afficher du contenu supplémentaire sans perdre le contexte principal. 
          Idéal pour la navigation, les paramètres, les détails ou les actions secondaires.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Drawer basique (gauche)</h3>
          <div className="demo-content">
            <p>Drawer latéral gauche avec contenu de navigation :</p>
            <div style={{ marginTop: '1rem' }}>
              <button 
                className="ui-button ui-button--primary"
                onClick={() => setIsLeftDrawerOpen(true)}
              >
                Ouvrir le drawer
              </button>
              
              {isLeftDrawerOpen && (
                <div className="ui-drawer-overlay ui-drawer-overlay--visible" onClick={() => setIsLeftDrawerOpen(false)}>
                  <div className="ui-drawer ui-drawer--left ui-drawer--open" onClick={(e) => e.stopPropagation()}>
                    <div className="ui-drawer-header">
                      <h3>Navigation</h3>
                      <button 
                        className="ui-drawer-close"
                        onClick={() => setIsLeftDrawerOpen(false)}
                      />
                    </div>
                    <div className="ui-drawer-body">
                      <nav className="ui-drawer-nav">
                        <button 
                          onClick={() => alert('Navigation vers Accueil')}
                          className="ui-drawer-nav-item"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
                        >
                          Accueil
                        </button>
                        <button 
                          onClick={() => alert('Navigation vers Profil')}
                          className="ui-drawer-nav-item"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
                        >
                          Profil
                        </button>
                        <button 
                          onClick={() => alert('Navigation vers Paramètres')}
                          className="ui-drawer-nav-item"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
                        >
                          Paramètres
                        </button>
                        <button 
                          onClick={() => alert('Navigation vers Aide')}
                          className="ui-drawer-nav-item"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
                        >
                          Aide
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <pre className="demo-code">
{`import { Drawer } from '@equitech-dev/ui-library';

const [isOpen, setIsOpen] = useState(false);

<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  position="left"
  title="Navigation"
>
  <nav>
    <a href="#">Accueil</a>
    <a href="#">Profil</a>
    <a href="#">Paramètres</a>
  </nav>
</Drawer>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Drawer droite</h3>
          <div className="demo-content">
            <p>Drawer latéral droit pour les détails ou actions :</p>
            <div style={{ marginTop: '1rem' }}>
              <button 
                className="ui-button ui-button--secondary"
                onClick={() => setIsRightDrawerOpen(true)}
              >
                Détails du projet
              </button>
              
              {isRightDrawerOpen && (
                <div className="ui-drawer-overlay ui-drawer-overlay--visible" onClick={() => setIsRightDrawerOpen(false)}>
                  <div className="ui-drawer ui-drawer--right ui-drawer--open" onClick={(e) => e.stopPropagation()}>
                    <div className="ui-drawer-header">
                      <h3>Détails du projet</h3>
                      <button 
                        className="ui-drawer-close"
                        onClick={() => setIsRightDrawerOpen(false)}
                      />
                    </div>
                    <div className="ui-drawer-body">
                      <div className="ui-drawer-section">
                        <h4>Informations générales</h4>
                        <p>Projet EQUITECH UI Library</p>
                        <p>Version: 1.0.0</p>
                        <p>Statut: En développement</p>
                      </div>
                      <div className="ui-drawer-section">
                        <h4>Actions</h4>
                        <button className="ui-button ui-button--primary">Modifier</button>
                        <button className="ui-button ui-button--danger">Supprimer</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <pre className="demo-code">
{`<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  position="right"
  title="Détails du projet"
>
  <div>
    <h4>Informations générales</h4>
    <p>Projet EQUITECH UI Library</p>
  </div>
</Drawer>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Drawer avec variantes</h3>
          <div className="demo-content">
            <p>Différentes positions et tailles de drawer :</p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                className="ui-button ui-button--outline"
                onClick={() => setIsTopDrawerOpen(true)}
              >
                Drawer haut
              </button>
              <button 
                className="ui-button ui-button--outline"
                onClick={() => setIsBottomDrawerOpen(true)}
              >
                Drawer bas
              </button>
            </div>
            
            {isTopDrawerOpen && (
              <div className="ui-drawer-overlay ui-drawer-overlay--visible" onClick={() => setIsTopDrawerOpen(false)}>
                <div className="ui-drawer ui-drawer--top ui-drawer--open" onClick={(e) => e.stopPropagation()}>
                  <div className="ui-drawer-header">
                    <h3>Notifications</h3>
                    <button 
                        className="ui-drawer-close"
                        onClick={() => setIsTopDrawerOpen(false)}
                      />
                  </div>
                  <div className="ui-drawer-body">
                    <div className="ui-notification">
                      <span>✅ Nouveau composant ajouté</span>
                    </div>
                    <div className="ui-notification">
                      <span>⚠️ Mise à jour disponible</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {isBottomDrawerOpen && (
              <div className="ui-drawer-overlay ui-drawer-overlay--visible" onClick={() => setIsBottomDrawerOpen(false)}>
                <div className="ui-drawer ui-drawer--bottom ui-drawer--open" onClick={(e) => e.stopPropagation()}>
                  <div className="ui-drawer-header">
                    <h3>Actions rapides</h3>
                    <button 
                        className="ui-drawer-close"
                        onClick={() => setIsBottomDrawerOpen(false)}
                      />
                  </div>
                  <div className="ui-drawer-body">
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                      <button className="ui-button ui-button--primary">Créer</button>
                      <button className="ui-button ui-button--secondary">Importer</button>
                      <button className="ui-button ui-button--outline">Exporter</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <pre className="demo-code">
{`<Drawer position="top" title="Notifications">
  <div>Contenu des notifications</div>
</Drawer>

<Drawer position="bottom" title="Actions rapides">
  <div>Boutons d'action</div>
</Drawer>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant Drawer :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>isOpen</strong> : boolean (état d'ouverture du drawer)</li>
                <li><strong>onClose</strong> : () =&gt; void (callback de fermeture)</li>
                <li><strong>position</strong> : "left" | "right" | "top" | "bottom"</li>
                <li><strong>title</strong> : string (titre du drawer)</li>
                <li><strong>children</strong> : ReactNode (contenu du drawer)</li>
              </ul>
              
              <h4>Props de personnalisation :</h4>
              <ul>
                <li><strong>size</strong> : "small" | "medium" | "large" | "full"</li>
                <li><strong>overlay</strong> : boolean (afficher l'overlay)</li>
                <li><strong>closeOnOverlayClick</strong> : boolean (fermer au clic sur overlay)</li>
                <li><strong>closeOnEscape</strong> : boolean (fermer avec Escape)</li>
                <li><strong>animation</strong> : "slide" | "fade" | "none"</li>
              </ul>
              
              <h4>Props d'accessibilité :</h4>
              <ul>
                <li><strong>ariaLabel</strong> : string (label pour lecteurs d'écran)</li>
                <li><strong>ariaDescribedBy</strong> : string (description pour lecteurs d'écran)</li>
                <li><strong>trapFocus</strong> : boolean (piéger le focus)</li>
                <li><strong>restoreFocus</strong> : boolean (restaurer le focus)</li>
              </ul>
              
              <h4>Variants spécialisés :</h4>
              <ul>
                <li><strong>NavigationDrawer</strong> : Drawer pour navigation</li>
                <li><strong>SettingsDrawer</strong> : Drawer pour paramètres</li>
                <li><strong>DetailsDrawer</strong> : Drawer pour détails</li>
                <li><strong>ActionsDrawer</strong> : Drawer pour actions</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onOpen</strong> : () =&gt; void (callback d'ouverture)</li>
                <li><strong>onClose</strong> : () =&gt; void (callback de fermeture)</li>
                <li><strong>onAnimationStart</strong> : () =&gt; void</li>
                <li><strong>onAnimationEnd</strong> : () =&gt; void</li>
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
                <h4>Navigation mobile</h4>
                <p>Menu de navigation principal sur mobile avec hamburger menu.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Paramètres utilisateur</h4>
                <p>Panneau de configuration et préférences utilisateur.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Détails d'éléments</h4>
                <p>Affichage des détails d'un élément sélectionné.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawerPage;

