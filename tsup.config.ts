import { defineConfig } from "tsup";

// Multi-entrées : chaque composant a son propre point d'entrée (dist/<Name>/index.js)
// + un barrel (dist/index.js). Le CSS n'est PAS géré ici : il est compilé séparément
// depuis index.scss vers dist/index.css (script build:css) pour rester un fichier unique.
export default defineConfig({
  entry: {
    index: "src/index.ts",
    "Button/index": "src/components/Button/index.ts",
    "Badge/index": "src/components/Badge/index.ts",
    "Card/index": "src/components/Card/index.ts",
    "Alert/index": "src/components/Alert/index.ts",
    "Input/index": "src/components/Input/index.ts",
    "Textarea/index": "src/components/Textarea/index.ts",
    "Checkbox/index": "src/components/Checkbox/index.ts",
    "RadioButton/index": "src/components/RadioButton/index.ts",
    "Switch/index": "src/components/Switch/index.ts",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  // Pas de code-splitting : chaque entrée est autonome (dist/<Name>/index.js),
  // ce qui évite les chunks partagés et préserve la directive "use client"
  // placée en tête de chaque composant source (nécessaire pour le App Router Next.js).
  splitting: false,
  target: "es2020",
  // React est fourni par l'application consommatrice (peerDependency).
  external: ["react", "react-dom", "react/jsx-runtime"],
  esbuildOptions(options) {
    options.jsx = "automatic";
  },
});
