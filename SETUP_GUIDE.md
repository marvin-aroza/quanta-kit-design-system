# Quanta Kit Monorepo Setup Guide

A comprehensive step-by-step guide to create a monorepo with shared design tokens and UI component libraries for both Angular and React frameworks.

## 📋 Prerequisites

- **Node.js** 18+ installed
- **npm** 8+ installed
- **Git** installed
- Code editor (VS Code recommended)

## 🏗️ Project Structure Overview

```
my-design-system/
├── packages/
│   ├── design-tokens/       # Shared JSON-based design tokens
│   ├── angular-ui/         # Angular component library
│   └── react-ui/           # React component library
├── package.json            # Root workspace configuration
├── tsconfig.json          # Root TypeScript configuration
└── README.md              # Project documentation
```

## 🚀 Step-by-Step Setup

### Step 1: Initialize Root Project

```bash
# Create project directory
mkdir my-design-system
cd my-design-system

# Initialize Git repository
git init

# Create root package.json
npm init -y
```

### Step 2: Configure Root package.json

Replace the generated `package.json` with:

```json
{
  "name": "my-design-system-monorepo",
  "version": "1.0.0",
  "description": "Monorepo for Design System UI components with shared design tokens",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "npm run build --workspaces",
    "test": "npm run test --workspaces",
    "lint": "npm run lint --workspaces",
    "dev": "npm run dev --workspaces",
    "storybook": "npm run storybook --workspaces",
    "build-storybook": "npm run build-storybook --workspaces",
    "build:tokens": "npm run build --workspace=packages/design-tokens",
    "build:angular": "npm run build --workspace=packages/angular-ui",
    "build:react": "npm run build --workspace=packages/react-ui",
    "dev:angular": "npm run dev --workspace=packages/angular-ui",
    "dev:react": "npm run dev --workspace=packages/react-ui",
    "storybook:angular": "npm run storybook --workspace=packages/angular-ui",
    "storybook:react": "npm run storybook --workspace=packages/react-ui"
  },
  "devDependencies": {
    "@commitlint/cli": "^19.0.0",
    "@commitlint/config-conventional": "^19.0.0",
    "husky": "^9.0.0",
    "lerna": "^8.0.0",
    "prettier": "^3.0.0"
  },
  "keywords": [
    "ui-kit",
    "design-system",
    "angular",
    "react",
    "design-tokens",
    "monorepo"
  ],
  "author": "Your Name",
  "license": "MIT"
}
```

