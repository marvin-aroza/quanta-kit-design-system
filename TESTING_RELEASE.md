# Testing the Release Pipeline

## Setup for Testing

The release pipeline has been configured to use the `monorepo-release` branch for testing instead of `main`.

## Testing Steps

### 1. Create the Test Branch

```bash
# Create and switch to the test branch
git checkout -b monorepo-release

# Push to create the remote branch
git push origin monorepo-release
```

### 2. Test the Release Process

#### Create a Test Changeset

```bash
# Create a changeset for testing
npm run changeset
```

- Select one or more packages to test
- Choose "patch" for testing
- Write a test description like "test: initial release pipeline test"

#### Commit and Push

```bash
git add .
git commit -m "test: setup release pipeline test"
git push origin monorepo-release
```

### 3. Monitor the GitHub Actions

Once pushed to `monorepo-release`, check:

1. Go to your GitHub repository
2. Click on "Actions" tab
3. Look for "Release Pipeline" workflow
4. Monitor the progress of:
   - ✅ Test and Build
   - ✅ Release NPM Packages (if NPM_TOKEN is configured)
   - ✅ Deploy Storybooks
   - ✅ Deploy Documentation Sites

### 4. Check Test Deployments

After successful pipeline run:

#### GitHub Pages (Storybooks)

- Go to repository Settings → Pages
- Should see deployment from `gh-pages` branch
- Access at: `https://[username].github.io/quanta-kit-design-system/`

#### GitHub Pages (Documentation)

- Should see deployment from `gh-pages-test` branch
- Access documentation sites

#### NPM Packages (if token configured)

- Check if test versions were published to NPM
- Packages will have version bumps from changeset

### 5. Testing Different Scenarios

#### Test 1: Build and Deploy Only

- Push code without NPM_TOKEN secret
- Should build and deploy sites only
- NPM publish step should be skipped

#### Test 2: Full Release Pipeline

- Add NPM_TOKEN secret to repository
- Should publish packages and deploy sites

#### Test 3: PR Testing

- Create PR against `monorepo-release` branch
- Should run tests but not deploy/publish

## Switching to Production

Once testing is complete and working:

### 1. Update Workflow

```bash
# Update .github/workflows/release.yml
# Change all "monorepo-release" back to "main"

# Update .changeset/config.json
# Change baseBranch back to "main"
```

### 2. Update Documentation

```bash
# Update RELEASE_PROCESS.md
# Change branch references back to "main"
```

### 3. Merge to Main

```bash
# Merge test branch to main
git checkout main
git merge monorepo-release
git push origin main
```

## Troubleshooting Test Issues

### GitHub Actions Not Running

- Check branch name matches exactly: `monorepo-release`
- Ensure workflow file is in `.github/workflows/`
- Check repository permissions for Actions

### NPM Publish Fails

- NPM_TOKEN not configured (expected for testing)
- Package names already exist on NPM
- Network or permission issues

### GitHub Pages Deploy Fails

- Check Pages is enabled in repository settings
- Verify branch `gh-pages` and `gh-pages-test` exist
- Check GITHUB_TOKEN permissions

### Build Failures

- Run `npm run build` locally first
- Check all package dependencies are installed
- Verify Storybook configurations

## Test Cleanup

After testing, you can:

1. Delete test branches: `gh-pages-test`
2. Remove test NPM package versions (if published)
3. Keep `monorepo-release` branch for future testing

## Next Steps

Once testing passes:

1. Configure production NPM_TOKEN
2. Update workflow to use `main` branch
3. Setup production GitHub Pages
4. Document final release process
