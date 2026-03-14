import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import i18next from "eslint-plugin-i18next";

export default tseslint.config(
  { ignores: ["dist/", "node_modules/", "supabase/"] },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      "react-hooks": reactHooks,
      "unused-imports": unusedImports,
      "simple-import-sort": simpleImportSort,
      i18next,
    },
    rules: {
      /* ── Indentation: 2 spaces ─────────────────────────── */
      indent: ["error", 2, { SwitchCase: 1 }],

      /* ── Unused imports: auto-removable ─────────────────── */
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
      ],

      /* ── Import sorting: alphabetical ───────────────────── */
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      /* ── No raw text — must come from translations ──────── */
      "i18next/no-literal-string": "error",

      /* ── Enforce @/ alias for parent imports ────────────── */
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*"],
              message: "Use '@/' alias instead of relative parent imports.",
            },
          ],
        },
      ],

      /* ── React hooks ────────────────────────────────────── */
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  /* ── Config files (JS at root) — relax TS/i18n rules ──── */
  {
    files: ["*.config.{js,ts,mjs}"],
    rules: {
      "i18next/no-literal-string": "off",
    },
  },

  /* ── shadcn/ui primitives — no i18n needed ──────────── */
  {
    files: ["src/app/components/ui/**/*.{ts,tsx}"],
    rules: {
      "i18next/no-literal-string": "off",
    },
  },
);
