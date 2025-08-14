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
- :link: [Grid](/ui-library/Grid/README.md) - Système de grille responsive
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

## :muscle: Bonnes pratiques
- **Ne pas ajouter de logique métier dans la librairie**
- **Préfixer les classes** pour éviter les collisions
- **Documenter la distinction générique/métier**
- **Utiliser CSS Modules stricts en React**
- **Utiliser le global uniquement pour HTML natif/JS**
- **Utiliser les utilitaires et styles de base centralisés**
- **Respecter l'accessibilité** (ARIA, navigation clavier, lecteurs d'écran)
- **Tester sur tous les breakpoints** (mobile first)

---

## 📝 Contribution
- Ajoutez un nouveau composant dans un dossier dédié avec :
  - `MonComposant.jsx`
  - `MonComposant.module.scss`
  - `README.md`
- Documentez systématiquement l'API et l'accessibilité
- Ajoutez l'import dans `index.scss` si le composant est universel

---

## 📖 Ressources & apprentissage
- [Documentation SASS officielle](https://sass-lang.com/documentation/)
- [Design tokens](https://design-tokens.github.io/community-group/format/)
- [Accessibilité web (WAI-ARIA)](https://www.w3.org/WAI/standards-guidelines/aria/)
- [React best practices](https://react.dev/learn)
- [CSS Modules](https://github.com/css-modules/css-modules)

---

> **Vous savez tout, bon dev ! :muscle:** 