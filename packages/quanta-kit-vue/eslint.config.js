import js from '@eslint/js';

export default [
  {
    ignores: ['dist/', 'node_modules/', 'storybook-static/'],
  },
  js.configs.recommended,
];
