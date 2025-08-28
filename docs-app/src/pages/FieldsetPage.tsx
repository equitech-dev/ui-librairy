import React, { useState } from 'react';

const FieldsetPage: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const [addressInfo, setAddressInfo] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: 'France'
  });

  const [preferences, setPreferences] = useState({
    newsletter: false,
    notifications: false,
    marketing: false
  });

  const handlePersonalChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setAddressInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: boolean) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Fieldset</h1>
        <p className="section-description">
          Composant de groupement de champs avec légende et organisation logique. 
          Permet de structurer les formulaires en sections cohérentes et améliore l'accessibilité.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Fieldset basique</h3>
          <div className="demo-content">
            <p>Groupement simple de champs avec une légende :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-fieldset-demo">
                <fieldset className="ui-fieldset">
                  <legend className="ui-fieldset__legend">
                    Informations personnelles
                  </legend>
                  
                  <div className="ui-fieldset__content">
                    <div className="ui-fieldset__row">
                      <div className="ui-fieldset__field">
                        <label htmlFor="basic-firstName" className="ui-fieldset__label">
                          Prénom
                        </label>
                        <input
                          type="text"
                          id="basic-firstName"
                          value={personalInfo.firstName}
                          onChange={(e) => handlePersonalChange('firstName', e.target.value)}
                          className="ui-fieldset__input"
                          placeholder="Votre prénom"
                        />
                      </div>
                      
                      <div className="ui-fieldset__field">
                        <label htmlFor="basic-lastName" className="ui-fieldset__label">
                          Nom
                        </label>
                        <input
                          type="text"
                          id="basic-lastName"
                          value={personalInfo.lastName}
                          onChange={(e) => handlePersonalChange('lastName', e.target.value)}
                          className="ui-fieldset__input"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>
                    
                    <div className="ui-fieldset__field">
                      <label htmlFor="basic-email" className="ui-fieldset__label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="basic-email"
                        value={personalInfo.email}
                        onChange={(e) => handlePersonalChange('email', e.target.value)}
                        className="ui-fieldset__input"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { Fieldset, FieldsetField, FieldsetRow } from '@equitech-dev/ui-library';
         
<Fieldset legend="Informations personnelles">
  <FieldsetRow>
    <FieldsetField label="Prénom">
      <input type="text" />
    </FieldsetField>
    <FieldsetField label="Nom">
      <input type="text" />
    </FieldsetField>
  </FieldsetRow>
  
  <FieldsetField label="Email">
    <input type="email" />
  </FieldsetField>
</Fieldset>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Fieldset avec description</h3>
          <div className="demo-content">
            <p>Fieldset avec description détaillée et aide contextuelle :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-fieldset-demo">
                <fieldset className="ui-fieldset">
                  <legend className="ui-fieldset__legend">
                    Adresse de livraison
                  </legend>
                  
                  <div className="ui-fieldset__description">
                    Ces informations seront utilisées pour la livraison de vos commandes. 
                    Assurez-vous qu'elles sont exactes et à jour.
                  </div>
                  
                  <div className="ui-fieldset__content">
                    <div className="ui-fieldset__field">
                      <label htmlFor="address-street" className="ui-fieldset__label">
                        Rue et numéro
                      </label>
                      <input
                        type="text"
                        id="address-street"
                        value={addressInfo.street}
                        onChange={(e) => handleAddressChange('street', e.target.value)}
                        className="ui-fieldset__input"
                        placeholder="123 Rue de la Paix"
                      />
                    </div>
                    
                    <div className="ui-fieldset__row">
                      <div className="ui-fieldset__field">
                        <label htmlFor="address-city" className="ui-fieldset__label">
                          Ville
                        </label>
                        <input
                          type="text"
                          id="address-city"
                          value={addressInfo.city}
                          onChange={(e) => handleAddressChange('city', e.target.value)}
                          className="ui-fieldset__input"
                          placeholder="Paris"
                        />
                      </div>
                      
                      <div className="ui-fieldset__field">
                        <label htmlFor="address-postalCode" className="ui-fieldset__label">
                          Code postal
                        </label>
                        <input
                          type="text"
                          id="address-postalCode"
                          value={addressInfo.postalCode}
                          onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                          className="ui-fieldset__input"
                          placeholder="75001"
                        />
                      </div>
                    </div>
                    
                    <div className="ui-fieldset__field">
                      <label htmlFor="address-country" className="ui-fieldset__label">
                        Pays
                      </label>
                      <select
                        id="address-country"
                        value={addressInfo.country}
                        onChange={(e) => handleAddressChange('country', e.target.value)}
                        className="ui-fieldset__select"
                      >
                        <option value="France">France</option>
                        <option value="Belgique">Belgique</option>
                        <option value="Suisse">Suisse</option>
                        <option value="Canada">Canada</option>
                      </select>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Fieldset 
  legend="Adresse de livraison"
  description="Ces informations seront utilisées pour la livraison de vos commandes."
