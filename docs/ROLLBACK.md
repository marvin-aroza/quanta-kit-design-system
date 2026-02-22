# Rollback Runbook

## Scope

Use this when a package release is broken after publish.

## Immediate Actions

1. Stop further publishes (pause merges to release branches).
2. Identify affected package/version on npm.
3. Communicate status in PR/incident channel.

## Preferred Recovery: Dist-Tag Rollback

Avoid unpublishing unless absolutely necessary.

1. Point `latest` back to the last known good version:

```bash
npm dist-tag add quanta-kit-design-system-react@<good-version> latest
npm dist-tag add quanta-kit-design-system-vue@<good-version> latest
npm dist-tag add quanta-kit-design-system-angular@<good-version> latest
```

2. Verify:

```bash
npm view quanta-kit-design-system-react dist-tags --json
npm view quanta-kit-design-system-vue dist-tags --json
npm view quanta-kit-design-system-angular dist-tags --json
```

## Prerelease Channel Rollback

Move channel tags (`next`, `beta`, `alpha`, `rc`, `canary`) to known good versions:

```bash
npm dist-tag add <pkg>@<good-version> next
npm dist-tag add <pkg>@<good-version> beta
```

## Deprecation (when rollback by tag is not enough)

```bash
npm deprecate <pkg>@<bad-version> "Deprecated due to release issue. Use <good-version>."
```

## Unpublish

Use only if policy and npm constraints allow it (for example, within npm's
72-hour window and only when no dependents exist); this is usually disruptive.

## Git and Tag Hygiene

- Do not reuse release tags.
- If a bad tag was pushed but package already published, create a new patch release.
- Keep release history immutable and fix forward where possible.
