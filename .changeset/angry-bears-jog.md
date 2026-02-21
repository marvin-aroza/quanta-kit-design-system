---
"quanta-kit-design-system-react": patch
"quanta-kit-design-system-vue": patch
"quanta-kit-design-system-angular": patch
---

Harden package release metadata and CI packaging checks across React, Vue, and Angular.

- React: fix CJS entrypoint packaging under ESM package type.
- Vue: enforce tarball/runtime smoke checks in CI.
- Angular: avoid mutating source metadata during build and align package naming/exports with publish output.