### Step 3: Create Root TypeScript Configuration

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "useDefineForClassFields": false,
    "lib": [
      "ES2022",
      "dom"
    ]
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
```

### Step 4: Create Design Tokens Package

```bash
# Create design tokens package
mkdir -p packages/design-tokens/tokens
mkdir -p packages/design-tokens/src
```

#### 4.1: Design Tokens package.json

Create `packages/design-tokens/package.json`:

```json
{
  "name": "@my-design-system/design-tokens",
  "version": "1.0.0",
  "description": "Design tokens for My Design System UI components",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "node build.js && rollup -c",
    "dev": "node build.js --watch",
    "clean": "rimraf dist"
  },
  "files": [
    "dist"
  ],
  "devDependencies": {
    "@rollup/plugin-typescript": "^11.0.0",
    "rimraf": "^5.0.0",
    "rollup": "^4.0.0",
    "typescript": "^5.0.0"
  },
  "keywords": [
    "design-tokens",
    "design-system"
  ]
}
```

#### 4.2: Create Token Files

Create `packages/design-tokens/tokens/colors.json`:

```json
{
  "color": {
    "primary": {
      "50": { "value": "#f0f9ff" },
      "100": { "value": "#e0f2fe" },
      "200": { "value": "#bae6fd" },
      "300": { "value": "#7dd3fc" },
      "400": { "value": "#38bdf8" },
      "500": { "value": "#0ea5e9" },
      "600": { "value": "#0284c7" },
      "700": { "value": "#0369a1" },
      "800": { "value": "#075985" },
      "900": { "value": "#0c4a6e" }
    },
    "secondary": {
      "50": { "value": "#f8fafc" },
      "100": { "value": "#f1f5f9" },
      "200": { "value": "#e2e8f0" },
      "300": { "value": "#cbd5e1" },
      "400": { "value": "#94a3b8" },
      "500": { "value": "#64748b" },
      "600": { "value": "#475569" },
      "700": { "value": "#334155" },
      "800": { "value": "#1e293b" },
      "900": { "value": "#0f172a" }
    },
    "success": {
      "50": { "value": "#f0fdf4" },
      "500": { "value": "#22c55e" },
      "600": { "value": "#16a34a" }
    },
    "warning": {
      "50": { "value": "#fefce8" },
      "500": { "value": "#eab308" },
      "600": { "value": "#ca8a04" }
    },
    "error": {
      "50": { "value": "#fef2f2" },
      "500": { "value": "#ef4444" },
      "600": { "value": "#dc2626" }
    },
    "neutral": {
      "white": { "value": "#ffffff" },
      "black": { "value": "#000000" }
    }
  }
}
```

Create `packages/design-tokens/tokens/typography.json`:

```json
{
  "typography": {
    "fontFamily": {
      "sans": { "value": ["Inter", "ui-sans-serif", "system-ui", "sans-serif"] },
      "serif": { "value": ["ui-serif", "Georgia", "Cambria", "serif"] },
      "mono": { "value": ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"] }
    },
    "fontSize": {
      "xs": { "value": "0.75rem" },
      "sm": { "value": "0.875rem" },
      "base": { "value": "1rem" },
      "lg": { "value": "1.125rem" },
      "xl": { "value": "1.25rem" },
      "2xl": { "value": "1.5rem" },
      "3xl": { "value": "1.875rem" }
    },
    "fontWeight": {
      "normal": { "value": "400" },
      "medium": { "value": "500" },
      "semibold": { "value": "600" },
      "bold": { "value": "700" }
    }
  }
}
```

Create `packages/design-tokens/tokens/spacing.json`:

```json
{
  "spacing": {
    "1": { "value": "0.25rem" },
    "2": { "value": "0.5rem" },
    "3": { "value": "0.75rem" },
    "4": { "value": "1rem" },
    "6": { "value": "1.5rem" },
    "8": { "value": "2rem" },
    "12": { "value": "3rem" },
    "16": { "value": "4rem" }
  },
  "borderRadius": {
    "sm": { "value": "0.125rem" },
    "base": { "value": "0.25rem" },
    "md": { "value": "0.375rem" },
    "lg": { "value": "0.5rem" },
    "full": { "value": "9999px" }
  }
}
```

#### 4.3: Create Build Script

Create `packages/design-tokens/build.js`:

```javascript
const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Read all token files
const tokensDir = 'tokens';
const tokens = {};

const files = fs.readdirSync(tokensDir);
for (const file of files) {
  if (file.endsWith('.json')) {
    const content = JSON.parse(fs.readFileSync(path.join(tokensDir, file), 'utf-8'));
    Object.assign(tokens, content);
  }
}

// Generate SCSS variables
let scssContent = '';
function generateScssVars(obj, prefix = '') {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value.value === undefined) {
      generateScssVars(value, prefix ? `${prefix}-${key}` : key);
    } else if (value.value !== undefined) {
      const varName = prefix ? `${prefix}-${key}` : key;
      const cssVarName = varName.replace(/\./g, '-');
      if (Array.isArray(value.value)) {
        scssContent += `$${cssVarName}: ${value.value.map(v => `'${v}'`).join(', ')};\n`;
      } else {
        scssContent += `$${cssVarName}: ${value.value};\n`;
      }
    }
  }
}

generateScssVars(tokens);
fs.writeFileSync('dist/_variables.scss', scssContent);

