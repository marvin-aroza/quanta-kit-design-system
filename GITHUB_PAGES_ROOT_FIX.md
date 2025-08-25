# GitHub Pages Deployment Fix

## Problem

The Angular Storybook was overwriting the main index page, causing the unified navigation to disappear and only showing the Angular Storybook at the root URL.

## Root Cause

- Storybooks were being deployed to the root directory, overwriting each other
- The main navigation index was created early in the process and then overwritten by subsequent deployments
- No proper subdirectory structure was maintained

## Solution

1. **Separated Deployments**: Split the deployment into three distinct jobs:
   - `deploy-storybooks`: Deploys all Storybooks to `/storybook/*` subdirectories
   - `deploy-docs`: Deploys all documentation sites to `/docs/*` subdirectories
   - `deploy-main-nav`: Deploys the main navigation index to the root (runs last)

2. **Fixed Directory Structure**:
   - Root (`/`): Main navigation index with links to all content
   - `/storybook/react/`, `/storybook/vue/`, `/storybook/angular/`: Interactive component documentation
   - `/docs/react/`, `/docs/vue/`, `/docs/angular/`: Usage examples and guides

3. **Deployment Order**:
   - Storybooks deploy first to subdirectories
   - Docs deploy second to subdirectories
   - Main navigation deploys last to preserve the root index

4. **Use `keep_files: true`**: Ensures each deployment preserves previously deployed content in other subdirectories

## Expected URLs

- Main site: `https://marvin-aroza.github.io/quanta-kit-design-system/`
- React Storybook: `https://marvin-aroza.github.io/quanta-kit-design-system/storybook/react/`
- Vue Storybook: `https://marvin-aroza.github.io/quanta-kit-design-system/storybook/vue/`
- Angular Storybook: `https://marvin-aroza.github.io/quanta-kit-design-system/storybook/angular/`
- React Docs: `https://marvin-aroza.github.io/quanta-kit-design-system/docs/react/`
- Vue Docs: `https://marvin-aroza.github.io/quanta-kit-design-system/docs/vue/`
- Angular Docs: `https://marvin-aroza.github.io/quanta-kit-design-system/docs/angular/`

## Changes Made

- Modified `.github/workflows/release.yml` to use subdirectory deployment strategy
- Removed Pages API deployment in favor of peaceiris/actions-gh-pages with subdirectories
- Added separate `deploy-main-nav` job that runs last to preserve the main index
- Updated job dependencies to ensure proper deployment order
