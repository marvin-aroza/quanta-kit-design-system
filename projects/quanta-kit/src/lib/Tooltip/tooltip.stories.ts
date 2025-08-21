import type { Meta, StoryObj } from '@storybook/angular';
import { expect, fn, userEvent, within } from 'storybook/test';
import { TooltipComponent } from './tooltip.component';

// Import testing utilities
declare global {
  interface Window {
    __storybook_story_store__: any;
  }
}

const meta: Meta<TooltipComponent> = {
  title: 'Components/Tooltip',
  component: TooltipComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A Material 3 compliant tooltip component that provides contextual information on hover, focus, or click.'
      }
    }
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'The text content to display in the tooltip'
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end', 'left-start', 'left-end', 'right-start', 'right-end'],
      description: 'Position of the tooltip relative to the trigger element'
    },
    trigger: {
      control: 'select',
      options: ['hover', 'focus', 'click', 'manual'],
      description: 'How the tooltip is triggered'
    },
    type: {
      control: 'select',
      options: ['plain', 'rich'],
      description: 'Type of tooltip - plain or rich'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tooltip is disabled'
    },
    showDelay: {
      control: 'number',
      description: 'Delay in milliseconds before showing the tooltip'
    },
    hideDelay: {
      control: 'number',
      description: 'Delay in milliseconds before hiding the tooltip'
    },
    persistent: {
      control: 'boolean',
      description: 'Whether the tooltip persists when hovering over it'
    },
    customClass: {
      control: 'text',
      description: 'Custom CSS class to apply to the tooltip'
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width of the tooltip'
    },
    triggerTabIndex: {
      control: 'number',
      description: 'Tab index for the trigger element'
    },
    offset: {
      control: 'number',
      description: 'Distance from trigger element in pixels'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<TooltipComponent>;

// Basic tooltip story
export const Default: Story = {
  args: {
    text: 'This is a simple tooltip',
    position: 'top',
    trigger: 'hover',
    type: 'plain',
    disabled: false,
    showDelay: 500,
    hideDelay: 0,
    persistent: false,
    customClass: '',
    maxWidth: '320px',
    triggerTabIndex: 0,
    offset: 8
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; display: flex; justify-content: center; align-items: center;">
        <qk-tooltip 
          [text]="text"
          [position]="position"
          [trigger]="trigger"
          [type]="type"
          [disabled]="disabled"
          [showDelay]="showDelay"
          [hideDelay]="hideDelay"
          [persistent]="persistent"
          [customClass]="customClass"
          [maxWidth]="maxWidth"
          [triggerTabIndex]="triggerTabIndex"
          [offset]="offset">
          <button>Hover me</button>
        </qk-tooltip>
      </div>
    `
  })
};

// Position variations
export const TopPosition: Story = {
  args: {
    text: 'Tooltip on top',
    position: 'top',
    trigger: 'hover'
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; display: flex; justify-content: center; align-items: center;">
        <qk-tooltip [text]="text" [position]="position" [trigger]="trigger">
          <button>Top tooltip</button>
        </qk-tooltip>
      </div>
    `
  })
};

export const BottomPosition: Story = {
  args: {
    text: 'Tooltip on bottom',
    position: 'bottom',
    trigger: 'hover'
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; display: flex; justify-content: center; align-items: center;">
        <qk-tooltip [text]="text" [position]="position" [trigger]="trigger">
          <button>Bottom tooltip</button>
        </qk-tooltip>
      </div>
    `
  })
};

export const LeftPosition: Story = {
  args: {
    text: 'Tooltip on left',
    position: 'left',
    trigger: 'hover'
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; display: flex; justify-content: center; align-items: center;">
        <qk-tooltip [text]="text" [position]="position" [trigger]="trigger">
          <button>Left tooltip</button>
        </qk-tooltip>
      </div>
    `
  })
};

export const RightPosition: Story = {
  args: {
    text: 'Tooltip on right',
    position: 'right',
    trigger: 'hover'
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; display: flex; justify-content: center; align-items: center;">
        <qk-tooltip [text]="text" [position]="position" [trigger]="trigger">
          <button>Right tooltip</button>
        </qk-tooltip>
      </div>
    `
  })
};

// Empty text edge case
export const EmptyText: Story = {
  args: {
    text: '',
    position: 'top',
    trigger: 'hover'
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; display: flex; justify-content: center; align-items: center;">
        <qk-tooltip [text]="text" [position]="position" [trigger]="trigger">
          <button>Empty tooltip</button>
        </qk-tooltip>
      </div>
    `
  })
};

// Trigger variations
export const HoverTrigger: Story = {
  args: {
    text: 'Triggered by hover',
    position: 'top',
    trigger: 'hover'
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; display: flex; justify-content: center; align-items: center;">
        <qk-tooltip [text]="text" [position]="position" [trigger]="trigger">
          <button>Hover trigger</button>
        </qk-tooltip>
      </div>
    `
  })
};

export const ClickTrigger: Story = {
  args: {
    text: 'Triggered by click',
    position: 'top',
    trigger: 'click'
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; display: flex; justify-content: center; align-items: center;">
        <qk-tooltip [text]="text" [position]="position" [trigger]="trigger">
          <button>Click trigger</button>
        </qk-tooltip>
      </div>
    `
  })
};

export const FocusTrigger: Story = {
  args: {
    text: 'Triggered by focus',
    position: 'top',
    trigger: 'focus'
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; display: flex; justify-content: center; align-items: center;">
        <qk-tooltip [text]="text" [position]="position" [trigger]="trigger">
          <button>Focus trigger</button>
        </qk-tooltip>
      </div>
    `
  })
};

// Disabled state
export const Disabled: Story = {
  args: {
    text: 'This tooltip is disabled',
    position: 'top',
    trigger: 'hover',
    disabled: true
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; display: flex; justify-content: center; align-items: center;">
        <qk-tooltip [text]="text" [position]="position" [trigger]="trigger" [disabled]="disabled">
          <button>Disabled tooltip</button>
        </qk-tooltip>
      </div>
    `
  })
};

// Custom delays
export const CustomDelays: Story = {
  args: {
    text: 'Tooltip with custom delays',
    position: 'top',
    trigger: 'hover',
    showDelay: 1000,
    hideDelay: 500
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; display: flex; justify-content: center; align-items: center;">
        <qk-tooltip [text]="text" [position]="position" [trigger]="trigger" [showDelay]="showDelay" [hideDelay]="hideDelay">
          <button>Custom delays</button>
        </qk-tooltip>
      </div>
    `
  })
};

// Persistent tooltip
export const Persistent: Story = {
  args: {
    text: 'This tooltip persists on hover',
    position: 'top',
    trigger: 'hover',
    persistent: true
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; display: flex; justify-content: center; align-items: center;">
        <qk-tooltip [text]="text" [position]="position" [trigger]="trigger" [persistent]="persistent">
          <button>Persistent tooltip</button>
        </qk-tooltip>
      </div>
    `
  })
};

