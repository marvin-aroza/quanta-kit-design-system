# Complete Monorepo Setup Guide: UI Libraries + Applications

This guide will help you create a monorepo with:
- 🎨 **Shared Design Tokens**
- 📚 **Angular Component Library** 
- ⚛️ **React Component Library**
- 🅰️ **Angular Application** (consuming Angular library)
- ⚛️ **React Application** (consuming React library)

## 📁 Final Structure
```
my-ui-monorepo/
├── packages/
│   ├── design-tokens/          # Shared design system
│   ├── angular-ui/             # Angular component library
│   ├── react-ui/               # React component library
│   ├── angular-app/            # Angular demo application
│   └── react-app/              # React demo application
├── package.json                # Root workspace
├── tsconfig.json               # Shared TypeScript config
└── .gitignore
```

---

## 🚀 Step 1: Initialize Root Monorepo

### 1.1 Create Root Directory
```bash
mkdir my-ui-monorepo
cd my-ui-monorepo
```

### 1.2 Initialize Package.json
```bash
npm init -y
```

### 1.3 Update Root package.json
```json
{
  "name": "my-ui-monorepo",
  "version": "1.0.0",
  "description": "Monorepo with Angular/React UI libraries and demo apps",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "npm run build --workspaces",
    "dev": "npm run dev --workspaces",
    "test": "npm run test --workspaces",
    "lint": "npm run lint --workspaces",
    
    "build:tokens": "npm run build --workspace=packages/design-tokens",
    "build:angular-ui": "npm run build --workspace=packages/angular-ui",
    "build:react-ui": "npm run build --workspace=packages/react-ui",
    "build:angular-app": "npm run build --workspace=packages/angular-app",
    "build:react-app": "npm run build --workspace=packages/react-app",
    
    "dev:angular-ui": "npm run storybook --workspace=packages/angular-ui",
    "dev:react-ui": "npm run storybook --workspace=packages/react-ui",
    "dev:angular-app": "npm run start --workspace=packages/angular-app",
    "dev:react-app": "npm run dev --workspace=packages/react-app",
    
    "storybook:angular": "npm run storybook --workspace=packages/angular-ui",
    "storybook:react": "npm run storybook --workspace=packages/react-ui"
  },
  "devDependencies": {
    "@commitlint/cli": "^19.0.0",
    "@commitlint/config-conventional": "^19.0.0",
    "prettier": "^3.0.0",
    "typescript": "^5.6.0"
  },
  "keywords": ["ui-kit", "design-system", "angular", "react", "monorepo"],
  "author": "Your Name",
  "license": "MIT"
}
```

### 1.4 Create Root tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM"],
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "removeComments": false,
    "noEmitOnError": true,
    "preserveWatchOutput": true
  },
  "exclude": ["node_modules", "dist", "**/*.spec.ts", "**/*.test.ts"]
}
```

### 1.5 Create .gitignore
```
# Dependencies
node_modules/
*/node_modules/

# Build outputs
dist/
*/dist/
build/
*/build/
storybook-static/
*/storybook-static/

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*/coverage/

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Angular
.angular/
*/.angular/

# React
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### 1.6 Create packages directory
```bash
mkdir packages
```

---

## 🎨 Step 2: Create Design Tokens Package

### 2.1 Create design-tokens package
```bash
mkdir packages/design-tokens
cd packages/design-tokens
npm init -y
```

### 2.2 Update packages/design-tokens/package.json
```json
{
  "name": "@my-ui/design-tokens",
  "version": "1.0.0",
  "description": "Shared design tokens for UI components",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "node build.js",
    "dev": "node build.js --watch"
  },
  "devDependencies": {
    "fs-extra": "^11.0.0",
    "chokidar": "^3.5.0"
  },
  "keywords": ["design-tokens", "scss", "css-variables"],
  "author": "Your Name",
  "license": "MIT"
}
```

### 2.3 Create tokens structure
```bash
mkdir src
mkdir src/tokens
mkdir dist
```

