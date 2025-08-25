# Build Issue Resolution

## Problem

GitHub Actions pipeline was failing with Angular build error:

```
Node.js version v18.20.8 detected.
The Angular CLI requires a minimum Node.js version of v20.19 or v22.12.
```

## Solution ✅

Updated GitHub Actions workflow (`.github/workflows/release.yml`) to use Node.js version 20 instead of 18:

### Changes Made:

- **Test job**: Updated from `node-version: 18` → `node-version: 20`
- **Release job**: Updated from `node-version: 18` → `node-version: 20`
- **Deploy Storybooks job**: Updated from `node-version: 18` → `node-version: 20`
- **Deploy Docs job**: Updated from `node-version: 18` → `node-version: 20`

## Verification ✅

Local build test confirms all packages build successfully:

- ✅ Angular package builds
- ✅ Vue package builds
- ✅ React package builds
- ✅ Vue docs app builds
- ✅ Angular docs app builds
- ⚠️ React docs app (temporarily disabled - separate issue)

## Ready for Testing

The pipeline should now work correctly with the `monorepo-release` branch setup.

### Next Steps:

1. Push changes to the `monorepo-release` branch
2. GitHub Actions will run with Node.js 20
3. Angular CLI compatibility issue should be resolved
4. All builds should complete successfully

### Expected Results:

- All tests pass
- All packages build successfully
- Storybooks deploy to GitHub Pages
- Documentation sites deploy to GitHub Pages
- NPM packages ready for publishing (when token is configured)

## Note on React Docs

The React docs build is temporarily disabled due to Next.js/React compatibility issues. This is a separate issue and doesn't affect:

- React component library build (✅ working)
- React Storybook build (✅ working)
- Other framework builds (✅ working)
