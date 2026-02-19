# Quanta Kit Design System

Multi-framework design system monorepo using Turborepo, with React, Vue, and Angular component libraries plus framework-specific docs apps.

## Workspace Layout

```text
quanta-kit-design-system/
|-- apps/
|   |-- quanta-kit-react-docs
|   |-- quanta-kit-vue-docs
|   `-- quanta-kit-angular-docs
|-- packages/
|   |-- quanta-kit-react
|   |-- quanta-kit-vue
|   `-- quanta-kit-angular
|-- .changeset/
|-- .github/workflows/
|-- package.json
`-- turbo.json
```

## Packages

- `quanta-kit-design-system-react`
- `quanta-kit-design-system-vue`
- `quanta-kit-design-system-angular`

## Apps

- `quanta-kit-react-docs` (Next.js)
- `quanta-kit-vue-docs` (Vue CLI)
- `quanta-kit-angular-docs` (Angular CLI)

## Prerequisites

- Node.js `>=18`
- npm `10.x`

## Quick Start

```bash
npm install
npm run dev
```

## Common Commands

```bash
# all workspaces
npm run build
npm run lint
npm run lint:fix
npm run check-types
npm run test

# storybook
npm run storybook
npm run build-storybook
```

## Storybook Ports

- Angular: `http://localhost:6006` (default Storybook port)
- React: `http://localhost:6007`
- Vue: `http://localhost:6008`

## Build a Single Package

```bash
turbo run build --filter=quanta-kit-design-system-react
turbo run build --filter=quanta-kit-design-system-vue
turbo run build --filter=quanta-kit-design-system-angular
```

## Versioning and Release

- Changesets is the release/versioning source of truth.
- Main release workflow: `.github/workflows/enhanced-release.yml`.
- Legacy Storybook Pages workflow is manual-only: `.github/workflows/release.yml`.
- Manual package publishing utility: `.github/workflows/publish-multi-packages.yml`.

## Development Flow

```bash
# create changeset for package-impacting changes
npm run changeset

# version packages from changesets
npm run version-packages

# publish (used by CI)
npm run release
```

## Notes

- Lint scripts are check-only. Use `npm run lint:fix` for auto-fixes.
- Docs apps consume local workspace packages during development.
