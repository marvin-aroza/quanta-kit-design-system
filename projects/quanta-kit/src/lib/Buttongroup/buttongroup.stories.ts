import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { fn } from 'storybook/test';
import { ButtonComponent } from './buttongroup.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Buttongroup',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent],
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
type Story = StoryObj<ButtonComponent>;

export const Buttongroup: Story = {
  args: {
     variant: 'primary',
    disabled: false,
    loading: false,
  },
  render: (args) => ({
    props: args,
    template: 
    `<div class = "Container" style="display: flex; flex-wrap: wrap; gap: 8px; background: #d9d9d9ff; padding: 10px; border-radius: 10px; width:50%;">
    <qk-button variant="primary">Primary</qk-button>
    <qk-button variant="delete">Delete</qk-button>
    <qk-button variant="edit">Edit</qk-button>
    <qk-button variant="primary" [loading]="true">Loading</qk-button>
    <qk-button variant="success">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="white" viewBox="0 0 24 24">
    <path d="M20.285 6.709l-11.285 11.292-5.285-5.292 1.414-1.414 3.871 3.878 9.871-9.878z"/>
  </svg>
  </qk-button>
  </div>

`
  }),

  parameters: {
        docs: {
            description: {
                story: 'Button group'
            }
        }
    }
};

