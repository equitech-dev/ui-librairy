# 🚀 UI Library EQUITECH

> **Une bibliothèque de composants UI moderne et cohérente, conçue pour la marque EQUITECH**

Développez des interfaces utilisateur exceptionnelles avec notre collection de composants réutilisables, optimisés pour l'accessibilité et la performance. Notre bibliothèque suit les meilleures pratiques UX/UI et s'adapte parfaitement à l'identité visuelle EQUITECH.

## ✨ Pourquoi choisir notre UI Library ?

- 🎨 **Design System cohérent** - Palette de couleurs harmonieuse et typographie soignée
- ♿ **Accessibilité native** - Conforme aux standards WCAG 2.1
- 📱 **Responsive by design** - Optimisé pour tous les appareils
- ⚡ **Performance optimisée** - Composants légers et rapides
- 🔧 **Facilement personnalisable** - Variables SCSS et classes modulaires
- 🛡️ **Préfixe `ui-`** - Évite les conflits de noms dans vos projets

---

## 🎨 Charte Graphique EQUITECH

### Palette de Couleurs

Notre palette de couleurs a été soigneusement conçue pour refléter l'identité EQUITECH :

#### Couleurs Principales
```scss
// Couleurs de marque
$primary-green: #2BA985;    // Vert/Teal principal - Actions, liens
$secondary-teal: #0C3640;   // Teal/Bleu-Vert - Éléments secondaires
$primary-dark: #1A2A38;     // Bleu-Vert foncé - Textes, arrière-plans

// Neutres
$light-grey: #F5F5F5;       // Gris clair - Arrière-plans
$pure-white: #FAFBFC;       // Blanc non-pur - Meilleure pratique UX
```

#### Couleurs Sémantiques
```scss
// États et feedback
$success: #2BA985;          // Succès (utilise la couleur principale)
$warning: #FFA726;          // Avertissement
$error: #EF5350;            // Erreur
$info: #42A5F5;             // Information
```

### Typographie

Notre système typographique combine élégance et lisibilité :

```scss
// Polices
$font-title: 'Josefin Sans', sans-serif;  // Titres et headings
$font-body: 'Inter', sans-serif;          // Corps de texte

// Tailles
$h1: 2rem;      // 32px - Titres principaux
$h2: 1.5rem;    // 24px - Sous-titres
$h3: 1.25rem;   // 20px - Titres de section
$body: 1rem;    // 16px - Texte normal
$small: 0.875rem; // 14px - Texte petit
```

### Système d'Espacement

Espacement cohérent basé sur `rem` :

```scss
$spacing-xs: 0.25rem;  // 4px
$spacing-s: 0.5rem;    // 8px
$spacing-m: 1rem;      // 16px
$spacing-l: 1.5rem;    // 24px
$spacing-xl: 2rem;     // 32px
$spacing-xxl: 3rem;    // 48px
```

---

## 🧩 Composants Disponibles

### 🎯 Composants de Base
| Composant | Description | Statut |
|-----------|-------------|--------|
| **Button** | Boutons avec variantes de couleur, taille et style | ✅ Stable |
| **Card** | Cartes avec headers, footers et variantes | ✅ Stable |
| **Input** | Champs de saisie avec validation et icônes | ✅ Stable |
| **Alert** | Alertes avec types sémantiques et icônes | ✅ Stable |
| **Badge** | Badges pour étiquettes et statuts | ✅ Stable |
| **Modal** | Modales et dialogues | ✅ Stable |
| **Tooltip** | Infobulles contextuelles | ✅ Stable |
| **Loader** | Indicateurs de chargement | ✅ Stable |

### 📝 Composants de Formulaire
| Composant | Description | Statut |
|-----------|-------------|--------|
| **Checkbox** | Cases à cocher | ✅ Stable |
| **RadioButton** | Boutons radio | ✅ Stable |
| **Select** | Listes déroulantes | ✅ Stable |
| **Textarea** | Zones de texte multilignes | ✅ Stable |

