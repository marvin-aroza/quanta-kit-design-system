import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  webpackFinal: async (config: any) => {
    // Disable performance warnings for Storybook builds
    config.performance = {
      hints: false,
    };

    // Optimize chunks for better performance
    if (config.optimization) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          angular: {
            test: /[\\/]node_modules[\\/]@angular[\\/]/,
            name: 'angular',
            chunks: 'all',
            priority: 10,
          },
        },
      };
    }

    return config;
  },
};
export default config;