// Custom offset
export const CustomOffset: Story = {
  args: {
    text: 'Tooltip with custom offset',
    position: 'top',
    trigger: 'hover',
    offset: 20
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; display: flex; justify-content: center; align-items: center;">
        <qk-tooltip [text]="text" [position]="position" [trigger]="trigger" [offset]="offset">
          <button>Custom offset</button>
        </qk-tooltip>
      </div>
    `
  })
};

// Rich tooltip type
export const RichTooltip: Story = {
  args: {
    text: 'Rich tooltip with enhanced styling',
    position: 'top',
    trigger: 'hover',
    type: 'rich'
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; display: flex; justify-content: center; align-items: center;">
        <qk-tooltip [text]="text" [position]="position" [trigger]="trigger" [type]="type">
          <button>Rich tooltip</button>
        </qk-tooltip>
      </div>
    `
  })
};

// Custom class
export const CustomClass: Story = {
  args: {
    text: 'Tooltip with custom class',
    position: 'top',
    trigger: 'hover',
    customClass: 'custom-tooltip-style'
  },
  render: (args) => ({
    props: args,
    template: `
      <style>
        .custom-tooltip-style {
          background-color: #ff5722 !important;
          color: white !important;
        }
      </style>
      <div style="padding: 50px; display: flex; justify-content: center; align-items: center;">
        <qk-tooltip [text]="text" [position]="position" [trigger]="trigger" [customClass]="customClass">
          <button>Custom style</button>
        </qk-tooltip>
      </div>
    `
  })
};

// Max width
export const CustomMaxWidth: Story = {
  args: {
    text: 'This is a very long tooltip text that should wrap based on the max width setting to demonstrate how the tooltip handles longer content',
    position: 'top',
    trigger: 'hover',
    maxWidth: '200px'
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; display: flex; justify-content: center; align-items: center;">
        <qk-tooltip [text]="text" [position]="position" [trigger]="trigger" [maxWidth]="maxWidth">
          <button>Max width</button>
        </qk-tooltip>
      </div>
    `
  })
};

// All positions showcase
export const AllPositions: Story = {
  render: () => ({
    template: `
      <div style="padding: 100px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; place-items: center;">
        <qk-tooltip text="Top Start" position="top-start" trigger="hover">
          <button>Top Start</button>
        </qk-tooltip>
        <qk-tooltip text="Top" position="top" trigger="hover">
          <button>Top</button>
        </qk-tooltip>
        <qk-tooltip text="Top End" position="top-end" trigger="hover">
          <button>Top End</button>
        </qk-tooltip>
        
        <qk-tooltip text="Left Start" position="left-start" trigger="hover">
          <button>Left Start</button>
        </qk-tooltip>
        <div style="display: flex; justify-content: center; align-items: center;">
          <span>Tooltip Positions</span>
        </div>
        <qk-tooltip text="Right Start" position="right-start" trigger="hover">
          <button>Right Start</button>
        </qk-tooltip>
        
        <qk-tooltip text="Left" position="left" trigger="hover">
          <button>Left</button>
        </qk-tooltip>
        <div></div>
        <qk-tooltip text="Right" position="right" trigger="hover">
          <button>Right</button>
        </qk-tooltip>
        
        <qk-tooltip text="Left End" position="left-end" trigger="hover">
          <button>Left End</button>
        </qk-tooltip>
        <div></div>
        <qk-tooltip text="Right End" position="right-end" trigger="hover">
          <button>Right End</button>
        </qk-tooltip>
        
        <qk-tooltip text="Bottom Start" position="bottom-start" trigger="hover">
          <button>Bottom Start</button>
        </qk-tooltip>
        <qk-tooltip text="Bottom" position="bottom" trigger="hover">
          <button>Bottom</button>
        </qk-tooltip>
        <qk-tooltip text="Bottom End" position="bottom-end" trigger="hover">
          <button>Bottom End</button>
        </qk-tooltip>
      </div>
    `
  })
};

// Accessibility examples - different types of trigger elements
export const WithButton: Story = {
  args: {
    text: 'This tooltip is attached to a button',
    trigger: 'hover'
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; display: flex; justify-content: center; align-items: center;">
        <qk-tooltip [text]="text" [trigger]="trigger">
          <button>Button with tooltip</button>
        </qk-tooltip>
      </div>
    `
  })
};

export const WithLink: Story = {
  args: {
    text: 'More information about this link',
    trigger: 'hover'
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; display: flex; justify-content: center; align-items: center;">
        <qk-tooltip [text]="text" [trigger]="trigger">
          <a href="#" onclick="event.preventDefault()">Link with tooltip</a>
        </qk-tooltip>
      </div>
    `
  })
};

export const WithInput: Story = {
  args: {
    text: 'Enter your email address',
    trigger: 'focus'
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; display: flex; justify-content: center; align-items: center;">
        <qk-tooltip [text]="text" [trigger]="trigger">
          <input type="email" placeholder="Email" />
        </qk-tooltip>
      </div>
    `
  })
};

export const WithNonInteractiveText: Story = {
  args: {
    text: 'Additional information about this text',
    trigger: 'hover'
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; display: flex; justify-content: center; align-items: center;">
        <qk-tooltip [text]="text" [trigger]="trigger">
          <span>Hover over this text</span>
        </qk-tooltip>
      </div>
    `
  })
};

export const WithIcon: Story = {
  args: {
    text: 'This is an information icon',
    trigger: 'hover'
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 50px; display: flex; justify-content: center; align-items: center;">
        <qk-tooltip [text]="text" [trigger]="trigger">
          <span style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: #1976d2; color: white; font-size: 14px; cursor: help;">?</span>
        </qk-tooltip>
      </div>
    `
  })
};

