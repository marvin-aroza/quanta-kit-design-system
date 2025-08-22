import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { fn } from 'storybook/test';
import { ChipComponent, ChipVariant, ChipSize, ChipElevation } from './chip.component';

const meta: Meta<ChipComponent> = {
  title: 'Components/Chip',
  component: ChipComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ChipComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
The Chip component implements Material Design 3 chip variants for compact information display and user interaction.

## Features
- Four chip variants (assist, filter, input, suggestion)
- Multiple sizes (sm, md, lg)
- Elevation options (flat, raised)
- Selection states for filter chips
- Removable functionality for input chips
- Icon and avatar support
- Accessibility features with ARIA attributes
- Keyboard navigation support

## Usage
\`\`\`html
<qk-chip variant="filter" [selected]="isSelected" (selectionChange)="onSelectionChange($event)">
  Filter Option
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
      description: 'The type of chip'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] as ChipSize[],
      description: 'The size of the chip'
    },
    elevation: {
      control: 'select',
      options: ['flat', 'raised'] as ChipElevation[],
      description: 'The elevation level of the chip'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the chip is disabled'
    },
    selected: {
      control: 'boolean',
      description: 'Whether the chip is selected (filter chips only)'
    },
    removable: {
      control: 'boolean',
      description: 'Whether the chip can be removed (input chips only)'
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
      description: 'ARIA label for the remove button'
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
      (clicked)="clicked($event)">
      Assist Chip
    </qk-chip>`
  })
};

export const FilterChip: Story = {
  args: {
    variant: 'filter',
    size: 'md',
    elevation: 'flat',
    selected: false
  },
  render: (args) => ({
    props: args,
    template: `<qk-chip 
      [variant]="variant" 
      [size]="size" 
      [elevation]="elevation"
      [selected]="selected"
      [disabled]="disabled"
      (clicked)="clicked($event)"
      (selectionChange)="selectionChange($event)">
      Filter Chip
    </qk-chip>`
  })
};

export const InputChip: Story = {
  args: {
    variant: 'input',
    size: 'md',
    elevation: 'flat',
    removable: true
  },
  render: (args) => ({
    props: args,
    template: `<qk-chip 
      [variant]="variant" 
      [size]="size" 
      [elevation]="elevation"
      [removable]="removable"
      [disabled]="disabled"
      (clicked)="clicked($event)"
      (removed)="removed($event)">
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
      (clicked)="clicked($event)">
      Suggestion Chip
    </qk-chip>`
  })
};