### 2.4 Create src/tokens/colors.json
```json
{
  "colors": {
    "primary": {
      "50": "#f0f9ff",
      "100": "#e0f2fe",
      "500": "#0ea5e9",
      "600": "#0284c7",
      "700": "#0369a1",
      "900": "#0c4a6e"
    },
    "secondary": {
      "50": "#f8fafc",
      "500": "#64748b",
      "700": "#334155",
      "900": "#0f172a"
    },
    "success": {
      "50": "#f0fdf4",
      "500": "#22c55e",
      "700": "#15803d"
    },
    "warning": {
      "50": "#fffbeb",
      "500": "#f59e0b",
      "700": "#d97706"
    },
    "error": {
      "50": "#fef2f2",
      "500": "#ef4444",
      "700": "#dc2626"
    },
    "neutral": {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#e5e5e5",
      "300": "#d4d4d4",
      "400": "#a3a3a3",
      "500": "#737373",
      "600": "#525252",
      "700": "#404040",
      "800": "#262626",
      "900": "#171717"
    }
  }
}
```

### 2.5 Create src/tokens/spacing.json
```json
{
  "spacing": {
    "xs": "0.25rem",
    "sm": "0.5rem",
    "md": "1rem",
    "lg": "1.5rem",
    "xl": "2rem",
    "2xl": "3rem",
    "3xl": "4rem"
  }
}
```

### 2.6 Create src/tokens/typography.json
```json
{
  "typography": {
    "fontFamily": {
      "sans": ["Inter", "system-ui", "sans-serif"],
      "mono": ["Fira Code", "monospace"]
    },
    "fontSize": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem"
    },
    "fontWeight": {
      "normal": "400",
      "medium": "500",
      "semibold": "600",
      "bold": "700"
    }
  }
}
```

### 2.7 Create build.js
```javascript
const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');

const TOKENS_DIR = path.join(__dirname, 'src/tokens');
const DIST_DIR = path.join(__dirname, 'dist');

function generateTokens() {
  console.log('🎨 Building design tokens...');
  
  // Ensure dist directory exists
  fs.ensureDirSync(DIST_DIR);
  
  // Read all token files
  const tokenFiles = fs.readdirSync(TOKENS_DIR).filter(file => file.endsWith('.json'));
  let allTokens = {};
  
  tokenFiles.forEach(file => {
    const filePath = path.join(TOKENS_DIR, file);
    const tokens = fs.readJsonSync(filePath);
    allTokens = { ...allTokens, ...tokens };
  });
  
  // Generate SCSS variables
  const scssContent = generateSCSS(allTokens);
  fs.writeFileSync(path.join(DIST_DIR, 'tokens.scss'), scssContent);
  
  // Generate CSS custom properties
  const cssContent = generateCSS(allTokens);
  fs.writeFileSync(path.join(DIST_DIR, 'tokens.css'), cssContent);
  
  // Generate JavaScript/TypeScript
  const jsContent = generateJS(allTokens);
  fs.writeFileSync(path.join(DIST_DIR, 'tokens.js'), jsContent);
  
  const tsContent = generateTS(allTokens);
  fs.writeFileSync(path.join(DIST_DIR, 'tokens.d.ts'), tsContent);
  
  // Generate index files
  const indexContent = `export * from './tokens.js';\n`;
  fs.writeFileSync(path.join(DIST_DIR, 'index.js'), indexContent);
  fs.writeFileSync(path.join(DIST_DIR, 'index.d.ts'), `export * from './tokens';\n`);
  
  console.log('✅ Design tokens built successfully!');
}

function generateSCSS(tokens, prefix = '$') {
  let scss = '// Generated SCSS variables\n\n';
  
  function processObject(obj, path = []) {
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        processObject(value, [...path, key]);
      } else {
        const variableName = `${prefix}${[...path, key].join('-')}`;
        scss += `${variableName}: ${value};\n`;
      }
    });
  }
  
  processObject(tokens);
  return scss;
}

function generateCSS(tokens) {
  let css = '/* Generated CSS custom properties */\n\n:root {\n';
  
  function processObject(obj, path = []) {
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        processObject(value, [...path, key]);
      } else {
        const variableName = `--${[...path, key].join('-')}`;
        css += `  ${variableName}: ${value};\n`;
      }
    });
  }
  
  processObject(tokens);
  css += '}\n';
  return css;
}

function generateJS(tokens) {
  return `// Generated JavaScript tokens\nexport const tokens = ${JSON.stringify(tokens, null, 2)};\n`;
}

