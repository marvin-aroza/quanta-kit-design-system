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
- `actionlint`

## Release Environment And Secrets

Create a protected environment for manual real publishes:

- Environment name: `npm-release`
- Add required reviewers for approvals
- Restrict deployment branches to `main` (recommended)

Required secret:

- `NPM_TOKEN`: npm token with publish permissions for all target packages

## Labels

Create and use this label:

- `no-release`: required when using an empty changeset.
