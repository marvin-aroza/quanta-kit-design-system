# Documentation Base Path Fix

## Problem

The documentation sites were having deployment issues:
- Angular docs: 404 error
- React docs: CSS not loading (broken styling)
- Vue docs: Blank page

## Root Cause
The documentation apps were not configured with the correct base paths for GitHub Pages subdirectory deployment. When deployed to `/docs/react/`, `/docs/vue/`, and `/docs/angular/`, the apps were trying to load assets from the wrong paths.

## Solution

### 1. React Docs Configuration

**File**: `apps/quanta-kit-react-docs/next.config.ts`

- Added `basePath: "/docs/react"`
- Added `assetPrefix: "/docs/react"`
- This ensures all CSS, JS, and static assets load from the correct subdirectory

### 2. Vue Docs Configuration

**File**: `apps/quanta-kit-vue-docs/vue.config.js`
- Added `publicPath: "/docs/vue/"`
- This configures Vue CLI to build assets with the correct base path

### 3. Angular Docs Configuration

**File**: `apps/quanta-kit-angular-docs/angular.json`
- Added `"baseHref": "/docs/angular/"` to production configuration
- This sets the base URL for the Angular app

### 4. Workflow Fix

**File**: `.github/workflows/release.yml`
- Updated Angular docs copy path from `dist/quanta-kit-angular-docs/*` to `dist/quanta-kit-angular-docs/browser/*`
- Angular 18+ outputs to the `browser/` subdirectory

## Verification

All builds tested and confirmed to:

- ✅ Build successfully with new configurations
- ✅ Generate assets with correct base paths
- ✅ Reference CSS, JS, and static files from correct subdirectories

## Expected Result

After deployment, the documentation sites should:

- Load correctly at their respective URLs
- Display proper styling (CSS loading correctly)
- Have all functionality working (JS loading correctly)
- Show the component examples and documentation content
