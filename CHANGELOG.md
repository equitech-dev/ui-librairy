# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

## [2.5.0] - 2026-09-17

### T1 — Loader
- Composant React `Loader` publié (`@equitech-dev/ui-library/Loader`) : spinner, tailles `s` / `m`, label optionnel, `prefers-reduced-motion`. Pas d’overlay, pas de skeleton.

## [2.4.0] - 2026-09-17

### T1 — Tabs
- Composant React `Tabs` publié (`@equitech-dev/ui-library/Tabs`) : chips / segmented, panneaux toujours montés, `useOptionalTabsActiveTab`. Pas de routing, pas de TaskBar.

### T1 — Select
- Listbox (Radix interne) : trigger aligné `.ui-modal-control`, panneau type popover. `multiple` reste un `<select>` natif.

## [2.3.0] - 2026-09-17

### T1 — Select
- Composant React `Select` publié (`@equitech-dev/ui-library/Select`) : `<select>` natif, `options` ou `children`, placeholder. Pas de Radix, pas de métier ERP.

## [2.2.0] - 2026-09-16

### T1 — Table
- Composant React `Table` publié (`@equitech-dev/ui-library/Table`) : scroller, thead sticky, cellules alignables.
- `TableSkeleton` : mêmes colonnes, barres shimmer. Pas de DataTable legacy, pas de métier stocks.

## [2.1.0] - 2026-09-09

### T1 — Modal
- Composant React `Modal` publié (`@equitech-dev/ui-library/Modal`) : overlay, panneau, titre, fermeture, Escape.
- Tailles `sm` / `md` / `wide`. Classes de contenu : `ui-modal-form`, `ui-modal-field`, `ui-modal-label`, `ui-modal-control`, `ui-modal-actions`.
- Coquille alignée sur les fiches produit ManageMates (pas de Radix exposé au consommateur).

## [1.1.0] - 2025-01-29

### 🎨 Améliorations de Style
- **Refonte complète du système de variables CSS** : Création d'un système unifié de variables CSS pour une cohérence parfaite
- **Composants modernisés** : Accordion, Stepper, Popover, RangeSlider, TimePicker, Overlay, Drawer
- **Style épuré** : Réduction des ombres excessives et du glassmorphism pour un design plus minimaliste
- **Charte graphique EQUITECH** : Alignement parfait avec l'identité visuelle de la marque

### 🔧 Corrections Techniques
- **Fix du composant Drawer** : Résolution du problème d'affichage au clic
- **Système de variables CSS unifié** : Élimination des conflits de style et des incohérences
- **Optimisation des performances** : Réduction des re-renders et amélioration de la fluidité

### 📱 Documentation
- **Application React de documentation** : Nouvelle interface interactive moderne
- **Variables CSS synchronisées** : Documentation toujours à jour avec la librairie
- **Exemples interactifs** : Tous les composants testables directement dans la doc

### 🚀 Nouveaux Composants
- **Accordion** : Panneaux pliables avec animations fluides
- **Stepper** : Indicateur d'étapes avec variantes visuelles
- **Popover** : Infobulles contextuelles avancées
- **RangeSlider** : Curseur de plage interactif
- **TimePicker** : Sélecteur d'heure sophistiqué
- **Overlay** : Superposition avec effets de flou
- **Drawer** : Panneau latéral coulissant

### 🎯 Composants Optimisés
- **DataTable** : Performance améliorée pour les grandes listes
- **AdvancedGrid** : Gestion d'état optimisée avec useReducer
- **Calendar** : Cache des calculs de dates
- **ColorPicker** : Conversions de couleurs mémorisées
- **AdvancedDropdown** : Navigation clavier et focus management
- **Kanban** : Support clavier complet et accessibilité ARIA

### 📦 Infrastructure
- **Système de build optimisé** : Compilation SCSS et JSX séparée
- **Variables CSS centralisées** : Fichier `_css_variables.scss` unifié
- **Compatibilité BEM** : Support des anciennes conventions de nommage
- **Tests automatisés** : Vérification de la compilation et des styles

---

## [1.0.15] - 2025-01-28

### 🔧 Corrections
- Corrections mineures de bugs
- Améliorations de la stabilité

---

## [1.0.0] - 2025-01-27

### 🎉 Version Initiale
- Première version stable de la librairie UI EQUITECH
- Composants de base (Button, Card, Input, Alert, etc.)
- Système de grille responsive
- Documentation complète 