// Generate CSS custom properties
let cssContent = ':root {\n';
function generateCssVars(obj, prefix = '') {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value.value === undefined) {
      generateCssVars(value, prefix ? `${prefix}-${key}` : key);
    } else if (value.value !== undefined) {
      const varName = prefix ? `${prefix}-${key}` : key;
      const cssVarName = varName.replace(/\./g, '-');
      if (Array.isArray(value.value)) {
        cssContent += `  --${cssVarName}: ${value.value.map(v => `'${v}'`).join(', ')};\n`;
      } else {
        cssContent += `  --${cssVarName}: ${value.value};\n`;
      }
    }
  }
}

generateCssVars(tokens);
cssContent += '}\n';
fs.writeFileSync('dist/variables.css', cssContent);

// Generate JavaScript tokens
function generateJsTokens(obj) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value.value === undefined) {
      result[key] = generateJsTokens(value);
    } else if (value.value !== undefined) {
      result[key] = value.value;
    }
  }
  return result;
}

const jsTokens = generateJsTokens(tokens);
const jsContent = `export const tokens = ${JSON.stringify(jsTokens, null, 2)};`;
fs.writeFileSync('dist/tokens.js', jsContent);

// Generate JSON
fs.writeFileSync('dist/tokens.json', JSON.stringify(jsTokens, null, 2));

console.log('Design tokens built successfully!');
```

#### 4.4: Rollup Configuration

Create `packages/design-tokens/rollup.config.js`:

```javascript
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named'
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    typescript({
      declaration: true,
      declarationDir: 'dist',
      rootDir: 'src'
    })
  ],
  external: []
};
```

#### 4.5: TypeScript Entry Point

Create `packages/design-tokens/src/index.ts`:

```typescript
// Re-export tokens from generated files
export * from '../dist/tokens.js';

// Type definitions for design tokens
export interface ColorToken {
  value: string;
}

export interface TypographyToken {
  value: string | string[];
}

export interface SpacingToken {
  value: string;
}

export interface DesignTokens {
  color: {
    primary: Record<string, ColorToken>;
    secondary: Record<string, ColorToken>;
    success: Record<string, ColorToken>;
    warning: Record<string, ColorToken>;
    error: Record<string, ColorToken>;
    neutral: Record<string, ColorToken>;
  };
  typography: {
    fontFamily: Record<string, TypographyToken>;
    fontSize: Record<string, TypographyToken>;
    fontWeight: Record<string, TypographyToken>;
  };
  spacing: Record<string, SpacingToken>;
  borderRadius: Record<string, SpacingToken>;
}
```

Create `packages/design-tokens/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Step 5: Create React UI Package

```bash
mkdir -p packages/react-ui/src
```

#### 5.1: React UI package.json

Create `packages/react-ui/package.json`:

```json
{
  "name": "@my-design-system/react-ui",
  "version": "1.0.0",
  "description": "React UI components for My Design System",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c --watch",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src --ext .ts,.tsx",
    "storybook": "storybook dev -p 6007",
    "build-storybook": "storybook build"
  },
  "dependencies": {
    "@my-design-system/design-tokens": "file:../design-tokens"
  },
  "devDependencies": {
    "@rollup/plugin-commonjs": "^25.0.0",
    "@rollup/plugin-node-resolve": "^15.0.0",
    "@rollup/plugin-typescript": "^11.0.0",
    "@storybook/addon-essentials": "^8.0.0",
    "@storybook/blocks": "^8.0.0",
    "@storybook/react": "^8.0.0",
    "@storybook/react-vite": "^8.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/react": "^14.0.0",
    "@types/jest": "^29.0.0",
    "@types/react": "^18.0.0",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "@typescript-eslint/parser": "^7.0.0",
    "eslint": "^8.0.0",
    "eslint-plugin-react": "^7.0.0",
    "jest": "^29.0.0",
    "jest-environment-jsdom": "^29.0.0",
    "rollup": "^4.0.0",
    "rollup-plugin-postcss": "^4.0.0",
    "sass": "^1.70.0",
    "storybook": "^8.0.0",
    "ts-jest": "^29.0.0",
    "typescript": "^5.0.0"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "files": [
    "dist"
  ]
}
```

