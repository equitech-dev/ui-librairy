# Loading

Composant d'indicateur de chargement avancé avec plusieurs variantes d'animation et de styles.

## Utilisation

```jsx
import { Loading } from 'ui-library';

// Exemple simple
<Loading variant="spinner" />

// Exemple avec texte
<Loading variant="dots" text="Chargement en cours..." />

// Exemple avec progression
<Loading variant="spinner" progress={75} showProgress />

// Exemple d'overlay
<Loading.Overlay isVisible={true} text="Traitement en cours..." />
```

## Composants

### Loading (Base)
Composant de base pour les indicateurs de chargement.

```jsx
<Loading variant="spinner" size="large" color="primary" />
```

### Loading.Container
Container pour wrapper le loading avec espacement et layout.

```jsx
<Loading.Container variant="overlay" text="Chargement...">
  <div>Contenu en cours de chargement</div>
</Loading.Container>
```

### Loading.Overlay
Overlay plein écran pour les chargements globaux.

```jsx
<Loading.Overlay 
  isVisible={isLoading} 
  text="Sauvegarde en cours..." 
  progress={saveProgress}
  showProgress
/>
```

### Loading.Button
Bouton avec état de chargement intégré.

```jsx
<Loading.Button 
  loading={isSubmitting} 
  loadingText="Envoi..."
  onClick={handleSubmit}
>
  Envoyer
</Loading.Button>
```

### Loading.Progress
Barre de progression avec animation.

```jsx
<Loading.Progress 
  progress={uploadProgress} 
  text={`${uploadProgress}% téléchargé`}
/>
```

## Props

### Loading (Base)
| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `variant` | `'spinner' \| 'dots' \| 'pulse' \| 'wave' \| 'ring' \| 'cube' \| 'heartbeat'` | `'spinner'` | Type d'animation |
| `size` | `'default' \| 'small' \| 'large'` | `'default'` | Taille du loading |
| `color` | `'primary' \| 'secondary' \| 'white'` | `'primary'` | Couleur du loading |
| `text` | `string` | - | Texte à afficher |
| `progress` | `number` | - | Pourcentage de progression (0-100) |
| `showProgress` | `boolean` | `false` | Afficher la barre de progression |
| `className` | `string` | `''` | Classe CSS personnalisée |
| `style` | `object` | `{}` | Styles inline personnalisés |

### Loading.Container
| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `node` | - | Contenu à wrapper |
| `variant` | `'default' \| 'overlay' \| 'inline' \| 'minimal'` | `'default'` | Type de container |
| `size` | `'default' \| 'small' \| 'large'` | `'default'` | Taille du loading |
| `text` | `string` | - | Texte à afficher |
| `progress` | `number` | - | Pourcentage de progression |
| `showProgress` | `boolean` | `false` | Afficher la barre de progression |
| `className` | `string` | `''` | Classe CSS personnalisée |
| `style` | `object` | `{}` | Styles inline personnalisés |

### Loading.Overlay
| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `isVisible` | `boolean` | `false` | Afficher l'overlay |
| `text` | `string` | `'Chargement...'` | Texte à afficher |
| `progress` | `number` | - | Pourcentage de progression |
| `showProgress` | `boolean` | `false` | Afficher la barre de progression |
| `onClose` | `function` | - | Callback de fermeture |
| `className` | `string` | `''` | Classe CSS personnalisée |
| `style` | `object` | `{}` | Styles inline personnalisés |

### Loading.Button
| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `node` | **requis** | Contenu du bouton |
| `loading` | `boolean` | `false` | État de chargement |
| `loadingText` | `string` | `'Chargement...'` | Texte pendant le chargement |
| `variant` | `string` | `'spinner'` | Type d'animation |
| `size` | `'default' \| 'small' \| 'large'` | `'small'` | Taille du loading |
| `disabled` | `boolean` | `false` | Désactiver le bouton |
| `onClick` | `function` | - | Callback de clic |
| `className` | `string` | `''` | Classe CSS personnalisée |
| `style` | `object` | `{}` | Styles inline personnalisés |

