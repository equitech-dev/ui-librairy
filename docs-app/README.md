# UI Library EQUITECH - Documentation

Application de documentation interactive pour la UI Library EQUITECH, construite avec React et TypeScript.

## 🚀 Démarrage rapide

### Prérequis
- Node.js 16+
- npm ou yarn

### Installation
```bash
npm install
```

### Développement local
```bash
npm start
```

L'application sera accessible sur `http://localhost:3000`

### Build de production
```bash
npm run build
```

### Déploiement
```bash
npm run deploy
```

## 📁 Structure du projet

```
docs-app/
├── public/                 # Fichiers statiques
├── src/
│   ├── components/         # Composants React de la documentation
│   ├── pages/             # Pages de la documentation
│   ├── styles/            # Styles SCSS
│   ├── App.tsx            # Composant principal
│   └── index.tsx          # Point d'entrée
├── package.json           # Dépendances et scripts
└── README.md             # Ce fichier
```

## 🎨 Fonctionnalités

- **Documentation interactive** : Exemples visuels de tous les composants
- **Navigation latérale** : Menu organisé par catégories
- **Design responsive** : Optimisé pour mobile et desktop
- **Code examples** : Exemples de code pour chaque composant
- **Système de design** : Présentation des couleurs, typographie, etc.

## 📚 Sections de documentation

### Démarrage
- Introduction
- Installation
- Système de Design

### Composants P1 (Priorité 1)
- Button
- Card
- Input
- Alert
- Pagination
- Tabs
- Switch
- DatePicker
- DataTable

### Navigation (P2)
- Breadcrumb
- Accordion
- Stepper

### Feedback (P2)
- Popover
- Skeleton
- Loading

### Données (P2)
- Progress
- Rating
- Timeline
- Tree
- List
- Calendar
- Kanban

### Formulaires (P2)
- Upload
- RangeSlider
- ToggleSwitch
- AdvancedDropdown
- TimePicker
- ColorPicker
- Form
- Fieldset

### Layout (P2)
- Drawer
- Portal
- Overlay

## 🔧 Configuration

### Variables CSS
L'application utilise des variables CSS pour la personnalisation :

```css
:root {
  --ui-primary-color: #2563eb;
  --ui-secondary-color: #64748b;
  --ui-success-color: #059669;
  --ui-warning-color: #d97706;
  --ui-error-color: #dc2626;
  /* ... autres variables */
}
```

### Styles SCSS
Les styles sont organisés dans `src/styles/index.scss` avec :
- Variables CSS
- Styles de base
- Composants de démonstration
- Styles de documentation
- Design responsive

## 🚀 Déploiement

### GitHub Pages
L'application est configurée pour se déployer automatiquement sur GitHub Pages via GitHub Actions.

### Configuration manuelle
1. Build de l'application : `npm run build`
2. Déploiement : `npm run deploy`

## 📝 Contribution

Pour contribuer à la documentation :

1. Modifiez les composants dans `src/App.tsx`
2. Ajoutez de nouveaux styles dans `src/styles/index.scss`
3. Testez en local avec `npm start`
4. Déployez avec `npm run deploy`

## 🔗 Liens utiles

- **Documentation en ligne** : https://equitech-dev.github.io/ui-library/
- **Repository principal** : [UI Library EQUITECH](../README.md)
- **GitHub Actions** : [Workflow de déploiement](../.github/workflows/deploy-docs-react.yml)
