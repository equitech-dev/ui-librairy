import React, { useState } from 'react';

interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
  icon?: string;
}

const BreadcrumbPage: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>('products');

  // Exemples de chemins de navigation
  const breadcrumbPaths = {
    home: [
      { id: 'home', label: 'Accueil', href: '/', icon: '🏠' }
    ],
    products: [
      { id: 'home', label: 'Accueil', href: '/', icon: '🏠' },
      { id: 'products', label: 'Produits', href: '/products', icon: '📦' }
    ],
    categories: [
      { id: 'home', label: 'Accueil', href: '/', icon: '🏠' },
      { id: 'products', label: 'Produits', href: '/products', icon: '📦' },
      { id: 'categories', label: 'Catégories', href: '/products/categories', icon: '🏷️' }
    ],
    electronics: [
      { id: 'home', label: 'Accueil', href: '/', icon: '🏠' },
      { id: 'products', label: 'Produits', href: '/products', icon: '📦' },
      { id: 'categories', label: 'Catégories', href: '/products/categories', icon: '🏷️' },
      { id: 'electronics', label: 'Électronique', href: '/products/categories/electronics', icon: '💻' }
    ],
    smartphone: [
      { id: 'home', label: 'Accueil', href: '/', icon: '🏠' },
      { id: 'products', label: 'Produits', href: '/products', icon: '📦' },
      { id: 'categories', label: 'Catégories', href: '/products/categories', icon: '🏷️' },
      { id: 'electronics', label: 'Électronique', href: '/products/categories/electronics', icon: '💻' },
      { id: 'smartphone', label: 'Smartphone Galaxy S24', href: '/products/categories/electronics/smartphone', icon: '📱' }
    ]
  };

  const currentBreadcrumb = breadcrumbPaths[currentPath as keyof typeof breadcrumbPaths] || breadcrumbPaths.home;

  const handleBreadcrumbClick = (item: BreadcrumbItem) => {
    if (item.href && item.href !== '/') {
      // Simuler la navigation
      const pathSegments = item.href.split('/').filter(Boolean);
      if (pathSegments.length > 0) {
        setCurrentPath(pathSegments[pathSegments.length - 1]);
      }
    }
  };

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Breadcrumb</h1>
        <p className="section-description">
          Composant de navigation de fil d'Ariane pour indiquer la position actuelle de l'utilisateur dans la hiérarchie du site. Permet une navigation intuitive et améliore l'expérience utilisateur.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Breadcrumb basique</h3>
          <div className="demo-content">
            <p>Navigation simple avec séparateurs et liens cliquables :</p>
            <div style={{ marginTop: '1rem' }}>
              <nav className="ui-breadcrumb" aria-label="Navigation principale">
                <ol className="ui-breadcrumb-list">
                  {currentBreadcrumb.map((item, index) => (
                    <li key={item.id} className="ui-breadcrumb-item">
                      {index < currentBreadcrumb.length - 1 ? (
                        <a
                          href={item.href}
                          className="ui-breadcrumb-link"
                          onClick={(e) => {
                            e.preventDefault();
                            handleBreadcrumbClick(item);
                          }}
                        >
                          {item.icon && <span className="ui-breadcrumb-icon">{item.icon}</span>}
                          <span className="ui-breadcrumb-text">{item.label}</span>
                        </a>
                      ) : (
                        <span className="ui-breadcrumb-link active">
                          {item.icon && <span className="ui-breadcrumb-icon">{item.icon}</span>}
                          <span className="ui-breadcrumb-text">{item.label}</span>
                        </span>
                      )}
                      {index < currentBreadcrumb.length - 1 && (
                        <span className="ui-breadcrumb-separator">/</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
              
              <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--ui-surface-color)', borderRadius: '8px' }}>
                <h4 style={{ marginBottom: '0.5rem', color: 'var(--ui-primary-color)' }}>Navigation :</h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    className="ui-button ui-button--small ui-button--outline"
                    onClick={() => setCurrentPath('home')}
                  >
                    Accueil
                  </button>
                  <button
                    className="ui-button ui-button--small ui-button--outline"
                    onClick={() => setCurrentPath('products')}
                  >
                    Produits
                  </button>
                  <button
                    className="ui-button ui-button--small ui-button--outline"
                    onClick={() => setCurrentPath('categories')}
                  >
                    Catégories
                  </button>
                  <button
                    className="ui-button ui-button--small ui-button--outline"
                    onClick={() => setCurrentPath('electronics')}
                  >
                    Électronique
                  </button>
                  <button
                    className="ui-button ui-button--small ui-button--outline"
                    onClick={() => setCurrentPath('smartphone')}
                  >
                    Smartphone
                  </button>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { Breadcrumb } from '@equitech-dev/ui-library';

const breadcrumbItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Produits', href: '/products' },
  { label: 'Catégories', href: '/products/categories' }
];

<Breadcrumb items={breadcrumbItems} />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Breadcrumb avec icônes</h3>
          <div className="demo-content">
            <p>Navigation enrichie avec des icônes pour une meilleure compréhension :</p>
            <div style={{ marginTop: '1rem' }}>
              <nav className="ui-breadcrumb ui-breadcrumb--with-icons" aria-label="Navigation avec icônes">
                <ol className="ui-breadcrumb-list">
                  {currentBreadcrumb.map((item, index) => (
                    <li key={item.id} className="ui-breadcrumb-item">
                      {index < currentBreadcrumb.length - 1 ? (
                        <a
                          href={item.href}
                          className="ui-breadcrumb-link"
                          onClick={(e) => {
                            e.preventDefault();
                            handleBreadcrumbClick(item);
                          }}
                        >
                          {item.icon && <span className="ui-breadcrumb-icon">{item.icon}</span>}
                          <span className="ui-breadcrumb-text">{item.label}</span>
                        </a>
                      ) : (
                        <span className="ui-breadcrumb-link active">
                          {item.icon && <span className="ui-breadcrumb-icon">{item.icon}</span>}
                          <span className="ui-breadcrumb-text">{item.label}</span>
                        </span>
                      )}
                      {index < currentBreadcrumb.length - 1 && (
                        <span className="ui-breadcrumb-separator">›</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>
          <pre className="demo-code">
{`<Breadcrumb
  items={breadcrumbItems}
  showIcons={true}
  separator="›"
  iconPosition="left"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Breadcrumb avec séparateurs personnalisés</h3>
          <div className="demo-content">
            <p>Différents styles de séparateurs selon le design :</p>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Séparateur slash (/)</h4>
                <nav className="ui-breadcrumb" aria-label="Navigation avec slash">
                  <ol className="ui-breadcrumb-list">
                    <li className="ui-breadcrumb-item">
                      <a href="/" className="ui-breadcrumb-link">Accueil</a>
                      <span className="ui-breadcrumb-separator">/</span>
                    </li>
                    <li className="ui-breadcrumb-item">
                      <a href="/products" className="ui-breadcrumb-link">Produits</a>
                      <span className="ui-breadcrumb-separator">/</span>
                    </li>
                    <li className="ui-breadcrumb-item">
                      <span className="ui-breadcrumb-current">Catégories</span>
                    </li>
                  </ol>
                </nav>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Séparateur flèche (›)</h4>
                <nav className="ui-breadcrumb" aria-label="Navigation avec flèche">
                  <ol className="ui-breadcrumb-list">
                    <li className="ui-breadcrumb-item">
                      <a href="/" className="ui-breadcrumb-link">Accueil</a>
                      <span className="ui-breadcrumb-separator">›</span>
                    </li>
                    <li className="ui-breadcrumb-item">
                      <a href="/products" className="ui-breadcrumb-link">Produits</a>
                      <span className="ui-breadcrumb-separator">›</span>
                    </li>
                    <li className="ui-breadcrumb-item">
                      <span className="ui-breadcrumb-current">Catégories</span>
                    </li>
                  </ol>
                </nav>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Séparateur chevron (»)</h4>
                <nav className="ui-breadcrumb" aria-label="Navigation avec chevron">
                  <ol className="ui-breadcrumb-list">
                    <li className="ui-breadcrumb-item">
                      <a href="/" className="ui-breadcrumb-link">Accueil</a>
                      <span className="ui-breadcrumb-separator">»</span>
                    </li>
                    <li className="ui-breadcrumb-item">
                      <a href="/products" className="ui-breadcrumb-link">Produits</a>
                      <span className="ui-breadcrumb-separator">»</span>
                    </li>
                    <li className="ui-breadcrumb-item">
                      <span className="ui-breadcrumb-current">Catégories</span>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Breadcrumb
  items={breadcrumbItems}
  separator="/"
  separatorVariant="slash"
/>

<Breadcrumb
  items={breadcrumbItems}
  separator="›"
  separatorVariant="arrow"
/>

<Breadcrumb
  items={breadcrumbItems}
  separator="»"
  separatorVariant="chevron"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Breadcrumb avec tailles</h3>
          <div className="demo-content">
            <p>Différentes tailles selon le contexte d'utilisation :</p>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Small</h4>
                <nav className="ui-breadcrumb ui-breadcrumb--small" aria-label="Navigation small">
                  <ol className="ui-breadcrumb-list">
                    <li className="ui-breadcrumb-item">
                      <a href="/" className="ui-breadcrumb-link">Accueil</a>
                      <span className="ui-breadcrumb-separator">/</span>
                    </li>
                    <li className="ui-breadcrumb-item">
                      <a href="/products" className="ui-breadcrumb-link">Produits</a>
                      <span className="ui-breadcrumb-separator">/</span>
                    </li>
                    <li className="ui-breadcrumb-item">
                      <span className="ui-breadcrumb-current">Catégories</span>
                    </li>
                  </ol>
                </nav>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Medium (défaut)</h4>
                <nav className="ui-breadcrumb" aria-label="Navigation medium">
                  <ol className="ui-breadcrumb-list">
                    <li className="ui-breadcrumb-item">
                      <a href="/" className="ui-breadcrumb-link">Accueil</a>
                      <span className="ui-breadcrumb-separator">/</span>
                    </li>
                    <li className="ui-breadcrumb-item">
                      <a href="/products" className="ui-breadcrumb-link">Produits</a>
                      <span className="ui-breadcrumb-separator">/</span>
                    </li>
                    <li className="ui-breadcrumb-item">
                      <span className="ui-breadcrumb-current">Catégories</span>
                    </li>
                  </ol>
                </nav>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</h4>
                <nav className="ui-breadcrumb ui-breadcrumb--large" aria-label="Navigation large">
                  <ol className="ui-breadcrumb-list">
                    <li className="ui-breadcrumb-item">
                      <a href="/" className="ui-breadcrumb-link">Accueil</a>
                      <span className="ui-breadcrumb-separator">/</span>
                    </li>
                    <li className="ui-breadcrumb-item">
                      <a href="/products" className="ui-breadcrumb-link">Produits</a>
                      <span className="ui-breadcrumb-separator">/</span>
                    </li>
                    <li className="ui-breadcrumb-item">
                      <span className="ui-breadcrumb-current">Catégories</span>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Breadcrumb size="small" items={breadcrumbItems} />
<Breadcrumb size="medium" items={breadcrumbItems} />
<Breadcrumb size="large" items={breadcrumbItems} />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Breadcrumb avec collapse</h3>
          <div className="demo-content">
            <p>Breadcrumb avec collapse automatique pour les chemins longs :</p>
            <div style={{ marginTop: '1rem' }}>
              <nav className="ui-breadcrumb ui-breadcrumb--collapsible" aria-label="Navigation avec collapse">
                <ol className="ui-breadcrumb-list">
                  <li className="ui-breadcrumb-item">
                    <a href="/" className="ui-breadcrumb-link">
                      <span className="ui-breadcrumb-icon">🏠</span>
                      <span className="ui-breadcrumb-text">Accueil</span>
                    </a>
                    <span className="ui-breadcrumb-separator">/</span>
                  </li>
                  
                  <li className="ui-breadcrumb-item ui-breadcrumb-item--collapsed">
                    <span className="ui-breadcrumb-collapsed">...</span>
                    <span className="ui-breadcrumb-separator">/</span>
                  </li>
                  
                  <li className="ui-breadcrumb-item">
                    <a href="/products/categories" className="ui-breadcrumb-link">
                      <span className="ui-breadcrumb-icon">🏷️</span>
                      <span className="ui-breadcrumb-text">Catégories</span>
                    </a>
                    <span className="ui-breadcrumb-separator">/</span>
                  </li>
                  
                  <li className="ui-breadcrumb-item">
                    <a href="/products/categories/electronics" className="ui-breadcrumb-link">
                      <span className="ui-breadcrumb-icon">💻</span>
                      <span className="ui-breadcrumb-text">Électronique</span>
                    </a>
                    <span className="ui-breadcrumb-separator">/</span>
                  </li>
                  
                  <li className="ui-breadcrumb-item">
                    <span className="ui-breadcrumb-current">
                      <span className="ui-breadcrumb-icon">📱</span>
                      <span className="ui-breadcrumb-text">Smartphone Galaxy S24</span>
                    </span>
                  </li>
                </ol>
              </nav>
              
              <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--ui-surface-color)', borderRadius: '8px' }}>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ui-text-muted)' }}>
                  <strong>Note :</strong> Le collapse automatique s'active quand le breadcrumb dépasse la largeur disponible.
                </p>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Breadcrumb
  items={breadcrumbItems}
  collapsible={true}
  maxVisibleItems={3}
  collapseText="..."
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Breadcrumb avec actions</h3>
          <div className="demo-content">
            <p>Breadcrumb enrichi avec des actions contextuelles :</p>
            <div style={{ marginTop: '1rem' }}>
              <nav className="ui-breadcrumb ui-breadcrumb--with-actions" aria-label="Navigation avec actions">
                <ol className="ui-breadcrumb-list">
                  {currentBreadcrumb.map((item, index) => (
                    <li key={item.id} className="ui-breadcrumb-item">
                      <div className="ui-breadcrumb-item-content">
                        {index < currentBreadcrumb.length - 1 ? (
                          <a
                            href={item.href}
                            className="ui-breadcrumb-link"
                            onClick={(e) => {
                              e.preventDefault();
                              handleBreadcrumbClick(item);
                            }}
                          >
                            {item.icon && <span className="ui-breadcrumb-icon">{item.icon}</span>}
                            <span className="ui-breadcrumb-text">{item.label}</span>
                          </a>
                        ) : (
                          <span className="ui-breadcrumb-current">
                            {item.icon && <span className="ui-breadcrumb-icon">{item.icon}</span>}
                            <span className="ui-breadcrumb-text">{item.label}</span>
                          </span>
                        )}
                        
                        {index < currentBreadcrumb.length - 1 && (
                          <div className="ui-breadcrumb-actions">
                            <button className="ui-breadcrumb-action" title="Voir les détails">
                              👁️
                            </button>
                            <button className="ui-breadcrumb-action" title="Ajouter aux favoris">
                              ⭐
                            </button>
                          </div>
                        )}
                      </div>
                      
                      {index < currentBreadcrumb.length - 1 && (
                        <span className="ui-breadcrumb-separator">/</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>
          <pre className="demo-code">
{`<Breadcrumb
  items={breadcrumbItems}
  showActions={true}
  actions={[
    { icon: '👁️', action: 'view', tooltip: 'Voir les détails' },
    { icon: '⭐', action: 'favorite', tooltip: 'Ajouter aux favoris' }
  ]}
  onAction={handleAction}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant Breadcrumb :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>items</strong> : Array&lt;BreadcrumbItem&gt; (éléments de navigation)</li>
                <li><strong>separator</strong> : string (séparateur entre les éléments)</li>
                <li><strong>size</strong> : "small" | "medium" | "large"</li>
                <li><strong>showIcons</strong> : boolean (afficher les icônes)</li>
                <li><strong>iconPosition</strong> : "left" | "right" (position des icônes)</li>
                <li><strong>collapsible</strong> : boolean (activer le collapse automatique)</li>
                <li><strong>maxVisibleItems</strong> : number (nombre maximum d'éléments visibles)</li>
                <li><strong>collapseText</strong> : string (texte pour le collapse)</li>
                <li><strong>showActions</strong> : boolean (afficher les actions)</li>
                <li><strong>actions</strong> : Array&lt;BreadcrumbAction&gt; (actions disponibles)</li>
              </ul>
              
              <h4>Types :</h4>
              <ul>
                <li><strong>BreadcrumbItem</strong> : &#123; id: string, label: string, href?: string, icon?: string &#125;</li>
                <li><strong>BreadcrumbAction</strong> : &#123; icon: string, action: string, tooltip?: string &#125;</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onItemClick</strong> : (item: BreadcrumbItem) =&gt; void</li>
                <li><strong>onAction</strong> : (action: string, item: BreadcrumbItem) =&gt; void</li>
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
                <h4>E-commerce</h4>
                <p>Navigation dans les catégories de produits et sous-catégories.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Documentation</h4>
                <p>Navigation dans la hiérarchie des pages et sections de documentation.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Gestion de fichiers</h4>
                <p>Navigation dans l'arborescence des dossiers et fichiers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbPage;