### Loading.Progress
| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `progress` | `number` | `0` | Pourcentage de progression (0-100) |
| `text` | `string` | - | Texte à afficher |
| `showText` | `boolean` | `true` | Afficher le texte |
| `size` | `'default' \| 'small' \| 'large'` | `'default'` | Taille de la barre |
| `color` | `'primary' \| 'secondary' \| 'white'` | `'primary'` | Couleur de la barre |
| `className` | `string` | `''` | Classe CSS personnalisée |
| `style` | `object` | `{}` | Styles inline personnalisés |

## Variantes

### Types d'animation
- `spinner` : Spinner rotatif classique
- `dots` : Trois points qui pulsent
- `pulse` : Cercle qui pulse
- `wave` : Barres qui ondulent
- `ring` : Anneau rotatif
- `cube` : Cube 3D qui tourne
- `heartbeat` : Cercle qui bat

### Tailles
- `small` : Petite taille (24px)
- `default` : Taille standard (40px)
- `large` : Grande taille (60px)

### Couleurs
- `primary` : Couleur primaire EQUITECH
- `secondary` : Couleur secondaire EQUITECH
- `white` : Couleur blanche

### Types de container
- `default` : Container standard
- `overlay` : Overlay plein écran
- `inline` : Container en ligne
- `minimal` : Container minimal

## Exemples d'utilisation

### Chargement de page
```jsx
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  // Simuler un chargement
  setTimeout(() => setIsLoading(false), 2000);
}, []);

return (
  <>
    {isLoading && (
      <Loading.Overlay 
        isVisible={true} 
        text="Chargement de la page..." 
      />
    )}
    <div>Contenu de la page</div>
  </>
);
```

### Upload de fichier
```jsx
const [uploadProgress, setUploadProgress] = useState(0);

const handleUpload = async (file) => {
  // Simuler un upload
  for (let i = 0; i <= 100; i += 10) {
    setUploadProgress(i);
    await new Promise(resolve => setTimeout(resolve, 200));
  }
};

return (
  <div>
    <Loading.Progress 
      progress={uploadProgress} 
      text={`${uploadProgress}% téléchargé`}
    />
    <input type="file" onChange={(e) => handleUpload(e.target.files[0])} />
  </div>
);
```

### Formulaire avec validation
```jsx
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (data) => {
  setIsSubmitting(true);
  try {
    await submitForm(data);
  } finally {
    setIsSubmitting(false);
  }
};

return (
  <form onSubmit={handleSubmit}>
    {/* Champs du formulaire */}
    <Loading.Button 
      loading={isSubmitting} 
      loadingText="Envoi en cours..."
      type="submit"
    >
      Envoyer
    </Loading.Button>
  </form>
);
```

### Liste avec skeleton
```jsx
const [isLoading, setIsLoading] = useState(true);
const [items, setItems] = useState([]);

useEffect(() => {
  fetchItems().then(data => {
    setItems(data);
    setIsLoading(false);
  });
}, []);

return (
  <div>
    {isLoading ? (
      <Loading.Container text="Chargement des éléments...">
        <Skeleton.Group layout="vertical">
          {Array.from({ length: 5 }, (_, i) => (
            <Skeleton variant="list-item" key={i} />
          ))}
        </Skeleton.Group>
      </Loading.Container>
    ) : (
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    )}
  </div>
);
```

### Différents types d'animation
```jsx
<div style={{ display: 'flex', gap: 'var(--spacing-l)', alignItems: 'center' }}>
  <Loading variant="spinner" />
  <Loading variant="dots" />
  <Loading variant="pulse" />
  <Loading variant="wave" />
  <Loading variant="ring" />
  <Loading variant="cube" />
  <Loading variant="heartbeat" />
</div>
```

## Accessibilité

- Les animations respectent les préférences utilisateur (`prefers-reduced-motion`)
- Les textes de chargement sont accessibles aux lecteurs d'écran
- Les barres de progression utilisent les attributs ARIA appropriés
- Les boutons de chargement sont correctement désactivés pendant le traitement
