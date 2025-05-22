// eslint.config.js
import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh"; // Assuming it's installed
import eslintConfigPrettier from "eslint-config-prettier"; // This is a config object
import pluginPrettier from "eslint-plugin-prettier"; // This is the plugin object

export default tseslint.config(
  {
    // Global ignores
    ignores: [
      'dist/', 
      '.eslintrc.cjs', // Old config file
      'vite.config.ts', 
      'components.json',
      'eslint.config.js', // Ignore self
      'node_modules/'
    ],
  },
  // Base configuration applicable to JS/TS files
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
    },
  },
  // ESLint recommended base rules
  eslint.configs.recommended,

  // TypeScript configurations
  {
    files: ['**/*.ts', '**/*.tsx'], // Apply only to TypeScript files
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      // Add any specific TS overrides here if needed later
    },
  },

  // Preact/React configurations
  {
    files: ['**/*.jsx', '**/*.tsx'], // Apply to JSX/TSX files
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh, 
      prettier: pluginPrettier,
    },
    languageOptions: {
      // No specific parser for react, uses TS or JS parser based on file
    },
    settings: {
      react: {
        version: 'detect',
        pragma: 'h', // Preact specific
        pragmaFrag: 'Fragment', // Preact specific
      },
    },
    rules: {
      // Apply recommended rules from plugins
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs['jsx-runtime'].rules, // For new JSX transform
      ...pluginReactHooks.configs.recommended.rules,
      
      // Apply Prettier recommended rules (disables conflicting ESLint rules)
      ...eslintConfigPrettier.rules, // Spread the rules from the config object

      // Specific rule adjustments
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'warn', // Run Prettier as an ESLint rule
    },
  }
);