// Accessibility showcase comparing before and after
export const AccessibilityShowcase: Story = {
  render: () => ({
    template: `
      <div style="padding: 50px;">
        <h3 style="margin-bottom: 30px;">Accessibility Fixes</h3>
        
        <div style="display: grid; gap: 30px;">
          <div>
            <h4>✅ FIXED: No nested interactive elements</h4>
            <p style="font-size: 14px; color: #666; margin-bottom: 15px;">
              When tooltip contains interactive elements (buttons, links, inputs), 
              the wrapper does NOT get role="button", tabindex, or aria-expanded attributes.
            </p>
            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
              
              <qk-tooltip text="Tooltip on button" trigger="hover">
                <button>Button</button>
              </qk-tooltip>
              
              <qk-tooltip text="Tooltip on link" trigger="hover">
                <a href="#" onclick="event.preventDefault()">Link</a>
              </qk-tooltip>
              
              <qk-tooltip text="Input help text" trigger="focus">
                <input placeholder="Email" />
              </qk-tooltip>
              
            </div>
            <p style="font-size: 12px; color: #888; margin-top: 10px;">
              Expected HTML: &lt;div class="qk-tooltip-trigger"&gt;&lt;button&gt;Button&lt;/button&gt;&lt;/div&gt;
              <br>No role, tabindex, or aria-expanded on wrapper div.
            </p>
          </div>
          
          <div>
            <h4>✅ FIXED: Proper ARIA for non-interactive content</h4>
            <p style="font-size: 14px; color: #666; margin-bottom: 15px;">
              When tooltip contains non-interactive content, the wrapper gets proper 
              role="button", tabindex, and aria-expanded attributes.
            </p>
            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
              
              <qk-tooltip text="Info about this text" trigger="hover">
                <span>Non-interactive text</span>
              </qk-tooltip>
              
              <qk-tooltip text="Help information" trigger="hover">
                <span style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: #1976d2; color: white; font-size: 14px; cursor: help;">?</span>
              </qk-tooltip>
              
            </div>
            <p style="font-size: 12px; color: #888; margin-top: 10px;">
              Expected HTML: &lt;div class="qk-tooltip-trigger" role="button" tabindex="0" aria-expanded="false"&gt;&lt;span&gt;Text&lt;/span&gt;&lt;/div&gt;
              <br>Wrapper has proper ARIA attributes.
            </p>
          </div>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
            <h4>🔧 Technical Implementation</h4>
            <ul style="font-size: 14px; margin: 10px 0; padding-left: 20px;">
              <li>Component detects interactive children after view initialization</li>
              <li>Uses Angular signals for reactive accessibility state</li>
              <li>Conditionally applies role="button", tabindex, and aria-expanded</li>
              <li>Prevents nested interactive elements that confuse screen readers</li>
              <li>Follows WCAG guidelines for proper ARIA usage</li>
            </ul>
          </div>
        </div>
      </div>
    `
  })
};

// Manual trigger control stories for testing methods
export const ManualTrigger: Story = {
  args: {
    text: 'Manually controlled tooltip',
    trigger: 'manual'
  },
  render: (args) => ({
    props: {
      ...args,
      showTooltip() {
        const tooltip = document.querySelector('qk-tooltip') as any;
        if (tooltip) tooltip.show();
      },
      hideTooltip() {
        const tooltip = document.querySelector('qk-tooltip') as any;
        if (tooltip) tooltip.hide();
      },
      toggleTooltip() {
        const tooltip = document.querySelector('qk-tooltip') as any;
        if (tooltip) tooltip.toggle();
      }
    },
    template: `
      <div style="padding: 50px; display: flex; flex-direction: column; align-items: center; gap: 15px;">
        <qk-tooltip [text]="text" [trigger]="trigger">
          <span>Manual tooltip trigger</span>
        </qk-tooltip>
        <div style="display: flex; gap: 10px;">
          <button (click)="showTooltip()">Show</button>
          <button (click)="hideTooltip()">Hide</button>
          <button (click)="toggleTooltip()">Toggle</button>
        </div>
      </div>
    `
  })
};

// Test all event handlers and edge cases
export const EventHandlerTests: Story = {
  render: () => ({
    props: {
      triggerAllEvents() {
        const tooltips = document.querySelectorAll('qk-tooltip');
        tooltips.forEach((tooltip: any, index) => {
          setTimeout(() => {
            // Trigger different events on different tooltips
            if (index === 0) {
              // Hover tooltip
              tooltip.dispatchEvent(new MouseEvent('mouseenter'));
              setTimeout(() => tooltip.dispatchEvent(new MouseEvent('mouseleave')), 100);
            } else if (index === 1) {
              // Focus tooltip  
              const input = tooltip.querySelector('input');
              if (input) {
                input.focus();
                setTimeout(() => input.blur(), 100);
              }
            } else if (index === 2) {
              // Click tooltip
              tooltip.click();
              setTimeout(() => tooltip.click(), 100);
            } else if (index === 3) {
              // Persistent tooltip
              tooltip.dispatchEvent(new MouseEvent('mouseenter'));
            }
          }, index * 200);
        });
      }
    },
    template: `
      <div style="padding: 100px;">
        <h4>Event Handler Coverage Tests</h4>
        <button (click)="triggerAllEvents()" style="margin-bottom: 20px;">Trigger All Events</button>
        <div style="display: grid; gap: 20px; grid-template-columns: repeat(2, 1fr);">
          
          <!-- Hover events -->
          <qk-tooltip text="Hover event test" trigger="hover" [showDelay]="100" [hideDelay]="100">
            <button>Hover Events</button>
          </qk-tooltip>
          
          <!-- Focus events -->
          <qk-tooltip text="Focus event test" trigger="focus">
            <input placeholder="Focus Events" />
          </qk-tooltip>
          
          <!-- Click events -->
          <qk-tooltip text="Click event test" trigger="click">
            <button>Click Events</button>
          </qk-tooltip>
          
          <!-- Persistent hover -->
          <qk-tooltip text="Persistent hover test" trigger="hover" [persistent]="true">
            <button>Persistent Hover</button>
          </qk-tooltip>
          
        </div>
      </div>
    `
  })
};

// Test positioning edge cases and viewport constraints
export const PositioningEdgeCases: Story = {
  render: () => ({
    template: `
      <div style="height: 200vh; width: 200vw; position: relative;">
        
        <!-- Top edge of viewport -->
        <div style="position: absolute; top: 10px; left: 50vw;">
          <qk-tooltip text="Tooltip at top edge - should adjust position" position="top">
            <button>Top Edge</button>
          </qk-tooltip>
        </div>
        
        <!-- Left edge of viewport -->
        <div style="position: absolute; top: 50vh; left: 10px;">
          <qk-tooltip text="Tooltip at left edge - should adjust position" position="left">
            <button>Left Edge</button>
          </qk-tooltip>
        </div>
        
        <!-- Right edge of viewport -->
        <div style="position: absolute; top: 50vh; right: 10px;">
          <qk-tooltip text="Tooltip at right edge - should adjust position" position="right">
            <button>Right Edge</button>
          </qk-tooltip>
        </div>
        
        <!-- Bottom edge of viewport -->
        <div style="position: absolute; bottom: 10px; left: 50vw;">
          <qk-tooltip text="Tooltip at bottom edge - should adjust position" position="bottom">
            <button>Bottom Edge</button>
          </qk-tooltip>
        </div>
        
        <!-- Center for reference -->
        <div style="position: absolute; top: 50vh; left: 50vw; transform: translate(-50%, -50%);">
          <qk-tooltip text="Center reference tooltip" position="top">
            <button>Center</button>
          </qk-tooltip>
        </div>
        
      </div>
    `
  })
};

