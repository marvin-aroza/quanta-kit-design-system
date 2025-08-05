# GitHub Actions CI/CD Pipeline Setup Guide

This document provides comprehensive installation and configuration instructions for setting up a robust GitHub Actions CI/CD pipeline for an Angular/Storybook project with coverage reporting and security auditing.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Required Dependencies](#required-dependencies)
- [File Structure](#file-structure)
- [Configuration Files](#configuration-files)
- [Pipeline Features](#pipeline-features)
- [Installation Steps](#installation-steps)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

## 🎯 Overview

The CI/CD pipeline includes:
- **Multi-stage workflow**: Install → Build → Test → Audit
- **Storybook testing** with coverage reporting
- **Security auditing** with npm audit
- **Coverage threshold enforcement** (90% minimum)
- **Automated PR comments** with coverage reports
- **Artifact management** for builds and reports

## ✅ Prerequisites

- Node.js 22.x or higher
- Angular CLI
- Storybook configured for Angular
- GitHub repository with Actions enabled
- Package.json with required scripts

## 📦 Required Dependencies

### Production Dependencies
```json
{
  "@angular/common": "^20.1.0",
  "@angular/compiler": "^20.1.0",
  "@angular/core": "^20.1.0",
  "@angular/forms": "^20.1.0",
  "@angular/platform-browser": "^20.1.0",
  "@angular/router": "^20.1.0",
  "rxjs": "~7.8.0",
  "tslib": "^2.3.0"
}
```

### Development Dependencies
```json
{
  "@angular-devkit/build-angular": "^20.1.0",
  "@angular/build": "^20.1.4",
  "@angular/cli": "^20.1.3",
  "@angular/compiler-cli": "^20.1.0",
  "@angular/platform-browser-dynamic": "^20.1.4",
  "@compodoc/compodoc": "^1.1.26",
  "@storybook/addon-a11y": "^9.1.1",
  "@storybook/addon-coverage": "^2.0.0",
  "@storybook/addon-docs": "^9.1.1",
  "@storybook/angular": "^9.1.1",
  "@storybook/test-runner": "^0.23.0",
  "@types/jasmine": "~5.1.0",
  "@types/jest": "^29.5.0",
  "jasmine-core": "~5.8.0",
  "jest": "^29.5.0",
  "jest-environment-jsdom": "^29.5.0",
  "karma": "~6.4.0",
  "karma-chrome-launcher": "~3.2.0",
  "karma-coverage": "~2.2.0",
  "karma-firefox-launcher": "^2.1.3",
  "karma-jasmine": "~5.1.0",
  "karma-jasmine-html-reporter": "~2.1.0",
  "karma-opera-launcher": "^1.0.0",
  "ng-packagr": "^20.1.0",
  "playwright": "^1.40.0",
  "storybook": "^9.1.1",
  "typescript": "~5.8.2",
  "wait-on": "^7.2.0",
  "zone.js": "^0.15.1"
}
```

## 📁 File Structure

```
project-root/
├── .github/
│   └── workflows/
│       └── ci.yml                    # Main CI pipeline
├── projects/
│   └── quanta-kit/
│       └── .storybook/
│           ├── main.ts               # Storybook configuration
│           └── test-setup.ts         # Jest setup for Storybook
├── coverage/                         # Generated coverage reports
│   └── storybook/
│       ├── lcov.info                # LCOV coverage data
│       └── lcov-report/             # HTML coverage report
├── package.json                      # Project dependencies and scripts
├── test-runner-jest.config.js        # Jest configuration for Storybook
└── GITHUB_ACTIONS_SETUP.md          # This documentation
```

## ⚙️ Configuration Files

### 1. Package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "storybook": "ng run quanta-kit:storybook",
    "build-storybook": "ng run quanta-kit:build-storybook",
    "test-storybook": "test-storybook --url http://localhost:6006 --config-dir projects/quanta-kit/.storybook --coverage --coverageDirectory=coverage/storybook --testTimeout 60000"
  }
}
```

### 2. Jest Configuration (test-runner-jest.config.js)

```javascript
const { getJestConfig } = require('@storybook/test-runner');

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  // The default configuration comes from @storybook/test-runner
  ...getJestConfig(),
  
  // Coverage configuration
  collectCoverage: true,
  collectCoverageFrom: [
    'projects/quanta-kit/src/**/*.{ts,tsx}',
    '!projects/quanta-kit/src/**/*.stories.{ts,tsx}',
    '!projects/quanta-kit/src/**/*.spec.{ts,tsx}',
    '!projects/quanta-kit/src/**/index.ts',
    '!projects/quanta-kit/src/test.ts',
    '!projects/quanta-kit/src/public-api.ts'
  ],
  coverageDirectory: 'coverage/storybook',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  
  // Test environment
  testEnvironment: 'jsdom',
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/projects/quanta-kit/.storybook/test-setup.ts']
};
```

### 3. Storybook Main Configuration (projects/quanta-kit/.storybook/main.ts)

```typescript
import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-coverage"  // Essential for coverage reporting
  ],
  "framework": {
    "name": "@storybook/angular",
    "options": {}
  }
};
export default config;
```

### 4. Jest Setup File (projects/quanta-kit/.storybook/test-setup.ts)

```typescript
import 'jest-preset-angular/setup-jest';

