import React, { useState, useRef, useEffect } from 'react';

interface PopoverPosition {
  x: number;
  y: number;
}

const PopoverPage: React.FC = () => {
  const [showPopover, setShowPopover] = useState<string | null>(null);
  const [popoverPosition, setPopoverPosition] = useState<PopoverPosition>({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [showContextMenu, setShowContextMenu] = useState<string | null>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState<PopoverPosition>({ x: 0, y: 0 });

  const handlePopoverToggle = (popoverId: string) => {
    setShowPopover(showPopover === popoverId ? null : popoverId);
  };

  const handleTooltipShow = (tooltipId: string) => {
    setShowTooltip(tooltipId);
  };

  const handleTooltipHide = () => {
    setShowTooltip(null);
  };

  const handleContextMenu = (event: React.MouseEvent, menuId: string) => {
    event.preventDefault();
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
    setShowContextMenu(menuId);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (showPopover) {
      setShowPopover(null);
    }
    if (showContextMenu) {
      setShowContextMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showPopover, showContextMenu]);

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Popover</h1>
        <p className="section-description">
          Composant de popover pour afficher des informations contextuelles, des menus ou des contenus supplémentaires. Permet d'enrichir l'interface sans encombrer l'espace principal.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Popover basique</h3>
          <div className="demo-content">
            <p>Popover simple avec déclenchement au clic :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-popover-demo">
                <button
                  className="ui-button ui-button--primary"
                  onClick={() => handlePopoverToggle('basic')}
                >
                  Cliquez pour ouvrir
                </button>
                
                {showPopover === 'basic' && (
                  <div className="ui-popover ui-popover--basic" style={{ position: 'absolute', top: '100%', left: '0', marginTop: '0.5rem' }}>
                    <div className="ui-popover-content">
                      <h4 className="ui-popover-header">Informations</h4>
                      <p className="ui-popover-body">
                        Ceci est un exemple de popover basique avec du contenu simple.
                      </p>
                      <div className="ui-popover-footer">
                        <button className="ui-button ui-button--small ui-button--outline">
                          Action 1
                        </button>
                        <button className="ui-button ui-button--small ui-button--primary">
                          Action 2
                        </button>
                      </div>
                    </div>
                    <div className="ui-popover-arrow" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { Popover } from '@equitech-dev/ui-library';

const [showPopover, setShowPopover] = useState(false);

<Popover
  isOpen={showPopover}
  onToggle={setShowPopover}
  trigger="click"
  content="Contenu du popover"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Popover avec positions</h3>
          <div className="demo-content">
            <p>Popover avec différentes positions d'affichage :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-popover-demo ui-popover-demo--positions">
                <div className="ui-popover-demo__grid">
                  <div className="ui-popover-demo__position">
                    <button
                      className="ui-button ui-button--outline"
                      onClick={() => handlePopoverToggle('top')}
                    >
                      Top
                    </button>
                    
                    {showPopover === 'top' && (
                      <div className="ui-popover ui-popover--top" style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '0.5rem' }}>
                        <div className="ui-popover-content">
                          <p>Popover au-dessus du bouton</p>
                        </div>
                        <div className="ui-popover-arrow ui-popover-arrow--bottom" />
                      </div>
                    )}
                  </div>
                  
                  <div className="ui-popover-demo__position">
                    <button
                      className="ui-button ui-button--outline"
                      onClick={() => handlePopoverToggle('right')}
                    >
                      Right
                    </button>
                    
                    {showPopover === 'right' && (
                      <div className="ui-popover ui-popover--right" style={{ position: 'absolute', top: '50%', left: '100%', transform: 'translateY(-50%)', marginLeft: '0.5rem' }}>
                        <div className="ui-popover-content">
                          <p>Popover à droite du bouton</p>
                        </div>
                        <div className="ui-popover-arrow ui-popover-arrow--left" />
                      </div>
                    )}
                  </div>
                  
                  <div className="ui-popover-demo__position">
                    <button
                      className="ui-button ui-button--outline"
                      onClick={() => handlePopoverToggle('bottom')}
                    >
                      Bottom
                    </button>
                    
                    {showPopover === 'bottom' && (
                      <div className="ui-popover ui-popover--bottom" style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '0.5rem' }}>
                        <div className="ui-popover-content">
                          <p>Popover en dessous du bouton</p>
                        </div>
                        <div className="ui-popover-arrow ui-popover-arrow--top" />
                      </div>
                    )}
                  </div>
                  
                  <div className="ui-popover-demo__position">
                    <button
                      className="ui-button ui-button--outline"
                      onClick={() => handlePopoverToggle('left')}
                    >
                      Left
                    </button>
                    
                    {showPopover === 'left' && (
                      <div className="ui-popover ui-popover--left" style={{ position: 'absolute', top: '50%', right: '100%', transform: 'translateY(-50%)', marginRight: '0.5rem' }}>
                        <div className="ui-popover-content">
                          <p>Popover à gauche du bouton</p>
                        </div>
                        <div className="ui-popover-arrow ui-popover-arrow--right" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Popover
  isOpen={showPopover}
  onToggle={setShowPopover}
  position="top"
  trigger="click"
  content="Contenu du popover"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Tooltip</h3>
          <div className="demo-content">
            <p>Tooltip simple avec déclenchement au survol :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-tooltip-demo">
                <button
                  className="ui-button ui-button--info"
                  onMouseEnter={() => handleTooltipShow('info')}
                  onMouseLeave={handleTooltipHide}
                >
                  Survolez-moi
                </button>
                
                {showTooltip === 'info' && (
                  <div className="ui-tooltip ui-tooltip--top" style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '0.5rem' }}>
                    <div className="ui-tooltip__content">
                      Ceci est un tooltip informatif
                    </div>
                    <div className="ui-tooltip__arrow" />
                  </div>
                )}
              </div>
              
              <div className="ui-tooltip-demo" style={{ marginTop: '1rem' }}>
                <button
                  className="ui-button ui-button--warning"
                  onMouseEnter={() => handleTooltipShow('warning')}
                  onMouseLeave={handleTooltipHide}
                >
                  Attention
                </button>
                
                {showTooltip === 'warning' && (
                  <div className="ui-tooltip ui-tooltip--warning ui-tooltip--bottom" style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '0.5rem' }}>
                    <div className="ui-tooltip__content">
                      ⚠️ Action importante à confirmer
                    </div>
                    <div className="ui-tooltip__arrow" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Popover
  isOpen={showTooltip}
  onToggle={setShowTooltip}
  trigger="hover"
  variant="tooltip"
  position="top"
  content="Contenu du tooltip"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Popover avec contenu riche</h3>
          <div className="demo-content">
            <p>Popover avec du contenu structuré et des actions :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-popover-demo">
                <button
                  className="ui-button ui-button--success"
                  onClick={() => handlePopoverToggle('rich')}
                >
                  Profil utilisateur
                </button>
                
                {showPopover === 'rich' && (
                  <div className="ui-popover ui-popover--rich" style={{ position: 'absolute', top: '100%', left: '0', marginTop: '0.5rem', minWidth: '300px' }}>
                    <div className="ui-popover-content">
                      <div className="ui-popover-header">
                        <div className="ui-popover-avatar">
                          <img src="https://via.placeholder.com/40x40" alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                        </div>
                        <div className="ui-popover-user-info">
                          <h4 className="ui-popover-user-name">Jean Dupont</h4>
                          <p className="ui-popover-user-email">jean.dupont@equitech.fr</p>
                          <span className="ui-popover-user-status ui-popover-user-status--online">En ligne</span>
                        </div>
                      </div>
                      
                      <div className="ui-popover-body">
                        <div className="ui-popover-section">
                          <h5>Rôle</h5>
                          <p>Développeur Frontend Senior</p>
                        </div>
                        
                        <div className="ui-popover-section">
                          <h5>Dernière connexion</h5>
                          <p>Il y a 2 heures</p>
                        </div>
                      </div>
                      
                      <div className="ui-popover-footer">
                        <button className="ui-button ui-button--small ui-button--outline">
                          Voir le profil
                        </button>
                        <button className="ui-button ui-button--small ui-button--primary">
                          Envoyer un message
                        </button>
                      </div>
                    </div>
                    <div className="ui-popover-arrow" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Popover
  isOpen={showPopover}
  onToggle={setShowPopover}
  trigger="click"
  content={
    <div>
      <h4>Profil utilisateur</h4>
      <p>Informations détaillées...</p>
      <button>Action</button>
    </div>
  }
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Menu contextuel</h3>
          <div className="demo-content">
            <p>Menu contextuel avec déclenchement au clic droit :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-context-menu-demo">
                <div
                  className="ui-context-menu-trigger"
                  style={{
                    padding: '2rem',
                    border: '2px dashed var(--ui-border-color)',
                    borderRadius: '8px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                  onContextMenu={(e) => handleContextMenu(e, 'main')}
                >
                  Clic droit ici pour ouvrir le menu contextuel
                </div>
                
                {showContextMenu === 'main' && (
                  <div 
                    className="ui-context-menu"
                    style={{
                      position: 'fixed',
                      top: contextMenuPosition.y,
                      left: contextMenuPosition.x,
                      zIndex: 1000
                    }}
                  >
                    <div className="ui-context-menu__content">
                      <button className="ui-context-menu__item">
                        <span className="ui-context-menu__icon">👁️</span>
                        <span className="ui-context-menu__text">Voir</span>
                      </button>
                      <button className="ui-context-menu__item">
                        <span className="ui-context-menu__icon">✏️</span>
                        <span className="ui-context-menu__text">Modifier</span>
                      </button>
                      <button className="ui-context-menu__item">
                        <span className="ui-context-menu__icon">📋</span>
                        <span className="ui-context-menu__text">Copier</span>
                      </button>
                      <div className="ui-context-menu__separator" />
                      <button className="ui-context-menu__item ui-context-menu__item--danger">
                        <span className="ui-context-menu__icon">🗑️</span>
                        <span className="ui-context-menu__text">Supprimer</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Popover
  isOpen={showContextMenu}
  onToggle={setShowContextMenu}
  trigger="contextmenu"
  variant="context-menu"
  position="auto"
  content={contextMenuContent}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Popover avec déclencheurs multiples</h3>
          <div className="demo-content">
            <p>Différents types de déclencheurs pour les popovers :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-popover-demo ui-popover-demo--triggers">
                <div className="ui-popover-demo__trigger-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Clic</h4>
                  <button
                    className="ui-button ui-button--outline"
                    onClick={() => handlePopoverToggle('click')}
                  >
                    Clic pour ouvrir
                  </button>
                  
                  {showPopover === 'click' && (
                    <div className="ui-popover ui-popover--click" style={{ position: 'absolute', top: '100%', left: '0', marginTop: '0.5rem' }}>
                      <div className="ui-popover-content">
                        <p>Popover déclenché par clic</p>
                      </div>
                      <div className="ui-popover-arrow" />
                    </div>
                  )}
                </div>
                
                <div className="ui-popover-demo__trigger-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Survol</h4>
                  <button
                    className="ui-button ui-button--outline"
                    onMouseEnter={() => handlePopoverToggle('hover')}
                    onMouseLeave={() => setShowPopover(null)}
                  >
                    Survolez-moi
                  </button>
                  
                  {showPopover === 'hover' && (
                    <div className="ui-popover ui-popover--hover" style={{ position: 'absolute', top: '100%', left: '0', marginTop: '0.5rem' }}>
                      <div className="ui-popover-content">
                        <p>Popover déclenché par survol</p>
                      </div>
                      <div className="ui-popover-arrow" />
                    </div>
                  )}
                </div>
                
                <div className="ui-popover-demo__trigger-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Focus</h4>
                  <button
                    className="ui-button ui-button--outline"
                    onFocus={() => handlePopoverToggle('focus')}
                    onBlur={() => setShowPopover(null)}
                  >
                    Focus sur moi
                  </button>
                  
                  {showPopover === 'focus' && (
                    <div className="ui-popover ui-popover--focus" style={{ position: 'absolute', top: '100%', left: '0', marginTop: '0.5rem' }}>
                      <div className="ui-popover-content">
                        <p>Popover déclenché par focus</p>
                      </div>
                      <div className="ui-popover-arrow" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Popover trigger="click" content="Contenu" />
<Popover trigger="hover" content="Contenu" />
<Popover trigger="focus" content="Contenu" />
<Popover trigger="manual" isOpen={isOpen} content="Contenu" />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Popover avec tailles</h3>
          <div className="demo-content">
            <p>Différentes tailles de popover selon le contexte :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-popover-demo ui-popover-demo--sizes">
                <div className="ui-popover-demo__size-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Small</h4>
                  <button
                    className="ui-button ui-button--small ui-button--outline"
                    onClick={() => handlePopoverToggle('small')}
                  >
                    Small
                  </button>
                  
                  {showPopover === 'small' && (
                    <div className="ui-popover ui-popover--small" style={{ position: 'absolute', top: '100%', left: '0', marginTop: '0.5rem' }}>
                      <div className="ui-popover-content">
                        <p>Popover de petite taille</p>
                      </div>
                      <div className="ui-popover-arrow" />
                    </div>
                  )}
                </div>
                
                <div className="ui-popover-demo__size-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Medium (défaut)</h4>
                  <button
                    className="ui-button ui-button--outline"
                    onClick={() => handlePopoverToggle('medium')}
                  >
                    Medium
                  </button>
                  
                  {showPopover === 'medium' && (
                    <div className="ui-popover" style={{ position: 'absolute', top: '100%', left: '0', marginTop: '0.5rem' }}>
                      <div className="ui-popover-content">
                        <p>Popover de taille moyenne</p>
                      </div>
                      <div className="ui-popover-arrow" />
                    </div>
                  )}
                </div>
                
                <div className="ui-popover-demo__size-group">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</h4>
                  <button
                    className="ui-button ui-button--large ui-button--outline"
                    onClick={() => handlePopoverToggle('large')}
                  >
                    Large
                  </button>
                  
                  {showPopover === 'large' && (
                    <div className="ui-popover ui-popover--large" style={{ position: 'absolute', top: '100%', left: '0', marginTop: '0.5rem' }}>
                      <div className="ui-popover-content">
                        <p>Popover de grande taille</p>
                      </div>
                      <div className="ui-popover-arrow" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Popover size="small" content="Contenu" />
<Popover size="medium" content="Contenu" />
<Popover size="large" content="Contenu" />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant Popover :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>isOpen</strong> : boolean (état d'ouverture du popover)</li>
                <li><strong>onToggle</strong> : function (callback de changement d'état)</li>
                <li><strong>trigger</strong> : "click" | "hover" | "focus" | "manual"</li>
                <li><strong>position</strong> : "top" | "right" | "bottom" | "left" | "auto"</li>
                <li><strong>variant</strong> : "default" | "tooltip" | "context-menu"</li>
                <li><strong>size</strong> : "small" | "medium" | "large"</li>
                <li><strong>content</strong> : ReactNode | string (contenu du popover)</li>
                <li><strong>title</strong> : string (titre du popover)</li>
                <li><strong>arrow</strong> : boolean (afficher la flèche)</li>
                <li><strong>offset</strong> : number (décalage par rapport au déclencheur)</li>
                <li><strong>delay</strong> : number (délai pour les déclencheurs hover/focus)</li>
                <li><strong>disabled</strong> : boolean (désactiver le popover)</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onToggle</strong> : (isOpen: boolean) =&gt; void</li>
                <li><strong>onShow</strong> : () =&gt; void</li>
                <li><strong>onHide</strong> : () =&gt; void</li>
                <li><strong>onPositionChange</strong> : (position: string) =&gt; void</li>
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
                <h4>Informations contextuelles</h4>
                <p>Afficher des détails supplémentaires sans encombrer l'interface.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Menus d'actions</h4>
                <p>Proposer des actions contextuelles pour les éléments de l'interface.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Formulaires d'aide</h4>
                <p>Fournir de l'aide et des explications pour les champs de formulaire.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopoverPage;


