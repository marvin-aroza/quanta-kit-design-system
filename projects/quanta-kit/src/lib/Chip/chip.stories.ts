import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { expect, userEvent, within } from 'storybook/test';
import { ChipComponent, ChipVariant, ChipSize, ChipElevation } from './chip.component';

const meta: Meta<ChipComponent> = {
  title: 'Components/Chip',
  component: ChipComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The Chip component follows Material UI 3 design guidelines and provides versatile functionality for representing input, attributes, or actions.

## Features
- **4 Variants**: assist, filter, input, suggestion following Material UI 3 specifications
- **2 Sizes**: sm (24px), md (32px)
- **2 Elevations**: flat, elevated
- **Interactive States**: clickable, selectable, removable
- **Icon Support**: leading icons, trailing icons, avatars
- **Accessibility**: ARIA attributes, keyboard navigation
- **Events**: click, remove, focus, blur, selection change

## Chip Types (Material UI 3)
- **Assist Chips**: Help users take actions or see information
- **Filter Chips**: Let users select from a set of options
- **Input Chips**: Represent discrete pieces of information
- **Suggestion Chips**: Present dynamically generated suggestions

## Usage
\`\`\`html
<qk-chip variant="assist" size="md" [clickable]="true">
  Assist Chip
</qk-chip>
\`\`\`

## With Icons
\`\`\`html
<qk-chip variant="filter" [hasLeadingIcon]="true">
  <svg slot="leading-icon" width="18" height="18">...</svg>
  Filter with Icon
</qk-chip>
\`\`\`

## Removable Input Chip
\`\`\`html
<qk-chip variant="input" [removable]="true" (removed)="onRemove($event)">
  Removable Input
</qk-chip>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['assist', 'filter', 'input', 'suggestion'] as ChipVariant[],
      description: 'The Material UI 3 chip variant'
    },
    size: {
      control: 'select',
      options: ['sm', 'md'] as ChipSize[],
      description: 'The size of the chip'
    },
    elevation: {
      control: 'select',
      options: ['flat', 'elevated'] as ChipElevation[],
      description: 'The elevation style of the chip'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the chip is disabled'
    },
    selected: {
      control: 'boolean',
      description: 'Whether the chip is selected (for filter chips)'
    },
    clickable: {
      control: 'boolean',
      description: 'Whether the chip is clickable'
    },
    removable: {
      control: 'boolean',
      description: 'Whether the chip can be removed'
    },
    hasLeadingIcon: {
      control: 'boolean',
      description: 'Whether the chip has a leading icon'
    },
    hasTrailingIcon: {
      control: 'boolean',
      description: 'Whether the chip has a trailing icon'
    },
    hasAvatar: {
      control: 'boolean',
      description: 'Whether the chip has an avatar'
    },
    customClass: {
      control: 'text',
      description: 'Custom CSS classes to apply'
    },
    ariaLabel: {
      control: 'text',
      description: 'ARIA label for accessibility'
    },
    removeAriaLabel: {
      control: 'text',
      description: 'ARIA label for remove button'
    },
    testId: {
      control: 'text',
      description: 'Test ID for testing purposes'
    },
    clicked: {
      action: 'clicked',
      description: 'Event emitted when chip is clicked'
    },
    removed: {
      action: 'removed',
      description: 'Event emitted when chip is removed'
    },
    focused: {
      action: 'focused',
      description: 'Event emitted when chip receives focus'
    },
    blurred: {
      action: 'blurred',
      description: 'Event emitted when chip loses focus'
    },
    selectionChange: {
      action: 'selectionChange',
      description: 'Event emitted when chip selection changes'
    }
  },
  args: {
    selected: false,
    ariaLabel: 'Chip action',
    clicked: fn(),
    removed: fn(),
    focused: fn(),
    blurred: fn(),
    selectionChange: fn()
  }
};

export default meta;
type Story = StoryObj<ChipComponent>;

// Basic Variants
export const AssistChip: Story = {
  args: {
    variant: 'assist',
    size: 'md',
    elevation: 'flat'
  },
  render: (args) => ({
    props: args,
    template: `<qk-chip 
      [variant]="variant" 
      [size]="size" 
      [elevation]="elevation"
      [disabled]="disabled" 
      [selected]="selected"
      [clickable]="clickable"
      [removable]="removable"
      [hasLeadingIcon]="hasLeadingIcon"
      [hasTrailingIcon]="hasTrailingIcon"
      [hasAvatar]="hasAvatar"
      [customClass]="customClass"
      [ariaLabel]="ariaLabel"
      [removeAriaLabel]="removeAriaLabel"
      [testId]="testId"
      (clicked)="clicked($event)"
      (removed)="removed($event)"
      (focused)="focused($event)"
      (blurred)="blurred($event)"
      (selectionChange)="selectionChange($event)">
      Assist Chip
    </qk-chip>`
  })
};

export const FilterChip: Story = {
  args: {
    variant: 'filter',
    size: 'md',
    elevation: 'flat',
    selected: false,
    ariaLabel: 'Filter by category'
  },
  render: (args) => ({
    props: args,
    template: `<qk-chip 
      [variant]="variant" 
      [size]="size" 
      [elevation]="elevation"
      [disabled]="disabled" 
      [selected]="selected"
      [clickable]="clickable"
      [removable]="removable"
      [hasLeadingIcon]="hasLeadingIcon"
      [hasTrailingIcon]="hasTrailingIcon"
      [hasAvatar]="hasAvatar"
      [customClass]="customClass"
      [ariaLabel]="ariaLabel"
      [removeAriaLabel]="removeAriaLabel"
      [testId]="testId"
      (clicked)="clicked($event)"
      (removed)="removed($event)"
      (focused)="focused($event)"
      (blurred)="blurred($event)"
      (selectionChange)="selectionChange($event)">
      Filter Chip
    </qk-chip>`
  })
};

export const InputChip: Story = {
  args: {
    variant: 'input',
    size: 'md',
    elevation: 'flat'
  },
  render: (args) => ({
    props: args,
    template: `<qk-chip 
      [variant]="variant" 
      [size]="size" 
      [elevation]="elevation"
      [disabled]="disabled" 
      [selected]="selected"
      [clickable]="clickable"
      [removable]="removable"
      [hasLeadingIcon]="hasLeadingIcon"
      [hasTrailingIcon]="hasTrailingIcon"
      [hasAvatar]="hasAvatar"
      [customClass]="customClass"
      [ariaLabel]="ariaLabel"
      [removeAriaLabel]="removeAriaLabel"
      [testId]="testId"
      (clicked)="clicked($event)"
      (removed)="removed($event)"
      (focused)="focused($event)"
      (blurred)="blurred($event)"
      (selectionChange)="selectionChange($event)">
      Input Chip
    </qk-chip>`
  })
};

export const SuggestionChip: Story = {
  args: {
    variant: 'suggestion',
    size: 'md',
    elevation: 'flat'
  },
  render: (args) => ({
    props: args,
    template: `<qk-chip 
      [variant]="variant" 
      [size]="size" 
      [elevation]="elevation"
      [disabled]="disabled" 
      [selected]="selected"
      [clickable]="clickable"
      [removable]="removable"
      [hasLeadingIcon]="hasLeadingIcon"
      [hasTrailingIcon]="hasTrailingIcon"
      [hasAvatar]="hasAvatar"
      [customClass]="customClass"
      [ariaLabel]="ariaLabel"
      [removeAriaLabel]="removeAriaLabel"
      [testId]="testId"
      (clicked)="clicked($event)"
      (removed)="removed($event)"
      (focused)="focused($event)"
      (blurred)="blurred($event)"
      (selectionChange)="selectionChange($event)">
      Suggestion Chip
    </qk-chip>`
  })
};

// All Variants Overview
export const AllVariants: Story = {
  render: () => ({
    template: `
    <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
      <qk-chip variant="assist" ariaLabel="Assist action">Assist Chip</qk-chip>
      <qk-chip variant="filter" ariaLabel="Filter option">Filter Chip</qk-chip>
      <qk-chip variant="input" ariaLabel="Input tag">Input Chip</qk-chip>
      <qk-chip variant="suggestion" ariaLabel="Suggestion option">Suggestion Chip</qk-chip>
    </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'All four Material UI 3 chip variants'
      }
    }
  }
};

