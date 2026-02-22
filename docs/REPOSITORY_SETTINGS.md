# Repository Settings Checklist

These settings must be configured in GitHub UI (not versioned in git) to match workflow expectations.

## Branch Protection

Protect the following branches/patterns:

- `main`
- `next`
- `beta`
- `alpha/*`
- `rc/*`

Recommended rules:

- Require pull request before merging
- Require status checks to pass
- Require branches to be up to date before merging
- Restrict who can push directly

## Required Checks

Set required checks to include at least:

- `Workflow Lint`
- `Install Dependencies`
- `Security & Dependency Checks`
- `Quality Checks`
- `Markdown Lint`
- `Build Packages`
- `Smoke Package Install`
- `Tarball Integrity`
- `Runtime Smoke`
- `Changeset Policy` (PRs)
- `Changeset Status` (PRs)

## Auto-Merge

Enable repository setting:

- Allow auto-merge

This is required for release PR auto-merge in `.github/workflows/release.yml`.

## Labels

Create and use this label:

- `no-release`: required when using an empty changeset.

## GitHub Pages

For Storybook deployment workflow:

- Pages source: GitHub Actions
- Environment: `github-pages`
