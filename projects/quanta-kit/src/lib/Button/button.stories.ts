import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ButtonComponent, ButtonVariant, ButtonSize, ButtonType } from './button.component';

const meta: Meta<ButtonComponent> = {
    title: 'Components/Button',
    component: ButtonComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [ButtonComponent],
        }),
    ],
    parameters: {
        docs: {
            description: {
                component: `
The Button component is a versatile UI element that supports various styles, sizes, and states.
It provides comprehensive functionality including loading states, accessibility features, and customization options.

## Features
- Multiple variants (primary, secondary, success, danger, warning, info, light, dark, and outline versions)
- Various sizes (xs, sm, md, lg, xl)
- Loading state with spinner
- Disabled state
- Full width option
- Rounded and square variations
- Accessibility support with ARIA attributes
- Event emissions for click, focus, and blur
- Icon slot support (left and right)
- Keyboard navigation support

## Usage
\`\`\`html
<qk-button variant="primary" size="md" (clicked)="handleClick($event)">
  Click me
</qk-button>
\`\`\`

## With Icons
\`\`\`html
<qk-button variant="primary">
  <svg slot="icon-left" width="16" height="16">...</svg>
  Save Changes
  <svg slot="icon-right" width="16" height="16">...</svg>
</qk-button>
\`\`\`
        `
            }
        }
    },
    argTypes: {
        variant: {
            control: 'select',
            options: [
                'primary',
                'secondary',
                'success',
                'danger',
                'warning',
                'info',
                'light',
                'dark',
                'outline-primary',
                'outline-secondary',
                'outline-success',
                'outline-danger',
                'outline-warning',
                'outline-info',
                'outline-light',
                'outline-dark'
            ] as ButtonVariant[],
            description: 'The visual style variant of the button'
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'] as ButtonSize[],
            description: 'The size of the button'
        },
        type: {
            control: 'select',
            options: ['button', 'submit', 'reset'] as ButtonType[],
            description: 'The HTML type attribute of the button'
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the button is disabled'
        },
        loading: {
            control: 'boolean',
            description: 'Whether the button is in loading state'
        },
        hideTextOnLoading: {
            control: 'boolean',
            description: 'Whether to hide text content when loading'
        },
        fullWidth: {
            control: 'boolean',
            description: 'Whether the button should take full width'
        },
        rounded: {
            control: 'boolean',
            description: 'Whether the button has rounded corners'
        },
        square: {
            control: 'boolean',
            description: 'Whether the button has no border radius'
        },
        customClass: {
            control: 'text',
            description: 'Custom CSS classes to apply'
        },
        ariaLabel: {
            control: 'text',
            description: 'ARIA label for accessibility'
        },
        testId: {
            control: 'text',
            description: 'Test ID for testing purposes'
        },
        clicked: {
            action: 'clicked',
            description: 'Event emitted when button is clicked'
        },
        focused: {
            action: 'focused',
            description: 'Event emitted when button receives focus'
        },
        blurred: {
            action: 'blurred',
            description: 'Event emitted when button loses focus'
        }
    },
    args: {
        clicked: fn(),
        focused: fn(),
        blurred: fn()
    }
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// Basic Stories
export const Primary: Story = {
    args: {
        variant: 'primary',
        size: 'md'
    },
    render: (args) => ({
        props: args,
        template: `<qk-button 
      [variant]="variant" 
      [size]="size" 
      [disabled]="disabled" 
      [loading]="loading"
      (clicked)="clicked($event)">
      Primary Button
    </qk-button>`
    })
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        size: 'md'
    },
    render: (args) => ({
        props: args,
        template: `<qk-button 
      [variant]="variant" 
      [size]="size" 
      [disabled]="disabled" 
      [loading]="loading"
      (clicked)="clicked($event)">
      Secondary Button
    </qk-button>`
    })
};

export const Disabled: Story = {
    args: {
        variant: 'primary',
        disabled: true,
        size: 'md'
    },
    render: (args) => ({
        props: args,
        template: `<qk-button 
      [variant]="variant" 
      [size]="size" 
      [disabled]="disabled">
      Disabled Button
    </qk-button>`
    })
};

export const Loading: Story = {
    args: {
        variant: 'primary',
        loading: true,
        size: 'md'
    },
    render: (args) => ({
        props: args,
        template: `<qk-button 
      [variant]="variant" 
      [size]="size" 
      [loading]="loading">
      Loading Button
    </qk-button>`
    })
};

export const WithIcon: Story = {
    args: {
        variant: 'primary',
        size: 'md'
    },
    render: (args) => ({
        props: args,
        template: `<qk-button 
      [variant]="variant" 
      [size]="size">
      <svg slot="icon-left" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      </svg>
      Add Item
    </qk-button>`
    })
};