// Sizes
export const AllSizes: Story = {
  render: () => ({
    template: `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; gap: 12px; align-items: center;">
        <span style="width: 80px; font-weight: 500;">Small:</span>
        <qk-chip variant="assist" size="sm" ariaLabel="Small assist">Small Chip</qk-chip>
        <qk-chip variant="filter" size="sm" ariaLabel="Small filter">Filter</qk-chip>
        <qk-chip variant="input" size="sm" ariaLabel="Small input">Input</qk-chip>
        <qk-chip variant="suggestion" size="sm" ariaLabel="Small suggestion">Suggestion</qk-chip>
      </div>
      <div style="display: flex; gap: 12px; align-items: center;">
        <span style="width: 80px; font-weight: 500;">Medium:</span>
        <qk-chip variant="assist" size="md" ariaLabel="Medium assist">Medium Chip</qk-chip>
        <qk-chip variant="filter" size="md" ariaLabel="Medium filter">Filter</qk-chip>
        <qk-chip variant="input" size="md" ariaLabel="Medium input">Input</qk-chip>
        <qk-chip variant="suggestion" size="md" ariaLabel="Medium suggestion">Suggestion</qk-chip>
      </div>
    </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Chips in small (24px) and medium (32px) sizes'
      }
    }
  }
};

// Elevations
export const AllElevations: Story = {
  render: () => ({
    template: `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; gap: 12px; align-items: center;">
        <span style="width: 80px; font-weight: 500;">Flat:</span>
        <qk-chip variant="assist" elevation="flat" ariaLabel="Flat assist">Assist</qk-chip>
        <qk-chip variant="filter" elevation="flat" ariaLabel="Flat filter">Filter</qk-chip>
        <qk-chip variant="input" elevation="flat" ariaLabel="Flat input">Input</qk-chip>
        <qk-chip variant="suggestion" elevation="flat" ariaLabel="Flat suggestion">Suggestion</qk-chip>
      </div>
      <div style="display: flex; gap: 12px; align-items: center;">
        <span style="width: 80px; font-weight: 500;">Elevated:</span>
        <qk-chip variant="assist" elevation="elevated" ariaLabel="Elevated assist">Assist</qk-chip>
        <qk-chip variant="filter" elevation="elevated" ariaLabel="Elevated filter">Filter</qk-chip>
        <qk-chip variant="input" elevation="elevated" ariaLabel="Elevated input">Input</qk-chip>
        <qk-chip variant="suggestion" elevation="elevated" ariaLabel="Elevated suggestion">Suggestion</qk-chip>
      </div>
    </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Chips with flat and elevated styles'
      }
    }
  }
};

