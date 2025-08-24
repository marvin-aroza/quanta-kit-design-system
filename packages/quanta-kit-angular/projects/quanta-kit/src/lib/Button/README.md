# Button Component

A comprehensive, accessible, and customizable button component for Angular applications.

## Features

- ✅ **16 Variants**: 8 solid variants + 8 outline variants
- ✅ **5 Sizes**: xs, sm, md, lg, xl
- ✅ **Loading State**: With spinner animation
- ✅ **Disabled State**: Proper accessibility handling
- ✅ **Icon Support**: Left and right icon slots
- ✅ **Full Width Option**: Responsive design support
- ✅ **Shape Variations**: Rounded and square options
- ✅ **Accessibility**: ARIA attributes and keyboard navigation
- ✅ **Event Emissions**: Click, focus, and blur events
- ✅ **TypeScript**: Full type safety
- ✅ **Customizable**: Custom classes and styling
- ✅ **Test Coverage**: Comprehensive unit tests

## Installation

The button component is part of the Quanta Kit Angular library. Import it from the main package:

```typescript
import { ButtonComponent } from "quanta-kit-angular";
```

## Basic Usage

```html
<qk-button variant="primary" size="md" (clicked)="handleClick($event)"> Click me </qk-button>
```

## API Reference

### Inputs

| Property            | Type              | Default     | Description                        |
| ------------------- | ----------------- | ----------- | ---------------------------------- |
| `variant`           | `ButtonVariant`   | `'primary'` | Visual style variant               |
| `size`              | `ButtonSize`      | `'md'`      | Button size                        |
| `type`              | `ButtonType`      | `'button'`  | HTML button type                   |
| `disabled`          | `boolean`         | `false`     | Whether button is disabled         |
| `loading`           | `boolean`         | `false`     | Whether button is in loading state |
| `hideTextOnLoading` | `boolean`         | `false`     | Hide text content when loading     |
| `fullWidth`         | `boolean`         | `false`     | Take full width of container       |
| `rounded`           | `boolean`         | `false`     | Fully rounded corners              |
| `square`            | `boolean`         | `false`     | No border radius                   |
| `customClass`       | `string`          | `''`        | Custom CSS classes                 |
| `ariaLabel`         | `string`          | `''`        | ARIA label for accessibility       |
| `ariaPressed`       | `boolean \| null` | `null`      | ARIA pressed state                 |
| `testId`            | `string`          | `''`        | Test ID attribute                  |

### Outputs

| Event     | Type                       | Description                        |
| --------- | -------------------------- | ---------------------------------- |
| `clicked` | `EventEmitter<MouseEvent>` | Emitted when button is clicked     |
| `focused` | `EventEmitter<FocusEvent>` | Emitted when button receives focus |
| `blurred` | `EventEmitter<FocusEvent>` | Emitted when button loses focus    |

### Types

```typescript
type ButtonVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "outline-primary" | "outline-secondary" | "outline-success" | "outline-danger" | "outline-warning" | "outline-info" | "outline-light" | "outline-dark";

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

type ButtonType = "button" | "submit" | "reset";
```

## Examples

### Variants

```html
<!-- Solid variants -->
<qk-button variant="primary">Primary</qk-button>
<qk-button variant="secondary">Secondary</qk-button>
<qk-button variant="success">Success</qk-button>
<qk-button variant="danger">Danger</qk-button>
<qk-button variant="warning">Warning</qk-button>
<qk-button variant="info">Info</qk-button>
<qk-button variant="light">Light</qk-button>
<qk-button variant="dark">Dark</qk-button>

<!-- Outline variants -->
<qk-button variant="outline-primary">Outline Primary</qk-button>
<qk-button variant="outline-secondary">Outline Secondary</qk-button>
<!-- ... etc -->
```

### Sizes

```html
<qk-button size="xs">Extra Small</qk-button>
<qk-button size="sm">Small</qk-button>
<qk-button size="md">Medium</qk-button>
<qk-button size="lg">Large</qk-button>
<qk-button size="xl">Extra Large</qk-button>
```

### With Icons

```html
<!-- Left icon -->
<qk-button variant="primary">
  <svg slot="icon-left" width="16" height="16">...</svg>
  Save
</qk-button>

<!-- Right icon -->
<qk-button variant="primary">
  Continue
  <svg slot="icon-right" width="16" height="16">...</svg>
</qk-button>

<!-- Both icons -->
<qk-button variant="primary">
  <svg slot="icon-left" width="16" height="16">...</svg>
  Save Changes
  <svg slot="icon-right" width="16" height="16">...</svg>
</qk-button>

<!-- Icon only -->
<qk-button variant="primary" ariaLabel="Delete">
  <svg width="16" height="16">...</svg>
</qk-button>
```

### States

```html
<!-- Loading state -->
<qk-button [loading]="true">Loading...</qk-button>

<!-- Loading with hidden text -->
<qk-button [loading]="true" [hideTextOnLoading]="true"> Processing... </qk-button>

<!-- Disabled state -->
<qk-button [disabled]="true">Disabled</qk-button>
```

### Layout Options

```html
<!-- Full width -->
<qk-button [fullWidth]="true">Full Width Button</qk-button>

<!-- Rounded -->
<qk-button [rounded]="true">Rounded Button</qk-button>

<!-- Square -->
<qk-button [square]="true">Square Button</qk-button>
```

### Form Integration

```html
<!-- Submit button -->
<form (ngSubmit)="onSubmit()">
  <qk-button type="submit" variant="primary">Submit Form</qk-button>
</form>

<!-- Reset button -->
<qk-button type="reset" variant="secondary">Reset</qk-button>
```

### Event Handling

```typescript
export class MyComponent {
  handleClick(event: MouseEvent) {
    // Handle button click
    this.onButtonClick(event);
  }

  handleFocus(event: FocusEvent) {
    // Handle button focus
    this.onButtonFocus(event);
  }

  handleBlur(event: FocusEvent) {
    // Handle button blur
    this.onButtonBlur(event);
  }
}
```

```html
<qk-button (clicked)="handleClick($event)" (focused)="handleFocus($event)" (blurred)="handleBlur($event)"> Interactive Button </qk-button>
```

### Accessibility

```html
<!-- Proper ARIA labels -->
<qk-button ariaLabel="Close dialog">
  <svg>...</svg>
</qk-button>

<!-- Toggle button -->
<qk-button [ariaPressed]="isPressed" (clicked)="toggle()"> Toggle </qk-button>

<!-- Test ID for testing -->
<qk-button testId="submit-button">Submit</qk-button>
```

### Custom Styling

```html
<!-- Custom CSS classes -->
<qk-button customClass="my-custom-style another-class"> Custom Styled </qk-button>
```

```scss
// Override styles
.my-custom-style {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
  }
}
```

## Accessibility Features

- **Keyboard Navigation**: Supports Tab, Enter, and Space key interactions
- **ARIA Attributes**: Supports `aria-label`, `aria-pressed`, and other ARIA attributes
- **Focus Management**: Proper focus indicators and management
- **Screen Reader Support**: Descriptive labels and states
- **High Contrast Mode**: Supports high contrast color schemes
- **Reduced Motion**: Respects `prefers-reduced-motion` settings

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

When contributing to the button component:

1. Ensure all props are properly typed
2. Add comprehensive tests for new features
3. Update Storybook stories for visual testing
4. Follow accessibility guidelines
5. Maintain backward compatibility

## Testing

Run the component tests:

```bash
npm run test
```

Run Storybook for visual testing:

```bash
npm run storybook
```

## License

This component is part of the Quanta Kit Angular library.
