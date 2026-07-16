# @equitech-dev/ui-library

Librairie UI propriétaire Equitech — composants React + SCSS.

**Stratégie produit & intégration ManageMates :**  
`../docs/design/README.md` · `../docs/design/AUDIT_PHASE_LIB.md` · ADR-0012

---

## Développement local (avec ManageMates V1)

```bash
npm install          # déclenche prepare → compile-sass
npm run build        # SCSS + JSX (babel)
```

Le dashboard consomme ce dossier via :

```json
"@equitech-dev/ui-library": "file:../ui-librairy"
```

### Import recommandé (éviter le barrel)

```tsx
import { Button } from '@equitech-dev/ui-library/Button';
import '@equitech-dev/ui-library/index.css';
```

Ne pas importer depuis `@equitech-dev/ui-library` seul — le barrel charge tous les composants (deps manquantes type `prop-types`).

---

## Structure

- `Button/`, `Modal/`, … — composant + SCSS + JSX/JS
- `tools/` — tokens SCSS (`_sass_variables.scss`, `_css_variables.scss`)
- `index.scss` → `index.css` (généré, ne pas committer sans build)
- `docs-app/` — app doc React (Storybook futur)

---

## Publication

```bash
npm run build
npm publish   # GitHub Packages @equitech-dev/ui-library
```

Repo git : `equitech-dev/ui-librairy` (nom historique — package npm `ui-library`).
