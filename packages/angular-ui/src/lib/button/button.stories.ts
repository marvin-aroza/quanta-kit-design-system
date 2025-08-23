import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    props: args,
    template: `<qk-button [variant]="variant" [size]="size" [disabled]="disabled">Button</qk-button>`,
  }),
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  render: (args) => ({
    props: args,
    template: `<qk-button [variant]="variant" [size]="size" [disabled]="disabled">Button</qk-button>`,
  }),
};

export const Success: Story = {
  args: {
    variant: 'success',
  },
  render: (args) => ({
    props: args,
    template: `<qk-button [variant]="variant" [size]="size" [disabled]="disabled">Button</qk-button>`,
  }),
};

export const Warning: Story = {
  args: {
    variant: 'warning',
  },
  render: (args) => ({
    props: args,
    template: `<qk-button [variant]="variant" [size]="size" [disabled]="disabled">Button</qk-button>`,
  }),
};

export const Error: Story = {
  args: {
    variant: 'error',
  },
  render: (args) => ({
    props: args,
    template: `<qk-button [variant]="variant" [size]="size" [disabled]="disabled">Button</qk-button>`,
  }),
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
  render: (args) => ({
    props: args,
    template: `<qk-button [variant]="variant" [size]="size" [disabled]="disabled">Small Button</qk-button>`,
  }),
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
  render: (args) => ({
    props: args,
    template: `<qk-button [variant]="variant" [size]="size" [disabled]="disabled">Large Button</qk-button>`,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `<qk-button [variant]="variant" [size]="size" [disabled]="disabled">Disabled Button</qk-button>`,
  }),
};
