# Carousel

Composant carousel générique, sans dépendance externe.

## Utilisation

```jsx
import Carousel from 'ui-library/Carousel';

<Carousel items={[...]} renderItem={(item) => <img src={item.src} alt={item.alt} />} autoPlay arrows dots />
```

## Props
- `items` : array d’éléments à afficher
- `renderItem` : fonction custom pour chaque slide
- `autoPlay` : bool (défaut false)
- `interval` : durée ms (défaut 4000)
- `arrows` : bool (défaut true)
- `dots` : bool (défaut true) 