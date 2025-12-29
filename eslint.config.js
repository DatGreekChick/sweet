import globals from 'globals'

import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'

import reactPlugin from 'eslint-plugin-react'
import reactRecommended from 'eslint-plugin-react/configs/recommended.js'

export default [
  js.configs.recommended,
  reactRecommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: { reactPlugin, import: importPlugin },
    settings: {
      'import/extensions': ['.js', '.jsx'],
      'import/resolver': {
        node: true,
      },
      'import/parsers': {
        espree: ['.js', '.jsx'],
      },
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      'no-unused-vars': 0,
      'import/no-unresolved': 0,
      'import/no-named-as-default': 0,
      'import/no-named-as-default-member': 0,
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'sibling'],
          pathGroups: [
            {
              pattern: 'react*',
              group: 'builtin',
            },
          ],
        },
      ],
      'react/display-name': 0,
      'react/prop-types': 0,
      'react/no-direct-mutation-state': 0,
      'react/require-render-return': 0,
      'react/jsx-no-undef': 0,
      'react/jsx-uses-react': 0,
      'react/jsx-uses-vars': 0,
      'react/react-in-jsx-scope': 0,
      'react/no-danger-with-children': 0,
      'sort-imports': [
        'error',
        {
          allowSeparatedGroups: true,
          ignoreCase: true,
          ignoreDeclarationSort: true, // use import-sort instead
          memberSyntaxSortOrder: ['all', 'single', 'multiple', 'none'],
        },
      ],
    },
  },
  {
    ignores: [
      // config files
      '*.config.js',
      // server
      'dev.js',
      // bundles
      'public/chunk*.js',
    ],
  },
]
