# 🃏 Card

Conteneur de contenu stylisé universel, accessible et personnalisable pour organiser l'information.

## 📋 Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Contenu à afficher dans la carte |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `object` | `{}` | Styles inline additionnels |
| `aria-label` | `string` | - | Label pour l'accessibilité |

## 🚀 Exemple d'utilisation

```jsx
import { Card } from '@equitech/ui-library';

function MonComposant() {
  return (
    <div>
      {/* Carte simple */}
      <Card>
        <h2>Titre de la carte</h2>
        <p>Contenu de la carte avec du texte descriptif.</p>
      </Card>
      
      {/* Carte avec personnalisation */}
      <Card className="custom-card" style={{ maxWidth: '400px' }}>
        <h3>Informations importantes</h3>
        <p>Cette carte a des styles personnalisés.</p>
      </Card>
    </div>
  );
}

// Exemples de composition
function ExemplesComposition() {
  return (
    <div>
      {/* Carte d'actualité */}
      <Card>
        <h3>Nouvelle fonctionnalité disponible</h3>
        <p>Nous sommes ravis d'annoncer le lancement de notre nouvelle fonctionnalité...</p>
        <Button model="primary">Lire la suite</Button>
      </Card>
      
      {/* Carte de contact */}
      <Card>
        <h3>Contactez-nous</h3>
        <form>
          <Input placeholder="Votre nom" />
          <Input type="email" placeholder="Votre email" />
          <Textarea placeholder="Votre message" />
          <Button model="primary" type="submit">Envoyer</Button>
        </form>
      </Card>
      
      {/* Carte de confirmation */}
      <Card>
        <h2>✅ Merci pour votre commande !</h2>
        <p>Votre commande a bien été enregistrée et sera traitée dans les plus brefs délais.</p>
        <p>Numéro de commande : <strong>#12345</strong></p>
      </Card>
      
      {/* Carte de produit */}
      <Card>
        <img src="/product-image.jpg" alt="Produit" />
        <h3>Nom du produit</h3>
        <p>Description du produit avec tous les détails importants.</p>
        <div className="price">29,99 €</div>
        <Button model="primary">Ajouter au panier</Button>
      </Card>
    </div>
  );
}
```

## ♿ Accessibilité

- **Structure sémantique** : Utilise des éléments HTML appropriés
- **Support des attributs ARIA** : Compatible avec les technologies d'assistance
- **Contraste élevé** : Respect des standards d'accessibilité pour la lisibilité
- **Navigation clavier** : Support complet de la navigation

## 🎨 Personnalisation

La carte utilise la classe CSS `.card` pour la personnalisation :

```scss
// Exemple de personnalisation
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
  border: 1px solid #e5e7eb;
  transition: box-shadow 0.2s ease;
  
  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  // Variante avec image
  &.with-image {
    padding: 0;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    
    .card-content {
      padding: 24px;
    }
  }
  
  // Variante interactive
  &.interactive {
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
}
```

## 📱 Responsive

La carte s'adapte automatiquement aux différentes tailles d'écran :
- **Mobile** : Padding réduit et espacement optimisé
- **Tablette/Desktop** : Espacement et taille optimaux pour la lecture

## 🔧 Cas d'usage

- **Cartes d'information** : Présentation de contenu structuré
- **Cartes de produit** : Affichage de produits avec images et descriptions
- **Cartes de formulaire** : Conteneurs pour les formulaires
- **Cartes d'actualité** : Articles et nouvelles
- **Cartes de confirmation** : Messages de succès et confirmations
- **Cartes de profil** : Informations utilisateur
- **Cartes de navigation** : Liens vers d'autres sections

## 🎨 Variantes courantes

- **Carte simple** : Contenu basique avec titre et texte
- **Carte avec image** : Image en en-tête avec contenu en dessous
- **Carte interactive** : Effets de survol et clics
- **Carte de formulaire** : Conteneur pour les champs de saisie
- **Carte de confirmation** : Messages de succès avec icônes 