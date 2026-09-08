# @equitech-dev/ui-library

Composants React typés + SCSS. Paquet GitHub Packages `@equitech-dev/ui-library`.

Doc consommation ManageMates : [UI_LIBRARY_INSTALLATION.md](../docs/implementation/UI_LIBRARY_INSTALLATION.md) · [UI_INTEGRATION.md](../docs/design/UI_INTEGRATION.md) · [ADR-0012](../docs/adr/0012-strategie-ui-design-system.md)

## Build

```bash
npm ci
npm run build    # tsup (JS/types) + sass → dist/
```

v2 publie **9 composants** (Button, Badge, Card, Alert, Input, Textarea, Checkbox, RadioButton, Switch). Le reste du repo (JSX legacy) alimente encore le CSS global, il n’est pas exporté.

```tsx
import { Button } from '@equitech-dev/ui-library/Button'
import '@equitech-dev/ui-library/dist/index.css'
```

Le dashboard **ne** pointe **plus** `file:../ui-librairy`. Mode local : `npm run dev:local-ui` côté dashboard.

## Publication

Bumper `package.json`, merger `main`. Le workflow GitHub publie si la version n’existe pas déjà. Relance : Actions → `workflow_dispatch`.
