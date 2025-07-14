import js from '@eslint/js';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import nodePlugin from 'eslint-plugin-node';
import jestPlugin from 'eslint-plugin-jest';
import prettierConfig from 'eslint-config-prettier';

export default [
  // Base configuration
  js.configs.recommended,

  // Global ignores
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', '*.config.js'],
  },

  // Source files configuration
  {
    files: ['src/**/*.js', 'scripts/**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2024,
      },
    },
    plugins: {
      import: importPlugin,
      node: nodePlugin,
    },
    rules: {
      // Modern ES6+ rules
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',
      'prefer-destructuring': ['error', { object: true, array: false }],
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'object-shorthand': 'error',
      'no-var': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'off',

      // Import rules
      'import/extensions': ['error', 'always', { ignorePackages: true }],
      'import/no-unresolved': 'off', // Let esbuild handle this
      'import/prefer-default-export': 'off',
      'import/no-default-export': 'off',

      // Node.js rules
      'node/no-unsupported-features/es-syntax': 'off',
      'node/no-missing-import': 'off',
      'node/no-unpublished-import': 'off',

      // General code quality
      'no-throw-literal': 'error',
      'no-implicit-coercion': 'error',
      'no-return-await': 'error',
      'require-await': 'error',
      'no-await-in-loop': 'warn',
      'prefer-promise-reject-errors': 'error',

      // Style rules (handled by prettier)
      semi: 'off',
      quotes: 'off',
      'comma-dangle': 'off',
      indent: 'off',
      'object-curly-spacing': 'off',
      'array-bracket-spacing': 'off',
    },
  },

  // Test files configuration
  {
    files: ['test/**/*.js', '**/*.test.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      'jest/expect-expect': 'error',
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },

  // Prettier integration (must be last)
  prettierConfig,
];
