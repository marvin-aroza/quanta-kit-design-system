# Quanta Kit Design System - Release Process

## Overview

This monorepo contains three component libraries and their documentation sites:

### NPM Packages

- `quanta-kit-react` - React component library
- `quanta-kit-vue` - Vue component library
- `quanta-kit-angular` - Angular component library

### Documentation Sites

- React docs app (Next.js)
- Vue docs app (Vue CLI)
- Angular docs app (Angular CLI)

### Storybook Sites

- React Storybook
- Vue Storybook
- Angular Storybook

## Release Process

### 1. Creating a Release

#### Step 1: Create a Changeset

```bash
npm run changeset
```

- Select which packages changed
- Choose the type of change (patch/minor/major)
- Write a description of the changes

#### Step 2: Commit and Push

```bash
git add .
git commit -m "feat: add new feature to components"
git push origin your-branch
```

#### Step 3: Create Pull Request

- Create PR to `monorepo-release` branch (for testing)
- GitHub Actions will run tests and builds
- Once approved and merged, release process starts automatically

### 2. Automated Release Pipeline

When code is merged to `monorepo-release` branch:

1. **Testing & Building**
   - Runs lint, type-check, and build for all packages
   - Builds all Storybooks
   - Ensures everything compiles correctly

2. **NPM Publishing**
   - Changesets automatically creates version bumps
   - Publishes packages to NPM registry
   - Creates GitHub releases with changelogs

3. **Documentation Deployment**
   - Deploys Storybooks to GitHub Pages
   - Deploys documentation sites to GitHub Pages
   - Updates live documentation automatically

### 3. Access Released Content

#### NPM Packages

Install the packages in your projects:

```bash
npm install quanta-kit-react
npm install quanta-kit-vue
npm install quanta-kit-angular
```

#### GitHub Pages Sites

After deployment, access documentation at:

- **Storybooks**: `https://[username].github.io/quanta-kit-design-system/`
- **Documentation**: `https://[username].github.io/quanta-kit-design-system/` (separate branch)

## Manual Release Commands

### Version and Publish Packages

```bash
# Preview version changes
npm run version-packages

# Publish to NPM (usually done by CI)
npm run release
```

### Build Documentation

```bash
# Build all Storybooks
npm run build-storybook

# Build all docs apps
npm run build
```

## Development Workflow

### Local Development

```bash
# Start all dev servers
npm run dev

# Access apps at:
# React docs: http://localhost:3000
# Vue docs: http://localhost:8081
# Angular docs: http://localhost:4201
```

### Testing

```bash
# Run linting
npm run lint

# Type checking
npm run check-types

# Build everything
npm run build
```

## Release Branches

- `monorepo-release` - Test branch for release pipeline testing
- `main` - Production releases (will be updated after testing)
- `develop` - Development branch for new features
- `feature/*` - Feature development branches

## GitHub Secrets Required

Add these secrets to your GitHub repository:

- `NPM_TOKEN` - NPM authentication token for publishing packages
- `GITHUB_TOKEN` - Automatically provided by GitHub for Pages deployment

## Package Versioning

This project uses [Changesets](https://github.com/changesets/changesets) for version management:

- **Patch** (0.0.X) - Bug fixes, small changes
- **Minor** (0.X.0) - New features, backwards compatible
- **Major** (X.0.0) - Breaking changes

## Troubleshooting

### NPM Publish Fails

- Check NPM_TOKEN is valid and has publish permissions
- Ensure package names are available on NPM registry
- Verify package.json files have correct metadata

### GitHub Pages Deploy Fails

- Check GitHub Pages is enabled in repository settings
- Verify GITHUB_TOKEN permissions include Pages write access
- Ensure build outputs are in expected directories

### Storybook Build Fails

- Run `npm run build-storybook` locally to debug
- Check Storybook configurations in each package
- Verify all stories compile correctly

## Support

For issues with the release process:

1. Check GitHub Actions logs for detailed error messages
2. Verify all required secrets are configured
3. Test builds locally before pushing to main
4. Review changeset files for proper formatting
