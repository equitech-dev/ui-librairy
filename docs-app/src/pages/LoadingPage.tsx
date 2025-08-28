import React, { useState, useEffect } from 'react';

const LoadingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Chargement...');
  const [showFullScreen, setShowFullScreen] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            setIsLoading(false);
            setLoadingText('Chargement terminé !');
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const startLoading = () => {
    setIsLoading(true);
    setLoadingProgress(0);
    setLoadingText('Chargement...');
  };

  const toggleFullScreen = () => {
    setShowFullScreen(!showFullScreen);
  };

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Loading</h1>
        <p className="section-description">
          Composant de chargement pour indiquer visuellement qu'une opération est en cours. Fournit un retour visuel immédiat à l'utilisateur et améliore l'expérience utilisateur pendant les opérations asynchrones.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Spinner basique</h3>
          <div className="demo-content">
            <p>Spinner simple avec animation de rotation :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-loading-demo">
                <div className="ui-spinner ui-spinner--default"></div>
                <div className="ui-spinner ui-spinner--primary"></div>
                <div className="ui-spinner ui-spinner--success"></div>
                <div className="ui-spinner ui-spinner--warning"></div>
                <div className="ui-spinner ui-spinner--error"></div>
              </div>
              
              <div style={{ marginTop: '1rem' }}>
                <button
                  className="ui-button ui-button--outline"
                  onClick={startLoading}
                  disabled={isLoading}
                >
                  {isLoading ? 'Chargement en cours...' : 'Démarrer le chargement'}
                </button>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { Spinner } from '@equitech-dev/ui-library';

<Spinner variant="default" />
<Spinner variant="primary" />
<Spinner variant="success" />
<Spinner variant="warning" />
<Spinner variant="error" />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Spinner avec tailles</h3>
          <div className="demo-content">
            <p>Différentes tailles de spinner selon le contexte :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-loading-demo ui-loading-demo--sizes">
                <div className="ui-loading-demo__size-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Small</h4>
                  <div className="ui-spinner ui-spinner--small ui-spinner--primary"></div>
                </div>
                
                <div className="ui-loading-demo__size-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Medium (défaut)</h4>
                  <div className="ui-spinner ui-spinner--primary"></div>
                </div>
                
                <div className="ui-loading-demo__size-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</h4>
                  <div className="ui-spinner ui-spinner--large ui-spinner--primary"></div>
                </div>
                
                <div className="ui-loading-demo__size-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Extra Large</h4>
                  <div className="ui-spinner ui-spinner--xl ui-spinner--primary"></div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Spinner size="small" variant="primary" />
<Spinner size="medium" variant="primary" />
<Spinner size="large" variant="primary" />
<Spinner size="xl" variant="primary" />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Spinner avec texte</h3>
          <div className="demo-content">
            <p>Spinner accompagné d'un texte de chargement :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-loading-demo ui-loading-demo--with-text">
                <div className="ui-loading-wrapper">
                  <div className="ui-spinner ui-spinner--primary"></div>
                  <span className="ui-loading-text">Chargement des données...</span>
                </div>
                
                <div className="ui-loading-wrapper">
                  <div className="ui-spinner ui-spinner--success"></div>
                  <span className="ui-loading-text">Sauvegarde en cours...</span>
                </div>
                
                <div className="ui-loading-wrapper">
                  <div className="ui-spinner ui-spinner--warning"></div>
                  <span className="ui-loading-text">Traitement...</span>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<LoadingWrapper>
  <Spinner variant="primary" />
  <LoadingText>Chargement des données...</LoadingText>
</LoadingWrapper>

<LoadingWrapper>
  <Spinner variant="success" />
  <LoadingText>Sauvegarde en cours...</LoadingText>
</LoadingWrapper>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Barre de progression</h3>
          <div className="demo-content">
            <p>Barre de progression pour les opérations longues :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-loading-demo">
                <div className="ui-progress-bar">
                  <div className="ui-progress-bar__container">
                    <div 
                      className="ui-progress-bar__fill ui-progress-bar__fill--primary"
                      style={{ width: `${loadingProgress}%` }}
                    ></div>
                  </div>
                  <div className="ui-progress-bar__text">
                    {loadingText} ({loadingProgress}%)
                  </div>
                </div>
                
                <div style={{ marginTop: '1rem' }}>
                  <button
                    className="ui-button ui-button--outline"
                    onClick={startLoading}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Chargement en cours...' : 'Démarrer la progression'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { ProgressBar } from '@equitech-dev/ui-library';

