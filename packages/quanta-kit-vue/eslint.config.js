import js from '@eslint/js';
import globals from 'globals';
import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';
import pluginVue from 'eslint-plugin-vue';

export default [
  {
    ignores: ['dist/', 'node_modules/', 'storybook-static/'],
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        sourceType: 'module',
        ecmaVersion: 'latest',
        extraFileExtensions: ['.vue'],
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    files: ['**/*.{config,stories}.{js,ts,mjs,cjs}', 'vite.config.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
