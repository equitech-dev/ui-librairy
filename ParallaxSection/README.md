# 🌊 ParallaxSection

Section avec effet parallax universelle, accessible et personnalisable pour créer des effets visuels dynamiques.

## 📋 Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Contenu à afficher dans la section |
| `speed` | `number` | `0.5` | Vitesse de l'effet parallax (0 = statique, 1 = rapide) |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `object` | `{}` | Styles inline additionnels |
| `aria-label` | `string` | - | Label pour l'accessibilité |

## 🚀 Exemple d'utilisation

```jsx
import { ParallaxSection } from '@equitech/ui-library';

function MonComposant() {
  return (
    <div>
      {/* Section parallax simple */}
      <ParallaxSection speed={0.3}>
        <div className="hero-content">
          <h1>Titre principal</h1>
          <p>Description avec effet parallax</p>
        </div>
      </ParallaxSection>
      
      {/* Section avec personnalisation */}
      <ParallaxSection 
        speed={0.7} 
        className="custom-parallax"
        style={{ 
          backgroundImage: 'url(/background.jpg)',
          backgroundSize: 'cover',
          minHeight: '500px'
        }}
      >
        <div className="content">
          <h2>Section personnalisée</h2>
          <p>Contenu avec arrière-plan et effet parallax</p>
        </div>
      </ParallaxSection>
      
      {/* Section statique (sans parallax) */}
      <ParallaxSection speed={0}>
        <div className="static-content">
          <h3>Section sans effet parallax</h3>
          <p>Contenu normal sans mouvement</p>
        </div>
      </ParallaxSection>
    </div>
  );
}

// Utilisation dans une page complète
function PageAvecParallax() {
  return (
    <div>
      {/* En-tête avec parallax */}
      <ParallaxSection 
        speed={0.4}
        style={{
          backgroundImage: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh'
        }}
      >
        <div className="hero">
          <h1>Bienvenue sur notre site</h1>
          <p>Découvrez nos services avec un effet visuel unique</p>
          <Button model="primary">En savoir plus</Button>
        </div>
      </ParallaxSection>
      
      {/* Contenu principal */}
      <Section>
        <h2>Nos services</h2>
        <p>Contenu principal de la page...</p>
      </Section>
      
      {/* Section finale avec parallax */}
      <ParallaxSection 
        speed={0.6}
        style={{
          backgroundImage: 'url(/footer-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          textAlign: 'center',
          padding: '100px 20px'
        }}
      >
        <h2>Contactez-nous</h2>
        <p>Prêt à commencer votre projet ?</p>
      </ParallaxSection>
    </div>
  );
}
```

## ♿ Accessibilité

- **Support des préférences de mouvement** : Respect des paramètres de réduction de mouvement
- **Contenu accessible** : Le contenu reste lisible même sans effet parallax
- **Navigation clavier** : Support complet de la navigation
- **Support des lecteurs d'écran** : Compatible avec les technologies d'assistance

## 🎨 Personnalisation

Le composant utilise la classe CSS `.parallaxSection` pour la personnalisation :

```scss
// Exemple de personnalisation
.parallaxSection {
  position: relative;
  overflow: hidden;
  will-change: transform;
  
  // Optimisation des performances
  transform: translateZ(0);
  
  // Variante avec arrière-plan
  &.with-background {
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  
  // Variante avec overlay
  &.with-overlay::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  
  // Contenu au-dessus de l'overlay
  &.with-overlay > * {
    position: relative;
    z-index: 2;
  }
}

// Réduction de mouvement pour l'accessibilité
@media (prefers-reduced-motion: reduce) {
  .parallaxSection {
    transform: none !important;
  }
}
```

## 📱 Responsive

La section parallax s'adapte automatiquement aux différentes tailles d'écran :
- **Mobile** : Effet réduit ou désactivé pour les performances
- **Tablette/Desktop** : Effet parallax complet avec optimisations

## 🔧 Fonctionnalités

- **Effet parallax fluide** : Mouvement basé sur le scroll de la page
- **Performance optimisée** : Utilisation de `transform` et `will-change`
- **Vitesse configurable** : Contrôle de l'intensité de l'effet
- **Support des arrière-plans** : Images, gradients, couleurs
- **Contenu flexible** : Tout type de contenu React

## 🎨 Cas d'usage

- **Sections héro** : En-têtes de page avec impact visuel
- **Sections de présentation** : Mise en valeur de contenu important
- **Sections de transition** : Séparation visuelle entre sections
- **Sections de conclusion** : Fin de page avec effet mémorable
- **Galerie d'images** : Présentation d'images avec effet de profondeur

## ⚠️ Bonnes pratiques

- **Utilisez modérément** : Trop d'effets parallax peuvent distraire
- **Testez les performances** : Surveillez l'impact sur les appareils moins puissants
- **Respectez l'accessibilité** : L'effet ne doit pas nuire à la lisibilité
- **Optimisez les images** : Utilisez des images compressées pour les arrière-plans