>
  <FieldsetField label="Rue et numéro">
    <input type="text" />
  </FieldsetField>
  
  <FieldsetRow>
    <FieldsetField label="Ville">
      <input type="text" />
    </FieldsetField>
    <FieldsetField label="Code postal">
      <input type="text" />
    </FieldsetField>
  </FieldsetRow>
</Fieldset>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Fieldset avec icône et badge</h3>
          <div className="demo-content">
            <p>Fieldset avec icône, badge de statut et indicateurs visuels :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-fieldset-demo">
                <fieldset className="ui-fieldset ui-fieldset--with-icon">
                  <legend className="ui-fieldset__legend">
                    <span className="ui-fieldset__icon">🔒</span>
                    Sécurité du compte
                    <span className="ui-fieldset__badge ui-fieldset__badge--success">
                      Sécurisé
                    </span>
                  </legend>
                  
                  <div className="ui-fieldset__content">
                    <div className="ui-fieldset__field">
                      <label htmlFor="security-password" className="ui-fieldset__label">
                        Mot de passe actuel
                      </label>
                      <input
                        type="password"
                        id="security-password"
                        className="ui-fieldset__input"
                        placeholder="Votre mot de passe actuel"
                      />
                      <div className="ui-fieldset__help">
                        Entrez votre mot de passe actuel pour confirmer les modifications
                      </div>
                    </div>
                    
                    <div className="ui-fieldset__row">
                      <div className="ui-fieldset__field">
                        <label htmlFor="security-newPassword" className="ui-fieldset__label">
                          Nouveau mot de passe
                        </label>
                        <input
                          type="password"
                          id="security-newPassword"
                          className="ui-fieldset__input"
                          placeholder="Nouveau mot de passe"
                        />
                      </div>
                      
                      <div className="ui-fieldset__field">
                        <label htmlFor="security-confirmPassword" className="ui-fieldset__label">
                          Confirmer le mot de passe
                        </label>
                        <input
                          type="password"
                          id="security-confirmPassword"
                          className="ui-fieldset__input"
                          placeholder="Confirmez le nouveau mot de passe"
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Fieldset 
  legend="Sécurité du compte"
  icon="🔒"
  badge={{ text: "Sécurisé", variant: "success" }}
  showIcon={true}
>
  <FieldsetField 
    label="Mot de passe actuel"
    helpText="Entrez votre mot de passe actuel pour confirmer les modifications"
  >
    <input type="password" />
  </FieldsetField>
