import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ButtonGroupComponent } from './button-group.component';

const meta: Meta<ButtonGroupComponent> = {
  title: 'Components/SimpleButtonGroup',
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
