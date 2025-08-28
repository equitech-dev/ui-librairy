# 📝 Form

Composant de conteneur de formulaire avec validation et gestion d'état avancée.

## 📋 Fonctionnalités

- ✅ Conteneur de formulaire structuré
- ✅ Sections pliables/dépliables
- ✅ Grille responsive (1-4 colonnes)
- ✅ Validation intégrée
- ✅ États de chargement et progression
- ✅ Messages d'état (erreur, succès, avertissement, info)
- ✅ Layouts multiples (vertical, horizontal)
- ✅ Tailles multiples (sm, md, lg)
- ✅ Accessibilité complète (ARIA)

## 🚀 Utilisation

```jsx
import { Form, FormSection, FormRow, FormField } from 'ui-library';

function MyForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulaire soumis');
  };

  return (
    <Form onSubmit={handleSubmit} title="Mon formulaire">
      <FormSection title="Informations personnelles">
        <FormRow cols={2}>
          <FormField label="Prénom" required>
            <input type="text" />
          </FormField>
          <FormField label="Nom" required>
            <input type="text" />
          </FormField>
        </FormRow>
      </FormSection>
    </Form>
  );
}
```

## 📖 Props

### Form

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `node` | - | Contenu du formulaire |
| `title` | `string` | - | Titre du formulaire |
| `subtitle` | `string` | - | Sous-titre du formulaire |
| `onSubmit` | `function` | - | Callback de soumission |
| `onReset` | `function` | - | Callback de réinitialisation |
| `onCancel` | `function` | - | Callback d'annulation |
| `layout` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout du formulaire |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du formulaire |
| `variant` | `'default' \| 'compact' \| 'spacious'` | `'default'` | Variante de style |
| `disabled` | `boolean` | `false` | Désactive le formulaire |
| `loading` | `boolean` | `false` | État de chargement |
| `validating` | `boolean` | `false` | État de validation |
| `valid` | `boolean` | `false` | Formulaire valide |
| `invalid` | `boolean` | `false` | Formulaire invalide |
| `error` | `string` | - | Message d'erreur |
| `success` | `string` | - | Message de succès |
| `warning` | `string` | - | Message d'avertissement |
| `info` | `string` | - | Message d'information |
| `progress` | `number` | - | Progression (0-100) |
| `showProgress` | `boolean` | `false` | Affiche la barre de progression |

### FormSection

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `node` | - | Contenu de la section |
| `title` | `string` | - | Titre de la section |
| `collapsible` | `boolean` | `false` | Section pliable |
| `collapsed` | `boolean` | `false` | Section repliée par défaut |

### FormRow

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `node` | - | Champs de la ligne |
| `cols` | `1 \| 2 \| 3 \| 4` | `1` | Nombre de colonnes |

### FormField

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `node` | - | Contenu du champ |
| `label` | `string` | - | Label du champ |
| `help` | `string` | - | Texte d'aide |
| `error` | `string` | - | Message d'erreur |
| `success` | `string` | - | Message de succès |
| `required` | `boolean` | `false` | Champ requis |
| `optional` | `boolean` | `false` | Champ optionnel |

## 🎨 Exemples

### Formulaire basique

```jsx
<Form 
  title="Inscription"
  subtitle="Créez votre compte en quelques étapes"
  onSubmit={handleSubmit}
  onReset={handleReset}
>
  <FormSection title="Informations personnelles">
    <FormRow cols={2}>
      <FormField label="Prénom" required>
        <input type="text" placeholder="Votre prénom" />
      </FormField>
      <FormField label="Nom" required>
        <input type="text" placeholder="Votre nom" />
      </FormField>
    </FormRow>
    
    <FormField label="Email" required>
      <input type="email" placeholder="votre@email.com" />
    </FormField>
  </FormSection>
</Form>
```

### Formulaire avec validation

```jsx
<Form 
  title="Profil utilisateur"
  onSubmit={handleSubmit}
  error={formError}
  success={formSuccess}
  loading={isLoading}
  invalid={hasErrors}
>
  <FormSection title="Informations de base">
    <FormRow cols={2}>
      <FormField 
        label="Prénom" 
        required 
        error={errors.firstName}
        help="Votre prénom tel qu'il apparaîtra sur votre profil"
      >
        <input 
          type="text" 
          value={formData.firstName}
          onChange={handleInputChange}
          name="firstName"
        />
      </FormField>
      
      <FormField 
        label="Nom" 
        required 
        error={errors.lastName}
      >
        <input 
          type="text" 
          value={formData.lastName}
          onChange={handleInputChange}
          name="lastName"
        />
      </FormField>
    </FormRow>
  </FormSection>
</Form>
```

