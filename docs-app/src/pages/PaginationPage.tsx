import React, { useState } from 'react';

const PaginationPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageLarge, setCurrentPageLarge] = useState(1);

  const totalPages = 10;
  const totalPagesLarge = 25;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToPageLarge = (page: number) => {
    if (page >= 1 && page <= totalPagesLarge) {
      setCurrentPageLarge(page);
    }
  };

  const renderPageNumbers = (current: number, total: number, maxVisible: number = 5) => {
    const pages = [];
    const halfVisible = Math.floor(maxVisible / 2);
    
    let start = Math.max(1, current - halfVisible);
    let end = Math.min(total, current + halfVisible);
    
    if (end - start + 1 < maxVisible) {
      if (start === 1) {
        end = Math.min(total, start + maxVisible - 1);
      } else {
        start = Math.max(1, end - maxVisible + 1);
      }
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Pagination</h1>
        <p className="section-description">
          Composant de pagination pour naviguer entre les pages de contenu. Permet aux utilisateurs de parcourir facilement de grandes quantités de données organisées en pages.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Pagination basique</h3>
          <div className="demo-content">
            <p>Pagination simple avec navigation entre pages :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-pagination">
                <button 
                  className="ui-pagination__prev"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ← Précédent
                </button>
                
                <div className="ui-pagination__pages">
                  {renderPageNumbers(currentPage, totalPages).map(page => (
                    <button
                      key={page}
                      className={`ui-pagination__page ${page === currentPage ? 'ui-pagination__page--active' : ''}`}
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button 
                  className="ui-pagination__next"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Suivant →
                </button>
              </div>
              
              <div style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--ui-text-muted)' }}>
                Page {currentPage} sur {totalPages}
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { Pagination } from '@equitech-dev/ui-library';

const [currentPage, setCurrentPage] = useState(1);
const totalPages = 10;

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  showPrevNext={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Pagination avec ellipsis</h3>
          <div className="demo-content">
            <p>Pagination avec ellipsis pour gérer un grand nombre de pages :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-pagination ui-pagination--with-ellipsis">
                <button 
                  className="ui-pagination__prev"
                  onClick={() => goToPageLarge(currentPageLarge - 1)}
                  disabled={currentPageLarge === 1}
                >
                  ← Précédent
                </button>
                
                <div className="ui-pagination__pages">
                  {currentPageLarge > 3 && (
                    <>
                      <button
                        className="ui-pagination__page"
                        onClick={() => goToPageLarge(1)}
                      >
                        1
                      </button>
                      {currentPageLarge > 4 && (
                        <span className="ui-pagination__ellipsis">...</span>
                      )}
                    </>
                  )}
                  
                  {renderPageNumbers(currentPageLarge, totalPagesLarge, 3).map(page => (
                    <button
                      key={page}
                      className={`ui-pagination__page ${page === currentPageLarge ? 'ui-pagination__page--active' : ''}`}
                      onClick={() => goToPageLarge(page)}
                    >
                      {page}
                    </button>
                  ))}
                  
                  {currentPageLarge < totalPagesLarge - 2 && (
                    <>
                      {currentPageLarge < totalPagesLarge - 3 && (
                        <span className="ui-pagination__ellipsis">...</span>
                      )}
                      <button
                        className="ui-pagination__page"
                        onClick={() => goToPageLarge(totalPagesLarge)}
                      >
                        {totalPagesLarge}
                      </button>
                    </>
                  )}
                </div>
                
                <button 
                  className="ui-pagination__next"
                  onClick={() => goToPageLarge(currentPageLarge + 1)}
                  disabled={currentPageLarge === totalPagesLarge}
                >
                  Suivant →
                </button>
              </div>
              
              <div style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--ui-text-muted)' }}>
                Page {currentPageLarge} sur {totalPagesLarge}
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  showEllipsis={true}
  maxVisiblePages={3}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Pagination compacte</h3>
          <div className="demo-content">
            <p>Pagination compacte pour les espaces restreints :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-pagination ui-pagination--compact">
                <button 
                  className="ui-pagination__prev ui-pagination__prev--compact"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ←
                </button>
                
                <div className="ui-pagination__info">
                  <span className="ui-pagination__current">{currentPage}</span>
                  <span className="ui-pagination__separator">/</span>
                  <span className="ui-pagination__total">{totalPages}</span>
                </div>
                
                <button 
                  className="ui-pagination__next ui-pagination__next--compact"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  →
                </button>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  variant="compact"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Pagination avec tailles</h3>
          <div className="demo-content">
            <p>Différentes tailles de pagination selon le contexte :</p>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Small</h4>
                <div className="ui-pagination ui-pagination--small">
                  <button className="ui-pagination__prev ui-pagination__prev--small">←</button>
                  <div className="ui-pagination__pages">
                    <button className="ui-pagination__page ui-pagination__page--small ui-pagination__page--active">1</button>
                    <button className="ui-pagination__page ui-pagination__page--small">2</button>
                    <button className="ui-pagination__page ui-pagination__page--small">3</button>
                  </div>
                  <button className="ui-pagination__next ui-pagination__next--small">→</button>
                </div>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Medium (défaut)</h4>
                <div className="ui-pagination">
                  <button className="ui-pagination__prev">← Précédent</button>
                  <div className="ui-pagination__pages">
                    <button className="ui-pagination__page ui-pagination__page--active">1</button>
                    <button className="ui-pagination__page">2</button>
                    <button className="ui-pagination__page">3</button>
                  </div>
                  <button className="ui-pagination__next">Suivant →</button>
                </div>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</h4>
                <div className="ui-pagination ui-pagination--large">
                  <button className="ui-pagination__prev ui-pagination__prev--large">← Précédent</button>
                  <div className="ui-pagination__pages">
                    <button className="ui-pagination__page ui-pagination__page--large ui-pagination__page--active">1</button>
                    <button className="ui-pagination__page ui-pagination__page--large">2</button>
                    <button className="ui-pagination__page ui-pagination__page--large">3</button>
                  </div>
                  <button className="ui-pagination__next ui-pagination__next--large">Suivant →</button>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Pagination size="small" currentPage={1} totalPages={3} />
<Pagination size="medium" currentPage={1} totalPages={3} />
<Pagination size="large" currentPage={1} totalPages={3} />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Pagination avec informations</h3>
          <div className="demo-content">
            <p>Pagination avec informations sur le contenu affiché :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-pagination ui-pagination--with-info">
                <div className="ui-pagination__info">
                  <span>Affichage de 1 à 10 sur 100 résultats</span>
                </div>
                
                <div className="ui-pagination__controls">
                  <button className="ui-pagination__prev">← Précédent</button>
                  <div className="ui-pagination__pages">
                    <button className="ui-pagination__page ui-pagination__page--active">1</button>
                    <button className="ui-pagination__page">2</button>
                    <button className="ui-pagination__page">3</button>
                    <span className="ui-pagination__ellipsis">...</span>
                    <button className="ui-pagination__page">10</button>
                  </div>
                  <button className="ui-pagination__next">Suivant →</button>
                </div>
                
                <div className="ui-pagination__jump">
                  <span>Aller à la page :</span>
                  <input 
                    type="number" 
                    min="1" 
                    max="10" 
                    className="ui-pagination__jump-input"
                    placeholder="1"
                  />
                  <button className="ui-pagination__jump-button">Aller</button>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Pagination
  currentPage={1}
  totalPages={10}
  totalItems={100}
  itemsPerPage={10}
  showInfo={true}
  showJumpToPage={true}
  onPageChange={setCurrentPage}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant Pagination :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>currentPage</strong> : number (page actuelle)</li>
                <li><strong>totalPages</strong> : number (nombre total de pages)</li>
                <li><strong>onPageChange</strong> : function (callback de changement de page)</li>
                <li><strong>size</strong> : "small" | "medium" | "large"</li>
                <li><strong>variant</strong> : "default" | "compact" | "with-ellipsis"</li>
                <li><strong>showPrevNext</strong> : boolean (afficher les boutons précédent/suivant)</li>
                <li><strong>showEllipsis</strong> : boolean (afficher les ellipsis)</li>
                <li><strong>maxVisiblePages</strong> : number (nombre maximum de pages visibles)</li>
                <li><strong>showInfo</strong> : boolean (afficher les informations)</li>
                <li><strong>showJumpToPage</strong> : boolean (afficher le saut de page)</li>
                <li><strong>totalItems</strong> : number (nombre total d'éléments)</li>
                <li><strong>itemsPerPage</strong> : number (éléments par page)</li>
              </ul>
              
                             <h4>Événements :</h4>
               <ul>
                 <li><strong>onPageChange</strong> : (page: number) =&gt; void</li>
                 <li><strong>onPrevClick</strong> : () =&gt; void</li>
                 <li><strong>onNextClick</strong> : () =&gt; void</li>
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
                <h4>Listes de données</h4>
                <p>Navigation dans des tableaux, listes d'utilisateurs, produits, etc.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Résultats de recherche</h4>
                <p>Parcourir les pages de résultats de recherche avec informations.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Galerie d'images</h4>
                <p>Navigation dans des galeries avec pagination compacte.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginationPage;