</Fieldset>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Fieldset avec validation</h3>
          <div className="demo-content">
            <p>Fieldset avec validation et gestion des erreurs :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-fieldset-demo">
                <fieldset className="ui-fieldset ui-fieldset--validation">
                  <legend className="ui-fieldset__legend">
                    Informations de facturation
                    <span className="ui-fieldset__required-indicator">* Champs requis</span>
                  </legend>
                  
                  <div className="ui-fieldset__content">
                    <div className="ui-fieldset__field">
                      <label htmlFor="billing-company" className="ui-fieldset__label">
                        Nom de l'entreprise <span className="ui-fieldset__required">*</span>
                      </label>
                      <input
                        type="text"
                        id="billing-company"
                        className="ui-fieldset__input ui-fieldset__input--error"
                        placeholder="Nom de votre entreprise"
                        value=""
                        readOnly
                      />
                      <div className="ui-fieldset__error">
                        ⚠️ Le nom de l'entreprise est requis pour la facturation
                      </div>
                    </div>
                    
                    <div className="ui-fieldset__row">
                      <div className="ui-fieldset__field">
                        <label htmlFor="billing-siret" className="ui-fieldset__label">
                          Numéro SIRET <span className="ui-fieldset__required">*</span>
                        </label>
                        <input
                          type="text"
                          id="billing-siret"
                          className="ui-fieldset__input"
                          placeholder="123 456 789 00012"
                        />
                        <div className="ui-fieldset__help">
                          Format : 14 chiffres (ex: 123 456 789 00012)
                        </div>
                      </div>
                      
                      <div className="ui-fieldset__field">
                        <label htmlFor="billing-tva" className="ui-fieldset__label">
                          Numéro de TVA
                        </label>
                        <input
                          type="text"
                          id="billing-tva"
                          className="ui-fieldset__input"
                          placeholder="FR12345678900"
                        />
                        <div className="ui-fieldset__help">
                          Format : FR + 11 chiffres (ex: FR12345678900)
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Fieldset 
  legend="Informations de facturation"
  requiredIndicator="* Champs requis"
  showValidation={true}
>
  <FieldsetField 
    label="Nom de l'entreprise"
    required
    error="Le nom de l'entreprise est requis pour la facturation"
  >
    <input type="text" />
  </FieldsetField>
  
  <FieldsetField 
    label="Numéro SIRET"
    required
    helpText="Format : 14 chiffres (ex: 123 456 789 00012)"
  >
    <input type="text" />
  </FieldsetField>
</Fieldset>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Fieldset avec options et toggles</h3>
          <div className="demo-content">
            <p>Fieldset avec options de configuration et toggles :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-fieldset-demo">
                <fieldset className="ui-fieldset ui-fieldset--options">
                  <legend className="ui-fieldset__legend">
                    Préférences de communication
                  </legend>
                  
                  <div className="ui-fieldset__content">
                    <div className="ui-fieldset__field">
                      <div className="ui-fieldset__checkbox-group">
                        <label className="ui-fieldset__checkbox-label">
                          <input
                            type="checkbox"
                            checked={preferences.newsletter}
                            onChange={(e) => handlePreferenceChange('newsletter', e.target.checked)}
                            className="ui-fieldset__checkbox"
                          />
                          <span className="ui-fieldset__checkbox-text">
                            Recevoir la newsletter hebdomadaire
                          </span>
                        </label>
                        <div className="ui-fieldset__help">
                          Recevez nos dernières actualités et offres spéciales
                        </div>
                      </div>
                    </div>
                    
                    <div className="ui-fieldset__field">
                      <div className="ui-fieldset__checkbox-group">
                        <label className="ui-fieldset__checkbox-label">
                          <input
                            type="checkbox"
                            checked={preferences.notifications}
                            onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                            className="ui-fieldset__checkbox"
                          />
                          <span className="ui-fieldset__checkbox-text">
                            Notifications push sur le navigateur
                          </span>
                        </label>
                        <div className="ui-fieldset__help">
                          Recevez des notifications instantanées sur votre navigateur
                        </div>
                      </div>
                    </div>
                    
                    <div className="ui-fieldset__field">
                      <div className="ui-fieldset__checkbox-group">
                        <label className="ui-fieldset__checkbox-label">
                          <input
                            type="checkbox"
                            checked={preferences.marketing}
                            onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                            className="ui-fieldset__checkbox"
                          />
                          <span className="ui-fieldset__checkbox-text">
                            Communications marketing personnalisées
                          </span>
                        </label>
                        <div className="ui-fieldset__help">
                          Recevez des offres adaptées à vos centres d'intérêt
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Fieldset legend="Préférences de communication">
  <FieldsetField>
    <FieldsetCheckbox
      label="Recevoir la newsletter hebdomadaire"
      helpText="Recevez nos dernières actualités et offres spéciales"
      checked={newsletter}
      onChange={setNewsletter}
    />
  </FieldsetField>
  
  <FieldsetField>
    <FieldsetCheckbox
      label="Notifications push sur le navigateur"
      helpText="Recevez des notifications instantanées sur votre navigateur"
      checked={notifications}
      onChange={setNotifications}
    />
  </FieldsetField>