### 🏗️ Composants de Layout
| Composant | Description | Statut |
|-----------|-------------|--------|
| **Header** | En-têtes de page | ✅ Stable |
| **Footer** | Pieds de page | ✅ Stable |
| **Section** | Sections de contenu | ✅ Stable |
| **Grid** | Système de grille responsive | ✅ Stable |
| **Separator** | Séparateurs visuels | ✅ Stable |

### 🎨 Composants Spécialisés
| Composant | Description | Statut |
|-----------|-------------|--------|
| **Carousel** | Carrousels d'images | ✅ Stable |
| **Gallery** | Galeries d'images | ✅ Stable |
| **MapEmbed** | Intégration de cartes | ✅ Stable |
| **ParallaxSection** | Sections avec effet parallaxe | ✅ Stable |

### 🚀 Nouveaux Composants P1 (Critiques)
| Composant | Description | Statut |
|-----------|-------------|--------|
| **Pagination** | Navigation entre pages avec indicateurs | 🆕 Nouveau |
| **Tabs** | Onglets pour organiser le contenu | 🆕 Nouveau |
| **Switch/Toggle** | Interrupteurs on/off avec variantes | 🆕 Nouveau |
| **DatePicker** | Sélecteur de date avec calendrier interactif | 🆕 Nouveau |
| **DataTable** | Tableaux de données avec tri, recherche et actions | 🆕 Nouveau |

---

## 🎨 Système d'Icônes EQUITECH

Notre collection d'icônes SVG optimisées pour une utilisation cohérente dans tous vos projets.

### Icônes Disponibles

#### 🔍 Icônes d'Action
- `ui-icon-search` - Recherche
- `ui-icon-edit` - Modifier
- `ui-icon-trash` - Supprimer
- `ui-icon-upload` - Télécharger
- `ui-icon-settings` - Paramètres

#### 🧭 Icônes de Navigation
- `ui-icon-cart` - Panier
- `ui-icon-users` - Utilisateurs
- `ui-icon-stats` - Statistiques
- `ui-icon-box` - Boîte/Produit
- `ui-icon-chevron` - Flèche
- `ui-icon-exclamation` - Point d'exclamation

### Utilisation des Icônes

```html
<!-- Icône simple -->
<div class="ui-icon-search"></div>

<!-- Icône avec taille -->
<div class="ui-icon-search ui-icon-s"></div>
<div class="ui-icon-search ui-icon-l"></div>

<!-- Icône avec couleur -->
<div class="ui-icon-search ui-icon-primary"></div>
<div class="ui-icon-search ui-icon-secondary"></div>

<!-- Icône dans un bouton -->
<button class="ui-button primary">
    <div class="ui-icon-search"></div>
    Rechercher
</button>

<!-- Icône dans un input -->
<div class="ui-input-wrapper">
    <input type="text" class="ui-input" placeholder="Rechercher...">
    <div class="ui-input-icon-right">
        <div class="ui-icon-search"></div>
    </div>
</div>
```

### Tailles d'Icônes
- **S** : 16px - Icônes compactes
- **M** : 24px - Taille par défaut
- **L** : 32px - Icônes importantes
- **XL** : 48px - Icônes de mise en avant

