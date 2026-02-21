# Release Policy

## Scope

This repository publishes three independent packages:

- `quanta-kit-design-system-react`
- `quanta-kit-design-system-vue`
- `quanta-kit-design-system-angular`

## Channels and Dist-Tags

- `main` branch: stable releases, npm tag `latest`
- `next` branch: prerelease snapshots, npm tag `next`
- `beta` branch: prerelease snapshots, npm tag `beta`
- `alpha/*` branches: prerelease snapshots, npm tag `alpha`
- `rc/*` branches: prerelease snapshots, npm tag `rc`
- manual dispatch: supports `stable`, `next`, `beta`, `alpha`, `rc`, `canary`
- package tag push:
  - `quanta-kit-design-system-react@<version>`
  - `quanta-kit-design-system-vue@<version>`
  - `quanta-kit-design-system-angular@<version>`
  - publishes only the tagged package, with dist-tag inferred from version suffix

## Workflow Mapping

- CI checks: `.github/workflows/ci.yml`
- Package publishing: `.github/workflows/release.yml`
- Storybook deployment: `.github/workflows/deploy-storybook.yml`
- Release simulation: `.github/workflows/release-dry-run.yml`

## Changesets PR Auto-Merge

The stable release workflow enables auto-merge for the Changesets version PR.
To make this work, repository settings must allow auto-merge on pull requests.
If branch protection requires approvals from specific reviewers, the bot PR will
still wait for those requirements unless you explicitly relax them.

## Trusted Publishing Readiness

Release jobs request `id-token: write` and publish with `--provenance`.
To use full npm trusted publishing (no `NPM_TOKEN` secret), configure npm
Trusted Publisher for this repository and workflow in npm settings.

## Changeset Rules

- Normal package changes must include a non-empty changeset.
- Non-release changes may use an empty changeset when PR policy requires one.

## Commands

Stable:

```bash
npm run release
```

Prerelease snapshots:

```bash
npm run release:next
npm run release:beta
npm run release:alpha
npm run release:rc
npm run release:canary
```

Tag-triggered single-package publish:

```bash
git tag quanta-kit-design-system-react@1.2.3
git push origin quanta-kit-design-system-react@1.2.3
```

Create all current package tags from local versions:

```bash
# preview tags only
npm run release:tags

# create and push tags
npm run release:tags:push
```

Pre mode (optional coordinated prerelease train):

```bash
npm run changeset:pre:enter:alpha
npm run changeset:pre:enter:beta
npm run changeset:pre:enter:next
npm run changeset:pre:enter:rc
npm run changeset:pre:exit
```

## Recovery

Rollback procedures are documented in `docs/ROLLBACK.md`.
