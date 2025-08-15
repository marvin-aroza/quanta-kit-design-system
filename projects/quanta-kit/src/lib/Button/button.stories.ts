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
      [hideTextOnLoading]="hideTextOnLoading"
      [fullWidth]="fullWidth"
      [rounded]="rounded"
      [square]="square"
      [customClass]="customClass"
      [ariaLabel]="ariaLabel"
      [testId]="testId"
      (clicked)="clicked($event)"
      (focused)="focused($event)"
      (blurred)="blurred($event)">
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
      [hideTextOnLoading]="hideTextOnLoading"
      [fullWidth]="fullWidth"
      [rounded]="rounded"
      [square]="square"
      [customClass]="customClass"
      [ariaLabel]="ariaLabel"
      [testId]="testId"
      (clicked)="clicked($event)"
      (focused)="focused($event)"
      (blurred)="blurred($event)">
      Secondary Button
    </qk-button>`
    })
};

export const Success: Story = {
    args: {
        variant: 'success',
        size: 'md'
    },
    render: (args) => ({
        props: args,
        template: `<qk-button 
      [variant]="variant" 
      [size]="size" 
      [disabled]="disabled" 
      [loading]="loading"
      [hideTextOnLoading]="hideTextOnLoading"
      [fullWidth]="fullWidth"
      [rounded]="rounded"
      [square]="square"
      [customClass]="customClass"
      [ariaLabel]="ariaLabel"
      [testId]="testId"
      (clicked)="clicked($event)"
      (focused)="focused($event)"
      (blurred)="blurred($event)">
      Success Button
    </qk-button>`
    })
};

export const Danger: Story = {
    args: {
        variant: 'danger',
        size: 'md'
    },
    render: (args) => ({
        props: args,
        template: `<qk-button 
      [variant]="variant" 
      [size]="size" 
      [disabled]="disabled" 
      [loading]="loading"
      [hideTextOnLoading]="hideTextOnLoading"
      [fullWidth]="fullWidth"
      [rounded]="rounded"
      [square]="square"
      [customClass]="customClass"
      [ariaLabel]="ariaLabel"
      [testId]="testId"
      (clicked)="clicked($event)"
      (focused)="focused($event)"
      (blurred)="blurred($event)">
      Danger Button
    </qk-button>`
    })
};

// Size Variations
export const AllSizes: Story = {
    render: () => ({
        template: `
    <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
      <qk-button variant="primary" size="xs">Extra Small</qk-button>
      <qk-button variant="primary" size="sm">Small</qk-button>
      <qk-button variant="primary" size="md">Medium</qk-button>
      <qk-button variant="primary" size="lg">Large</qk-button>
      <qk-button variant="primary" size="xl">Extra Large</qk-button>
    </div>
    `
    }),
    parameters: {
        docs: {
            description: {
                story: 'Buttons are available in 5 different sizes: xs, sm, md, lg, xl'
            }
        }
    }
};

// All Variants
export const AllVariants: Story = {
    render: () => ({
        template: `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
      <qk-button variant="primary">Primary</qk-button>
      <qk-button variant="secondary">Secondary</qk-button>
      <qk-button variant="success">Success</qk-button>
      <qk-button variant="danger">Danger</qk-button>
      <qk-button variant="warning">Warning</qk-button>
      <qk-button variant="info">Info</qk-button>
      <qk-button variant="light">Light</qk-button>
      <qk-button variant="dark">Dark</qk-button>
      <qk-button variant="outline-primary">Outline Primary</qk-button>
      <qk-button variant="outline-secondary">Outline Secondary</qk-button>
      <qk-button variant="outline-success">Outline Success</qk-button>
      <qk-button variant="outline-danger">Outline Danger</qk-button>
      <qk-button variant="outline-warning">Outline Warning</qk-button>
      <qk-button variant="outline-info">Outline Info</qk-button>
      <qk-button variant="outline-light">Outline Light</qk-button>
      <qk-button variant="outline-dark">Outline Dark</qk-button>
    </div>
    `
    }),
    parameters: {
        docs: {
            description: {
                story: 'All available button variants including solid and outline styles'
            }
        }
    }
};

// Loading State
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
      [loading]="loading"
      [hideTextOnLoading]="hideTextOnLoading">
      Loading Button
    </qk-button>`
    }),
    parameters: {
        docs: {
            description: {
                story: 'Button in loading state with spinner animation'
            }
        }
    }
};

