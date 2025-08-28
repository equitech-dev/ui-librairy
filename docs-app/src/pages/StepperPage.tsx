import React, { useState } from 'react';

interface Step {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  status: 'pending' | 'current' | 'completed' | 'error';
  disabled?: boolean;
}

const StepperPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState<Step[]>([
    { id: '1', title: 'Informations', description: 'Vos informations de base', icon: '👤', status: 'completed' },
    { id: '2', title: 'Configuration', description: 'Paramètres du compte', icon: '⚙️', status: 'current' },
    { id: '3', title: 'Vérification', description: 'Confirmation finale', icon: '✅', status: 'pending' },
    { id: '4', title: 'Terminé', description: 'Compte créé avec succès', icon: '🎉', status: 'pending' }
  ]);

  const [horizontalSteps, setHorizontalSteps] = useState<Step[]>([
    { id: '1', title: 'Panier', description: 'Vérifiez vos articles', icon: '🛒', status: 'completed' },
    { id: '2', title: 'Livraison', description: 'Adresse de livraison', icon: '🚚', status: 'current' },
    { id: '3', title: 'Paiement', description: 'Méthode de paiement', icon: '💳', status: 'pending' },
    { id: '4', title: 'Confirmation', description: 'Commande confirmée', icon: '✅', status: 'pending' }
  ]);

  const [verticalSteps, setVerticalSteps] = useState<Step[]>([
    { id: '1', title: 'Analyse', description: 'Analyse des besoins', icon: '🔍', status: 'completed' },
    { id: '2', title: 'Conception', description: 'Maquettes et wireframes', icon: '✏️', status: 'completed' },
    { id: '3', title: 'Développement', description: 'Codage et tests', icon: '💻', status: 'current' },
    { id: '4', title: 'Déploiement', description: 'Mise en production', icon: '🚀', status: 'pending' },
    { id: '5', title: 'Maintenance', description: 'Support et mises à jour', icon: '🔧', status: 'pending' }
  ]);

  const updateStepStatus = (stepId: string, newStatus: Step['status']) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status: newStatus } : step
    ));
  };

  const updateHorizontalStepStatus = (stepId: string, newStatus: Step['status']) => {
    setHorizontalSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status: newStatus } : step
    ));
  };

  const updateVerticalStepStatus = (stepId: string, newStatus: Step['status']) => {
    setVerticalSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status: newStatus } : step
    ));
  };

  const goToNextStep = () => {
    if (currentStep < steps.length) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      
      // Mettre à jour le statut des étapes
      setSteps(prev => prev.map((step, index) => {
        if (index + 1 < newStep) {
          return { ...step, status: 'completed' as const };
        } else if (index + 1 === newStep) {
          return { ...step, status: 'current' as const };
        } else {
          return { ...step, status: 'pending' as const };
        }
      }));
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      
      // Mettre à jour le statut des étapes
      setSteps(prev => prev.map((step, index) => {
        if (index + 1 < newStep) {
          return { ...step, status: 'completed' as const };
        } else if (index + 1 === newStep) {
          return { ...step, status: 'current' as const };
        } else {
          return { ...step, status: 'pending' as const };
        }
      }));
    }
  };

  const getStepIcon = (step: Step) => {
    if (step.status === 'completed') {
      return '✅';
    } else if (step.status === 'error') {
      return '❌';
    } else if (step.status === 'current') {
      return step.icon || '●';
    } else {
      return step.icon || '○';
    }
  };

  const getStepClass = (step: Step) => {
      const baseClass = 'ui-stepper-step';
  const statusClass = step.status;
  const disabledClass = step.disabled ? 'disabled' : '';
    return `${baseClass} ${statusClass} ${disabledClass}`.trim();
  };

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Stepper</h1>
        <p className="section-description">
          Composant de stepper pour guider les utilisateurs à travers un processus en plusieurs étapes. Permet de visualiser la progression et de naviguer entre les différentes phases d'un workflow.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Stepper horizontal basique</h3>
          <div className="demo-content">
            <p>Stepper horizontal simple avec navigation entre les étapes :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-stepper ui-stepper--horizontal">
                <div className="ui-stepper">
                  {steps.map((step, index) => (
                    <div key={step.id} className={getStepClass(step)}>
                      <div className="ui-stepper-step-content">
                        <div className="ui-stepper-step-circle">
                          {getStepIcon(step)}
                        </div>
                        <div className="ui-stepper-step-info">
                          <h4 className="ui-stepper-step-label">{step.title}</h4>
                          {step.description && (
                            <p className="ui-stepper-step-description">{step.description}</p>
                          )}
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="ui-stepper-line" />
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="ui-stepper-controls">
                  <button
                    className="ui-button ui-button--outline"
                    onClick={goToPreviousStep}
                    disabled={currentStep === 1}
                  >
                    Précédent
                  </button>
                  <span className="ui-stepper-step-indicator">
                    Étape {currentStep} sur {steps.length}
                  </span>
                  <button
                    className="ui-button ui-button--primary"
                    onClick={goToNextStep}
                    disabled={currentStep === steps.length}
                  >
                    {currentStep === steps.length ? 'Terminer' : 'Suivant'}
                  </button>
                </div>
                
                <div className="ui-stepper-content">
                  <div className="ui-stepper-step-panel">
                    <h3>Étape {currentStep} : {steps[currentStep - 1]?.title}</h3>
                    <p>Contenu de l'étape {currentStep}</p>
                    <div style={{ marginTop: '1rem' }}>
                      <button
                        className="ui-button ui-button--small ui-button--outline"
                        onClick={() => updateStepStatus(steps[currentStep - 1]?.id || '', 'error')}
                      >
                        Marquer comme erreur
                      </button>
                      <button
                        className="ui-button ui-button--small ui-button--success"
                        onClick={() => updateStepStatus(steps[currentStep - 1]?.id || '', 'completed')}
                        style={{ marginLeft: '0.5rem' }}
                      >
                        Marquer comme terminé
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { Stepper } from '@equitech-dev/ui-library';

const [currentStep, setCurrentStep] = useState(1);
const [steps, setSteps] = useState(stepsData);

<Stepper
  steps={steps}
  currentStep={currentStep}
  onStepChange={setCurrentStep}
  variant="horizontal"
  showControls={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Stepper horizontal avec états</h3>
          <div className="demo-content">
            <p>Stepper avec différents états et indicateurs visuels :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-stepper ui-stepper--horizontal ui-stepper--with-states">
                <div className="ui-stepper">
                  {horizontalSteps.map((step, index) => (
                    <div key={step.id} className={getStepClass(step)}>
                      <div className="ui-stepper-step-content">
                        <div className="ui-stepper-step-icon">
                          {getStepIcon(step)}
                        </div>
                        <div className="ui-stepper-step-info">
                          <h4 className="ui-stepper-step-title">{step.title}</h4>
                          {step.description && (
                            <p className="ui-stepper-step-description">{step.description}</p>
                          )}
                        </div>
                      </div>
                      {index < horizontalSteps.length - 1 && (
                        <div className="ui-stepper-step-connector" />
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="ui-stepper-controls">
                  <button
                    className="ui-button ui-button--outline"
                    onClick={() => {
                      const currentIndex = horizontalSteps.findIndex(s => s.status === 'current');
                      if (currentIndex > 0) {
                        updateHorizontalStepStatus(horizontalSteps[currentIndex].id, 'completed');
                        updateHorizontalStepStatus(horizontalSteps[currentIndex - 1].id, 'current');
                      }
                    }}
                    disabled={horizontalSteps.findIndex(s => s.status === 'current') === 0}
                  >
                    Précédent
                  </button>
                  <span className="ui-stepper-step-indicator">
                    Étape {horizontalSteps.findIndex(s => s.status === 'current') + 1} sur {horizontalSteps.length}
                  </span>
                  <button
                    className="ui-button ui-button--primary"
                    onClick={() => {
                      const currentIndex = horizontalSteps.findIndex(s => s.status === 'current');
                      if (currentIndex < horizontalSteps.length - 1) {
                        updateHorizontalStepStatus(horizontalSteps[currentIndex].id, 'completed');
                        updateHorizontalStepStatus(horizontalSteps[currentIndex + 1].id, 'current');
                      }
                    }}
                    disabled={horizontalSteps.findIndex(s => s.status === 'current') === horizontalSteps.length - 1}
                  >
                    Suivant
                  </button>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Stepper
  steps={steps}
  currentStep={currentStep}
  onStepChange={setCurrentStep}
  showStates={true}
  stateIndicators={{
    completed: { icon: '✅', color: 'success' },
    current: { icon: '●', color: 'primary' },
    error: { icon: '❌', color: 'error' }
  }}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Stepper vertical</h3>
          <div className="demo-content">
            <p>Stepper vertical pour les processus complexes avec plus de détails :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-stepper ui-stepper--vertical">
                <div className="ui-stepper">
                  {verticalSteps.map((step, index) => (
                    <div key={step.id} className={getStepClass(step)}>
                      <div className="ui-stepper-step-content">
                        <div className="ui-stepper-step-icon">
                          {getStepIcon(step)}
                        </div>
                        <div className="ui-stepper-step-info">
                          <h4 className="ui-stepper-step-title">{step.title}</h4>
                          {step.description && (
                            <p className="ui-stepper-step-description">{step.description}</p>
                          )}
                        </div>
                      </div>
                      {index < verticalSteps.length - 1 && (
                        <div className="ui-stepper-step-connector" />
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="ui-stepper-content">
                  <div className="ui-stepper-step-panel">
                    <h3>Détails de l'étape</h3>
                    <p>Sélectionnez une étape pour voir les détails et les actions disponibles.</p>
                    <div style={{ marginTop: '1rem' }}>
                      <button
                        className="ui-button ui-button--small ui-button--outline"
                        onClick={() => {
                          const currentIndex = verticalSteps.findIndex(s => s.status === 'current');
                          if (currentIndex > 0) {
                            updateVerticalStepStatus(verticalSteps[currentIndex].id, 'completed');
                            updateVerticalStepStatus(verticalSteps[currentIndex - 1].id, 'current');
                          }
                        }}
                      >
                        Étape précédente
                      </button>
                      <button
                        className="ui-button ui-button--small ui-button--primary"
                        onClick={() => {
                          const currentIndex = verticalSteps.findIndex(s => s.status === 'current');
                          if (currentIndex < verticalSteps.length - 1) {
                            updateVerticalStepStatus(verticalSteps[currentIndex].id, 'completed');
                            updateVerticalStepStatus(verticalSteps[currentIndex + 1].id, 'current');
                          }
                        }}
                        style={{ marginLeft: '0.5rem' }}
                      >
                        Étape suivante
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Stepper
  steps={steps}
  currentStep={currentStep}
  onStepChange={setCurrentStep}
  variant="vertical"
  showStepDetails={true}
  collapsible={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Stepper avec tailles</h3>
          <div className="demo-content">
            <p>Différentes tailles de stepper selon le contexte :</p>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Small</h4>
                <div className="ui-stepper ui-stepper--horizontal ui-stepper--small">
                  <div className="ui-stepper">
                    {steps.slice(0, 3).map((step, index) => (
                      <div key={step.id} className={getStepClass(step)}>
                        <div className="ui-stepper-step-content">
                          <div className="ui-stepper-step-icon">
                            {getStepIcon(step)}
                          </div>
                          <div className="ui-stepper-step-info">
                            <h4 className="ui-stepper-step-title">{step.title}</h4>
                          </div>
                        </div>
                        {index < 2 && <div className="ui-stepper-step-connector" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Medium (défaut)</h4>
                <div className="ui-stepper ui-stepper--horizontal">
                  <div className="ui-stepper">
                    {steps.slice(0, 3).map((step, index) => (
                      <div key={step.id} className={getStepClass(step)}>
                        <div className="ui-stepper-step-content">
                          <div className="ui-stepper-step-icon">
                            {getStepIcon(step)}
                          </div>
                          <div className="ui-stepper-step-info">
                            <h4 className="ui-stepper-step-title">{step.title}</h4>
                            {step.description && (
                              <p className="ui-stepper-step-description">{step.description}</p>
                            )}
                          </div>
                        </div>
                        {index < 2 && <div className="ui-stepper-step-connector" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</h4>
                <div className="ui-stepper ui-stepper--horizontal ui-stepper--large">
                  <div className="ui-stepper">
                    {steps.slice(0, 3).map((step, index) => (
                      <div key={step.id} className={getStepClass(step)}>
                        <div className="ui-stepper-step-content">
                          <div className="ui-stepper-step-icon">
                            {getStepIcon(step)}
                          </div>
                          <div className="ui-stepper-step-info">
                            <h4 className="ui-stepper-step-title">{step.title}</h4>
                            {step.description && (
                              <p className="ui-stepper-step-description">{step.description}</p>
                            )}
                          </div>
                        </div>
                        {index < 2 && <div className="ui-stepper-step-connector" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Stepper size="small" steps={steps} />
<Stepper size="medium" steps={steps} />
<Stepper size="large" steps={steps} />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Stepper avec étapes cliquables</h3>
          <div className="demo-content">
            <p>Stepper où les utilisateurs peuvent cliquer sur les étapes pour naviguer :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-stepper ui-stepper--clickable">
                <div className="ui-stepper">
                  {steps.map((step, index) => (
                    <div key={step.id} className={getStepClass(step)}>
                      <button
                        className="ui-stepper-step-button"
                        onClick={() => {
                          if (!step.disabled) {
                            setCurrentStep(index + 1);
                            // Mettre à jour les statuts
                            setSteps(prev => prev.map((s, i) => {
                              if (i + 1 < index + 1) {
                                return { ...s, status: 'completed' as const };
                              } else if (i + 1 === index + 1) {
                                return { ...s, status: 'current' as const };
                              } else {
                                return { ...s, status: 'pending' as const };
                              }
                            }));
                          }
                        }}
                        disabled={step.disabled}
                      >
                        <div className="ui-stepper-step-content">
                          <div className="ui-stepper-step-icon">
                            {getStepIcon(step)}
                          </div>
                          <div className="ui-stepper-step-info">
                            <h4 className="ui-stepper-step-title">{step.title}</h4>
                            {step.description && (
                              <p className="ui-stepper-step-description">{step.description}</p>
                            )}
                          </div>
                        </div>
                      </button>
                      {index < steps.length - 1 && (
                        <div className="ui-stepper-step-connector" />
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="ui-stepper-content">
                  <div className="ui-stepper-step-panel">
                    <h3>Étape {currentStep} : {steps[currentStep - 1]?.title}</h3>
                    <p>Cliquez sur une étape pour naviguer directement vers celle-ci.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Stepper
  steps={steps}
  currentStep={currentStep}
  onStepChange={setCurrentStep}
  clickable={true}
  allowSkip={false}
  showStepNumbers={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant Stepper :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>steps</strong> : Array&lt;Step&gt; (étapes du processus)</li>
                <li><strong>currentStep</strong> : number (étape actuellement active)</li>
                <li><strong>onStepChange</strong> : function (callback de changement d'étape)</li>
                <li><strong>variant</strong> : "horizontal" | "vertical"</li>
                <li><strong>size</strong> : "small" | "medium" | "large"</li>
                <li><strong>showControls</strong> : boolean (afficher les boutons de navigation)</li>
                <li><strong>showStepNumbers</strong> : boolean (afficher les numéros d'étapes)</li>
                <li><strong>clickable</strong> : boolean (rendre les étapes cliquables)</li>
                <li><strong>allowSkip</strong> : boolean (permettre de sauter des étapes)</li>
                <li><strong>showStepDetails</strong> : boolean (afficher les détails des étapes)</li>
                <li><strong>collapsible</strong> : boolean (permettre de réduire les étapes)</li>
              </ul>
              
              <h4>Types :</h4>
              <ul>
                <li><strong>Step</strong> : &#123; id: string, title: string, description?: string, icon?: string, status: string, disabled?: boolean &#125;</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onStepChange</strong> : (stepIndex: number) =&gt; void</li>
                <li><strong>onStepClick</strong> : (step: Step, index: number) =&gt; void</li>
                <li><strong>onStepComplete</strong> : (stepIndex: number) =&gt; void</li>
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
                <h4>Processus d'inscription</h4>
                <p>Guide les utilisateurs à travers la création de compte étape par étape.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Processus de commande</h4>
                <p>Navigation dans le tunnel d'achat : panier, livraison, paiement, confirmation.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Workflows de projet</h4>
                <p>Suivi des phases de développement et de déploiement d'un projet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepperPage;