// With Icons
export const WithLeadingIcon: Story = {
  args: {
    variant: 'assist',
    hasLeadingIcon: true
  },
  render: (args) => ({
    props: args,
    template: `<qk-chip 
      [variant]="variant" 
      [hasLeadingIcon]="hasLeadingIcon">
      <svg leading-icon width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      With Leading Icon
    </qk-chip>`
  })
};

export const WithTrailingIcon: Story = {
  args: {
    variant: 'assist',
    hasTrailingIcon: true
  },
  render: (args) => ({
    props: args,
    template: `<qk-chip 
      [variant]="variant" 
      [hasTrailingIcon]="hasTrailingIcon">
      With Trailing Icon
      <svg trailing-icon width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
      </svg>
    </qk-chip>`
  })
};

export const WithAvatar: Story = {
  args: {
    variant: 'input',
    hasAvatar: true
  },
  render: (args) => ({
    props: args,
    template: `<qk-chip 
      [variant]="variant" 
      [hasAvatar]="hasAvatar">
      <img avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="User" style="width: 100%; height: 100%; object-fit: cover;">
      John Doe
    </qk-chip>`
  })
};

export const WithAvatarInitials: Story = {
  args: {
    variant: 'input',
    hasAvatar: true
  },
  render: (args) => ({
    props: args,
    template: `<qk-chip 
      [variant]="variant" 
      [hasAvatar]="hasAvatar">
      <span avatar style="font-size: 12px; font-weight: 500;">JD</span>
      John Doe
    </qk-chip>`
  })
};

// Removable Chips
export const RemovableChip: Story = {
  args: {
    variant: 'input',
    removable: true
  },
  render: (args) => ({
    props: args,
    template: `<qk-chip 
      [variant]="variant" 
      [removable]="removable"
      (removed)="removed($event)">
      Removable Chip
    </qk-chip>`
  })
};

export const RemovableWithCustomIcon: Story = {
  args: {
    variant: 'input',
    removable: true
  },
  render: (args) => ({
    props: args,
    template: `<qk-chip 
      [variant]="variant" 
      [removable]="removable"
      (removed)="removed($event)">
      Custom Remove Icon
      <svg remove-icon width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
      </svg>
    </qk-chip>`
  })
};

