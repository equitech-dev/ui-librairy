# 📋 Fieldset

Composant de groupe de champs avec légende et structure sémantique.

## 📋 Fonctionnalités

- ✅ Groupe de champs avec légende
- ✅ Structure sémantique HTML5 (`<fieldset>` et `<legend>`)
- ✅ Grille responsive (1-4 colonnes)
- ✅ Validation intégrée
- ✅ États visuels (erreur, succès, avertissement, info)
- ✅ Layouts multiples (vertical, horizontal)
- ✅ Tailles multiples (sm, md, lg)
- ✅ Styles variés (outlined, filled, elevated, bordered)
- ✅ Accessibilité complète (ARIA)

## 🚀 Utilisation

```jsx
import { Fieldset, FieldsetRow, FieldsetField } from 'ui-library';

function MyFieldset() {
  return (
    <Fieldset legend="Informations personnelles">
      <FieldsetRow cols={2}>
        <FieldsetField label="Prénom" required>
          <input type="text" />
        </FieldsetField>
        <FieldsetField label="Nom" required>
          <input type="text" />
        </FieldsetField>
      </FieldsetRow>
    </Fieldset>
  );
}
```

## 📖 Props

### Fieldset

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `node` | - | Contenu du fieldset |
| `legend` | `string` | - | Légende du groupe de champs |
| `description` | `string` | - | Description du groupe |
| `layout` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout du fieldset |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du fieldset |
| `variant` | `'default' \| 'compact' \| 'spacious'` | `'default'` | Variante de style |
| `style` | `'outlined' \| 'filled' \| 'elevated' \| 'bordered'` | `'outlined'` | Style visuel |
| `disabled` | `boolean` | `false` | Désactive le fieldset |
| `required` | `boolean` | `false` | Groupe requis |
| `optional` | `boolean` | `false` | Groupe optionnel |
| `error` | `string` | - | Message d'erreur |
| `success` | `string` | - | Message de succès |
| `warning` | `string` | - | Message d'avertissement |
| `info` | `string` | - | Message d'information |
| `footer` | `node` | - | Contenu du pied de page |
| `actions` | `node` | - | Actions du fieldset |

### FieldsetRow

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `node` | - | Champs de la ligne |
| `cols` | `1 \| 2 \| 3 \| 4` | `1` | Nombre de colonnes |

### FieldsetField

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `node` | - | Contenu du champ |
| `label` | `string` | - | Label du champ |
| `help` | `string` | - | Texte d'aide |
| `error` | `string` | - | Message d'erreur |
| `success` | `string` | - | Message de succès |
| `required` | `boolean` | `false` | Champ requis |
| `optional` | `boolean` | `false` | Champ optionnel |

### FieldsetButton

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `node` | - | Contenu du bouton |
| `variant` | `'default' \| 'primary' \| 'danger'` | `'default'` | Variante du bouton |
| `disabled` | `boolean` | `false` | Désactive le bouton |

## 🎨 Exemples

### Fieldset basique

```jsx
<Fieldset 
  legend="Informations personnelles"
  description="Renseignez vos informations de base"
>
  <FieldsetRow cols={2}>
    <FieldsetField label="Prénom" required>
      <input type="text" placeholder="Votre prénom" />
    </FieldsetField>
    <FieldsetField label="Nom" required>
      <input type="text" placeholder="Votre nom" />
    </FieldsetField>
  </FieldsetRow>
  
  <FieldsetField label="Email" required>
    <input type="email" placeholder="votre@email.com" />
  </FieldsetField>
</Fieldset>
```

### Fieldset avec validation

```jsx
<Fieldset 
  legend="Informations de contact"
  error={fieldsetError}
  success={fieldsetSuccess}
>
  <FieldsetRow cols={2}>
    <FieldsetField 
      label="Téléphone" 
      required 
      error={errors.phone}
      help="Format: +33 1 23 45 67 89"
    >
      <input 
        type="tel" 
        value={formData.phone}
        onChange={handleInputChange}
        name="phone"
      />
    </FieldsetField>
    
    <FieldsetField 
      label="Mobile" 
      optional 
      error={errors.mobile}
    >
      <input 
        type="tel" 
        value={formData.mobile}
        onChange={handleInputChange}
        name="mobile"
      />
    </FieldsetField>
  </FieldsetRow>
</Fieldset>
```

### Fieldset avec actions

