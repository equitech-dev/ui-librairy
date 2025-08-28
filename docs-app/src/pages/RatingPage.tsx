import React, { useState } from 'react';

const RatingPage: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [readOnlyRating, setReadOnlyRating] = useState(4.5);
  const [customRating, setCustomRating] = useState(3);
  const [fractionalRating, setFractionalRating] = useState(3.7);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleHover = (hoverValue: number) => {
    setHoverRating(hoverValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const renderStars = (value: number, maxValue: number = 5, size: string = 'medium', interactive: boolean = false, onRatingChange?: (rating: number) => void, onHover?: (rating: number) => void) => {
    const stars = [];
    const fullStars = Math.floor(value);
    const hasHalfStar = value % 1 !== 0;
    
    for (let i = 1; i <= maxValue; i++) {
      let starClass = 'ui-rating__star';
      let starContent = '★';
      
      if (i <= fullStars) {
        starClass += ' ui-rating__star--filled';
      } else if (i === fullStars + 1 && hasHalfStar) {
        starClass += ' ui-rating__star--half';
        starContent = '☆';
      } else {
        starClass += ' ui-rating__star--empty';
        starContent = '☆';
      }
      
      if (size !== 'medium') {
        starClass += ` ui-rating__star--${size}`;
      }
      
      stars.push(
        <span
          key={i}
          className={starClass}
          onClick={() => interactive && onRatingChange?.(i)}
          onMouseEnter={() => interactive && onHover?.(i)}
          onMouseLeave={() => interactive && onHover?.(0)}
          style={{ cursor: interactive ? 'pointer' : 'default' }}
        >
          {starContent}
        </span>
      );
    }
    
    return stars;
  };

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Rating</h1>
        <p className="section-description">
          Composant de notation pour afficher et collecter des évaluations. Permet aux utilisateurs de donner des notes sur une échelle prédéfinie, généralement avec des étoiles ou d'autres symboles visuels.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Rating basique</h3>
          <div className="demo-content">
            <p>Rating simple avec étoiles interactives :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-rating-demo">
                <div className="ui-rating">
                  {renderStars(rating, 5, 'medium', true, handleRatingChange, handleHover)}
                </div>
                <div className="ui-rating__text">
                  Note actuelle : {rating}/5
                </div>
                
                <div style={{ marginTop: '1rem' }}>
                  <button
                    className="ui-button ui-button--outline"
                    onClick={() => setRating(0)}
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { Rating } from '@equitech-dev/ui-library';

const [rating, setRating] = useState(0);

<Rating
  value={rating}
  maxValue={5}
  onChange={setRating}
  showText={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Rating avec prévisualisation</h3>
          <div className="demo-content">
            <p>Rating avec prévisualisation au survol :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-rating-demo">
                <div className="ui-rating">
                  {renderStars(hoverRating || rating, 5, 'medium', true, handleRatingChange, handleHover)}
                </div>
                <div className="ui-rating__text">
                  {hoverRating ? `Prévisualisation : ${hoverRating}/5` : `Note actuelle : ${rating}/5`}
                </div>
                
                <div style={{ marginTop: '1rem' }}>
                  <button
                    className="ui-button ui-button--outline"
                    onClick={() => setRating(0)}
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Rating
  value={rating}
  maxValue={5}
  onChange={setRating}
  onHover={setHoverRating}
  showText={true}
  allowHover={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Rating en lecture seule</h3>
          <div className="demo-content">
            <p>Rating affiché sans possibilité de modification :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-rating-demo ui-rating-demo--readonly">
                <div className="ui-rating-demo__item">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Note moyenne</h4>
                  <div className="ui-rating ui-rating--readonly">
                    {renderStars(readOnlyRating, 5, 'medium', false)}
                  </div>
                  <div className="ui-rating__text">
                    {readOnlyRating}/5 ({readOnlyRating * 20}%)
                  </div>
                </div>
                
                <div className="ui-rating-demo__item">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Note personnalisée</h4>
                  <div className="ui-rating ui-rating--readonly">
                    {renderStars(customRating, 5, 'medium', false)}
                  </div>
                  <div className="ui-rating__text">
                    {customRating}/5
                  </div>
                </div>
                
                <div className="ui-rating-demo__item">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Note fractionnaire</h4>
                  <div className="ui-rating ui-rating--readonly">
                    {renderStars(fractionalRating, 5, 'medium', false)}
                  </div>
                  <div className="ui-rating__text">
                    {fractionalRating}/5
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Rating
  value={4.5}
  maxValue={5}
  readOnly={true}
  showText={true}
  allowHalf={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Rating avec tailles</h3>
          <div className="demo-content">
            <p>Différentes tailles de rating selon le contexte :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-rating-demo ui-rating-demo--sizes">
                <div className="ui-rating-demo__size-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Small</h4>
                  <div className="ui-rating">
                    {renderStars(4, 5, 'small', false)}
                  </div>
                  <div className="ui-rating__text">4/5</div>
                </div>
                
                <div className="ui-rating-demo__size-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Medium (défaut)</h4>
                  <div className="ui-rating">
                    {renderStars(4, 5, 'medium', false)}
                  </div>
                  <div className="ui-rating__text">4/5</div>
                </div>
                
                <div className="ui-rating-demo__size-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</h4>
                  <div className="ui-rating">
                    {renderStars(4, 5, 'large', false)}
                  </div>
                  <div className="ui-rating__text">4/5</div>
                </div>
                
                <div className="ui-rating-demo__size-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Extra Large</h4>
                  <div className="ui-rating">
                    {renderStars(4, 5, 'xl', false)}
                  </div>
                  <div className="ui-rating__text">4/5</div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Rating size="small" value={4} maxValue={5} />
<Rating size="medium" value={4} maxValue={5} />
<Rating size="large" value={4} maxValue={5} />
<Rating size="xl" value={4} maxValue={5} />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Rating avec échelles personnalisées</h3>
          <div className="demo-content">
            <p>Rating avec différentes échelles de notation :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-rating-demo ui-rating-demo--scales">
                <div className="ui-rating-demo__scale-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Échelle 1-5</h4>
                  <div className="ui-rating">
                    {renderStars(4, 5, 'medium', false)}
                  </div>
                  <div className="ui-rating__text">4/5</div>
                </div>
                
                <div className="ui-rating-demo__scale-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Échelle 1-10</h4>
                  <div className="ui-rating">
                    {renderStars(8, 10, 'medium', false)}
                  </div>
                  <div className="ui-rating__text">8/10</div>
                </div>
                
                <div className="ui-rating-demo__scale-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Échelle 1-3</h4>
                  <div className="ui-rating">
                    {renderStars(2, 3, 'medium', false)}
                  </div>
                  <div className="ui-rating__text">2/3</div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Rating value={4} maxValue={5} />
<Rating value={8} maxValue={10} />
<Rating value={2} maxValue={3} />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Rating avec icônes personnalisées</h3>
          <div className="demo-content">
            <p>Rating avec différents types d'icônes :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-rating-demo ui-rating-demo--icons">
                <div className="ui-rating-demo__icon-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Étoiles</h4>
                  <div className="ui-rating ui-rating--stars">
                    {renderStars(4, 5, 'medium', false)}
                  </div>
                  <div className="ui-rating__text">4/5</div>
                </div>
                
                <div className="ui-rating-demo__icon-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Cœurs</h4>
                  <div className="ui-rating ui-rating--hearts">
                    <span className="ui-rating__icon ui-rating__icon--filled">❤️</span>
                    <span className="ui-rating__icon ui-rating__icon--filled">❤️</span>
                    <span className="ui-rating__icon ui-rating__icon--filled">❤️</span>
                    <span className="ui-rating__icon ui-rating__icon--filled">❤️</span>
                    <span className="ui-rating__icon ui-rating__icon--empty">🤍</span>
                  </div>
                  <div className="ui-rating__text">4/5</div>
                </div>
                
                <div className="ui-rating-demo__icon-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Thumbs</h4>
                  <div className="ui-rating ui-rating--thumbs">
                    <span className="ui-rating__icon ui-rating__icon--filled">👍</span>
                    <span className="ui-rating__icon ui-rating__icon--filled">👍</span>
                    <span className="ui-rating__icon ui-rating__icon--filled">👍</span>
                    <span className="ui-rating__icon ui-rating__icon--empty">👎</span>
                  </div>
                  <div className="ui-rating__text">3/4</div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Rating
  value={4}
  maxValue={5}
  iconType="star"
  filledIcon="★"
  emptyIcon="☆"
/>

<Rating
  value={4}
  maxValue={5}
  iconType="heart"
  filledIcon="❤️"
  emptyIcon="🤍"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Rating avec texte descriptif</h3>
          <div className="demo-content">
            <p>Rating accompagné de descriptions textuelles :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-rating-demo">
                <div className="ui-rating ui-rating--with-labels">
                  <div className="ui-rating__stars">
                    {renderStars(4, 5, 'medium', false)}
                  </div>
                  <div className="ui-rating__labels">
                    <span className="ui-rating__label">Très bien</span>
                  </div>
                </div>
                
                <div className="ui-rating ui-rating--with-labels" style={{ marginTop: '1rem' }}>
                  <div className="ui-rating__stars">
                    {renderStars(2, 5, 'medium', false)}
                  </div>
                  <div className="ui-rating__labels">
                    <span className="ui-rating__label">Moyen</span>
                  </div>
                </div>
                
                <div className="ui-rating ui-rating--with-labels" style={{ marginTop: '1rem' }}>
                  <div className="ui-rating__stars">
                    {renderStars(5, 5, 'medium', false)}
                  </div>
                  <div className="ui-rating__labels">
                    <span className="ui-rating__label">Excellent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Rating
  value={4}
  maxValue={5}
  showLabels={true}
  labels={['Très mauvais', 'Mauvais', 'Moyen', 'Bien', 'Excellent']}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Rating avec statistiques</h3>
          <div className="demo-content">
            <p>Rating avec répartition des votes :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-rating-demo">
                <div className="ui-rating-stats">
                  <div className="ui-rating-stats__overview">
                    <div className="ui-rating-stats__average">
                      <div className="ui-rating-stats__score">4.2</div>
                      <div className="ui-rating-stats__stars">
                        {renderStars(4.2, 5, 'medium', false)}
                      </div>
                      <div className="ui-rating-stats__total">Basé sur 127 avis</div>
                    </div>
                  </div>
                  
                  <div className="ui-rating-stats__breakdown">
                    <div className="ui-rating-stats__row">
                      <span className="ui-rating-stats__label">5 étoiles</span>
                      <div className="ui-rating-stats__bar">
                        <div className="ui-rating-stats__bar-fill" style={{ width: '60%' }}></div>
                      </div>
                      <span className="ui-rating-stats__count">76</span>
                    </div>
                    
                    <div className="ui-rating-stats__row">
                      <span className="ui-rating-stats__label">4 étoiles</span>
                      <div className="ui-rating-stats__bar">
                        <div className="ui-rating-stats__bar-fill" style={{ width: '25%' }}></div>
                      </div>
                      <span className="ui-rating-stats__count">32</span>
                    </div>
                    
                    <div className="ui-rating-stats__row">
                      <span className="ui-rating-stats__label">3 étoiles</span>
                      <div className="ui-rating-stats__bar">
                        <div className="ui-rating-stats__bar-fill" style={{ width: '10%' }}></div>
                      </div>
                      <span className="ui-rating-stats__count">13</span>
                    </div>
                    
                    <div className="ui-rating-stats__row">
                      <span className="ui-rating-stats__label">2 étoiles</span>
                      <div className="ui-rating-stats__bar">
                        <div className="ui-rating-stats__bar-fill" style={{ width: '3%' }}></div>
                      </div>
                      <span className="ui-rating-stats__count">4</span>
                    </div>
                    
                    <div className="ui-rating-stats__row">
                      <span className="ui-rating-stats__label">1 étoile</span>
                      <div className="ui-rating-stats__bar">
                        <div className="ui-rating-stats__bar-fill" style={{ width: '2%' }}></div>
                      </div>
                      <span className="ui-rating-stats__count">2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { RatingStats } from '@equitech-dev/ui-library';

<RatingStats
  average={4.2}
  total={127}
  breakdown={{
    5: 76,
    4: 32,
    3: 13,
    2: 4,
    1: 2
  }}
  showChart={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant Rating :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>value</strong> : number (valeur actuelle)</li>
                <li><strong>maxValue</strong> : number (valeur maximale, défaut: 5)</li>
                <li><strong>size</strong> : "small" | "medium" | "large" | "xl"</li>
                <li><strong>readOnly</strong> : boolean (lecture seule)</li>
                <li><strong>allowHalf</strong> : boolean (notes demi-étoiles)</li>
                <li><strong>showText</strong> : boolean (afficher le texte)</li>
                <li><strong>showLabels</strong> : boolean (afficher les labels)</li>
                <li><strong>allowHover</strong> : boolean (prévisualisation au survol)</li>
              </ul>
              
              <h4>Props d'icônes :</h4>
              <ul>
                <li><strong>iconType</strong> : "star" | "heart" | "thumb" | "custom"</li>
                <li><strong>filledIcon</strong> : string (icône remplie)</li>
                <li><strong>emptyIcon</strong> : string (icône vide)</li>
                <li><strong>halfIcon</strong> : string (icône demi-remplie)</li>
              </ul>
              
              <h4>Props de personnalisation :</h4>
              <ul>
                <li><strong>labels</strong> : string[] (labels personnalisés)</li>
                <li><strong>colors</strong> : object (couleurs personnalisées)</li>
                <li><strong>className</strong> : string (classe CSS personnalisée)</li>
                <li><strong>style</strong> : object (styles inline personnalisés)</li>
              </ul>
              
              <h4>Variants spécialisés :</h4>
              <ul>
                <li><strong>RatingStats</strong> : Statistiques de notation</li>
                <li><strong>RatingGroup</strong> : Groupe de ratings</li>
                <li><strong>RatingInput</strong> : Input de notation</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onChange</strong> : (value: number) =&gt; void</li>
                <li><strong>onHover</strong> : (value: number) =&gt; void</li>
                <li><strong>onClick</strong> : (event: MouseEvent) =&gt; void</li>
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
                <h4>Évaluation de produits</h4>
                <p>Permettre aux utilisateurs de noter les produits qu'ils ont achetés.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Commentaires et avis</h4>
                <p>Afficher les notes moyennes des commentaires et avis utilisateurs.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Formulaires de satisfaction</h4>
                <p>Collecter des évaluations sur la qualité du service ou de l'expérience.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingPage;


