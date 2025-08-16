# 📚 DOCUMENTATION DE LA LIBRAIRIE UI - EQUITECH

## :link: Sommaire
 - :file_folder: [Architecture dossiers](#file_folder-architecture-dossiers)
 - :hammer: [Usage](#hammer-usage)
   - :computer: [Environnement de développement](#computer-environnement-de-développement)
   - :pager: [Environnement de production](#pager-environnement-de-production)
   - :clipboard: [Méthodologie](#clipboard-méthodologie)
 - :mortar_board: [Composants disponibles](#mortar_board-composants-disponibles)
   - :baby: [Composants de base](#baby-composants-de-base)
   - :older_man: [Composants avancés](#olderman-composants-avancés)
 - :rocket: [Installation et déploiement](#rocket-installation-et-déploiement)
 - :art: [Système de design](#art-système-de-design)
 - :muscle: [Bonnes pratiques](#muscle-bonnes-pratiques)

---

## :file_folder: Architecture dossiers
- :open_file_folder: [ui-library](/ui-library)
  - :open_file_folder: [tools](/ui-library/tools)
    - :page_facing_up: [_mixins.scss](/ui-library/tools/_mixins.scss)
    - :page_facing_up: [_models.scss](/ui-library/tools/_models.scss)
    - :page_facing_up: [_sass_variables.scss](/ui-library/tools/_sass_variables.scss)
    - :page_facing_up: [generic.scss](/ui-library/tools/generic.scss)
    - :page_facing_up: [variables.scss](/ui-library/tools/variables.scss)
    - :page_facing_up: [base.scss](/ui-library/tools/base.scss)
  - :open_file_folder: [composants](/ui-library)
    - :page_facing_up: [Button/README.md](/ui-library/Button/README.md)
    - :page_facing_up: [Header/README.md](/ui-library/Header/README.md)
    - :page_facing_up: [Footer/README.md](/ui-library/Footer/README.md)
    - :page_facing_up: [Section/README.md](/ui-library/Section/README.md)
    - :page_facing_up: [Grid/README.md](/ui-library/Grid/README.md)
    - :page_facing_up: [Card/README.md](/ui-library/Card/README.md)
    - :page_facing_up: [Input/README.md](/ui-library/Input/README.md)
    - :page_facing_up: [Select/README.md](/ui-library/Select/README.md)
    - :page_facing_up: [Textarea/README.md](/ui-library/Textarea/README.md)
    - :page_facing_up: [Checkbox/README.md](/ui-library/Checkbox/README.md)
    - :page_facing_up: [RadioButton/README.md](/ui-library/RadioButton/README.md)
    - :page_facing_up: [Loader/README.md](/ui-library/Loader/README.md)
    - :page_facing_up: [Modal/README.md](/ui-library/Modal/README.md)
    - :page_facing_up: [Alert/README.md](/ui-library/Alert/README.md)
    - :page_facing_up: [Badge/README.md](/ui-library/Badge/README.md)
    - :page_facing_up: [Tooltip/README.md](/ui-library/Tooltip/README.md)
    - :page_facing_up: [Separator/README.md](/ui-library/Separator/README.md)
    - :page_facing_up: [Carousel/README.md](/ui-library/Carousel/README.md)
    - :page_facing_up: [Gallery/README.md](/ui-library/Gallery/README.md)
    - :page_facing_up: [MapEmbed/README.md](/ui-library/MapEmbed/README.md)
    - :page_facing_up: [ParallaxSection/README.md](/ui-library/ParallaxSection/README.md)
  - :page_facing_up: [index.scss](/ui-library/index.scss) ← **Point d'entrée unique**
  - :page_facing_up: [index.js](/ui-library/index.js)
  - :page_facing_up: [index.css](/ui-library/index.css) ← **CSS compilé**

---

## :hammer: Usage

<sup>Si vous n'avez pas connaissance de React et/ou de la structure de composants utilisée au sein d'Equitech merci de vous référer à la section [Composants disponibles](#mortar_board-composants-disponibles).</sup>

### :computer: Environnement de développement
Lors du processus de développement de vos composants et afin d'avoir une compilation automatique de tous vos styles, 
dans un terminal, à la racine du projet ui-library exécutez la commande :
```bash
npm run compile-sass
```

### :pager: Environnement de production
Avant la mise en production de votre composant et afin d'uploader un travail optimisé, exécutez la commande :
```bash
npm run build
```

### :clipboard: Méthodologie
- Il est important de respecter la structure des fichiers afin de profiter de la compilation automatique.
- Le fichier :page_facing_up: [index.scss](/ui-library/index.scss) est le **point d'entrée unique** et doit comporter tous les imports nécessaires.
- Le dossier :open_file_folder: [tools](/ui-library/tools) **ne doit pas être modifié**, sauf exception, uniquement des ajouts si nécessaires.
- Le développement des composants se fait en **mobile first**, les breakpoints utilisés sont :
  - **tablette** : `@media screen and (425px <= width <= 1024px){ ... }`
  - **desktop** : `@media screen and (width >= 1025px){ ... }`

---

## :mortar_board: Composants disponibles

### :baby: Composants de base
- :link: [Button](/ui-library/Button/README.md) - Bouton universel, accessible et personnalisable
- :link: [Input](/ui-library/Input/README.md) - Champ de saisie texte standard
- :link: [Checkbox](/ui-library/Checkbox/README.md) - Case à cocher accessible
- :link: [RadioButton](/ui-library/RadioButton/README.md) - Bouton radio accessible
- :link: [Select](/ui-library/Select/README.md) - Liste déroulante personnalisable
- :link: [Textarea](/ui-library/Textarea/README.md) - Zone de texte multi-lignes
- :link: [Card](/ui-library/Card/README.md) - Conteneur de contenu stylisé
- :link: [Separator](/ui-library/Separator/README.md) - Séparateur visuel flexible

### :older_man: Composants avancés
- :link: [Header](/ui-library/Header/README.md) - En-tête universel et personnalisable
- :link: [Footer](/ui-library/Footer/README.md) - Pied de page universel
- :link: [Section](/ui-library/Section/README.md) - Section de contenu avec espacement
- :link: [Grid](/ui-library/Grid/README.md) - Système de grille responsive avec fonctionnalités avancées (drag & drop, resize, repositionnement intelligent)
- :link: [Modal](/ui-library/Modal/README.md) - Fenêtre modale accessible
- :link: [Alert](/ui-library/Alert/README.md) - Message d'alerte contextuel
- :link: [Badge](/ui-library/Badge/README.md) - Badge d'information
- :link: [Tooltip](/ui-library/Tooltip/README.md) - Info-bulle contextuelle
- :link: [Loader](/ui-library/Loader/README.md) - Indicateur de chargement
- :link: [Carousel](/ui-library/Carousel/README.md) - Carrousel d'images
- :link: [Gallery](/ui-library/Gallery/README.md) - Galerie d'images responsive
- :link: [MapEmbed](/ui-library/MapEmbed/README.md) - Intégration de carte
- :link: [ParallaxSection](/ui-library/ParallaxSection/README.md) - Section avec effet parallax

---

## :rocket: Installation et déploiement

### Installation locale (développement)
```bash
# Dans le projet qui utilise la librairie
npm install file:./ui-library
```

### Installation depuis npm (production)
```bash
npm install @equitech/ui-library
```

### Utilisation dans votre projet
```jsx
// Import des composants
import { Button, Header, Footer } from '@equitech/ui-library';

// Import des styles (automatique avec le composant)
// Pas besoin d'importer manuellement le CSS
```

### Compilation des styles
```bash
# Dans le dossier ui-library
npm run compile-sass
```

---

## :art: Système de design

### 🎨 Classes CSS avec préfixe `ui-`

Tous les composants utilisent le préfixe `ui-` pour éviter les conflits de noms dans les projets consommateurs :

```scss
// Exemples de classes
.ui-button { /* ... */ }
.ui-button.primary { /* ... */ }
.ui-button.s { /* ... */ }

.ui-input { /* ... */ }
.ui-input:focus { /* ... */ }

.ui-modal { /* ... */ }
.ui-overlay { /* ... */ }
```

### 🎯 Variables SASS disponibles

```scss
// Couleurs principales
$primary_color: #0070f3;
$secondary_color: #242323;
$valid_color: #36A12D;
$warning_color: #BF3232;
$info_color: #5E8CB7;
$error_color: #D32F2F;

// Couleurs neutres
$white: #FCFFFF;
$light_grey: #989898;
$grey: #595959;
$black: #242323;

// Tailles de police
$size_txt_xs: 0.75em;  // Très petit texte
$size_txt_s: 0.9em;    // Petit texte
$size_txt_m: 1em;      // Texte standard
$size_title_s: 1.4em;  // Petit titre
$size_title_m: 1.6em;  // Titre moyen
$size_title_l: 1.8em;  // Grand titre

// Espacements
$flex_gap_s: 10px;
$flex_gap: 20px;
$flex_gap_l: 50px;

// Rayons de bordure
$radius_s: 4px;
$radius_m: 8px;
```

### 🎨 Classes utilitaires (generic.scss)

#### **Display & Positioning**
```scss
.ui-block { display: block; }
.ui-flex { display: flex; }
.ui-grid { display: grid; }
.ui-none { display: none; }

.ui-absolute { position: absolute; }
.ui-relative { position: relative; }
.ui-fixed { position: fixed; }
.ui-sticky { position: sticky; }

.ui-top-0, .ui-bottom-0, .ui-left-0, .ui-right-0 { /* positioning */ }
.ui-transform-center { transform: translate(-50%, -50%); }
```

#### **Sizing & Overflow**
```scss
.ui-w-100 { width: 100%; }
.ui-w-fit { width: fit-content; }
.ui-h-auto { height: auto; }

.ui-overflow-hidden { overflow: hidden; }
.ui-overflow-auto { overflow: auto; }
.ui-overflow-x-auto { overflow-x: auto; }
```

#### **Flexbox & Grid**
```scss
.ui-flex-col { flex-direction: column; }
.ui-flex-row { flex-direction: row; }
.ui-flex-wrap { flex-wrap: wrap; }

.ui-justify-center { justify-content: center; }
.ui-justify-between { justify-content: space-between; }
.ui-items-center { align-items: center; }

.ui-gap-s { gap: 10px; }
.ui-gap-m { gap: 20px; }
.ui-gap-l { gap: 50px; }

.ui-grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.ui-grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
```

#### **Visual Styles**
```scss
.ui-rounded { border-radius: 2000px; }
.ui-rounded-s { border-radius: 4px; }
.ui-rounded-m { border-radius: 8px; }

.ui-border-none { border: none; }
.ui-border-s { border: 1px solid #595959; }
.ui-border-top { border-top: 1px solid #595959; }

.ui-shadow { box-shadow: 0 10px 20px #0000000d; }
```

#### **Backgrounds & Colors**
```scss
.ui-bg-white { background: #FCFFFF; }
.ui-bg-black { background: #242323; }
.ui-bg-primary { background: #0070f3; }
.ui-bg-success { background: #36A12D; }
.ui-bg-warning { background: #BF3232; }
.ui-bg-error { background: #D32F2F; }

.ui-text-white { color: #FCFFFF; }
.ui-text-black { color: #242323; }
.ui-text-primary { color: #0070f3; }
.ui-text-success { color: #36A12D; }
```

#### **Typography**
```scss
.ui-font-normal { font-weight: 400; }
.ui-font-semibold { font-weight: 600; }
.ui-font-bold { font-weight: 800; }

.ui-text-center { text-align: center; }
.ui-text-left { text-align: left; }
.ui-text-right { text-align: end; }

.ui-text-xs { font-size: 0.75em; }
.ui-text-s { font-size: 0.9em; }
.ui-text-m { font-size: 1em; }
.ui-title-s { font-size: 1.4em; }
.ui-title-m { font-size: 1.6em; }
.ui-title-l { font-size: 1.8em; }
```

#### **Spacing & Interactivity**
```scss
.ui-m-0 { margin: 0; }
.ui-p-0 { padding: 0; }
.ui-p-s { padding: 5px; }

.ui-cursor-pointer { cursor: pointer; }
.ui-opacity-50 { opacity: 50%; }

.ui-z-1, .ui-z-2, .ui-z-3, .ui-z-10, .ui-z-100, .ui-z-1000 { /* z-index */ }
```

#### **Responsive Utilities**
```scss
.ui-tablet-hidden { display: none; } /* @media (425px <= width <= 1024px) */
.ui-desktop-hidden { display: none; } /* @media (width >= 1025px) */
```

#### **Accessibility**
```scss
.ui-sr-only {
  /* Screen reader only - masque visuellement mais accessible aux lecteurs d'écran */
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### 📱 Responsive Design

```scss
// Breakpoints
@media screen and (425px <= width <= 1024px) {
  // Styles tablette
}

@media screen and (width >= 1025px) {
  // Styles desktop
}
```

---

## :muscle: Bonnes pratiques
- **Ne pas ajouter de logique métier dans la librairie**
- **Utiliser le préfixe `ui-`** pour toutes les classes CSS
- **Documenter la distinction générique/métier**
- **Utiliser les variables SASS** pour la cohérence
- **Respecter l'accessibilité** (ARIA, navigation clavier, lecteurs d'écran)
- **Tester sur tous les breakpoints** (mobile first)
- **Utiliser les classes utilitaires** de `generic.scss` quand possible

---

## 📝 Contribution
- Ajoutez un nouveau composant dans un dossier dédié avec :
  - `MonComposant.jsx`
  - `MonComposant.scss`
  - `README.md`
- Documentez systématiquement l'API et l'accessibilité
- Ajoutez l'import dans `index.scss` si le composant est universel
- Utilisez le préfixe `ui-` pour toutes les classes CSS

---

## 📖 Ressources & apprentissage
- [Documentation SASS officielle](https://sass-lang.com/documentation/)
- [Design tokens](https://design-tokens.github.io/community-group/format/)
- [Accessibilité web (WAI-ARIA)](https://www.w3.org/WAI/standards-guidelines/aria/)
- [React best practices](https://react.dev/learn)
- [CSS Modules](https://github.com/css-modules/css-modules)

---

> **Vous savez tout, bon dev ! :muscle:** 