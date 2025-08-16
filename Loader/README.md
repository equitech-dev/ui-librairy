# ⏳ Loader

Indicateur de chargement universel, accessible et personnalisable pour informer l'utilisateur d'un processus en cours.

## 📋 Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `className` | `string` | `''` | Classes CSS additionnelles |
| `aria-label` | `string` | `'Chargement en cours...'` | Label pour l'accessibilité |

## 🚀 Exemple d'utilisation

```jsx
import { Loader } from '@equitech/ui-library';
import { useState, useEffect } from 'react';

function MonComposant() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulation d'un chargement
    setTimeout(() => {
      setData({ message: 'Données chargées !' });
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <Loader aria-label="Chargement des données utilisateur" />
        <p>Veuillez patienter...</p>
      </div>
    );
  }

  return <div>{data.message}</div>;
}

// Utilisation simple
function BoutonAvecLoader() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    // Simulation d'une action
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? <Loader /> : 'Soumettre'}
    </button>
  );
}
```

## ♿ Accessibilité

- **Rôle `status`** : Identifie l'élément comme un indicateur de statut
- **Support des lecteurs d'écran** : Le label est annoncé automatiquement
- **Animation accessible** : Respect des préférences de réduction de mouvement
- **Contraste élevé** : Visibilité optimale sur tous les écrans

## 🎨 Personnalisation

Le loader utilise les classes CSS suivantes pour la personnalisation :
- `.loader` : Conteneur principal
- `.spinner` : Élément animé

```scss
// Exemple de personnalisation
.loader {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  .spinner {
    width: 20px;
    height: 20px;
    border: 2px solid #e5e7eb;
    border-top: 2px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

// Variante avec réduction de mouvement
@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
    border-top-color: transparent;
  }
}
```

## 📱 Responsive

Le loader s'adapte automatiquement aux différentes tailles d'écran :
- **Mobile** : Taille optimisée pour les écrans tactiles
- **Tablette/Desktop** : Taille standard pour une bonne visibilité

## 🔧 Cas d'usage

- **Chargement de page** : Affichage pendant le chargement initial
- **Soumission de formulaire** : Indication de traitement en cours
- **Chargement de données** : Pendant les appels API
- **Upload de fichiers** : Progression d'un téléchargement
- **Actions asynchrones** : Toute opération nécessitant du temps 