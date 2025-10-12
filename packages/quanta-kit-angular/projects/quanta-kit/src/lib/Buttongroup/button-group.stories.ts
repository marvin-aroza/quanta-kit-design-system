import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ButtonGroupComponent } from './button-group.component';

const meta: Meta<ButtonGroupComponent> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonGroupComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<ButtonGroupComponent>;

export const Basic: Story = {
  args: {
    buttons: [
      { label: 'Save', variant: 'primary' },
      { label: 'Edit', variant: 'edit' },
      { label: 'Delete', variant: 'delete' },
    ],
  },
};

export const Buttonsize: Story = {
  args: {
    buttons: [
      { label: 'save', variant: 'save', size: 'large' },
      { label: 'secondary', variant: 'secondary', size: 'medium' },
      { label: 'info', variant: 'info', size: 'small' },
      { label: 'secondary', variant: 'secondary', size: 'large' },
      { label: 'save', variant: 'save', size: 'small' },
      { label: 'info', variant: 'info', size: 'large' },
    ],
  },
};
