# Pipeline Optimization Summary

## Changes Made to GitHub Actions Workflows

> Note: This document predates the workflow split into:
> - `.github/workflows/ci.yml`
> - `.github/workflows/release.yml`
> - `.github/workflows/deploy-storybook.yml`

### 🚀 Performance Improvements

#### 1. **Centralized Dependency Installation**

- **Before**: Each job ran `npm ci` independently (~3-4 times per workflow)
- **After**: Single `install` job caches `node_modules` and all jobs reuse it
- **Benefit**: ~60-70% faster workflow execution, reduced npm registry load

#### 2. **Node Modules Caching Strategy**

```yaml
Cache Key: ${{ runner.os }}-node-modules-${{ env.CACHE_VERSION }}-${{ hashFiles('**/package-lock.json') }}
Includes:
  - Root node_modules
  - All packages/*/node_modules
  - All apps/*/node_modules
```

- **Benefit**: Dependencies installed only once per unique package-lock.json

#### 3. **Build Artifact Caching**

- Build outputs cached with `build-${{ github.sha }}`
- Reused in release job without rebuilding
- **Benefit**: No duplicate builds

### 🔒 New Security & Quality Checks

#### 4. **NPM Audit Check**

- Runs `npm audit --audit-level=high` (blocking — fails pipeline on high/critical vulnerabilities)
- Runs `npm audit --audit-level=moderate` (informational — warns on moderate vulnerabilities)
- **Benefit**: Early detection of security vulnerabilities; high/critical block releases

#### 5. **Outdated Dependencies Check**

- Runs `npm outdated --long`
- Provides visibility into available updates
- **Benefit**: Proactive dependency management

#### 6. **Unused Dependencies Check**

- Uses `depcheck` to find unused packages
- Ignores dev dependencies and tooling
- **Benefit**: Keeps package.json clean

#### 7. **Commit Message Validation**

- Validates all PR commits against commitlint rules
- Runs `commitlint --from=base --to=head`
- **Benefit**: Ensures conventional commits for changelog generation

### 📊 Job Dependency Graph

```text
install (runs first, caches node_modules)
  ├─> commit-lint (PR only)
  ├─> security (audit, outdated, depcheck)
  ├─> quality (lint, type-check)
  │     └─> build (packages, storybooks)
  │           └─> release (only on main push)
  └─> changeset-status (PR only)
```

### ⚡ Speed Comparison

| Metric                       | Before   | After    | Improvement        |
| ---------------------------- | -------- | -------- | ------------------ |
| npm ci runs                  | 4×       | 1×       | 75% reduction      |
| Total install time           | ~4-6 min | ~1-2 min | 60-70% faster      |
| Cache hits (subsequent runs) | Partial  | Full     | 90%+ faster        |
| Parallel execution           | 2 jobs   | 5 jobs   | Better utilization |

> **Note:** These are estimated projections — to be validated after initial workflow runs. Update with real measurements once available.

### 🎯 Additional Optimizations

1. **Selective npm ci flags**:
   - `--prefer-offline`: Use local cache when possible
   - `--no-audit`: Skip audit during install (done separately)

2. **Fail-fast strategy**:
   - Quality checks before build
   - Security as separate parallel job
   - Critical failures stop workflow early

3. **Improved commit messages**:
   - Changed from "Version packages" to "chore(release): version packages"
   - Matches commitlint rules

4. **Cache versioning**:
   - `CACHE_VERSION: v1` env variable
   - Easy cache invalidation when needed

### 📝 Configuration Variables

```yaml
env:
  CI: true
  NODE_VERSION: 20
  CACHE_VERSION: v1 # Increment to bust all caches
```

### 🔄 Workflow Triggers

- **Push to main**: Runs full pipeline including release
- **Pull Request**: Runs quality, security, commit-lint, changeset-status
- **Concurrency**: Auto-cancels outdated PR runs

### 💡 Best Practices Applied

1. ✅ Single source of truth for dependencies
2. ✅ Parallel job execution where possible
3. ✅ Fail-fast for critical checks
4. ✅ Continue-on-error for informational checks
5. ✅ Proper cache invalidation strategy
6. ✅ Minimal permissions per job
7. ✅ Descriptive job and step names
8. ✅ Grouped output for better readability

### 🎬 Next Steps

1. Monitor first workflow run for timing improvements
2. Review security/outdated warnings when they appear
3. Consider adding workflow_dispatch for manual triggers
4. Optional: Add matrix strategy for testing multiple Node versions

---

**Estimated Total Time Savings**: 3-5 minutes per workflow run
**Estimated Cost Savings**: ~50-60% reduction in GitHub Actions minutes
