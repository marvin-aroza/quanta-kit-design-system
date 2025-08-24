# Quanta Kit React

A modern React component library built with TypeScript, providing reusable UI components for building beautiful and accessible applications.

## Installation

```bash
npm install quanta-kit-react
```

## Usage

```tsx
import { Button } from "quanta-kit-react";

function App() {
  return (
    <div>
      <Button
        variant="primary"
        size="medium"
        onClick={() => console.log("Clicked!")}
      >
        Click me
      </Button>
    </div>
  );
}
```

## Components

### Button

A versatile button component with multiple variants and sizes.

**Props:**

- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' (default: 'primary')
- `size`: 'small' | 'medium' | 'large' (default: 'medium')
- `disabled`: boolean (default: false)
- `onClick`: (event: React.MouseEvent<HTMLButtonElement>) => void
- `className`: string
- `type`: 'button' | 'submit' | 'reset' (default: 'button')

**Examples:**

```tsx
// Primary button
<Button variant="primary">Primary Button</Button>

// Secondary button
<Button variant="secondary">Secondary Button</Button>

// Outline button
<Button variant="outline">Outline Button</Button>

// Ghost button
<Button variant="ghost">Ghost Button</Button>

// Different sizes
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>

// Disabled button
<Button disabled>Disabled</Button>

// With custom click handler
<Button onClick={() => alert('Hello!')}>Click me</Button>
```

## Development

### Available Scripts

- `npm run build` - Build the library for production
- `npm run dev` - Build in watch mode
- `npm run lint` - Run ESLint
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production
- `npm run check-types` - Type check without emitting

### Building

```bash
npm run build
```

This will create production-ready files in the `dist` folder.

### Storybook

```bash
npm run storybook
```

View component documentation and interactive examples at http://localhost:6006

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure linting passes
4. Submit a pull request

## License

MIT
