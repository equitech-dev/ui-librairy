import React, { useState } from 'react';

const ToggleSwitchPage: React.FC = () => {
  const [basicToggle, setBasicToggle] = useState(false);
  const [sizeToggle, setSizeToggle] = useState(false);
  const [colorToggle, setColorToggle] = useState(false);
  const [iconToggle, setIconToggle] = useState(false);
  const [labelToggle, setLabelToggle] = useState(false);
  const [disabledToggle, setDisabledToggle] = useState(false);
  const [loadingToggle, setLoadingToggle] = useState(false);
  const [customToggle, setCustomToggle] = useState(false);

  const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(prev => !prev);
  };

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Toggle Switch</h1>
        <p className="section-description">
          Composant de commutateur toggle avancé pour activer/désactiver des fonctionnalités. Offre une interface intuitive et moderne avec support des icônes, labels, états de chargement et personnalisation avancée.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Toggle Switch basique</h3>
          <div className="demo-content">
            <p>Toggle simple avec état on/off :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-toggle-demo">
                <div className="ui-toggle">
                  <input
                    type="checkbox"
                    id="basic-toggle"
                    checked={basicToggle}
                    onChange={() => handleToggle(setBasicToggle)}
                    className="ui-toggle__input"
                  />
                  <label htmlFor="basic-toggle" className="ui-toggle__label">
                    <span className="ui-toggle__track">
                      <span className="ui-toggle__thumb" />
                    </span>
                  </label>
                </div>
                
                <div className="ui-toggle__info">
                  <span>État : </span>
                  <span className={basicToggle ? 'ui-text--success' : 'ui-text--muted'}>
                    {basicToggle ? 'Activé' : 'Désactivé'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { ToggleSwitch } from '@equitech-dev/ui-library';

const [isEnabled, setIsEnabled] = useState(false);

<ToggleSwitch
  checked={isEnabled}
  onChange={setIsEnabled}
  id="basic-toggle"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Toggle Switch avec tailles</h3>
          <div className="demo-content">
            <p>Différentes tailles de toggle disponibles :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-toggle-demo ui-toggle-demo--sizes">
                <div className="ui-toggle-demo__size">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Small</h4>
                  <div className="ui-toggle ui-toggle--small">
                    <input
                      type="checkbox"
                      id="small-toggle"
                      checked={sizeToggle}
                      onChange={() => handleToggle(setSizeToggle)}
                      className="ui-toggle__input"
                    />
                    <label htmlFor="small-toggle" className="ui-toggle__label">
                      <span className="ui-toggle__track">
                        <span className="ui-toggle__thumb" />
                      </span>
                    </label>
                  </div>
                </div>
                
                <div className="ui-toggle-demo__size">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Medium (défaut)</h4>
                  <div className="ui-toggle">
                    <input
                      type="checkbox"
                      id="medium-toggle"
                      checked={sizeToggle}
                      onChange={() => handleToggle(setSizeToggle)}
                      className="ui-toggle__input"
                    />
                    <label htmlFor="medium-toggle" className="ui-toggle__label">
                      <span className="ui-toggle__track">
                        <span className="ui-toggle__thumb" />
                      </span>
                    </label>
                  </div>
                </div>
                
                <div className="ui-toggle-demo__size">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</h4>
                  <div className="ui-toggle ui-toggle--large">
                    <input
                      type="checkbox"
                      id="large-toggle"
                      checked={sizeToggle}
                      onChange={() => handleToggle(setSizeToggle)}
                      className="ui-toggle__input"
                    />
                    <label htmlFor="large-toggle" className="ui-toggle__label">
                      <span className="ui-toggle__track">
                        <span className="ui-toggle__thumb" />
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<ToggleSwitch size="small" checked={value} onChange={setValue} />
<ToggleSwitch size="medium" checked={value} onChange={setValue} />
<ToggleSwitch size="large" checked={value} onChange={setValue} />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Toggle Switch avec couleurs</h3>
          <div className="demo-content">
            <p>Différentes variantes de couleurs :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-toggle-demo ui-toggle-demo--colors">
                <div className="ui-toggle-demo__color">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Primary (défaut)</h4>
                  <div className="ui-toggle">
                    <input
                      type="checkbox"
                      id="primary-toggle"
                      checked={colorToggle}
                      onChange={() => handleToggle(setColorToggle)}
                      className="ui-toggle__input"
                    />
                    <label htmlFor="primary-toggle" className="ui-toggle__label">
                      <span className="ui-toggle__track">
                        <span className="ui-toggle__thumb" />
                      </span>
                    </label>
                  </div>
                </div>
                
                <div className="ui-toggle-demo__color">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Success</h4>
                  <div className="ui-toggle ui-toggle--success">
                    <input
                      type="checkbox"
                      id="success-toggle"
                      checked={colorToggle}
                      onChange={() => handleToggle(setColorToggle)}
                      className="ui-toggle__input"
                    />
                    <label htmlFor="success-toggle" className="ui-toggle__label">
                      <span className="ui-toggle__track">
                        <span className="ui-toggle__thumb" />
                      </span>
                    </label>
                  </div>
                </div>
                
                <div className="ui-toggle-demo__color">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Warning</h4>
                  <div className="ui-toggle ui-toggle--warning">
                    <input
                      type="checkbox"
                      id="warning-toggle"
                      checked={colorToggle}
                      onChange={() => handleToggle(setColorToggle)}
                      className="ui-toggle__input"
                    />
                    <label htmlFor="warning-toggle" className="ui-toggle__label">
                      <span className="ui-toggle__track">
                        <span className="ui-toggle__thumb" />
                      </span>
                    </label>
                  </div>
                </div>
                
                <div className="ui-toggle-demo__color">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Error</h4>
                  <div className="ui-toggle ui-toggle--error">
                    <input
                      type="checkbox"
                      id="error-toggle"
                      checked={colorToggle}
                      onChange={() => handleToggle(setColorToggle)}
                      className="ui-toggle__input"
                    />
                    <label htmlFor="error-toggle" className="ui-toggle__label">
                      <span className="ui-toggle__track">
                        <span className="ui-toggle__thumb" />
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<ToggleSwitch variant="primary" checked={value} onChange={setValue} />
<ToggleSwitch variant="success" checked={value} onChange={setValue} />
<ToggleSwitch variant="warning" checked={value} onChange={setValue} />
<ToggleSwitch variant="error" checked={value} onChange={setValue} />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Toggle Switch avec icônes</h3>
          <div className="demo-content">
            <p>Toggle avec icônes pour améliorer la compréhension :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-toggle-demo ui-toggle-demo--icons">
                <div className="ui-toggle-demo__icon">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Icônes on/off</h4>
                  <div className="ui-toggle ui-toggle--with-icons">
                    <input
                      type="checkbox"
                      id="icon-toggle"
                      checked={iconToggle}
                      onChange={() => handleToggle(setIconToggle)}
                      className="ui-toggle__input"
                    />
                    <label htmlFor="icon-toggle" className="ui-toggle__label">
                      <span className="ui-toggle__track">
                        <span className="ui-toggle__thumb">
                          <span className="ui-toggle__icon ui-toggle__icon--off">🔴</span>
                          <span className="ui-toggle__icon ui-toggle__icon--on">🟢</span>
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                
                <div className="ui-toggle-demo__icon">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Icônes personnalisées</h4>
                  <div className="ui-toggle ui-toggle--with-icons">
                    <input
                      type="checkbox"
                      id="custom-icon-toggle"
                      checked={iconToggle}
                      onChange={() => handleToggle(setIconToggle)}
                      className="ui-toggle__input"
                    />
                    <label htmlFor="custom-icon-toggle" className="ui-toggle__label">
                      <span className="ui-toggle__track">
                        <span className="ui-toggle__thumb">
                          <span className="ui-toggle__icon ui-toggle__icon--off">🌙</span>
                          <span className="ui-toggle__icon ui-toggle__icon--on">☀️</span>
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<ToggleSwitch
  checked={value}
  onChange={setValue}
  showIcons={true}
  iconOff="🔴"
  iconOn="🟢"
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Toggle Switch avec labels</h3>
          <div className="demo-content">
            <p>Toggle avec labels descriptifs :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-toggle-demo ui-toggle-demo--labels">
                <div className="ui-toggle-demo__label">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Label simple</h4>
                  <div className="ui-toggle ui-toggle--with-label">
                    <input
                      type="checkbox"
                      id="label-toggle"
                      checked={labelToggle}
                      onChange={() => handleToggle(setLabelToggle)}
                      className="ui-toggle__input"
                    />
                    <label htmlFor="label-toggle" className="ui-toggle__label">
                      <span className="ui-toggle__track">
                        <span className="ui-toggle__thumb" />
                      </span>
                      <span className="ui-toggle__text">Notifications</span>
                    </label>
                  </div>
                </div>
                
                <div className="ui-toggle-demo__label">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Label avec description</h4>
                  <div className="ui-toggle ui-toggle--with-description">
                    <div className="ui-toggle__content">
                      <input
                        type="checkbox"
                        id="description-toggle"
                        checked={labelToggle}
                        onChange={() => handleToggle(setLabelToggle)}
                        className="ui-toggle__input"
                      />
                      <label htmlFor="description-toggle" className="ui-toggle__label">
                        <span className="ui-toggle__track">
                          <span className="ui-toggle__thumb" />
                        </span>
                      </label>
                    </div>
                    <div className="ui-toggle__info">
                      <span className="ui-toggle__title">Mode sombre</span>
                      <span className="ui-toggle__description">Activer le thème sombre de l'interface</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<ToggleSwitch
  checked={value}
  onChange={setValue}
  label="Notifications"
  description="Recevoir les notifications push"
  showLabel={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Toggle Switch avec états</h3>
          <div className="demo-content">
            <p>Différents états du toggle :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-toggle-demo ui-toggle-demo--states">
                <div className="ui-toggle-demo__state">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Normal</h4>
                  <div className="ui-toggle">
                    <input
                      type="checkbox"
                      id="normal-toggle"
                      checked={basicToggle}
                      onChange={() => handleToggle(setBasicToggle)}
                      className="ui-toggle__input"
                    />
                    <label htmlFor="normal-toggle" className="ui-toggle__label">
                      <span className="ui-toggle__track">
                        <span className="ui-toggle__thumb" />
                      </span>
                    </label>
                  </div>
                </div>
                
                <div className="ui-toggle-demo__state">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Désactivé</h4>
                  <div className="ui-toggle ui-toggle--disabled">
                    <input
                      type="checkbox"
                      id="disabled-toggle"
                      checked={disabledToggle}
                      disabled
                      className="ui-toggle__input"
                    />
                    <label htmlFor="disabled-toggle" className="ui-toggle__label">
                      <span className="ui-toggle__track">
                        <span className="ui-toggle__thumb" />
                      </span>
                    </label>
                  </div>
                </div>
                
                <div className="ui-toggle-demo__state">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Chargement</h4>
                  <div className="ui-toggle ui-toggle--loading">
                    <input
                      type="checkbox"
                      id="loading-toggle"
                      checked={loadingToggle}
                      disabled
                      className="ui-toggle__input"
                    />
                    <label htmlFor="loading-toggle" className="ui-toggle__label">
                      <span className="ui-toggle__track">
                        <span className="ui-toggle__thumb">
                          <span className="ui-toggle__spinner" />
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<ToggleSwitch
  checked={value}
  onChange={setValue}
  disabled={isDisabled}
  loading={isLoading}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Toggle Switch personnalisé</h3>
          <div className="demo-content">
            <p>Toggle avec personnalisation avancée :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-toggle-demo ui-toggle-demo--custom">
                <div className="ui-toggle-demo__custom">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Style personnalisé</h4>
                  <div className="ui-toggle ui-toggle--custom">
                    <input
                      type="checkbox"
                      id="custom-toggle"
                      checked={customToggle}
                      onChange={() => handleToggle(setCustomToggle)}
                      className="ui-toggle__input"
                    />
                    <label htmlFor="custom-toggle" className="ui-toggle__label">
                      <span className="ui-toggle__track">
                        <span className="ui-toggle__thumb" />
                      </span>
                    </label>
                  </div>
                </div>
                
                <div className="ui-toggle-demo__custom">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Animation personnalisée</h4>
                  <div className="ui-toggle ui-toggle--animated">
                    <input
                      type="checkbox"
                      id="animated-toggle"
                      checked={customToggle}
                      onChange={() => handleToggle(setCustomToggle)}
                      className="ui-toggle__input"
                    />
                    <label htmlFor="animated-toggle" className="ui-toggle__label">
                      <span className="ui-toggle__track">
                        <span className="ui-toggle__thumb" />
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<ToggleSwitch
  checked={value}
  onChange={setValue}
  className="custom-toggle"
  style={{
    '--toggle-color': '#ff6b6b',
    '--toggle-size': '2rem'
  }}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Toggle Switch en contexte</h3>
          <div className="demo-content">
            <p>Exemples d'utilisation dans des contextes réels :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-toggle-demo ui-toggle-demo--context">
                <div className="ui-toggle-context">
                  <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Paramètres de notification</h4>
                  
                  <div className="ui-toggle-item">
                    <div className="ui-toggle ui-toggle--with-label">
                      <input
                        type="checkbox"
                        id="email-notifications"
                        checked={basicToggle}
                        onChange={() => handleToggle(setBasicToggle)}
                        className="ui-toggle__input"
                      />
                      <label htmlFor="email-notifications" className="ui-toggle__label">
                        <span className="ui-toggle__track">
                          <span className="ui-toggle__thumb" />
                        </span>
                        <span className="ui-toggle__text">Notifications par email</span>
                      </label>
                    </div>
                    <span className="ui-toggle__description">Recevoir les notifications importantes par email</span>
                  </div>
                  
                  <div className="ui-toggle-item">
                    <div className="ui-toggle ui-toggle--with-label">
                      <input
                        type="checkbox"
                        id="push-notifications"
                        checked={sizeToggle}
                        onChange={() => handleToggle(setSizeToggle)}
                        className="ui-toggle__input"
                      />
                      <label htmlFor="push-notifications" className="ui-toggle__label">
                        <span className="ui-toggle__track">
                          <span className="ui-toggle__thumb" />
                        </span>
                        <span className="ui-toggle__text">Notifications push</span>
                      </label>
                    </div>
                    <span className="ui-toggle__description">Notifications instantanées sur votre appareil</span>
                  </div>
                  
                  <div className="ui-toggle-item">
                    <div className="ui-toggle ui-toggle--with-label">
                      <input
                        type="checkbox"
                        id="sms-notifications"
                        checked={colorToggle}
                        onChange={() => handleToggle(setColorToggle)}
                        className="ui-toggle__input"
                      />
                      <label htmlFor="sms-notifications" className="ui-toggle__label">
                        <span className="ui-toggle__track">
                          <span className="ui-toggle__thumb" />
                        </span>
                        <span className="ui-toggle__text">Notifications SMS</span>
                      </label>
                    </div>
                    <span className="ui-toggle__description">Notifications par SMS (frais supplémentaires)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<NotificationSettings>
  <ToggleSwitch
    label="Notifications par email"
    description="Recevoir les notifications importantes par email"
    checked={emailEnabled}
    onChange={setEmailEnabled}
  />
  <ToggleSwitch
    label="Notifications push"
    description="Notifications instantanées sur votre appareil"
    checked={pushEnabled}
    onChange={setPushEnabled}
  />
</NotificationSettings>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant ToggleSwitch :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>checked</strong> : boolean (état activé/désactivé)</li>
                <li><strong>onChange</strong> : (checked: boolean) =&gt; void (callback de changement)</li>
                <li><strong>id</strong> : string (identifiant unique)</li>
                <li><strong>name</strong> : string (nom du champ)</li>
                <li><strong>value</strong> : string (valeur du champ)</li>
              </ul>
              
              <h4>Props de personnalisation :</h4>
              <ul>
                <li><strong>size</strong> : "small" | "medium" | "large"</li>
                <li><strong>variant</strong> : "primary" | "success" | "warning" | "error"</li>
                <li><strong>label</strong> : string (texte du label)</li>
                <li><strong>description</strong> : string (description détaillée)</li>
                <li><strong>showLabel</strong> : boolean (afficher le label)</li>
                <li><strong>showIcons</strong> : boolean (afficher les icônes)</li>
                <li><strong>iconOff</strong> : string (icône pour l'état désactivé)</li>
                <li><strong>iconOn</strong> : string (icône pour l'état activé)</li>
              </ul>
              
              <h4>Props d'état :</h4>
              <ul>
                <li><strong>disabled</strong> : boolean (désactivation du toggle)</li>
                <li><strong>loading</strong> : boolean (état de chargement)</li>
                <li><strong>readOnly</strong> : boolean (lecture seule)</li>
                <li><strong>required</strong> : boolean (champ requis)</li>
              </ul>
              
              <h4>Props de style :</h4>
              <ul>
                <li><strong>className</strong> : string (classe CSS personnalisée)</li>
                <li><strong>style</strong> : object (styles inline personnalisés)</li>
                <li><strong>trackColor</strong> : string (couleur de la piste)</li>
                <li><strong>thumbColor</strong> : string (couleur du curseur)</li>
                <li><strong>activeColor</strong> : string (couleur active)</li>
              </ul>
              
              <h4>Variants spécialisés :</h4>
              <ul>
                <li><strong>IconToggleSwitch</strong> : Toggle avec icônes</li>
                <li><strong>LabeledToggleSwitch</strong> : Toggle avec labels</li>
                <li><strong>AnimatedToggleSwitch</strong> : Toggle avec animations</li>
                <li><strong>CustomToggleSwitch</strong> : Toggle personnalisable</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onFocus</strong> : (e: FocusEvent) =&gt; void</li>
                <li><strong>onBlur</strong> : (e: FocusEvent) =&gt; void</li>
                <li><strong>onKeyDown</strong> : (e: KeyboardEvent) =&gt; void</li>
                <li><strong>onMouseEnter</strong> : (e: MouseEvent) =&gt; void</li>
                <li><strong>onMouseLeave</strong> : (e: MouseEvent) =&gt; void</li>
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
                <h4>Paramètres utilisateur</h4>
                <p>Activation/désactivation de fonctionnalités et préférences.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Notifications</h4>
                <p>Gestion des préférences de notification par canal.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Thèmes et apparences</h4>
                <p>Basculement entre différents modes d'affichage.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToggleSwitchPage;