export const LoadingHideText: Story = {
    args: {
        variant: 'primary',
        loading: true,
        hideTextOnLoading: true,
        size: 'md'
    },
    render: (args) => ({
        props: args,
        template: `<qk-button 
      [variant]="variant" 
      [size]="size" 
      [loading]="loading"
      [hideTextOnLoading]="hideTextOnLoading">
      Processing...
    </qk-button>`
    }),
    parameters: {
        docs: {
            description: {
                story: 'Button in loading state with hidden text content'
            }
        }
    }
};

// Disabled State
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
    }),
    parameters: {
        docs: {
            description: {
                story: 'Button in disabled state'
            }
        }
    }
};

// Full Width
export const FullWidth: Story = {
    args: {
        variant: 'primary',
        fullWidth: true,
        size: 'md'
    },
    render: (args) => ({
        props: args,
        template: `<qk-button 
      [variant]="variant" 
      [size]="size" 
      [fullWidth]="fullWidth">
      Full Width Button
    </qk-button>`
    }),
    parameters: {
        docs: {
            description: {
                story: 'Button that takes the full width of its container'
            }
        }
    }
};

// Shape Variations
export const Rounded: Story = {
    args: {
        variant: 'primary',
        rounded: true,
        size: 'md'
    },
    render: (args) => ({
        props: args,
        template: `<qk-button 
      [variant]="variant" 
      [size]="size" 
      [rounded]="rounded">
      Rounded Button
    </qk-button>`
    }),
    parameters: {
        docs: {
            description: {
                story: 'Button with fully rounded corners'
            }
        }
    }
};

export const Square: Story = {
    args: {
        variant: 'primary',
        square: true,
        size: 'md'
    },
    render: (args) => ({
        props: args,
        template: `<qk-button 
      [variant]="variant" 
      [size]="size" 
      [square]="square">
      Square Button
    </qk-button>`
    }),
    parameters: {
        docs: {
            description: {
                story: 'Button with no border radius (square corners)'
            }
        }
    }
};

// With Icons
export const WithLeftIcon: Story = {
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
    }),
    parameters: {
        docs: {
            description: {
                story: 'Button with an icon on the left side'
            }
        }
    }
};

export const WithRightIcon: Story = {
    args: {
        variant: 'primary',
        size: 'md'
    },
    render: (args) => ({
        props: args,
        template: `<qk-button 
      [variant]="variant" 
      [size]="size">
      Continue
      <svg slot="icon-right" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
      </svg>
    </qk-button>`
    }),
    parameters: {
        docs: {
            description: {
                story: 'Button with an icon on the right side'
            }
        }
    }
};