function generateTS(tokens) {
  let ts = '// Generated TypeScript definitions\n\n';
  
  function generateInterface(obj, name = 'Tokens') {
    ts += `export interface ${name} {\n`;
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        ts += `  ${key}: {\n`;
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (typeof subValue === 'object' && subValue !== null) {
            ts += `    ${subKey}: { [key: string]: string };\n`;
          } else {
            ts += `    ${subKey}: string;\n`;
          }
        });
        ts += `  };\n`;
      } else {
        ts += `  ${key}: string;\n`;
      }
    });
    ts += '}\n\n';
  }
  
  generateInterface(tokens);
  ts += 'export declare const tokens: Tokens;\n';
  return ts;
}

// Build tokens
generateTokens();

// Watch mode
if (process.argv.includes('--watch')) {
  console.log('👀 Watching for changes...');
  chokidar.watch(TOKENS_DIR).on('change', () => {
    generateTokens();
  });
}
```

### 2.8 Install dependencies and build
```bash
npm install
npm run build
```

---

## 📚 Step 3: Create Angular Component Library

### 3.1 Create Angular UI package
```bash
cd ../../ # back to root
npx @angular/cli new packages/angular-ui --create-application=false --package-manager=npm --style=scss --routing=false
cd packages/angular-ui
npx @angular/cli generate library angular-ui --prefix=ui
```

### 3.2 Update packages/angular-ui/package.json
```json
{
  "name": "@my-ui/angular-ui",
  "version": "1.0.0",
  "description": "Angular UI component library",
  "peerDependencies": {
    "@angular/common": "^20.0.0",
    "@angular/core": "^20.0.0"
  },
  "dependencies": {
    "@my-ui/design-tokens": "^1.0.0"
  },
  "devDependencies": {
    "@angular/animations": "^20.0.0",
    "@angular/common": "^20.0.0",
    "@angular/compiler": "^20.0.0",
    "@angular/core": "^20.0.0",
    "@angular/forms": "^20.0.0",
    "@angular/platform-browser": "^20.0.0",
    "@angular/platform-browser-dynamic": "^20.0.0",
    "@angular-devkit/build-angular": "^20.0.0",
    "@angular/cli": "^20.0.0",
    "@angular/compiler-cli": "^20.0.0",
    "@storybook/angular": "^8.6.0",
    "@storybook/addon-essentials": "^8.6.0",
    "@compodoc/compodoc": "^1.1.0",
    "ng-packagr": "^20.0.0",
    "typescript": "~5.6.0"
  },
  "scripts": {
    "build": "ng build",
    "test": "ng test",
    "storybook": "ng run angular-ui:storybook",
    "build-storybook": "ng run angular-ui:build-storybook"
  }
}
```

### 3.3 Create Button Component
```bash
npx @angular/cli generate component button --project=angular-ui --export
```

### 3.4 Update projects/angular-ui/src/lib/button/button.component.ts
```typescript
import { Component, Input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-button',
  template: `
    <button 
      [class]="buttonClasses"
      [disabled]="disabled"
      (click)="onClick.emit($event)">
      <ng-content></ng-content>
    </button>
  `,
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter<Event>();

  get buttonClasses(): string {
    return `ui-button ui-button--${this.variant} ui-button--${this.size}`;
  }
}
```

### 3.5 Update projects/angular-ui/src/lib/button/button.component.scss
```scss
@import '@my-ui/design-tokens/dist/tokens.scss';

.ui-button {
  border: none;
  border-radius: 0.375rem;
  font-weight: $typography-fontWeight-medium;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  // Sizes
  &--sm {
    padding: $spacing-xs $spacing-sm;
    font-size: $typography-fontSize-sm;
  }

  &--md {
    padding: $spacing-sm $spacing-md;
    font-size: $typography-fontSize-base;
  }

  &--lg {
    padding: $spacing-md $spacing-lg;
    font-size: $typography-fontSize-lg;
  }

  // Variants
  &--primary {
    background-color: $colors-primary-500;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: $colors-primary-600;
    }
  }

  &--secondary {
    background-color: $colors-secondary-500;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: $colors-secondary-700;
    }
  }

  &--success {
    background-color: $colors-success-500;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: $colors-success-700;
    }
  }

  &--warning {
    background-color: $colors-warning-500;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: $colors-warning-700;
    }
  }

  &--error {
    background-color: $colors-error-500;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: $colors-error-700;
    }
  }
}
```

### 3.6 Setup Storybook for Angular
```bash
npx storybook@latest init
```

### 3.7 Create Button Stories - projects/angular-ui/src/lib/button/button.stories.ts
```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Angular UI/Button',
  component: ButtonComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: '<ui-button [variant]="variant" [size]="size">Primary Button</ui-button>',
  }),
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  render: (args) => ({
    props: args,
    template: '<ui-button [variant]="variant" [size]="size">Secondary Button</ui-button>',
  }),
};

