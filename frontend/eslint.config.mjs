import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

import globals from 'globals'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import pluginReact from 'eslint-plugin-react'
import nextConfig from 'eslint-config-next'
import importPlugin from 'eslint-plugin-import'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser,
      globals: { ...globals.browser, ...globals.node },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    settings: {
      react: {
        version: 'detect', // Detecta automáticamente la versión de React
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {}, // Resuelve alias y rutas en tsconfig.json
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
      prettier: 'prettier',
      '@typescript-eslint': tseslint,
      react: pluginReact,
      import: importPlugin,
    },
    extends: [
      'plugin:prettier/recommended', // Asegura que Prettier esté activado
      'eslint-config-prettier', // Desactiva reglas en conflicto con Prettier
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:import/recommended',
      'next', // Configuración específica para Next.js
    ],
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: false,
          trailingComma: 'es5',
          tabWidth: 2,
        },
      ],
      // Reglas generales
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-console': 'error',
      'no-debugger': 'error',

      // Reglas de importación
      'import/no-unresolved': 'error',
      'import/no-relative-parent-imports': 'error',

      // Reglas de TypeScript
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-explicit-any': 'error',

      // Reglas de React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
]