// Configure Jest environment for Angular/Storybook tests
Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance']
    };
  }
});

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});
Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  }
});
```

## 🚀 Pipeline Features

### Job Structure
1. **Install**: Dependency installation and caching
2. **Build**: Application and Storybook builds
3. **Audit**: Security vulnerability scanning
4. **Test**: Storybook testing with coverage

### Coverage Reporting
- **Extraction Method**: Direct LCOV parsing with HTML fallback
- **Threshold**: 90% minimum for lines, functions, branches, statements
- **Reporting**: Automated PR comments with detailed coverage tables
- **Upload**: Integration with Codecov for historical tracking

### Security Features
- **npm audit**: Automated vulnerability scanning
- **Artifact retention**: 30 days for audit reports, 7 days for builds
- **Permission management**: Minimal required permissions for PR comments

## 📝 Installation Steps

### Step 1: Install Dependencies

```bash
# Install all required dependencies
npm install

# Install additional testing dependencies
npm install --save-dev @types/jest jest jest-environment-jsdom playwright wait-on

# Install global tools for CI
npm install -g http-server wait-on
```

### Step 2: Create Configuration Files

1. Create `test-runner-jest.config.js` in project root
2. Update `projects/quanta-kit/.storybook/main.ts` to include coverage addon
3. Create `projects/quanta-kit/.storybook/test-setup.ts` for Jest setup

### Step 3: Set Up GitHub Actions

1. Create `.github/workflows/ci.yml` with the complete pipeline configuration
2. Ensure repository has the following permissions:
   ```yaml
   permissions:
     contents: read
     issues: write
     pull-requests: write
   ```

### Step 4: Configure Repository Settings

1. Enable GitHub Actions in repository settings
2. Ensure branch protection rules allow Actions to run
3. Configure Codecov integration (optional)

## 🔧 Troubleshooting

### Common Issues

#### 1. Coverage Reports Showing 0%
**Problem**: Coverage extraction returns 0% despite visible numbers in HTML report.

**Solution**: 
- Verify `@storybook/addon-coverage` is installed and configured in main.ts
- Check that Jest configuration includes correct coverage settings
- Ensure LCOV files are generated in `coverage/storybook/lcov.info`

#### 2. PR Comments Not Posted
**Problem**: "Resource not accessible by integration" error.

**Solution**:
```yaml
permissions:
  contents: read
  issues: write
  pull-requests: write
```

#### 3. Storybook Tests Failing
**Problem**: Tests timeout or fail to run.

**Solution**:
- Increase timeout in test script: `--testTimeout 60000`
- Ensure Playwright browsers are installed: `npx playwright install --with-deps`
- Verify Storybook builds successfully before testing

#### 4. Missing Dependencies
**Problem**: Module not found errors during CI.

**Solution**:
- Check that all dependencies are listed in package.json
- Verify cache restoration is working properly
- Use fallback `npm ci` in each job

### Debug Commands

```bash
# Check coverage generation locally
npm run build-storybook
npm run test-storybook

# Verify coverage files
find coverage/ -type f -name "*.info" -o -name "*.html"

# Test LCOV parsing
grep "LF:\|LH:" coverage/storybook/lcov.info

# Validate Jest configuration
npx jest --showConfig
```

## 📚 Best Practices

### 1. Dependency Management
- Pin major versions to prevent breaking changes
- Use `npm ci` in CI for consistent installs
- Keep dev dependencies separate from production

### 2. Coverage Strategy
- Set realistic thresholds (90% is aggressive but achievable)
- Exclude test files and configuration from coverage
- Use both LCOV and HTML reports for flexibility

### 3. Performance Optimization
- Use caching for node_modules between jobs
- Run jobs in parallel where possible
- Upload artifacts only when necessary

### 4. Security
- Use minimal required permissions
- Audit dependencies regularly
- Keep sensitive data in GitHub secrets

### 5. Maintenance
- Review and update dependencies monthly
- Monitor pipeline performance and adjust timeouts
- Keep documentation updated with configuration changes

## 🎯 Expected Outcomes

After successful setup, you should have:

✅ **Automated CI/CD pipeline** that runs on every PR and push  
✅ **Coverage reporting** with 90% threshold enforcement  
✅ **Security auditing** with vulnerability detection  
✅ **PR comments** with detailed coverage information  
✅ **Artifact storage** for builds and reports  
✅ **Integration** with external services like Codecov  

## 📞 Support

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review GitHub Actions logs for specific error messages
3. Verify all configuration files match the examples provided
4. Ensure all dependencies are properly installed

---

*Last updated: August 2025*  
*Pipeline version: v1.0*  
*Compatible with: Angular 20.x, Node.js 22.x, Storybook 9.x*