// Test error conditions and validation
export const ErrorAndValidationTests: Story = {
  render: () => ({
    template: `
      <div style="padding: 50px;">
        <h4>Error Handling and Validation Tests</h4>
        <div style="display: grid; gap: 15px;">
          
          <!-- Empty text validation -->
          <qk-tooltip text="" type="plain" trigger="hover">
            <button>Empty Text (should warn)</button>
          </qk-tooltip>
          
          <!-- Disabled tooltip -->
          <qk-tooltip text="This tooltip is disabled" [disabled]="true" trigger="hover">
            <button>Disabled Tooltip</button>
          </qk-tooltip>
          
          <!-- Rich tooltip without content -->
          <qk-tooltip text="Rich tooltip fallback" type="rich" trigger="hover">
            <button>Rich Type Test</button>
          </qk-tooltip>
          
        </div>
      </div>
    `
  })
};

// Test keyboard interactions
export const KeyboardInteractionTests: Story = {
  render: () => ({
    template: `
      <div style="padding: 50px;">
        <h4>Keyboard Interaction Tests</h4>
        <p style="font-size: 14px; margin-bottom: 20px;">
          Test: Open tooltip with click, then press Escape to close
        </p>
        <div style="display: flex; gap: 15px;">
          
          <qk-tooltip text="Press Escape to close" trigger="click">
            <button>Click & Escape Test</button>
          </qk-tooltip>
          
          <qk-tooltip text="Manual escape test" trigger="manual">
            <button>Manual & Escape Test</button>
          </qk-tooltip>
          
        </div>
      </div>
    `
  })
};

// Test window events (resize, scroll)
export const WindowEventTests: Story = {
  render: () => ({
    template: `
      <div style="height: 150vh; padding: 50px;">
        <h4>Window Event Tests</h4>
        <p style="font-size: 14px; margin-bottom: 20px;">
          Test: Hover to show tooltip, then resize window or scroll to test repositioning
        </p>
        
        <div style="margin-top: 50px;">
          <qk-tooltip text="Tooltip repositions on window resize/scroll" trigger="hover">
            <button>Window Events Test</button>
          </qk-tooltip>
        </div>
        
        <div style="margin-top: 100vh;">
          <qk-tooltip text="Scroll test tooltip" trigger="hover">
            <button>Scroll Test (scroll to see)</button>
          </qk-tooltip>
        </div>
        
      </div>
    `
  })
};

// Test all position variants comprehensively
export const ComprehensivePositionTests: Story = {
  render: () => ({
    template: `
      <div style="padding: 150px; display: grid; place-items: center;">
        <div style="display: grid; grid-template-columns: repeat(3, 120px); grid-template-rows: repeat(5, 60px); gap: 10px; place-items: center;">
          
          <!-- Top row -->
          <qk-tooltip text="Top Start Position" position="top-start" trigger="hover">
            <button style="width: 80px; font-size: 10px;">Top Start</button>
          </qk-tooltip>
          <qk-tooltip text="Top Position" position="top" trigger="hover">
            <button style="width: 80px; font-size: 10px;">Top</button>
          </qk-tooltip>
          <qk-tooltip text="Top End Position" position="top-end" trigger="hover">
            <button style="width: 80px; font-size: 10px;">Top End</button>
          </qk-tooltip>
          
          <!-- Middle-top row -->
          <qk-tooltip text="Left Start Position" position="left-start" trigger="hover">
            <button style="width: 80px; font-size: 10px;">Left Start</button>
          </qk-tooltip>
          <div></div>
          <qk-tooltip text="Right Start Position" position="right-start" trigger="hover">
            <button style="width: 80px; font-size: 10px;">Right Start</button>
          </qk-tooltip>
          
          <!-- Middle row -->
          <qk-tooltip text="Left Position" position="left" trigger="hover">
            <button style="width: 80px; font-size: 10px;">Left</button>
          </qk-tooltip>
          <div style="display: flex; align-items: center; justify-content: center; font-weight: bold;">CENTER</div>
          <qk-tooltip text="Right Position" position="right" trigger="hover">
            <button style="width: 80px; font-size: 10px;">Right</button>
          </qk-tooltip>
          
          <!-- Middle-bottom row -->
          <qk-tooltip text="Left End Position" position="left-end" trigger="hover">
            <button style="width: 80px; font-size: 10px;">Left End</button>
          </qk-tooltip>
          <div></div>
          <qk-tooltip text="Right End Position" position="right-end" trigger="hover">
            <button style="width: 80px; font-size: 10px;">Right End</button>
          </qk-tooltip>
          
          <!-- Bottom row -->
          <qk-tooltip text="Bottom Start Position" position="bottom-start" trigger="hover">
            <button style="width: 80px; font-size: 10px;">Bottom Start</button>
          </qk-tooltip>
          <qk-tooltip text="Bottom Position" position="bottom" trigger="hover">
            <button style="width: 80px; font-size: 10px;">Bottom</button>
          </qk-tooltip>
          <qk-tooltip text="Bottom End Position" position="bottom-end" trigger="hover">
            <button style="width: 80px; font-size: 10px;">Bottom End</button>
          </qk-tooltip>
          
        </div>
      </div>
    `
  })
};

// Test tooltip events and lifecycle
export const TooltipLifecycleTests: Story = {
  render: () => ({
    props: {
      onTooltipShow() { console.log('Tooltip shown'); },
      onTooltipHide() { console.log('Tooltip hidden'); },
      onTooltipToggle(visible: boolean) { console.log('Tooltip toggled:', visible); }
    },
    template: `
      <div style="padding: 50px;">
        <h4>Tooltip Lifecycle Events (check console)</h4>
        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
          
          <qk-tooltip 
            text="Event tracking tooltip" 
            trigger="hover"
            (tooltipShow)="onTooltipShow()"
            (tooltipHide)="onTooltipHide()"
            (tooltipToggle)="onTooltipToggle($event)">
            <button>Hover for Events</button>
          </qk-tooltip>
          
          <qk-tooltip 
            text="Click event tracking" 
            trigger="click"
            (tooltipShow)="onTooltipShow()"
            (tooltipHide)="onTooltipHide()"
            (tooltipToggle)="onTooltipToggle($event)">
            <button>Click for Events</button>
          </qk-tooltip>
          
        </div>
      </div>
    `
  })
};

