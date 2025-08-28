import React, { useState } from 'react';

const FormPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    message: '',
    newsletter: false,
    terms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'L\'entreprise est requise';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Le poste est requis';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    }

    if (!formData.terms) {
      newErrors.terms = 'Vous devez accepter les conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulation d'une soumission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    alert('Formulaire soumis avec succès !');
  };

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Form</h1>
        <p className="section-description">
          Composant de formulaire complet avec validation, gestion d'état et personnalisation avancée. 
          Offre une interface intuitive pour la collecte de données utilisateur avec support des erreurs et de la soumission.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Formulaire basique</h3>
          <div className="demo-content">
            <p>Formulaire simple avec validation et gestion d'état :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-form-demo">
                <form className="ui-form" onSubmit={handleSubmit}>
                  <div className="ui-form__header">
                    <h3 className="ui-form__title">Formulaire de contact</h3>
                    <p className="ui-form__description">
                      Remplissez ce formulaire pour nous contacter
                    </p>
                  </div>

                  <div className="ui-form__body">
                    <div className="ui-form__row">
                      <div className="ui-form__field">
                        <label htmlFor="firstName" className="ui-form__label">
                          Prénom <span className="ui-form__required">*</span>
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className={`ui-form__input ${errors.firstName ? 'ui-form__input--error' : ''}`}
                          placeholder="Votre prénom"
                        />
                        {errors.firstName && (
                          <div className="ui-form__error">{errors.firstName}</div>
                        )}
                      </div>

                      <div className="ui-form__field">
                        <label htmlFor="lastName" className="ui-form__label">
                          Nom <span className="ui-form__required">*</span>
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className={`ui-form__input ${errors.lastName ? 'ui-form__input--error' : ''}`}
                          placeholder="Votre nom"
                        />
                        {errors.lastName && (
                          <div className="ui-form__error">{errors.lastName}</div>
                        )}
                      </div>
                    </div>

                    <div className="ui-form__row">
                      <div className="ui-form__field">
                        <label htmlFor="email" className="ui-form__label">
                          Email <span className="ui-form__required">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`ui-form__input ${errors.email ? 'ui-form__input--error' : ''}`}
                          placeholder="votre@email.com"
                        />
                        {errors.email && (
                          <div className="ui-form__error">{errors.email}</div>
                        )}
                      </div>

                      <div className="ui-form__field">
                        <label htmlFor="phone" className="ui-form__label">
                          Téléphone <span className="ui-form__required">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={`ui-form__input ${errors.phone ? 'ui-form__input--error' : ''}`}
                          placeholder="+33 1 23 45 67 89"
                        />
                        {errors.phone && (
                          <div className="ui-form__error">{errors.phone}</div>
                        )}
                      </div>
                    </div>

                    <div className="ui-form__row">
                      <div className="ui-form__field">
                        <label htmlFor="company" className="ui-form__label">
                          Entreprise <span className="ui-form__required">*</span>
                        </label>
                        <input
                          type="text"
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className={`ui-form__input ${errors.company ? 'ui-form__input--error' : ''}`}
                          placeholder="Nom de votre entreprise"
                        />
                        {errors.company && (
                          <div className="ui-form__error">{errors.company}</div>
                        )}
                      </div>

                      <div className="ui-form__field">
                        <label htmlFor="role" className="ui-form__label">
                          Poste <span className="ui-form__required">*</span>
                        </label>
                        <input
                          type="text"
                          id="role"
                          value={formData.role}
                          onChange={(e) => handleInputChange('role', e.target.value)}
                          className={`ui-form__input ${errors.role ? 'ui-form__input--error' : ''}`}
                          placeholder="Votre poste actuel"
                        />
                        {errors.role && (
                          <div className="ui-form__error">{errors.role}</div>
                        )}
                      </div>
                    </div>

                    <div className="ui-form__field">
                      <label htmlFor="message" className="ui-form__label">
                        Message <span className="ui-form__required">*</span>
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className={`ui-form__textarea ${errors.message ? 'ui-form__textarea--error' : ''}`}
                        placeholder="Décrivez votre projet ou votre demande..."
                        rows={4}
                      />
                      {errors.message && (
                        <div className="ui-form__error">{errors.message}</div>
                      )}
                    </div>

                    <div className="ui-form__field">
                      <div className="ui-form__checkbox-group">
                        <label className="ui-form__checkbox-label">
                          <input
                            type="checkbox"
                            checked={formData.newsletter}
                            onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                            className="ui-form__checkbox"
                          />
                          <span className="ui-form__checkbox-text">
                            S'abonner à notre newsletter
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="ui-form__field">
                      <div className="ui-form__checkbox-group">
                        <label className="ui-form__checkbox-label">
                          <input
                            type="checkbox"
                            checked={formData.terms}
                            onChange={(e) => handleInputChange('terms', e.target.checked)}
                            className="ui-form__checkbox"
                          />
                          <span className="ui-form__checkbox-text">
                            J'accepte les <button 
                              onClick={() => alert('Ouverture des conditions d\'utilisation')}
                              className="ui-form__link"
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ui-primary-color)', textDecoration: 'underline' }}
                            >
                              conditions d'utilisation
                            </button> 
                            <span className="ui-form__required">*</span>
                          </span>
                        </label>
                        {errors.terms && (
                          <div className="ui-form__error">{errors.terms}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="ui-form__footer">
                    <button
                      type="submit"
                      className="ui-button ui-button--primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="ui-form__spinner" />
                          Envoi en cours...
                        </>
                      ) : (
                        'Envoyer le formulaire'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { Form, FormField, FormRow } from '@equitech-dev/ui-library';
         
const [formData, setFormData] = useState({});
const [errors, setErrors] = useState({});

<Form onSubmit={handleSubmit}>
  <FormRow>
    <FormField
      label="Prénom"
      required
      error={errors.firstName}
    >
      <input
        type="text"
        value={formData.firstName}
        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
      />
    </FormField>
  </FormRow>
</Form>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Formulaire avec validation en temps réel</h3>
          <div className="demo-content">
            <p>Formulaire avec validation instantanée et feedback utilisateur :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-form-demo">
                <form className="ui-form ui-form--realtime">
                  <div className="ui-form__header">
                    <h3 className="ui-form__title">Validation en temps réel</h3>
                    <p className="ui-form__description">
                      Les erreurs s'affichent instantanément
                    </p>
                  </div>

                  <div className="ui-form__body">
                    <div className="ui-form__field">
                      <label htmlFor="realtime-email" className="ui-form__label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="realtime-email"
                        className="ui-form__input"
                        placeholder="test@example.com"
                      />
                      <div className="ui-form__help">
                        Format attendu : nom@domaine.com
                      </div>
                    </div>

                    <div className="ui-form__field">
                      <label htmlFor="realtime-password" className="ui-form__label">
                        Mot de passe
                      </label>
                      <input
                        type="password"
                        id="realtime-password"
                        className="ui-form__input"
                        placeholder="Votre mot de passe"
                      />
                      <div className="ui-form__password-strength">
                        <div className="ui-form__strength-bar">
                          <div className="ui-form__strength-fill ui-form__strength-fill--weak"></div>
                        </div>
                        <span className="ui-form__strength-text">Faible</span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Form validationMode="realtime">
  <FormField
    label="Email"
    helpText="Format attendu : nom@domaine.com"
    validateOnChange={true}
  >
    <input type="email" />
  </FormField>
  
  <FormField
    label="Mot de passe"
    showPasswordStrength={true}
  >
    <input type="password" />
  </FormField>
</Form>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Formulaire avec étapes</h3>
          <div className="demo-content">
            <p>Formulaire multi-étapes avec navigation et progression :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-form-demo">
                <div className="ui-form ui-form--stepped">
                  <div className="ui-form__steps">
                    <div className="ui-form__step ui-form__step--active">
                      <span className="ui-form__step-number">1</span>
                      <span className="ui-form__step-label">Informations</span>
                    </div>
                    <div className="ui-form__step">
                      <span className="ui-form__step-number">2</span>
                      <span className="ui-form__step-label">Détails</span>
                    </div>
                    <div className="ui-form__step">
                      <span className="ui-form__step-number">3</span>
                      <span className="ui-form__step-label">Confirmation</span>
                    </div>
                  </div>

                  <div className="ui-form__step-content">
                    <div className="ui-form__header">
                      <h3 className="ui-form__title">Étape 1 : Informations personnelles</h3>
                      <p className="ui-form__description">
                        Commençons par vos informations de base
                      </p>
                    </div>

                    <div className="ui-form__body">
                      <div className="ui-form__row">
                        <div className="ui-form__field">
                          <label className="ui-form__label">Prénom</label>
                          <input type="text" className="ui-form__input" placeholder="Prénom" />
                        </div>
                        <div className="ui-form__field">
                          <label className="ui-form__label">Nom</label>
                          <input type="text" className="ui-form__input" placeholder="Nom" />
                        </div>
                      </div>
                    </div>

                    <div className="ui-form__footer">
                      <button type="button" className="ui-button ui-button--secondary">
                        Précédent
                      </button>
                      <button type="button" className="ui-button ui-button--primary">
                        Suivant
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<SteppedForm steps={['Informations', 'Détails', 'Confirmation']}>
  <FormStep title="Informations personnelles">
    <FormField label="Prénom">
      <input type="text" />
    </FormField>
  </FormStep>
  
  <FormStep title="Détails du projet">
    <FormField label="Description">
      <textarea />
    </FormField>
  </FormStep>
</SteppedForm>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Formulaire avec variantes</h3>
          <div className="demo-content">
            <p>Différentes variantes de formulaire :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-form-demo ui-form-demo--variants">
                <div className="ui-form-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Compact</h4>
                  <form className="ui-form ui-form--compact">
                    <div className="ui-form__field">
                      <label className="ui-form__label">Email</label>
                      <input type="email" className="ui-form__input ui-form__input--compact" placeholder="email@example.com" />
                    </div>
                    <button type="submit" className="ui-button ui-button--primary ui-button--small">
                      S'abonner
                    </button>
                  </form>
                </div>
                
                <div className="ui-form-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</h4>
                  <form className="ui-form ui-form--large">
                    <div className="ui-form__field">
                      <label className="ui-form__label">Message</label>
                      <textarea className="ui-form__textarea ui-form__textarea--large" placeholder="Votre message..." rows={3} />
                    </div>
                    <button type="submit" className="ui-button ui-button--primary ui-button--large">
                      Envoyer
                    </button>
                  </form>
                </div>
                
                <div className="ui-form-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Bordered</h4>
                  <form className="ui-form ui-form--bordered">
                    <div className="ui-form__field">
                      <label className="ui-form__label">Nom</label>
                      <input type="text" className="ui-form__input ui-form__input--bordered" placeholder="Votre nom" />
                    </div>
                    <button type="submit" className="ui-button ui-button--primary">
                      Valider
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Form variant="compact" />
<Form variant="large" />
<Form variant="bordered" />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Formulaire en contexte</h3>
          <div className="demo-content">
            <p>Exemples d'utilisation dans des contextes réels :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-form-demo ui-form-demo--context">
                <div className="ui-form-context">
                  <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Formulaire de connexion</h4>
                  
                  <form className="ui-form ui-form--login">
                    <div className="ui-form__field">
                      <label className="ui-form__label">Email</label>
                      <input type="email" className="ui-form__input" placeholder="votre@email.com" />
                    </div>
                    
                    <div className="ui-form__field">
                      <label className="ui-form__label">Mot de passe</label>
                      <input type="password" className="ui-form__input" placeholder="Votre mot de passe" />
                    </div>
                    
                    <div className="ui-form__field">
                      <div className="ui-form__checkbox-group">
                        <label className="ui-form__checkbox-label">
                          <input type="checkbox" className="ui-form__checkbox" />
                          <span className="ui-form__checkbox-text">Se souvenir de moi</span>
                        </label>
                      </div>
                    </div>
                    
                    <button type="submit" className="ui-button ui-button--primary ui-button--full">
                      Se connecter
                    </button>
                    
                    <div className="ui-form__links">
                      <button 
                        onClick={() => alert('Récupération de mot de passe')}
                        className="ui-form__link"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ui-primary-color)', textDecoration: 'underline' }}
                      >
                        Mot de passe oublié ?
                      </button>
                      <button 
                        onClick={() => alert('Création de compte')}
                        className="ui-form__link"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ui-primary-color)', textDecoration: 'underline' }}
                      >
                        Créer un compte
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<LoginForm
  onSubmit={handleLogin}
  onForgotPassword={handleForgotPassword}
  onCreateAccount={handleCreateAccount}
  rememberMe={true}
  showSocialLogin={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant Form :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>onSubmit</strong> : (data: FormData) =&gt; void (callback de soumission)</li>
                <li><strong>initialValues</strong> : object (valeurs initiales du formulaire)</li>
                <li><strong>validationSchema</strong> : object (schéma de validation)</li>
                <li><strong>onValidationError</strong> : (errors: object) =&gt; void (callback d'erreur)</li>
                <li><strong>onChange</strong> : (data: FormData) =&gt; void (callback de changement)</li>
              </ul>
              
              <h4>Props de validation :</h4>
              <ul>
                <li><strong>validationMode</strong> : "onSubmit" | "onChange" | "onBlur" | "realtime"</li>
                <li><strong>showErrors</strong> : boolean (afficher les erreurs)</li>
                <li><strong>errorPosition</strong> : "below" | "above" | "tooltip"</li>
                <li><strong>validateOnMount</strong> : boolean (validation au montage)</li>
                <li><strong>stopOnFirstError</strong> : boolean (arrêter à la première erreur)</li>
              </ul>
              
              <h4>Props de personnalisation :</h4>
              <ul>
                <li><strong>variant</strong> : "default" | "compact" | "large" | "bordered"</li>
                <li><strong>size</strong> : "small" | "medium" | "large"</li>
                <li><strong>layout</strong> : "vertical" | "horizontal" | "grid"</li>
                <li><strong>spacing</strong> : "tight" | "normal" | "loose"</li>
                <li><strong>theme</strong> : "light" | "dark" | "auto"</li>
              </ul>
              
              <h4>Props d'état :</h4>
              <ul>
                <li><strong>loading</strong> : boolean (état de chargement)</li>
                <li><strong>disabled</strong> : boolean (désactivation du formulaire)</li>
                <li><strong>readOnly</strong> : boolean (lecture seule)</li>
                <li><strong>submitting</strong> : boolean (état de soumission)</li>
                <li><strong>dirty</strong> : boolean (formulaire modifié)</li>
              </ul>
              
              <h4>Variants spécialisés :</h4>
              <ul>
                <li><strong>LoginForm</strong> : Formulaire de connexion</li>
                <li><strong>RegistrationForm</strong> : Formulaire d'inscription</li>
                <li><strong>ContactForm</strong> : Formulaire de contact</li>
                <li><strong>SteppedForm</strong> : Formulaire multi-étapes</li>
                <li><strong>SearchForm</strong> : Formulaire de recherche</li>
                <li><strong>FilterForm</strong> : Formulaire de filtres</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onFocus</strong> : (e: FocusEvent) =&gt; void</li>
                <li><strong>onBlur</strong> : (e: FocusEvent) =&gt; void</li>
                <li><strong>onKeyDown</strong> : (e: KeyboardEvent) =&gt; void</li>
                <li><strong>onFieldChange</strong> : (field: string, value: any) =&gt; void</li>
                <li><strong>onFieldBlur</strong> : (field: string, value: any) =&gt; void</li>
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
                <h4>Inscription utilisateur</h4>
                <p>Formulaire d'inscription avec validation et gestion des erreurs.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Configuration de profil</h4>
                <p>Formulaire de modification des informations utilisateur.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Demande de contact</h4>
                <p>Formulaire de contact avec validation et notifications.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;