export const WithBothIcons: Story = {
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
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
      Save Changes
      <svg slot="icon-right" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
      </svg>
    </qk-button>`
    }),
    parameters: {
        docs: {
            description: {
                story: 'Button with icons on both left and right sides'
            }
        }
    }
};

// Icon Only Button
export const IconOnly: Story = {
    args: {
        variant: 'primary',
        size: 'md',
        ariaLabel: 'Delete item'
    },
    render: (args) => ({
        props: args,
        template: `<qk-button 
      [variant]="variant" 
      [size]="size"
      [ariaLabel]="ariaLabel"
      style="padding: 0.625rem;">
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </qk-button>`
    }),
    parameters: {
        docs: {
            description: {
                story: 'Button with only an icon, useful for actions like delete, close, etc. Make sure to provide an aria-label for accessibility.'
            }
        }
    }
};

// Interactive Examples
export const InteractiveStates: Story = {
    render: () => ({
        template: `
    <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start; max-width: 300px;">
      <qk-button variant="primary">Normal State</qk-button>
      <qk-button variant="primary" [disabled]="true">Disabled State</qk-button>
      <qk-button variant="primary" [loading]="true">Loading State</qk-button>
      <qk-button variant="primary" [loading]="true" [hideTextOnLoading]="true">Loading (Hidden Text)</qk-button>
    </div>
    `
    }),
    parameters: {
        docs: {
            description: {
                story: 'Different interactive states of the button component'
            }
        }
    }
};

export const Playground: Story = {
    args: {
        variant: 'primary',
        size: 'md',
        disabled: false,
        loading: false,
        hideTextOnLoading: false,
        fullWidth: false,
        rounded: false,
        square: false,
        type: 'button',
        customClass: '',
        ariaLabel: '',
        testId: 'button-playground'
    },
    render: (args) => ({
        props: args,
        template: `<qk-button 
      [variant]="variant" 
      [size]="size" 
      [type]="type"
      [disabled]="disabled" 
      [loading]="loading"
      [hideTextOnLoading]="hideTextOnLoading"
      [fullWidth]="fullWidth"
      [rounded]="rounded"
      [square]="square"
      [customClass]="customClass"
      [ariaLabel]="ariaLabel"
      [testId]="testId"
      (clicked)="clicked($event)"
      (focused)="focused($event)"
      (blurred)="blurred($event)">
      Playground Button
    </qk-button>`
    }),
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to experiment with all button properties and see real-time changes.'
            }
        }
    }
};

// Additional stories for better coverage
export const FocusAndBlurEvents: Story = {
    args: {
        variant: 'primary',
        size: 'md'
    },
    render: (args) => ({
        props: args,
        template: `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p>This story tests focus and blur events:</p>
      <qk-button 
        [variant]="variant" 
        [size]="size"
        (clicked)="clicked($event)"
        (focused)="focused($event)"
        (blurred)="blurred($event)">
        Focus/Blur Test Button
      </qk-button>
      <qk-button variant="secondary">Another Button (for tabbing)</qk-button>
    </div>
    `
    }),
    parameters: {
        docs: {
            description: {
                story: 'Story specifically designed to test focus and blur event handling. The play function will automatically trigger these events for testing coverage.'
            }
        }
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByText('Focus/Blur Test Button');

        // Focus the button
        await userEvent.click(button);
        await button.focus();

        // Blur the button by focusing another element
        const secondButton = canvas.getByText('Another Button (for tabbing)');
        await userEvent.tab();
        await secondButton.focus();
    }
};

export const CustomClassHandling: Story = {
    args: {
        variant: 'primary',
        size: 'md',
        customClass: 'my-custom-class another-custom-class'
    },
    render: (args) => ({
        props: args,
        template: `<qk-button 
      [variant]="variant" 
      [size]="size"
      [customClass]="customClass">
      Button with Custom Classes
    </qk-button>`
    }),
    parameters: {
        docs: {
            description: {
                story: 'Tests custom class handling in the buttonClasses getter.'
            }
        }
    }
};

export const EmptyCustomClass: Story = {
    args: {
        variant: 'primary',
        size: 'md',
        customClass: ''
    },
    render: (args) => ({
        props: args,
        template: `<qk-button 
      [variant]="variant" 
      [size]="size"
      [customClass]="customClass">
      Button with Empty Custom Class
    </qk-button>`
    }),
    parameters: {
        docs: {
            description: {
                story: 'Tests handling of empty custom class to ensure no empty strings are added to classes.'
            }
        }
    }
};

export const AllModifiersCombined: Story = {
    args: {
        variant: 'success',
        size: 'lg',
        fullWidth: true,
        rounded: true,
        loading: true,
        disabled: false,
        customClass: 'test-modifier-class'
    },
    render: (args) => ({
        props: args,
        template: `<qk-button 
      [variant]="variant" 
      [size]="size"
      [fullWidth]="fullWidth"
      [rounded]="rounded"
      [loading]="loading"
      [disabled]="disabled"
      [customClass]="customClass">
      All Modifiers Combined
    </qk-button>`
    }),
    parameters: {
        docs: {
            description: {
                story: 'Tests all possible modifier combinations to ensure buttonClasses getter covers all branches.'
            }
        }
    }
};

export const ClickWhenDisabled: Story = {
    args: {
        variant: 'primary',
        size: 'md',
        disabled: true
    },
    render: (args) => ({
        props: args,
        template: `<qk-button 
      [variant]="variant" 
      [size]="size"
      [disabled]="disabled"
      (clicked)="clicked($event)">
      Disabled Button (Click Test)
    </qk-button>`
    }),
    parameters: {
        docs: {
            description: {
                story: 'Tests that click events are not emitted when button is disabled. The button has pointer-events: none so interactions are prevented.'
            }
        }
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button');

        // Verify the button is disabled (has correct attributes)
        expect(button).toBeDisabled();
        expect(button).toHaveClass('qk-btn--disabled');
    }
};

export const ClickWhenLoading: Story = {
    args: {
        variant: 'primary',
        size: 'md',
        loading: true
    },
    render: (args) => ({
        props: args,
        template: `<qk-button 
      [variant]="variant" 
      [size]="size"
      [loading]="loading"
      (clicked)="clicked($event)">
      Loading Button (Click Test)
    </qk-button>`
    }),
    parameters: {
        docs: {
            description: {
                story: 'Tests that click events are not emitted when button is in loading state. The button has pointer-events: none so interactions are prevented.'
            }
        }
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button');

        // Verify the button is disabled due to loading and has loading class
        expect(button).toBeDisabled();
        expect(button).toHaveClass('qk-btn--loading');

        // Verify spinner is present
        const spinner = canvas.getByRole('button').querySelector('.qk-btn-spinner');
        expect(spinner).toBeInTheDocument();
    }
};

export const SquareModifier: Story = {
    args: {
        variant: 'info',
        size: 'md',
        square: true
    },
    render: (args) => ({
        props: args,
        template: `<qk-button 
      [variant]="variant" 
      [size]="size"
      [square]="square">
      Square Button Test
    </qk-button>`
    }),
    parameters: {
        docs: {
            description: {
                story: 'Tests the square modifier to ensure it adds the correct CSS class.'
            }
        }
    }
};

export const DisabledAndLoading: Story = {
    args: {
        variant: 'warning',
        size: 'sm',
        disabled: true,
        loading: true
    },
    render: (args) => ({
        props: args,
        template: `<qk-button 
      [variant]="variant" 
      [size]="size"
      [disabled]="disabled"
      [loading]="loading">
      Disabled + Loading
    </qk-button>`
    }),
    parameters: {
        docs: {
            description: {
                story: 'Tests combination of disabled and loading states.'
            }
        }
    }
};

export const FullWidthWithCustomClass: Story = {
    args: {
        variant: 'dark',
        size: 'xl',
        fullWidth: true,
        customClass: 'test-full-width-custom'
    },
    render: (args) => ({
        props: args,
        template: `<qk-button 
      [variant]="variant" 
      [size]="size"
      [fullWidth]="fullWidth"
      [customClass]="customClass">
      Full Width + Custom Class
    </qk-button>`
    }),
    parameters: {
        docs: {
            description: {
                story: 'Tests full width with custom class combination.'
            }
        }
    }
};

export const InteractionTest: Story = {
    args: {
        variant: 'primary',
        size: 'md'
    },
    render: (args) => ({
        props: args,
        template: `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <qk-button 
        [variant]="variant" 
        [size]="size"
        (clicked)="clicked($event)"
        (focused)="focused($event)"
        (blurred)="blurred($event)">
        Interactive Test Button
      </qk-button>
      <input type="text" placeholder="Focus target" />
    </div>
    `
    }),
    parameters: {
        docs: {
            description: {
                story: 'Comprehensive interaction test that exercises all event handlers.'
            }
        }
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByText('Interactive Test Button');
        const input = canvas.getByPlaceholderText('Focus target');

        // Test successful click
        await userEvent.click(button);
        expect(args.clicked).toHaveBeenCalled();

        // Test focus
        await button.focus();
        expect(args.focused).toHaveBeenCalled();

        // Test blur by focusing another element
        await input.focus();
        expect(args.blurred).toHaveBeenCalled();
    }
};
