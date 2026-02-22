#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = process.cwd();
const outDir = path.join(root, "artifacts", "npm-tarballs");
const workspaces = [
  "quanta-kit-design-system-react",
  "quanta-kit-design-system-vue",
  "quanta-kit-design-system-angular",
];

function run(command) {
  return execSync(command, { cwd: root, stdio: ["ignore", "pipe", "pipe"] })
    .toString()
    .trim();
}

fs.mkdirSync(outDir, { recursive: true });

for (const workspace of workspaces) {
  const packJson = JSON.parse(run(`npm pack --workspace=${workspace} --json`));
  const filename = packJson?.[0]?.filename;
  if (!filename) {
    console.error(`Unable to pack workspace: ${workspace}`);
    process.exit(1);
  }
  const src = path.join(root, filename);
  const dest = path.join(outDir, filename);
  fs.renameSync(src, dest);
  console.log(`Packed ${workspace}: ${dest}`);
}
