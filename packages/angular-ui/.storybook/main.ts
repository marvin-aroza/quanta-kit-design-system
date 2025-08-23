import { dirname, join } from "path";
import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-docs"),
    "@chromatic-com/storybook"
  ],
  framework: {
    name: getAbsolutePath("@storybook/angular"),
    options: {},
  },
  docs: {},
  typescript: {
    check: false,
  },
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
