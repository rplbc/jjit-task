import tanstackQueryPlugin from '@tanstack/eslint-plugin-query';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...tanstackQueryPlugin.configs['flat/recommended'],
  {
    plugins: {
      import: importPlugin,
      react: reactPlugin,
    },
    rules: {
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        },
      ],
      'no-restricted-imports': 'error',
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    },
    settings: {
      react: { version: 'detect' },
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