</Fieldset>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Fieldset avec variantes</h3>
          <div className="demo-content">
            <p>Différentes variantes de Fieldset :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-fieldset-demo ui-fieldset-demo--variants">
                <div className="ui-fieldset-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Compact</h4>
                  <fieldset className="ui-fieldset ui-fieldset--compact">
                    <legend className="ui-fieldset__legend">Compact</legend>
                    <div className="ui-fieldset__content">
                      <div className="ui-fieldset__field">
                        <label className="ui-fieldset__label">Nom</label>
                        <input type="text" className="ui-fieldset__input ui-fieldset__input--compact" placeholder="Nom" />
                      </div>
                    </div>
                  </fieldset>
                </div>
                
                <div className="ui-fieldset-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</h4>
                  <fieldset className="ui-fieldset ui-fieldset--large">
                    <legend className="ui-fieldset__legend">Large</legend>
                    <div className="ui-fieldset__content">
                      <div className="ui-fieldset__field">
                        <label className="ui-fieldset__label">Description</label>
                        <textarea className="ui-fieldset__textarea ui-fieldset__textarea--large" placeholder="Description..." rows={3} />
                      </div>
                    </div>
                  </fieldset>
                </div>
                
                <div className="ui-fieldset-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Bordered</h4>
                  <fieldset className="ui-fieldset ui-fieldset--bordered">
                    <legend className="ui-fieldset__legend">Bordered</legend>
                    <div className="ui-fieldset__content">
                      <div className="ui-fieldset__field">
                        <label className="ui-fieldset__label">Valeur</label>
                        <input type="text" className="ui-fieldset__input ui-fieldset__input--bordered" placeholder="Valeur" />
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Fieldset variant="compact" />
<Fieldset variant="large" />
<Fieldset variant="bordered" />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Fieldset en contexte</h3>
          <div className="demo-content">
            <p>Exemples d'utilisation dans des contextes réels :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-fieldset-demo ui-fieldset-demo--context">
                <div className="ui-fieldset-context">
                  <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Configuration de profil utilisateur</h4>
                  
                  <form className="ui-form">
                    <fieldset className="ui-fieldset">
                      <legend className="ui-fieldset__legend">
                        <span className="ui-fieldset__icon">👤</span>
                        Informations de base
                      </legend>
                      
                      <div className="ui-fieldset__content">
                        <div className="ui-fieldset__row">
                          <div className="ui-fieldset__field">
                            <label className="ui-fieldset__label">Prénom</label>
                            <input type="text" className="ui-fieldset__input" placeholder="Prénom" />
                          </div>
                          <div className="ui-fieldset__field">
                            <label className="ui-fieldset__label">Nom</label>
                            <input type="text" className="ui-fieldset__input" placeholder="Nom" />
                          </div>
                        </div>
                        
                        <div className="ui-fieldset__field">
                          <label className="ui-fieldset__label">Bio</label>
                          <textarea className="ui-fieldset__textarea" placeholder="Parlez-nous de vous..." rows={3} />
                        </div>
                      </div>
                    </fieldset>
                    
                    <fieldset className="ui-fieldset">
                      <legend className="ui-fieldset__legend">
                        <span className="ui-fieldset__icon">🔐</span>
                        Sécurité
                      </legend>
                      
                      <div className="ui-fieldset__content">
                        <div className="ui-fieldset__field">
                          <label className="ui-fieldset__label">Mot de passe actuel</label>
                          <input type="password" className="ui-fieldset__input" placeholder="Mot de passe actuel" />
                        </div>
                        
                        <div className="ui-fieldset__row">
                          <div className="ui-fieldset__field">
                            <label className="ui-fieldset__label">Nouveau mot de passe</label>
                            <input type="password" className="ui-fieldset__input" placeholder="Nouveau mot de passe" />
                          </div>
                          <div className="ui-fieldset__field">
                            <label className="ui-fieldset__label">Confirmer</label>
                            <input type="password" className="ui-fieldset__input" placeholder="Confirmer le mot de passe" />
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<UserProfileForm>
  <Fieldset 
    legend="Informations de base"
    icon="👤"
    showIcon={true}
  >
    <FieldsetRow>
      <FieldsetField label="Prénom">
        <input type="text" />
      </FieldsetField>
      <FieldsetField label="Nom">
        <input type="text" />
      </FieldsetField>
    </FieldsetRow>
  </Fieldset>
  
  <Fieldset 
    legend="Sécurité"
    icon="🔐"
    showIcon={true}
  >
    <FieldsetField label="Mot de passe actuel">
      <input type="password" />
    </FieldsetField>
  </Fieldset>
