import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { fn } from 'storybook/test';
import { ButtonGroupComponent } from './button-group.component';

const meta: Meta<ButtonGroupComponent> = {
  title: 'Components/button-group',
  component: ButtonGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonGroupComponent],
    }),
  ],
  args: {
    disabled: false,
    loading: false,
    hideTextOnLoading: false,
    ariaLabel: '',
    testId: '',
    clicked: fn(),
    focused: fn(),
    blurred: fn(),
  },
};

export default meta;
type Story = StoryObj<ButtonGroupComponent>;

export const Simplebuttons: Story = {
  args: {
    variant: 'primary',
    disabled: false,
    loading: false,
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center; margin-bottom: 20px;">
    <qk-button-group variant="primary">Primary</qk-button-group>
    <qk-button-group variant="edit">Edit</qk-button-group>
    <qk-button-group variant="info">info</qk-button-group>
    <qk-button-group variant="delete">Delete</qk-button-group>
    <qk-button-group variant="default">Default</qk-button-group>
    </div>  
`,
  }),

  parameters: {
    docs: {
      description: {
        story: 'Simple button group',
      },
    },
  },
};

export const Buttonsizes: Story = {
  args: {
    size: 'xs',
    disabled: false,
    loading: false,
  },
  render: () => ({
    template: `
    <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center; margin-bottom: 20px;">
    <qk-button-group size="xs" variant="primary">Primary</qk-button-group>
    <qk-button-group size="sm" variant="edit">Edit</qk-button-group>
    <qk-button-group size="md" variant="info">info</qk-button-group>
    <qk-button-group size="lg" variant="delete">Delete</qk-button-group>
    <qk-button-group size="xl" variant="default">Default</qk-button-group>
     `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Button sizes xs, sm, md, lg, xl',
      },
    },
  },
};

export const Loadingbuttons: Story = {
  args: {
    loaderType: 'Loading',
    disabled: false,
    loading: true,
  },
  render: () => ({
    template: `<div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center; margin-bottom: 20px;">
    <qk-button-group [loading]="true" loaderType="spinner">Loading</qk-button-group>
    <qk-button-group [loading]="true" loaderType="spinner"></qk-button-group>
    <qk-button-group [loading]="true" loaderType="dots">Loading</qk-button-group>
    <qk-button-group [loading]="true" loaderType="dots"></qk-button-group>
    <qk-button-group [loading]="true" loaderType="bar">Loading</qk-button-group>
    <qk-button-group [loading]="true" loaderType="bar"></qk-button-group>
`, // placeholder
  }),
  parameters: {
    docs: {
      description: {
        story: 'Loading buttons with spinner, dots and bar loader',
      },
    },
  },
};

export const Buttonicons: Story = {
  render: () => ({
    template: `<div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center; margin-bottom: 20px;">
    <qk-button-group variant="primary"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M7 2a2 2 0 0 0-2 2v1a1 1 0 0 0 0 2v1a1 1 0 0 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7Zm3 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-1 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
</svg>
</qk-button-group>
    <qk-button-group variant="edit"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z" clip-rule="evenodd"/>
</svg>
</qk-button-group>
    <qk-button-group variant="info"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clip-rule="evenodd"/>
</svg>
</qk-button-group>
    <qk-button-group variant="delete"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
</svg>
</qk-button-group>
    <qk-button-group variant="default"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd"/>
</svg>
</qk-button-group>
    </div> `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Button icon group',
      },
    },
  },
};
