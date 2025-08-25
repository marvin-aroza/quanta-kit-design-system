# GitHub Pages Deployment Fix

## Issue
GitHub Pages deployment failing with error:
```
Missing environment. Ensure your workflow's deployment job has an environment.
```

## Root Cause
The `actions/deploy-pages@v4` action requires the job to specify a `github-pages` environment.

## Solution Applied ✅

### Updated `deploy-storybooks` Job
Added environment configuration to the job:
```yaml
deploy-storybooks:
  name: Deploy Storybooks
  if: github.ref == 'refs/heads/monorepo-release'
  needs: test
  runs-on: ubuntu-latest
  environment:
    name: github-pages
    url: ${{ steps.deployment.outputs.page_url }}
  steps:
    # ... existing steps
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4
```

## Alternative Solution (if needed)

If the environment approach doesn't work, we can switch to the same approach used by `deploy-docs`:

```yaml
- name: Deploy Storybooks to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: storybook-dist
    publish_branch: gh-pages
```

## Prerequisites for GitHub Pages

### Repository Settings Required:
1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: "Deploy from a branch" or "GitHub Actions"
   - If using "Deploy from a branch", select `gh-pages` branch

2. **Environment Setup** (for actions/deploy-pages@v4):
   - GitHub automatically creates the `github-pages` environment
   - Environment protection rules can be configured if needed

## Expected Results After Fix

1. ✅ Storybooks will deploy to GitHub Pages
2. ✅ Available at: `https://[username].github.io/quanta-kit-design-system/`
3. ✅ Index page will show links to React, Vue, and Angular Storybooks
4. ✅ Documentation sites will continue to deploy via the separate job

## Testing the Fix

### On Next Pipeline Run:
1. Push changes to `monorepo-release` branch
2. Monitor "Deploy Storybooks" job in GitHub Actions
3. Check for successful completion of `actions/deploy-pages@v4`
4. Verify GitHub Pages site is accessible

### Manual Verification:
1. Check repository Settings → Pages for deployment status
2. Visit the GitHub Pages URL
3. Test all Storybook links (React, Vue, Angular)

## Fallback Plan

If the current fix doesn't work, we can:
1. Switch to `peaceiris/actions-gh-pages@v3` (proven to work)
2. Use separate branches for different deployments
3. Use external hosting (Netlify, Vercel) for Storybooks

## Technical Notes

- `actions/deploy-pages@v4` is newer and integrates better with GitHub's deployment tracking
- `peaceiris/actions-gh-pages@v3` is more mature and widely used
- Both approaches work, but have different configuration requirements
- The environment configuration enables better deployment tracking and rollback capabilities