export const Success: Story = {
  args: {
    variant: 'success',
  },
  render: (args) => ({
    props: args,
    template: '<ui-button [variant]="variant" [size]="size">Success Button</ui-button>',
  }),
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <ui-button variant="primary">Primary</ui-button>
        <ui-button variant="secondary">Secondary</ui-button>
        <ui-button variant="success">Success</ui-button>
        <ui-button variant="warning">Warning</ui-button>
        <ui-button variant="error">Error</ui-button>
      </div>
    `,
  }),
};
```

---

## ⚛️ Step 4: Create React Component Library

### 4.1 Create React UI package
```bash
cd ../../ # back to root
mkdir packages/react-ui
cd packages/react-ui
npm init -y
```

### 4.2 Update packages/react-ui/package.json
```json
{
  "name": "@my-ui/react-ui",
  "version": "1.0.0",
  "description": "React UI component library",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "dependencies": {
    "@my-ui/design-tokens": "^1.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@rollup/plugin-commonjs": "^28.0.0",
    "@rollup/plugin-node-resolve": "^16.0.0",
    "@rollup/plugin-typescript": "^12.0.0",
    "@storybook/addon-essentials": "^8.6.0",
    "@storybook/react": "^8.6.0",
    "@storybook/react-vite": "^8.6.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "rollup": "^4.0.0",
    "rollup-plugin-peer-deps-external": "^2.2.4",
    "rollup-plugin-postcss": "^4.0.2",
    "sass": "^1.70.0",
    "storybook": "^8.6.0",
    "typescript": "^5.6.0",
    "vite": "^6.0.0"
  },
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

### 4.3 Create src directory structure
```bash
mkdir src
mkdir .storybook
```

### 4.4 Create src/Button/Button.tsx
```tsx
import React from 'react';
import './Button.scss';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
  ...props
}) => {
  const buttonClasses = `ui-button ui-button--${variant} ui-button--${size}`;

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
```

### 4.5 Create src/Button/Button.scss
```scss
@import '@my-ui/design-tokens/dist/tokens.scss';

.ui-button {
  border: none;
  border-radius: 0.375rem;
  font-weight: $typography-fontWeight-medium;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-family: $typography-fontFamily-sans;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  // Sizes
  &--sm {
    padding: $spacing-xs $spacing-sm;
    font-size: $typography-fontSize-sm;
  }

  &--md {
    padding: $spacing-sm $spacing-md;
    font-size: $typography-fontSize-base;
  }

  &--lg {
    padding: $spacing-md $spacing-lg;
    font-size: $typography-fontSize-lg;
  }

  // Variants
  &--primary {
    background-color: $colors-primary-500;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: $colors-primary-600;
    }
  }

  &--secondary {
    background-color: $colors-secondary-500;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: $colors-secondary-700;
    }
  }

  &--success {
    background-color: $colors-success-500;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: $colors-success-700;
    }
  }

  &--warning {
    background-color: $colors-warning-500;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: $colors-warning-700;
    }
  }

  &--error {
    background-color: $colors-error-500;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: $colors-error-700;
    }
  }
}
```

### 4.6 Create src/index.ts
```typescript
export { Button } from './Button/Button';
export type { ButtonProps } from './Button/Button';
```

### 4.7 Create rollup.config.js
```javascript
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    postcss({
      extract: true,
      minimize: true,
      use: ['sass'],
    }),
  ],
  external: ['react', 'react-dom'],
};
```

### 4.8 Create tsconfig.json
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "declaration": true,
    "outDir": "dist"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "**/*.stories.*"]
}
```

### 4.9 Setup Storybook
```bash
npx storybook@latest init
```

