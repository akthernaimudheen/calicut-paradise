import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // `.open-next` is generated Worker output; linting it reports on bundled
  // framework code rather than this project's source.
  globalIgnores([".next/**", ".open-next/**", "node_modules/**", "next-env.d.ts"]),
]);
