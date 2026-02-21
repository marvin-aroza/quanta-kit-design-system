# Architecture

## Monorepo Structure

- `packages/quanta-kit-react`: React component library (publishable).
- `packages/quanta-kit-vue`: Vue component library (publishable).
- `packages/quanta-kit-angular`: Angular component library (publishable).
- `apps/quanta-kit-react-docs`: Next.js docs/demo app for React package.
- `apps/quanta-kit-vue-docs`: Vite docs/demo app for Vue package.
- `apps/quanta-kit-angular-docs`: Angular docs/demo app for Angular package.

## Build Orchestration

- Turborepo is the task runner for workspace-wide `build`, `lint`, `check-types`, `test`, and Storybook tasks.
- Root commands are the source of truth; avoid introducing parallel ad-hoc commands in individual READMEs.

## Release Model

- Changesets is the only versioning/release mechanism.
- PRs that affect publishable packages must include a changeset file under `.changeset/`.
- Docs-only or infra-only PRs can use an empty changeset if no package release is intended.
- Release and deployment workflows are intentionally separated:
  - CI checks: `.github/workflows/ci.yml`
  - npm publishing: `.github/workflows/release.yml`
  - Storybook publishing to GitHub Pages: `.github/workflows/deploy-storybook.yml`

## Dependency Policy

- Publishable package names:
  - `quanta-kit-design-system-react`
  - `quanta-kit-design-system-vue`
  - `quanta-kit-design-system-angular`
- Workspace apps should depend on package versions compatible with Changesets internal dependency checks.
- Keep root and workspace Node compatibility aligned with tooling constraints (`Node >= 20.19`).

## Quality Gates

- Required before merge:
  - `npm run lint`
  - `npm run check-types`
  - `npm run build`
  - `npm run changeset:status -- --since=origin/main` (PRs)