### Formulaire avec sections pliables

```jsx
<Form title="Configuration avancée">
  <FormSection 
    title="Paramètres de base" 
    collapsible 
    collapsed={false}
  >
    <FormRow cols={2}>
      <FormField label="Nom du projet" required>
        <input type="text" />
      </FormField>
      <FormField label="Description" optional>
        <textarea rows={3} />
      </FormField>
    </FormRow>
  </FormSection>
  
  <FormSection 
    title="Paramètres avancés" 
    collapsible 
    collapsed={true}
  >
    <FormRow cols={3}>
      <FormField label="Port" help="Port par défaut: 3000">
        <input type="number" />
      </FormField>
      <FormField label="Timeout" help="En secondes">
        <input type="number" />
      </FormField>
      <FormField label="Mode debug">
        <select>
          <option value="development">Développement</option>
          <option value="production">Production</option>
        </select>
      </FormField>
    </FormRow>
  </FormSection>
</Form>
```

### Formulaire horizontal

```jsx
<Form 
  title="Configuration"
  layout="horizontal"
  variant="compact"
>
  <FormSection title="Paramètres">
    <FormRow cols={2}>
      <FormField label="Nom d'utilisateur" required>
        <input type="text" />
      </FormField>
      <FormField label="Mot de passe" required>
        <input type="password" />
      </FormField>
    </FormRow>
    
    <FormField label="Email" required>
      <input type="email" />
    </FormField>
  </FormSection>
</Form>
```

### Formulaire avec progression

```jsx
<Form 
  title="Assistant de configuration"
  onSubmit={handleSubmit}
  progress={currentStep / totalSteps * 100}
  showProgress={true}
  info={`Étape ${currentStep} sur ${totalSteps}`}
>
  {currentStep === 1 && (
    <FormSection title="Étape 1: Informations de base">
      <FormField label="Nom du projet" required>
        <input type="text" />
      </FormField>
    </FormSection>
  )}
  
  {currentStep === 2 && (
    <FormSection title="Étape 2: Configuration">
      <FormField label="Type de projet">
        <select>
          <option value="web">Application Web</option>
          <option value="mobile">Application Mobile</option>
        </select>
      </FormField>
    </FormSection>
  )}
</Form>
```

## 🎯 Cas d'usage

### Formulaire d'inscription multi-étapes

```jsx
function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Soumission finale
      console.log('Inscription terminée', formData);
    }
  };

  const progress = (step / 3) * 100;

  return (
    <Form 
      title="Inscription"
      onSubmit={handleSubmit}
      progress={progress}
      showProgress={true}
      info={`Étape ${step} sur 3`}
    >
      {step === 1 && (
        <FormSection title="Informations personnelles">
          <FormRow cols={2}>
            <FormField label="Prénom" required error={errors.firstName}>
              <input 
                type="text" 
                value={formData.firstName || ''}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </FormField>
            <FormField label="Nom" required error={errors.lastName}>
              <input 
                type="text" 
                value={formData.lastName || ''}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </FormField>
          </FormRow>
        </FormSection>
      )}

      {step === 2 && (
        <FormSection title="Informations de contact">
          <FormField label="Email" required error={errors.email}>
            <input 
              type="email" 
              value={formData.email || ''}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </FormField>
          <FormField label="Téléphone" optional>
            <input 
              type="tel" 
              value={formData.phone || ''}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </FormField>
        </FormSection>
      )}

      {step === 3 && (
        <FormSection title="Sécurité">
          <FormField label="Mot de passe" required error={errors.password}>
            <input 
              type="password" 
              value={formData.password || ''}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </FormField>
          <FormField label="Confirmer le mot de passe" required error={errors.confirmPassword}>
            <input 
              type="password" 
              value={formData.confirmPassword || ''}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </FormField>
        </FormSection>
      )}
    </Form>
  );
}
```

