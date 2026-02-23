# Release Process

## Overview

This repository uses manual package publishing with automatic tag generation.

- Merging to `main` does not publish packages.
- Merging to `main` generates missing package tags.
- Publishing to npm is done manually from a selected git tag.

Related workflows:

- Tag generation: `.github/workflows/release-tags.yml`
- Manual publish: `.github/workflows/release.yml`
- Docs deploy (manual only): `.github/workflows/deploy-storybook.yml`

## Versioning Model

Use independent versioning per package:

- `quanta-kit-design-system-react`
- `quanta-kit-design-system-vue`
- `quanta-kit-design-system-angular`

Recommended rule:

- Bump only the package(s) that changed.
- Bump all three only when you intentionally want a coordinated release.

## What Happens On Merge To Main

When code is merged to `main`:

1. `Generate Release Tags` workflow runs.
2. It inspects package versions and creates missing tags:
   - `quanta-kit-design-system-react@<version>`
   - `quanta-kit-design-system-vue@<version>`
   - `quanta-kit-design-system-angular@<version>`
3. It pushes those tags to remote.
4. No npm publish happens in this step.

## Manual Publish Runbook

Use workflow: `Manual Package Release` (`.github/workflows/release.yml`).

Inputs:

- `release_tag`: Git tag to publish from (for example `quanta-kit-design-system-react@0.0.4`)
- `package`: `all` or one package
- `npm_tag`: npm dist-tag (`stable`, `latest`, `next`, `beta`, `alpha`, `rc`, `canary`, etc.)
- `dry_run`: `true` for validation, `false` for real publish

Behavior:

1. Validates tag exists, checks out that exact tag.
2. Installs dependencies.
3. Builds selected package(s).
4. Checks if `<name>@<version>` already exists on npm.
5. If version is missing, publishes it with selected dist-tag.
6. If version already exists, it updates/creates the selected dist-tag to point to that version.
7. If `stable` is provided, it maps to npm `latest`.

## Standard Release Flow (Recommended)

1. Merge change to `main`.
2. Wait for `Generate Release Tags` workflow to finish.
3. Open `Manual Package Release`.
4. First run with `dry_run=true`.
5. Validate output/logs.
6. Re-run with identical inputs and `dry_run=false`.
7. Verify published package/version and dist-tag on npm.

## Promote Same Version (Beta To Stable)

If a version was first published on `beta` and later needs stable:

1. Run `Manual Package Release` again with the same `release_tag`.
2. Keep `package` the same.
3. Set `npm_tag=stable` (maps to `latest`).
4. Set `dry_run=false`.

The workflow will not republish the tarball. It will promote npm dist-tags so `latest` points to that existing version.

## Pre-Merge Gate (Workflow Safety)

Before merging workflow or release-related changes:

1. Ensure CI `Workflow Lint` is green.
2. Ensure no actionlint warnings/errors remain for:
   - `.github/workflows/release.yml`
   - `.github/workflows/release-tags.yml`
   - `.github/workflows/deploy-storybook.yml`

## Operator Readiness Checklist

Before doing a real publish (`dry_run=false`):

- [ ] `npm-release` environment exists in GitHub.
- [ ] `npm-release` has required reviewers configured.
- [ ] `NPM_TOKEN` secret exists and has publish rights.
- [ ] Branch protection prevents direct unreviewed pushes to `main`.
- [ ] Selected release tag is from `main` history.

## Quick Check Commands

Verify dist-tags:

```bash
npm view quanta-kit-design-system-react dist-tags --json
npm view quanta-kit-design-system-vue dist-tags --json
npm view quanta-kit-design-system-angular dist-tags --json
```

Verify exact package version exists:

```bash
npm view quanta-kit-design-system-react@0.0.4 version
npm view quanta-kit-design-system-vue@0.0.4 version
npm view quanta-kit-design-system-angular@0.0.4 version
```

## Release Checklist

Use this checklist per release:

- [ ] Package version(s) bumped correctly in package `package.json`.
- [ ] Merge to `main` completed.
- [ ] `Generate Release Tags` workflow succeeded.
- [ ] Correct `release_tag` selected.
- [ ] Correct `package` selected (`all` vs single package).
- [ ] Correct `npm_tag` selected.
- [ ] Dry-run completed successfully.
- [ ] Real publish completed successfully.
- [ ] npm dist-tag verification completed.

## Troubleshooting

If publish fails:

1. Confirm selected tag exists and points to intended commit.
2. Confirm `NPM_TOKEN` secret is valid and has publish rights.
3. Confirm version in selected package is not already published.
4. Re-run with `dry_run=true` to inspect exact publish command path.
5. Check workflow logs for the failing package group section.