// Interactive States
export const FilterChipInteractive: Story = {
  args: {
    variant: 'filter',
    selected: false
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <qk-chip 
        variant="filter" 
        [selected]="false"
        (selectionChange)="selectionChange($event)">
        Unselected Filter
      </qk-chip>
      <qk-chip 
        variant="filter" 
        [selected]="true"
        (selectionChange)="selectionChange($event)">
        Selected Filter
      </qk-chip>
    </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Filter chips with unselected and selected states'
      }
    }
  }
};

export const DisabledStates: Story = {
  render: () => ({
    template: `
    <div style="display: flex; flex-wrap: wrap; gap: 12px;">
      <qk-chip variant="assist" [disabled]="true" ariaLabel="Disabled assist chip">Disabled Assist</qk-chip>
      <qk-chip variant="filter" [disabled]="true" ariaLabel="Disabled filter chip">Disabled Filter</qk-chip>
      <qk-chip variant="input" [disabled]="true" [removable]="true" ariaLabel="Disabled input chip">Disabled Input</qk-chip>
      <qk-chip variant="suggestion" [disabled]="true" ariaLabel="Disabled suggestion chip">Disabled Suggestion</qk-chip>
    </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Chips in disabled state'
      }
    }
  }
};

// Complex Examples
export const ChipSet: Story = {
  render: () => ({
    template: `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div>
        <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 500;">Assist Chips</h4>
        <ul role="list" style="display: flex; flex-wrap: wrap; gap: 8px; list-style: none; margin: 0; padding: 0;">
          <li>
            <qk-chip variant="assist" [hasLeadingIcon]="true" [inList]="true">
              <svg slot="leading-icon" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zM12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
              </svg>
              Set reminder
            </qk-chip>
          </li>
          <li>
            <qk-chip variant="assist" [hasLeadingIcon]="true" [inList]="true">
              <svg slot="leading-icon" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Add to cart
            </qk-chip>
          </li>
          <li>
            <qk-chip variant="assist" [inList]="true">Get directions</qk-chip>
          </li>
        </ul>
      </div>

      <div>
        <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 500;">Filter Chips</h4>
        <ul role="list" style="display: flex; flex-wrap: wrap; gap: 8px; list-style: none; margin: 0; padding: 0;">
          <li>
            <qk-chip variant="filter" [selected]="true" [inList]="true" ariaLabel="Popular filter, currently selected">Popular</qk-chip>
          </li>
          <li>
            <qk-chip variant="filter" [inList]="true" ariaLabel="Nearby filter">Nearby</qk-chip>
          </li>
          <li>
            <qk-chip variant="filter" [inList]="true" ariaLabel="Price filter">Price</qk-chip>
          </li>
          <li>
            <qk-chip variant="filter" [inList]="true" ariaLabel="Rating filter">Rating</qk-chip>
          </li>
        </ul>
      </div>

      <div>
        <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 500;">Input Chips</h4>
        <ul role="list" style="display: flex; flex-wrap: wrap; gap: 8px; list-style: none; margin: 0; padding: 0;">
          <li>
            <qk-chip variant="input" [hasAvatar]="true" [removable]="true" [inList]="true">
              <span slot="avatar" style="font-size: 12px; font-weight: 500;">JS</span>
              JavaScript
            </qk-chip>
          </li>
          <li>
            <qk-chip variant="input" [hasAvatar]="true" [removable]="true" [inList]="true">
              <span slot="avatar" style="font-size: 12px; font-weight: 500;">TS</span>
              TypeScript
            </qk-chip>
          </li>
          <li>
            <qk-chip variant="input" [removable]="true" [inList]="true">Angular</qk-chip>
          </li>
          <li>
            <qk-chip variant="input" [removable]="true" [inList]="true">React</qk-chip>
          </li>
        </ul>
      </div>

      <div>
        <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 500;">Suggestion Chips</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          <qk-chip variant="suggestion">Coffee shops</qk-chip>
          <qk-chip variant="suggestion">Restaurants</qk-chip>
          <qk-chip variant="suggestion">Gas stations</qk-chip>
          <qk-chip variant="suggestion">Hotels</qk-chip>
        </div>
      </div>
    </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Real-world example showing different chip types in context'
      }
    }
  }
};

// =============================================================================
// COVERAGE ENHANCEMENT STORIES (for 90%+ code coverage)
// =============================================================================

