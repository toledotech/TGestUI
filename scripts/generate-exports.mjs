// Gera automaticamente o barrel (src/index.ts) e o mapa de "exports" do
// package.json a partir dos arquivos que existem em src/components/ui/.
// Roda antes de todo build (`npm run build` e `prepare`), então adicionar
// um componente novo nunca mais exige lembrar de atualizar isso na mão.

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const uiDir = path.join(root, "src/components/ui");
const componentNames = readdirSync(uiDir)
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => f.replace(/\.tsx$/, ""))
  .sort();

// --- src/index.ts -------------------------------------------------------

const barrelLines = [
  ...componentNames.map((name) => `export * from "./components/ui/${name}";`),
  `export { cn } from "./lib/utils";`,
  `export { useIsMobile } from "./hooks/use-mobile";`,
];
writeFileSync(path.join(root, "src/index.ts"), barrelLines.join("\n") + "\n");

// --- package.json "exports" ---------------------------------------------

const pkgPath = path.join(root, "package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));

const exportsMap = {
  ".": { types: "./dist/index.d.ts", import: "./dist/index.js" },
};
for (const name of componentNames) {
  exportsMap[`./${name}`] = {
    types: `./dist/components/ui/${name}.d.ts`,
    import: `./dist/components/ui/${name}.js`,
  };
}
exportsMap["./utils"] = { types: "./dist/lib/utils.d.ts", import: "./dist/lib/utils.js" };
exportsMap["./use-mobile"] = {
  types: "./dist/hooks/use-mobile.d.ts",
  import: "./dist/hooks/use-mobile.js",
};

pkg.exports = exportsMap;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

console.log(`generate-exports: ${componentNames.length} componentes mapeados.`);
