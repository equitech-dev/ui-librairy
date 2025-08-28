# Documentation UI Library EQUITECH

## 🌐 Accès à la Documentation

La documentation interactive de la UI Library EQUITECH est disponible en ligne :

**URL :** https://equitech-dev.github.io/ui-library/

## 📋 Contenu de la Documentation

La documentation inclut :

### 🚀 Introduction
- Guide de démarrage
- Système de design (couleurs, typographie)
- Guide d'installation

### 🧩 Composants P1 (Priorité 1)
- **Boutons** : Variantes, tailles, états
- **Cartes** : Layouts, styles, interactions
- **Champs de saisie** : Types, validation, états
- **Alertes** : Types, styles, actions
- **Pagination** : Navigation, tailles
- **Onglets** : Navigation, contenus
- **Interrupteur** : États, animations
- **Sélecteur de date** : Calendrier, formats
- **Tableau de données** : Tri, filtrage, pagination

### 🧭 Composants P2 - Navigation
- **Fil d'Ariane** : Navigation hiérarchique
- **Accordéon** : Contenu pliable
- **Étapes** : Processus multi-étapes

### 💬 Composants P2 - Feedback
- **Popover** : Informations contextuelles
- **Skeleton** : États de chargement
- **Chargement** : Indicateurs de progression

### 📊 Composants P2 - Données
- **Progression** : Barres de progression
- **Évaluation** : Système de notation
- **Chronologie** : Événements temporels
- **Arborescence** : Structures hiérarchiques
- **Liste** : Affichage d'éléments
- **Calendrier** : Gestion d'événements
- **Kanban** : Tableaux de gestion

### 📝 Composants P2 - Formulaires
- **Upload** : Téléchargement de fichiers
- **Curseur** : Sélection de valeurs
- **Interrupteur avancé** : Options multiples
- **Menu déroulant** : Sélection avancée
- **Sélecteur d'heure** : Gestion temporelle
- **Sélecteur de couleur** : Choix de couleurs
- **Formulaire** : Conteneurs structurés
- **Groupe de champs** : Organisation sémantique

### 🏗️ Composants P2 - Layout
- **Tiroir** : Panneaux latéraux
- **Portail** : Rendu hors DOM
- **Superposition** : Couches d'interface

## 🔧 Développement Local

Pour tester la documentation localement :

1. **Cloner le repository**
   ```bash
   git clone https://github.com/equitech-dev/ui-library.git
   cd ui-library
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Compiler les styles**
   ```bash
   npm run compile-sass
   ```

4. **Ouvrir demo.html**
   - Ouvrez le fichier `demo.html` dans votre navigateur
   - Ou utilisez un serveur local :
     ```bash
     npx serve .
     ```

## 🚀 Déploiement

La documentation est automatiquement déployée sur GitHub Pages via GitHub Actions :

- **Déclenchement** : Push sur la branche `main`
- **Fichiers surveillés** : `demo.html`, `index.css`, `index.scss`, `tools/**`
- **Branche de déploiement** : `gh-pages`

### Configuration GitHub Pages

1. Aller dans **Settings** > **Pages**
2. **Source** : Deploy from a branch
3. **Branch** : `gh-pages` / `/(root)`
4. **Save**

## 📝 Mise à Jour

Pour mettre à jour la documentation :

1. Modifier le fichier `demo.html`
2. Commiter et pousser les changements
3. Le déploiement se fait automatiquement

## 🎨 Design System

La documentation suit le design system EQUITECH :

- **Couleurs** : Palette verte/teal simplifiée
- **Typographie** : Josefin Sans (titres) + Inter (texte)
- **Espacement** : Système cohérent de spacing
- **Ombres** : Hiérarchie visuelle claire
- **Transitions** : Animations fluides

## 📱 Responsive Design

La documentation est entièrement responsive :

- **Desktop** : Navigation latérale fixe
- **Tablet** : Adaptation automatique
- **Mobile** : Menu hamburger + navigation fluide

## 🔍 Fonctionnalités

- **Navigation fluide** : Scroll automatique vers les sections
- **Recherche visuelle** : Tous les composants visibles
- **Code examples** : Blocs de code syntaxés
- **Interactions** : Composants fonctionnels
- **Accessibilité** : Respect des standards WCAG


