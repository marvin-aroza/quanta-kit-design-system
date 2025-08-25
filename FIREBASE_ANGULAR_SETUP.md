# Firebase Deployment Setup for Angular Docs

## Overview
The Angular documentation site is now deployed to Firebase Hosting instead of GitHub Pages for better performance and additional features.

## Configuration Changes Made

### 1. Package.json Updates
- Added `firebase-tools` as a dev dependency
- Added Firebase-specific build and deploy scripts:
  - `build:firebase`: Builds Angular app for Firebase deployment
  - `deploy:firebase`: Deploys to Firebase hosting

### 2. Angular Configuration
- Removed `baseHref: "/docs/angular/"` from angular.json production config
- Angular now builds for root path deployment on Firebase

### 3. Firebase Configuration Files

#### firebase.json
- Configures public directory as `dist/quanta-kit-angular-docs/browser`
- Sets up SPA routing with catch-all rewrite to index.html
- Configures caching headers for optimal performance

#### .firebaserc
- Sets default project as `quanta-kit-angular-docs`

### 4. GitHub Actions Workflow
- Added new job `deploy-angular-docs-firebase`
- Builds Angular docs using `npm run build:firebase`
- Deploys to Firebase using `firebase deploy`
- Updated main navigation index to link to Firebase URL

## Required Secrets

### FIREBASE_TOKEN
You need to add a Firebase deployment token as a GitHub secret:

1. Install Firebase CLI locally: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Generate CI token: `firebase login:ci`
4. Add the token as `FIREBASE_TOKEN` in GitHub repository secrets

## Firebase Project Setup

1. Create a new Firebase project: https://console.firebase.google.com/
2. Project name: `quanta-kit-angular-docs`
3. Enable Firebase Hosting
4. Connect domain if needed

## Deployment Process

1. Push changes to `monorepo-release` branch
2. GitHub Actions will:
   - Build Angular docs for Firebase
   - Deploy to Firebase hosting
   - Update main navigation to link to Firebase URL

## Access

- Firebase URL: https://quanta-kit-angular-docs.web.app/
- Admin Console: https://console.firebase.google.com/project/quanta-kit-angular-docs

## Benefits of Firebase over GitHub Pages

1. **Better Performance**: Firebase CDN and optimized hosting
2. **Custom Domains**: Easy custom domain setup
3. **Analytics**: Built-in Firebase Analytics integration
4. **No Jekyll Processing**: Direct deployment without Jekyll interference
5. **Better SPA Support**: Native single-page application routing
6. **Faster Builds**: No GitHub Pages processing delay

## Troubleshooting

### Common Issues

1. **Firebase project not found**: Ensure project name matches in .firebaserc
2. **Authentication errors**: Check FIREBASE_TOKEN secret is set correctly
3. **Build failures**: Ensure all dependencies are installed before build
4. **Routing issues**: Check firebase.json rewrites configuration

### Logs and Monitoring

- View deployment logs in GitHub Actions
- Monitor hosting status in Firebase Console
- Check analytics and performance metrics in Firebase
