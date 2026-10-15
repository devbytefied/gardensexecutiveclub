import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",

    // The archived WordPress mirror. This is a 600-file HTTrack capture of
    // the previous site — minified vendor CSS, plugin JS and stock themes.
    // It is a source archive, not application code, and must never be linted.
    "old-site/**",

    // Build output and QA artefacts.
    ".qa/**",
    "scripts/**",
  ]),

  // This is a content site: apostrophes in prose are intentional, and the
  // surrounding typography handles the rest. The rule guards against missed
  // JSX escaping, which has no bearing on a fully static export with no
  // user-supplied content.
  {
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
]);

export default eslintConfig;
