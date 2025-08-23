import type { Preview } from '@storybook/react';
import '../src/Button.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      description: {
        component: 'Quanta Kit React UI Components',
      },
    },
  },
};

export default preview;