#### 5.2: React Button Component

Create `packages/react-ui/src/Button.tsx`:

```tsx
import React from 'react';
import './Button.scss';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  onClick,
  children,
  ...props
}) => {
  const buttonClasses = [
    'ds-button',
    `ds-button--${variant}`,
    `ds-button--${size}`,
    disabled ? 'ds-button--disabled' : ''
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
```

Create `packages/react-ui/src/Button.scss`:

```scss
.ds-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.375rem;
  font-family: system-ui, sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: 2px solid #0ea5e9;
    outline-offset: 2px;
  }

  &--primary {
    background-color: #0ea5e9;
    color: #ffffff;

    &:hover:not(:disabled) {
      background-color: #0284c7;
    }
  }

  &--secondary {
    background-color: #f1f5f9;
    color: #0f172a;
    border: 1px solid #cbd5e1;

    &:hover:not(:disabled) {
      background-color: #e2e8f0;
    }
  }

  &--success {
    background-color: #22c55e;
    color: #ffffff;

    &:hover:not(:disabled) {
      background-color: #16a34a;
    }
  }

  &--warning {
    background-color: #eab308;
    color: #ffffff;

    &:hover:not(:disabled) {
      background-color: #ca8a04;
    }
  }

  &--error {
    background-color: #ef4444;
    color: #ffffff;

    &:hover:not(:disabled) {
      background-color: #dc2626;
    }
  }

  &--sm {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }

  &--md {
    padding: 0.75rem 1rem;
    font-size: 1rem;
  }

  &--lg {
    padding: 1rem 1.5rem;
    font-size: 1.125rem;
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

Create `packages/react-ui/src/index.ts`:

```typescript
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

#### 5.3: React UI Configuration Files

Create `packages/react-ui/rollup.config.js`:

```javascript
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    resolve({
      browser: true
    }),
    commonjs(),
    typescript({
      declaration: true,
      declarationDir: 'dist',
      rootDir: 'src'
    }),
    postcss({
      extract: true,
      minimize: true
    })
  ],
  external: ['react', 'react-dom']
};
```

Create `packages/react-ui/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "**/*.test.tsx", "**/*.stories.tsx"]
}
```

### Step 6: Create Angular UI Package

```bash
mkdir -p packages/angular-ui/src/lib/button
```

#### 6.1: Angular UI package.json

Create `packages/angular-ui/package.json`:

```json
{
  "name": "@my-design-system/angular-ui",
  "version": "1.0.0",
  "description": "Angular UI components for My Design System",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "ng build",
    "dev": "ng serve",
    "test": "ng test --watch=false --browsers=ChromeHeadless",
    "test:watch": "ng test",
    "lint": "ng lint",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "dependencies": {
    "@angular/animations": "^18.0.0",
    "@angular/common": "^18.0.0",
    "@angular/core": "^18.0.0",
    "@angular/platform-browser": "^18.0.0",
    "@my-design-system/design-tokens": "file:../design-tokens",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.14.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^18.0.0",
    "@angular/cli": "^18.0.0",
    "@angular/compiler": "^18.0.0",
    "@angular/compiler-cli": "^18.0.0",
    "@storybook/addon-essentials": "^8.0.0",
    "@storybook/angular": "^8.0.0",
    "@storybook/blocks": "^8.0.0",
    "@types/jasmine": "~5.1.0",
    "@types/node": "^18.18.0",
    "jasmine-core": "~5.1.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "ng-packagr": "^18.0.0",
    "storybook": "^8.0.0",
    "typescript": "~5.4.0"
  },
  "peerDependencies": {
    "@angular/common": "^18.0.0",
    "@angular/core": "^18.0.0"
  },
  "files": ["dist"]
}
```

