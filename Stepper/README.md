# 🚶 Stepper - Étapes de Processus

## 🎯 Objectif
Composant pour afficher les étapes d'un processus ou d'un workflow, permettant de visualiser la progression et de naviguer entre les étapes.

## 📋 API

### Props
```typescript
interface StepperProps {
  steps: StepperStep[];
  currentStep?: number;
  variant?: 'horizontal' | 'vertical';
  size?: 'default' | 'compact' | 'large';
  clickable?: boolean;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

interface StepperStep {
  label: string;
  description?: string;
  error?: boolean;
  disabled?: boolean;
  hideNumber?: boolean;
}
```

## 🚀 Utilisation

### Exemple de base
```jsx
import Stepper from '@equitech-dev/ui-library/Stepper';

const steps = [
  { label: 'Informations', description: 'Données personnelles' },
  { label: 'Validation', description: 'Vérification des données' },
  { label: 'Confirmation', description: 'Finalisation' }
];

<Stepper steps={steps} currentStep={1} />
```

### Avec gestion des erreurs
```jsx
const stepsWithError = [
  { label: 'Informations', description: 'Données personnelles' },
  { label: 'Validation', description: 'Vérification des données', error: true },
  { label: 'Confirmation', description: 'Finalisation' }
];

<Stepper steps={stepsWithError} currentStep={1} />
```

### Variantes d'affichage
```jsx
// Vertical
<Stepper steps={steps} currentStep={1} variant="vertical" />

// Compact
<Stepper steps={steps} currentStep={1} size="compact" />

// Large
<Stepper steps={steps} currentStep={1} size="large" />
```

### Étapes cliquables
```jsx
const handleStepClick = (stepIndex) => {
  console.log('Navigation vers l\'étape:', stepIndex);
  // Logique de navigation
};

<Stepper 
  steps={steps} 
  currentStep={1} 
  clickable={true}
  onStepClick={handleStepClick}
/>
```

### États spéciaux
```jsx
const complexSteps = [
  { label: 'Étape 1', description: 'Complétée' },
  { label: 'Étape 2', description: 'En cours' },
  { label: 'Étape 3', description: 'Erreur', error: true },
  { label: 'Étape 4', description: 'Désactivée', disabled: true }
];

<Stepper steps={complexSteps} currentStep={1} />
```

## 🔧 Configuration

### Variantes disponibles
- **horizontal** : Affichage horizontal (par défaut)
- **vertical** : Affichage vertical pour les formulaires longs

### Tailles disponibles
- **default** : Taille normale
- **compact** : Version réduite
- **large** : Version agrandie

### États des étapes
- **completed** : Étape terminée (icône de validation)
- **active** : Étape actuelle
- **error** : Étape en erreur (icône d'alerte)
- **disabled** : Étape désactivée

### Accessibilité
- Support de la navigation au clavier
- Attributs ARIA appropriés (`aria-current`, `aria-label`)
- Indication visuelle claire de l'état de chaque étape

### Responsive
- Adaptation automatique sur mobile
- Réduction des tailles et espacements
- Optimisation pour les écrans tactiles

## 🎨 Styles

### Classes CSS
- `.ui-stepper` : Conteneur principal
- `.ui-stepper-line` : Ligne de progression de base
- `.ui-stepper-progress` : Ligne de progression active
- `.ui-stepper-step` : Conteneur d'une étape
- `.ui-stepper-step-circle` : Cercle de l'étape
- `.ui-stepper-step-label` : Label de l'étape
- `.ui-stepper-step-description` : Description de l'étape

### États visuels
- **Hover** : Changement de couleur sur les étapes cliquables
- **Active** : Cercle rempli avec la couleur primaire
- **Completed** : Cercle avec icône de validation
- **Error** : Cercle rouge avec icône d'alerte
- **Disabled** : Opacité réduite et curseur interdit

## 🐛 Troubleshooting

### Problèmes courants
1. **Progression incorrecte** : Vérifiez que `currentStep` est entre 0 et `steps.length - 1`
2. **Étapes non cliquables** : Activez `clickable={true}` et fournissez `onStepClick`
3. **Styles manquants** : Importez le fichier SCSS du composant

### Bonnes pratiques
- Limitez le nombre d'étapes à 7 maximum
- Utilisez des labels courts et descriptifs
- Ajoutez des descriptions pour clarifier chaque étape
- Testez l'accessibilité avec un lecteur d'écran

### Cas d'usage recommandés
- **Formulaires multi-étapes** : Inscription, configuration
- **Processus de commande** : Panier → Livraison → Paiement
- **Workflows métier** : Validation, approbation, publication
- **Onboarding** : Guide d'utilisation d'une application
