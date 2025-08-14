# MapEmbed

Composant générique pour intégrer une carte (Google Maps, OpenStreetMap, etc.) via une iframe.

## Utilisation

```jsx
import MapEmbed from 'ui-library/MapEmbed';

<MapEmbed src="https://www.google.com/maps/embed?..." height={400} />
```

## Props
- `src` (string, requis) : URL de l'iframe de la carte
- `width` (string ou number, optionnel, défaut '100%')
- `height` (string ou number, optionnel, défaut 350)
- `style` (object, optionnel)
- ...autres props passés à la div racine 