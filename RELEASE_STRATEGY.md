# Release Strategy for Quanta Kit Design System

## 1. NPM Package Releases

### Setup Required:
1. **Changesets** for version management
2. **GitHub Actions** for automated publishing
3. **NPM tokens** for authentication

### Implementation:

#### Install Changesets
```bash
npm install @changesets/cli --save-dev
npx changeset init
```

#### Add to package.json scripts:
```json
{
  "scripts": {
    "changeset": "changeset",
    "version-packages": "changeset version",
    "release": "changeset publish"
  }
}
```

#### Workflow:
1. Developer creates changeset: `npm run changeset`
2. Describes changes and impact (patch/minor/major)
3. PR is created with version bumps
4. On merge to main, packages are automatically published to NPM

## 2. Documentation Sites (GitHub Pages)

### Setup for 3 docs sites:
- **React Docs**: `quanta-kit-react-docs`
- **Vue Docs**: `quanta-kit-vue-docs` 
- **Angular Docs**: `quanta-kit-angular-docs`

#### GitHub Pages deployment strategy:
1. **Separate repositories** for each docs site, OR
2. **GitHub Pages with multiple deployments** from monorepo

### Recommended: Separate repositories approach
- Fork/create new repos: 
  - `quanta-kit-react-docs-site`
  - `quanta-kit-vue-docs-site`
  - `quanta-kit-angular-docs-site`

## 3. Storybook Sites (GitHub Pages)

### Setup for 3 Storybook sites:
- **React Storybook**: `quanta-kit-react` 
- **Vue Storybook**: `quanta-kit-vue`
- **Angular Storybook**: `quanta-kit-angular`

#### Deployment options:
1. **Chromatic** (recommended for Storybook)
2. **GitHub Pages** with static builds
3. **Netlify/Vercel** for each framework

## 4. Recommended GitHub Actions Workflow

### File: `.github/workflows/release.yml`
```yaml
name: Release Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  # Test and Build
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm run check-types

  # Release NPM packages
  release:
    if: github.ref == 'refs/heads/main'
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - name: Create Release Pull Request or Publish
        uses: changesets/action@v1
        with:
          publish: npm run release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

  # Deploy Storybooks
  deploy-storybooks:
    if: github.ref == 'refs/heads/main'
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'
      - run: npm ci
      - run: npm run build-storybook
      - name: Deploy React Storybook
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./packages/quanta-kit-react/storybook-static
          destination_dir: react
      - name: Deploy Vue Storybook
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./packages/quanta-kit-vue/storybook-static
          destination_dir: vue
      - name: Deploy Angular Storybook
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./packages/quanta-kit-angular/storybook-static
          destination_dir: angular

  # Deploy Documentation Sites
  deploy-docs:
    if: github.ref == 'refs/heads/main'
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      # Build docs apps
      - run: cd apps/quanta-kit-react-docs && npm run build
      - run: cd apps/quanta-kit-vue-docs && npm run build  
      - run: cd apps/quanta-kit-angular-docs && npm run build
      # Deploy to GitHub Pages (multiple sites)
      - name: Deploy React Docs
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./apps/quanta-kit-react-docs/out
          destination_dir: docs/react
      # Add Vue and Angular deployments similarly
```

## 5. Manual Release Process

### For NPM packages:
1. `npm run changeset` - Create changeset
2. Commit and push changes
3. Automated release on merge to main

### For documentation/Storybook:
1. Automatic deployment on push to main
2. Manual trigger available via GitHub Actions

## 6. URLs Structure

After setup, your sites will be available at:

### NPM Packages:
- `npm install quanta-kit-react`
- `npm install quanta-kit-vue` 
- `npm install quanta-kit-angular`

### GitHub Pages:
- **React Storybook**: `https://[username].github.io/quanta-kit-design-system/react/`
- **Vue Storybook**: `https://[username].github.io/quanta-kit-design-system/vue/`
- **Angular Storybook**: `https://[username].github.io/quanta-kit-design-system/angular/`
- **React Docs**: `https://[username].github.io/quanta-kit-design-system/docs/react/`
- **Vue Docs**: `https://[username].github.io/quanta-kit-design-system/docs/vue/`
- **Angular Docs**: `https://[username].github.io/quanta-kit-design-system/docs/angular/`

## 7. Required Secrets

Add these to GitHub repository secrets:
- `NPM_TOKEN` - For publishing to NPM
- `GITHUB_TOKEN` - Auto-provided for GitHub Pages

## 8. Branch Strategy

- **main** - Production releases
- **develop** - Development branch
- **feature/** - Feature branches
- **release/** - Release preparation branches
