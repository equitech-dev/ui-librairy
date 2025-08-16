# 🪟 Modal

Fenêtre modale universelle, accessible et personnalisable pour afficher du contenu en superposition.

## 📋 Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `open` | `boolean` | `false` | Contrôle l'affichage de la modale |
| `onClose` | `function` | - | Callback appelé lors de la fermeture |
| `children` | `ReactNode` | - | Contenu à afficher dans la modale |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `aria-label` | `string` | `'Fenêtre modale'` | Label pour l'accessibilité |

## 🚀 Exemple d'utilisation

```jsx
import { Modal } from '@equitech/ui-library';
import { useState } from 'react';

function MonComposant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="ui-button ui-button-primary"
      >
        Ouvrir la modale
      </button>
      
      <Modal 
        open={isOpen} 
        onClose={() => setIsOpen(false)}
        aria-label="Formulaire de contact"
      >
        <div className="ui-flex ui-flex-col ui-gap-m">
          <h2 className="ui-title-m">Contactez-nous</h2>
          <p className="ui-text-m">
            Remplissez le formulaire ci-dessous pour nous contacter.
          </p>
          
          <form className="ui-flex ui-flex-col ui-gap-s">
            <input 
              type="text" 
              placeholder="Votre nom" 
              className="ui-input"
            />
            <textarea 
              placeholder="Votre message" 
              className="ui-textarea"
              rows={4}
            />
            
            <div className="ui-flex ui-gap-s ui-justify-end">
              <button 
                type="button" 
                onClick={() => setIsOpen(false)}
                className="ui-button ui-button-secondary"
              >
                Annuler
              </button>
              <button 
                type="submit"
                className="ui-button ui-button-primary"
              >
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

// Modal avec contenu personnalisé
function ModalPersonnalisee() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="ui-button ui-button-info"
      >
        Voir les détails
      </button>
      
      <Modal 
        open={isOpen} 
        onClose={() => setIsOpen(false)}
        className="ui-rounded-m"
        aria-label="Détails du produit"
      >
        <div className="ui-flex ui-flex-col ui-gap-m">
          <div className="ui-flex ui-justify-between ui-items-center">
            <h2 className="ui-title-m">Détails du produit</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="ui-text-xl ui-cursor-pointer"
              aria-label="Fermer"
            >
              ×
            </button>
          </div>
          
          <div className="ui-grid ui-grid-cols-2 ui-gap-m">
            <img 
              src="/product-image.jpg" 
              alt="Produit" 
              className="ui-rounded-s ui-w-100"
            />
            <div className="ui-flex ui-flex-col ui-gap-s">
              <h3 className="ui-title-s">Nom du produit</h3>
              <p className="ui-text-m">Description détaillée du produit...</p>
              <span className="ui-text-l ui-font-bold ui-text-primary">
                99,99 €
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
```

## ♿ Accessibilité

- **Rôle `dialog`** : Identifie l'élément comme une fenêtre de dialogue
- **`aria-modal="true"`** : Indique que la modale bloque l'interaction avec le contenu en arrière-plan
- **Gestion de la touche Escape** : Fermeture automatique avec la touche Échap
- **Focus management** : Le focus est piégé dans la modale
- **Bouton de fermeture** : Bouton accessible avec `aria-label="Fermer"`
- **Support des lecteurs d'écran** : Compatible avec les technologies d'assistance
- **Navigation clavier** : Support complet de la navigation avec Tab

## 🎨 Personnalisation

La modale utilise les classes CSS suivantes pour la personnalisation :

```scss
// Classes principales
.ui-overlay { /* Arrière-plan semi-transparent */ }
.ui-modal { /* Conteneur principal de la modale */ }
.ui-closeBtn { /* Bouton de fermeture */ }

// États
.ui-overlay:focus { /* Focus sur l'overlay */ }
.ui-modal:focus { /* Focus sur la modale */ }
```

### Exemple de personnalisation avancée

```scss
// Modale avec design personnalisé
.ui-modal.custom-modal {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  border: 2px solid rgba(255, 255, 255, 0.1);
  
  // Animation d'entrée
  animation: modalSlideIn 0.3s ease-out;
}

// Overlay avec effet de flou
.ui-overlay.custom-overlay {
  backdrop-filter: blur(8px);
  background: rgba(0, 0, 0, 0.6);
}

// Bouton de fermeture stylisé
.ui-closeBtn.custom-close {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: none;
  color: white;
  font-size: 1.5rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
}

// Animation d'entrée
@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

## 📱 Responsive

La modale s'adapte automatiquement aux différentes tailles d'écran :
- **Mobile** : Largeur maximale de 90vw, hauteur maximale de 90vh
- **Tablette/Desktop** : Largeur minimale de 320px avec scroll automatique si nécessaire

### Classes utilitaires pour le responsive

```scss
// Ajuster la taille selon l'écran
@media screen and (max-width: 768px) {
  .ui-modal {
    margin: 1rem;
    max-width: calc(100vw - 2rem);
    max-height: calc(100vh - 2rem);
  }
}

// Masquer certains éléments sur mobile
.ui-mobile-hidden {
  @media screen and (max-width: 768px) {
    display: none;
  }
}
```

## 🔧 Fonctionnalités

- **Gestion automatique du focus** : Le focus est piégé dans la modale
- **Fermeture multiple** : Clic sur overlay, touche Escape, bouton de fermeture
- **Scroll automatique** : Gestion du scroll si le contenu dépasse
- **Z-index élevé** : S'assure que la modale est au-dessus du contenu
- **Support des refs** : Possibilité de référencer la modale
- **États visuels** : Overlay, focus, hover sur le bouton de fermeture

## 🎯 Cas d'usage

### Modal de confirmation
```jsx
<Modal open={showConfirm} onClose={() => setShowConfirm(false)}>
  <div className="ui-text-center">
    <h3 className="ui-title-s">Confirmer la suppression</h3>
    <p className="ui-text-m ui-m-0">Êtes-vous sûr de vouloir supprimer cet élément ?</p>
    <div className="ui-flex ui-gap-s ui-justify-center ui-m-top-m">
      <Button model="secondary" onClick={() => setShowConfirm(false)}>
        Annuler
      </Button>
      <Button model="error" onClick={handleDelete}>
        Supprimer
      </Button>
    </div>
  </div>
</Modal>
```

### Modal de formulaire
```jsx
<Modal open={showForm} onClose={() => setShowForm(false)}>
  <form className="ui-flex ui-flex-col ui-gap-m">
    <h2 className="ui-title-m">Nouveau projet</h2>
    <input type="text" placeholder="Nom du projet" className="ui-input" />
    <textarea placeholder="Description" className="ui-textarea" rows={3} />
    <div className="ui-flex ui-gap-s ui-justify-end">
      <Button model="secondary" onClick={() => setShowForm(false)}>
        Annuler
      </Button>
      <Button model="primary" type="submit">
        Créer
      </Button>
    </div>
  </form>
</Modal>
```

### Modal d'image
```jsx
<Modal open={showImage} onClose={() => setShowImage(false)}>
  <img 
    src={selectedImage} 
    alt="Image en plein écran" 
    className="ui-w-100 ui-h-auto ui-rounded-s"
  />
</Modal>
``` 