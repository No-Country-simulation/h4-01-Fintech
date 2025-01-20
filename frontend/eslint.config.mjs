import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import nextConfig from "eslint-config-next";
import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Obtener directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Compatibilidad con configuraciones heredadas
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: tsParser,
      globals: { ...globals.browser, ...globals.node },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    settings: {
      react: {
        version: "detect", // Detecta automáticamente la versión de React
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        typescript: {}, // Resuelve alias y rutas en tsconfig.json
      },
    },
    plugins: {
      simpleImportSort,
      prettier: "prettier",
      "@typescript-eslint": tseslint,
      react: pluginReact,
      import: importPlugin,
    },
    extends: [
      "plugin:prettier/recommended",
      "eslint-config-prettier",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:import/recommended",
    ],
    rules: {
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          semi: false,
          trailingComma: "es5",
          tabWidth: 2,
        },
      ],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-console": "error",
      "no-debugger": "error",
      "import/no-unresolved": "error",
      "import/no-relative-parent-imports": "error",
      "import/order": [
        "warn",
        {
          groups: [
            ["builtin", "external"],
            ["internal", "parent", "sibling", "index"],
          ],
          "newlines-between": "always",
        },
      ],
      "import/newline-after-import": "warn",
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/no-explicit-any": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  nextConfig, // Configuración específica de Next.js
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...compat.extends("next/core-web-vitals", "next/typescript"), // Compatibilidad adicional para Next.js y TypeScript
];
