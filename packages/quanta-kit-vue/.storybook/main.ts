import type { StorybookConfig } from '@storybook/vue3-vite';
import { resolve } from 'path';

function getAbsolutePath(value: string): any {
  return resolve(__dirname, '..', '..', '..', 'node_modules', value);
}

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-controls'),
    getAbsolutePath('@storybook/addon-actions'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/vue3-vite'),
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: false,
  },
  viteFinal: (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': resolve(__dirname, '../src'),
      };
    }
    return config;
  },
};

export default config;