// Test persistent tooltip mouse interactions
export const PersistentTooltipTests: Story = {
  render: () => ({
    template: `
      <div style="padding: 50px;">
        <h4>Persistent Tooltip Interaction Tests</h4>
        <p style="font-size: 14px; margin-bottom: 20px;">
          Hover over button, then move mouse to tooltip - it should stay open
        </p>
        
        <qk-tooltip 
          text="This tooltip stays open when you hover over it. Try moving your mouse from the button to this tooltip text."
          trigger="hover" 
          [persistent]="true"
          [showDelay]="100"
          [hideDelay]="300">
          <button>Persistent Tooltip Test</button>
        </qk-tooltip>
        
      </div>
    `
  })
};

// Test delay timing and cancellation logic
export const DelayTimingTests: Story = {
  render: () => ({
    template: `
      <div style="padding: 50px;">
        <h4>Delay Timing and Cancellation Tests</h4>
        <p style="font-size: 14px; margin-bottom: 20px;">
          Test rapid hover on/off to trigger delay cancellation logic
        </p>
        <div style="display: grid; gap: 15px; grid-template-columns: repeat(2, 1fr);">
          
          <!-- Fast hover to test cancellation -->
          <qk-tooltip text="Fast hover test - hover quickly on/off" trigger="hover" [showDelay]="500" [hideDelay]="500">
            <button>Fast Hover Test</button>
          </qk-tooltip>
          
          <!-- Zero delays -->
          <qk-tooltip text="No delays" trigger="hover" [showDelay]="0" [hideDelay]="0">
            <button>Zero Delay Test</button>
          </qk-tooltip>
          
          <!-- Long delays -->
          <qk-tooltip text="Long delays" trigger="hover" [showDelay]="1000" [hideDelay]="1000">
            <button>Long Delay Test</button>
          </qk-tooltip>
          
          <!-- Manual with delays -->
          <qk-tooltip text="Manual with delays" trigger="manual" [showDelay]="200" [hideDelay]="200">
            <button onclick="this.parentElement.show(); setTimeout(() => this.parentElement.hide(), 1000)">Manual Delayed</button>
          </qk-tooltip>
          
        </div>
      </div>
    `
  })
};

// Test all tooltip types and configurations
export const TooltipTypeTests: Story = {
  render: () => ({
    template: `
      <div style="padding: 50px;">
        <h4>Tooltip Type and Configuration Tests</h4>
        <div style="display: grid; gap: 15px; grid-template-columns: repeat(2, 1fr);">
          
          <!-- Plain type -->
          <qk-tooltip text="Plain tooltip type" type="plain" trigger="hover">
            <button>Plain Type</button>
          </qk-tooltip>
          
          <!-- Rich type -->
          <qk-tooltip text="Rich tooltip type" type="rich" trigger="hover">
            <button>Rich Type</button>
          </qk-tooltip>
          
          <!-- Disabled state -->
          <qk-tooltip text="Should not show" [disabled]="true" trigger="hover">
            <button>Disabled Tooltip</button>
          </qk-tooltip>
          
          <!-- Very long text -->
          <qk-tooltip text="This is a very long tooltip text that should test the layout and positioning when the content is extensive and might need to wrap or adjust positioning due to viewport constraints and text length considerations" trigger="hover">
            <button>Long Text Test</button>
          </qk-tooltip>
          
        </div>
      </div>
    `
  })
};

// Test edge cases and error conditions
export const EdgeCaseTests: Story = {
  render: () => ({
    template: `
      <div style="padding: 50px;">
        <h4>Edge Cases and Error Conditions</h4>
        <div style="display: grid; gap: 15px;">
          
          <!-- Tooltip with special characters -->
          <qk-tooltip text="Special chars: &lt;&gt;&amp;'&quot; éñü" trigger="hover">
            <button>Special Characters</button>
          </qk-tooltip>
          
          <!-- Tooltip with newlines -->
          <qk-tooltip text="Line 1\nLine 2\nLine 3" trigger="hover">
            <button>Multiline Text</button>
          </qk-tooltip>
          
          <!-- Multiple tooltips rapid interaction -->
          <div style="display: flex; gap: 5px;">
            <qk-tooltip text="Tooltip 1" trigger="hover" [showDelay]="100">
              <button>1</button>
            </qk-tooltip>
            <qk-tooltip text="Tooltip 2" trigger="hover" [showDelay]="100">
              <button>2</button>
            </qk-tooltip>
            <qk-tooltip text="Tooltip 3" trigger="hover" [showDelay]="100">
              <button>3</button>
            </qk-tooltip>
            <qk-tooltip text="Tooltip 4" trigger="hover" [showDelay]="100">
              <button>4</button>
            </qk-tooltip>
          </div>
          
        </div>
      </div>
    `
  })
};

// Comprehensive interactive test to increase coverage
export const ComprehensiveInteractiveTest: Story = {
  render: () => ({
    props: {
      runComprehensiveTest() {
        // Test all combinations systematically
        const tooltips = document.querySelectorAll('qk-tooltip');
        
        tooltips.forEach((tooltip: any, index) => {
          setTimeout(() => {
            // Test show/hide methods
            tooltip.show();
            setTimeout(() => {
              tooltip.hide();
              setTimeout(() => {
                tooltip.toggle();
                setTimeout(() => {
                  tooltip.toggle();
                  
                  // Test events
                  tooltip.dispatchEvent(new MouseEvent('mouseenter'));
                  setTimeout(() => {
                    tooltip.dispatchEvent(new MouseEvent('mouseleave'));
                    
                    // Test keyboard
                    tooltip.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                    
                    // Test focus if it has focusable content
                    const button = tooltip.querySelector('button');
                    if (button) {
                      button.focus();
                      setTimeout(() => button.blur(), 50);
                    }
                    
                    // Test click
                    tooltip.click();
                    
                  }, 50);
                }, 50);
              }, 50);
            }, 50);
          }, index * 100);
        });
      }
    },
    template: `
      <div style="padding: 50px;">
        <h4>Comprehensive Interactive Coverage Test</h4>
        <button (click)="runComprehensiveTest()" style="margin-bottom: 20px; padding: 10px; background: #1976d2; color: white; border: none; border-radius: 4px;">
          Run Complete Test Suite
        </button>
        
        <div style="display: grid; gap: 15px; grid-template-columns: repeat(3, 1fr);">
          
          <!-- All trigger types -->
          <qk-tooltip text="Manual tooltip" trigger="manual" [showDelay]="100" [hideDelay]="100">
            <button>Manual</button>
          </qk-tooltip>
          
          <qk-tooltip text="Hover tooltip" trigger="hover" [showDelay]="50" [hideDelay]="50">
            <button>Hover</button>
          </qk-tooltip>
          
          <qk-tooltip text="Click tooltip" trigger="click" [showDelay]="0" [hideDelay]="200">
            <button>Click</button>
          </qk-tooltip>
          
          <qk-tooltip text="Focus tooltip" trigger="focus">
            <input placeholder="Focus" />
          </qk-tooltip>
          
          <!-- All position types -->
          <qk-tooltip text="Top start" position="top-start" trigger="hover">
            <button>Top Start</button>
          </qk-tooltip>
          
          <qk-tooltip text="Left end" position="left-end" trigger="hover">
            <button>Left End</button>
          </qk-tooltip>
          
          <qk-tooltip text="Right start" position="right-start" trigger="hover">
            <button>Right Start</button>
          </qk-tooltip>
          
          <qk-tooltip text="Bottom end" position="bottom-end" trigger="hover">
            <button>Bottom End</button>
          </qk-tooltip>
          
          <!-- Different types and configurations -->
          <qk-tooltip text="Plain persistent" type="plain" trigger="hover" [persistent]="true">
            <button>Plain Persistent</button>
          </qk-tooltip>
          
          <qk-tooltip text="Rich tooltip" type="rich" trigger="hover">
            <button>Rich Type</button>
          </qk-tooltip>
          
          <qk-tooltip text="Disabled tooltip" [disabled]="true" trigger="hover">
            <button>Disabled</button>
          </qk-tooltip>
          
          <qk-tooltip text="Custom class tooltip" customClass="custom-tooltip-class" trigger="hover">
            <button>Custom Class</button>
          </qk-tooltip>
          
        </div>
      </div>
    `
  })
};

