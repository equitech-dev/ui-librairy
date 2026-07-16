// esbuild (via tsup) retire les directives "use client" au bundling.
// Comme tous les composants de la lib sont côté client (hooks, refs, handlers),
// on réinjecte la directive en tête de chaque fichier JS émis afin que le
// App Router de Next.js établisse correctement la frontière client.
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DIST = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const DIRECTIVE = '"use client";\n';

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
    } else if (entry.endsWith(".js")) {
      const content = readFileSync(full, "utf8");
      if (!content.startsWith('"use client"') && !content.startsWith("'use client'")) {
        writeFileSync(full, DIRECTIVE + content);
      }
    }
  }
}

walk(DIST);
console.log("[add-use-client] Directive réinjectée dans dist/*.js");