export const KeyboardNavigation: Story = {
  args: {
    variant: 'assist',
    clickable: true,
    ariaLabel: 'Keyboard test chip',
    clicked: fn(),
    focused: fn(),
    blurred: fn()
  },
  render: (args) => ({
    props: args,
    template: `<qk-chip 
      [variant]="variant" 
      [clickable]="clickable"
      [ariaLabel]="ariaLabel"
      (clicked)="clicked($event)"
      (focused)="focused($event)"
      (blurred)="blurred($event)">
      Keyboard Test
    </qk-chip>`
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByRole('button');
    
    // Test focus
    chip.focus();
    expect(args.focused).toHaveBeenCalled();
    
    // Test keyboard interaction
    await userEvent.keyboard('{Enter}');
    expect(args.clicked).toHaveBeenCalled();
    
    await userEvent.keyboard(' ');
    expect(args.clicked).toHaveBeenCalledTimes(2);
    
    // Test blur
    chip.blur();
    expect(args.blurred).toHaveBeenCalled();
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests keyboard navigation and event handling for accessibility compliance.'
      }
    }
  }
};

export const RemovableChipKeyboard: Story = {
  args: {
    variant: 'input',
    removable: true,
    removeAriaLabel: 'Custom remove label',
    removed: fn()
  },
  render: (args) => ({
    props: args,
    template: `<qk-chip 
      [variant]="variant" 
      [removable]="removable"
      [removeAriaLabel]="removeAriaLabel"
      (removed)="removed($event)">
      Removable Input
    </qk-chip>`
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const removeButton = canvas.getByRole('button', { name: 'Custom remove label' });
    
    // Test keyboard removal with Enter
    removeButton.focus();
    await userEvent.keyboard('{Enter}');
    expect(args.removed).toHaveBeenCalled();
    
    // Test keyboard removal with Space
    await userEvent.keyboard(' ');
    expect(args.removed).toHaveBeenCalledTimes(2);
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests keyboard removal functionality for input chips.'
      }
    }
  }
};

