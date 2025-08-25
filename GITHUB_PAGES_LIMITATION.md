# GitHub Pages Limitation & Solution

## The Problem 🚨

**GitHub allows only ONE GitHub Pages site per repository.**

Your workflow was trying to create:

1. **Storybooks** → `gh-pages` branch (✅ main Pages site)
2. **Documentation** → `gh-pages-test` branch (❌ won't work as separate site)

## Why the Second Deployment "Succeeded" but Isn't Visible

The `peaceiris/actions-gh-pages@v3` action successfully pushed to the `gh-pages-test` branch, but GitHub Pages only serves from ONE branch/source per repository. The content exists in the branch but isn't accessible as a website.

## Solution Applied ✅

### **Single Pages Site with Organized Structure**

Updated the workflow to deploy everything to the main GitHub Pages site with subdirectories:

```
https://marvin-aroza.github.io/quanta-kit-design-system/
├── index.html                     (main landing page)
├── react/                         (React Storybook)
├── vue/                          (Vue Storybook)
├── angular/                      (Angular Storybook)
└── docs/
    ├── index.html                (docs landing page)
    ├── react/                    (React documentation)
    ├── vue/                      (Vue documentation)
    └── angular/                  (Angular documentation)
```

### **Changes Made:**

1. **Removed separate branch deployment** for docs
2. **Added `destination_dir: docs`** to deploy docs as subdirectory
3. **Added `keep_files: true`** to preserve Storybooks when deploying docs
4. **Updated main index page** to include links to both Storybooks and docs

## Expected URLs After Fix 🌐

### **Main Landing Page:**

- `https://marvin-aroza.github.io/quanta-kit-design-system/`

### **Storybooks:**

- `https://marvin-aroza.github.io/quanta-kit-design-system/react/`
- `https://marvin-aroza.github.io/quanta-kit-design-system/vue/`
- `https://marvin-aroza.github.io/quanta-kit-design-system/angular/`

### **Documentation Sites:**

- `https://marvin-aroza.github.io/quanta-kit-design-system/docs/react/`
- `https://marvin-aroza.github.io/quanta-kit-design-system/docs/vue/`
- `https://marvin-aroza.github.io/quanta-kit-design-system/docs/angular/`

## Alternative Solutions (if needed)

### **Option 1: External Hosting for Docs**

Deploy docs to:

- **Netlify** (free tier available)
- **Vercel** (free tier available)
- **GitHub Pages on separate repositories**

### **Option 2: Separate Repositories**

Create separate repos for docs:

- `quanta-kit-react-docs` → own GitHub Pages
- `quanta-kit-vue-docs` → own GitHub Pages
- `quanta-kit-angular-docs` → own GitHub Pages

### **Option 3: Subdomain Approach**

Use GitHub organization to create subdomains:

- `storybook.your-org.github.io`
- `docs.your-org.github.io`

## Deployment Order 📋

The workflow now deploys in this order:

1. **Deploy Storybooks** → `gh-pages` branch root
2. **Deploy Documentation** → `gh-pages` branch `/docs` subdirectory
3. **Keep both** using `keep_files: true`

## Testing the Fix

### **Next Pipeline Run:**

1. Both jobs will deploy to the same `gh-pages` branch
2. Main page will show unified navigation
3. All content accessible from single domain

### **Verification:**

1. Check `gh-pages` branch has both directories
2. Visit main GitHub Pages URL
3. Test all navigation links work
4. Verify both Storybooks and docs are accessible

## Repository Settings Required

### **GitHub Pages Setup:**

1. **Settings → Pages**
2. **Source:** "Deploy from a branch"
3. **Branch:** `gh-pages` / `/ (root)`

Or use "GitHub Actions" as source if you prefer the newer method.

## Summary

✅ **Fixed:** Single GitHub Pages site with organized structure  
✅ **Benefit:** All content accessible from one domain  
✅ **Navigation:** Unified landing page with clear organization  
✅ **Maintenance:** Simpler deployment and URL management
