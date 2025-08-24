# QuantaKit Angular

🚀 **Techy & Futuristic** - QuantaKit delivers quantized UI elements in an Angular-based toolkit built for scale. With atomic design, blazing performance, and WCAG accessibility, it's your launchpad to consistent, adaptive apps—now and as Web Components in the future.

## ✨ Features

- **⚛️ Atomic Design** - Components built with atoms, molecules, and organisms
- **🚀 Angular 20** - Latest Angular framework with modern architecture
- **📖 Storybook Integration** - Interactive component development and documentation
- **♿ WCAG Accessibility** - Full accessibility compliance out of the box
- **🎯 Performance Optimized** - Tree-shakeable, lightweight components
- **🔮 Future-Ready** - Designed for easy Web Components migration
- **🎨 Themeable** - Consistent design system with customization options
- **📱 Responsive** - Mobile-first responsive design

## 🛠️ Prerequisites

- Node.js (version 22 or higher)
- npm (comes with Node.js)
- Git

## 📦 Installation

### For Library Users

```bash
npm install quanta-kit-angular
```

### For Development

1. Clone the repository:
```bash
git clone https://github.com/marvin-aroza/quanta-kit-angular.git
cd quanta-kit-angular
```

2. Install dependencies:
```bash
npm install
```

3. Start Storybook (recommended for development):
```bash
npm run storybook
```

Storybook will be available at `http://localhost:6006`.

## 🚀 Quick Start

```typescript
import { ButtonComponent } from 'quanta-kit-angular';

@Component({
  template: `
    <qk-button variant="primary" size="medium">
      Click me!
    </qk-button>
  `
})
export class MyComponent {}
```

## 🏗️ Available Scripts

- `npm run storybook` - Start Storybook development environment
- `npm start` - Start Angular development server
- `npm run build` - Build the library
- `npm run build-storybook` - Build Storybook for production
- `npm test` - Run unit tests
- `npm run test-storybook` - Run Storybook tests

## Development serverta-kit-angular
🚀 Techy &amp; Futuristic QuantaKit delivers quantized UI elements in an Angular-based toolkit built for scale. With atomic design, blazing performance, and WCAG accessibility, it’s your launchpad to consistent, adaptive apps—now and as Web Components in the future.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.3.

## Development server

## 📁 Project Structure

```
projects/quanta-kit/
├── src/
│   ├── lib/            # Component library source
│   │   ├── atoms/      # Basic building blocks
│   │   ├── molecules/  # Simple combinations
│   │   └── organisms/  # Complex components
│   └── public-api.ts   # Library exports
├── .storybook/         # Storybook configuration
└── stories/            # Storybook stories
```

## 🎨 Component Categories

### Atoms
- Button, Input, Label, Icon, etc.

### Molecules  
- Form Field, Card Header, Navigation Item, etc.

### Organisms
- Form, Card, Navigation Bar, etc.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:
- Component development workflow
- Storybook story creation
- Accessibility requirements
- Testing standards

## 📚 Documentation

- **Storybook**: Interactive component playground and documentation
- **API Docs**: Generated TypeScript documentation
- **Usage Guide**: [QuantaKit Docs](https://github.com/marvin-aroza/quanta-kit-angular-docs)

## 📄 License

This project is private and proprietary.

## 🔗 Related Projects

- [Angular Admin Panel](https://github.com/marvin-aroza/angular-admin-panel) - Example implementation
- [QuantaKit Docs](https://github.com/marvin-aroza/quanta-kit-angular-docs) - Documentation platform