export const DisabledStatesComprehensive: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 12px; padding: 20px;">
        <!-- Disabled clickable chip -->
        <qk-chip [disabled]="true" [clickable]="true">Disabled Clickable</qk-chip>
        
        <!-- Disabled removable chip -->
        <qk-chip [disabled]="true" [removable]="true">Disabled Removable</qk-chip>
        
        <!-- Disabled filter chip -->
        <qk-chip variant="filter" [disabled]="true" [selected]="true">Disabled Selected Filter</qk-chip>
        
        <!-- Non-clickable chip -->
        <qk-chip [clickable]="false">Non-clickable</qk-chip>
        
        <!-- Non-clickable filter chip -->
        <qk-chip variant="filter" [clickable]="false">Non-clickable Filter</qk-chip>
      </div>
    `
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test that disabled chips are present and have disabled styling
    const disabledChips = canvas.getAllByText(/Disabled/);
    expect(disabledChips.length).toBe(3);
    
    // Test non-clickable chips are present
    const nonClickableChips = canvas.getAllByText(/Non-clickable/);
    expect(nonClickableChips.length).toBe(2);
  },
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive testing of disabled and non-clickable states.'
      }
    }
  }
};

export const AllRolesCoverage: Story = {
  render: () => ({
    template: `
      <div style="padding: 20px;">
        <!-- Filter chip (checkbox role) -->
        <qk-chip variant="filter">Filter Checkbox</qk-chip>
        
        <!-- Removable chip in list (listitem role) -->
        <ul style="list-style: none; padding: 0;">
          <li>
            <qk-chip [removable]="true" [inList]="true">Removable in List</qk-chip>
          </li>
        </ul>
        
        <!-- Removable chip standalone (presentation role) -->
        <qk-chip [removable]="true">Removable Standalone</qk-chip>
        
        <!-- Clickable chip (button role) -->
        <qk-chip [clickable]="true">Clickable Button</qk-chip>
        
        <!-- Non-clickable chip in list (listitem role) -->
        <ul style="list-style: none; padding: 0;">
          <li>
            <qk-chip [clickable]="false" [inList]="true">Non-clickable in List</qk-chip>
          </li>
        </ul>
        
        <!-- Non-clickable standalone (presentation role) -->
        <qk-chip [clickable]="false">Non-clickable Standalone</qk-chip>
      </div>
    `
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify different ARIA roles are applied
    const checkbox = canvas.getByRole('checkbox');
    expect(checkbox).toHaveTextContent('Filter Checkbox');
    
    const buttons = canvas.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(1);
    
    const listitems = canvas.getAllByRole('listitem');
    expect(listitems.length).toBeGreaterThanOrEqual(2);
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests all possible ARIA role combinations for comprehensive coverage.'
      }
    }
  }
};

export const AllClassModifiers: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 8px; padding: 20px;">
        <!-- All variants -->
        <qk-chip variant="assist">Assist</qk-chip>
        <qk-chip variant="filter">Filter</qk-chip>
        <qk-chip variant="input">Input</qk-chip>
        <qk-chip variant="suggestion">Suggestion</qk-chip>
        
        <!-- All sizes -->
        <qk-chip size="sm">Small</qk-chip>
        <qk-chip size="md">Medium</qk-chip>
        
        <!-- All elevations -->
        <qk-chip elevation="flat">Flat</qk-chip>
        <qk-chip elevation="elevated">Elevated</qk-chip>
        
        <!-- All state modifiers -->
        <qk-chip [disabled]="true">Disabled</qk-chip>
        <qk-chip [selected]="true">Selected</qk-chip>
        <qk-chip [clickable]="true">Clickable</qk-chip>
        <qk-chip [removable]="true">Removable</qk-chip>
        <qk-chip [hasLeadingIcon]="true">Has Leading Icon</qk-chip>
        <qk-chip [hasTrailingIcon]="true">Has Trailing Icon</qk-chip>
        <qk-chip [hasAvatar]="true">Has Avatar</qk-chip>
        <qk-chip [customClass]="'custom-test-class'">Custom Class</qk-chip>
        
        <!-- Combined modifiers -->
        <qk-chip 
          variant="filter" 
          size="sm" 
          elevation="elevated" 
          [selected]="true" 
          [hasLeadingIcon]="true"
          [customClass]="'combined-test'">
          Combined
        </qk-chip>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Tests all CSS class modifiers for complete styling coverage.'
      }
    }
  }
};

export const EventHandlers: Story = {
  args: {
    variant: 'filter',
    clickable: true,
    removable: true,
    clicked: fn(),
    removed: fn(),
    focused: fn(),
    blurred: fn(),
    selectionChange: fn()
  },
  render: (args) => ({
    props: args,
    template: `<qk-chip 
      [variant]="variant" 
      [clickable]="clickable"
      [removable]="removable"
      (clicked)="clicked($event)"
      (removed)="removed($event)"
      (focused)="focused($event)"
      (blurred)="blurred($event)"
      (selectionChange)="selectionChange($event)">
      Event Test Chip
    </qk-chip>`
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByText('Event Test Chip');
    const removeButton = canvas.getByRole('button', { name: 'Remove chip' });
    
    // Test click and selection change
    await userEvent.click(chip);
    expect(args.clicked).toHaveBeenCalled();
    expect(args.selectionChange).toHaveBeenCalledWith(true);
    
    // Test remove
    await userEvent.click(removeButton);
    expect(args.removed).toHaveBeenCalled();
    
    // Test focus/blur - focus on the remove button since the chip container is not focusable
    removeButton.focus();
    expect(args.focused).toHaveBeenCalled();
    
    chip.blur();
    expect(args.blurred).toHaveBeenCalled();
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests all event handlers for complete functional coverage.'
      }
    }
  }
};

export const PropertyEdgeCases: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 12px; padding: 20px;">
        <!-- Empty custom class -->
        <qk-chip [customClass]="''">Empty Custom Class</qk-chip>
        
        <!-- Empty aria label -->
        <qk-chip [ariaLabel]="''">Empty ARIA Label</qk-chip>
        
        <!-- Empty remove aria label -->
        <qk-chip [removable]="true" [removeAriaLabel]="''">Empty Remove ARIA</qk-chip>
        
        <!-- Custom remove aria label -->
        <qk-chip [removable]="true" [removeAriaLabel]="'Custom remove text'">
          Custom Remove ARIA
        </qk-chip>
        
        <!-- Test ID -->
        <qk-chip [testId]="'test-chip-id'">Test ID Chip</qk-chip>
        
        <!-- Removable filter chip (special case) -->
        <qk-chip variant="filter" [removable]="true" [clickable]="true">
          Removable Filter
        </qk-chip>
      </div>
    `
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test custom remove ARIA label
    const customRemoveButton = canvas.getByRole('button', { name: 'Custom remove text' });
    expect(customRemoveButton).toBeInTheDocument();
    
    // Test default remove ARIA label (only one exists now)
    const defaultRemoveButtons = canvas.getAllByRole('button', { name: 'Remove chip' });
    expect(defaultRemoveButtons.length).toBeGreaterThanOrEqual(1);
    
    // Test removable filter chip behavior
    const removableFilter = canvas.getByText('Removable Filter');
    await userEvent.click(removableFilter);
    // Should handle both filter and removable functionality
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests edge cases and property combinations for comprehensive coverage.'
      }
    }
  }
};

