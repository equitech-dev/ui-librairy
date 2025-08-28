import React, { useState } from 'react';

const PortalPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Portal</h1>
        <p className="section-description">
          Composant Portal pour rendre du contenu dans un conteneur DOM différent de la hiérarchie React. 
          Idéal pour les modales, tooltips, notifications et tout contenu qui doit être affiché en dehors du flux normal.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Portal basique (Modal)</h3>
          <div className="demo-content">
            <p>Modal rendu via Portal pour éviter les problèmes de z-index et de positionnement :</p>
            <div style={{ marginTop: '1rem' }}>
              <button 
                className="ui-button ui-button--primary"
                onClick={() => setIsModalOpen(true)}
              >
                Ouvrir la modal
              </button>
              
              {isModalOpen && (
                <div className="ui-portal">
                  <div className="ui-modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="ui-modal" onClick={(e) => e.stopPropagation()}>
                      <div className="ui-modal__header">
                        <h3>Confirmation</h3>
                        <button 
                          className="ui-modal__close"
                          onClick={() => setIsModalOpen(false)}
                        >
                          ×
                        </button>
                      </div>
                      <div className="ui-modal__content">
                        <p>Êtes-vous sûr de vouloir supprimer cet élément ?</p>
                        <p>Cette action est irréversible.</p>
                      </div>
                      <div className="ui-modal__footer">
                        <button 
                          className="ui-button ui-button--secondary"
                          onClick={() => setIsModalOpen(false)}
                        >
                          Annuler
                        </button>
                        <button 
                          className="ui-button ui-button--danger"
                          onClick={() => setIsModalOpen(false)}
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <pre className="demo-code">
{`import { Portal, Modal } from '@equitech-dev/ui-library';

const [isOpen, setIsOpen] = useState(false);

<Portal>
  <Modal
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title="Confirmation"
  >
    <p>Êtes-vous sûr de vouloir supprimer cet élément ?</p>
    <div className="modal-actions">
      <button onClick={() => setIsOpen(false)}>Annuler</button>
      <button onClick={() => setIsOpen(false)}>Supprimer</button>
    </div>
  </Modal>
</Portal>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Portal avec Tooltip</h3>
          <div className="demo-content">
            <p>Tooltip rendu via Portal pour un positionnement précis :</p>
            <div style={{ marginTop: '1rem' }}>
              <button 
                className="ui-button ui-button--outline"
                onMouseEnter={() => setIsTooltipVisible(true)}
                onMouseLeave={() => setIsTooltipVisible(false)}
              >
                Hover pour le tooltip
              </button>
              
              {isTooltipVisible && (
                <div className="ui-portal">
                  <div className="ui-tooltip ui-tooltip--top">
                    <div className="ui-tooltip__content">
                      Ceci est un tooltip rendu via Portal
                    </div>
                    <div className="ui-tooltip__arrow"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <pre className="demo-code">
{`import { Portal, Tooltip } from '@equitech-dev/ui-library';

const [isVisible, setIsVisible] = useState(false);

<Portal>
  <Tooltip
    isVisible={isVisible}
    position="top"
    content="Ceci est un tooltip rendu via Portal"
  />
</Portal>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Portal avec Notification</h3>
          <div className="demo-content">
            <p>Notification toast rendue via Portal :</p>
            <div style={{ marginTop: '1rem' }}>
              <button 
                className="ui-button ui-button--success"
                onClick={() => {
                  setIsNotificationVisible(true);
                  setTimeout(() => setIsNotificationVisible(false), 3000);
                }}
              >
                Afficher notification
              </button>
              
              {isNotificationVisible && (
                <div className="ui-portal">
                  <div className="ui-notification-toast ui-notification-toast--success">
                    <div className="ui-notification-toast__content">
                      <span className="ui-notification-toast__icon">✅</span>
                      <span className="ui-notification-toast__message">
                        Action effectuée avec succès !
                      </span>
                    </div>
                    <button 
                      className="ui-notification-toast__close"
                      onClick={() => setIsNotificationVisible(false)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <pre className="demo-code">
{`import { Portal, NotificationToast } from '@equitech-dev/ui-library';

const [isVisible, setIsVisible] = useState(false);

<Portal>
  <NotificationToast
    isVisible={isVisible}
    type="success"
    message="Action effectuée avec succès !"
    onClose={() => setIsVisible(false)}
  />
</Portal>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Portal avec conteneur personnalisé</h3>
          <div className="demo-content">
            <p>Portal rendu dans un conteneur DOM spécifique :</p>
            <div style={{ marginTop: '1rem' }}>
              <div id="custom-portal-container" style={{ 
                border: '2px dashed var(--ui-border-color)', 
                padding: '1rem', 
                margin: '1rem 0',
                minHeight: '100px'
              }}>
                <p>Conteneur personnalisé pour Portal</p>
              </div>
              
              <button 
                className="ui-button ui-button--secondary"
                onClick={() => {
                  const container = document.getElementById('custom-portal-container');
                  if (container) {
                    const portalContent = document.createElement('div');
                    portalContent.className = 'ui-portal-content';
                    portalContent.innerHTML = `
                      <div style="background: var(--ui-primary-color); color: white; padding: 0.5rem; border-radius: 4px; margin: 0.5rem 0;">
                        Contenu rendu via Portal dans ce conteneur spécifique
                      </div>
                    `;
                    container.appendChild(portalContent);
                    
                    setTimeout(() => {
                      if (portalContent.parentNode) {
                        portalContent.parentNode.removeChild(portalContent);
                      }
                    }, 3000);
                  }
                }}
              >
                Rendre dans le conteneur
              </button>
            </div>
          </div>
          <pre className="demo-code">
{`import { Portal } from '@equitech-dev/ui-library';

<Portal container={document.getElementById('custom-container')}>
  <div>Contenu rendu dans un conteneur spécifique</div>
</Portal>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant Portal :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>children</strong> : ReactNode (contenu à rendre via Portal)</li>
                <li><strong>container</strong> : HTMLElement (conteneur DOM cible)</li>
                <li><strong>disablePortal</strong> : boolean (désactiver le Portal)</li>
                <li><strong>containerRef</strong> : RefObject (référence au conteneur)</li>
              </ul>
              
              <h4>Props de personnalisation :</h4>
              <ul>
                <li><strong>containerId</strong> : string (ID du conteneur cible)</li>
                <li><strong>containerClassName</strong> : string (classe CSS du conteneur)</li>
                <li><strong>containerStyle</strong> : CSSProperties (styles du conteneur)</li>
                <li><strong>appendToBody</strong> : boolean (ajouter au body par défaut)</li>
              </ul>
              
              <h4>Props d'accessibilité :</h4>
              <ul>
                <li><strong>ariaLabel</strong> : string (label pour lecteurs d'écran)</li>
                <li><strong>ariaDescribedBy</strong> : string (description pour lecteurs d'écran)</li>
                <li><strong>role</strong> : string (rôle ARIA)</li>
                <li><strong>tabIndex</strong> : number (index de tabulation)</li>
              </ul>
              
              <h4>Variants spécialisés :</h4>
              <ul>
                <li><strong>ModalPortal</strong> : Portal pour modales</li>
                <li><strong>TooltipPortal</strong> : Portal pour tooltips</li>
                <li><strong>NotificationPortal</strong> : Portal pour notifications</li>
                <li><strong>DropdownPortal</strong> : Portal pour dropdowns</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onMount</strong> : () =&gt; void (callback de montage)</li>
                <li><strong>onUnmount</strong> : () =&gt; void (callback de démontage)</li>
                <li><strong>onContainerChange</strong> : (container: HTMLElement) =&gt; void</li>
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
                <h4>Modales et dialogues</h4>
                <p>Affichage de modales en dehors du flux normal pour éviter les problèmes de z-index.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Tooltips et popovers</h4>
                <p>Positionnement précis des tooltips sans être limité par les conteneurs parents.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Notifications toast</h4>
                <p>Affichage de notifications en overlay sans perturber la mise en page.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalPage;

