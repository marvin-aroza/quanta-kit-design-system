# Workflow

## Local Development

1. Install dependencies:
```bash
npm install
```
2. Start workspace development:
```bash
npm run dev
```

## Pre-PR Validation

Run the full local gate:

```bash
npm run validate
```

For PR parity (includes changeset status check):

```bash
npm run validate:pr
```

## Changeset Rules

- Package-affecting changes: add a normal changeset.
- Non-release changes (docs/config/chore only): add an empty changeset when CI requires it.

## Release Channels

- Stable and prerelease channel policy is documented in `docs/RELEASE_POLICY.md`.
- Release automation is split by concern:
  - `.github/workflows/ci.yml`
  - `.github/workflows/release.yml`
  - `.github/workflows/deploy-storybook.yml`

## Testing Strategy

- Package-level tests should validate component behavior and regressions.
- Docs apps are integration/demo surfaces, not the primary correctness layer.
- Prefer adding tests close to package source (`packages/*`) rather than only in docs apps.