### 4.10 Create src/Button/Button.stories.tsx
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'React UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success Button',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning Button',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Error Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="error">Error</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
```

---

## 🅰️ Step 5: Create Angular Application

### 5.1 Create Angular app
```bash
cd ../../ # back to root
npx @angular/cli new packages/angular-app --routing=true --style=scss --package-manager=npm
cd packages/angular-app
```

### 5.2 Update packages/angular-app/package.json
```json
{
  "name": "@my-ui/angular-app",
  "version": "1.0.0",
  "description": "Angular demo application",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint"
  },
  "dependencies": {
    "@angular/animations": "^20.0.0",
    "@angular/common": "^20.0.0",
    "@angular/compiler": "^20.0.0",
    "@angular/core": "^20.0.0",
    "@angular/forms": "^20.0.0",
    "@angular/platform-browser": "^20.0.0",
    "@angular/platform-browser-dynamic": "^20.0.0",
    "@angular/router": "^20.0.0",
    "@my-ui/angular-ui": "^1.0.0",
    "@my-ui/design-tokens": "^1.0.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.15.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^20.0.0",
    "@angular/cli": "^20.0.0",
    "@angular/compiler-cli": "^20.0.0",
    "typescript": "~5.6.0"
  }
}
```

### 5.3 Update src/app/app.module.ts
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QuantaKitAngularModule } from '@my-ui/angular-ui';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuantaKitAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 5.4 Update src/app/app.component.html
```html
<div class="app-container">
  <header class="app-header">
    <h1>Angular UI Demo</h1>
    <p>Demonstrating Angular UI components</p>
  </header>

  <main class="app-main">
    <section class="demo-section">
      <h2>Button Variants</h2>
      <div class="button-grid">
        <ui-button variant="primary">Primary</ui-button>
        <ui-button variant="secondary">Secondary</ui-button>
        <ui-button variant="success">Success</ui-button>
        <ui-button variant="warning">Warning</ui-button>
        <ui-button variant="error">Error</ui-button>
      </div>
    </section>

    <section class="demo-section">
      <h2>Button Sizes</h2>
      <div class="button-grid">
        <ui-button size="sm">Small</ui-button>
        <ui-button size="md">Medium</ui-button>
        <ui-button size="lg">Large</ui-button>
      </div>
    </section>

    <section class="demo-section">
      <h2>Disabled State</h2>
      <div class="button-grid">
        <ui-button [disabled]="true">Disabled Button</ui-button>
      </div>
    </section>
  </main>
</div>
```

### 5.5 Update src/app/app.component.scss
```scss
@import '@my-ui/design-tokens/dist/tokens.scss';

.app-container {
  min-height: 100vh;
  background-color: $colors-neutral-50;
  font-family: $typography-fontFamily-sans;
}

.app-header {
  background: linear-gradient(135deg, $colors-primary-500, $colors-primary-700);
  color: white;
  padding: $spacing-2xl;
  text-align: center;
  
  h1 {
    margin: 0 0 $spacing-sm 0;
    font-size: $typography-fontSize-3xl;
    font-weight: $typography-fontWeight-bold;
  }
  
  p {
    margin: 0;
    font-size: $typography-fontSize-lg;
    opacity: 0.9;
  }
}

.app-main {
  padding: $spacing-2xl;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: $spacing-3xl;
  
  h2 {
    margin-bottom: $spacing-lg;
    color: $colors-neutral-800;
    font-size: $typography-fontSize-2xl;
    font-weight: $typography-fontWeight-semibold;
  }
}