```jsx
<Fieldset 
  legend="Paramètres avancés"
  description="Configuration optionnelle du système"
  actions={
    <>
      <Fieldset.Button variant="primary">Sauvegarder</Fieldset.Button>
      <Fieldset.Button>Annuler</Fieldset.Button>
    </>
  }
>
  <FieldsetRow cols={3}>
    <FieldsetField label="Port" help="Port par défaut: 3000">
      <input type="number" defaultValue="3000" />
    </FieldsetField>
    <FieldsetField label="Timeout" help="En secondes">
      <input type="number" defaultValue="30" />
    </FieldsetField>
    <FieldsetField label="Mode debug">
      <select defaultValue="development">
        <option value="development">Développement</option>
        <option value="production">Production</option>
      </select>
    </FieldsetField>
  </FieldsetRow>
</Fieldset>
```

### Fieldset avec styles variés

```jsx
{/* Style outlined (par défaut) */}
<Fieldset legend="Style outlined" style="outlined">
  <FieldsetField label="Champ">
    <input type="text" />
  </FieldsetField>
</Fieldset>

{/* Style filled */}
<Fieldset legend="Style filled" style="filled">
  <FieldsetField label="Champ">
    <input type="text" />
  </FieldsetField>
</Fieldset>

{/* Style elevated */}
<Fieldset legend="Style elevated" style="elevated">
  <FieldsetField label="Champ">
    <input type="text" />
  </FieldsetField>
</Fieldset>

{/* Style bordered */}
<Fieldset legend="Style bordered" style="bordered">
  <FieldsetField label="Champ">
    <input type="text" />
  </FieldsetField>
</Fieldset>
```

### Fieldset horizontal

```jsx
<Fieldset 
  legend="Configuration"
  layout="horizontal"
  variant="compact"
>
  <FieldsetRow cols={2}>
    <FieldsetField label="Nom d'utilisateur" required>
      <input type="text" />
    </FieldsetField>
    <FieldsetField label="Mot de passe" required>
      <input type="password" />
    </FieldsetField>
  </FieldsetRow>
  
  <FieldsetField label="Email" required>
    <input type="email" />
  </FieldsetField>
</Fieldset>
```

### Fieldset avec footer personnalisé

```jsx
<Fieldset 
  legend="Sélection de fichiers"
  footer={
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>Total: 3 fichiers sélectionnés</span>
      <span>Taille: 2.5 MB</span>
    </div>
  }
>
  <FieldsetField label="Fichiers">
    <input type="file" multiple />
  </FieldsetField>
</Fieldset>
```

## 🎯 Cas d'usage

### Formulaire d'inscription avec sections

```jsx
function RegistrationForm() {
  return (
    <form>
      <Fieldset 
        legend="Informations personnelles" 
        required
        description="Renseignez vos informations de base"
      >
        <FieldsetRow cols={2}>
          <FieldsetField label="Prénom" required>
            <input type="text" name="firstName" />
          </FieldsetField>
          <FieldsetField label="Nom" required>
            <input type="text" name="lastName" />
          </FieldsetField>
        </FieldsetRow>
        
        <FieldsetField label="Date de naissance" required>
          <input type="date" name="birthDate" />
        </FieldsetField>
      </Fieldset>

      <Fieldset 
        legend="Informations de contact"
        required
        description="Vos coordonnées pour vous contacter"
      >
        <FieldsetField label="Email" required>
          <input type="email" name="email" />
        </FieldsetField>
        
        <FieldsetRow cols={2}>
          <FieldsetField label="Téléphone" optional>
            <input type="tel" name="phone" />
          </FieldsetField>
          <FieldsetField label="Mobile" optional>
            <input type="tel" name="mobile" />
          </FieldsetField>
        </FieldsetRow>
      </Fieldset>

      <Fieldset 
        legend="Adresse"
        description="Votre adresse postale"
        actions={
          <>
            <Fieldset.Button variant="primary">Enregistrer</Fieldset.Button>
            <Fieldset.Button>Annuler</Fieldset.Button>
          </>
        }
      >
        <FieldsetField label="Rue" required>
          <input type="text" name="street" />
        </FieldsetField>
        
        <FieldsetRow cols={3}>
          <FieldsetField label="Code postal" required>
            <input type="text" name="postalCode" />
          </FieldsetField>
          <FieldsetField label="Ville" required>
            <input type="text" name="city" />
          </FieldsetField>
          <FieldsetField label="Pays" required>
            <select name="country">
              <option value="fr">France</option>
              <option value="be">Belgique</option>
              <option value="ch">Suisse</option>
            </select>
          </FieldsetField>
        </FieldsetRow>
      </Fieldset>
    </form>
  );
}
```

### Configuration de paramètres

