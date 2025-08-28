import React, { useState } from 'react';

const OverlayPage: React.FC = () => {
  const [isBasicOverlayVisible, setIsBasicOverlayVisible] = useState(false);
  const [isModalOverlayVisible, setIsModalOverlayVisible] = useState(false);
  const [isLoadingOverlayVisible, setIsLoadingOverlayVisible] = useState(false);
  const [isBlurOverlayVisible, setIsBlurOverlayVisible] = useState(false);

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Overlay</h1>
        <p className="section-description">
          Composant Overlay pour créer des superpositions visuelles sur le contenu principal. 
          Idéal pour les modales, les états de chargement, les confirmations et les interactions avancées.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Overlay basique</h3>
          <div className="demo-content">
            <p>Overlay simple avec contenu personnalisé :</p>
            <div style={{ marginTop: '1rem' }}>
              <button 
                className="ui-button ui-button--primary"
                onClick={() => setIsBasicOverlayVisible(true)}
              >
                Afficher l'overlay
              </button>
              
              {isBasicOverlayVisible && (
                <div className="ui-overlay" onClick={() => setIsBasicOverlayVisible(false)}>
                  <div className="ui-overlay-content" onClick={(e) => e.stopPropagation()}>
                    <div className="ui-overlay-header">
                      <h3>Contenu de l'overlay</h3>
                      <button 
                        className="ui-overlay-close"
                        onClick={() => setIsBasicOverlayVisible(false)}
                      >
                        ×
                      </button>
                    </div>
                    <div className="ui-overlay-body">
                      <p>Ceci est un overlay basique avec du contenu personnalisé.</p>
                      <p>Cliquez en dehors ou sur le bouton de fermeture pour le fermer.</p>
                    </div>
                    <div className="ui-overlay-footer">
                      <button 
                        className="ui-button ui-button--secondary"
                        onClick={() => setIsBasicOverlayVisible(false)}
                      >
                        Fermer
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <pre className="demo-code">
{`import { Overlay } from '@equitech-dev/ui-library';

const [isVisible, setIsVisible] = useState(false);

<Overlay
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
>
  <div className="overlay-content">
    <h3>Contenu de l'overlay</h3>
    <p>Contenu personnalisé</p>
  </div>
</Overlay>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Overlay avec modal</h3>
          <div className="demo-content">
            <p>Overlay avec comportement modal et focus trap :</p>
            <div style={{ marginTop: '1rem' }}>
              <button 
                className="ui-button ui-button--secondary"
                onClick={() => setIsModalOverlayVisible(true)}
              >
                Ouvrir modal
              </button>
              
              {isModalOverlayVisible && (
                <div className="ui-overlay ui-overlay--modal" onClick={() => setIsModalOverlayVisible(false)}>
                  <div className="ui-overlay-content ui-overlay-content--modal" onClick={(e) => e.stopPropagation()}>
                    <div className="ui-overlay-header">
                      <h3>Confirmation de suppression</h3>
                      <button 
                        className="ui-overlay-close"
                        onClick={() => setIsModalOverlayVisible(false)}
                      >
                        ×
                      </button>
                    </div>
                    <div className="ui-overlay-body">
                      <p>Êtes-vous sûr de vouloir supprimer cet élément ?</p>
                      <p>Cette action est irréversible et ne peut pas être annulée.</p>
                    </div>
                    <div className="ui-overlay-footer">
                      <button 
                        className="ui-button ui-button--secondary"
                        onClick={() => setIsModalOverlayVisible(false)}
                      >
                        Annuler
                      </button>
                      <button 
                        className="ui-button ui-button--danger"
                        onClick={() => setIsModalOverlayVisible(false)}
                      >
                        Supprimer définitivement
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <pre className="demo-code">
{`import { Overlay } from '@equitech-dev/ui-library';

<Overlay
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
  variant="modal"
  trapFocus={true}
  closeOnEscape={true}
>
  <div className="modal-content">
    <h3>Confirmation de suppression</h3>
    <p>Êtes-vous sûr de vouloir supprimer cet élément ?</p>
    <div className="modal-actions">
      <button onClick={() => setIsVisible(false)}>Annuler</button>
      <button onClick={() => setIsVisible(false)}>Supprimer</button>
    </div>
  </div>
</Overlay>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Overlay de chargement</h3>
          <div className="demo-content">
            <p>Overlay avec indicateur de chargement :</p>
            <div style={{ marginTop: '1rem' }}>
              <button 
                className="ui-button ui-button--outline"
                onClick={() => {
                  setIsLoadingOverlayVisible(true);
                  setTimeout(() => setIsLoadingOverlayVisible(false), 3000);
                }}
              >
                Simuler un chargement
              </button>
              
              {isLoadingOverlayVisible && (
                <div className="ui-overlay ui-overlay--loading">
                  <div className="ui-overlay-content ui-overlay-content--loading">
                    <div className="ui-loading-spinner ui-loading-spinner--large"></div>
                    <p className="ui-overlay-loading-text">Chargement en cours...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <pre className="demo-code">
{`import { Overlay } from '@equitech-dev/ui-library';

<Overlay
  isVisible={isLoading}
  variant="loading"
  showSpinner={true}
  loadingText="Chargement en cours..."
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Overlay avec effet de flou</h3>
          <div className="demo-content">
            <p>Overlay avec effet de flou sur le contenu en arrière-plan :</p>
            <div style={{ marginTop: '1rem', position: 'relative' }}>
              <div style={{ 
                padding: '2rem', 
                background: 'var(--ui-surface-color)', 
                borderRadius: '8px',
                filter: isBlurOverlayVisible ? 'blur(2px)' : 'none',
                transition: 'filter 0.3s ease'
              }}>
                <h4>Contenu en arrière-plan</h4>
                <p>Ce contenu sera flouté quand l'overlay est actif.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
              
              <button 
                className="ui-button ui-button--primary"
                style={{ marginTop: '1rem' }}
                onClick={() => setIsBlurOverlayVisible(!isBlurOverlayVisible)}
              >
                {isBlurOverlayVisible ? 'Masquer' : 'Afficher'} l'overlay avec flou
              </button>
              
              {isBlurOverlayVisible && (
                <div className="ui-overlay ui-overlay--blur">
                  <div className="ui-overlay-content ui-overlay-content--centered">
                    <div className="ui-overlay-notification">
                      <h3>Notification importante</h3>
                      <p>Ceci est une notification qui apparaît avec un effet de flou sur le contenu en arrière-plan.</p>
                      <button 
                        className="ui-button ui-button--primary"
                        onClick={() => setIsBlurOverlayVisible(false)}
                      >
                        Compris
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <pre className="demo-code">
{`import { Overlay } from '@equitech-dev/ui-library';

<Overlay
  isVisible={isVisible}
  variant="blur"
  blurBackground={true}
>
  <div className="notification-content">
    <h3>Notification importante</h3>
    <p>Contenu de la notification</p>
  </div>
</Overlay>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant Overlay :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>isVisible</strong> : boolean (état de visibilité de l'overlay)</li>
                <li><strong>onClose</strong> : () =&gt; void (callback de fermeture)</li>
                <li><strong>children</strong> : ReactNode (contenu de l'overlay)</li>
                <li><strong>variant</strong> : "default" | "modal" | "loading" | "blur"</li>
              </ul>
              
              <h4>Props de personnalisation :</h4>
              <ul>
                <li><strong>zIndex</strong> : number (niveau de z-index)</li>
                <li><strong>backdrop</strong> : boolean (afficher l'arrière-plan)</li>
                <li><strong>backdropColor</strong> : string (couleur de l'arrière-plan)</li>
                <li><strong>backdropOpacity</strong> : number (opacité de l'arrière-plan)</li>
                <li><strong>blurBackground</strong> : boolean (flouter le contenu en arrière-plan)</li>
              </ul>
              
              <h4>Props d'interaction :</h4>
              <ul>
                <li><strong>closeOnBackdropClick</strong> : boolean (fermer au clic sur l'arrière-plan)</li>
                <li><strong>closeOnEscape</strong> : boolean (fermer avec la touche Escape)</li>
                <li><strong>trapFocus</strong> : boolean (piéger le focus)</li>
                <li><strong>restoreFocus</strong> : boolean (restaurer le focus)</li>
              </ul>
              
              <h4>Props d'animation :</h4>
              <ul>
                <li><strong>animation</strong> : "fade" | "slide" | "zoom" | "none"</li>
                <li><strong>animationDuration</strong> : number (durée de l'animation)</li>
                <li><strong>animationEasing</strong> : string (fonction d'interpolation)</li>
              </ul>
              
              <h4>Props d'accessibilité :</h4>
              <ul>
                <li><strong>ariaLabel</strong> : string (label pour lecteurs d'écran)</li>
                <li><strong>ariaDescribedBy</strong> : string (description pour lecteurs d'écran)</li>
                <li><strong>role</strong> : string (rôle ARIA)</li>
                <li><strong>ariaModal</strong> : boolean (comportement modal)</li>
              </ul>
              
              <h4>Variants spécialisés :</h4>
              <ul>
                <li><strong>ModalOverlay</strong> : Overlay pour modales</li>
                <li><strong>LoadingOverlay</strong> : Overlay pour chargement</li>
                <li><strong>NotificationOverlay</strong> : Overlay pour notifications</li>
                <li><strong>ConfirmationOverlay</strong> : Overlay pour confirmations</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onOpen</strong> : () =&gt; void (callback d'ouverture)</li>
                <li><strong>onClose</strong> : () =&gt; void (callback de fermeture)</li>
                <li><strong>onBackdropClick</strong> : () =&gt; void (clic sur l'arrière-plan)</li>
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
                <h4>Modales et dialogues</h4>
                <p>Affichage de modales avec overlay pour isoler le contenu principal.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>États de chargement</h4>
                <p>Indicateurs de chargement avec overlay pour bloquer les interactions.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Notifications importantes</h4>
                <p>Affichage de notifications critiques avec effet de flou.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverlayPage;

