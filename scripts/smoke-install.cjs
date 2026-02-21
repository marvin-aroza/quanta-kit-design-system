#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execSync } = require("child_process");

const workspaceArg = process.argv.find((arg) => arg.startsWith("--workspace="));
if (!workspaceArg) {
  console.error("Usage: node scripts/smoke-install.cjs --workspace=<workspace-name>");
  process.exit(1);
}

const workspace = workspaceArg.split("=")[1];
const root = process.cwd();

function run(command, cwd = root) {
  return execSync(command, {
    cwd,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, CI: "true" },
  })
    .toString()
    .trim();
}

function runInherit(command, cwd = root) {
  execSync(command, {
    cwd,
    stdio: "inherit",
    env: { ...process.env, CI: "true" },
  });
}

const workspacePackageJsonByName = {
  "quanta-kit-design-system-react": "packages/quanta-kit-react/package.json",
  "quanta-kit-design-system-vue": "packages/quanta-kit-vue/package.json",
  "quanta-kit-design-system-angular": "packages/quanta-kit-angular/package.json",
};

const workspacePkgPath = workspacePackageJsonByName[workspace];
if (!workspacePkgPath) {
  console.error(`Unsupported workspace: ${workspace}`);
  process.exit(1);
}

const workspacePkg = JSON.parse(
  fs.readFileSync(path.join(root, workspacePkgPath), "utf8")
);
const pkgName = workspacePkg.name;
const pkgVersion = workspacePkg.version;

console.log(`Smoke install: ${pkgName}@${pkgVersion} (workspace ${workspace})`);

const packJsonRaw = run(`npm pack --workspace=${workspace} --json`);
const packJson = JSON.parse(packJsonRaw);
if (!Array.isArray(packJson) || packJson.length === 0 || !packJson[0].filename) {
  console.error("Could not determine packed tarball filename.");
  process.exit(1);
}

const tarball = path.join(root, packJson[0].filename);
if (!fs.existsSync(tarball)) {
  console.error(`Tarball not found: ${tarball}`);
  process.exit(1);
}

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "qk-smoke-"));
try {
  runInherit("npm init -y", tempDir);
  runInherit(`npm install "${tarball}" --ignore-scripts --no-audit --prefer-offline`, tempDir);
  runInherit(`npm ls ${pkgName}`, tempDir);

  console.log(`Smoke install passed: ${pkgName}`);
} finally {
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch {
    // no-op
  }
  try {
    fs.rmSync(tarball, { force: true });
  } catch {
    // no-op
  }
}
