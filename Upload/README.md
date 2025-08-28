# Upload Component

Composant de téléchargement de fichiers avec support du drag & drop, validation et progression.

## Utilisation

```jsx
import { Upload } from 'ui-library';

function MyComponent() {
  const handleFileSelect = (files, fileList) => {
    console.log('Fichiers sélectionnés:', files);
  };

  const handleUploadComplete = (files) => {
    console.log('Upload terminé:', files);
  };

  return (
    <Upload
      title="Glissez vos fichiers ici"
      description="ou cliquez pour sélectionner"
      accept=".pdf,.doc,.docx"
      multiple={true}
      maxSize={5 * 1024 * 1024} // 5MB
      onFileSelect={handleFileSelect}
      onUploadComplete={handleUploadComplete}
    />
  );
}
```

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `title` | `string` | `"Glissez vos fichiers ici"` | Titre affiché dans la zone de téléchargement |
| `description` | `string` | `"ou cliquez pour sélectionner"` | Description affichée sous le titre |
| `accept` | `string` | - | Types de fichiers acceptés (ex: ".pdf,.doc,image/*") |
| `multiple` | `boolean` | `false` | Permet la sélection de plusieurs fichiers |
| `maxSize` | `number` | - | Taille maximale par fichier en bytes |
| `maxFiles` | `number` | - | Nombre maximum de fichiers |
| `disabled` | `boolean` | `false` | Désactive le composant |
| `onFileSelect` | `function` | - | Callback appelé lors de la sélection de fichiers |
| `onFileRemove` | `function` | - | Callback appelé lors de la suppression d'un fichier |
| `onUploadComplete` | `function` | - | Callback appelé à la fin de l'upload |
| `onError` | `function` | - | Callback appelé en cas d'erreur |
| `className` | `string` | `""` | Classe CSS personnalisée |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Taille du composant |
| `variant` | `'default' \| 'bordered' \| 'rounded' \| 'compact'` | `'default'` | Variante de style |
| `showProgress` | `boolean` | `true` | Affiche la barre de progression |
| `showFileList` | `boolean` | `true` | Affiche la liste des fichiers |
| `customIcon` | `node` | - | Icône personnalisée |
| `children` | `node` | - | Contenu personnalisé dans la zone |

## Variantes

### Tailles

```jsx
<Upload size="small" />
<Upload size="medium" />
<Upload size="large" />
```

### Styles

```jsx
<Upload variant="default" />
<Upload variant="bordered" />
<Upload variant="rounded" />
<Upload variant="compact" />
```

## Exemples

### Upload simple

```jsx
<Upload
  title="Télécharger un document"
  description="Formats acceptés: PDF, DOC, DOCX"
  accept=".pdf,.doc,.docx"
/>
```

### Upload multiple avec validation

```jsx
<Upload
  title="Télécharger des images"
  description="Maximum 5 images, 2MB chacune"
  accept="image/*"
  multiple={true}
  maxFiles={5}
  maxSize={2 * 1024 * 1024}
  onFileSelect={(files) => console.log('Sélection:', files)}
  onError={(error) => console.error('Erreur:', error)}
/>
```

### Upload avec contenu personnalisé

```jsx
<Upload
  title="Télécharger votre CV"
  description="Format PDF uniquement"
  accept=".pdf"
>
  <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
    <h4>Conseils pour votre CV</h4>
    <ul>
      <li>Utilisez un format PDF</li>
      <li>Limitez à 2 pages maximum</li>
      <li>Incluez vos expériences récentes</li>
    </ul>
  </div>
</Upload>
```

### Upload avec icône personnalisée

```jsx
<Upload
  title="Télécharger des photos"
  customIcon={
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21,15 16,10 5,21" />
    </svg>
  }
  accept="image/*"
/>
```

## États des fichiers

Le composant gère plusieurs états pour chaque fichier :

- **pending** : Fichier sélectionné, en attente d'upload
- **uploading** : Fichier en cours d'upload (avec progression)
- **success** : Upload réussi
- **error** : Erreur lors de l'upload

## Validation

Le composant valide automatiquement :

- **Type de fichier** : Selon la prop `accept`
- **Taille** : Selon la prop `maxSize`
- **Nombre** : Selon la prop `maxFiles`

## Accessibilité

- Support complet du clavier
- Messages d'erreur clairs
- Indicateurs visuels pour les états
- Support des lecteurs d'écran

## Notes techniques

- Le composant utilise un input file caché pour la compatibilité
- Support complet du drag & drop natif
- Gestion automatique des erreurs de validation
- Simulation d'upload incluse (à remplacer par votre logique)
- Responsive design intégré


