# Quanta Kit Vue

A comprehensive Vue 3 component library built with TypeScript and modern development practices.

## Installation

```bash
npm install quanta-kit-vue
```

## Usage

### Basic Usage

```vue
<template>
  <div>
    <Button variant="primary" @click="handleClick"> Click me! </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from "quanta-kit-vue";

const handleClick = () => {
  console.log("Button clicked!");
};
</script>
```

### Component Import

```typescript
// Import specific components
import { Button } from "quanta-kit-vue";

// Import component types
import type { ButtonProps, ButtonVariant } from "quanta-kit-vue";
```

## Components

### Button

A versatile button component with multiple variants and sizes.

#### Props

- `variant?: 'primary' | 'secondary' | 'outline' | 'ghost'` - Button style variant (default: 'primary')
- `size?: 'small' | 'medium' | 'large'` - Button size (default: 'medium')
- `disabled?: boolean` - Whether the button is disabled (default: false)
- `type?: 'button' | 'submit' | 'reset'` - Button type attribute (default: 'button')
- `class?: string` - Additional CSS classes

#### Events

- `@click` - Emitted when the button is clicked (only when not disabled)

#### Examples

```vue
<template>
  <!-- Different variants -->
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>

  <!-- Different sizes -->
  <Button size="small">Small</Button>
  <Button size="medium">Medium</Button>
  <Button size="large">Large</Button>

  <!-- Disabled state -->
  <Button disabled>Disabled</Button>

  <!-- With event handler -->
  <Button @click="handleClick">Click me</Button>
</template>
```

## Development

### Building

```bash
npm run build
```

### Linting

```bash
npm run lint
```

### Type Checking

```bash
npm run check-types
```

### Storybook

```bash
npm run storybook
```

## License

MIT