.button-grid {
  display: flex;
  gap: $spacing-md;
  flex-wrap: wrap;
  align-items: center;
}
```

---

## ⚛️ Step 6: Create React Application

### 6.1 Create React app
```bash
cd ../../ # back to root
npx create-react-app packages/react-app --template typescript
cd packages/react-app
```

### 6.2 Update packages/react-app/package.json
```json
{
  "name": "@my-ui/react-app",
  "version": "1.0.0",
  "description": "React demo application",
  "dependencies": {
    "@my-ui/react-ui": "^1.0.0",
    "@my-ui/design-tokens": "^1.0.0",
    "@types/node": "^16.18.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-scripts": "5.0.1",
    "sass": "^1.70.0",
    "typescript": "^5.6.0",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "dev": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

### 6.3 Update src/App.tsx
```tsx
import React from 'react';
import { Button } from '@my-ui/react-ui';
import './App.scss';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>React UI Demo</h1>
        <p>Demonstrating React UI components</p>
      </header>

      <main className="app-main">
        <section className="demo-section">
          <h2>Button Variants</h2>
          <div className="button-grid">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="error">Error</Button>
          </div>
        </section>

        <section className="demo-section">
          <h2>Button Sizes</h2>
          <div className="button-grid">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        <section className="demo-section">
          <h2>Disabled State</h2>
          <div className="button-grid">
            <Button disabled>Disabled Button</Button>
          </div>
        </section>

        <section className="demo-section">
          <h2>Interactive Example</h2>
          <div className="button-grid">
            <Button 
              variant="primary" 
              onClick={() => alert('Hello from React UI!')}
            >
              Click Me!
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
```

### 6.4 Create src/App.scss
```scss
@import '@my-ui/design-tokens/dist/tokens.scss';

.app-container {
  min-height: 100vh;
  background-color: $colors-neutral-50;
  font-family: $typography-fontFamily-sans;
}

.app-header {
  background: linear-gradient(135deg, $colors-primary-500, $colors-primary-700);
  color: white;
  padding: $spacing-2xl;
  text-align: center;
  
  h1 {
    margin: 0 0 $spacing-sm 0;
    font-size: $typography-fontSize-3xl;
    font-weight: $typography-fontWeight-bold;
  }
  
  p {
    margin: 0;
    font-size: $typography-fontSize-lg;
    opacity: 0.9;
  }
}

.app-main {
  padding: $spacing-2xl;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: $spacing-3xl;
  
  h2 {
    margin-bottom: $spacing-lg;
    color: $colors-neutral-800;
    font-size: $typography-fontSize-2xl;
    font-weight: $typography-fontWeight-semibold;
  }
}

.button-grid {
  display: flex;
  gap: $spacing-md;
  flex-wrap: wrap;
  align-items: center;
}
```

---

## 🔧 Step 7: Install Dependencies and Build

### 7.1 Install all dependencies
```bash
cd ../../ # back to root
npm install
```

### 7.2 Build design tokens first
```bash
npm run build:tokens
```

### 7.3 Build component libraries
```bash
npm run build:angular-ui
npm run build:react-ui
```

### 7.4 Install dependencies for applications
```bash
cd packages/angular-app && npm install
cd ../react-app && npm install
cd ../../
```

---

## 🚀 Step 8: Run and Test

### 8.1 Test Angular UI Storybook
```bash
npm run storybook:angular
# Opens at http://localhost:6006
```

### 8.2 Test React UI Storybook
```bash
npm run storybook:react
# Opens at http://localhost:6006
```

### 8.3 Test Angular Application
```bash
npm run dev:angular-app
# Opens at http://localhost:4200
```

### 8.4 Test React Application
```bash
npm run dev:react-app
# Opens at http://localhost:3000
```

---

## 📝 Development Workflow

### Daily Development Commands
```bash
# Start design tokens in watch mode
npm run build:tokens -- --watch

# Develop Angular components
npm run storybook:angular

# Develop React components  
npm run storybook:react

# Test Angular app
npm run dev:angular-app

# Test React app
npm run dev:react-app

# Build everything
npm run build:tokens && npm run build:angular-ui && npm run build:react-ui
```

### Adding New Components
1. **Design Tokens**: Add to `packages/design-tokens/src/tokens/`
2. **Angular**: Use `ng generate component` in `packages/angular-ui`
3. **React**: Create in `packages/react-ui/src/ComponentName/`
4. **Stories**: Add `.stories.ts/.tsx` files for Storybook
5. **Export**: Update `src/index.ts` files in libraries

---

## ✅ Final Verification Checklist

- [ ] Root package.json configured with workspaces
- [ ] Design tokens build and generate SCSS/CSS/JS
- [ ] Angular UI library builds successfully
- [ ] React UI library builds successfully  
- [ ] Angular Storybook runs with components
- [ ] React Storybook runs with components
- [ ] Angular app runs and displays components
- [ ] React app runs and displays components
- [ ] Shared styling works across all packages
- [ ] TypeScript compilation works everywhere

🎉 **Congratulations!** You now have a complete monorepo with shared design tokens, component libraries, and demo applications for both Angular and React!