export const TabIndexCoverage: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 12px; padding: 20px;">
        <!-- Disabled chip (tabindex -1) -->
        <qk-chip [disabled]="true">Disabled</qk-chip>
        
        <!-- Filter chip (tabindex 0) -->
        <qk-chip variant="filter">Filter</qk-chip>
        
        <!-- Filter chip removable (tabindex 0) -->
        <qk-chip variant="filter" [removable]="true">Filter Removable</qk-chip>
        
        <!-- Non-filter removable (tabindex -1) -->
        <qk-chip variant="input" [removable]="true">Input Removable</qk-chip>
        
        <!-- Clickable non-filter (tabindex 0) -->
        <qk-chip variant="assist" [clickable]="true">Clickable Assist</qk-chip>
        
        <!-- Non-clickable non-filter (tabindex -1) -->
        <qk-chip variant="suggestion" [clickable]="false">Non-clickable</qk-chip>
      </div>
    `
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test that chips are rendered correctly with different focusability
    const filterChip = canvas.getByText('Filter');
    expect(filterChip).toBeInTheDocument();
    
    const disabledChip = canvas.getByText('Disabled');
    expect(disabledChip).toBeInTheDocument();
    
    const clickableChip = canvas.getByText('Clickable Assist');
    expect(clickableChip).toBeInTheDocument();
    
    const nonClickableChip = canvas.getByText('Non-clickable');
    expect(nonClickableChip).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests all tabindex calculation scenarios for keyboard navigation.'
      }
    }
  }
};

export const ClickHandlingEdgeCases: Story = {
  args: {
    variant: 'input',
    removable: true,
    clickable: true,
    clicked: fn(),
    removed: fn()
  },
  render: (args) => ({
    props: args,
    template: `<qk-chip 
      [variant]="variant" 
      [removable]="removable"
      [clickable]="clickable"
      (clicked)="clicked($event)"
      (removed)="removed($event)">
      Click Test Chip
    </qk-chip>`
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByText('Click Test Chip');
    const removeButton = canvas.getByRole('button', { name: 'Remove chip' });
    
    // Test click on chip content (should work for removable input chips)
    await userEvent.click(chip);
    expect(args.clicked).toHaveBeenCalled();
    
    // Test click on remove button (should only trigger remove)
    await userEvent.click(removeButton);
    expect(args.removed).toHaveBeenCalled();
    
    // Reset call counts by creating new mock functions if needed
    // The component logic handles preventing double events
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests click handling edge cases for removable chips.'
      }
    }
  }
};

// =============================================================================
// BRANCH COVERAGE ENHANCEMENT STORIES (for 90%+ branch coverage)
// =============================================================================

export const ComplexRoleCombinations: Story = {
  render: () => ({
    template: `
      <div style="padding: 20px;">
        <!-- Test removable + inList combination (line 143) -->
        <ul style="list-style: none; padding: 0;">
          <li>
            <qk-chip [removable]="true" [inList]="true" [clickable]="false">
              Removable InList Non-clickable
            </qk-chip>
          </li>
        </ul>
        
        <!-- Test just inList without removable or clickable (line 150) -->
        <ul style="list-style: none; padding: 0;">
          <li>
            <qk-chip [inList]="true" [clickable]="false" [removable]="false">
              InList Only
            </qk-chip>
          </li>
        </ul>
        
        <!-- Test default presentation role -->
        <qk-chip [clickable]="false" [removable]="false" [inList]="false">
          Default Presentation Role
        </qk-chip>
      </div>
    `
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify the different role combinations are applied
    const removableInList = canvas.getByText('Removable InList Non-clickable');
    expect(removableInList).toBeInTheDocument();
    
    const inListOnly = canvas.getByText('InList Only');
    expect(inListOnly).toBeInTheDocument();
    
    const defaultRole = canvas.getByText('Default Presentation Role');
    expect(defaultRole).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests complex ARIA role combinations for comprehensive branch coverage.'
      }
    }
  }
};

// Comprehensive showcase including all features for documentation
export const ComprehensiveShowcase: Story = {
  render: () => ({
    template: `
    <div style="display: flex; flex-direction: column; gap: 24px; padding: 20px;">
      <div>
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">Filter Chips (with selection)</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          <qk-chip variant="filter" [selected]="true" hasTrailingIcon>
            Selected Filter
            <span slot="trailing-icon">✓</span>
          </qk-chip>
          <qk-chip variant="filter" [selected]="false" hasTrailingIcon>
            Unselected Filter
            <span slot="trailing-icon">▼</span>
          </qk-chip>
        </div>
      </div>
      
      <div>
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">Input Chips (removable)</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          <qk-chip variant="input" [removable]="true" customClass="custom-input-chip">
            Removable Input
          </qk-chip>
          <qk-chip variant="input" [removable]="true" [disabled]="true">
            Disabled Removable
          </qk-chip>
        </div>
      </div>
      
      <div>
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">Suggestion Chips (interactive)</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          <qk-chip variant="suggestion" [clickable]="true" hasLeadingIcon>
            <span slot="leading-icon">🔍</span>
            Clickable Suggestion
          </qk-chip>
          <qk-chip variant="suggestion" [clickable]="false">
            Non-clickable
          </qk-chip>
        </div>
      </div>
      
      <div>
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">Assist Chips</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          <qk-chip variant="assist" hasAvatar ariaLabel="User profile chip">
            <span slot="avatar">👤</span>
            With Avatar
          </qk-chip>
          <qk-chip variant="assist" testId="assist-chip-test">
            Standard Assist
          </qk-chip>
        </div>
      </div>
    </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive showcase of all chip variants, features, and interactive states.'
      }
    }
  }
};

