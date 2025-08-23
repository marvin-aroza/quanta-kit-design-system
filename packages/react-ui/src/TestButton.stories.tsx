import type { Meta, StoryObj } from '@storybook/react';
import { TestButton } from './TestButton';

const meta: Meta<typeof TestButton> = {
  title: 'Test/ButtonTest',
  component: TestButton,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllButtons: Story = {};