### Couleurs d'Icônes
- `primary` - Couleur principale (#2BA985)
- `secondary` - Couleur secondaire (#0C3640)
- `success` - Succès (#2BA985)
- `warning` - Avertissement (#FFA726)
- `error` - Erreur (#EF5350)
- `info` - Information (#42A5F5)
- `white` - Blanc (#FAFBFC)
- `grey` - Gris (#9E9E9E)
- `dark` - Sombre (#1A2A38)

---

## 🚀 Nouveaux Composants P1 - Guide Détaillé

### 📄 Pagination
Navigation entre pages avec indicateurs visuels et contrôles de navigation.

```html
<div class="ui-pagination">
    <div class="ui-pagination-info">Page 1 sur 10</div>
    <ul class="ui-pagination-list">
        <li><button class="ui-pagination-prev">Précédent</button></li>
        <li><button class="ui-pagination-item active">1</button></li>
        <li><button class="ui-pagination-item">2</button></li>
        <li><button class="ui-pagination-item">3</button></li>
        <li><button class="ui-pagination-next">Suivant</button></li>
    </ul>
</div>
```

**Fonctionnalités :**
- Navigation intuitive avec boutons précédent/suivant
- Indicateurs de page actuelle
- Responsive design
- Accessibilité complète

### 📑 Tabs
Organisation du contenu en onglets avec navigation claire.

```html
<div class="ui-tabs">
    <ul class="ui-tab-list">
        <li><button class="ui-tab-button active">Onglet 1</button></li>
        <li><button class="ui-tab-button">Onglet 2</button></li>
        <li><button class="ui-tab-button">Onglet 3</button></li>
    </ul>
    <div class="ui-tab-content">
        <div class="ui-tab-panel active">Contenu de l'onglet 1</div>
        <div class="ui-tab-panel">Contenu de l'onglet 2</div>
        <div class="ui-tab-panel">Contenu de l'onglet 3</div>
    </div>
</div>
```

**Fonctionnalités :**
- Navigation par clavier (Tab, Arrow keys)
- Transitions fluides
- Support des icônes
- Design responsive

### 🔄 Switch/Toggle
Interrupteurs on/off avec variantes de taille et de style.

```html
<label class="ui-switch">
    <input type="checkbox" class="ui-switch-input">
    <div class="ui-switch-track">
        <div class="ui-switch-thumb"></div>
    </div>
    <span class="ui-switch-label">Notifications</span>
</label>
```

**Fonctionnalités :**
- Animations fluides
- Variantes de taille (S, M, L)
- Support des états disabled
- Accessibilité ARIA

### 📅 DatePicker
Sélecteur de date avec calendrier interactif et validation.

```html
<div class="ui-datepicker with-icon">
    <input type="text" class="ui-datepicker-input" placeholder="Sélectionner une date" readonly>
    <div class="ui-datepicker-icon"></div>
</div>
```

**Fonctionnalités :**
- Calendrier avec navigation mensuelle
- Sélection de date avec validation
- Support des dates min/max
- Icônes intégrées
- Responsive design

### 📊 DataTable
Tableaux de données avancés avec tri, recherche et actions.

```html
<div class="ui-datatable striped">
    <div class="ui-datatable-header">
        <h3 class="ui-datatable-title">Titre du Tableau</h3>
        <div class="ui-datatable-search">
            <input type="text" placeholder="Rechercher...">
        </div>
    </div>
    <table class="ui-datatable-table">
        <!-- En-têtes et données -->
    </table>
    <div class="ui-datatable-footer">
        <div class="ui-datatable-info">X élément(s) affiché(s)</div>
    </div>
</div>
```

**Fonctionnalités :**
- Tri des colonnes
- Recherche globale
- Actions avec icônes EQUITECH
- Pagination intégrée
- Design responsive
- Variantes (striped, bordered)

---

## 🚀 Installation et Utilisation

### Installation

1. **Importer les styles SCSS :**
```scss
@use 'path/to/ui-library/index.scss';
```

2. **Ou importer les composants individuellement :**
```scss
@use 'path/to/ui-library/tools/_sass_variables.scss';
@use 'path/to/ui-library/Button/Button.scss';
@use 'path/to/ui-library/Card/Card.scss';
// etc.
```

### Utilisation HTML

```html
<!-- Bouton principal -->
<button class="ui-button primary">Action Principale</button>

<!-- Carte avec header -->
<div class="ui-card with-header">
    <div class="ui-card-header">Titre de la Carte</div>
    <div class="ui-card-content">
        <p>Contenu de la carte</p>
    </div>
</div>

<!-- Input avec validation -->
<input type="text" class="ui-input success" placeholder="Champ valide">

<!-- Alerte de succès -->
<div class="ui-alert success">
    <div class="ui-alert-content">Opération réussie !</div>
</div>
```

---

## 📋 Bonnes Pratiques

### 🏷️ Préfixe de Classes
Toutes les classes utilisent le préfixe `ui-` pour éviter les conflits :
- ✅ `ui-button`
- ✅ `ui-card`
- ❌ `button`
- ❌ `card`

### 📱 Design Responsive
- Utilisez les classes de grille pour les layouts
- Testez sur mobile, tablette et desktop
- Respectez les breakpoints définis

### ♿ Accessibilité
- Utilisez les attributs ARIA appropriés
- Assurez un contraste suffisant
- Testez avec des lecteurs d'écran
- Utilisez des focus states visibles

### ⚡ Performance
- Importez uniquement les composants nécessaires
- Utilisez les variables CSS pour la cohérence
- Optimisez les images et icônes SVG

### 🆕 Nouveaux Composants P1
- **Pagination** : Utilisez les classes `ui-pagination-*` pour la cohérence
- **Tabs** : Structure avec `ui-tabs`, `ui-tab-list`, `ui-tab-button`, `ui-tab-content`, `ui-tab-panel`
- **Switch** : Label avec `ui-switch`, input caché, et éléments visuels `ui-switch-track` et `ui-switch-thumb`
- **DatePicker** : Wrapper `ui-datepicker`, input `ui-datepicker-input`, et calendrier `ui-datepicker-calendar`
- **DataTable** : Container `ui-datatable`, header avec recherche, table avec classes `ui-datatable-*`, et footer

---

## 🎨 Personnalisation

### Variables SCSS
Modifiez les variables dans `tools/_sass_variables.scss` :

```scss
// Couleurs principales
$primary-green: #2BA985;
$secondary-teal: #0C3640;
$primary-dark: #1A2A38;

// Typographie
$font-title: 'Josefin Sans', sans-serif;
$font-body: 'Inter', sans-serif;

// Espacement
$spacing-m: 1rem;
$spacing-l: 1.5rem;
```

### Mixins Utiles
Utilisez les mixins dans `tools/_mixins.scss` :

```scss
@include mx.transition(all, 0.3s, ease);
@include mx.shadow('m');
@include mx.mobile { /* styles mobile */ }
```

---

## 📚 Documentation des Composants

Chaque composant dispose de sa propre documentation détaillée dans son dossier :
- `Button/README.md` - Boutons et actions
- `Card/README.md` - Conteneurs de contenu
- `Input/README.md` - Champs de saisie
- `Alert/README.md` - Notifications et alertes
- Et bien plus encore...

### 📖 Exemples d'utilisation
Chaque composant inclut :
- Exemples de code HTML/JSX
- Props et options disponibles
- Cas d'usage courants
- Bonnes pratiques d'accessibilité
- Personnalisation avancée

---

## 🤝 Contribution

Nous accueillons les contributions de la communauté EQUITECH ! Voici comment participer :

### 📋 Guidelines
1. **Respectez la charte graphique EQUITECH**
2. **Utilisez le préfixe `ui-` pour toutes les classes**
3. **Documentez les nouveaux composants**
4. **Testez sur différents navigateurs**
5. **Suivez les bonnes pratiques d'accessibilité**

### 🔧 Processus de développement
1. Créez une branche pour votre fonctionnalité
2. Développez en respectant les standards
3. Testez sur mobile et desktop
4. Documentez vos changements
5. Soumettez une pull request

### 🧪 Tests
- Testez sur Chrome, Firefox, Safari, Edge
- Vérifiez l'accessibilité avec les outils appropriés
- Validez le responsive design
- Testez les performances

---

## 📄 Licence

Cette bibliothèque est propriétaire d'**EQUITECH**. Tous droits réservés.

---

## 🆘 Support

Besoin d'aide ? Contactez notre équipe de développement :
- 📧 Email : contact@equitech.onl
- 📱 Slack : #ui-library
- 📚 Documentation : [docs.equitech.onl](https://docs.equitech.onl)

---

*Développé avec ❤️ par l'équipe EQUITECH* 