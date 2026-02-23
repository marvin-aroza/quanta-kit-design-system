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

The following are the npm package names for installation/imports. The corresponding repository directories are shown in parentheses:

- `quanta-kit-design-system-react` -> `packages/quanta-kit-react`
- `quanta-kit-design-system-vue` -> `packages/quanta-kit-vue`
- `quanta-kit-design-system-angular` -> `packages/quanta-kit-angular`

## Apps

- `quanta-kit-react-docs` (Next.js)
- `quanta-kit-vue-docs` (Vite)
- `quanta-kit-angular-docs` (Angular CLI)

## Prerequisites

- Node.js `>=20.19`
- npm `11.x`

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
npm run validate

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

- Changesets is the versioning source of truth.
- Merging to `main` creates/updates a version PR from pending changesets.
- Merging the version PR generates package tags (no automatic npm publish).
- npm publishing is manual from selected tag via `.github/workflows/release.yml`.
- Full operator runbook: `docs/RELEASE_PROCESS.md`.

## Changeset Authoring

```bash
# create changeset for package-impacting changes
npm run changeset

# version packages from changesets
npm run version-packages
```

## Notes

- Lint scripts run ESLint. Use `npm run lint:fix` for auto-fixes where enabled.
- Docs apps consume local workspace packages during development.
- Contributor workflow docs: `docs/WORKFLOW.md`
- Architecture and boundaries: `docs/ARCHITECTURE.md`
- Release rollback runbook: `docs/ROLLBACK.md`
- Repository settings checklist: `docs/REPOSITORY_SETTINGS.md`
- Automated dependency update policy: `.github/dependabot.yml`
