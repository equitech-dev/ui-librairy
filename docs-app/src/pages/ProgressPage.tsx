import React, { useState, useEffect } from 'react';

const ProgressPage: React.FC = () => {
  const [progressValue, setProgressValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [indeterminateProgress, setIndeterminateProgress] = useState(false);
  const [circularProgress, setCircularProgress] = useState(0);

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setProgressValue(prev => {
          if (prev >= 100) {
            setIsAnimating(false);
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isAnimating]);

  useEffect(() => {
    if (indeterminateProgress) {
      const interval = setInterval(() => {
        setCircularProgress(prev => (prev + 1) % 100);
      }, 50);

      return () => clearInterval(interval);
    }
  }, [indeterminateProgress]);

  const startProgress = () => {
    setProgressValue(0);
    setIsAnimating(true);
  };

  const toggleIndeterminate = () => {
    setIndeterminateProgress(!indeterminateProgress);
  };

  const setCustomProgress = (value: number) => {
    setProgressValue(Math.max(0, Math.min(100, value)));
  };

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Progress</h1>
        <p className="section-description">
          Composant de progression pour afficher l'avancement d'une opération. Permet de donner un retour visuel clair à l'utilisateur sur l'état d'une tâche en cours.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Barre de progression basique</h3>
          <div className="demo-content">
            <p>Barre de progression simple avec pourcentage :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-progress-demo">
                <div className="ui-progress">
                  <div className="ui-progress__container">
                    <div 
                      className="ui-progress__fill ui-progress__fill--primary"
                      style={{ width: `${progressValue}%` }}
                    ></div>
                  </div>
                  <div className="ui-progress__text">
                    {progressValue}%
                  </div>
                </div>
                
                <div style={{ marginTop: '1rem' }}>
                  <button
                    className="ui-button ui-button--outline"
                    onClick={startProgress}
                    disabled={isAnimating}
                  >
                    {isAnimating ? 'Progression en cours...' : 'Démarrer la progression'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { Progress } from '@equitech-dev/ui-library';

const [progress, setProgress] = useState(0);

<Progress
  value={progress}
  max={100}
  variant="primary"
  showText={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Barre de progression avec variantes</h3>
          <div className="demo-content">
            <p>Différentes variantes de couleur selon le contexte :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-progress-demo ui-progress-demo--variants">
                <div className="ui-progress-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Primary</h4>
                  <div className="ui-progress">
                    <div className="ui-progress__container">
                      <div className="ui-progress__fill ui-progress__fill--primary" style={{ width: '75%' }}></div>
                    </div>
                    <div className="ui-progress__text">75%</div>
                  </div>
                </div>
                
                <div className="ui-progress-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Success</h4>
                  <div className="ui-progress">
                    <div className="ui-progress__container">
                      <div className="ui-progress__fill ui-progress__fill--success" style={{ width: '90%' }}></div>
                    </div>
                    <div className="ui-progress__text">90%</div>
                  </div>
                </div>
                
                <div className="ui-progress-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Warning</h4>
                  <div className="ui-progress">
                    <div className="ui-progress__container">
                      <div className="ui-progress__fill ui-progress__fill--warning" style={{ width: '45%' }}></div>
                    </div>
                    <div className="ui-progress__text">45%</div>
                  </div>
                </div>
                
                <div className="ui-progress-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Error</h4>
                  <div className="ui-progress">
                    <div className="ui-progress__container">
                      <div className="ui-progress__fill ui-progress__fill--error" style={{ width: '25%' }}></div>
                    </div>
                    <div className="ui-progress__text">25%</div>
                  </div>
                </div>
                
                <div className="ui-progress-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Info</h4>
                  <div className="ui-progress">
                    <div className="ui-progress__container">
                      <div className="ui-progress__fill ui-progress__fill--info" style={{ width: '60%' }}></div>
                    </div>
                    <div className="ui-progress__text">60%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Progress variant="primary" value={75} />
<Progress variant="success" value={90} />
<Progress variant="warning" value={45} />
<Progress variant="error" value={25} />
<Progress variant="info" value={60} />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Barre de progression avec tailles</h3>
          <div className="demo-content">
            <p>Différentes tailles de barre selon le contexte :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-progress-demo ui-progress-demo--sizes">
                <div className="ui-progress-demo__size-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Small</h4>
                  <div className="ui-progress ui-progress--small">
                    <div className="ui-progress__container">
                      <div className="ui-progress__fill ui-progress__fill--primary" style={{ width: '75%' }}></div>
                    </div>
                    <div className="ui-progress__text">75%</div>
                  </div>
                </div>
                
                <div className="ui-progress-demo__size-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Medium (défaut)</h4>
                  <div className="ui-progress">
                    <div className="ui-progress__container">
                      <div className="ui-progress__fill ui-progress__fill--primary" style={{ width: '75%' }}></div>
                    </div>
                    <div className="ui-progress__text">75%</div>
                  </div>
                </div>
                
                <div className="ui-progress-demo__size-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</h4>
                  <div className="ui-progress ui-progress--large">
                    <div className="ui-progress__container">
                      <div className="ui-progress__fill ui-progress__fill--primary" style={{ width: '75%' }}></div>
                    </div>
                    <div className="ui-progress__text">75%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Progress size="small" variant="primary" value={75} />
<Progress size="medium" variant="primary" value={75} />
<Progress size="large" variant="primary" value={75} />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Barre de progression avec étiquettes</h3>
          <div className="demo-content">
            <p>Barre de progression avec étiquettes personnalisées :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-progress-demo">
                <div className="ui-progress ui-progress--with-labels">
                  <div className="ui-progress__header">
                    <span className="ui-progress__label">Téléchargement du fichier</span>
                    <span className="ui-progress__value">75%</span>
                  </div>
                  <div className="ui-progress__container">
                    <div className="ui-progress__fill ui-progress__fill--primary" style={{ width: '75%' }}></div>
                  </div>
                  <div className="ui-progress__footer">
                    <span className="ui-progress__status">En cours...</span>
                    <span className="ui-progress__details">750 KB / 1 MB</span>
                  </div>
                </div>
                
                <div className="ui-progress ui-progress--with-labels" style={{ marginTop: '1rem' }}>
                  <div className="ui-progress__header">
                    <span className="ui-progress__label">Installation des composants</span>
                    <span className="ui-progress__value">45%</span>
                  </div>
                  <div className="ui-progress__container">
                    <div className="ui-progress__fill ui-progress__fill--warning" style={{ width: '45%' }}></div>
                  </div>
                  <div className="ui-progress__footer">
                    <span className="ui-progress__status">Installation...</span>
                    <span className="ui-progress__details">9/20 composants</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Progress
  variant="primary"
  value={75}
  label="Téléchargement du fichier"
  status="En cours..."
  details="750 KB / 1 MB"
  showLabels={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Barre de progression avec animations</h3>
          <div className="demo-content">
            <p>Barres de progression avec différents effets d'animation :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-progress-demo ui-progress-demo--animations">
                <div className="ui-progress-demo__animation-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Striped</h4>
                  <div className="ui-progress">
                    <div className="ui-progress__container">
                      <div className="ui-progress__fill ui-progress__fill--primary ui-progress__fill--striped" style={{ width: '75%' }}></div>
                    </div>
                    <div className="ui-progress__text">75%</div>
                  </div>
                </div>
                
                <div className="ui-progress-demo__animation-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Animated</h4>
                  <div className="ui-progress">
                    <div className="ui-progress__container">
                      <div className="ui-progress__fill ui-progress__fill--success ui-progress__fill--animated" style={{ width: '75%' }}></div>
                    </div>
                    <div className="ui-progress__text">75%</div>
                  </div>
                </div>
                
                <div className="ui-progress-demo__animation-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Striped + Animated</h4>
                  <div className="ui-progress">
                    <div className="ui-progress__container">
                      <div className="ui-progress__fill ui-progress__fill--warning ui-progress__fill--striped ui-progress__fill--animated" style={{ width: '75%' }}></div>
                    </div>
                    <div className="ui-progress__text">75%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Progress variant="primary" value={75} striped={true} />
<Progress variant="success" value={75} animated={true} />
<Progress variant="warning" value={75} striped={true} animated={true} />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Barre de progression circulaire</h3>
          <div className="demo-content">
            <p>Barre de progression circulaire pour les indicateurs compacts :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-progress-demo ui-progress-demo--circular">
                <div className="ui-progress-demo__circular-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Small</h4>
                  <div className="ui-progress-circular ui-progress-circular--small">
                    <svg className="ui-progress-circular__svg" viewBox="0 0 36 36">
                      <path
                        className="ui-progress-circular__track"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="ui-progress-circular__fill ui-progress-circular__fill--primary"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        strokeDasharray={`${circularProgress}, 100`}
                      />
                    </svg>
                    <div className="ui-progress-circular__text">{circularProgress}%</div>
                  </div>
                </div>
                
                <div className="ui-progress-demo__circular-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Medium</h4>
                  <div className="ui-progress-circular">
                    <svg className="ui-progress-circular__svg" viewBox="0 0 36 36">
                      <path
                        className="ui-progress-circular__track"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="ui-progress-circular__fill ui-progress-circular__fill--success"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        strokeDasharray="75, 100"
                      />
                    </svg>
                    <div className="ui-progress-circular__text">75%</div>
                  </div>
                </div>
                
                <div className="ui-progress-demo__circular-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</h4>
                  <div className="ui-progress-circular ui-progress-circular--large">
                    <svg className="ui-progress-circular__svg" viewBox="0 0 36 36">
                      <path
                        className="ui-progress-circular__track"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="ui-progress-circular__fill ui-progress-circular__fill--warning"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        strokeDasharray="45, 100"
                      />
                    </svg>
                    <div className="ui-progress-circular__text">45%</div>
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: '1rem' }}>
                <button
                  className="ui-button ui-button--outline"
                  onClick={toggleIndeterminate}
                >
                  {indeterminateProgress ? 'Arrêter' : 'Démarrer'} l'animation
                </button>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { CircularProgress } from '@equitech-dev/ui-library';

<CircularProgress
  value={75}
  variant="primary"
  size="medium"
  showText={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Barre de progression avec contrôles</h3>
          <div className="demo-content">
            <p>Barre de progression interactive avec contrôles :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-progress-demo">
                <div className="ui-progress ui-progress--interactive">
                  <div className="ui-progress__container">
                    <div 
                      className="ui-progress__fill ui-progress__fill--primary"
                      style={{ width: `${progressValue}%` }}
                    ></div>
                  </div>
                  <div className="ui-progress__text">
                    {progressValue}%
                  </div>
                </div>
                
                <div style={{ marginTop: '1rem' }}>
                  <div className="ui-progress-controls">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progressValue}
                      onChange={(e) => setCustomProgress(parseInt(e.target.value))}
                      className="ui-range-slider"
                    />
                    <div className="ui-progress-controls__buttons">
                      <button
                        className="ui-button ui-button--small ui-button--outline"
                        onClick={() => setCustomProgress(0)}
                      >
                        0%
                      </button>
                      <button
                        className="ui-button ui-button--small ui-button--outline"
                        onClick={() => setCustomProgress(25)}
                      >
                        25%
                      </button>
                      <button
                        className="ui-button ui-button--small ui-button--outline"
                        onClick={() => setCustomProgress(50)}
                      >
                        50%
                      </button>
                      <button
                        className="ui-button ui-button--small ui-button--outline"
                        onClick={() => setCustomProgress(75)}
                      >
                        75%
                      </button>
                      <button
                        className="ui-button ui-button--small ui-button--outline"
                        onClick={() => setCustomProgress(100)}
                      >
                        100%
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Progress
  value={progress}
  variant="primary"
  interactive={true}
  onValueChange={setProgress}
/>

<ProgressControls
  value={progress}
  onValueChange={setProgress}
  presets={[0, 25, 50, 75, 100]}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Barre de progression avec étapes</h3>
          <div className="demo-content">
            <p>Barre de progression avec étapes discrètes :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-progress-demo">
                <div className="ui-progress ui-progress--steps">
                  <div className="ui-progress__container">
                    <div className="ui-progress__steps">
                      <div className="ui-progress__step ui-progress__step--completed"></div>
                      <div className="ui-progress__step ui-progress__step--completed"></div>
                      <div className="ui-progress__step ui-progress__step--active"></div>
                      <div className="ui-progress__step ui-progress__step--pending"></div>
                      <div className="ui-progress__step ui-progress__step--pending"></div>
                    </div>
                  </div>
                  <div className="ui-progress__text">
                    Étape 3 sur 5
                  </div>
                </div>
                
                <div className="ui-progress ui-progress--steps" style={{ marginTop: '1rem' }}>
                  <div className="ui-progress__container">
                    <div className="ui-progress__steps">
                      <div className="ui-progress__step ui-progress__step--completed" title="Étape 1: Connexion"></div>
                      <div className="ui-progress__step ui-progress__step--completed" title="Étape 2: Authentification"></div>
                      <div className="ui-progress__step ui-progress__step--completed" title="Étape 3: Vérification"></div>
                      <div className="ui-progress__step ui-progress__step--active" title="Étape 4: Téléchargement"></div>
                      <div className="ui-progress__step ui-progress__step--pending" title="Étape 5: Finalisation"></div>
                    </div>
                  </div>
                  <div className="ui-progress__text">
                    Téléchargement en cours...
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { StepProgress } from '@equitech-dev/ui-library';

<StepProgress
  steps={5}
  currentStep={3}
  variant="primary"
  showLabels={true}
  labels={['Connexion', 'Authentification', 'Vérification', 'Téléchargement', 'Finalisation']}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant Progress :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>value</strong> : number (valeur actuelle)</li>
                <li><strong>max</strong> : number (valeur maximale, défaut: 100)</li>
                <li><strong>variant</strong> : "primary" | "success" | "warning" | "error" | "info"</li>
                <li><strong>size</strong> : "small" | "medium" | "large"</li>
                <li><strong>showText</strong> : boolean (afficher le pourcentage)</li>
                <li><strong>text</strong> : string (texte personnalisé)</li>
                <li><strong>label</strong> : string (étiquette principale)</li>
                <li><strong>status</strong> : string (statut actuel)</li>
                <li><strong>details</strong> : string (détails supplémentaires)</li>
                <li><strong>showLabels</strong> : boolean (afficher les étiquettes)</li>
              </ul>
              
              <h4>Props d'animation :</h4>
              <ul>
                <li><strong>animated</strong> : boolean (animation de la barre)</li>
                <li><strong>striped</strong> : boolean (effet rayé)</li>
                <li><strong>indeterminate</strong> : boolean (progression indéterminée)</li>
              </ul>
              
              <h4>Props d'interaction :</h4>
              <ul>
                <li><strong>interactive</strong> : boolean (cliquable)</li>
                <li><strong>onValueChange</strong> : (value: number) =&gt; void</li>
                <li><strong>onClick</strong> : (event: MouseEvent) =&gt; void</li>
              </ul>
              
              <h4>Variants spécialisés :</h4>
              <ul>
                <li><strong>CircularProgress</strong> : Progression circulaire</li>
                <li><strong>StepProgress</strong> : Progression par étapes</li>
                <li><strong>ProgressGroup</strong> : Groupe de barres de progression</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onComplete</strong> : () =&gt; void</li>
                <li><strong>onStepChange</strong> : (step: number) =&gt; void</li>
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
                <h4>Upload de fichiers</h4>
                <p>Suivre l'avancement du téléchargement avec pourcentage et vitesse.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Installation d'applications</h4>
                <p>Indiquer la progression de l'installation avec étapes et détails.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Formulaires multi-étapes</h4>
                <p>Montrer l'avancement dans un processus de formulaire complexe.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;


