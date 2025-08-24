import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  TooltipComponent,
  TooltipPosition,
  TooltipTrigger,
  TooltipType,
} from './tooltip.component';

const meta: Meta<TooltipComponent> = {
  title: 'Components/Tooltip',
  component: TooltipComponent,
  decorators: [
    moduleMetadata({
      imports: [TooltipComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
The Tooltip component provides contextual information when users hover, focus, or click on an element.
Based on Material Design 3 guidelines for tooltips.

## Features
- Multiple positions (top, bottom, left, right)
- Different trigger types (hover, click, focus)
- Plain and rich content support
- Customizable delays and styling
- Accessibility support with ARIA attributes
- Keyboard navigation

## Usage
\`\`\`html
<qk-tooltip text="Helpful information" position="top">
  <button>Hover me</button>
</qk-tooltip>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Tooltip text content',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'] as TooltipPosition[],
      description: 'Position of the tooltip relative to trigger',
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'focus'] as TooltipTrigger[],
      description: 'How the tooltip is triggered',
    },
    type: {
      control: 'select',
      options: ['plain', 'rich'] as TooltipType[],
      description: 'Type of tooltip content',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tooltip is disabled',
    },
    showDelay: {
      control: 'number',
      description: 'Delay before showing tooltip (ms)',
    },
    hideDelay: {
      control: 'number',
      description: 'Delay before hiding tooltip (ms)',
    },
    persistent: {
      control: 'boolean',
      description: 'Whether tooltip stays open until explicitly closed',
    },
    customClass: {
      control: 'text',
      description: 'Custom CSS classes',
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width of tooltip',
    },
    offset: {
      control: 'number',
      description: 'Distance from trigger element in pixels',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TooltipComponent>;

export const Default: Story = {
  args: {
    text: 'This is a simple tooltip',
    position: 'top',
    trigger: 'hover',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; text-align: center;">
        <qk-tooltip 
          [text]="text" 
          [position]="position" 
          [trigger]="trigger">
          <button style="padding: 8px 16px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Hover me
          </button>
        </qk-tooltip>
      </div>
    `,
  }),
};

export const TopPosition: Story = {
  args: {
    text: 'Tooltip positioned on top',
    position: 'top',
    trigger: 'hover',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; text-align: center;">
        <qk-tooltip 
          [text]="text" 
          [position]="position" 
          [trigger]="trigger">
          <button style="padding: 8px 16px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Top Tooltip
          </button>
        </qk-tooltip>
      </div>
    `,
  }),
};

export const BottomPosition: Story = {
  args: {
    text: 'Tooltip positioned on bottom',
    position: 'bottom',
    trigger: 'hover',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; text-align: center;">
        <qk-tooltip 
          [text]="text" 
          [position]="position" 
          [trigger]="trigger">
          <button style="padding: 8px 16px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Bottom Tooltip
          </button>
        </qk-tooltip>
      </div>
    `,
  }),
};

export const LeftPosition: Story = {
  args: {
    text: 'Tooltip positioned on left',
    position: 'left',
    trigger: 'hover',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; text-align: center;">
        <qk-tooltip 
          [text]="text" 
          [position]="position" 
          [trigger]="trigger">
          <button style="padding: 8px 16px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Left Tooltip
          </button>
        </qk-tooltip>
      </div>
    `,
  }),
};

export const RightPosition: Story = {
  args: {
    text: 'Tooltip positioned on right',
    position: 'right',
    trigger: 'hover',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; text-align: center;">
        <qk-tooltip 
          [text]="text" 
          [position]="position" 
          [trigger]="trigger">
          <button style="padding: 8px 16px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Right Tooltip
          </button>
        </qk-tooltip>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    text: 'This tooltip is disabled',
    position: 'top',
    trigger: 'hover',
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; text-align: center;">
        <qk-tooltip 
          [text]="text" 
          [position]="position" 
          [trigger]="trigger"
          [disabled]="disabled">
          <button style="padding: 8px 16px; background: #666; color: white; border: none; border-radius: 4px; cursor: not-allowed;">
            Disabled Tooltip
          </button>
        </qk-tooltip>
      </div>
    `,
  }),
};
