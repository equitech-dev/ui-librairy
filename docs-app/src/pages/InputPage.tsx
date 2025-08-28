import React from 'react';

const InputPage: React.FC = () => {
  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Input</h1>
        <p className="section-description">
          Composant input pour la saisie de texte avec différents états, variantes et fonctionnalités. L'Input est essentiel pour tous les formulaires et interactions utilisateur.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Input basique</h3>
          <div className="demo-content">
            <p>Input standard avec placeholder et label :</p>
            <div style={{ maxWidth: '400px', marginTop: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Nom d'utilisateur
              </label>
              <input className="ui-input" placeholder="Entrez votre nom d'utilisateur" />
            </div>
          </div>
          <pre className="demo-code">
{`import { Input } from '@equitech-dev/ui-library';

<Input 
  label="Nom d'utilisateur"
  placeholder="Entrez votre nom d'utilisateur"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">États et variantes</h3>
          <div className="demo-content">
            <p>Différents états pour indiquer le statut de la saisie :</p>
            <div style={{ maxWidth: '400px', marginTop: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Input normal
                </label>
                <input className="ui-input" placeholder="Saisie normale" />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Input avec succès
                </label>
                <input className="ui-input ui-input--success" placeholder="Saisie validée" />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Input avec erreur
                </label>
                <input className="ui-input ui-input--error" placeholder="Saisie avec erreur" />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Input désactivé
                </label>
                <input className="ui-input" placeholder="Saisie désactivée" disabled />
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Input placeholder="Saisie normale" />
<Input variant="success" placeholder="Saisie validée" />
<Input variant="error" placeholder="Saisie avec erreur" />
<Input placeholder="Saisie désactivée" disabled />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Tailles disponibles</h3>
          <div className="demo-content">
            <p>Trois tailles différentes pour s'adapter à vos layouts :</p>
            <div style={{ maxWidth: '400px', marginTop: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Small
                </label>
                <input 
                  className="ui-input" 
                  placeholder="Petit input" 
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Medium (défaut)
                </label>
                <input className="ui-input" placeholder="Input moyen" />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Large
                </label>
                <input 
                  className="ui-input" 
                  placeholder="Grand input" 
                  style={{ fontSize: '1.125rem', padding: '0.75rem 1rem' }}
                />
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Input size="small" placeholder="Petit input" />
<Input size="medium" placeholder="Input moyen" />
<Input size="large" placeholder="Grand input" />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Input avec icônes</h3>
          <div className="demo-content">
            <p>Input avec icônes pour améliorer l'expérience utilisateur :</p>
            <div style={{ maxWidth: '400px', marginTop: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Recherche
                </label>
                <div className="ui-input-group">
                  <span className="ui-input-icon ui-input-icon--left">🔍</span>
                  <input 
                    className="ui-input ui-input--with-icon-left" 
                    placeholder="Rechercher..." 
                  />
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Email
                </label>
                <div className="ui-input-group">
                  <input 
                    className="ui-input ui-input--with-icon-right" 
                    placeholder="votre@email.com" 
                    type="email"
                  />
                  <span className="ui-input-icon ui-input-icon--right">✉️</span>
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Mot de passe
                </label>
                <div className="ui-input-group">
                  <span className="ui-input-icon ui-input-icon--left">🔒</span>
                  <input 
                    className="ui-input ui-input--with-icon-left" 
                    type="password"
                    placeholder="Votre mot de passe" 
                  />
                  <span className="ui-input-icon ui-input-icon--right">👁️</span>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<InputGroup>
  <InputIcon position="left" name="search" />
  <Input placeholder="Rechercher..." />
</InputGroup>

<InputGroup>
  <Input placeholder="votre@email.com" type="email" />
  <InputIcon position="right" name="email" />
</InputGroup>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Types d'input</h3>
          <div className="demo-content">
            <p>Différents types d'input pour différents usages :</p>
            <div style={{ maxWidth: '400px', marginTop: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Texte
                </label>
                <input className="ui-input" type="text" placeholder="Saisie de texte" />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Email
                </label>
                <input className="ui-input" type="email" placeholder="votre@email.com" />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Mot de passe
                </label>
                <input className="ui-input" type="password" placeholder="Votre mot de passe" />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Nombre
                </label>
                <input className="ui-input" type="number" placeholder="0" />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  URL
                </label>
                <input className="ui-input" type="url" placeholder="https://example.com" />
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Input type="text" placeholder="Saisie de texte" />
<Input type="email" placeholder="votre@email.com" />
<Input type="password" placeholder="Votre mot de passe" />
<Input type="number" placeholder="0" />
<Input type="url" placeholder="https://example.com" />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Input avec validation</h3>
          <div className="demo-content">
            <p>Input avec messages de validation et états d'erreur :</p>
            <div style={{ maxWidth: '400px', marginTop: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Email (avec validation)
                </label>
                <input className="ui-input ui-input--error" type="email" placeholder="email@example.com" />
                <small style={{ color: 'var(--ui-error-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  Veuillez entrer une adresse email valide
                </small>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Mot de passe (avec validation)
                </label>
                <input className="ui-input ui-input--success" type="password" placeholder="Mot de passe" />
                <small style={{ color: 'var(--ui-success-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  ✓ Le mot de passe respecte les critères de sécurité
                </small>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Input 
  type="email"
  placeholder="email@example.com"
  error="Veuillez entrer une adresse email valide"
/>

<Input 
  type="password"
  placeholder="Mot de passe"
  success="✓ Le mot de passe respecte les critères de sécurité"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Input avec actions</h3>
          <div className="demo-content">
            <p>Input avec boutons d'action intégrés :</p>
            <div style={{ maxWidth: '400px', marginTop: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Recherche avec bouton
                </label>
                <div style={{ display: 'flex' }}>
                  <input 
                    className="ui-input" 
                    placeholder="Rechercher..." 
                    style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0', flex: 1 }}
                  />
                  <button 
                    className="ui-button ui-button--primary"
                    style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                  >
                    Rechercher
                  </button>
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  URL avec bouton de test
                </label>
                <div style={{ display: 'flex' }}>
                  <input 
                    className="ui-input" 
                    placeholder="https://example.com" 
                    style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0', flex: 1 }}
                  />
                  <button 
                    className="ui-button ui-button--secondary"
                    style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                  >
                    Tester
                  </button>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<InputGroup>
  <Input placeholder="Rechercher..." />
  <Button variant="primary">Rechercher</Button>
</InputGroup>

<InputGroup>
  <Input placeholder="https://example.com" />
  <Button variant="secondary">Tester</Button>
</InputGroup>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Pills et Badges</h3>
          <div className="demo-content">
            <p>Composants pills/badges pour étiqueter et catégoriser le contenu :</p>
            <div style={{ marginTop: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem' }}>Variantes de couleurs</h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="ui-pill ui-pill--primary">Primary</span>
                  <span className="ui-pill ui-pill--secondary">Secondary</span>
                  <span className="ui-pill ui-pill--success">Success</span>
                  <span className="ui-pill ui-pill--warning">Warning</span>
                  <span className="ui-pill ui-pill--error">Error</span>
                  <span className="ui-pill ui-pill--outline">Outline</span>
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem' }}>Tailles disponibles</h4>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span className="ui-pill ui-pill--primary ui-pill--small">Small</span>
                  <span className="ui-pill ui-pill--primary">Medium</span>
                  <span className="ui-pill ui-pill--primary ui-pill--large">Large</span>
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem' }}>Exemples d'usage</h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="ui-pill ui-pill--success">Nouveau</span>
                  <span className="ui-pill ui-pill--warning">En cours</span>
                  <span className="ui-pill ui-pill--error">Urgent</span>
                  <span className="ui-pill ui-pill--outline">Draft</span>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { Pill } from '@equitech-dev/ui-library';

// Variantes de couleurs
<Pill variant="primary">Primary</Pill>
<Pill variant="success">Success</Pill>
<Pill variant="outline">Outline</Pill>

// Tailles
<Pill size="small" variant="primary">Small</Pill>
<Pill size="large" variant="primary">Large</Pill>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant Input :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>type</strong> : "text" | "email" | "password" | "number" | "url" | "tel"</li>
                <li><strong>variant</strong> : "default" | "success" | "error" | "warning"</li>
                <li><strong>size</strong> : "small" | "medium" | "large"</li>
                <li><strong>placeholder</strong> : string</li>
                <li><strong>value</strong> : string</li>
                <li><strong>disabled</strong> : boolean</li>
                <li><strong>readOnly</strong> : boolean</li>
                <li><strong>onChange</strong> : function</li>
                <li><strong>onFocus</strong> : function</li>
                <li><strong>onBlur</strong> : function</li>
                <li><strong>iconLeft</strong> : ReactNode</li>
                <li><strong>iconRight</strong> : ReactNode</li>
                <li><strong>error</strong> : string</li>
                <li><strong>success</strong> : string</li>
                <li><strong>label</strong> : string</li>
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
                <p>Champs de saisie pour les formulaires d'inscription, connexion, contact.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Recherche</h4>
                <p>Barres de recherche avec suggestions et filtres.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Configuration</h4>
                <p>Champs pour configurer des paramètres, URLs, emails de contact.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPage;
