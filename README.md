# 🎨 Quanta Kit Design System

A comprehensive, multi-framework design system built with Turborepo, featuring React, Vue, and Angular component libraries with automated CI/CD and Storybook documentation.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/quanta-kit-design-system.git
cd quanta-kit-design-system

# Install dependencies
npm install

# Start development servers for all packages
npm run dev

# Build all packages
npm run build
```

## 📦 What's Inside?

This Turborepo includes the following packages and applications:

### Component Libraries

- **`@quanta-kit/react`**: React component library with TypeScript
- **`@quanta-kit/vue`**: Vue 3 component library with Composition API  
- **`@quanta-kit/angular`**: Angular component library with latest features
- **`design-tokens`**: Shared design tokens across all frameworks

### Documentation Apps

- **`docs-react`**: Next.js documentation site for React components
- **`docs-vue`**: Nuxt.js documentation site for Vue components
- **`docs-angular`**: Angular documentation site for Angular components

### Storybook Integration

Each component library includes its own Storybook:
- 🅰️ **Angular Storybook**: Interactive Angular component playground
- ⚛️ **React Storybook**: Interactive React component playground  
- 🟢 **Vue Storybook**: Interactive Vue component playground

### Shared Configurations

- **`@repo/eslint-config`**: Shared ESLint configurations
- **`@repo/typescript-config`**: Shared TypeScript configurations
- **`@repo/prettier-config`**: Shared Prettier configurations

## 🛠️ Development

### Start All Development Servers

```bash
npm run dev
```

This starts:
- React Storybook on `http://localhost:6006`
- Vue Storybook on `http://localhost:6007`
- Angular Storybook on `http://localhost:6008`
- All documentation sites

### Build Everything

```bash
npm run build
```

### Build Specific Package

```bash
# Build only React components
turbo build --filter=@quanta-kit/react

# Build only Vue components  
turbo build --filter=@quanta-kit/vue

# Build only Angular components
turbo build --filter=@quanta-kit/angular
```

### Run Storybooks

```bash
# All Storybooks
npm run storybook

# Specific Storybook
turbo run storybook --filter=@quanta-kit/react
```

### Build Storybooks for Production

```bash
npm run build-storybook
```

## 📚 Package Usage

### Install Components

```bash
# React components
npm install @quanta-kit/react

# Vue components
npm install @quanta-kit/vue

# Angular components
npm install @quanta-kit/angular
```

### Usage Examples

#### React

```tsx
import { Button, Card, Input } from '@quanta-kit/react';

function App() {
  return (
    <Card>
      <Input placeholder="Enter your name" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

#### Vue

```vue
<template>
  <QuantaCard>
    <QuantaInput placeholder="Enter your name" />
    <QuantaButton variant="primary">Submit</QuantaButton>
  </QuantaCard>
</template>

<script setup>
import { QuantaCard, QuantaInput, QuantaButton } from '@quanta-kit/vue';
</script>
```

#### Angular

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <quanta-card>
      <quanta-input placeholder="Enter your name"></quanta-input>
      <quanta-button variant="primary">Submit</quanta-button>
    </quanta-card>
  `
})
export class AppComponent {}
```

## 🔄 Release Process

### Making Changes

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/new-component
   ```

2. **Make your changes** and add a changeset:
   ```bash
   npm run changeset
   ```

3. **Commit and push**:
   ```bash
   git add .
   git commit -m "feat: add new component"
   git push origin feature/new-component
   ```

### Staging Deployment

1. **Merge to staging branch**:
   ```bash
   git checkout monorepo-release
   git merge feature/new-component
   git push origin monorepo-release
   ```

2. **Automatic deployment** to GitHub Pages staging environment

### Production Release

1. **Merge to main**:
   ```bash
   git checkout main
   git merge monorepo-release
   git push origin main
   ```

2. **Automatic process**:
   - ✅ Publishes packages to NPM
   - ✅ Deploys Storybooks to production
   - ✅ Creates GitHub release with changelog

## 🌐 Live Documentation

### Storybooks (Production)
- 🅰️ **Angular**: [View Angular Storybook](https://your-username.github.io/quanta-kit-design-system/angular/)
- ⚛️ **React**: [View React Storybook](https://your-username.github.io/quanta-kit-design-system/react/)
- 🟢 **Vue**: [View Vue Storybook](https://your-username.github.io/quanta-kit-design-system/vue/)

### Documentation Sites
- **React Docs**: [View React Documentation](https://docs-react.vercel.app)
- **Vue Docs**: [View Vue Documentation](https://docs-vue.vercel.app)
- **Angular Docs**: [View Angular Documentation](https://docs-angular.vercel.app)

## 🧪 Testing & Quality

```bash
# Run all linting
npm run lint

# Run type checking
npm run check-types

# Format code
npm run format
```

## 🏗️ Architecture

```
quanta-kit-design-system/
├── packages/
│   ├── quanta-kit-react/          # React components + Storybook
│   ├── quanta-kit-vue/            # Vue components + Storybook
│   ├── quanta-kit-angular/        # Angular components + Storybook
│   └── design-tokens/             # Shared design tokens
├── apps/
│   ├── docs-react/                # React documentation
│   ├── docs-vue/                  # Vue documentation
│   └── docs-angular/              # Angular documentation
├── .github/workflows/
│   └── release.yml                # CI/CD pipeline
├── .changeset/                    # Changeset configuration
├── turbo.json                     # Turborepo configuration
└── package.json                   # Root package configuration
```

## 🤝 Contributing

1. **Read the setup guide**: [TURBOREPO_SETUP_GUIDE.md](./TURBOREPO_SETUP_GUIDE.md)
2. **Follow conventional commits**: `feat:`, `fix:`, `docs:`, etc.
3. **Add changesets** for all changes that affect packages
4. **Test thoroughly** before submitting PRs
5. **Update documentation** as needed

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start all development servers |
| `npm run build` | Build all packages and apps |
| `npm run lint` | Lint all packages |
| `npm run check-types` | Run TypeScript type checking |
| `npm run storybook` | Start all Storybooks |
| `npm run build-storybook` | Build all Storybooks for production |
| `npm run changeset` | Create a new changeset |
| `npm run version-packages` | Version packages based on changesets |
| `npm run release` | Publish packages to NPM |

## 🔧 Tools & Technologies

- **📦 Monorepo**: Turborepo for fast, efficient builds
- **🔄 Version Management**: Changesets for semantic versioning
- **📖 Documentation**: Storybook for component documentation
- **🚀 CI/CD**: GitHub Actions for automated testing and deployment
- **💅 Styling**: Shared design tokens across frameworks
- **📝 TypeScript**: Full TypeScript support across all packages
- **🔍 Quality**: ESLint, Prettier, and Husky for code quality

## 📖 Documentation

- **[Complete Setup Guide](./TURBOREPO_SETUP_GUIDE.md)** - Detailed setup instructions
- **[Build Fixes](./BUILD_FIX.md)** - Common build issue solutions
- **[Changeset Guide](./CHANGESET_FIXES.md)** - Changeset best practices

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/quanta-kit-design-system/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/quanta-kit-design-system/discussions)
- **Documentation**: [Setup Guide](./TURBOREPO_SETUP_GUIDE.md)

---

**Built with ❤️ using Turborepo, React, Vue, and Angular**