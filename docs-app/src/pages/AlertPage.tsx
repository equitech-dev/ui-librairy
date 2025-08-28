import React from 'react';

const AlertPage: React.FC = () => {
  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Alert</h1>
        <p className="section-description">
          Composant d'alerte pour afficher des messages importants, des notifications et des informations à l'utilisateur. Les alertes peuvent être de différents types selon le contexte et l'urgence du message.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Types d'alertes</h3>
          <div className="demo-content">
            <p>Différents types d'alertes pour différents contextes :</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <div className="ui-alert ui-alert--info">
                <div className="ui-alert__icon">ℹ️</div>
                <div className="ui-alert__content">
                  <h4 className="ui-alert__title">Information</h4>
                  <p>Ceci est un message d'information pour vous tenir au courant des dernières mises à jour.</p>
                </div>
              </div>
              
              <div className="ui-alert ui-alert--success">
                <div className="ui-alert__icon">✅</div>
                <div className="ui-alert__content">
                  <h4 className="ui-alert__title">Succès</h4>
                  <p>Votre action a été effectuée avec succès. Toutes les modifications ont été enregistrées.</p>
                </div>
              </div>
              
              <div className="ui-alert ui-alert--warning">
                <div className="ui-alert__icon">⚠️</div>
                <div className="ui-alert__content">
                  <h4 className="ui-alert__title">Attention</h4>
                  <p>Veuillez vérifier vos informations avant de continuer. Certains champs sont incomplets.</p>
                </div>
              </div>
              
              <div className="ui-alert ui-alert--error">
                <div className="ui-alert__icon">❌</div>
                <div className="ui-alert__content">
                  <h4 className="ui-alert__title">Erreur</h4>
                  <p>Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer.</p>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { Alert } from '@equitech-dev/ui-library';

<Alert variant="info" title="Information">
  Ceci est un message d'information pour vous tenir au courant.
</Alert>

<Alert variant="success" title="Succès">
  Votre action a été effectuée avec succès.
</Alert>

<Alert variant="warning" title="Attention">
  Veuillez vérifier vos informations avant de continuer.
</Alert>

<Alert variant="error" title="Erreur">
  Une erreur s'est produite lors du traitement.
</Alert>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Alertes avec actions</h3>
          <div className="demo-content">
            <p>Alertes avec boutons d'action pour permettre à l'utilisateur de réagir :</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <div className="ui-alert ui-alert--warning">
                <div className="ui-alert__icon">⚠️</div>
                <div className="ui-alert__content">
                  <h4 className="ui-alert__title">Mise à jour disponible</h4>
                  <p>Une nouvelle version de l'application est disponible. Voulez-vous l'installer maintenant ?</p>
                  <div className="ui-alert__actions" style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button className="ui-button ui-button--primary">Installer</button>
                    <button className="ui-button ui-button--secondary">Plus tard</button>
                  </div>
                </div>
              </div>
              
              <div className="ui-alert ui-alert--error">
                <div className="ui-alert__icon">❌</div>
                <div className="ui-alert__content">
                  <h4 className="ui-alert__title">Session expirée</h4>
                  <p>Votre session a expiré pour des raisons de sécurité. Veuillez vous reconnecter.</p>
                  <div className="ui-alert__actions" style={{ marginTop: '1rem' }}>
                    <button className="ui-button ui-button--primary">Se reconnecter</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Alert variant="warning" title="Mise à jour disponible">
  <p>Une nouvelle version est disponible.</p>
  <Alert.Actions>
    <Button variant="primary">Installer</Button>
    <Button variant="secondary">Plus tard</Button>
  </Alert.Actions>
</Alert>

<Alert variant="error" title="Session expirée">
  <p>Votre session a expiré.</p>
  <Alert.Actions>
    <Button variant="primary">Se reconnecter</Button>
  </Alert.Actions>
</Alert>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Alertes fermables</h3>
          <div className="demo-content">
            <p>Alertes que l'utilisateur peut fermer manuellement :</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <div className="ui-alert ui-alert--info ui-alert--dismissible">
                <div className="ui-alert__icon">ℹ️</div>
                <div className="ui-alert__content">
                  <h4 className="ui-alert__title">Conseil</h4>
                  <p>Utilisez le raccourci Ctrl+S pour sauvegarder rapidement vos modifications.</p>
                </div>
                <button className="ui-alert__close" style={{ 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '1.25rem', 
                  cursor: 'pointer',
                  color: 'var(--ui-text-muted)',
                  padding: '0.25rem'
                }}>
                  ×
                </button>
              </div>
              
              <div className="ui-alert ui-alert--success ui-alert--dismissible">
                <div className="ui-alert__icon">✅</div>
                <div className="ui-alert__content">
                  <h4 className="ui-alert__title">Profil mis à jour</h4>
                  <p>Vos informations personnelles ont été mises à jour avec succès.</p>
                </div>
                <button className="ui-alert__close" style={{ 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '1.25rem', 
                  cursor: 'pointer',
                  color: 'var(--ui-text-muted)',
                  padding: '0.25rem'
                }}>
                  ×
                </button>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Alert variant="info" title="Conseil" dismissible>
  Utilisez le raccourci Ctrl+S pour sauvegarder rapidement.
</Alert>

<Alert variant="success" title="Profil mis à jour" dismissible>
  Vos informations ont été mises à jour avec succès.
</Alert>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Alertes avec liens</h3>
          <div className="demo-content">
            <p>Alertes contenant des liens vers plus d'informations :</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <div className="ui-alert ui-alert--info">
                <div className="ui-alert__icon">📚</div>
                <div className="ui-alert__content">
                  <h4 className="ui-alert__title">Documentation mise à jour</h4>
                  <p>La documentation a été mise à jour avec de nouvelles fonctionnalités. 
                    <button 
                      onClick={() => alert('Lien vers la documentation')}
                      style={{ 
                        color: 'var(--ui-primary-color)', 
                        textDecoration: 'underline', 
                        marginLeft: '0.5rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        font: 'inherit'
                      }}
                    >
                      Consulter la documentation
                    </button>
                  </p>
                </div>
              </div>
              
              <div className="ui-alert ui-alert--warning">
                <div className="ui-alert__icon">🔒</div>
                <div className="ui-alert__content">
                  <h4 className="ui-alert__title">Sécurité renforcée</h4>
                  <p>Nous avons renforcé la sécurité de votre compte. 
                    <button 
                      onClick={() => alert('Lien vers les informations de sécurité')}
                      style={{ 
                        color: 'var(--ui-warning-color)', 
                        textDecoration: 'underline', 
                        marginLeft: '0.5rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        font: 'inherit'
                      }}
                    >
                      En savoir plus
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Alert variant="info" title="Documentation mise à jour">
  <p>La documentation a été mise à jour.
    <Alert.Link href="/docs">Consulter la documentation</Alert.Link>
  </p>
</Alert>

<Alert variant="warning" title="Sécurité renforcée">
  <p>Nous avons renforcé la sécurité de votre compte.
    <Alert.Link href="/security">En savoir plus</Alert.Link>
  </p>
</Alert>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant Alert :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>variant</strong> : "info" | "success" | "warning" | "error"</li>
                <li><strong>title</strong> : string (titre de l'alerte)</li>
                <li><strong>dismissible</strong> : boolean (peut être fermée)</li>
                <li><strong>onDismiss</strong> : function (callback de fermeture)</li>
                <li><strong>icon</strong> : ReactNode (icône personnalisée)</li>
                <li><strong>children</strong> : ReactNode (contenu de l'alerte)</li>
              </ul>
              
              <h4>Composants enfants :</h4>
              <ul>
                <li><strong>Alert.Title</strong> : Titre de l'alerte</li>
                <li><strong>Alert.Content</strong> : Contenu principal</li>
                <li><strong>Alert.Actions</strong> : Boutons d'action</li>
                <li><strong>Alert.Link</strong> : Lien dans l'alerte</li>
                <li><strong>Alert.Icon</strong> : Icône personnalisée</li>
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
                <p>Validation, erreurs de saisie, confirmation de succès.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Dashboard</h4>
                <p>Notifications système, mises à jour, alertes de sécurité.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>E-commerce</h4>
                <p>Confirmation de commande, alertes de stock, promotions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertPage;