#### 6.2: Angular Configuration Files

Create `packages/angular-ui/angular.json`:

```json
{
  "$schema": "../../node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "angular-ui": {
      "projectType": "library",
      "root": "",
      "sourceRoot": "src",
      "prefix": "ds",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:ng-packagr",
          "options": {
            "project": "ng-package.json"
          },
          "configurations": {
            "production": {
              "tsConfig": "tsconfig.lib.prod.json"
            },
            "development": {
              "tsConfig": "tsconfig.lib.json"
            }
          },
          "defaultConfiguration": "production"
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "tsConfig": "tsconfig.spec.json",
            "polyfills": ["zone.js", "zone.js/testing"]
          }
        }
      }
    }
  }
}
```

Create `packages/angular-ui/ng-package.json`:

```json
{
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "../../dist/angular-ui",
  "lib": {
    "entryFile": "src/public-api.ts"
  }
}
```

#### 6.3: Angular Component Files

Create `packages/angular-ui/src/lib/button/button.component.ts`:

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ds-button',
  template: `
    <button 
      [class]="buttonClasses" 
      [disabled]="disabled"
      (click)="onClick.emit($event)"
      [type]="type">
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Output() onClick = new EventEmitter<Event>();

  get buttonClasses(): string {
    return `ds-button ds-button--${this.variant} ds-button--${this.size} ${this.disabled ? 'ds-button--disabled' : ''}`;
  }
}
```

Create `packages/angular-ui/src/lib/button/button.component.scss`:

```scss
.ds-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.375rem;
  font-family: system-ui, sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: 2px solid #0ea5e9;
    outline-offset: 2px;
  }

  &--primary {
    background-color: #0ea5e9;
    color: #ffffff;

    &:hover:not(:disabled) {
      background-color: #0284c7;
    }
  }

  &--secondary {
    background-color: #f1f5f9;
    color: #0f172a;
    border: 1px solid #cbd5e1;

    &:hover:not(:disabled) {
      background-color: #e2e8f0;
    }
  }

  &--success {
    background-color: #22c55e;
    color: #ffffff;

    &:hover:not(:disabled) {
      background-color: #16a34a;
    }
  }

  &--warning {
    background-color: #eab308;
    color: #ffffff;

    &:hover:not(:disabled) {
      background-color: #ca8a04;
    }
  }

  &--error {
    background-color: #ef4444;
    color: #ffffff;

    &:hover:not(:disabled) {
      background-color: #dc2626;
    }
  }

  &--sm {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25;
  }

  &--md {
    padding: 0.75rem 1rem;
    font-size: 1rem;
    line-height: 1.5;
  }

  &--lg {
    padding: 1rem 1.5rem;
    font-size: 1.125rem;
    line-height: 1.5;
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

Create `packages/angular-ui/src/lib/angular-ui.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [],
  exports: [
    ButtonComponent
  ]
})
export class MyDesignSystemAngularModule { }
```

Create `packages/angular-ui/src/public-api.ts`:

```typescript
/*
 * Public API Surface of angular-ui
 */

export * from './lib/angular-ui.module';
export * from './lib/button/button.component';
```

#### 6.4: Angular TypeScript Configuration

Create `packages/angular-ui/tsconfig.lib.json`:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "../../out-tsc/lib",
    "declaration": true,
    "declarationMap": true,
    "inlineSources": true,
    "skipLibCheck": true,
    "types": []
  },
  "include": ["src/**/*"],
  "exclude": [
    "src/test.ts",
    "src/**/*.spec.ts",
    "src/**/*.stories.ts"
  ]
}
```

Create `packages/angular-ui/tsconfig.lib.prod.json`:

