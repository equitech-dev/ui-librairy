import React from 'react';

const ButtonPage: React.FC = () => {
  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Button</h1>
        <p className="section-description">
          Composant bouton avec plusieurs variantes, tailles et états. Le composant Button est l'un des composants les plus utilisés dans une interface utilisateur.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Variantes de couleurs</h3>
          <div className="demo-content">
            <p>Différentes variantes de couleurs disponibles pour s'adapter à vos besoins :</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <button className="ui-button ui-button--primary">Primary</button>
              <button className="ui-button ui-button--secondary">Secondary</button>
              <button className="ui-button ui-button--success">Success</button>
              <button className="ui-button ui-button--warning">Warning</button>
              <button className="ui-button ui-button--error">Error</button>
            </div>
          </div>
          <pre className="demo-code">
{`import { Button } from '@equitech-dev/ui-library';

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="error">Error</Button>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Tailles disponibles</h3>
          <div className="demo-content">
            <p>Trois tailles différentes pour s'adapter à vos layouts :</p>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
              <button className="ui-button ui-button--primary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>Small</button>
              <button className="ui-button ui-button--primary">Medium</button>
              <button className="ui-button ui-button--primary" style={{ fontSize: '1rem', padding: '0.75rem 1.5rem' }}>Large</button>
            </div>
          </div>
          <pre className="demo-code">
{`<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">États et interactions</h3>
          <div className="demo-content">
            <p>Différents états et interactions disponibles :</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <button className="ui-button ui-button--primary">Normal</button>
              <button className="ui-button ui-button--primary" disabled>Disabled</button>
              <button className="ui-button ui-button--primary" style={{ opacity: 0.6, cursor: 'not-allowed' }}>Loading...</button>
            </div>
          </div>
          <pre className="demo-code">
{`<Button>Normal</Button>
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Boutons avec icônes</h3>
          <div className="demo-content">
            <p>Boutons avec icônes pour améliorer l'expérience utilisateur :</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <button className="ui-button ui-button--primary">
                <span style={{ marginRight: '0.5rem' }}>📁</span>
                Ouvrir
              </button>
              <button className="ui-button ui-button--success">
                <span style={{ marginRight: '0.5rem' }}>✅</span>
                Valider
              </button>
              <button className="ui-button ui-button--error">
                <span style={{ marginRight: '0.5rem' }}>🗑️</span>
                Supprimer
              </button>
            </div>
          </div>
          <pre className="demo-code">
{`<Button variant="primary">
  <Icon name="folder" />
  Ouvrir
</Button>

<Button variant="success">
  <Icon name="check" />
  Valider
</Button>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Groupe de boutons</h3>
          <div className="demo-content">
            <p>Grouper des boutons pour des actions liées :</p>
            <div style={{ display: 'flex', marginTop: '1rem' }}>
              <button className="ui-button ui-button--primary" style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}>Gauche</button>
              <button className="ui-button ui-button--primary" style={{ borderRadius: '0', borderLeft: 'none' }}>Centre</button>
              <button className="ui-button ui-button--primary" style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderLeft: 'none' }}>Droite</button>
            </div>
          </div>
          <pre className="demo-code">
{`<ButtonGroup>
  <Button variant="primary">Gauche</Button>
  <Button variant="primary">Centre</Button>
  <Button variant="primary">Droite</Button>
</ButtonGroup>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant Button :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>variant</strong> : "primary" | "secondary" | "success" | "warning" | "error"</li>
                <li><strong>size</strong> : "small" | "medium" | "large"</li>
                <li><strong>disabled</strong> : boolean</li>
                <li><strong>loading</strong> : boolean</li>
                <li><strong>onClick</strong> : function</li>
                <li><strong>children</strong> : ReactNode</li>
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
                <h4>Formulaire</h4>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button className="ui-button ui-button--primary">Enregistrer</button>
                  <button className="ui-button ui-button--secondary">Annuler</button>
                </div>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Actions de liste</h4>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button className="ui-button ui-button--success" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>Éditer</button>
                  <button className="ui-button ui-button--error" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>Supprimer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonPage;