const [progress, setProgress] = useState(0);

<ProgressBar
  value={progress}
  max={100}
  variant="primary"
  showText={true}
  text="Chargement en cours..."
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Barre de progression avec variantes</h3>
          <div className="demo-content">
            <p>Différentes variantes de barre de progression :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-loading-demo ui-loading-demo--progress-variants">
                <div className="ui-progress-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Primary</h4>
                  <div className="ui-progress-bar">
                    <div className="ui-progress-bar__container">
                      <div className="ui-progress-bar__fill ui-progress-bar__fill--primary" style={{ width: '75%' }}></div>
                    </div>
                    <div className="ui-progress-bar__text">75%</div>
                  </div>
                </div>
                
                <div className="ui-progress-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Success</h4>
                  <div className="ui-progress-bar">
                    <div className="ui-progress-bar__container">
                      <div className="ui-progress-bar__fill ui-progress-bar__fill--success" style={{ width: '90%' }}></div>
                    </div>
                    <div className="ui-progress-bar__text">90%</div>
                  </div>
                </div>
                
                <div className="ui-progress-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Warning</h4>
                  <div className="ui-progress-bar">
                    <div className="ui-progress-bar__container">
                      <div className="ui-progress-bar__fill ui-progress-bar__fill--warning" style={{ width: '45%' }}></div>
                    </div>
                    <div className="ui-progress-bar__text">45%</div>
                  </div>
                </div>
                
                <div className="ui-progress-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Error</h4>
                  <div className="ui-progress-bar">
                    <div className="ui-progress-bar__container">
                      <div className="ui-progress-bar__fill ui-progress-bar__fill--error" style={{ width: '25%' }}></div>
                    </div>
                    <div className="ui-progress-bar__text">25%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<ProgressBar variant="primary" value={75} />