```json
{
  "extends": "./tsconfig.lib.json",
  "compilerOptions": {
    "declarationMap": false
  },
  "angularCompilerOptions": {
    "compilationMode": "partial"
  }
}
```

Create `packages/angular-ui/tsconfig.spec.json`:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "../../out-tsc/spec",
    "skipLibCheck": true,
    "types": ["jasmine"]
  },
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.d.ts"
  ]
}
```

### Step 7: Create Additional Configuration Files

#### 7.1: Create .gitignore

```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
dist/
build/
out-tsc/

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# dotenv environment variables file
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Angular
.angular/

# Storybook build outputs
storybook-static/

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
Thumbs.db
```

#### 7.2: Create README.md

```markdown
# My Design System Monorepo

A comprehensive design system monorepo containing shared design tokens and UI component libraries for both Angular and React frameworks.

## 📦 Packages

- **@my-design-system/design-tokens** - Shared design tokens
- **@my-design-system/react-ui** - React component library
- **@my-design-system/angular-ui** - Angular component library

## 🚀 Quick Start

```bash
# Install dependencies
npm install --legacy-peer-deps

# Build design tokens
npm run build:tokens

# Build React UI
npm run build:react

# Build Angular UI
npm run build:angular
```

## 📚 Documentation

Each package contains its own documentation and examples. Use Storybook for interactive component documentation:

```bash
# React Storybook
npm run storybook:react

# Angular Storybook
npm run storybook:angular
```
```

### Step 8: Install Dependencies and Build

```bash
# Install all dependencies
npm install --legacy-peer-deps

# Build design tokens first
npm run build:tokens

# Build React UI
npm run build:react

# Install Angular dependencies and build (may need separate installation)
cd packages/angular-ui
npm install --legacy-peer-deps
cd ../..
npm run build:angular
```

### Step 9: Verification Script

Create `test-setup.js` for verification:

```javascript
// Test script to verify the monorepo setup
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Design System Monorepo...\n');

// Test design tokens
console.log('📦 Testing Design Tokens:');
try {
  const tokensPath = './packages/design-tokens/dist/tokens.json';
  const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));
  console.log('✅ Design tokens loaded successfully');
  console.log(`   - Primary color: ${tokens.color.primary['500']}`);
} catch (error) {
  console.log('❌ Design tokens failed:', error.message);
}

// Test React UI
console.log('\n⚛️  Testing React UI:');
try {
  const reactDistPath = './packages/react-ui/dist';
  const files = fs.readdirSync(reactDistPath);
  console.log('✅ React UI built successfully');
  console.log('   Files:', files.join(', '));
} catch (error) {
  console.log('❌ React UI test failed:', error.message);
}

console.log('\n🎉 Monorepo setup complete!');
```

Run verification:

```bash
node test-setup.js
```

## 🎯 What You'll Have

After following this guide, you'll have:

- ✅ **Design Tokens Package** - JSON-based tokens with SCSS, CSS, and JS exports
- ✅ **React UI Package** - Component library with TypeScript support
- ✅ **Angular UI Package** - Component library with Angular CLI integration
- ✅ **Monorepo Structure** - Workspace-based development environment
- ✅ **Build Pipeline** - Automated building for all packages
- ✅ **Type Safety** - Full TypeScript support across packages

## 🚀 Next Steps

1. **Add More Components** - Create additional UI components
2. **Set Up Storybook** - Add interactive documentation
3. **Add Testing** - Unit tests and component tests
4. **CI/CD Pipeline** - Automated testing and publishing
5. **Design Token Integration** - Connect SCSS variables properly

## 🔧 Troubleshooting

### Common Issues:

1. **Angular Dependencies**: Use `--legacy-peer-deps` flag
2. **Module Resolution**: Ensure TypeScript configurations are correct
3. **Build Errors**: Build design tokens first, then other packages
4. **Version Conflicts**: Check peer dependencies and use compatible versions

This guide provides a solid foundation for a production-ready design system monorepo that can scale with your team's needs.