### Formulaire de configuration

```jsx
function ConfigurationForm() {
  const [config, setConfig] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await saveConfiguration(config);
      // Succès
    } catch (error) {
      // Erreur
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form 
      title="Configuration du système"
      subtitle="Personnalisez les paramètres selon vos besoins"
      onSubmit={handleSubmit}
      onReset={() => setConfig({})}
      loading={isLoading}
      success={isLoading ? null : "Configuration sauvegardée avec succès"}
    >
      <FormSection title="Paramètres généraux" collapsible>
        <FormRow cols={2}>
          <FormField label="Nom du site" required>
            <input 
              type="text" 
              value={config.siteName || ''}
              onChange={(e) => setConfig({...config, siteName: e.target.value})}
            />
          </FormField>
          <FormField label="URL du site" required>
            <input 
              type="url" 
              value={config.siteUrl || ''}
              onChange={(e) => setConfig({...config, siteUrl: e.target.value})}
            />
          </FormField>
        </FormRow>
      </FormSection>

      <FormSection title="Paramètres avancés" collapsible collapsed>
        <FormRow cols={3}>
          <FormField label="Port" help="Port par défaut: 3000">
            <input 
              type="number" 
              value={config.port || 3000}
              onChange={(e) => setConfig({...config, port: e.target.value})}
            />
          </FormField>
          <FormField label="Timeout" help="En secondes">
            <input 
              type="number" 
              value={config.timeout || 30}
              onChange={(e) => setConfig({...config, timeout: e.target.value})}
            />
          </FormField>
          <FormField label="Mode debug">
            <select 
              value={config.debugMode || 'development'}
              onChange={(e) => setConfig({...config, debugMode: e.target.value})}
            >
              <option value="development">Développement</option>
              <option value="production">Production</option>
            </select>
          </FormField>
        </FormRow>
      </FormSection>
    </Form>
  );
}
```

## ♿ Accessibilité

Le composant Form respecte les standards d'accessibilité WCAG 2.1 :

- **Structure sémantique** : Utilisation appropriée des balises `<form>`, `<fieldset>`, `<legend>`
- **Labels associés** : Chaque champ a un label explicite
- **Messages d'erreur** : Erreurs clairement identifiées et associées aux champs
- **Navigation clavier** : Support complet de la navigation au clavier
- **États ARIA** : Attributs `aria-invalid`, `aria-describedby`, `aria-required`
- **Lecteurs d'écran** : Structure logique et descriptions appropriées

## 🎨 Personnalisation

### Variables CSS

```scss
:root {
  --form-border-radius: var(--border-radius-lg);
  --form-spacing: var(--spacing-4);
  --form-section-padding: var(--spacing-4);
  --form-field-gap: var(--spacing-2);
}
```

### Classes CSS

```scss
.ui-form {
  // Conteneur principal
}

.ui-form__section {
  // Section du formulaire
}

.ui-form__section--collapsible {
  // Section pliable
}

.ui-form__row {
  // Ligne de champs
}

.ui-form__field {
  // Champ individuel
}

.ui-form__field--error {
  // Champ en erreur
}

.ui-form__label {
  // Label du champ
}

.ui-form__label--required {
  // Label requis
}
```

## 🔧 Développement

### Structure des fichiers

```
Form/
├── Form.scss    # Styles du composant
├── Form.jsx     # Composant React
├── index.js     # Export
└── README.md    # Documentation
```

### Tests

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';

test('Form submits correctly', () => {
  const handleSubmit = jest.fn();
  render(
    <Form onSubmit={handleSubmit} title="Test Form">
      <Form.Field label="Test">
        <input type="text" />
      </Form.Field>
    </Form>
  );
  
  const submitButton = screen.getByText('Envoyer');
  fireEvent.click(submitButton);
  
  expect(handleSubmit).toHaveBeenCalled();
});
```

## 📝 Notes

- Le composant Form gère automatiquement la prévention de soumission multiple
- Les sections pliables conservent leur état local
- La grille responsive s'adapte automatiquement sur mobile
- Les messages d'état sont affichés de manière prioritaire (erreur > succès > avertissement > info)
- Le composant supporte tous les attributs HTML standard des formulaires
- La validation peut être gérée au niveau du formulaire ou des champs individuels