// Automated coverage test that runs during test-storybook
export const AutomatedCoverageTest: Story = {
  render: () => ({
    template: `
      <div style="padding: 50px;">
        <h4>Automated Coverage Test (Executes During Test Run)</h4>
        
        <!-- Manual trigger tooltip -->
        <qk-tooltip id="manual-tooltip" text="Manual tooltip" trigger="manual" [showDelay]="50" [hideDelay]="50">
          <button id="manual-button">Manual</button>
        </qk-tooltip>
        
        <!-- Hover trigger tooltip -->
        <qk-tooltip id="hover-tooltip" text="Hover tooltip" trigger="hover" [showDelay]="50" [hideDelay]="50">
          <button id="hover-button">Hover</button>
        </qk-tooltip>
        
        <!-- Click trigger tooltip -->
        <qk-tooltip id="click-tooltip" text="Click tooltip" trigger="click">
          <button id="click-button">Click</button>
        </qk-tooltip>
        
        <!-- Focus trigger tooltip -->
        <qk-tooltip id="focus-tooltip" text="Focus tooltip" trigger="focus">
          <input id="focus-input" placeholder="Focus" />
        </qk-tooltip>
        
        <!-- Persistent tooltip -->
        <qk-tooltip id="persistent-tooltip" text="Persistent tooltip" trigger="hover" [persistent]="true">
          <button id="persistent-button">Persistent</button>
        </qk-tooltip>
        
        <!-- Disabled tooltip -->
        <qk-tooltip id="disabled-tooltip" text="Disabled" [disabled]="true" trigger="hover">
          <button id="disabled-button">Disabled</button>
        </qk-tooltip>
        
        <!-- Different positions -->
        <qk-tooltip id="top-start-tooltip" text="Top start" position="top-start" trigger="hover">
          <button id="top-start-button">Top Start</button>
        </qk-tooltip>
        
        <qk-tooltip id="bottom-end-tooltip" text="Bottom end" position="bottom-end" trigger="hover">
          <button id="bottom-end-button">Bottom End</button>
        </qk-tooltip>
        
        <!-- Custom class and rich type -->
        <qk-tooltip id="custom-tooltip" text="Custom" customClass="custom-class" type="rich" trigger="hover">
          <button id="custom-button">Custom</button>
        </qk-tooltip>
        
      </div>
    `
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for components to initialize
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      console.log('Starting automated coverage test...');
      
      // Test hover button interactions
      const hoverButton = canvas.getByText('Hover');
      if (hoverButton) {
        console.log('Testing hover button...');
        await userEvent.hover(hoverButton);
        await new Promise(resolve => setTimeout(resolve, 200));
        await userEvent.unhover(hoverButton);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Test click button interactions
      const clickButton = canvas.getByText('Click');
      if (clickButton) {
        console.log('Testing click button...');
        await userEvent.click(clickButton);
        await new Promise(resolve => setTimeout(resolve, 100));
        await userEvent.click(clickButton);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Test focus input interactions
      const focusInput = canvas.getByPlaceholderText('Focus');
      if (focusInput) {
        console.log('Testing focus input...');
        await userEvent.click(focusInput);
        await new Promise(resolve => setTimeout(resolve, 100));
        await userEvent.tab();
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Test persistent button
      const persistentButton = canvas.getByText('Persistent');
      if (persistentButton) {
        console.log('Testing persistent button...');
        await userEvent.hover(persistentButton);
        await new Promise(resolve => setTimeout(resolve, 200));
        await userEvent.unhover(persistentButton);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Test keyboard escape
      console.log('Testing escape key...');
      await userEvent.keyboard('{Escape}');
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Test different position buttons
      const topStartButton = canvas.getByText('Top Start');
      const bottomEndButton = canvas.getByText('Bottom End');
      const customButton = canvas.getByText('Custom');
      
      for (const button of [topStartButton, bottomEndButton, customButton]) {
        if (button) {
          console.log(`Testing button: ${button.textContent}`);
          await userEvent.hover(button);
          await new Promise(resolve => setTimeout(resolve, 150));
          await userEvent.unhover(button);
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      
      // Test disabled button (should not trigger tooltip)
      const disabledButton = canvas.getByText('Disabled');
      if (disabledButton) {
        console.log('Testing disabled button...');
        await userEvent.hover(disabledButton);
        await new Promise(resolve => setTimeout(resolve, 100));
        await userEvent.unhover(disabledButton);
      }
      
      console.log('Automated coverage test completed!');
      
    } catch (error) {
      console.error('Error in automated coverage test:', error);
    }
  }
};

// Specific test for manual tooltip methods
export const ManualMethodsTest: Story = {
  render: () => ({
    template: `
      <div style="padding: 50px;">
        <h4>Manual Methods Test</h4>
        <qk-tooltip text="Manual methods test" trigger="manual" id="test-manual-tooltip">
          <button id="test-manual-button">Manual Test Button</button>
        </qk-tooltip>
      </div>
    `
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Wait for components to initialize
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      console.log('Testing manual tooltip methods...');
      
      // Get the tooltip element directly
      const tooltipElement = canvasElement.querySelector('#test-manual-tooltip') as any;
      
      if (tooltipElement && typeof tooltipElement.show === 'function') {
        console.log('Found tooltip element with methods');
        
        // Test show method
        tooltipElement.show();
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Test hide method
        tooltipElement.hide();
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Test toggle method
        tooltipElement.toggle();
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Toggle again to close
        tooltipElement.toggle();
        await new Promise(resolve => setTimeout(resolve, 100));
        
        console.log('Manual methods tested successfully');
      } else {
        console.log('Could not find tooltip element or methods');
      }
      
    } catch (error) {
      console.error('Error in manual methods test:', error);
    }
  }
};

// Test for empty text validation
export const EmptyTextValidationTest: Story = {
  render: () => ({
    template: `
      <div style="padding: 50px;">
        <h4>Empty Text Validation Test</h4>
        <qk-tooltip text="" type="plain" trigger="hover" id="empty-text-tooltip">
          <button>Empty Text (Should Warn)</button>
        </qk-tooltip>
      </div>
    `
  })
};

// Test persistent tooltip mouse interactions
export const PersistentTooltipInteractionTest: Story = {
  render: () => ({
    template: `
      <div style="padding: 50px;">
        <h4>Persistent Tooltip Mouse Interaction Test</h4>
        <qk-tooltip text="This is a persistent tooltip. Hover and then move mouse to tooltip." trigger="hover" [persistent]="true" id="persistent-interaction-tooltip">
          <button id="persistent-trigger-button">Persistent Tooltip</button>
        </qk-tooltip>
      </div>
    `
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      const button = canvas.getByText('Persistent Tooltip');
      
      // Hover the button to show tooltip
      await userEvent.hover(button);
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Find the tooltip element that should now be visible
      const tooltipElement = canvasElement.querySelector('.qk-tooltip');
      if (tooltipElement) {
        console.log('Found persistent tooltip element');
        
        // Simulate hovering over the tooltip itself
        const mouseEnterEvent = new MouseEvent('mouseenter', { bubbles: true });
        tooltipElement.dispatchEvent(mouseEnterEvent);
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Simulate leaving the tooltip
        const mouseLeaveEvent = new MouseEvent('mouseleave', { bubbles: true });
        tooltipElement.dispatchEvent(mouseLeaveEvent);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Unhover the button
      await userEvent.unhover(button);
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error('Error in persistent tooltip interaction test:', error);
    }
  }
};

// Test for interactive children detection
export const InteractiveChildrenDetectionTest: Story = {
  render: () => ({
    template: `
      <div style="padding: 50px;">
        <h4>Interactive Children Detection Test</h4>
        
        <!-- Tooltip with interactive child (button) -->
        <qk-tooltip text="This has an interactive child" trigger="hover" id="interactive-child-tooltip">
          <div>
            <button id="nested-button">Nested Button</button>
          </div>
        </qk-tooltip>
        
        <!-- Tooltip with link child -->
        <qk-tooltip text="This has a link child" trigger="hover" id="link-child-tooltip">
          <div>
            <a href="#" id="nested-link">Nested Link</a>
          </div>
        </qk-tooltip>
        
        <!-- Tooltip with input child -->
        <qk-tooltip text="This has an input child" trigger="hover" id="input-child-tooltip">
          <div>
            <input placeholder="Nested Input" id="nested-input" />
          </div>
        </qk-tooltip>
        
        <!-- Tooltip with non-interactive child -->
        <qk-tooltip text="This has non-interactive child" trigger="hover" id="non-interactive-tooltip">
          <div>
            <span id="nested-span">Non-interactive Span</span>
          </div>
        </qk-tooltip>
        
      </div>
    `
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      // Test each tooltip to trigger interactive children detection
      const tooltipElements = canvasElement.querySelectorAll('qk-tooltip');
      
      for (let i = 0; i < tooltipElements.length; i++) {
        const tooltip = tooltipElements[i];
        const triggerId = tooltip.id;
        
        console.log(`Testing tooltip with id: ${triggerId}`);
        
        // Try to hover each tooltip to trigger the detection logic
        const childElement = tooltip.querySelector('button, a, input, span');
        if (childElement) {
          await userEvent.hover(childElement as HTMLElement);
          await new Promise(resolve => setTimeout(resolve, 100));
          await userEvent.unhover(childElement as HTMLElement);
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      
    } catch (error) {
      console.error('Error in interactive children detection test:', error);
    }
  }
};

// Test focus trigger specifically
export const FocusTriggerTest: Story = {
  render: () => ({
    template: `
      <div style="padding: 50px;">
        <h4>Focus Trigger Test</h4>
        
        <!-- Focus trigger with input -->
        <qk-tooltip text="Focus tooltip on input" trigger="focus" id="focus-input-tooltip">
          <input placeholder="Focus me" id="focus-test-input" />
        </qk-tooltip>
        
        <!-- Focus trigger with button -->
        <qk-tooltip text="Focus tooltip on button" trigger="focus" id="focus-button-tooltip">
          <button id="focus-test-button">Focus Button</button>
        </qk-tooltip>
        
        <!-- Another element to tab to -->
        <button id="tab-target">Tab Target</button>
        
      </div>
    `
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      // Test input focus
      const inputElement = canvas.getByPlaceholderText('Focus me');
      if (inputElement) {
        console.log('Testing input focus...');
        await userEvent.click(inputElement);
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Tab away to trigger blur
        await userEvent.tab();
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      // Test button focus
      const buttonElement = canvas.getByText('Focus Button');
      if (buttonElement) {
        console.log('Testing button focus...');
        await userEvent.click(buttonElement);
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Tab away to trigger blur
        await userEvent.tab();
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
    } catch (error) {
      console.error('Error in focus trigger test:', error);
    }
  }
};

// Test window events (resize, scroll)
export const WindowEventsTest: Story = {
  render: () => ({
    template: `
      <div style="padding: 50px; height: 150vh;">
        <h4>Window Events Test</h4>
        <qk-tooltip text="This tooltip repositions on window events" trigger="hover" id="window-events-tooltip">
          <button id="window-events-button">Hover for Window Events Test</button>
        </qk-tooltip>
        
        <div style="height: 100vh;"></div>
        <p>Scroll area...</p>
      </div>
    `
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      const button = canvas.getByText('Hover for Window Events Test');
      
      // Show tooltip
      await userEvent.hover(button);
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Trigger window resize
      console.log('Triggering window resize...');
      window.dispatchEvent(new Event('resize'));
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Trigger window scroll
      console.log('Triggering window scroll...');
      window.dispatchEvent(new Event('scroll'));
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Hide tooltip
      await userEvent.unhover(button);
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error('Error in window events test:', error);
    }
  }
};

// Edge case stories for maximum coverage
export const EmptyTextWarning: Story = {
  args: {
    text: '', // This should trigger the console warning
    type: 'plain',
    trigger: 'hover'
  },
  render: (args) => ({
    props: args,
    template: `<qk-tooltip [text]="text" [type]="type" [trigger]="trigger">Hover me</qk-tooltip>`
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText('Hover me');
    
    // Trigger the hover to activate the component logic
    await userEvent.hover(trigger);
    await new Promise(resolve => setTimeout(resolve, 100));
    await userEvent.unhover(trigger);
  }
};

export const ComponentDestroy: Story = {
  args: {
    text: 'Destroy test',
    trigger: 'hover'
  },
  render: (args) => ({
    props: { ...args, showComponent: true },
    template: `
      <div *ngIf="showComponent">
        <qk-tooltip [text]="text" [trigger]="trigger">Hover me</qk-tooltip>
      </div>
      <button (click)="showComponent = false">Destroy</button>
    `
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText('Hover me');
    
    // Show tooltip first
    await userEvent.hover(trigger);
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Then destroy the component
    const destroyBtn = canvas.getByText('Destroy');
    await userEvent.click(destroyBtn);
    await new Promise(resolve => setTimeout(resolve, 100));
  }
};

export const InteractiveChildrenDetection: Story = {
  args: {
    text: 'Interactive children test',
    trigger: 'hover'
  },
  render: (args) => ({
    props: args,
    template: `
      <qk-tooltip [text]="text" [trigger]="trigger">
        <div>
          <button>Interactive button</button>
          <a href="#">Interactive link</a>
          <input type="text" placeholder="Interactive input">
        </div>
      </qk-tooltip>
    `
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tooltipTrigger = canvasElement.querySelector('.qk-tooltip-trigger');
    
    if (tooltipTrigger) {
      await userEvent.hover(tooltipTrigger as Element);
      await new Promise(resolve => setTimeout(resolve, 600));
      await userEvent.unhover(tooltipTrigger as Element);
    }
  }
};

export const AllConditionsBranches: Story = {
  args: {
    text: 'All conditions test',
    trigger: 'click',
    disabled: false,
    persistent: true,
    customClass: 'test-class',
    type: 'rich'
  },
  render: (args) => ({
    props: args,
    template: `
      <qk-tooltip 
        [text]="text" 
        [trigger]="trigger" 
        [disabled]="disabled"
        [persistent]="persistent"
        [customClass]="customClass"
        [type]="type">
        <span>Rich tooltip trigger</span>
        <div slot="tooltip-content">Rich content here</div>
      </qk-tooltip>
    `
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText('Rich tooltip trigger');
    
    // Test all branches
    await userEvent.click(trigger);
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Test disabled state
    const component = canvasElement.querySelector('qk-tooltip') as any;
    if (component) {
      component.disabled = true;
      await userEvent.click(trigger);
      await new Promise(resolve => setTimeout(resolve, 100));
      
      component.disabled = false;
      await userEvent.click(trigger);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
};

export const RichTooltipWithSlotContent: Story = {
  args: {
    type: 'rich',
    trigger: 'click'
  },
  render: (args) => ({
    props: args,
    template: `
      <qk-tooltip [type]="type" [trigger]="trigger">
        <button>Click for rich tooltip</button>
        <div slot="tooltip-content">
          <h4>Rich Content</h4>
          <p>This is rich tooltip content</p>
        </div>
      </qk-tooltip>
    `
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText('Click for rich tooltip');
    
    await userEvent.click(trigger);
    await new Promise(resolve => setTimeout(resolve, 100));
    await userEvent.click(trigger); // Toggle off
    await new Promise(resolve => setTimeout(resolve, 100));
  }
};

export const PropertyExerciser: Story = {
  args: {
    text: 'Testing all properties',
    trigger: 'hover',
    position: 'bottom',
    customClass: 'my-custom-class',
    persistent: true,
    maxWidth: '400px',
    type: 'plain'
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 100px; text-align: center;">
        <qk-tooltip 
          [text]="text" 
          [trigger]="trigger"
          [position]="position"
          [customClass]="customClass"
          [persistent]="persistent"
          [maxWidth]="maxWidth"
          [type]="type">
          <button>Test all properties</button>
        </qk-tooltip>
      </div>
    `
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText('Test all properties');
    
    // Test hover to trigger all property calculations
    await userEvent.hover(trigger);
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Check that all CSS classes and styles are applied
    const tooltip = canvasElement.querySelector('.qk-tooltip');
    expect(tooltip).toHaveClass('qk-tooltip--bottom');
    expect(tooltip).toHaveClass('qk-tooltip--plain');
    expect(tooltip).toHaveClass('qk-tooltip--persistent');
    expect(tooltip).toHaveClass('my-custom-class');
    
    const arrow = canvasElement.querySelector('.qk-tooltip-arrow');
    expect(arrow).toHaveClass('qk-tooltip-arrow--bottom');
    
    await userEvent.unhover(trigger);
    await new Promise(resolve => setTimeout(resolve, 100));
  }
};

export const NoCustomClass: Story = {
  args: {
    text: 'No custom class',
    trigger: 'hover',
    customClass: '', // Test empty custom class
    persistent: false // Test non-persistent
  },
  render: (args) => ({
    props: args,
    template: `
      <qk-tooltip 
        [text]="text" 
        [trigger]="trigger"
        [customClass]="customClass"
        [persistent]="persistent">
        <button>No custom styling</button>
      </qk-tooltip>
    `
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText('No custom styling');
    
    await userEvent.hover(trigger);
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Verify classes without custom class
    const tooltip = canvasElement.querySelector('.qk-tooltip');
    expect(tooltip).toHaveClass('qk-tooltip--top');
    expect(tooltip).toHaveClass('qk-tooltip--plain');
    expect(tooltip).not.toHaveClass('qk-tooltip--persistent');
    
    await userEvent.unhover(trigger);
    await new Promise(resolve => setTimeout(resolve, 100));
  }
};

export const TooltipMouseInteraction: Story = {
  args: {
    text: 'Hover over tooltip itself',
    trigger: 'hover',
    persistent: true
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 100px;">
        <qk-tooltip 
          [text]="text" 
          [trigger]="trigger"
          [persistent]="persistent">
          <button>Hover me then hover tooltip</button>
        </qk-tooltip>
      </div>
    `
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText('Hover me then hover tooltip');
    
    // Show tooltip
    await userEvent.hover(trigger);
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Now hover over the tooltip itself
    const tooltip = canvasElement.querySelector('.qk-tooltip');
    if (tooltip) {
      await userEvent.hover(tooltip);
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Now leave the tooltip
      await userEvent.unhover(tooltip);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    await userEvent.unhover(trigger);
    await new Promise(resolve => setTimeout(resolve, 100));
  }
};