</UserProfileForm>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant Fieldset :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>legend</strong> : string (texte de la légende)</li>
                <li><strong>description</strong> : string (description du groupe de champs)</li>
                <li><strong>icon</strong> : string (icône à afficher avec la légende)</li>
                <li><strong>badge</strong> : object (badge de statut)</li>
                <li><strong>requiredIndicator</strong> : string (indicateur de champs requis)</li>
              </ul>
              
              <h4>Props de personnalisation :</h4>
              <ul>
                <li><strong>variant</strong> : "default" | "compact" | "large" | "bordered"</li>
                <li><strong>size</strong> : "small" | "medium" | "large"</li>
                <li><strong>layout</strong> : "vertical" | "horizontal" | "grid"</li>
                <li><strong>spacing</strong> : "tight" | "normal" | "loose"</li>
                <li><strong>theme</strong> : "light" | "dark" | "auto"</li>
              </ul>
              
              <h4>Props d'affichage :</h4>
              <ul>
                <li><strong>showIcon</strong> : boolean (afficher l'icône)</li>
                <li><strong>showBadge</strong> : boolean (afficher le badge)</li>
                <li><strong>showDescription</strong> : boolean (afficher la description)</li>
                <li><strong>showRequiredIndicator</strong> : boolean (afficher l'indicateur requis)</li>
                <li><strong>collapsible</strong> : boolean (rendre le fieldset pliable)</li>
              </ul>
              
              <h4>Props de validation :</h4>
              <ul>
                <li><strong>showValidation</strong> : boolean (afficher la validation)</li>
                <li><strong>error</strong> : string (message d'erreur global)</li>
                <li><strong>warning</strong> : string (message d'avertissement)</li>
                <li><strong>success</strong> : string (message de succès)</li>
              </ul>
              
              <h4>Variants spécialisés :</h4>
              <ul>
                <li><strong>FormFieldset</strong> : Fieldset pour formulaires</li>
                <li><strong>SettingsFieldset</strong> : Fieldset pour paramètres</li>
                <li><strong>ProfileFieldset</strong> : Fieldset pour profils</li>
                <li><strong>BillingFieldset</strong> : Fieldset pour facturation</li>
                <li><strong>SecurityFieldset</strong> : Fieldset pour sécurité</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onToggle</strong> : (collapsed: boolean) =&gt; void (si collapsible)</li>
                <li><strong>onFocus</strong> : (e: FocusEvent) =&gt; void</li>
                <li><strong>onBlur</strong> : (e: FocusEvent) =&gt; void</li>
                <li><strong>onKeyDown</strong> : (e: KeyboardEvent) =&gt; void</li>
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
                <h4>Formulaires complexes</h4>
                <p>Organisation logique de formulaires avec de nombreux champs.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Paramètres utilisateur</h4>
                <p>Groupement de paramètres par catégorie fonctionnelle.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Configuration système</h4>
                <p>Organisation des options de configuration en sections logiques.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldsetPage;


