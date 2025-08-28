import React from 'react';

const CardPage: React.FC = () => {
  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Card</h1>
        <p className="section-description">
          Composant carte pour organiser et présenter le contenu de manière structurée. Les cartes sont parfaites pour afficher des informations groupées, des produits, des articles ou des actions.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Carte basique</h3>
          <div className="demo-content">
            <p>Structure simple avec contenu principal :</p>
            <div style={{ maxWidth: '300px', marginTop: '1rem' }}>
              <div className="ui-card">
                <div className="ui-card__body">
                  <p>Contenu de la carte avec du texte descriptif.</p>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { Card } from '@equitech-dev/ui-library';

<Card>
  <p>Contenu de la carte avec du texte descriptif.</p>
</Card>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Carte avec header et footer</h3>
          <div className="demo-content">
            <p>Carte complète avec header, body et footer :</p>
            <div style={{ maxWidth: '350px', marginTop: '1rem' }}>
              <div className="ui-card">
                <div className="ui-card__header">
                  <h3 style={{ margin: 0 }}>Titre de la carte</h3>
                  <small style={{ color: 'var(--ui-text-muted)' }}>Sous-titre optionnel</small>
                </div>
                <div className="ui-card__body">
                  <p>Contenu principal de la carte avec du texte descriptif et des informations importantes.</p>
                </div>
                <div className="ui-card__footer">
                  <button className="ui-button ui-button--primary">Action principale</button>
                  <button className="ui-button ui-button--secondary" style={{ marginLeft: '0.5rem' }}>Action secondaire</button>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Card>
  <Card.Header>
    <h3>Titre de la carte</h3>
    <small>Sous-titre optionnel</small>
  </Card.Header>
  <Card.Body>
    <p>Contenu principal de la carte</p>
  </Card.Body>
  <Card.Footer>
    <Button variant="primary">Action principale</Button>
    <Button variant="secondary">Action secondaire</Button>
  </Card.Footer>
</Card>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Carte avec image</h3>
          <div className="demo-content">
            <p>Carte avec image en haut et contenu en dessous :</p>
            <div style={{ maxWidth: '300px', marginTop: '1rem' }}>
              <div className="ui-card">
                <div style={{ 
                  height: '150px', 
                  background: 'linear-gradient(45deg, var(--ui-primary-color), var(--ui-secondary-color))',
                  borderRadius: '8px 8px 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '3rem'
                }}>
                  🖼️
                </div>
                <div className="ui-card__body">
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>Carte avec image</h4>
                  <p style={{ margin: 0, color: 'var(--ui-text-muted)' }}>Description de l'image et du contenu associé.</p>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Card>
  <Card.Image src="/path/to/image.jpg" alt="Description" />
  <Card.Body>
    <h4>Carte avec image</h4>
    <p>Description de l'image et du contenu associé.</p>
  </Card.Body>
</Card>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Carte interactive</h3>
          <div className="demo-content">
            <p>Carte avec interactions et états hover :</p>
            <div style={{ maxWidth: '300px', marginTop: '1rem' }}>
              <div className="ui-card ui-card--interactive">
                <div className="ui-card__body">
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>Carte interactive</h4>
                  <p style={{ margin: 0, color: 'var(--ui-text-muted)' }}>Cliquez pour voir les détails</p>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Card 
  interactive 
  onClick={() => handleCardClick()}
  onMouseEnter={() => setHovered(true)}
>
  <Card.Body>
    <h4>Carte interactive</h4>
    <p>Cliquez pour voir les détails</p>
  </Card.Body>
</Card>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Grille de cartes</h3>
          <div className="demo-content">
            <p>Organisation de plusieurs cartes en grille :</p>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1rem', 
              marginTop: '1rem' 
            }}>
              <div className="ui-card">
                <div className="ui-card__header">
                  <h4 style={{ margin: 0 }}>Fonctionnalité 1</h4>
                </div>
                <div className="ui-card__body">
                  <p>Description de la première fonctionnalité.</p>
                </div>
              </div>
              <div className="ui-card">
                <div className="ui-card__header">
                  <h4 style={{ margin: 0 }}>Fonctionnalité 2</h4>
                </div>
                <div className="ui-card__body">
                  <p>Description de la deuxième fonctionnalité.</p>
                </div>
              </div>
              <div className="ui-card">
                <div className="ui-card__header">
                  <h4 style={{ margin: 0 }}>Fonctionnalité 3</h4>
                </div>
                <div className="ui-card__body">
                  <p>Description de la troisième fonctionnalité.</p>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<div className="cards-grid">
  <Card>
    <Card.Header>
      <h4>Fonctionnalité 1</h4>
    </Card.Header>
    <Card.Body>
      <p>Description de la première fonctionnalité.</p>
    </Card.Body>
  </Card>
  {/* Répéter pour d'autres cartes */}
</div>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Carte avec badges et métadonnées</h3>
          <div className="demo-content">
            <p>Carte enrichie avec des badges et informations supplémentaires :</p>
            <div style={{ maxWidth: '350px', marginTop: '1rem' }}>
              <div className="ui-card">
                <div className="ui-card__header">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0 }}>Article de blog</h4>
                    <span style={{ 
                      background: 'var(--ui-success-color)', 
                      color: 'white', 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '12px', 
                      fontSize: '0.75rem' 
                    }}>
                      Nouveau
                    </span>
                  </div>
                </div>
                <div className="ui-card__body">
                  <p>Contenu de l'article avec du texte descriptif.</p>
                  <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    marginTop: '1rem', 
                    fontSize: '0.875rem', 
                    color: 'var(--ui-text-muted)' 
                  }}>
                    <span>📅 22 Août 2025</span>
                    <span>👁️ 1.2k vues</span>
                    <span>💬 5 commentaires</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Card>
  <Card.Header>
    <div className="card-header-content">
      <h4>Article de blog</h4>
      <Badge variant="success">Nouveau</Badge>
    </div>
  </Card.Header>
  <Card.Body>
    <p>Contenu de l'article</p>
    <Card.Metadata>
      <span>📅 22 Août 2025</span>
      <span>👁️ 1.2k vues</span>
      <span>💬 5 commentaires</span>
    </Card.Metadata>
  </Card.Body>
</Card>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant Card :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>variant</strong> : "default" | "elevated" | "outlined"</li>
                <li><strong>interactive</strong> : boolean (pour les interactions)</li>
                <li><strong>onClick</strong> : function</li>
                <li><strong>className</strong> : string</li>
                <li><strong>children</strong> : ReactNode</li>
              </ul>
              
              <h4>Composants enfants :</h4>
              <ul>
                <li><strong>Card.Header</strong> : En-tête de la carte</li>
                <li><strong>Card.Body</strong> : Contenu principal</li>
                <li><strong>Card.Footer</strong> : Pied de page</li>
                <li><strong>Card.Image</strong> : Image de la carte</li>
                <li><strong>Card.Metadata</strong> : Métadonnées</li>
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
                <h4>Dashboard</h4>
                <p>Cartes pour afficher des métriques, graphiques et actions rapides.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>E-commerce</h4>
                <p>Cartes produit avec images, prix, descriptions et boutons d'action.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Blog/News</h4>
                <p>Cartes d'articles avec titres, extraits, dates et métadonnées.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