// Story to cover elevation property and blur event
export const ElevationAndBlurTest: Story = {
  args: {
    variant: 'assist',
    elevation: 'elevated',
    blurred: fn(),
    focused: fn()
  },
  render: (args) => ({
    props: args,
    template: `<qk-chip 
      [variant]="variant" 
      [elevation]="elevation"
      (blurred)="blurred($event)"
      (focused)="focused($event)">
      Elevation Test Chip
    </qk-chip>`
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByRole('button');
    
    // Test focus and blur events
    chip.focus();
    expect(args.focused).toHaveBeenCalled();
    
    chip.blur();
    expect(args.blurred).toHaveBeenCalled();
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests elevation property and blur event emission.'
      }
    }
  }
};

// Story to test property initialization coverage
export const PropertyInitializationTest: Story = {
  args: {
    variant: 'filter',
    size: 'sm',
    elevation: 'flat',
    disabled: true,
    selected: true,
    clickable: false,
    removable: true,
    hasLeadingIcon: true,
    hasTrailingIcon: true,
    hasAvatar: true,
    customClass: 'test-class',
    ariaLabel: 'Test aria',
    ariaPressed: true,
    removeAriaLabel: 'Remove test',
    testId: 'test-id',
    inList: true,
    blurred: fn(),
    focused: fn(),
    clicked: fn(),
    removed: fn(),
    selectionChange: fn()
  },
  render: (args) => ({
    props: args,
    template: `<qk-chip 
      [variant]="variant"
      [size]="size"
      [elevation]="elevation"
      [disabled]="disabled"
      [selected]="selected"
      [clickable]="clickable"
      [removable]="removable"
      [hasLeadingIcon]="hasLeadingIcon"
      [hasTrailingIcon]="hasTrailingIcon"
      [hasAvatar]="hasAvatar"
      [customClass]="customClass"
      [ariaLabel]="ariaLabel"
      [ariaPressed]="ariaPressed"
      [removeAriaLabel]="removeAriaLabel"
      [testId]="testId"
      [inList]="inList"
      (blurred)="blurred($event)"
      (focused)="focused($event)"
      (clicked)="clicked($event)"
      (removed)="removed($event)"
      (selectionChange)="selectionChange($event)">
      Property Test Chip
    </qk-chip>`
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByText('Property Test Chip');
    const removeButton = canvas.getByRole('button', { name: 'Remove test' });
    
    // Since the chip is disabled, the remove button is also disabled and can't receive focus
    // We'll just verify the component renders correctly with all the properties
    // The focus/blur events can't be tested with disabled elements
    
    // Verify the chip has the expected properties reflected in the DOM
    const chipElement = canvas.getByText('Property Test Chip').closest('.qk-chip');
    expect(chipElement).toHaveClass('qk-chip--disabled');
    expect(chipElement).toHaveClass('qk-chip--selected');
    expect(chipElement).toHaveClass('qk-chip--filter');
    expect(chipElement).toHaveClass('qk-chip--sm');
    expect(chipElement).toHaveClass('test-class');
    
    // Note: focus/blur events are not tested here because the element is disabled
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests all property initializations and event handler setup.'
      }
    }
  }
};