```jsx
function SettingsForm() {
  return (
    <form>
      <Fieldset 
        legend="Paramètres généraux"
        style="elevated"
        description="Configuration de base de l'application"
      >
        <FieldsetRow cols={2}>
          <FieldsetField label="Nom de l'application" required>
            <input type="text" defaultValue="Mon App" />
          </FieldsetField>
          <FieldsetField label="Version">
            <input type="text" defaultValue="1.0.0" disabled />
          </FieldsetField>
        </FieldsetRow>
        
        <FieldsetField label="Description" optional>
          <textarea rows={3} placeholder="Description de l'application" />
        </FieldsetField>
      </Fieldset>

      <Fieldset 
        legend="Paramètres réseau"
        style="filled"
        description="Configuration des connexions réseau"
        actions={
          <Fieldset.Button variant="primary">Tester la connexion</Fieldset.Button>
        }
      >
        <FieldsetRow cols={3}>
          <FieldsetField label="Port" help="Port par défaut: 3000">
            <input type="number" defaultValue="3000" />
          </FieldsetField>
          <FieldsetField label="Timeout" help="En secondes">
            <input type="number" defaultValue="30" />
          </FieldsetField>
          <FieldsetField label="Retry attempts">
            <input type="number" defaultValue="3" />
          </FieldsetField>
        </FieldsetRow>
        
        <FieldsetField label="URL de base" required>
          <input type="url" defaultValue="https://api.example.com" />
        </FieldsetField>
      </Fieldset>

      <Fieldset 
        legend="Paramètres de sécurité"
        style="bordered"
        description="Configuration des paramètres de sécurité"
        warning="Ces paramètres affectent la sécurité de l'application"
      >
        <FieldsetRow cols={2}>
          <FieldsetField label="Mode debug">
            <select defaultValue="development">
              <option value="development">Développement</option>
              <option value="production">Production</option>
            </select>
          </FieldsetField>
          <FieldsetField label="Logs de sécurité">
            <select defaultValue="enabled">
              <option value="enabled">Activé</option>
              <option value="disabled">Désactivé</option>
            </select>
          </FieldsetField>
        </FieldsetRow>
        
        <FieldsetField label="Clé API" required>
          <input type="password" placeholder="Entrez votre clé API" />
        </FieldsetField>
      </Fieldset>
    </form>
  );
}
```

## ♿ Accessibilité

Le composant Fieldset respecte les standards d'accessibilité WCAG 2.1 :

- **Structure sémantique** : Utilisation appropriée des balises `<fieldset>` et `<legend>`
- **Groupement logique** : Champs regroupés de manière logique
- **Labels associés** : Chaque champ a un label explicite
- **Messages d'erreur** : Erreurs clairement identifiées et associées aux champs
- **Navigation clavier** : Support complet de la navigation au clavier
- **États ARIA** : Attributs `aria-invalid`, `aria-describedby`, `aria-required`
- **Lecteurs d'écran** : Structure logique et descriptions appropriées

## 🎨 Personnalisation

### Variables CSS

```scss
:root {
  --fieldset-border-radius: var(--border-radius-lg);
  --fieldset-spacing: var(--spacing-4);
  --fieldset-padding: var(--spacing-4);
  --fieldset-field-gap: var(--spacing-2);
}
```

### Classes CSS

```scss
.ui-fieldset {
  // Conteneur principal
}

.ui-fieldset__legend {
  // Légende du fieldset
}

.ui-fieldset__description {
  // Description du fieldset
}

.ui-fieldset__content {
  // Contenu du fieldset
}

.ui-fieldset__row {
  // Ligne de champs
}

.ui-fieldset__field {
  // Champ individuel
}

.ui-fieldset__field--error {
  // Champ en erreur
}

.ui-fieldset__label {
  // Label du champ
}

.ui-fieldset__label--required {
  // Label requis
}
```

## 🔧 Développement

### Structure des fichiers

```
Fieldset/
├── Fieldset.scss    # Styles du composant
├── Fieldset.jsx     # Composant React
├── index.js         # Export
└── README.md        # Documentation
```

### Tests

```jsx
import { render, screen } from '@testing-library/react';
import Fieldset from './Fieldset';

test('Fieldset renders with legend', () => {
  render(
    <Fieldset legend="Test Fieldset">
      <Fieldset.Field label="Test">
        <input type="text" />
      </Fieldset.Field>
    </Fieldset>
  );
  
  expect(screen.getByText('Test Fieldset')).toBeInTheDocument();
  expect(screen.getByText('Test')).toBeInTheDocument();
});
```

## 📝 Notes

- Le composant Fieldset utilise la structure sémantique HTML5 native
- Les champs sont automatiquement groupés de manière logique
- La grille responsive s'adapte automatiquement sur mobile
- Les messages d'état sont affichés de manière prioritaire (erreur > succès > avertissement > info)
- Le composant supporte tous les attributs HTML standard des fieldsets
- La validation peut être gérée au niveau du fieldset ou des champs individuels
- Les actions et le footer sont optionnels et s'affichent conditionnellement


