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
        story: 'But Loading buttons with spinner, dots and bar loader',
      },
    },
  },
};

export const Buttonicons: Story = {
  render: () => ({
    template: `<qk-button-group variant="success">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="white" viewBox="0 0 24 24">
    <path d="M20.285 6.709l-11.285 11.292-5.285-5.292 1.414-1.414 3.871 3.878 9.871-9.878z"/>
  </svg>
  </qk-button-group>`,
  }),
};