<ProgressBar variant="success" value={90} />
<ProgressBar variant="warning" value={45} />
<ProgressBar variant="error" value={25} />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Loading overlay</h3>
          <div className="demo-content">
            <p>Overlay de chargement pour bloquer l'interface :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-loading-demo">
                <button
                  className="ui-button ui-button--primary"
                  onClick={toggleFullScreen}
                >
                  {showFullScreen ? 'Masquer' : 'Afficher'} l'overlay
                </button>
                
                {showFullScreen && (
                  <div className="ui-loading-overlay">
                    <div className="ui-loading-overlay__content">
                      <div className="ui-spinner ui-spinner--large ui-spinner--primary"></div>
                      <div className="ui-loading-overlay__text">Chargement en cours...</div>
                      <div className="ui-loading-overlay__subtext">Veuillez patienter</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { LoadingOverlay } from '@equitech-dev/ui-library';

const [showOverlay, setShowOverlay] = useState(false);

<LoadingOverlay
  isVisible={showOverlay}
  text="Chargement en cours..."
  subtext="Veuillez patienter"
  spinnerSize="large"
  spinnerVariant="primary"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Loading dans un bouton</h3>
          <div className="demo-content">
            <p>Intégration du loading dans les boutons :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-loading-demo ui-loading-demo--button-loading">
                <button className="ui-button ui-button--primary ui-button--loading" disabled>
                  <div className="ui-spinner ui-spinner--small ui-spinner--white"></div>
                  <span>Chargement...</span>
                </button>
                
                <button className="ui-button ui-button--outline ui-button--loading" disabled>
                  <div className="ui-spinner ui-spinner--small ui-spinner--primary"></div>
                  <span>Enregistrement...</span>
                </button>
                
                <button className="ui-button ui-button--success ui-button--loading" disabled>
                  <div className="ui-spinner ui-spinner--small ui-spinner--white"></div>
                  <span>Validation...</span>
                </button>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Button
  variant="primary"
  loading={true}
  loadingText="Chargement..."
  disabled={true}
>
  Envoyer
</Button>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Loading avec étapes</h3>
          <div className="demo-content">
            <p>Loading avec indication des étapes en cours :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-loading-demo">
                <div className="ui-loading-steps">
                  <div className="ui-loading-step ui-loading-step--completed">
                    <div className="ui-loading-step__icon">✓</div>
                    <div className="ui-loading-step__content">
                      <div className="ui-loading-step__title">Connexion établie</div>
                      <div className="ui-loading-step__description">Authentification réussie</div>
                    </div>
                  </div>
                  
                  <div className="ui-loading-step ui-loading-step--active">
                    <div className="ui-loading-step__icon">
                      <div className="ui-spinner ui-spinner--small ui-spinner--primary"></div>
                    </div>
                    <div className="ui-loading-step__content">
                      <div className="ui-loading-step__title">Récupération des données</div>
                      <div className="ui-loading-step__description">Chargement des informations utilisateur</div>
                    </div>
                  </div>
                  
                  <div className="ui-loading-step ui-loading-step--pending">
                    <div className="ui-loading-step__icon">3</div>
                    <div className="ui-loading-step__content">
                      <div className="ui-loading-step__title">Finalisation</div>
                      <div className="ui-loading-step__description">Préparation de l'interface</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { LoadingSteps } from '@equitech-dev/ui-library';

<LoadingSteps
  steps={[
    { title: 'Connexion', description: 'Authentification', status: 'completed' },
    { title: 'Données', description: 'Chargement', status: 'active' },
    { title: 'Finalisation', description: 'Préparation', status: 'pending' }
  ]}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour les composants Loading :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Spinner :</h4>
              <ul>
                <li><strong>variant</strong> : "default" | "primary" | "success" | "warning" | "error"</li>
                <li><strong>size</strong> : "small" | "medium" | "large" | "xl"</li>
                <li><strong>className</strong> : string (classe CSS personnalisée)</li>
                <li><strong>style</strong> : object (styles inline personnalisés)</li>
              </ul>
              
              <h4>ProgressBar :</h4>
              <ul>
                <li><strong>value</strong> : number (valeur actuelle)</li>
                <li><strong>max</strong> : number (valeur maximale, défaut: 100)</li>
                <li><strong>variant</strong> : "primary" | "success" | "warning" | "error"</li>
                <li><strong>showText</strong> : boolean (afficher le pourcentage)</li>
                <li><strong>text</strong> : string (texte personnalisé)</li>
                <li><strong>animated</strong> : boolean (animation de la barre)</li>
                <li><strong>striped</strong> : boolean (effet rayé)</li>
              </ul>
              
              <h4>LoadingOverlay :</h4>
              <ul>
                <li><strong>isVisible</strong> : boolean (afficher l'overlay)</li>
                <li><strong>text</strong> : string (texte principal)</li>
                <li><strong>subtext</strong> : string (texte secondaire)</li>
                <li><strong>spinnerSize</strong> : "small" | "medium" | "large" | "xl"</li>
                <li><strong>spinnerVariant</strong> : "default" | "primary" | "success" | "warning" | "error"</li>
                <li><strong>backdrop</strong> : boolean (fond semi-transparent)</li>
                <li><strong>closable</strong> : boolean (fermable par clic)</li>
              </ul>
              
              <h4>LoadingSteps :</h4>
              <ul>
                <li><strong>steps</strong> : array (liste des étapes)</li>
                <li><strong>currentStep</strong> : number (étape actuelle)</li>
                <li><strong>orientation</strong> : "horizontal" | "vertical"</li>
                <li><strong>showConnectors</strong> : boolean (lignes de connexion)</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onComplete</strong> : () =&gt; void</li>
                <li><strong>onStepChange</strong> : (step: number) =&gt; void</li>
                <li><strong>onClose</strong> : () =&gt; void (pour l'overlay)</li>
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
                <h4>Formulaires</h4>
                <p>Afficher un spinner dans le bouton de soumission pendant la validation.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Navigation</h4>
                <p>Overlay de chargement lors du changement de page ou de route.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Upload de fichiers</h4>
                <p>Barre de progression pour suivre l'avancement du téléchargement.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;


